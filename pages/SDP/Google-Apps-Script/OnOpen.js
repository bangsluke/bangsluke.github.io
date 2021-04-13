/** @OnlyCurrentDoc */
// Only runs on the current doc, rather than on all open Google Sheet documents.

function onOpen(e) {
  
    /**
    * onOpen Function
    * SDP Data sheet onOpen functions.
    * https://developers.google.com/apps-script/guides/triggers
    */
  
    // Define initial sheet and function information.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    var FunctionName = "OnOpen";
    // Add an alert to tell the user that the sheet is setting up. Note, cannot use onOpen to get the users email address.
    //SpreadsheetUI.alert('SDP Data Sheet opened. Setting up sheet...' + '\n' + '\n' + 'Welcome. 
    //Please wait until you receive the next message before beginning to use the sheet.' + '\n' + '\n' + '(If this doesnt appear for more than 10 seconds, please begin using it anyway.)');
    
    // Add an initial log of code to indicate the code begins running successfully.
    Logger.log(FunctionName + ' initialising code.');
  
    // Define the spreadsheet.
    //let CurrentSpreadsheet = SpreadsheetApp.getActive();
    // Move to the Home sheet.
    //var Spreadsheet = CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('Home'), true);
    
    // Create custom menu items for the user to use. // https://developers.google.com/apps-script/guides/menus
    SpreadsheetUI.createMenu('SDP Data Menu')
        .addItem('Show Index Sidebar', 'showIndexSidebar')
        .addItem('Show SQL Generator Sidebar', 'showSQLSidebar')
        .addItem('Write .SQL File', 'WriteSQLFile')
        .addItem('Export All CSV Files', 'ExportAllCSVfiles')
        .addItem('Email SDP Data Summary', 'EmailSDPDataSummary')
        .addSeparator()
        .addSubMenu(SpreadsheetUI.createMenu('Formatting')
             .addSubMenu(SpreadsheetUI.createMenu('Data Sheets')
                        .addItem('Update Activity Tab Formatting', 'ConditionalFormattingActivityTab')
                        .addItem('Update Edge Tab Formatting', 'ConditionalFormattingEdgeTab')
                        .addItem('Update Special Activity Tab Formatting', 'ConditionalFormattingSpecialActivityTab')
                        .addItem('Update Special Edge Tab Formatting', 'ConditionalFormattingSpecialEdgeTab')
                        .addItem('Update Milestone Tab Formatting', 'ConditionalFormattingMilestoneTab')
                        .addItem('Update Feedback Edge Tab Formatting', 'ConditionalFormattingFeedbackEdgeTab')
                        .addItem('Update Team Tab Formatting', 'ConditionalFormattingTeamTab')
                        .addItem('Update Task Tab Formatting', 'ConditionalFormattingTaskTab')
                        .addItem('Update Deliverable Formatting', 'ConditionalFormattingDeliverableTab')
                        .addItem('Update Swimlane Formatting', 'ConditionalFormattingSwimlaneTab')
                        .addItem('Update Property Formatting', 'ConditionalFormattingPropertyTab')
                        .addItem('Update Commodity Formatting', 'ConditionalFormattingCommodityTab')
                        .addItem('Update Region Formatting', 'ConditionalFormattingRegionTab'))
             .addSubMenu(SpreadsheetUI.createMenu('Secondary Data')
                        .addItem('Update Milestone Has Preactivity Tab Formatting', 'ConditionalFormattingMilestoneHasPreactivityTab')
                        .addItem('Update Task Has Deliverable Formatting', 'ConditionalFormattingTaskHasDeliverableTab')
                        .addItem('Update Task Has Prerequisite Formatting', 'ConditionalFormattingTaskHasPrerequisiteTab')
                        .addItem('Update Activity Has Deliverable Formatting', 'ConditionalFormattingActivityHasDeliverableTab')
                        .addItem('Update Activity Has Prerequisite Formatting', 'ConditionalFormattingActivityHasPrerequisiteTab')
                        .addItem('Update Property Has Activity Formatting', 'ConditionalFormattingPropertyHasActivityTab')))
        .addSubMenu(SpreadsheetUI.createMenu('Exporting')
            .addItem('Export Activity Tab As CSV', 'ExportActivityCSV')
            .addItem('Export Edge Tab As CSV', 'ExportEdgeCSV')
            .addItem('Export Special Activity Tab As CSV', 'ExportSpecialActivityCSV')
            .addItem('Export Special Edge Tab As CSV', 'ExportSpecialEdgeCSV'))
        .addToUi();
    
    // Add an final log of code to indicate the code has run successfully.
    Logger.log(FunctionName + ' completed code.');
      
    // Add a final alert to tell the user that the sheet is set up and ready for modifcation.
    //SpreadsheetUI.alert('SDP Data Sheet successfully set up.' + '\n' + '\n' + 'Please begin using the sheet.');
    
  }