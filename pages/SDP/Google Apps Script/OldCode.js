



// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// OnEdit.gs

/** @OnlyCurrentDoc */
// Only runs on the current doc, rather than on all open Google Sheet documents.

function onEditOld(e) {
  
    /**
    * onEdit Function
    * SDP Nodes & Edges sheet onEdit functions.
    * https://developers.google.com/apps-script/guides/triggers
    * http://eyana.me/create-a-simple-changelog-using-google-apps-scripts/#fn:1
    */
    
    // Add an initial log of code to indicate the code begins running successfully.
    //Logger.log('Initialising code. OnEdit code initiated.');
  
    // Define the spreadsheet and the sheet name on which the change is made.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    var CurrentSheetName = CurrentSpreadsheet.getActiveSheet().getName();
    var CurrentSheet = CurrentSpreadsheet.getSheetByName(CurrentSheetName);
  
    // Delete when testing complete.
    Logger.log('OnEdit code running on tab: ' + CurrentSheetName);
  
    // Skip all sheets that don't need a timestamp.
    if (CurrentSheetName == 'Control Panel' || CurrentSheetName == 'Manual Change Log' || CurrentSheetName == 'team' || CurrentSheetName == 'task' || CurrentSheetName == 'deliverable' || CurrentSheetName == 'property' || CurrentSheetName == 'property_has_activity' || CurrentSheetName == 'commodity' || CurrentSheetName == 'region' || CurrentSheetName == 'Help & Steps' || CurrentSheetName == 'SDP Acronyms' || CurrentSheetName == 'Boundary Diagrams' || CurrentSheetName == 'Graphs' || CurrentSheetName == 'LookUp')  {
      return; // Early exit from code as none of these sheets need further action.
    }  
    
    // Deal with changes made.
    
    // Define the column and row that the change is made on.
    var ColumnNumber = e.range.getColumn();
    var RowNumber = e.range.getRow();
  
    // Swimlane Tab.
    
    // Colour the hex cells on the swimlane tab if modified. https://stackoverflow.com/questions/30766943/google-spreadsheet-script-to-change-background-color-of-a-cell-based-on-a-hex-c
    if (CurrentSheetName == 'swimlane')  {
      var HexStartingRow = 2; // First row.
      var HexEndingRow = 14; // Last row.
      if (RowNumber < HexStartingRow || RowNumber > HexEndingRow) { // Cancel code if not in the hex area. If in the wrong column, the code checks this later on with the background/text lookup check.
        return;
      }
      var CellHexColourValue = CurrentSpreadsheet.getActiveRange().getValue(); // Define the hex colour chosen in the cell.
      var ColumnTypeRowNumber = 16;
      var ColumnTypeRange = CurrentSheet.getRange(ColumnTypeRowNumber,ColumnNumber);
      var ColumnType = ColumnTypeRange.getValue(); // Is it a background or a text colouring cell.
      if (ColumnType == 'Background' || ColumnType == 'Text') {
        e.range.setBackground(CellHexColourValue);
        if (CellHexColourValue == '#FFFFFF') { // If cell value is 'White'. Set text to black.
          e.range.setFontColor('#000000');
        } else if (CellHexColourValue == '#000000'){ // Cell value is 'Black'. Set text to white.
          e.range.setFontColor('#FFFFFF');
        }
      } else {
        // Do nothing.
      }
      //Logger.log('OnEdit. CurrentSheet name is ' + CurrentSheetName + '. CellHexColourValue is ' + CellHexColourValue + '. Column type is ' + ColumnType + '.');
      return; // Early exit from code.
    }
    
    // SwimlaneColours Tab.
  
    if (CurrentSheetName == 'swimlaneColours'){
      Logger.log('swimlaneColours running.')
      // Change colour if Hex code added.
      var eCellValue = CurrentSheet.getRange(RowNumber,ColumnNumber).getValue();
      if (eCellValue.substring(0, 1) == '#'){
        let HexCode = CurrentSheet.getRange(RowNumber,ColumnNumber).getValue();
        CurrentSheet.getRange(RowNumber,ColumnNumber).setBackground(HexCode);
      }
      return; // Early exit from code as no other actions needed.
    }
  
    // All Other Tabs.
    
    // Make additional log changes if on a particular sheet.
    if (RowNumber == 1) {
      //Logger.log('OnEdit. row is = ' + RowNumber + ' therefore skip time stamp change.')
    } else {
      //Logger.log('OnEdit. row is = ' + RowNumber + ' therefore add time stamp.')
      var SheetData = CurrentSheet.getDataRange().getValues(); // https://stackoverflow.com/questions/32565859/find-cell-matching-value-and-return-rownumber
      var SearchTerm = 'timeChanged';
      for(var i = 0; i<SheetData.length;i++){
        if(SheetData[0][i] == SearchTerm){ // [0] Because row is 1st row.
          //Logger.log((i+1));
          var TimeChangedColumn = i+1;
        }
      }
      //var ColumnLetter = ColumnToLetter(ColumnNumber);
      //Logger.log('OnEdit. Sheet name is = ' + CurrentSheetName + ' and cell changed is ' + ColumnLetter + RowNumber)
      if (ColumnNumber < TimeChangedColumn) {
        // Change to the left of the TimeChangedColumn so update the time.
        //Logger.log('OnEdit. column is = ' + ColumnNumber + ' which is less than the TimeChangedColumn so add time stamp.')
        CurrentSheet.getRange(RowNumber,TimeChangedColumn).setValue(new Date());
      } else {
        //Logger.log('OnEdit. column is = ' + ColumnNumber + ' which is greater than the TimeChangedColumn so don't add time stamp.')
      }  
    }
      
  }
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  // Write SQL File.gs
  
  function WriteSQLFileOld() {
    
    /**
    * WriteSQLFile
    * "Write .SQL File" function, clickable on SDP Nodes & Edges menu.
    * Writes the required SQL script into the user's folder.
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
    
    // Define the table name sheet and last row of table name sheet.
    let TableNameSheetName = CurrentSpreadsheet.getSheetByName('Table Names');
    ColumnToCheck = TableNameSheetName.getRange("B:B").getValues(); // Check first column - usually id column.
    let LastRowTableTab = GetLastRowSpecial(ColumnToCheck,'Table Names');
    
    // Declare the variable names used in the loops outside of the loop for better efficiency. Declare let(s). let can be overwritten but keeps the variable type.
    let i,y,HeaderCode,TableName,SheetName,RowCount,CodeText,LastColumn,ArrayRange,ArrayValues,ArrayValuesNumberOfRows,ArrayValuesNumberOfColumns; 
    let RowNumber,ArrayRowNumber,ValueCode,ColumnNumber,ArrayColumnNumber,ArrayValue,DateValue,CodeArrayNumberOfRows,a,b,LatestValue;
    var CodeArray;
    
    // Create an initial side bar with a message to add to.
    const displayTitle = "SQL Code Generator";
    const headerMessage = "Writing SQL Code.<br />";
    let progressMessage =  "Progress 0%.<br />";
    let displayMessage = "";
    const displayBarWidth = 120;
    writeMessageToSidebar(displayTitle,headerMessage+progressMessage,displayBarWidth);
    
    // Loop through table names (i).
    for (i = 2; i <= LastRowTableTab; i++) { // 2 skips the header.
      
      // Define the Header code string and the Table name.
      HeaderCode = "";
      TableName = TableNameSheetName.getRange(i, 2).getValue(); // Loop through second column.
      
      // Deal with tables that shouldn't be included in the code as we don't want their data loaded into the database.
      if (TableName == "savedproject" || TableName == "usergroup" || TableName == "user_usergroup"){
        
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
        LastColumn = TableNameSheetName.getRange(i, 3).getValue();
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
      
      // Update the messages passed to the user.
      Logger.log("Writing SQL Code. Table " + (i - 1) + ' of ' + (LastRowTableTab - 1) + ' complete. (' + TableName + ')'); // - 1s offset header rows.
      let progressValue = ((i - 1)/(LastRowTableTab - 1))*100;
      progressValue = progressValue.toFixed(1);
      progressMessage =  "Progress " + progressValue + "%.<br />";
      displayMessage = (i - 1) + ' of ' + (LastRowTableTab - 1) + ' complete. (' + TableName + ')<br />' + displayMessage; // - 1s offset header rows.
      writeMessageToSidebar(displayTitle,headerMessage+progressMessage+displayMessage,displayBarWidth);
      
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
    
    
    // Generate an .SQL of the defined content and save it at the top level of Google Drive.
    let CurrentDate,FileName,FileContent,TextFileContent; // Declare variable names.
    CurrentDate = Utilities.formatDate(new Date(), "GMT+1", "yyyyMMdd HHmmss"); // Get current date to be used in the file name. https://webapps.stackexchange.com/questions/62586/how-to-format-the-date-in-this-google-apps-script
    FileName = "test " + CurrentDate + ".sql"; // Create a new file name with date on end.
    FileContent = SQLSheetName.getRange("A:A").getValues();
    TextFileContent = FileContent.map(function (a) {return a.join('\t');}).join('\n'); //https://stackoverflow.com/questions/36756045/export-google-spreadsheet-to-text-file-using-script
    DriveApp.createFile(FileName, TextFileContent);
    
    // Log final time and report the timing. https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
    let endTime = new Date().getTime();
    let runTime = (endTime - startTime)/1000;
    Logger.log("Call for " + FunctionName + " to run took " + runTime + " seconds.");
    
    // Add a final alert to tell the user that the SQL code has been created.
    SpreadsheetUI.alert("SQL text Code successfully generated from the SDP Data in " + runTime + " seconds." + "\n" + "\n" + "Please review file " + FileName + " in your Google Drive.");
    
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  function WriteSQLFileTP() {
    
    /**
    * WriteSQLFile
    * "Write .SQL File" function, clickable on SDP Nodes & Edges menu.
    * Writes the required SQL script into the user's folder.
    * https://developers.google.com/apps-script/guides/menus
    */
    
    // Define the spreadsheet and the SQL code tab.
    const SpreadsheetUI = SpreadsheetApp.getUi(); // https://scotch.io/courses/10-need-to-know-javascript-concepts/declaring-javascript-variables-var-let-and-const
    const CurrentSpreadsheet = SpreadsheetApp.getActive();
    const FunctionName = "WriteSQLFile"; // Used for identifying log entries.
    const SQLSheetName = CurrentSpreadsheet.getSheetByName('SQL Text Code');
    Logger.log(FunctionName + '. Function initiated.');
    
    // Track the time taken for the function to execute. https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
    const startTime = new Date().getTime();
    
    // Define first and last row of SQL text and clear old data. Select the column we will check for the first blank cell and get the last row based on the data range of a single column. See Re-Usable Functions: function GetLastRowSpecial(range) - https://yagisanatode.com/2019/05/11/google-apps-script-get-the-last-row-of-a-data-range-when-other-columns-have-content-like-hidden-formulas-and-check-boxes/
    let FirstRow = 14; // let can be overwritten but keeps the variable type.
    var ColumnToCheck = SQLSheetName.getRange("A:A").getValues(); // Check first column - usually id column.
    let LastRow = GetLastRowSpecial(ColumnToCheck,'SQL Text Code');
    if (LastRow < 14) {
      LastRow = 14;
    }
    SQLSheetName.getRange('A14:A' + LastRow).clearContent();
    
    // Define the code number line.
    let CodeLineNumber = FirstRow;
    
    // Define the table name sheet and last row of table name sheet.
    let TableNameSheetName = CurrentSpreadsheet.getSheetByName('Table Names TP');
    ColumnToCheck = TableNameSheetName.getRange("A:A").getValues(); // Check first column - usually id column.
    let LastRowTableTab = GetLastRowSpecial(ColumnToCheck,'Table Names');
    
    // Declare the variable names used in the loops outside of the loop for better efficiency. Declare let(s). let can be overwritten but keeps the variable type.
    let i,y,HeaderCode,TableName,SheetName,RowCount,CodeText,LastColumn,ArrayRange,ArrayValues,ArrayValuesNumberOfRows,ArrayValuesNumberOfColumns; 
    let RowNumber,ArrayRowNumber,ValueCode,ColumnNumber,ArrayColumnNumber,ArrayValue,DateValue,CodeArrayNumberOfRows,a,b,LatestValue;
    var CodeArray;
    
    // Loop through table names (i).
    for (i = 2; i <= LastRowTableTab; i++) { // 2 skips the header.
      
      // Define the Header code string and the Table name.
      HeaderCode = "";
      TableName = TableNameSheetName.getRange(i, 1).getValue();
      
      // REMOVE WHEN DONE DEBUGGING
      if (TableName == "property"){
        Logger.log("Stop");
      }
      // REMOVE WHEN DONE DEBUGGING
      
      // Deal with tables that shouldn't be included in the code as we don't want their data loaded into the database.
      if (TableName == "savedproject" || TableName == "usergroup" || TableName == "user_usergroup"){
        
        // Do nothing to skip these tables without action.
        
      } else {
        
        // For the selected table, get number of rows on tab. Select the column we will check for the first blank cell and get the last row based on the data range of a single column. See Re-Usable Functions: function GetLastRowSpecial(range) - https://yagisanatode.com/2019/05/11/google-apps-script-get-the-last-row-of-a-data-range-when-other-columns-have-content-like-hidden-formulas-and-check-boxes/
        SheetName = CurrentSpreadsheet.getSheetByName(TableName);
        ColumnToCheck = SheetName.getRange("A:A").getValues(); // Check first column - usually id column.
        RowCount = GetLastRowSpecial(ColumnToCheck,TableName);
        
        // Code into an array.
        // Write first summary line of code.
        CodeText = "'-- Exportiere Daten aus Tabelle sdp." + TableName + ": ~" + RowCount + " rows (ungefähr)";
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
        LastColumn = TableNameSheetName.getRange(i, 2).getValue();
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
        // Code into an array.
        
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
                } else if (ArrayValue == "'Cote d'Ivoire'"){
                  ValueCode = ValueCode + "'Cote d\'Ivoire', "; // Add speech marks and change country name if Ivory Coast.
                } else {
                  ValueCode = ValueCode + "'" + ArrayValue + "', "; // Add speech marks for all other cell conditions.
                }
                break;
                
              case 'number':  // Don't add speech marks for numeric values. https://stackoverflow.com/questions/600763/check-if-a-variable-contains-a-numerical-value-in-javascript
                ValueCode = ValueCode + ArrayValue + ", ";
                break;
                
              case 'date': // Add speech marks for dates and format date as "yyyy-mm-dd hh:mm:ss". https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
                DateValue = ArrayValue;
                DateValue = DateValue.getFullYear() + "-" + (DateValue.getMonth() + 1) + "-" + DateValue.getDate() + " " + DateValue.getHours() + ":" + DateValue.getMinutes() + ":" + DateValue.getSeconds() // https://codehandbook.org/javascript-date-format/#:~:text=To%20convert%20date%20to%20format,year%20from%20the%20date%20object.&text=To%20convert%20the%20numeric%20month,based%20on%20the%20month%20index.
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
                  DateValue = ArrayValue;
                  DateValue = DateValue.getFullYear() + "-" + (DateValue.getMonth() + 1) + "-" + DateValue.getDate() + " " + DateValue.getHours() + ":" + DateValue.getMinutes() + ":" + DateValue.getSeconds() // https://codehandbook.org/javascript-date-format/#:~:text=To%20convert%20date%20to%20format,year%20from%20the%20date%20object.&text=To%20convert%20the%20numeric%20month,based%20on%20the%20month%20index.
                  ValueCode = ValueCode + "'" + DateValue + "', ";
                } else { // Add speech marks for all other cell conditions.
                  ValueCode = ValueCode + "'" + ArrayValue + "', ";  
                }
            }  
          }
          
          // Remove last comma and space from code line.
          if (ValueCode.substring((ValueCode.length - 2),ValueCode.length) == ", "){
            ValueCode = "    (" + ValueCode.substring(0, (ValueCode.length - 2)) + "),"; // Remove last two characters and adds a bracket either side.
          }
          
          // Populate the processed ValueCode value into the new array, "CodeArray".
          CodeArray.push(ValueCode);
          //CodeArray[ArrayRowNumber] = ValueCode;
          //CodeArray[ArrayRowNumber] = ValueCode;
          
        }
        
        // Understand the dimensions of the array "CodeArray".
        CodeArrayNumberOfRows = CodeArray.length;
        var CodeArrayNumberOfColumns = CodeArray[0][0].length;
        
        // Copy the array values back into the Google Sheet.
        //for (a = CodeLineNumber; a<(CodeLineNumber + CodeArrayNumberOfRows); a++){
          //b = a - CodeLineNumber;
          //LatestValue = CodeArray[b];
          //SQLSheetName.getRange('A' + (CodeLineNumber + b)).setValue(CodeArray[b]);
        //}
        
        //TRY TO FIX THE PASTERANGE FEATURE
        //var PasteRange = SQLSheetName.getRange(CodeLineNumber,1,CodeArrayNumberOfRows,CodeArrayNumberOfColumns);
        //var PasteRangeNumberOfRows = CodeArrayNumberOfRows;
        //var PasteRangeNumberOfColumns = CodeArrayNumberOfColumns;
        //var PasteRange = SQLSheetName.getRange(CodeLineNumber,1,CodeArrayNumberOfRows + CodeLineNumber,CodeArrayNumberOfColumns);
        //var CodeArrayValues = CodeArray.getValues();
        var TestSheetName = CurrentSpreadsheet.getSheetByName('Test');
        var PasteRange = TestSheetName.getRange('A1:F1');
        
        PasteRange.setValues(CodeArray[CodeArrayNumberOfRows]); // ERROR LINE
        //PasteRange
        //TRY TO FIX THE PASTERANGE FEATURE
        
        CodeLineNumber = CodeLineNumber + b + 1;
        
        // Correct last line to have a ";" after it rather than a ",".
        
        // Write last summary line of code.
        CodeText = "/*!40000 ALTER TABLE `" + TableName + "` ENABLE KEYS */;";
        SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
        CodeLineNumber = CodeLineNumber + 1;
        
        // Move two lines down.
        CodeLineNumber = CodeLineNumber + 2;
        
      } // Skip some table names.
      
    } // i loop end - table names (i).
    
    // At end of script, consider adding some additional SQL code to mark if the generated SQL file should be a test environment writing script or normal.
    //-- Modify the activity, specialactivity and milestone table to only make testing items active.
    //UPDATE `sdp`.`activity` SET `active` = '0' WHERE (`testing` = '0');
    //UPDATE `sdp`.`activity` SET `active` = '1' WHERE (`testing` = '1');
    //UPDATE `sdp`.`specialactivity` SET `active` = '0' WHERE (`testing` = '0');
    //UPDATE `sdp`.`specialactivity` SET `active` = '1' WHERE (`testing` = '1');
    //UPDATE `sdp`.`milestone` SET `active` = '1' WHERE (`testing` = '0');
    //UPDATE `sdp`.`milestone` SET `active` = '1' WHERE (`testing` = '1');
    
    
    // Generate an .SQL of the defined content and save it at the top level of Google Drive.
    let CurrentDate,FileName,FileContent,TextFileContent; // Declare variable names.
    CurrentDate = Utilities.formatDate(new Date(), "GMT+1", "yyyyMMdd hhmmss"); // Get current date to be used in the file name. https://webapps.stackexchange.com/questions/62586/how-to-format-the-date-in-this-google-apps-script
    FileName = "test " + CurrentDate + ".sql"; // Create a new file name with date on end.
    FileContent = SQLSheetName.getRange("A:A").getValues();
    TextFileContent = FileContent.map(function (a) {return a.join('\t');}).join('\n'); //https://stackoverflow.com/questions/36756045/export-google-spreadsheet-to-text-file-using-script
    DriveApp.createFile(FileName, TextFileContent);
    
    // Log final time and report the timing. https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
    let endTime = new Date().getTime();
    let runTime = (endTime - startTime)/1000;
    Logger.log("Call for " + FunctionName + " to run took " + runTime + " seconds.");
    
    // Add a final alert to tell the user that the SQL code has been created.
    SpreadsheetUI.alert("SQL text Code successfully generated from the SDP Data in " + runTime + " seconds." + "\n" + "\n" + "Please review file " + FileName + " in your Google Drive.");
    
  }
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  function WriteSQLFile20200911() {
    
    /**
    * WriteSQLFile
    * "Write .SQL File" function, clickable on SDP Nodes & Edges menu.
    * Writes the required SQL script into the user's folder.
    * https://developers.google.com/apps-script/guides/menus
    */
    
    // Define the spreadsheet and the SQL code tab.
    const SpreadsheetUI = SpreadsheetApp.getUi(); // https://scotch.io/courses/10-need-to-know-javascript-concepts/declaring-javascript-variables-var-let-and-const
    const CurrentSpreadsheet = SpreadsheetApp.getActive();
    const FunctionName = "WriteSQLFile"; // Used for identifying log entries.
    const SQLSheetName = CurrentSpreadsheet.getSheetByName('SQL Text Code');
    Logger.log(FunctionName + '. Function initiated.');
    
    // Track the time taken for the function to execute. https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
    const startTime = new Date().getTime();
    
    // Define first and last row of SQL text and clear old data. Select the column we will check for the first blank cell and get the last row based on the data range of a single column. See Re-Usable Functions: function GetLastRowSpecial(range) - https://yagisanatode.com/2019/05/11/google-apps-script-get-the-last-row-of-a-data-range-when-other-columns-have-content-like-hidden-formulas-and-check-boxes/
    let FirstRow = 14; // let can be overwritten but keeps the variable type.
    var ColumnToCheck = SQLSheetName.getRange("A:A").getValues(); // Check first column - usually id column.
    let LastRow = GetLastRowSpecial(ColumnToCheck,'SQL Text Code');
    if (LastRow < 14) {
      LastRow = 14;
    }
    SQLSheetName.getRange('A14:A' + LastRow).clearContent();
    
    // Define the code number line.
    let CodeLineNumber = FirstRow;
    
    // Define the table name sheet and last row of table name sheet.
    let TableNameSheetName = CurrentSpreadsheet.getSheetByName('Table Names');
    ColumnToCheck = TableNameSheetName.getRange("B:B").getValues(); // Check first column - usually id column.
    let LastRowTableTab = GetLastRowSpecial(ColumnToCheck,'Table Names');
    
    // Declare the variable names used in the loops outside of the loop for better efficiency. Declare let(s). let can be overwritten but keeps the variable type.
    let i,y,HeaderCode,TableName,SheetName,RowCount,CodeText,LastColumn,ArrayRange,ArrayValues,ArrayValuesNumberOfRows,ArrayValuesNumberOfColumns; 
    let RowNumber,ArrayRowNumber,ValueCode,ColumnNumber,ArrayColumnNumber,ArrayValue,DateValue,CodeArrayNumberOfRows,a,b,LatestValue;
    var CodeArray;
    
    // Create an initial displayMessage to add to.
    const displayTitle = "SQL Code Generator";
    let displayMessage = "Writing SQL Code.";
    const displayBarWidth = 200;
    writeMessageToSidebar(displayTitle,displayMessage,displayBarWidth);
    
    // Loop through table names (i).
    for (i = 2; i <= LastRowTableTab; i++) { // 2 skips the header.
      
      // Define the Header code string and the Table name.
      HeaderCode = "";
      TableName = TableNameSheetName.getRange(i, 2).getValue(); // Loop through second column.
      
      // REMOVE WHEN DONE DEBUGGING
      if (TableName == "property"){
        Logger.log("Stop");
      }
      // REMOVE WHEN DONE DEBUGGING
      
      // Deal with tables that shouldn't be included in the code as we don't want their data loaded into the database.
      if (TableName == "savedproject" || TableName == "usergroup" || TableName == "user_usergroup"){
        
        // Do nothing to skip these tables without action.
        
      } else {
        
        // For the selected table, get number of rows on tab. Select the column we will check for the first blank cell and get the last row based on the data range of a single column. See Re-Usable Functions: function GetLastRowSpecial(range) - https://yagisanatode.com/2019/05/11/google-apps-script-get-the-last-row-of-a-data-range-when-other-columns-have-content-like-hidden-formulas-and-check-boxes/
        SheetName = CurrentSpreadsheet.getSheetByName(TableName);
        ColumnToCheck = SheetName.getRange("A:A").getValues(); // Check first column - usually id column.
        RowCount = GetLastRowSpecial(ColumnToCheck,TableName);
        
        // Code into an array.
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
        LastColumn = TableNameSheetName.getRange(i, 3).getValue();
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
        // Code into an array.
        
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
                } else if (ArrayValue == "'Cote d'Ivoire'"){
                  ValueCode = ValueCode + "'Cote d\'Ivoire', "; // Add speech marks and change country name if Ivory Coast.
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
                //DateValue = ArrayValue;
                DateValue = Utilities.formatDate(ArrayValue, "GMT", "yyyy-MM-dd HH:mm:ss"); 
                //DateValue = DateValue.getFullYear() + "-" + appendLeadingZeroes((DateValue.getMonth() + 1)) + "-" + appendLeadingZeroes(DateValue.getDate()) + " " + appendLeadingZeroes(DateValue.getHours()) + ":" + appendLeadingZeroes(DateValue.getMinutes()) + ":" + appendLeadingZeroes(DateValue.getSeconds()) // https://codehandbook.org/javascript-date-format/#:~:text=To%20convert%20date%20to%20format,year%20from%20the%20date%20object.&text=To%20convert%20the%20numeric%20month,based%20on%20the%20month%20index.
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
                  //DateValue = ArrayValue;
                  DateValue = Utilities.formatDate(ArrayValue, "GMT", "yyyy-MM-dd HH:mm:ss"); 
                  //DateValue = DateValue.getFullYear() + "-" + appendLeadingZeroes((DateValue.getMonth() + 1)) + "-" + appendLeadingZeroes(DateValue.getDate()) + " " + appendLeadingZeroes(DateValue.getHours()) + ":" + appendLeadingZeroes(DateValue.getMinutes()) + ":" + appendLeadingZeroes(DateValue.getSeconds()) // https://codehandbook.org/javascript-date-format/#:~:text=To%20convert%20date%20to%20format,year%20from%20the%20date%20object.&text=To%20convert%20the%20numeric%20month,based%20on%20the%20month%20index.
                  ValueCode = ValueCode + "'" + DateValue + "', ";
                } else { // Add speech marks for all other cell conditions.
                  ValueCode = ValueCode + "'" + ArrayValue + "', ";  
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
          //CodeArray[ArrayRowNumber] = ValueCode;
          
        }
        
        // Understand the dimensions of the array "CodeArray".
        CodeArrayNumberOfRows = CodeArray.length;
        //var CodeArrayNumberOfColumns = CodeArray[0][0].length;
        
        // Copy the array values back into the Google Sheet.
        //for (a = CodeLineNumber; a<(CodeLineNumber + CodeArrayNumberOfRows); a++){
          //b = a - CodeLineNumber;
          //LatestValue = CodeArray[b];
          //SQLSheetName.getRange('A' + (CodeLineNumber + b)).setValue(CodeArray[b]);
        //}
        
        //TRY TO FIX THE PASTERANGE FEATURE
        //var PasteRange = SQLSheetName.getRange(CodeLineNumber,1,CodeArrayNumberOfRows,CodeArrayNumberOfColumns);
        //var PasteRangeNumberOfRows = CodeArrayNumberOfRows;
        //var PasteRangeNumberOfColumns = CodeArrayNumberOfColumns;
        //var PasteRange = SQLSheetName.getRange(CodeLineNumber,1,CodeArrayNumberOfRows + CodeLineNumber,CodeArrayNumberOfColumns);
        //var CodeArrayValues = CodeArray.getValues();
        //var TestSheetName = CurrentSpreadsheet.getSheetByName('Test');
        //var PasteRange = TestSheetName.getRange(1,1,CodeArrayNumberOfRows,1);
        //PasteRange.setValues(CodeArray); // ERROR LINE
        var PasteRange = SQLSheetName.getRange(CodeLineNumber,1,CodeArrayNumberOfRows,1);
        PasteRange.setValues(CodeArray);
        //PasteRange
        //TRY TO FIX THE PASTERANGE FEATURE
        
        // Offset the CodeLineNumber under the pasted array length.
        CodeLineNumber = CodeLineNumber + CodeArrayNumberOfRows;
        
        // Correct last line to have a ";" after it rather than a ",".
        
        // Write last summary line of code.
        CodeText = "/*!40000 ALTER TABLE `" + TableName + "` ENABLE KEYS */;";
        SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
        CodeLineNumber = CodeLineNumber + 1;
        
        // Move two lines down.
        CodeLineNumber = CodeLineNumber + 2;
        
      } // Skip some table names.
      
      Logger.log("Writing SQL Code. Table " + (i - 1) + ' of ' + (LastRowTableTab - 1) + ' complete.'); // - 1s offset header rows.
      displayMessage = displayMessage + "<br />" + (i - 1) + ' of ' + (LastRowTableTab - 1) + ' complete.'; // - 1s offset header rows.
      writeMessageToSidebar(displayTitle,displayMessage,displayBarWidth);
      
    } // i loop end - table names (i).
    
    // At end of script, consider adding some additional SQL code to mark if the generated SQL file should be a test environment writing script or normal.
    //-- Modify the activity, specialactivity and milestone table to only make testing items active.
    //UPDATE `sdp`.`activity` SET `active` = '0' WHERE (`testing` = '0');
    //UPDATE `sdp`.`activity` SET `active` = '1' WHERE (`testing` = '1');
    //UPDATE `sdp`.`specialactivity` SET `active` = '0' WHERE (`testing` = '0');
    //UPDATE `sdp`.`specialactivity` SET `active` = '1' WHERE (`testing` = '1');
    //UPDATE `sdp`.`milestone` SET `active` = '1' WHERE (`testing` = '0');
    //UPDATE `sdp`.`milestone` SET `active` = '1' WHERE (`testing` = '1');
    
    
    // Generate an .SQL of the defined content and save it at the top level of Google Drive.
    let CurrentDate,FileName,FileContent,TextFileContent; // Declare variable names.
    CurrentDate = Utilities.formatDate(new Date(), "GMT+1", "yyyyMMdd HHmmss"); // Get current date to be used in the file name. https://webapps.stackexchange.com/questions/62586/how-to-format-the-date-in-this-google-apps-script
    FileName = "test " + CurrentDate + ".sql"; // Create a new file name with date on end.
    FileContent = SQLSheetName.getRange("A:A").getValues();
    TextFileContent = FileContent.map(function (a) {return a.join('\t');}).join('\n'); //https://stackoverflow.com/questions/36756045/export-google-spreadsheet-to-text-file-using-script
    DriveApp.createFile(FileName, TextFileContent);
    
    // Log final time and report the timing. https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
    let endTime = new Date().getTime();
    let runTime = (endTime - startTime)/1000;
    Logger.log("Call for " + FunctionName + " to run took " + runTime + " seconds.");
    
    // Add a final alert to tell the user that the SQL code has been created.
    SpreadsheetUI.alert("SQL text Code successfully generated from the SDP Data in " + runTime + " seconds." + "\n" + "\n" + "Please review file " + FileName + " in your Google Drive.");
    
  }
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  function WriteSQLFile20200910() {
    
    /**
    * WriteSQLFile
    * "Write .SQL File" function, clickable on SDP Nodes & Edges menu.
    * Writes the required SQL script into the users downloads folder.
    * https://developers.google.com/apps-script/guides/menus
    */
    
    // Define the spreadsheet and the SQL code tab.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    var FunctionName = "WriteSQLFile"; // Used for identifying log entries.
    var SQLSheetName = CurrentSpreadsheet.getSheetByName('SQL Text Code');
    //SpreadsheetUI.alert('Writing SDP SQL code.' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    Logger.log(FunctionName + '. Function initiated.');
    
    // Track the time taken for the function to execute. https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
    var startTime = new Date().getTime();
    
    // Define first and last row of SQL text and clear old data.
    var FirstRow = 14;
    // Select the column we will check for the first blank cell and get the last row based on the data range of a single column. 
    // See Re-Usable Functions: function GetLastRowSpecial(range) - https://yagisanatode.com/2019/05/11/google-apps-script-get-the-last-row-of-a-data-range-when-other-columns-have-content-like-hidden-formulas-and-check-boxes/
    var ColumnToCheck = SQLSheetName.getRange("A:A").getValues(); // Check first column - usually id column.
    var LastRow = GetLastRowSpecial(ColumnToCheck);
    if (LastRow < 14) {
      LastRow = 14;
    }
    SQLSheetName.getRange('A14:A' + LastRow).clearContent();
    
    
    
    // Delete when done debugging.
    CurrentSpreadsheet.getSheetByName('Array').getRange('A100:O100').clearContent();
    // Delete when done debugging.
    
    // Create a string variable so that I can test between looping through an array ("Array") and not using an array ("No Array").
    var RunType = "Array";
    Logger.log("Run type: " + RunType); 
    
    
    
    // Define the code number line.
    var CodeLineNumber = FirstRow;
    
    // Define the table name sheet and last row of table name sheet.
    var TableNameSheetName = CurrentSpreadsheet.getSheetByName('Table Names');
    ColumnToCheck = TableNameSheetName.getRange("A:A").getValues(); // Check first column - usually id column.
    var LastRowTableTab = GetLastRowSpecial(ColumnToCheck);
    
    // Loop through table names (i).
    for (var i = 2; i <= LastRowTableTab; i++) { // 2 skips the header.
      var HeaderCode = "";
      var TableName = TableNameSheetName.getRange(i, 1).getValue();
      
      if (TableName == "property"){
        Logger.log("Stop");
      }
      
      // Deal with tables that shouldn't be included in the code.
      if (TableName == "savedproject" || TableName == "usergroup" || TableName == "user_usergroup"){
        // Do nothing to skip these tables.
      } else {
        
        // For the selected table, get number of rows on tab.
        var SheetName = CurrentSpreadsheet.getSheetByName(TableName);
        // Select the column we will check for the first blank cell and get the last row based on the data range of a single column. 
        // See Re-Usable Functions: function GetLastRowSpecial(range) - https://yagisanatode.com/2019/05/11/google-apps-script-get-the-last-row-of-a-data-range-when-other-columns-have-content-like-hidden-formulas-and-check-boxes/
        ColumnToCheck = SheetName.getRange("A:A").getValues(); // Check first column - usually id column.
        var RowCount = GetLastRowSpecial(ColumnToCheck);
        
        // Write first summary line of code.
        var CodeText = "'-- Exportiere Daten aus Tabelle sdp." + TableName + ": ~" + RowCount + " rows (ungefähr)";
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
        // Get last column from last data column letter stored on Table Names tab.
        var LastColumn = TableNameSheetName.getRange(i, 2).getValue();
        // Loop through columns for the table header row.
        for (var y = 1; y <= LastColumn; y++) {
          HeaderCode = HeaderCode + "`" + SheetName.getRange(1, y).getValue() + "`, ";
        }
        
        // Remove last comma and space from created HeaderCode text.
        if (HeaderCode.substring((HeaderCode.length - 2),2) == ", "){
          HeaderCode = HeaderCode.substring(1,(HeaderCode.length - 2));
        }
        CodeText = "INSERT INTO `" + TableName + "` (" + HeaderCode + ") VALUES";
        SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
        CodeLineNumber = CodeLineNumber + 1;
        
        // Write data values in.
        
        if (RunType == "Array") {
          
          // First get all of the data from the sheet into an array.
          //var ArrayRange = SheetName.getDataRange(); // (2, 1, RowCount + 1, LastColumn)
          //Logger.log("1. Table Name: " + TableName + ", RowCount: " + RowCount + ", LastColumn: " + LastColumn);
          var ArrayRange = SheetName.getRange(2, 1, RowCount - 1, LastColumn);
          var ArrayValues = ArrayRange.getValues();
          var ArrayValuesNumberOfRows = ArrayValues.length;
          var ArrayValuesNumberOfColumns = ArrayValues[0].length;
          //Logger.log("2. Table Name: " + TableName + ", ArrayValuesNumberOfRows: " + ArrayValuesNumberOfRows + ", ArrayValuesNumberOfColumns: " + ArrayValuesNumberOfColumns);
          
          // Define the array of code that I will create. This array will be a vertical single width array to be copied into the sheet later. Size doesn't matter for now.
          var CodeArray = [];
          
          // Loop down the rows, with RowNumber referring to the row numbers in the sheet.
          for (var RowNumber = 2; RowNumber <= RowCount; RowNumber++) { // 2 is the row below the header.
            
            // Set the array row number to be 2 less than the RowNumber.
            var ArrayRowNumber = RowNumber - 2;
            
            // Reset the ValueCode string.
            var ValueCode = "";
            
            // Loop across the columns with ColumnNumber referring to the column numbers in the sheet.
            for (var ColumnNumber = 1; ColumnNumber <= LastColumn; ColumnNumber++) { // 1 is the first column.
              
              // Set the array column number to be 1 less than the ColumnNumber.
              var ArrayColumnNumber = ColumnNumber - 1;
              
              // Save the value of the array element
              var ArrayValue = ArrayValues[ArrayRowNumber][ArrayColumnNumber];
              
              // REMOVE WHEN DONE DEBUGGING
              //Logger.log("3. Array Position: Row: " + ArrayRowNumber + ", Column: " + ArrayColumnNumber + ", ArrayValue: " + ArrayValue);
              // REMOVE WHEN DONE DEBUGGING
              
              // Use a switch statement to check what type of data is stored in each element of the array. Better efficiency than If statements. https://www.w3schools.com/js/js_switch.asp
              switch (typeof(ArrayValue)) {
                  
                case 'string':
                  if (ArrayValue == ""){
                    // Add speech marks for blank cells.
                    ValueCode = ValueCode + "'', ";
                  } else if (ArrayValue == "'Cote d'Ivoire'"){
                    // Add speech marks and change country name if Ivory Coast.
                    ValueCode = ValueCode + "'Cote d\'Ivoire', ";
                  } else {
                    // Add speech marks for all other cell conditions.
                    ValueCode = ValueCode + "'" + ArrayValue + "', ";
                  }
                  break;
                  
                case 'number':  // https://stackoverflow.com/questions/600763/check-if-a-variable-contains-a-numerical-value-in-javascript
                  // Don't add speech marks for numeric values.
                  ValueCode = ValueCode + ArrayValue + ", ";
                  break;
                  
                case 'date':  
                  // Add speech marks for dates and format date as "yyyy-mm-dd hh:mm:ss".
                  var DateValue = ArrayValue;
                  DateValue = DateValue.getFullYear() + "-" + (DateValue.getMonth() + 1) + "-" + DateValue.getDate() + " " + DateValue.getHours() + ":" + DateValue.getMinutes() + ":" + DateValue.getSeconds() // https://codehandbook.org/javascript-date-format/#:~:text=To%20convert%20date%20to%20format,year%20from%20the%20date%20object.&text=To%20convert%20the%20numeric%20month,based%20on%20the%20month%20index.
                  ValueCode = ValueCode + "'" + DateValue + "', ";
                  break;
                  
                case 'boolean':
                  // Add speech marks for cells containing "TRUE" or "FALSE" and ensure string is uppercase.
                  ValueCode = ValueCode + "'" + ArrayValue + "', ";
                  break;
                  
                case 'undefined':
                  // Add speech marks for all other cell conditions.
                  ValueCode = ValueCode + "'" + ArrayValue + "', ";
                  break;
                  
                default:
                  // Add catch for all other types.
                  if ((ArrayValue instanceof Date) == true){ // https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
                    // Add speech marks for dates and format date as "yyyy-mm-dd hh:mm:ss".
                    var DateValue = ArrayValue;
                    DateValue = DateValue.getFullYear() + "-" + (DateValue.getMonth() + 1) + "-" + DateValue.getDate() + " " + DateValue.getHours() + ":" + DateValue.getMinutes() + ":" + DateValue.getSeconds() // https://codehandbook.org/javascript-date-format/#:~:text=To%20convert%20date%20to%20format,year%20from%20the%20date%20object.&text=To%20convert%20the%20numeric%20month,based%20on%20the%20month%20index.
                    ValueCode = ValueCode + "'" + DateValue + "', ";
                  } else {
                    // Add speech marks for all other cell conditions.
                    ValueCode = ValueCode + "'" + ArrayValue + "', ";  
                  }
              }  
            }
            
            // Remove last comma and space from code line.
            if (ValueCode.substring((ValueCode.length - 2),ValueCode.length) == ", "){
              ValueCode = "    (" + ValueCode.substring(0, (ValueCode.length - 2)) + "),"; // Remove last two characters and adds a bracket either side.
            }
            
            // REMOVE WHEN DONE DEBUGGING
            //Logger.log("4. ArrayValuesRowNumber: " + ArrayRowNumber + ", Value: " + ValueCode);
            // REMOVE WHEN DONE DEBUGGING
            
            // Populate the processed ValueCode value into the new array, "CodeArray".
            CodeArray[ArrayRowNumber] = ValueCode;
            //CodeArray[ArrayRowNumber][ArrayColumnNumber] = ValueCode;
            
            // Understand the dimensions of the array "CodeArray".
            var CodeArrayNumberOfRows = CodeArray.length;
            var CodeArrayNumberOfColumns = CodeArray[0].length;
            //Logger.log("5. CodeArray Number Of Rows: " + CodeArrayNumberOfRows + ", CodeArray Number Of Columns: " + CodeArrayNumberOfColumns);
            
            // REMOVE WHEN DONE DEBUGGING
            //CurrentSpreadsheet.getSheetByName('Array').getRange('A' + (RowNumber - 1)).setValue(CodeArray[ArrayRowNumber]);
            //CurrentSpreadsheet.getSheetByName('Array').getRange('B' + (ArrayValuesRowNumber + 1)).setValue(CodeArray[ArrayValuesRowNumber]);
            // REMOVE WHEN DONE DEBUGGING
            
            
          }
          
          
          
          //CodeText = "    (" + ValueCode + "),";
          //SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
          //CodeLineNumber = CodeLineNumber + 1;
          
          // Copy the array values back into the Google Sheet.
          //CodeArrayNumberRow = CodeArray.length;
          //CodeArrayNumberColumn = CodeArray[0].length;
          for (var a = CodeLineNumber; a<(CodeLineNumber + CodeArrayNumberOfRows); a++){
            var b = a - CodeLineNumber;
            var LatestValue = CodeArray[b];
            SQLSheetName.getRange('A' + (CodeLineNumber + b)).setValue(CodeArray[b]);
          }
          //Logger.log("CodeArray Paste Location: Row:" + CodeLineNumber + ", Column: " + 1 + ", RowHeight: " + CodeArray.length + ", ColumnWidth: " + CodeArray[0].length);
          //var PasteRange = SQLSheetName.getRange(CodeLineNumber,1,CodeArrayNumberOfRows,CodeArrayNumberOfColumns);
          //var CodeArrayValues = CodeArray.getValues();
          //PasteRange.setValues(CodeArray); // ERROR LINE
          
          CodeLineNumber = CodeLineNumber + b + 1;
          
        } else if (RunType == "No Array") {
          
          // Loop down the tab rows, from 2 (just below the header) to the last row.
          for (var z = 2; z <= RowCount; z++) {
            var ValueCode = "";
            // Loop from the first column to the last.
            for (var y = 1; y <= LastColumn; y++) {
              
              // REMOVE WHEN DONE DEBUGGING
              var SheetAndCell = "Table: " + TableName + " Col: " + y + ", Row: " + z;
              var SheetAndCellValue = SheetName.getRange(z, y).getValue(); 
              Logger.log(SheetAndCell + " Value: " + SheetAndCellValue);
              // REMOVE WHEN DONE DEBUGGING
              
              //if (TableName == "edge"){
              // Do nothing for now.
              //} else if (TableName == "activity") {
              // Do nothing for now.
              //} else {
              // Do nothing.
              //}
              
              // Use a switch statement to check what type of data is stored in the cell. Better efficiency than If statements. https://www.w3schools.com/js/js_switch.asp
              switch (typeof(SheetName.getRange(z, y).getValue())) {
                  
                case 'string':
                  if (SheetName.getRange(z, y).getValue() == ""){
                    // Add speech marks for blank cells.
                    ValueCode = ValueCode + "'', ";
                  } else if (SheetName.getRange(z, y).getValue() == "Cote d'Ivoire"){
                    // Add speech marks and change country name if Ivory Coast.
                    ValueCode = ValueCode + "'Cote d\'Ivoire', ";
                  } else {
                    // Add speech marks for all other cell conditions.
                    ValueCode = ValueCode + "'" + SheetName.getRange(z, y).getValue() + "', ";
                  }
                  break;
                  
                case 'number':  // https://stackoverflow.com/questions/600763/check-if-a-variable-contains-a-numerical-value-in-javascript
                  // Don't add speech marks for numeric values.
                  ValueCode = ValueCode + SheetName.getRange(z, y).getValue() + ", ";
                  break;
                  
                case 'date':  
                  // Add speech marks for dates and format date as "yyyy-mm-dd hh:mm:ss".
                  var DateValue = SheetName.getRange(z, y).getValue();
                  DateValue = DateValue.getFullYear() + "-" + (DateValue.getMonth() + 1) + "-" + DateValue.getDate() + " " + DateValue.getHours() + ":" + DateValue.getMinutes() + ":" + DateValue.getSeconds() // https://codehandbook.org/javascript-date-format/#:~:text=To%20convert%20date%20to%20format,year%20from%20the%20date%20object.&text=To%20convert%20the%20numeric%20month,based%20on%20the%20month%20index.
                  ValueCode = ValueCode + "'" + DateValue + "', ";
                  break;
                  
                case 'boolean':
                  // Add speech marks for cells containing "TRUE" or "FALSE" and ensure string is uppercase.
                  ValueCode = ValueCode + "'" + SheetName.getRange(z, y).getValue() + "', ";
                  break;
                  
                case 'undefined':
                  // Add speech marks for all other cell conditions.
                  ValueCode = ValueCode + "'" + SheetName.getRange(z, y).getValue() + "', ";
                  break;
                  
                default:
                  if ((SheetName.getRange(z, y).getValue() instanceof Date) == true){ // https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
                    // Add speech marks for dates and format date as "yyyy-mm-dd hh:mm:ss".
                    var DateValue = SheetName.getRange(z, y).getValue();
                    DateValue = DateValue.getFullYear() + "-" + (DateValue.getMonth() + 1) + "-" + DateValue.getDate() + " " + DateValue.getHours() + ":" + DateValue.getMinutes() + ":" + DateValue.getSeconds() // https://codehandbook.org/javascript-date-format/#:~:text=To%20convert%20date%20to%20format,year%20from%20the%20date%20object.&text=To%20convert%20the%20numeric%20month,based%20on%20the%20month%20index.
                    ValueCode = ValueCode + "'" + DateValue + "', ";
                  } else {
                    // Add speech marks for all other cell conditions.
                    ValueCode = ValueCode + "'" + SheetName.getRange(z, y).getValue() + "', ";  
                  }
              } // Switch end.
            } // y loop end.
            
            // Remove last comma and space from code line.
            if (ValueCode.substring((ValueCode.length - 2),ValueCode.length) == ", "){
              ValueCode = ValueCode.substring(0, (ValueCode.length - 2)); // Remove last two characters.
            }
            
            CodeText = "    (" + ValueCode + "),";
            SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
            CodeLineNumber = CodeLineNumber + 1;
            
          } // z loop end.
          
        } // RunType end.      
        
        // Correct last line to have a ";" after it rather than a ",".
        
        // Write last summary line of code.
        CodeText = "/*!40000 ALTER TABLE `" + TableName + "` ENABLE KEYS */;";
        SQLSheetName.getRange('A' + CodeLineNumber).setValue(CodeText);
        CodeLineNumber = CodeLineNumber + 1;
        
        // Move two lines down.
        CodeLineNumber = CodeLineNumber + 2;
        
      } // Skip some table names.
      
    } // i loop end - table names (i).
    
    // If statements re-organised from VBA script for better efficiency.
    //            //if (SheetName.getRange(z, y).getValue() == ""){
    //            if (SheetName.getRange(z, y).getValue() == "" || SheetName.getRange(z, y).getValue() == "TRUE" || SheetName.getRange(z, y).getValue() == "FALSE"){
    //              // Add speech marks for blank cells or for cells containing "TRUE" or "FALSE".
    //              //ValueCode = ValueCode + "'', "; Old deleted code.
    //              ValueCode = ValueCode + "'" + SheetName.getRange(z, y).getValue() + "', ";
    
    //            } else if (typeof(SheetName.getRange(z, y).getValue()) === 'number') { //  https://stackoverflow.com/questions/600763/check-if-a-variable-contains-a-numerical-value-in-javascript
    //              // Don't add speech marks for numeric values.
    //              ValueCode = ValueCode + SheetName.getRange(z, y).getValue() + ", ";
    
    //            } else if (typeof(SheetName.getRange(z, y).getValue()) === 'date') {
    //              // Add speech marks for dates and trade "/" for "-".
    //              var DateValue = SheetName.getRange(z, y).getValue();
    //              ValueCode = ValueCode + "'" + DateValue.replace("/", "-") + "', ";
    
    //            } else if (SheetName.getRange(z, y).getValue() == "NULL"){
    //              // Don't add speech marks for "NULL" values.
    //              ValueCode = ValueCode + SheetName.getRange(z, y).getValue() + ", ";
    
    //            //} else if (SheetName.getRange(z, y).getValue() == "TRUE" || SheetName.getRange(z, y).getValue() == "FALSE"){
    //              // Add speech marks for cells containing "TRUE" or "FALSE" and ensure string is uppercase.
    //              //ValueCode = ValueCode + "'" + SheetName.getRange(z, y).getValue().toUpperCase() + "', ";
    
    //            } else if (SheetName.getRange(z, y).getValue() == "Cote d'Ivoire"){
    //              // Add speech marks and change country name if Ivory Coast.
    //              ValueCode = ValueCode + "'Cote d\'Ivoire', ";
    
    //            } else {
    //              // Add speech marks for all other cell conditions.
    //              ValueCode = ValueCode + "'" + SheetName.getRange(z, y).getValue() + "', ";
    //            }
    
    
    
    // At end of script, consider adding some additional SQL code to mark if the generated SQL file should be a test environment writing script or normal.
    //-- Modify the activity, specialactivity and milestone table to only make testing items active.
    //UPDATE `sdp`.`activity` SET `active` = '0' WHERE (`testing` = '0');
    //UPDATE `sdp`.`activity` SET `active` = '1' WHERE (`testing` = '1');
    //UPDATE `sdp`.`specialactivity` SET `active` = '0' WHERE (`testing` = '0');
    //UPDATE `sdp`.`specialactivity` SET `active` = '1' WHERE (`testing` = '1');
    //UPDATE `sdp`.`milestone` SET `active` = '1' WHERE (`testing` = '0');
    //UPDATE `sdp`.`milestone` SET `active` = '1' WHERE (`testing` = '1');
    
    
    
    
    // Get current date to be used in the file name.
    // https://webapps.stackexchange.com/questions/62586/how-to-format-the-date-in-this-google-apps-script
    var CurrentDate = Utilities.formatDate(new Date(), "GMT+1", "yyyymmdd hhmmss")
    
    // Generate an .SQL of the defined content and save it at the top level of Google Drive.
    // function createGoogleDriveTextFile()
    // https://riptutorial.com/google-apps-script/example/22010/create-a-new-text-file-in-google-root-drive-folder
    var FileName,FileContent,NewFile; // Declare variable names.
    FileName = "test " + CurrentDate + ".sql"; // Create a new file name with date on end.
    FileContent = "This is the file Content";
    NewFile = DriveApp.createFile(FileName,FileContent); // Create a new text file in the root folder.
    
    // Log final time and report the timing. https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute
    var endTime = new Date().getTime();
    var runTime = (endTime - startTime)/1000;
    Logger.log("Call for " + FunctionName + " to run took " + runTime + " seconds.");
    
    // Add a final alert to tell the user that the SQL code has been created.
    SpreadsheetUI.alert("SQL text Code successfully generated from the SDP Data in " + runTime + " seconds." + "\n" + "\n" + "Please review file " + FileName + ".");
    
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function getEmailAddress() {
    
    // Get active user name. // https://stackoverflow.com/questions/40817388/extract-first-and-last-name-from-pattern-email-address
    var CurrentUserEmailAddress = Session.getActiveUser().getEmail();
    var UserFullName = CurrentUserEmailAddress.split('@')[0].split('.');
    var FirstName = UserFullName[0];
    var LastName = UserFullName[ UserFullName.length-1 ];
    // Capitalise the name. Re-use same variables. // https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
    FirstName = FirstName.charAt(0).toUpperCase() + FirstName.slice(1);
    LastName = LastName.charAt(0).toUpperCase() + LastName.slice(1);
    UserFullName = FirstName + ' ' + LastName;
  
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  /** @OnlyCurrentDoc */
  // Only runs on the current doc, rather than on all open Google Sheet documents.
  
  function onEdit20200617(e) {
    
    /**
    * onEdit Function
    * SDP Nodes & Edges sheet onEdit functions.
    * https://developers.google.com/apps-script/guides/triggers
    * http://eyana.me/create-a-simple-changelog-using-google-apps-scripts/#fn:1
    */
    
    // Add an initial log of code to indicate the code begins running successfully.
    Logger.log('Initialising code. OnEdit code initiated.');
    
    // Delete when correcting the code. Add lots more early function exits early on.
    return;
    
    // Define the spreadsheet and the sheet name on which the change is made.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    var CurrentSheetName = CurrentSpreadsheet.getActiveSheet().getName();
    var CurrentSheet = CurrentSpreadsheet.getSheetByName(CurrentSheetName);
  
    // Get the old value in the cell and the new value.
    var CurrentCell = CurrentSpreadsheet.getActiveRange();
    var OriginalValue = e.oldValue;
    var NewValue = CurrentCell.getValue();
    
    Logger.log('OnEdit. Initial variables set up.');
    
    // Define the change log variables. If the change log sheet doesn't exist, create it.
    var ChangeLogSheetName = 'AutoChangeLog';
    var ChangeLogSheet = CurrentSpreadsheet.getSheetByName(ChangeLogSheetName);
    if (ChangeLogSheet == null) {
      CreateChangeLog(CurrentSpreadsheet, ChangeLogSheet, ChangeLogSheetName) 
    }
    
    // If change is made in the change log, do nothing and stop the code.
    Logger.log('Current sheet name = ' + CurrentSheetName + ' and the change log sheet name is: ' + ChangeLogSheetName);
    if (CurrentSheetName == ChangeLogSheetName)  {
      return false;
      Logger.log('OnEdit. Code cancelled as change on log sheet.');
      throw new Error(); // Exit the script with an error.
    }
    Logger.log('OnEdit. Check completed if ' + CurrentSheetName + ' = Change Log Sheet.');
    
    // Get the row number and column number from which the change was made.
    var row = e.range.getRow();
    var col = e.range.getColumn();
    var ModifiedAddress = ColumnToLetter(col) + row;
    Logger.log('OnEdit. Modified cell address is = ' + ModifiedAddress + '.')
    
    // Make additional log changes if on a particular sheet.
    if (row == 1) {
      Logger.log('OnEdit. row is = ' + row + ' therefore skip time stamp change.')
    } else {
      Logger.log('OnEdit. row is = ' + row + ' therefore add time stamp.')
      // Note: || means if or statement.
      if (CurrentSheetName == 'node' || CurrentSheetName == 'specialnode') { 
        Logger.log('OnEdit. Change made on "node" or "specialnode" sheet. Update timeChanged column value.');
        var timeChangedColumnLetter = "AG"
        var timeChangedColumn = LetterToColumn(timeChangedColumnLetter)
        if (col < timeChangedColumn) {
          // Change to the left of the timeChangedColumn so update the time.
          CurrentSheet.getRange(row,timeChangedColumn).setValue(new Date());
        }
      } else if (CurrentSheetName == 'edge') { 
        Logger.log('OnEdit. Change made on "Edges" sheet. Update timeChanged column value.');
        var timeChangedColumnLetter = "L"
        var timeChangedColumn = LetterToColumn(timeChangedColumnLetter)
        if (col < timeChangedColumn) {
          // Change to the left of the timeChangedColumn so update the time.
          CurrentSheet.getRange(row,timeChangedColumn).setValue(new Date());
        }
      } else if (CurrentSheetName == 'specialedge') { 
        Logger.log('OnEdit. Change made on "Special Edges" sheet. Update timeChanged column value.');
        var timeChangedColumnLetter = "M"
        var timeChangedColumn = LetterToColumn(timeChangedColumnLetter)
        if (col < timeChangedColumn) {
          // Change to the left of the timeChangedColumn so update the time.
          CurrentSheet.getRange(row,timeChangedColumn).setValue(new Date());
        }
      } else if (CurrentSheetName == 'milestone') { 
        Logger.log('OnEdit. Change made on "Milestones" sheet. Update timeChanged column value.');
        var timeChangedColumnLetter = "AK"
        var timeChangedColumn = LetterToColumn(timeChangedColumnLetter)
        if (col < timeChangedColumn) {
          // Change to the left of the timeChangedColumn so update the time.
          CurrentSheet.getRange(row,timeChangedColumn).setValue(new Date());
        }
      } else if (CurrentSheetName == 'feedbackEdges') { 
        Logger.log('OnEdit. Change made on "Feedback Edges" sheet. Update timeChanged column value.');
        var timeChangedColumnLetter = "H"
        var timeChangedColumn = LetterToColumn(timeChangedColumnLetter)
        if (col < timeChangedColumn) {
          // Change to the left of the timeChangedColumn so update the time.
          CurrentSheet.getRange(row,timeChangedColumn).setValue(new Date());
        }
      } else if (CurrentSheetName == 'task_has_deliverable') { 
        Logger.log('OnEdit. Change made on "Task Has Deliverables" sheet. Update timeChanged column value.');
        var timeChangedColumnLetter = "G"
        var timeChangedColumn = LetterToColumn(timeChangedColumnLetter)
        if (col < timeChangedColumn) {
          // Change to the left of the timeChangedColumn so update the time.
          CurrentSheet.getRange(row,timeChangedColumn).setValue(new Date());
        }
      } else if (CurrentSheetName == 'task_has_prerequisite') { 
        Logger.log('OnEdit. Change made on "Task Has Prerequisite" sheet. Update timeChanged column value.');
        var timeChangedColumnLetter = "H"
        var timeChangedColumn = LetterToColumn(timeChangedColumnLetter)
        if (col < timeChangedColumn) {
          // Change to the left of the timeChangedColumn so update the time.
          CurrentSheet.getRange(row,timeChangedColumn).setValue(new Date());
        }
      }
    }
    
    // Define the type change.
    var TypeChange = "Edit";
    if (OriginalValue == null){
      TypeChange = "Add";
    } else if (NewValue == "") {
      TypeChange = "Remove";  
    }
    Logger.log('OnEdit. Modified cell data collected.');
    
    // Get active user name.
    var CurrentUser = Session.getEffectiveUser().getEmail();
  
    // Log that the workbook has been editted.
    var ChangeLogSheet = CurrentSpreadsheet.getSheetByName(ChangeLogSheetName);
    var LastRow = ChangeLogSheet.getLastRow();
    ChangeLogSheet.getRange(LastRow + 1,1).setValue(CurrentSheetName); // Log the sheet name.
    ChangeLogSheet.getRange(LastRow+1,2).setValue(TypeChange); // Log the change type.
    ChangeLogSheet.getRange(LastRow+1,3).setValue(ModifiedAddress); // Log the cell address.
    ChangeLogSheet.getRange(LastRow+1,4).setValue(OriginalValue); // Log the old value.
    ChangeLogSheet.getRange(LastRow+1,5).setValue(NewValue); // Log the new value.
    ChangeLogSheet.getRange(LastRow+1,6).setValue(new Date()); // Log the current date and time.
    ChangeLogSheet.getRange(LastRow+1,7).setValue(CurrentUser); // Log the current user email.
    ChangeLogSheet.autoResizeColumns(1, 7); // Resize columns after data entered.
    ChangeLogSheet.setColumnWidth(4, 250); // Manually resize old cell value column.
    ChangeLogSheet.setColumnWidth(5, 250); // Manually resize new cell value column.
    Logger.log('OnEdit. Change logged.');  
    
    // Add a hyperlink to the modifed cell number.
    var SheetID  = CurrentSpreadsheet.getSheetByName(CurrentSheetName).getSheetId();
    var FormulaText = '=HYPERLINK("#gid=' + SheetID + '&range=' + ModifiedAddress + '","' + ModifiedAddress + '")';
    ChangeLogSheet.getRange(LastRow+1,3).setShowHyperlink(true);
    ChangeLogSheet.getRange(LastRow+1,3).setFormula(FormulaText);
    Logger.log('OnEdit. Hyperlink added.');
    
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  /** @OnlyCurrentDoc */
  // Only runs on the current doc, rather than on all open Google Sheet documents.
  
  function onOpen20200617(e) {
    
    /**
    * onOpen Function
    * SDP Data sheet onOpen functions.
    * https://developers.google.com/apps-script/guides/triggers
    */
    
    // Add an alert to tell the user that the sheet is setting up.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    var FunctionName = "OnOpen";
    SpreadsheetUI.alert('SDP Data Sheet opened. Setting up sheet...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Create custom menu items for the user to use.
    // https://developers.google.com/apps-script/guides/menus
    SpreadsheetUI.createMenu('SDP Data Menu')
        .addItem('Export All CSV Files', 'ExportAllCSVfiles')
        .addItem('Email SDP Data Summary', 'EmailSDPDataSummary')
        .addSeparator()
        .addSubMenu(SpreadsheetUI.createMenu('Formatting')
             .addSubMenu(SpreadsheetUI.createMenu('Main Data')
                         .addItem('Update Nodes Tab Formatting', 'ConditionalFormattingNodeTab')
                         .addItem('Update Edges Tab Formatting', 'ConditionalFormattingEdgeTab')
                         .addItem('Update Special Nodes Tab Formatting', 'ConditionalFormattingSpecialNodeTab')
                         .addItem('Update Special Edges Tab Formatting', 'ConditionalFormattingSpecialEdgeTab'))
             .addSubMenu(SpreadsheetUI.createMenu('Secondary Data')
                         .addItem('Update Milestones Tab Formatting', 'ConditionalFormattingMilestoneTab')
                         .addItem('Update Feedback Edges Tab Formatting', 'ConditionalFormattingFeedbackEdgeTab')
                         .addItem('Update Team Tab Formatting', 'ConditionalFormattingTeamTab')
                         .addItem('Update Task Tab Formatting', 'ConditionalFormattingTaskTab')
                         .addItem('Update Deliverable Formatting', 'ConditionalFormattingDeliverableTab')
                         .addItem('Update Task Has Deliverable Formatting', 'ConditionalFormattingTaskHasDeliverableTab')
                         .addItem('Update Task Has Prerequisite Formatting', 'ConditionalFormattingTaskHasPrerequisiteTab')
                         .addItem('Update Property Formatting', 'ConditionalFormattingPropertyTab')
                         .addItem('Update Property Has Node Formatting', 'ConditionalFormattingPropertyHasNodeTab')
                         .addItem('Update Swimlane Formatting', 'ConditionalFormattingSwimlaneTab')))
        .addSubMenu(SpreadsheetUI.createMenu('Exporting')
            .addItem('Export Nodes Tab As CSV', 'ExportNodesCSV')
            .addItem('Export Edges Tab As CSV', 'ExportEdgesCSV')
            .addItem('Export Special Nodes Tab As CSV', 'ExportSpecialNodesCSV')
            .addItem('Export Special Edges Tab As CSV', 'ExportSpecialEdgesCSV'))
        .addSubMenu(SpreadsheetUI.createMenu('More Functions')
            .addItem('Write .SQL File', 'WriteSQLFile'))
        .addToUi();
    
    // Add an initial log of code to indicate the code begins running successfully.
    Logger.log(FunctionName + ' Initialising code.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Get active user name.
    var CurrentUser = Session.getActiveUser().getEmail();
    
    // Add a note on the AutoChangeLog to show macro has run.
    var SheetName = CurrentSpreadsheet.getSheetByName('AutoChangeLog');
    var LastRow = SheetName.getLastRow();
    // Log that the workbook has been opened.
    SheetName.getRange(LastRow+1,1).setValue('Workbook'); // Log the term 'Workbook'.
    SheetName.getRange(LastRow+1,2).setValue('Open'); // Log the change type.
    SheetName.getRange(LastRow+1,3).setValue('n/a'); // Log the cell address as n/a.
    SheetName.getRange(LastRow+1,6,1,2).setValue(new Date()); // Log the current date/time in both columns.
    SheetName.getRange(LastRow+1,8).setValue(CurrentUser);
    
    // Conditional formatting code removed as causing Time Out Error: "Exceeded maximum execution time".
    
    // Conditionally format the Nodes sheet.
    //ConditionalFormattingNodesSheet(CurrentSpreadsheet)
    //Logger.log('Nodes tab updated. Returned to OnOpen code.');
    //SpreadsheetUI.alert('Nodes tab updated.');
    
    // Conditionally format the Edges sheet.
    //ConditionalFormattingEdgesSheet(CurrentSpreadsheet);
    //Logger.log('Edges tab updated. Returned to OnOpen code.');
    //SpreadsheetUI.alert('Edges tab updated.');  
    
    // Add a final alert to tell the user that the sheet is set up and ready for modifcation.
    SpreadsheetUI.alert('SDP Data Sheet successfully set up.' + '\n' + '\n' + 'Please begin using the sheet.');
    
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function CreateChangeLog20200617(CurrentSpreadsheet, ChangeLogSheet, ChangeLogSheetName) {
    
    Logger.log('CreateChangeLog. Function initiated.');
    
    // Give user a message box that change log is being set up and give them option to cancel.
    // https://stackoverflow.com/questions/49792875/how-to-use-browser-msgbox-responses-in-google-spreadsheet-app
    var SpreadsheetUI = SpreadsheetApp.getUi();   
    var response = Browser.msgBox('Change Log', 'Change log sheet: "' + ChangeLogSheetName + '" being added.' + '\n' + '\n' + 'Please wait until you receive the next message before continuing.', Browser.Buttons.OK_CANCEL);
    Logger.log('Response is: ' + response + '.');
    if (response == "ok") {
       Logger.log('CreateChangeLog. The user clicked "OK."');
    } else {
       Logger.log('CreateChangeLog. The user clicked "CANCEL. Code cancelled as instructed.');
       return false;
       throw new Error(); // Exit the script with an error. 
    } 
    // Add the new sheet.
    ChangeLogSheet = CurrentSpreadsheet.insertSheet(ChangeLogSheetName, CurrentSpreadsheet.getNumSheets());
    Logger.log('CreateChangeLog. Change log sheet tab added.');
    // Set up the sheet by adding headers, freezing the top row and protecting the sheet.
    // Colour header row, add header text and freeze row with a filter.
      ChangeLogSheet.getRange('A1:G1')
        .setBackground('#666666')
        .setFontWeight('bold')
        .setFontColor('#ffffff');
      ChangeLogSheet.appendRow(["Sheet Name", "Type Of Change", "Cell(s) Changed", "Old Value", "New Value", "Date And Time Of Change", "User"]); 
      ChangeLogSheet.setFrozenRows(1);
      var LastRow = ChangeLogSheet.getMaxRows();
      ChangeLogSheet.getRange('A1:G' + LastRow).createFilter();
    // Turn off gridlines.
      ChangeLogSheet.setHiddenGridlines(true);
    // Format the date and time column to the correct format.
      var LastRow = ChangeLogSheet.getMaxRows();
      ChangeLogSheet.getRange('F2:F' + LastRow).setNumberFormat('yyyy"-"mm"-"dd" "hh":"mm":"ss');
      ChangeLogSheet.getRange('D2:F' + LastRow).setHorizontalAlignment('left');
    // Protect the sheet.
      ChangeLogSheet.protect();
    // Add a final alert to tell the user that the sheet is set up and ready for modifcation.
    SpreadsheetUI.alert('Change log successfully set up.' + '\n' + '\n' + 'Please continue using the document.');
    
    Logger.log('CreateChangeLog. Function successfully completed.');
    
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function ConditionalFormattingTaskHasDeliverableTab20200612() {
   
    /**
    * ConditionalFormattingTaskHasDeliverableTab Function.
    * Conditionally formats the TaskHasDeliverable Tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Task_Has_Deliverable tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the sheet and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName('task_has_deliverable');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('task_has_deliverable'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    Logger.log('Task_Has_Deliverable Sheet: Initial sheet variables updated.');
    
    // Clear all formatting below header row.
    
    CurrentSpreadsheet.getRange('2:' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    
    Logger.log('Task_Has_Deliverable Sheet: Initial formatting cleared.');
    
    // Set up a number of column references to be used below.
    var FirstDataColumnLetter = "B";
    var LastDataColumnLetter = "H";
    var LineStatusColumnLetter = "J";
    var RemarkColumnLetter = "K";
    var OwnerColumnLetter = "O";
    
    Logger.log('Task_Has_Deliverable Sheet: Column references set up.');
    
    // Checking Rules.
    
    // Blank Check. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(OwnerColumnLetter + FirstRow + ':' + OwnerColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($B' + FirstRow + '=""),A' + FirstRow + '="")')
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
    
    // Deleted Parts. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Deleted."')
       .setBackground('#000000')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Task_Has_Deliverable Sheet: Checking Rules formatting updated.');
    
    // Owner Formatting.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Task_Has_Deliverable Sheet: Owner formatting updated.');
    
    // Line Status Text.
    
    // Loaded In To Be Tested. 
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Loaded In To Be Tested."')
       .setFontColor('#70ad47')
       .build());
    
    // WIP.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="WIP."')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Task_Has_Deliverable Sheet: Line Status Text formatting updated.');
    
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Task_Has_Deliverable tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');  
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function ConditionalFormattingPropertyHasNodeTab20200612() {
   
    /**
    * ConditionalFormattingPropertyHasNodeTab Function.
    * Conditionally formats the Property Has Node Tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Property Has Node tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the sheet and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName('property_has_node');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('property_has_node'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    Logger.log('Property Has Node Sheet: Initial sheet variables updated.');
    
    // Clear all formatting below header row.
    
    CurrentSpreadsheet.getRange('2:' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    
    Logger.log('Property Has Node Sheet: Initial formatting cleared.');
    
    // Set up a number of column references to be used below.
    var FirstDataColumnLetter = "B";
    var LastDataColumnLetter = "C";
    var LineStatusColumnLetter = "E";
    var RemarkColumnLetter = "F";
    var OwnerColumnLetter = "K";
    
    Logger.log('Property Has Node Sheet: Column references set up.');
    
    // Checking Rules.
    
    // Blank Check. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(OwnerColumnLetter + FirstRow + ':' + OwnerColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($B' + FirstRow + '=""),A' + FirstRow + '="")')
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
    
    // Deleted Parts. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Deleted."')
       .setBackground('#000000')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Property Has Node Sheet: Checking Rules formatting updated.');
    
    // Owner Formatting.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Property Has Node Sheet: Owner formatting updated.');
    
    // Line Status Text.
    
    // Loaded In To Be Tested. 
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Loaded In To Be Tested."')
       .setFontColor('#70ad47')
       .build());
    
    // WIP.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="WIP."')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Property Has Node Sheet: Line Status Text formatting updated.');
    
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Property Has Node tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');  
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function ConditionalFormattingPropertyTab20200612() {
   
    /**
    * ConditionalFormattingPropertyTab Function.
    * Conditionally formats the Property Tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Property tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the sheet and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName('property');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('property'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    Logger.log('Property Sheet: Initial sheet variables updated.');
    
    // Set up a number of column references to be used below.
    var FirstDataColumnLetter = "B";
    var LastDataColumnLetter = "H";
    var StatusColumnLetter = "J";
    var ActionsColumnLetter = "K";
    var RemarksColumnLetter = "L";
    var PropertyUseCountColumnLetter = "N";
    var CalculationLocationColumnLetter = "W";
    var LatestResultsColumnLetter = "T";
    var DuplicatePropertyCheckColumnLetter = "Y";
    var BlankColumnLetter = "Z";
    var MinMaxCheckColumnLetter = "AA";
    
    Logger.log('Property Sheet: Column references set up.');
    
    // Line Status Text.
    
    // Proposal. 
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarksColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + StatusColumnLetter + FirstRow + '="Proposal."')
       .setFontColor('#70ad47')
       .build());
    
    // Deleted.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarksColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + StatusColumnLetter + FirstRow + '="Deleted."')
       .setFontColor('#FF0000')
       .build());
    
    // Check Column Headers & Checking Rules.
    
    // Blank Check. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(StatusColumnLetter + FirstRow + ':' + RemarksColumnLetter + LastRow),CurrentSpreadsheet.getRange(PropertyUseCountColumnLetter + FirstRow + ':' + CalculationLocationColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($B' + FirstRow + '=""),A' + FirstRow + '="")')
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
    
    // Check Text Check. Highlights all columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':AA' + LastRow)])             
       .whenTextEqualTo('Check')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build()); 
  
     // Property Use Count Check. Highlights property use count column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(PropertyUseCountColumnLetter + FirstRow + ':' + PropertyUseCountColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$' + PropertyUseCountColumnLetter + FirstRow + '=0')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // Latest Results Check. Highlights latest results column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(LatestResultsColumnLetter + FirstRow + ':' + LatestResultsColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$' + LatestResultsColumnLetter + FirstRow + '=0')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
     // Property Duplication & Blank Check. Highlights first two columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow)])             
       .whenFormulaSatisfied('=COUNTIF($' + DuplicatePropertyCheckColumnLetter + FirstRow + ':$' + BlankColumnLetter + FirstRow + ',"Check")>0')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // Review Check. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=Left($' + ActionsColumnLetter + FirstRow + ',6)="Review"')
       .setBackground('#FFFF00')
       //.setFontColor('#000000')
       .build());
    
    // Done Check. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ActionsColumnLetter + FirstRow + '="Done"')
       .setBackground('#B7E1CD')
       //.setFontColor('#000000')
       .build());
    
    // ! Check Column Headers.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(PropertyUseCountColumnLetter + '1:' + BlankColumnLetter + '1')])
       .whenTextStartsWith('!')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Property Sheet: Check Column Headers & Checking Rules formatting updated.');
  
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Property tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');  
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function ConditionalFormattingDeliverableTab20200612() {
   
    /**
    * ConditionalFormattingDeliverableTab Function.
    * Conditionally formats the Deliverable Tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Deliverable tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the sheet and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName('deliverable');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('deliverable'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    Logger.log('Deliverable Sheet: Initial sheet variables updated.');
    
    // Clear all formatting below header row.
    
    CurrentSpreadsheet.getRange('2:' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    
    Logger.log('Deliverable Sheet: Initial formatting cleared.');
    
    // Set up a number of column references to be used below.
    var FirstDataColumnLetter = "B";
    var LastDataColumnLetter = "C";
    var OwnerColumnLetter = "G";
    
    Logger.log('Deliverable Sheet: Column references set up.');
    
    
    // Owner Formatting.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Deliverable Sheet: Owner formatting updated.');
      
    
    // Checking Rules.
    
    // Blank Check. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($B' + FirstRow + '=""),A' + FirstRow + '="")')
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
    
    // Duplicate deliverables. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange('E' + FirstRow + ':E' + LastRow)])
       .whenFormulaSatisfied('=$E' + FirstRow + '>1')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
  
    Logger.log('Deliverable Sheet: Checking Rules formatting updated.');
    
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Deliverable tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');  
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function ConditionalFormattingSwimlaneTab20200611() {
   
    /**
    * ConditionalFormattingSwimlaneTab Function.
    * Conditionally formats the Swimlane Tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Swimlane tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the sheet and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName('swimlane');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('swimlane'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    Logger.log('Swimlane Sheet: Initial sheet variables updated.');
    
    // Clear all formatting below header row.
    
    CurrentSpreadsheet.getRange('2:' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    
    Logger.log('Swimlane Sheet: Initial formatting cleared.');
    
    // Set up a number of column references to be used below.
    var FirstDataColumnLetter = "B";
    var OwnerColumnLetter = "B";
    var LastDataColumnLetter = "C";
    
    Logger.log('Swimlane Sheet: Column references set up.');
    
    // Owner Formatting.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Swimlane Sheet: Owner formatting updated.');
    
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Swimlane tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');  
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function ConditionalFormattingTaskTab20200611() {
   
    /**
    * ConditionalFormattingTaskTab Function.
    * Conditionally formats the Task Tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Task tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the sheet and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName('task');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('task'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    Logger.log('Task Sheet: Initial sheet variables updated.');
    
    // Clear all formatting below header row.
    
    CurrentSpreadsheet.getRange('2:' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    
    Logger.log('Task Sheet: Initial formatting cleared.');
    
    // Set up a number of column references to be used below.
    var FirstDataColumnLetter = "B";
    var LastDataColumnLetter = "F";
    var LineStatusColumnLetter = "H";
    var RemarkColumnLetter = "I";
    var OwnerColumnLetter = "K";
    
    Logger.log('Task Sheet: Column references set up.');
    
    // Checking Rules.
    
    // Blank Check. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(OwnerColumnLetter + FirstRow + ':' + OwnerColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($B' + FirstRow + '=""),A' + FirstRow + '="")')
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
    
    // Deleted Parts. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Deleted."')
       .setBackground('#000000')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Task Sheet: Checking Rules formatting updated.');
    
    // Owner Formatting.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Task Sheet: Owner formatting updated.');
    
    // Line Status Text.
    
    // Loaded In To Be Tested. 
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Loaded In To Be Tested."')
       .setFontColor('#70ad47')
       .build());
    
    // WIP.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="WIP."')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Task Sheet: Line Status Text formatting updated.');
    
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Task tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');  
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function ConditionalFormattingTeamTab20200611() {
   
    /**
    * ConditionalFormattingTeamTab Function.
    * Conditionally formats the Team Tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Team tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the sheet and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName('team');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('team'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    Logger.log('Team Sheet: Initial sheet variables updated.');
    
    // Clear all formatting below header row.
    
    CurrentSpreadsheet.getRange('2:' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    
    Logger.log('Team Sheet: Initial formatting cleared.');
    
    // Set up a number of column references to be used below.
    var FirstDataColumnLetter = "B";
    var LastDataColumnLetter = "E";
    var LineStatusColumnLetter = "G";
    var RemarkColumnLetter = "H";
    var OwnerColumnLetter = "J";
    
    Logger.log('Team Sheet: Column references set up.');
    
    // Checking Rules.
    
    // Blank Check. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(LineStatusColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow),CurrentSpreadsheet.getRange(OwnerColumnLetter + FirstRow + ':K' + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($B' + FirstRow + '=""),A' + FirstRow + '="")')
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
    
    // Deleted Parts. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(LineStatusColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Deleted."')
       .setBackground('#000000')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Team Sheet: Checking Rules formatting updated.');
    
    // Owner Formatting.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Team Sheet: Owner formatting updated.');
    
    // Line Status Text.
    
    // Loaded In To Be Tested.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Loaded In To Be Tested."')
       .setFontColor('#70ad47')
       .build());
    
    // WIP.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="WIP."')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Team Sheet: Line Status Text formatting updated.');
  
    // Remark Column
    
    // Comment text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Comment')
       .setBackground('#B7E1CD')
       .build());
    
    // Follow Up text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Follow Up')
       .setBackground('#fce5cd')
       .build());
    
    Logger.log('Team Sheet: Comment text in Remark Column formatting updated.');
    
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Team tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');  
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function onOpen20200611(e) {
    
    /**
    * onOpen Function
    * SDP Data sheet onOpen functions.
    * https://developers.google.com/apps-script/guides/triggers
    */
    
    // Add an alert to tell the user that the sheet is setting up.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Data Sheet opened. Setting up sheet...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Create custom menu items for the user to use.
    // https://developers.google.com/apps-script/guides/menus
    SpreadsheetUI.createMenu('SDP Data Menu')
        .addItem('Export All CSV Files', 'ExportAllCSVfiles')
        .addItem('Email SDP Data Summary', 'EmailSDPDataSummary')
        .addSeparator()
        .addSubMenu(SpreadsheetUI.createMenu('Formatting')
             .addSubMenu(SpreadsheetUI.createMenu('Main Data')
                         .addItem('Update Nodes Tab Formatting', 'ConditionalFormattingNodeTab')
                         .addItem('Update Edges Tab Formatting', 'ConditionalFormattingEdgeTab')
                         .addItem('Update Special Nodes Tab Formatting', 'ConditionalFormattingSpecialNodeTab')
                         .addItem('Update Special Edges Tab Formatting', 'ConditionalFormattingSpecialEdgeTab'))
             .addSubMenu(SpreadsheetUI.createMenu('Secondary Data')
                         .addItem('Update Milestones Tab Formatting', 'ConditionalFormattingMilestoneTab')
                         .addItem('Update Feedback Edges Tab Formatting', 'ConditionalFormattingFeedbackEdgeTab')
                         .addItem('Update Team Tab Formatting', 'ConditionalFormattingTeamTab')
                         .addItem('Update Task Tab Formatting', 'ConditionalFormattingTaskTab')
                         .addItem('Update Deliverable Formatting', 'ConditionalFormattingDeliverableTab')
                         .addItem('Update Task Has Deliverable Formatting', 'ConditionalFormattingTaskHasDeliverableTab')
                         .addItem('Update Task Has Prerequisite Formatting', 'ConditionalFormattingTaskHasPrerequisiteTab')
                         .addItem('Update Property Formatting', 'ConditionalFormattingPropertyTab')
                         .addItem('Update Property Has Node Formatting', 'ConditionalFormattingPropertyHasNodeTab')
                         .addItem('Update Swimlane Formatting', 'ConditionalFormattingSwimlaneTab')))
        .addSubMenu(SpreadsheetUI.createMenu('Exporting')
            .addItem('Export Nodes Tab As CSV', 'ExportNodesCSV')
            .addItem('Export Edges Tab As CSV', 'ExportEdgesCSV')
            .addItem('Export Special Nodes Tab As CSV', 'ExportSpecialNodesCSV')
            .addItem('Export Special Edges Tab As CSV', 'ExportSpecialEdgesCSV'))
        .addSubMenu(SpreadsheetUI.createMenu('More Functions')
            .addItem('Write .SQL File', 'WriteSQLFile'))
        .addToUi();
    
    // Add an initial log of code to indicate the code begins running successfully.
    Logger.log('Initialising code. Updating conditional formatting on SDP Nodes & Edges sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Get active user name.
    var CurrentUser = Session.getActiveUser().getEmail();
    
    // Define the change log variables. If the change log sheet doesn't exist, create it.
    var ChangeLogSheetName = 'AutoChangeLog';
    var ChangeLogSheet = CurrentSpreadsheet.getSheetByName(ChangeLogSheetName);
    if (ChangeLogSheet == null) {
      CreateChangeLog(CurrentSpreadsheet, ChangeLogSheet, ChangeLogSheetName) 
    }
    
    // Add a note on the AutoChangeLog to show macro has run.
    var SheetName = CurrentSpreadsheet.getSheetByName('AutoChangeLog');
    var LastRow = SheetName.getLastRow();
    // Log that the workbook has been opened.
    SheetName.getRange(LastRow+1,1).setValue('Workbook'); // Log the term 'Workbook'.
    SheetName.getRange(LastRow+1,2).setValue('Open'); // Log the change type.
    SheetName.getRange(LastRow+1,3).setValue('n/a'); // Log the cell address as n/a.
    SheetName.getRange(LastRow+1,6,1,2).setValue(new Date()); // Log the current date/time in both columns.
    SheetName.getRange(LastRow+1,8).setValue(CurrentUser);
    
    // Conditional formatting code removed as causing Time Out Error: "Exceeded maximum execution time".
    
    // Conditionally format the Nodes sheet.
    //ConditionalFormattingNodesSheet(CurrentSpreadsheet)
    //Logger.log('Nodes tab updated. Returned to OnOpen code.');
    //SpreadsheetUI.alert('Nodes tab updated.');
    
    // Conditionally format the Edges sheet.
    //ConditionalFormattingEdgesSheet(CurrentSpreadsheet);
    //Logger.log('Edges tab updated. Returned to OnOpen code.');
    //SpreadsheetUI.alert('Edges tab updated.');  
    
    // Add a final alert to tell the user that the sheet is set up and ready for modifcation.
    SpreadsheetUI.alert('SDP Data Sheet successfully set up.' + '\n' + '\n' + 'Please begin using the sheet.');
    
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function ConditionalFormattingFeedbackEdgeTab20200610() {
   
    /**
    * ConditionalFormattingFeedbackEdgeTab Function.
    * Conditionally formats the Feedback Edge Tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Feedback Edges tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the sheet and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName('feedbackedge');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('feedbackedge'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    Logger.log('Feedback Edges Sheet: Initial sheet variables updated.');
    
    // Clear all formatting below header row.
    
    CurrentSpreadsheet.getRange('2:' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    
    Logger.log('Feedback Edges Sheet: Initial formatting cleared.');
    
    // Set up a number of column references to be used below.
    var FeedbackEdgeFromColumnLetter = "C";
    var FeedbackEdgeToColumnLetter = "D";
    var ActiveColumnLetter = "G";
    var LastDataColumnLetter = "I";
    var LineStatusColumnLetter = "K";
    var RemarkColumnLetter = "L";
    var FromTaskStartColumnLetter = "N";
    var FromTaskEndColumnLetter = "O";
    var ToTaskColumnLetter = "P";
    var FromOwnerColumnLetter = "T";
    var ToOwnerColumnLetter = "U";
    
    Logger.log('Feedback Edges Sheet: Column references set up.');
    
    // Checking Rules.
    
    // Blank Check Cell Highlight.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(LineStatusColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($B' + FirstRow + '=""),A' + FirstRow + '="")')                              
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
    
    // Blank Check Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskStartColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$S' + FirstRow + '="Check"') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    Logger.log('Feedback Edges Sheet: Checking Rules formatting updated.');
    
    // Other Checks.
    
    // Deleted Parts.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Deleted."') 
       .setBackground('#000000')
       .setFontColor('#FF0000')
       .build());
    
    // Active Parts.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow)])
       .whenFormulaSatisfied('=AND($' + ActiveColumnLetter + FirstRow + '=0,NOT($B' + FirstRow + '=""))')
       .setBackground('#999999')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Feedback Edges Sheet: Checking Rules formatting updated.');
    
    // Owner Formatting. From Activities.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeFromColumnLetter + FirstRow + ':' + FeedbackEdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskStartColumnLetter + FirstRow + ':' + FromTaskEndColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeFromColumnLetter + FirstRow + ':' + FeedbackEdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskStartColumnLetter + FirstRow + ':' + FromTaskEndColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeFromColumnLetter + FirstRow + ':' + FeedbackEdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskStartColumnLetter + FirstRow + ':' + FromTaskEndColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeFromColumnLetter + FirstRow + ':' + FeedbackEdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskStartColumnLetter + FirstRow + ':' + FromTaskEndColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeFromColumnLetter + FirstRow + ':' + FeedbackEdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskStartColumnLetter + FirstRow + ':' + FromTaskEndColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeFromColumnLetter + FirstRow + ':' + FeedbackEdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskStartColumnLetter + FirstRow + ':' + FromTaskEndColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeFromColumnLetter + FirstRow + ':' + FeedbackEdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskStartColumnLetter + FirstRow + ':' + FromTaskEndColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeFromColumnLetter + FirstRow + ':' + FeedbackEdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskStartColumnLetter + FirstRow + ':' + FromTaskEndColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeFromColumnLetter + FirstRow + ':' + FeedbackEdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskStartColumnLetter + FirstRow + ':' + FromTaskEndColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeFromColumnLetter + FirstRow + ':' + FeedbackEdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskStartColumnLetter + FirstRow + ':' + FromTaskEndColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeFromColumnLetter + FirstRow + ':' + FeedbackEdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskStartColumnLetter + FirstRow + ':' + FromTaskEndColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Feedback Edges Sheet: Owner formatting "FromActivity" updated.');
    
    // Owner Formatting. To Task.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeToColumnLetter + FirstRow + ':' + FeedbackEdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeToColumnLetter + FirstRow + ':' + FeedbackEdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeToColumnLetter + FirstRow + ':' + FeedbackEdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeToColumnLetter + FirstRow + ':' + FeedbackEdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeToColumnLetter + FirstRow + ':' + FeedbackEdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeToColumnLetter + FirstRow + ':' + FeedbackEdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeToColumnLetter + FirstRow + ':' + FeedbackEdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeToColumnLetter + FirstRow + ':' + FeedbackEdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeToColumnLetter + FirstRow + ':' + FeedbackEdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeToColumnLetter + FirstRow + ':' + FeedbackEdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FeedbackEdgeToColumnLetter + FirstRow + ':' + FeedbackEdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Feedback Edges Sheet: Owner formatting "ToTask" updated.');
    
    // Line Status Text.
    
    // Loaded In To Be Tested.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Loaded In To Be Tested."')
       .setFontColor('#70ad47')
       .build());
    
    // WIP.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="WIP."')
       .setFontColor('#FF0000')
       .build());
   
    Logger.log('Feedback Edges Sheet: Line Status Text formatting updated.');
    
    // Remark Column
    
    // Comment text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Comment')
       .setBackground('#B7E1CD')
       .build());
    
    // Follow Up text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Follow Up')
       .setBackground('#fce5cd')
       .build());
    
    Logger.log('Feedback Edges Sheet: Comment text in Remark Column formatting updated.');
    
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Feedback Edges tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');  
    
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function ConditionalFormattingSpecialEdgeTab20200610() {
   
    /**
    * ConditionalFormattingSpecialEdgeTab Function.
    * Conditionally formats the Special Edges tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Special Edges tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the sheet and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName('specialedge');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('specialedge'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    Logger.log('Special Edges Sheet: Initial sheet variables updated.');
    
    // Clear all formatting below header row.
    
    CurrentSpreadsheet.getRange('2:' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    
    Logger.log('Special Edges Sheet: Initial formatting cleared.');
    
    // Set up a number of column references to be used below.
    var EdgeFromColumnLetter = "C";
    var EdgeToColumnLetter = "D";
    var ActiveColumnLetter = "L";
    var LastDataColumnLetter = "N";
    var LineStatusColumnLetter = "P";
    var RemarkColumnLetter = "Q";
    var FromTaskColumnLetter = "S";
    var ToTaskColumnLetter = "T";
    var FromOwnerColumnLetter = "AH";
    var ToOwnerColumnLetter = "AI";
    
    Logger.log('Special Edges Sheet: Column references set up.');
    
    // Checking Rules.
    
    // ! Check Column Headers. Highlights checking headers.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('X1:AI1')])
       .whenTextStartsWith('!')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
    
    // Blank Check. Highlights all data.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(LineStatusColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($B' + FirstRow + '=""),A' + FirstRow + '="")')                              
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
    
    // Check Text Check. Highlights checking columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('X' + FirstRow + ':AF' + LastRow)])             
       .whenTextEqualTo('Check')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // Check Counter.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow)])             
       .whenFormulaSatisfied('=COUNTIF($X' + FirstRow + ':$AF' + FirstRow + ',"Check")>0') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
  
    // From Edge Check.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$AA' + FirstRow + '="Check"') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // To Edge Check.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$AB' + FirstRow + '="Check"') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // From Task Check.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + FromTaskColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$AD' + FirstRow + '="Check"') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // To Task Check.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$AE' + FirstRow + '="Check"') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // Double Edge Check.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$AF' + FirstRow + '="Check"') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    Logger.log('Special Edges Sheet: Checking Rules formatting updated.');
    
    // Other Checks.
    
    // Count Checks.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(LineStatusColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=COUNTIF($X' + FirstRow + ':$AF' + FirstRow + ',"Check")>0') 
       .setBackground('#ed7d31')
       .setFontColor('#000000')
       .build());
    
    // Deleted Parts.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':V' + LastRow)])             
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Deleted."') 
       .setBackground('#000000')
       .setFontColor('#FF0000')
       .build());
    
    // Active Parts.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow)])
       .whenFormulaSatisfied('=AND($' + ActiveColumnLetter + FirstRow + '=0,NOT($B' + FirstRow + '=""))')
       .setBackground('#999999')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Special Edges Sheet: Checking Rules formatting updated.');
    
    // Owner Formatting. From Nodes.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + FromTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
    
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + FromTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + FromTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + FromTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + FromTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + FromTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + FromTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + FromTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + FromTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + FromTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + FromTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Special Edges Sheet: Owner formatting "From nodes" updated.');
    
    // Owner Formatting. To Nodes.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Special Edges Sheet: Owner formatting "To nodes" updated.');
    
    // Line Status Text.
    
    // Loaded In To Be Tested.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow),CurrentSpreadsheet.getRange(LineStatusColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Loaded In To Be Tested."')
       .setFontColor('#70ad47')
       .build());
    
    // WIP.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow),CurrentSpreadsheet.getRange(LineStatusColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="WIP."')
       .setFontColor('#FF0000')
       .build());
   
    Logger.log('Special Edges Sheet: Line Status Text formatting updated.');
    
    // Remark Column
    
    // Comment text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Comment')
       .setBackground('#B7E1CD')
       .build());
    
    // Follow Up text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Follow Up')
       .setBackground('#fce5cd')
       .build());
    
    Logger.log('Special Edges Sheet: Comment text in Remark Column formatting updated.');
    
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Special Edges tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');  
    
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function ConditionalFormattingMilestoneTab20200610() {
   
    /**
    * ConditionalFormattingMilestoneTab Function.
    * Conditionally formats the Milestone Tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Nodes tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the sheet and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName('milestone');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('milestone'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    Logger.log('Milestones Sheet: Initial sheet variables updated.');
    
    // Clear all formatting below header row.
    
    CurrentSpreadsheet.getRange('2:' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    
    Logger.log('Milestones Sheet: Initial formatting cleared.');
    
    // Set up a number of column references to be used below.
    var FirstDataColumnLetter = "B";
    var ActiveColumnLetter = "AI";
    var LastDataColumnLetter = "AK";
    var LineStatusColumnLetter = "AM";
    var RemarkColumnLetter = "AN";
    var OwnerColumnLetter = "AP";
    
    Logger.log('Milestones Sheet: Column references set up.');
    
    // Checking Rules.
    
    // Blank Check. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(LineStatusColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow),CurrentSpreadsheet.getRange(OwnerColumnLetter + FirstRow + ':' + OwnerColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($B' + FirstRow + '=""),A' + FirstRow + '="")')
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
    
    // pre/postMilestoneActivities/Maturity Check. Highlights numbers and milestone columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow),CurrentSpreadsheet.getRange('AI' + FirstRow + ':AK' + LastRow),CurrentSpreadsheet.getRange('AR' + FirstRow + ':AR' + LastRow)])             
       .whenFormulaSatisfied('=$AR' + FirstRow + '="Check"')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // Deleted Parts. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(LineStatusColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Deleted."')
       .setBackground('#000000')
       .setFontColor('#FF0000')
       .build());
    
    // Active Parts. Highlights "id" and "number" columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow)])
       .whenFormulaSatisfied('=AND($' + ActiveColumnLetter + FirstRow + '=0,NOT($B' + FirstRow + '=""))')
       .setBackground('#999999')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Milestones Sheet: Checking Rules formatting updated.');
    
    // Owner Formatting.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Milestones Sheet: Owner formatting updated.');
    
    // Line Status Text.
    
    // Loaded In To Be Tested.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow),CurrentSpreadsheet.getRange(LineStatusColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Loaded In To Be Tested."')
       .setFontColor('#70ad47')
       .build());
    
    // WIP.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow),CurrentSpreadsheet.getRange(LineStatusColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="WIP."')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Milestones Sheet: Line Status Text formatting updated.');
  
    // Remark Column
    
    // Comment text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Comment')
       .setBackground('#B7E1CD')
       .build());
    
    // Follow Up text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Follow Up')
       .setBackground('#fce5cd')
       .build());
    
    Logger.log('Milestones Sheet: Comment text in Remark Column formatting updated.');
    
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Milestones tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');  
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function ConditionalFormattingEdgeTab20200610() {
   
    /**
    * ConditionalFormattingEdgeTab Function.
    * Conditionally formats the Edges tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Edges tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the sheet and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName('edge');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('edge'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    Logger.log('Edges Sheet: Initial sheet variables updated.');
    
    // Clear all formatting below header row.
    
    CurrentSpreadsheet.getRange('2:' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    
    Logger.log('Edges Sheet: Initial formatting cleared.');
    
    // Set up a number of column references to be used below.
    var EdgeFromColumnLetter = "C";
    var EdgeToColumnLetter = "D";
    var ActiveColumnLetter = "K";
    var LastDataColumnLetter = "M";
    var LineStatusColumnLetter = "O";
    var RemarkColumnLetter = "P";
    var FromTaskColumnLetter = "R";
    var ToTaskColumnLetter = "S";
    var FromOwnerColumnLetter = "AJ";
    var ToOwnerColumnLetter = "AK";
    
    Logger.log('Edges Sheet: Column references set up.');
    
    // Checking Rules.
    
    // ! Check Column Headers.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('W1:AK1')])
       .whenTextStartsWith('!')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
    
    // Blank Check. Highlights many columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':K' + LastRow),CurrentSpreadsheet.getRange(LineStatusColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($B' + FirstRow + '=""),A' + FirstRow + '="")')                              
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
    
    // Check Text Check. Highlights checking columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('W' + FirstRow + ':AE' + LastRow)])             
       .whenTextEqualTo('Check')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // Check Counter. Highlights "id" and "edge" columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow)])             
       .whenFormulaSatisfied('=COUNTIF($W' + FirstRow + ':$AK' + FirstRow + ',"Check")>0') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
  
    // From Edge Check. Highlights "edgeFrom" column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$Z' + FirstRow + '="Check"') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // To Edge Check. Highlights "edgeTo" column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$AA' + FirstRow + '="Check"') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // From Task Check.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + FromTaskColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$AC' + FirstRow + '="Check"') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // To Task Check.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(ToTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$AD' + FirstRow + '="Check"') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // Double Edge Check.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$AE' + FirstRow + '="Check"') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
  
    // Reverse Edge Check.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=$AJ' + FirstRow + '="Check"') 
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    Logger.log('Edges Sheet: Checking Rules formatting updated.');
    
    // Other Checks.
    
    // Count Checks. Highlights many columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':I' + LastRow),CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=COUNTIF($W' + FirstRow + ':$AE' + FirstRow + ',"Check")>0') 
       .setBackground('#ed7d31')
       .setFontColor('#000000')
       .build());
    
    // Deleted Parts. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':U' + LastRow)])             
       .whenFormulaSatisfied('=$O' + FirstRow + '="Deleted."') 
       .setBackground('#000000')
       .setFontColor('#FF0000')
       .build());
    
    // Active Parts. Highlights "id" and "edge" columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow)])
       .whenFormulaSatisfied('=AND($' + ActiveColumnLetter + FirstRow + '=0,NOT($B' + FirstRow + '=""))')
       .setBackground('#999999')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Edges Sheet: Checking Rules formatting updated.');
    
    // Owner Formatting. From Nodes.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange('R' + FirstRow + ':R' + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange('R' + FirstRow + ':R' + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange('R' + FirstRow + ':R' + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange('R' + FirstRow + ':R' + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange('R' + FirstRow + ':R' + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange('R' + FirstRow + ':R' + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange('R' + FirstRow + ':R' + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange('R' + FirstRow + ':R' + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange('R' + FirstRow + ':R' + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange('R' + FirstRow + ':R' + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeFromColumnLetter + FirstRow + ':' + EdgeFromColumnLetter + LastRow),CurrentSpreadsheet.getRange('R' + FirstRow + ':R' + LastRow)])
       .whenFormulaSatisfied('=$' + FromOwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Edges Sheet: Owner formatting "From nodes" updated.');
    
    // Owner Formatting. To Nodes.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange('S' + FirstRow + ':S' + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange('S' + FirstRow + ':S' + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
       
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange('S' + FirstRow + ':S' + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange('S' + FirstRow + ':S' + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange('S' + FirstRow + ':S' + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange('S' + FirstRow + ':S' + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange('S' + FirstRow + ':S' + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange('S' + FirstRow + ':S' + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange('S' + FirstRow + ':S' + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange('S' + FirstRow + ':S' + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(EdgeToColumnLetter + FirstRow + ':' + EdgeToColumnLetter + LastRow),CurrentSpreadsheet.getRange('S' + FirstRow + ':S' + LastRow)])
       .whenFormulaSatisfied('=$' + ToOwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Edges Sheet: Owner formatting "To nodes" updated.');
    
    // Line Status Text.
    
    // Loaded In To Be Tested.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':K' + LastRow),CurrentSpreadsheet.getRange('M' + FirstRow + ':V' + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Loaded In To Be Tested."')
       .setFontColor('#70ad47')
       .build());
    
    // WIP.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':K' + LastRow),CurrentSpreadsheet.getRange('M' + FirstRow + ':V' + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="WIP."')
       .setFontColor('#FF0000')
       .build());
   
    Logger.log('Edges Sheet: Line Status Text formatting updated.');
    
    // Remark Column
    
    // Comment text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Comment')
       .setBackground('#B7E1CD')
       .build());
    
    // Follow Up text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Follow Up')
       .setBackground('#fce5cd')
       .build());
    
    Logger.log('Edges Sheet: Comment text in Remark Column formatting updated.');
    
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Edges tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');  
    
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function ConditionalFormattingSpecialNodeTab20200604() {
    
    /**
    * ConditionalFormattingSpecialNodeSheet Function.
    * Conditionally formats the Special Nodes sheet.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Special Nodes tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the sheet and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName('specialnode');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('specialnode'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    Logger.log('Special Nodes Sheet: Initial sheet variables updated.');
    
    // Clear all formatting below header row.
    
    CurrentSpreadsheet.getRange('2:' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    
    Logger.log('Special Nodes Sheet: Initial formatting cleared.');
    
    // Set up a number of column references to be used below.
    var FirstDataColumnLetter = "B";
    var ActiveColumnLetter = "AF";
    var LastDataColumnLetter = "AH";
    var LineStatusColumnLetter = "AJ";
    var RemarkColumnLetter = "AK";
    var OwnerColumnLetter = "AM";
    
    Logger.log('Nodes Sheet: Column references set up.');
    
    // Checking Rules.
    
    // Blank Check. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(LineStatusColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow),CurrentSpreadsheet.getRange(OwnerColumnLetter + FirstRow + ':' + OwnerColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($B' + FirstRow + '=""),A' + FirstRow + '="")')
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
    
    // Deleted Parts. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Deleted."')
       .setBackground('#000000')
       .setFontColor('#FF0000')
       .build());
    
    // Active Parts. Highlights "id" and "number" columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow)])
       .whenFormulaSatisfied('=AND($' + ActiveColumnLetter + FirstRow + '=0,NOT($B' + FirstRow + '=""))')
       .setBackground('#999999')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Special Nodes Sheet: Checking Rules formatting updated.');
    
    // Owner Formatting.
    
    // Milestones.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Special Nodes Sheet: Owner formatting updated.');
    
    // Line Status Text.
    
    // Loaded In To Be Tested. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Loaded In To Be Tested."')
       .setFontColor('#70ad47')
       .build());
     
    // WIP. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="WIP."')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Special Nodes Sheet: Line Status Text formatting updated.');
      
    // Remark Column
    
    // Comment text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Comment')
       .setBackground('#B7E1CD')
       .build());
    
    // Follow Up text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Follow Up')
       .setBackground('#fce5cd')
       .build());
    
    Logger.log('Special Nodes Sheet: Comment text in Remark Column formatting updated.');
    
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Special Nodes tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');  
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function EmailSDPNodesAndEdgesSummary20200608() {
    
    /**
    * EmailSDPNodesAndEdgesSummary Function
    * Sends an email to the current user with a summary of the SDP Nodes & Edges sheet.
    * https://developers.google.com/apps-script/overview
    */
    
    Logger.log('EmailSDPNodesAndEdgesSummary. Function initiated.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Get the last used row number of the Activity sheet to define how many activities there are.
    var SheetName = CurrentSpreadsheet.getSheetByName('activity');
    var ColumnToCheck = SheetName.getRange("A:A").getValues(); // Select the column we will check for the first blank cell.
    var LastRow = GetLastRowSpecial(ColumnToCheck); // Get the last row based on the data range of a single column.
    var ActivitiesCount = LastRow - 1;
    
    // Check if any of the nodes checking columns have errors.
    var NodeErrorString = "";
    var StartingCheckColumnNumber = LetterToColumn("BH"); // Note that column BH is 60.
    var EndingCheckColumnNumber = LetterToColumn("BP"); // Note that column BP is 68.
    for(var i=StartingCheckColumnNumber;i<=EndingCheckColumnNumber;i++){
        var CheckString = SheetName.getRange("1:1").getCell(1,i).getDisplayValue();
        if(CheckString.substring(0,1)=="!"){
          var NodeErrorString = NodeErrorString + " " + CheckString.substring(1) + ";";
        }
    }
    if (NodeErrorString==""){
      NodeErrorString=="";
    } else {  
      NodeErrorString = NodeErrorString.trim();
    }
    //Logger.log('EmailSDPNodesAndEdgesSummary. Activities Sheet analysed.');
    
    // Get the last used row number of the Edges sheet to define how many edges there are.
    SheetName = CurrentSpreadsheet.getSheetByName('edge');
    ColumnToCheck = SheetName.getRange("A:A").getValues(); //Select the column we will check for the first blank cell.
    LastRow = GetLastRowSpecial(ColumnToCheck); // Get the last row based on the data range of a single column.
    var EdgesCount = LastRow - 1;
    // Check if any of the edges checking columns have errors.
    var EdgesErrorString = "";
    var StartingCheckColumnNumber = LetterToColumn("W");
    var EndingCheckColumnNumber = LetterToColumn("AK");
    for(var i=StartingCheckColumnNumber;i<=EndingCheckColumnNumber;i++){
        var CheckString = SheetName.getRange("1:1").getCell(1,i).getDisplayValue();
        if(CheckString.substring(0,1)=="!"){
          var EdgesErrorString = EdgesErrorString + " " + CheckString.substring(1) + ";";
        }
    }
    if (EdgesErrorString==""){
      EdgesErrorString=="";
    } else {  
      EdgesErrorString = EdgesErrorString.trim();
    }
    //Logger.log('EmailSDPNodesAndEdgesSummary. Edges Sheet analysed.');
    
    // Get the last used row number of the Special Activities sheet to define how many special activities there are.
    SheetName = CurrentSpreadsheet.getSheetByName('specialactivity');
    ColumnToCheck = SheetName.getRange("A:A").getValues(); //Select the column we will check for the first blank cell.
    LastRow = GetLastRowSpecial(ColumnToCheck); // Get the last row based on the data range of a single column.
    var SpecialActivitiesCount = LastRow - 1; 
    //Logger.log('EmailSDPNodesAndEdgesSummary. Special Activities Sheet analysed.');
    
    // Get the last used row number of the Special Edges sheet to define how many special edges there are.
    SheetName = CurrentSpreadsheet.getSheetByName('specialedge');
    ColumnToCheck = SheetName.getRange("A:A").getValues(); //Select the column we will check for the first blank cell.
    LastRow = GetLastRowSpecial(ColumnToCheck); // Get the last row based on the data range of a single column.
    var SpecialEdgesCount = LastRow - 1;
    // Check if any of the special edges checking columns have errors.
    var SpecialEdgesErrorString = "";
    var StartingCheckColumnNumber = LetterToColumn("X");
    var EndingCheckColumnNumber = LetterToColumn("AI");
    for(var i=StartingCheckColumnNumber;i<=EndingCheckColumnNumber;i++){
        var CheckString = SheetName.getRange("1:1").getCell(1,i).getDisplayValue();
        if(CheckString.substring(0,1)=="!"){
          var SpecialEdgesErrorString = SpecialEdgesErrorString + " " + CheckString.substring(1) + ";";
        }
    }
    if (SpecialEdgesErrorString==""){
      SpecialEdgesErrorString=="";
    } else {  
      SpecialEdgesErrorString = SpecialEdgesErrorString.trim();
    }
    //Logger.log('EmailSDPNodesAndEdgesSummary. Special Edges Sheet analysed.'); 
    
    // Get the last used row number of the Milestones sheet to define how many milestones there are.
    SheetName = CurrentSpreadsheet.getSheetByName('milestone');
    ColumnToCheck = SheetName.getRange("B:B").getValues(); //Select the column we will check for the first blank cell.
    LastRow = GetLastRowSpecial(ColumnToCheck); // Get the last row based on the data range of a single column.
    var MilestonesCount = LastRow - 1;
    //Logger.log('EmailSDPNodesAndEdgesSummary. Milestones Sheet analysed.');
    
    // Get the last used row number of the Feedback Edges sheet to define how many feedback edges there are.
    SheetName = CurrentSpreadsheet.getSheetByName('feedbackedge');
    ColumnToCheck = SheetName.getRange("A:A").getValues(); //Select the column we will check for the first blank cell.
    LastRow = GetLastRowSpecial(ColumnToCheck); // Get the last row based on the data range of a single column.
    var FeedbackEdgeCount = LastRow - 1;
    //Logger.log('EmailSDPNodesAndEdgesSummary. Feedback Edges Sheet analysed.');
    
    // Get the last used row number of the Team sheet to define how many teams there are.
    SheetName = CurrentSpreadsheet.getSheetByName('team');
    ColumnToCheck = SheetName.getRange("B:B").getValues(); //Select the column we will check for the first blank cell.
    LastRow = GetLastRowSpecial(ColumnToCheck); // Get the last row based on the data range of a single column.
    var TeamCount = LastRow - 1;
    //Logger.log('EmailSDPNodesAndEdgesSummary. Team Sheet analysed.');
    
    // Get the last used row number of the Task sheet to define how many tasks there are.
    SheetName = CurrentSpreadsheet.getSheetByName('task');
    ColumnToCheck = SheetName.getRange("D:D").getValues(); //Select the column we will check for the first blank cell.
    LastRow = GetLastRowSpecial(ColumnToCheck); // Get the last row based on the data range of a single column.
    var TaskCount = LastRow - 1;
    //Logger.log('EmailSDPNodesAndEdgesSummary. Task Sheet analysed.');
    
    // Get the last used row number of the Properties sheet to define how many potential properties there are.
    SheetName = CurrentSpreadsheet.getSheetByName('property');
    ColumnToCheck = SheetName.getRange("B:B").getValues(); //Select the column we will check for the first blank cell.
    LastRow = GetLastRowSpecial(ColumnToCheck); // Get the last row based on the data range of a single column.
    var PropertiesCount = LastRow - 1 - 6; // Additional minus 6 discounts the gap between modifiable properties and all others.
    //Logger.log('EmailSDPNodesAndEdgesSummary. Properties Sheet analysed.');
    
    // Get the last used row number of the Manual Change Log to define the last change made.
    SheetName = CurrentSpreadsheet.getSheetByName('Manual Change Log');
    ColumnToCheck = SheetName.getRange("E:E").getValues(); //Select the column we will check for the first blank cell.
    LastRow = GetLastRowSpecial(ColumnToCheck); // Get the last row based on the data range of a single column.
    var LastChangeText = SheetName.getRange(LastRow, 2).getValue() // LastChangeText in column B.
    var LastHeartbeatCount = SheetName.getRange(LastRow, 4).getValue() // LastHeartbeatCount in column D.
    //Logger.log('EmailSDPNodesAndEdgesSummary. Manual Change Log Sheet analysed.');
    
    // Convert the heartbeatcount into Years, Weeks and Days.
    // https://codeforwin.org/2015/06/c-program-to-convert-days-into-years-weeks-days.html#:~:text=Logic%20to%20convert%20days%20to%20years%20weeks%20and%20days&text=Which%20is%20years%20%3D%20days%20%2F%20365,%2B%20(weeks%20*%207))%20.
    // https://www.w3schools.com/jsref/jsref_floor.asp
    var LastHeartbeatCountAsNormalDays = LastHeartbeatCount * (7/5); // Add in weekends.
    var years = Math.floor(LastHeartbeatCountAsNormalDays / 365); // Get years.
    var weeks = Math.floor((LastHeartbeatCountAsNormalDays - (years * 365)) / 7); // Get weeks minus the previously calculated years.
    var days = Math.floor(LastHeartbeatCountAsNormalDays - ((years * 365) + (weeks * 7))); // Get days minus the previously calculated months and years.
    var ReadableTiming = years + ' year(s), ' + weeks + ' week(s) & ' + days + ' days(s)' // Combine into a string.
    
    // Get the email address of the active user.
    var email = Session.getActiveUser().getEmail();
  
    // Get the email subject line.
    var subject = 'Daily SDP Nodes & Edges Summary';
  
    // Define an email body in multiple parts.
    
    // Initial summary text:
    var body = 'SDP Nodes & Edges Summary:' + '\n' + 'Node Count: ' + NodeCount + '\n' + 'Edges Count: ' + EdgesCount + '\n' + 'Special Nodes Count: ' + SpecialNodesCount + '\n' + 'Special Edges Count: ' + SpecialEdgesCount + '\n' + 'Milestone Count: ' + MilestonesCount + '\n' + 'Feedback Edge Count: ' + FeedbackEdgeCount + '\n' + 'Team Count: ' + TeamCount + '\n' + 'Task Count: ' + TaskCount + '\n' + 'Property Count: ' + PropertiesCount
    // Add last run day count:
    body = body + '\n' + '\n' + 'Last Run Day Count: ' + '\n' + LastHeartbeatCount + ' day(s). This equates to: ' + ReadableTiming + '.'
    // Add last changes made text:
    body = body + '\n' + '\n' + 'Last Changes Made: ' + '\n' + '"' + LastChangeText + '"';
    // Add error string text:
    var ErrorString = ""
    if (NodeErrorString==""){
      // Do nothing.
    } else {  
      ErrorString = ErrorString.trim() + " Node Errors: " + NodeErrorString.trim() + '\n';
    }
    if (EdgesErrorString==""){
      // Do nothing.
    } else {  
      ErrorString = ErrorString.trim() + " Edges Errors: " + EdgesErrorString.trim() + '\n';
    }
    if (SpecialEdgesErrorString==""){
      // Do nothing.
    } else {  
      ErrorString = ErrorString.trim() + " Special Edges Errors: " + SpecialEdgesErrorString.trim() + '\n';
    }
    ErrorString = ErrorString.trim();
    if(ErrorString==""){
      body = body + '\n' + '\n' + 'No errors found in the data.';
    } else {
      body = body + '\n' + '\n' + 'Errors Found:' + '\n' + ErrorString;
    }
    
    // Attach images of the charts from the "Graph" tab.
    // https://stackoverflow.com/questions/19999269/emailing-a-chart-from-a-google-spreadsheet-with-apps-script
    // https://developers.google.com/apps-script/reference/gmail/gmail-app#sendemailrecipient,-subject,-body,-options
    var SheetName = CurrentSpreadsheet.getSheetByName('Graphs');
    var Charts = SheetName.getCharts();
    if(Charts.length==0){
      // If no charts, no emailImages not defined and therefore not added.    
    } else {
      // If charts exist, define emailImages.
      var SDPCharts=new Array(Charts.length); 
      body = body + '\n' + '\n' + "Charts attached.";
      var emailImages={};
      for(var i=0;i<Charts.length;i++){
          SDPCharts[i]= Charts[i].getAs("image/png").setName("SDPCharts"+i);
          //body = body + "<img src='cid:chart"+i+"'><br>";
          emailImages["chart"+i]= SDPCharts[i];
      }
    }
      
    // Send yourself an email.
    GmailApp.sendEmail(email, subject, body, {
      name: "RLE SDP",
      inlineImages: emailImages,
      //noReply: "TRUE"
    });
    
    // Display a message with confirmation that the email has been sent.
    var response = Browser.msgBox('Email Success', 'The summary email has been sent to: ' + email + '.', Browser.Buttons.OK);
    Logger.log('Response is: ' + response + '.');
    if (response == "ok") {
       Logger.log('EmailSDPNodesAndEdgesSummary. The user clicked "OK."');
    }
    
    Logger.log('EmailSDPNodesAndEdgesSummary. Function successfully completed.');
    
  }
  
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  function ConditionalFormattingActivityTab20200604() {
    
    /**
    * ConditionalFormattingActivityTab Function.
    * Conditionally formats the Activity tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Activity tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the tab and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName('activity');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('activity'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    Logger.log('Activity Sheet: Initial sheet variables updated.');
    
    // Clear all formatting below header row.
    
    CurrentSpreadsheet.getRange('2:' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    
    Logger.log('Activity Sheet: Initial formatting cleared.');
    
    // Set up a number of column references to be used below.
    var FirstDataColumnLetter = "B";
    var ActiveColumnLetter = "AE";
    var LastDataColumnLetter = "AG";
    var LineStatusColumnLetter = "AI";
    var RemarkColumnLetter = "AJ";
    var OwnerColumnLetter = "AL";
    
    Logger.log('Activity Sheet: Column references set up.');
    
    // Checking Rules.
    
    // Blank Check. Highlights many columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange('AJ' + FirstRow + ':AK' + LastRow),CurrentSpreadsheet.getRange('AM' + FirstRow + ':BF' + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($B' + FirstRow + '=""),A' + FirstRow + '="")')
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
    
    // Check Text Check. Highlights many columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow),CurrentSpreadsheet.getRange('BH' + FirstRow + ':CH' + LastRow)])             
       .whenTextEqualTo('Check')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build()); 
    
     // Description Check. Highlights "description" column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow),CurrentSpreadsheet.getRange('D' + FirstRow + ':D' + LastRow)])             
       .whenFormulaSatisfied('=COUNTIF($BJ' + FirstRow + ':$BK' + FirstRow + ',"Check")>0')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // Numbering Check. Highlights "id" and "number" columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow)])             
       .whenFormulaSatisfied('=COUNTIF($BH' + FirstRow + ':$BI' + FirstRow + ',"Check")>0')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // Team Check. Highlights "leadTeam", "supportTeam", "minPercentages" and "maxPercentages" columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow),CurrentSpreadsheet.getRange('J' + FirstRow + ':M' + LastRow)])             
       .whenFormulaSatisfied('=$BL' + FirstRow + '="Check"')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // Dependency Check. Highlights "dependentOn", "weights", "minUnit" and "maxUnit" columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow),CurrentSpreadsheet.getRange('P' + FirstRow + ':R' + LastRow),CurrentSpreadsheet.getRange('U' + FirstRow + ':U' + LastRow)])             
       .whenFormulaSatisfied('=$BM' + FirstRow + '="Check"')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // Dependency MinMaxUnit Check. Highlights "minUnit" and "maxUnit" columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow),CurrentSpreadsheet.getRange('R' + FirstRow + ':R' + LastRow),CurrentSpreadsheet.getRange('U' + FirstRow + ':U' + LastRow),CurrentSpreadsheet.getRange('CI' + FirstRow + ':CK' + LastRow)])             
       .whenFormulaSatisfied('=$BM' + FirstRow + '="Check"')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // Min/Max Time/Resource Check. Highlights "minNumberPeople", "minTimeNeeded", "maxNumberPeople" and "maxTimeNeeded" columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow),CurrentSpreadsheet.getRange('S' + FirstRow + ':T' + LastRow),CurrentSpreadsheet.getRange('V' + FirstRow + ':W' + LastRow)])             
       .whenFormulaSatisfied('=$BN' + FirstRow + '="Check"')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build());
    
    // Check Count. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=COUNTIF($BH' + FirstRow + ':$BP' + FirstRow + ',"Check")>0"')
       .setBackground('#ed7d31')
       .setFontColor('#000000')
       .build());
    
    // Deleted Parts. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Deleted."')
       .setBackground('#000000')
       .setFontColor('#FF0000')
       .build());
    
    // Active Parts. Highlights "id" and "number" columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':B' + LastRow)])
       .whenFormulaSatisfied('=AND($' + ActiveColumnLetter + FirstRow + '=0,NOT($B' + FirstRow + '=""))')
       .setBackground('#999999')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Activity Sheet: Checking Rules formatting updated.');
    
    // Owner Formatting.
    
    // Milestones. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Milestones"')
       .setBackground('#000000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Program. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Program (PR)"')
       .setBackground('#F4B084')
       .setFontColor('#000000')
       .build());
  
    // Styling. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Styling (SY)"')
       .setBackground('#FFFF00')
       .setFontColor('#000000')
       .build());
  
    // Engineering Design. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Engineering Design (ED)"')
       .setBackground('#92D050')
       .setFontColor('#000000')
       .build());
  
    // Virtual Development. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Virtual Development (VD)"')
       .setBackground('#FFC000')
       .setFontColor('#000000')
       .build());
  
    // Physical Validation. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Physical Validation (PV)"')
       .setBackground('#9BC2E6')
       .setFontColor('#000000')
       .build());
  
    // Propulsion System Integration. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Propulsion System Integration (PS)"')
       .setBackground('#A6A6A6')
       .setFontColor('#000000')
       .build());
  
    // Supply Chain. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Supply Chain (SC)"')
       .setBackground('#7030A0')
       .setFontColor('#FFFFFF')
       .build());
  
    // Manufacturing. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Manufacturing (MF)"')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
  
    // Servicability, Service, After Sales. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Servicability, Service, After Sales (AS)"')
       .setBackground('#F090EB')
       .setFontColor('#000000')
       .build());
  
    // Support Teams. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(FirstDataColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="Support Teams (ST)"')
       .setBackground('#993300')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Activity Sheet: Owner formatting updated.');
    
    // Line Status Text.
    
    // Loaded In To Be Tested. 
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Loaded In To Be Tested."')
       .setFontColor('#70ad47')
       .build());
    
    // WIP.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('A' + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="WIP."')
       .setFontColor('#FF0000')
       .build());
    
    Logger.log('Activity Sheet: Line Status Text formatting updated.');
    
    // Check Column Headers
    
    // ! Check Column Headers.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange('BH1:CI1')])
       .whenTextStartsWith('!')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
    
    Logger.log('Activity Sheet: Check Column Headers formatting updated.');
    
    // Remark Column
    
    // Comment text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Comment')
       .setBackground('#B7E1CD')
       .build());
    
    // Follow Up text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Follow Up')
       .setBackground('#fce5cd')
       .build());
    
    Logger.log('Activity Sheet: Comment text in Remark Column formatting updated.');
  
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Activity tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');  
  }
  