// IndexCode
// All code that is used with the Index Sidebar is placed here.

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Get the sheet names
 * https://www.benlcollins.com/spreadsheets/index-sheet/#indexSidebar
 */

function getSheetNames() {
  
    // Get all the different sheet IDs
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ss.getSheets();
    
    return sheetNamesIds(sheets);
  }
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  /**
   * Create array of sheet names and sheet ids
   * https://www.benlcollins.com/spreadsheets/index-sheet/#indexSidebar
   */
  
  function sheetNamesIds(sheets) {
    
    var indexOfSheets = [];
    
    // create array of sheet names and sheet gids
    sheets.forEach(function(sheet){
      indexOfSheets.push([sheet.getSheetName(),sheet.getSheetId()]);
    });
   
    Logger.log(indexOfSheets);
    return indexOfSheets;
    
  }
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  /**
   * Create array of sheet names and sheet ids
   */
  
  function userSignIn() {
  
    // Get the email address of the active user.
    var email = Session.getActiveUser().getEmail();
    
    // Give a welcoming message.
    var response = Browser.msgBox('SDP Data Sheet', 'Welcome to the SDP Data Sheet ' + email + '.', Browser.Buttons.OK);
    
  }