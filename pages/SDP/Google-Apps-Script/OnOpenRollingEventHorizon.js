/** @OnlyCurrentDoc */
// Only runs on the current doc, rather than on all open Google Sheet documents.

function onOpen(e) {
  
    /**
    * onOpen Function
    * SDP Rolling Event Horizon sheet onOpen functions.
    * https://developers.google.com/apps-script/guides/triggers
    */
  
    // Add an alert to tell the user that the sheet is setting up.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Rolling Event Horizon Sheet opened. Setting up sheet...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    
    // Create custom menu items for the user to use.
    // https://developers.google.com/apps-script/guides/menus
    SpreadsheetUI.createMenu('SDP Rolling Event Horizon Menu')
        .addSeparator()
        .addSubMenu(SpreadsheetUI.createMenu('Formatting')
            .addItem('Update Rolling Event Horizon Formatting', 'ConditionalFormattingRollingEventHorizonTab'))
        .addToUi();
    
    // Add a final alert to tell the user that the sheet is set up and ready for modifcation.
    SpreadsheetUI.alert('SDP Rolling Event Horizon Sheet successfully set up.' + '\n' + '\n' + 'Please begin using the sheet.');
    
  }