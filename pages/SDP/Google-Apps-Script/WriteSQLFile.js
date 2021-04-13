// Write SQL File.gs

function WriteSQLFile(OutputType) {
  
    /**
    * WriteSQLFile
    * "Write .SQL File" function, clickable on SDP Nodes & Edges menu.
    * Writes the required SQL script into the user's folder.
    * @param {string} OutputType: The required SQL output type. Can be either "Normal" or "Testing".
    * https://developers.google.com/apps-script/guides/menus
    */
    
    // Define the spreadsheet and the SQL code tab.
    const SpreadsheetUI = SpreadsheetApp.getUi(); 
    const CurrentSpreadsheet = SpreadsheetApp.getActive(); // https://scotch.io/courses/10-need-to-know-javascript-concepts/declaring-javascript-variables-var-let-and-const
    const FunctionName = "WriteSQLFile"; // Used for identifying log entries.
    const SQLSheetName = CurrentSpreadsheet.getSheetByName('SQL Text Code');
    Logger.log(FunctionName + '. Function initiated.');
    
    // Track the time taken for the function to execute. https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
    const startTime = new Date().getTime();
    
    // Define first and last row of SQL text and clear old data. Select the column we will check for the first blank cell and get the last row based on the data range of a single column. See Re-Usable Functions: function GetLastRowSpecial(range) - https://yagisanatode.com/2019/05/11/google-apps-script-get-the-last-row-of-a-data-range-when-other-columns-have-content-like-hidden-formulas-and-check-boxes/
    let FirstRow = 14; // let can be overwritten but keeps the variable type.
    var ColumnToCheck = SQLSheetName.getRange("A:A").getValues(); // Check first column - usually id column.
    let LastRow = SQLSheetName.getRange("A:A").getLastRow();
    //let LastRow = GetLastRowSpecial(ColumnToCheck,'SQL Text Code');
    if (LastRow < 14) {
      LastRow = 14;
    }
    SQLSheetName.getRange('A14:A' + LastRow).clearContent();
    
    // Define the code number line.
    let CodeLineNumber = FirstRow;
    
    // Define the sheet with all tables on it to loop through, and the first and last row of the table list.
    let TableNameSheetName = CurrentSpreadsheet.getSheetByName('Control Panel');
    let TableNamesColumnLetter = "C";
    let TableNamesColumnNumber = 3;
    let TableNamesFirstRow = 18;
    let TableNamesLastRow = 69;
    let TotalTableCount = TableNameSheetName.getRange(TableNamesLastRow, (TableNamesColumnNumber - 1)).getValue(); // Offset one column to get the table number.
    
    // Declare the variable names used in the loops outside of the loop for better efficiency. Declare let(s). let can be overwritten but keeps the variable type.
    let i,y,HeaderCode, TableNumber, TableName,SheetName,RowCount,CodeText,LastColumn,ArrayRange,ArrayValues,ArrayValuesNumberOfRows,ArrayValuesNumberOfColumns; 
    let RowNumber,ArrayRowNumber,ValueCode,ColumnNumber,ArrayColumnNumber,ArrayValue,DateValue,CodeArrayNumberOfRows,a,b,LatestValue;
    var CodeArray;
    
    // Create an initial side bar with a message to add to.
    const displayTitle = "SQL Code Generator";
    const headerMessage = "Writing SQL Code.<br />";
    let progressMessage =  "Progress 0%.<br />";
    let displayMessage = "";
    const displayBarWidth = 120;
    
    // Complex or non complex sidebar?
    let SideBarComplex = "False";
    if (SideBarComplex = "False") { 
      writeMessageToSidebar(displayTitle,headerMessage+progressMessage,displayBarWidth);
    } else {
      // Do nothing. 
    }
    
    // Loop through table names (i).
    for (i = TableNamesFirstRow; i <= TableNamesLastRow; i++) {
      
      // Define the Header code string and the Table name.
      HeaderCode = "";
      TableNumber = TableNameSheetName.getRange(i, (TableNamesColumnNumber - 1)).getValue(); // Offset one column to get the table number.
      TableName = TableNameSheetName.getRange(i, TableNamesColumnNumber).getValue();
      
      // Deal with tables that shouldn't be included in the code as we don't want their data loaded into the database.
      if (TableName == "errorlog" || TableName == "savedproject" || TableName == "usergroup" || TableName == "user_usergroup" || TableName == "userLogHistory"){
        
        // Do nothing to skip these tables without action.
        
      } else {
        
        // For the selected table, get number of rows on tab. Select the column we will check for the first blank cell and get the last row based on the data range of a single column. See Re-Usable Functions: function GetLastRowSpecial(range) - https://yagisanatode.com/2019/05/11/google-apps-script-get-the-last-row-of-a-data-range-when-other-columns-have-content-like-hidden-formulas-and-check-boxes/
        SheetName = CurrentSpreadsheet.getSheetByName(TableName);
        ColumnToCheck = SheetName.getRange("A:A").getValues(); // Check first column - usually id column.
        RowCount = GetLastRowSpecial(ColumnToCheck,TableName);
        
        // Write first summary line of code.
        CodeText = "'-- Exportiere Daten aus Tabelle sdp." + TableName + ": ~" + (RowCount - 1) + " rows (ungefähr)"; // - 1 to remove header row count.
        SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
        CodeLineNumber = CodeLineNumber + 1;
        
        // Write second summary line of code.
        CodeText = "/*!40000 ALTER TABLE `" + TableName + "` DISABLE KEYS */;";
        SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
        CodeLineNumber = CodeLineNumber + 1;
        
        // Write TRUNCATE CODE.
        CodeText = "TRUNCATE TABLE " + TableName + ";";
        SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
        CodeLineNumber = CodeLineNumber + 1;
        
        // Write insert line of SQL code.
        
        // Get last column from last data column letter stored on Table Names tab. Loop through columns for the table header row and collect values.
        LastColumn = TableNameSheetName.getRange(i, (TableNamesColumnNumber + 1)).getValue(); // Add 1 to TableNamesColumnNumber to offset to the number of columns.
        for (y = 1; y <= LastColumn; y++) {
          HeaderCode = HeaderCode + "`" + SheetName.getRange(1, y).getValue() + "`, ";
        }
        
        // Remove last comma and space from created HeaderCode text.
        //var last2characters = HeaderCode.substring((HeaderCode.length - 2),HeaderCode.length);
        if (HeaderCode.substring((HeaderCode.length - 2),HeaderCode.length) == ", "){
          //if (HeaderCode.substring((HeaderCode.length - 2),2) == ", "){
          HeaderCode = HeaderCode.substring(0,(HeaderCode.length - 2));
        }
        CodeText = "INSERT INTO `" + TableName + "` (" + HeaderCode + ") VALUES";
        SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
        CodeLineNumber = CodeLineNumber + 1;
        
        // Write data values in.
        
        // First get all of the data from the sheet into an array.
        ArrayRange = SheetName.getRange(2, 1, RowCount - 1, LastColumn); // Gets all of the data on each tab.
        ArrayValues = ArrayRange.getValues(); // Gets the values from this data range.
        ArrayValuesNumberOfRows = ArrayValues.length; // Defines the number of rows in the range.
        ArrayValuesNumberOfColumns = ArrayValues[0].length; // Defines the number of columns in the range.
        
        // Define the array of code that I will create. This array will be a vertical single width array to be copied into the sheet later. Size doesn't matter for now.
        CodeArray = [];
        
        // Loop down the rows, with RowNumber referring to the row numbers in the sheet.
        for (RowNumber = 2; RowNumber <= RowCount; RowNumber++) { // 2 is the row below the header.
          
          // Set the array row number to be 2 less than the RowNumber.
          ArrayRowNumber = RowNumber - 2;
          
          // Reset the ValueCode string.
          ValueCode = "";
          
          // Loop across the columns with ColumnNumber referring to the column numbers in the sheet.
          for (ColumnNumber = 1; ColumnNumber <= LastColumn; ColumnNumber++) { // 1 is the first column.
            
            // Set the array column number to be 1 less than the ColumnNumber.
            ArrayColumnNumber = ColumnNumber - 1;
            
            // Save the value of the array element
            ArrayValue = ArrayValues[ArrayRowNumber][ArrayColumnNumber];
            
            // Use a switch statement to check what type of data is stored in each element of the array. Better efficiency than If statements. https://www.w3schools.com/js/js_switch.asp
            switch (typeof(ArrayValue)) {
                
              case 'string': // Add speech marks for strings.
                if (ArrayValue == ""){
                  ValueCode = ValueCode + "'', "; // Add speech marks for blank cells.
                } else if (ArrayValue == "Cote d'Ivoire"){
                  ValueCode = ValueCode + "'Cote d\\'Ivoire', "; // Add speech marks and change country name if Ivory Coast. Need \\ to get a \ in Javascript string. https://www.w3schools.com/js/js_strings.asp
                } else if (ArrayValue == "NULL"){
                  ValueCode = ValueCode + ArrayValue + ", "; // Don't add speech marks for NULL values.
                } else {
                  ValueCode = ValueCode + "'" + ArrayValue + "', "; // Add speech marks for all other cell conditions.
                }
                break;
                
              case 'number':  // Don't add speech marks for numeric values. https://stackoverflow.com/questions/600763/check-if-a-variable-contains-a-numerical-value-in-javascript
                if (TableName == "edge"  && (ColumnNumber == 7 || ColumnNumber == 8 || ColumnNumber == 9)){ // Special case: Check for edge table case.
                  ValueCode = ValueCode + "'" + ArrayValue + "', ";
                } else {
                  ValueCode = ValueCode + ArrayValue + ", ";
                }
                break;
                
              case 'date': // Add speech marks for dates and format date as "yyyy-mm-dd hh:mm:ss". https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
                // Google Sheets shows timestamps rounded to the nearest second. Getting the time or date via Javascript brings in milliseconds and so dates appear 1 second off in some rounding cases. To combat this, round every date to nearest second.
                var dateFullMilliseconds = ArrayValue.getTime();
                var dateRoundedMilliseconds = Math.round(dateFullMilliseconds/1000)*1000;
                var correctDate = new Date(dateRoundedMilliseconds);
                DateValue = Utilities.formatDate(correctDate, "GMT+1", "yyyy-MM-dd HH:mm:ss"); 
                ValueCode = ValueCode + "'" + DateValue + "', ";
                break;
                
              case 'boolean': // Add speech marks for booleans.
                ValueCode = ValueCode + "'" + ArrayValue + "', "; // Add speech marks for cells containing "TRUE" or "FALSE".
                break;
                
              case 'undefined': // Add speech marks for all other cell conditions.
                ValueCode = ValueCode + "'" + ArrayValue + "', "; 
                break;
                
              default: // Add catch for all other types.
                if ((ArrayValue instanceof Date) == true){ // Add speech marks for dates and format date as "yyyy-mm-dd hh:mm:ss". https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
                  // Google Sheets shows timestamps rounded to the nearest second. Getting the time or date via Javascript brings in milliseconds and so dates appear 1 second off in some rounding cases. To combat this, round every date to nearest second.
                  var dateFullMilliseconds = ArrayValue.getTime();
                  var dateRoundedMilliseconds = Math.round(dateFullMilliseconds/1000)*1000;
                  var correctDate = new Date(dateRoundedMilliseconds);
                  DateValue = Utilities.formatDate(correctDate, "GMT+1", "yyyy-MM-dd HH:mm:ss"); 
                  ValueCode = ValueCode + "'" + DateValue + "', ";
                } else if (ArrayValue == "Cote d'Ivoire"){
                  ValueCode = ValueCode + "'Cote d\\'Ivoire', "; // Add speech marks and change country name if Ivory Coast. Need \\ to get a \ in Javascript string. https://www.w3schools.com/js/js_strings.asp
                } else if (ArrayValue == "NULL"){
                  ValueCode = ValueCode + ArrayValue + ", "; // Don't add speech marks for NULL values.
                } else { // Add speech marks for all other cell conditions.
                  ValueCode = ValueCode + "'" + ArrayValue + "', "; // Add speech marks for all other cell conditions.
                }
            }  
          }
          
          // Remove last comma and space from code line.
          if (ValueCode.substring((ValueCode.length - 2),ValueCode.length) == ", "){
            ValueCode = "    (" + ValueCode.substring(0, (ValueCode.length - 2)) + "),"; // Remove last two characters and adds a bracket either side.
          }
          
          // For the very last array entry, end on a semi colon instead of a comma. 
          if (RowNumber == RowCount){
            ValueCode = ValueCode.substring(0, (ValueCode.length - 1)) + ";"; // Remove last character (which is a comma) and adds a semi colon.
          }
            
          // Populate the processed ValueCode value into the new array, "CodeArray".
          CodeArray.push([ValueCode]);
       
        }
        
        // Understand the dimensions of the array "CodeArray" and then copy the array values back into the Google Sheet at the CodeLineNumber.
        CodeArrayNumberOfRows = CodeArray.length;
        var PasteRange = SQLSheetName.getRange(CodeLineNumber,1,CodeArrayNumberOfRows,1);
        PasteRange.setValues(CodeArray);
        
        // Offset the CodeLineNumber under the pasted array length.
        CodeLineNumber = CodeLineNumber + CodeArrayNumberOfRows;
        
        // Write last summary line of code.
        CodeText = "/*!40000 ALTER TABLE `" + TableName + "` ENABLE KEYS */;";
        SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
        CodeLineNumber = CodeLineNumber + 1;
        
        // Move two lines down.
        CodeLineNumber = CodeLineNumber + 2;
        
      } // Skip some table names.
      
      // Complex or non complex sidebar?
      if (SideBarComplex = "False") {  
        // Update the messages passed to the user.
        Logger.log("Writing SQL Code. Table " + TableNumber + ' of ' + TotalTableCount  + ' complete. (' + TableName + ')');
        let progressValue = (TableNumber/TotalTableCount)*100;
        progressValue = progressValue.toFixed(1);
        progressMessage =  "Progress " + progressValue + "%.<br />";
        displayMessage = TableNumber + ' of ' + TotalTableCount + ' complete. (' + TableName + ')<br />' + displayMessage; 
        writeMessageToSidebar(displayTitle,headerMessage+progressMessage+displayMessage,displayBarWidth);
      } else {
        // Set up HTML template for the email. https://blog.gsmart.in/google-apps-script-send-html-email/
        var ui = HtmlService.createTemplateFromFile('SB4 - SidebarSQL'); // Call the file "SidebarSQL.html" to create the sidebar content.
        // Pass the variables to the HTML template.
        ui.bodyText = headerMessage+progressMessage+displayMessage;
        // Evaluate the template to get the content of the HTML email.
        var HTMLMessage = ui.evaluate().getContent();
        SpreadsheetApp.getUi().showSidebar(ui);
      }
      
    } // i loop end - table names (i).
    
    // Write final three summary lines of code at very bottom of script.
    
    // First summary line.
    CodeText = "/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;	";
    SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
    CodeLineNumber = CodeLineNumber + 1;
    
    // Second summary line.
    CodeText = "/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;";
    SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
    CodeLineNumber = CodeLineNumber + 1;
    
    // Third summary line.
    CodeText = "/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;";
    SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
    
    
    
    // At end of script, consider adding some additional SQL code to mark if the generated SQL file should be a test environment writing script or normal.
    //-- Modify the activity, specialactivity and milestone table to only make testing items active.
    //UPDATE `sdp`.`activity` SET `active` = '0' WHERE (`testing` = '0');
    //UPDATE `sdp`.`activity` SET `active` = '1' WHERE (`testing` = '1');
    //UPDATE `sdp`.`specialactivity` SET `active` = '0' WHERE (`testing` = '0');
    //UPDATE `sdp`.`specialactivity` SET `active` = '1' WHERE (`testing` = '1');
    //UPDATE `sdp`.`milestone` SET `active` = '1' WHERE (`testing` = '0');
    //UPDATE `sdp`.`milestone` SET `active` = '1' WHERE (`testing` = '1');
    
    
    // Generate an .SQL of the defined content.
    let CurrentDate,FileName,FileContent,TextFileContent; // Declare variable names.
    CurrentDate = Utilities.formatDate(new Date(), "GMT+1", "yyyyMMdd HHmmss"); // Get current date to be used in the file name. https://webapps.stackexchange.com/questions/62586/how-to-format-the-date-in-this-google-apps-script
    FileName = "test " + CurrentDate + ".sql"; // Create a new file name with date on end.
    FileContent = SQLSheetName.getRange("A:A").getValues();
    TextFileContent = FileContent.map(function (a) {return a.join('\t');}).join('\n'); //https://stackoverflow.com/questions/36756045/export-google-spreadsheet-to-text-file-using-script
    // Previous code to save at top level of Google Drive avoided defining a parentFolder and just had "DriveApp.createFile(FileName, TextFileContent);"  
    // Save the data as a file in the specified Google Drive folder. "Google Drive\SDP\SDP Team Data\SDP Programs\SQL Database\SDP SQL Data Files".
    var parentFolder = DriveApp.getFolderById("1qcKHth519BUsshlASVP5uxpWHGl1u2bG"); // https://stackoverflow.com/questions/49501461/specify-folder-to-save-files-to-in-google-script
    parentFolder.createFile(FileName, TextFileContent);
    
    // Log final time and report the timing. https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
    let endTime = new Date().getTime();
    let runTime = (endTime - startTime)/1000;
    Logger.log("Call for " + FunctionName + " to run took " + runTime + " seconds.");
    Logger.log("SQL text Code successfully generated from the SDP Data in " + runTime + " seconds." + "\n" + "\n" + "Please review file " + FileName + " in your Google Drive." + "\n" + "\n" + "Google Drive > SDP > SDP Team Data > SDP Programs > SQL Database > SDP SQL Data Files");
    
    // Add a final alert to tell the user that the SQL code has been created.
    SpreadsheetUI.alert("SQL text Code successfully generated from the SDP Data in " + runTime + " seconds." + "\n" + "\n" + "Please review file " + FileName + " in your Google Drive." + "\n" + "\n" + "Google Drive > SDP > SDP Team Data > SDP Programs > SQL Database > SDP SQL Data Files");
    
  }