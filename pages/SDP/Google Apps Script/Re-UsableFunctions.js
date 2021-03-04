// Re-Usable Functions
// Functions to be copied across and used widely across multiple projects.

function ClearConditionalFormatting() {
  
    /**
    * ClearConditionalFormatting
    * Clears the conditional formatting of a given sheet.
    */
    
    //Logger.log('ClearConditionalFormatting. Function initiated.');
    
    var sheet = SpreadsheetApp.getActiveSheet();
    sheet.clearConditionalFormatRules();
    
    Logger.log('ClearConditionalFormatting. Function successfully completed.');
    
  }
  
  // ************************************************************************************************************************************************************
  
  function ColumnToLetter(column) {
  
    /**
    * ColumnToLetter
    * Converts a given column number to the column letter.
    * @param {integer} column: The column number required for conversion.
    * https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter
    */
    
    //Logger.log('ColumnToLetter. Function initiated.');
    
    var temp, letter = '';
    while (column > 0)
    {
      temp = (column - 1) % 26;
      letter = String.fromCharCode(temp + 65) + letter;
      column = (column - temp - 1) / 26;
    }
    return letter;
    
    Logger.log('ColumnToLetter. Function successfully completed.');
  }
  
  // ************************************************************************************************************************************************************
   
  function LetterToColumn(letter) {
  
    /**
    * LetterToColumn
    * Converts a given column letter to the column number.
    * @param {string} letter: The column letter required for conversion.
    * https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter
    */
  
    //Logger.log('LetterToColumn. Function initiated.');
    
    var column = 0, length = letter.length;
    for (var i = 0; i < length; i++)
    {
      column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
    }
    
    // Convert to an integer.
    Logger.log('Before round: ' + column);
    var column = Math.round(column);
    Logger.log('After round: ' + column);
    
    return column;
    
    Logger.log('LetterToColumn. Function successfully completed.');
  }
  
  // ************************************************************************************************************************************************************
   
  function GetLastRowSpecial(range,sheetname){
    
    /**
    * getLastRowSpecial
    * Gets the last row number from a given range.
    * @param {string} sheetname: The name of the sheet tab the function is looking in.
    * @param {array} range: The range to get the last row from.
    * @returns {number} number : The last row number with a value.
    * https://yagisanatode.com/2019/05/11/google-apps-script-get-the-last-row-of-a-data-range-when-other-columns-have-content-like-hidden-formulas-and-check-boxes/
    */
    
    //Logger.log('GetLastRowSpecial. Function initiated.');
    
    var rowNum = 0;
    var blank = false;
    for(var row = 0; row < range.length; row++){
   
      if(range[row][0] === "" && !blank){
        rowNum = row;
        blank = true;
        return rowNum;
      } else if(range[row][0] !== ""){
        blank = false;
      };
    };
    
    // Add an alert to tell the user if rowNum is 0 (meaning there are no blank rows).
    if (rowNum == 0) {
      throw 'GetLastRowSpecial. Issue as no blank row was found on sheet ' + sheetname + '.';
      var SpreadsheetUI = SpreadsheetApp.getUi();
      SpreadsheetUI.alert('GetLastRowSpecial. Issue as no blank row was found on sheet ' + sheetname + '.');
      Logger.log('GetLastRowSpecial. Issue as no blank row was found on sheet "' + sheetname + '".');
    } else {
      Logger.log('GetLastRowSpecial. Function successfully completed.');
    }
    
    return rowNum;
    
  }
  
  // ************************************************************************************************************************************************************
  
    /**
    * appendLeadingZeroes
    * Adds a leading zero to any date or time value that is missing it.
    * @param {number} n: The number passed to the function.
    * @returns {number} n : The corrected number with a leading zero.
    * https://codehandbook.org/javascript-date-format/#:~:text=To%20convert%20date%20to%20format,year%20from%20the%20date%20object.&text=To%20convert%20the%20numeric%20month,based%20on%20the%20month%20index
    */
  
  function appendLeadingZeroes(n){
    if(n <= 9){
      n = "0" + n;
    }
    return n
  }
  
  // ************************************************************************************************************************************************************
  
    /**
    * writeMessageToSidebar
    * Writes a display message to the side bar instead of needing to show it in the logger.
    * @param {string} title: The title to set at the top of the sidebar.
    * @param {string} message: The message to pass to the sidebar.
    * @param {integer} width: The width the sidebar should be.
    * Source: Tony Pike.
    */
  
  function writeMessageToSidebar(title,message,width){
    const SpreadsheetUI = SpreadsheetApp.getUi();
    var htmlOutput = HtmlService.createHtmlOutput('<p>' + message + '</p>')
      .setTitle(title)
      .setWidth(width);
    SpreadsheetUI.showSidebar(htmlOutput);
  }
  
  // ************************************************************************************************************************************************************
  
  // Creates an import or include function so files can be added inside the main index.
  // https://yagisanatode.com/2018/04/15/google-apps-script-how-to-create-javascript-and-css-files-for-a-sidebar-project-in-google-apps-script/
  function include(filename){
    return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
  };
  
  // ************************************************************************************************************************************************************
  
  