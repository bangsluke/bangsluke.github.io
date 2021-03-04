function GoToControlPanel() {
  
    /**
    * GoToControlPanel Function
    * Takes the user to the Control Panel tab.
    */
    
    // Define the spreadsheet.
    let CurrentSpreadsheet = SpreadsheetApp.getActive();
  
    // Move to the defined sheet.
    var Spreadsheet = CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('Control Panel'), true);
    
  }
  
  function GoToHome() {
    
    /**
    * GoToHome Function
    * Takes the user to the Home tab.
    */
    
    // Define the spreadsheet.
    let CurrentSpreadsheet = SpreadsheetApp.getActive();
  
    // Move to the defined sheet.
    var Spreadsheet = CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('Home'), true);
    
  }