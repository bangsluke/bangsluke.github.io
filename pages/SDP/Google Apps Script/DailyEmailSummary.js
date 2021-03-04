function EmailSDPDataSummary() {

    /**
    * EmailSDPDataSummary Function
    * Sends an email to the current user with a summary of the SDP Data sheet.
    */
  
    // Define the spreadsheet.
    let CurrentSpreadsheet = SpreadsheetApp.getActive();
    let FunctionName = "EmailSDPDataSummary"; // Used for identifying log entries.
    Logger.log(FunctionName + '. Function initiated.');
  
    // Get the day of the week number and don't run code if weekend. Note: Sunday is 0, Monday is 1, and so on.
    // https://www.w3schools.com/jsref/jsref_getday.asp
    var d = new Date();
    var n = d.getDay();
    if (n == 0 || n == 6) {
      Logger.log(FunctionName + '. Function cancelled as day of the week is: ' + n);
      return;
    }
  
    // Get the last used row number of the Manual Change Log to define the last change made.
    var SheetName = CurrentSpreadsheet.getSheetByName('Manual Change Log');
    var ColumnToCheck = SheetName.getRange("F:F").getValues(); //Select the column we will check for the first blank cell to find the last row.
    var LastRow = GetLastRowSpecial(ColumnToCheck, 'Manual Change Log'); // Get the last row based on the data range of a single column.
    let LastChangeText = SheetName.getRange(LastRow, 2).getValue(); // LastChangeText in column B.
    let LastChangeTextOutcome = SheetName.getRange(LastRow, 4).getValue(); // LastChangeTextOutcome in column D.
    let LastHeartbeatCount = SheetName.getRange(LastRow, 6).getValue(); // LastHeartbeatCount in column F.
  
    // Convert the heartbeatcount into Years, Weeks and Days.
    // https://codeforwin.org/2015/06/c-program-to-convert-days-into-years-weeks-days.html#:~:text=Logic%20to%20convert%20days%20to%20years%20weeks%20and%20days&text=Which%20is%20years%20%3D%20days%20%2F%20365,%2B%20(weeks%20*%207))%20.
    // https://www.w3schools.com/jsref/jsref_floor.asp
    if (LastHeartbeatCount = "n/a") {
      var ReadableTiming = "No timing reported";
    } else {
      let LastHeartbeatCountAsNormalDays = LastHeartbeatCount * (7 / 5); // Add in weekends.
      let years = Math.floor(LastHeartbeatCountAsNormalDays / 365); // Get years.
      let weeks = Math.floor((LastHeartbeatCountAsNormalDays - (years * 365)) / 7); // Get weeks minus the previously calculated years.
      let days = Math.floor(LastHeartbeatCountAsNormalDays - ((years * 365) + (weeks * 7))); // Get days minus the previously calculated months and years.
      var ReadableTiming = years + ' year(s), ' + weeks + ' week(s) & ' + days + ' days(s)'; // Combine into a string.
    }
  
    // Get the last used row number of the Schema Log to define the latest schema.
    SheetName = CurrentSpreadsheet.getSheetByName('schemalog');
    ColumnToCheck = SheetName.getRange("B:B").getValues(); //Select the column we will check for the first blank cell.
    LastRow = GetLastRowSpecial(ColumnToCheck, 'schemalog'); // Get the last row based on the data range of a single column.
    let LastSchemaId = SheetName.getRange(LastRow, 2).getValue(); // LastSchemaId in column B.
  
    // Get the status of each tab from the control panel.
    SheetName = CurrentSpreadsheet.getSheetByName('Control Panel');
    let TabNameColumnLetter = "C"; // The column with all table/tab names in.
    let TabStatusColumnLetter = "E"; // The column with the table/tab status in.
    let TabCountColumnLetter = "F"; // The column with the row count in of each table/tab.
    let FirstDataRow = 18; // The starting row number of the table/tab names on the Control Panel.
    let LastDataRow = 69; // The final row number of the table/tab names on the Control Panel.
    let StatusString = "Tab Status:" + '\n'; // Initiate the StatusString with an initial message.
    let CellStatus = "OK"; // Set CellStatus to OK to start of with.
  
    // Create a status string from the tab names, status' and counts.
    var StatusArray = []; // Define an empty array.
    for (var i = FirstDataRow; i <= LastDataRow; i++) {
      CellStatus = SheetName.getRange(TabStatusColumnLetter + i).getDisplayValue();
      if (CellStatus == "OK") {
        //StatusString = StatusString + '- ' + SheetName.getRange(TabNameColumnLetter + i).getDisplayValue()
          + " (Status: " + SheetName.getRange(TabStatusColumnLetter + i).getDisplayValue() + ". Count: "
          + SheetName.getRange(TabCountColumnLetter + i).getDisplayValue() + ')\n';
        // Add - FirstDataRow + 1 to reset the array back down to 1.
        StatusArray[i - FirstDataRow + 1] = SheetName.getRange(TabNameColumnLetter + i).getDisplayValue()
          + " (Status: " + SheetName.getRange(TabStatusColumnLetter + i).getDisplayValue() + ". Count: "
          + SheetName.getRange(TabCountColumnLetter + i).getDisplayValue() + ')\n';
        // textString += "<li>" + StatusArray[i] + "</li>";
      } else {
        //StatusString = StatusString + '* ' + SheetName.getRange(TabNameColumnLetter + i).getDisplayValue()
          + " (Status: " + SheetName.getRange(TabStatusColumnLetter + i).getDisplayValue() + ". Count: "
          + SheetName.getRange(TabCountColumnLetter + i).getDisplayValue() + ')\n';
        // Add - FirstDataRow + 1 to reset the array back down to 1.
        StatusArray[i - FirstDataRow + 1] = SheetName.getRange(TabNameColumnLetter + i).getDisplayValue()
          + " (Status: " + SheetName.getRange(TabStatusColumnLetter + i).getDisplayValue() + ". Count: "
          + SheetName.getRange(TabCountColumnLetter + i).getDisplayValue() + ')\n';
        // textString += "<li>" + StatusArray[i] + "</li>";
      }
    }
  
    // Get status' to list on the Daily Email.
    // First, define generic columns and rows of the status'. Make all changes here.
    let StatusColumnLetter = "F";
    let StatusTextColumnLetter = "H";
    let DataStatusRow = 3;
    let SyncStatusRow = 4;
    let TeamQuestionsRow = 8;
  
    // Get the data status of all the tabs.
    let Status = SheetName.getRange(StatusColumnLetter + DataStatusRow).getValue();
    let StatusText = SheetName.getRange(StatusTextColumnLetter + DataStatusRow).getValue();
    let TotalStatusString = 'Overall Data Status: ' + Status + ' (' + StatusText + ')';
    let TotalStatusStringSummary = Status + ' (' + StatusText + ')';
  
    // Get the sync status of the three databases. 
    Status = SheetName.getRange(StatusColumnLetter + SyncStatusRow).getValue();
    StatusText = SheetName.getRange(StatusTextColumnLetter + SyncStatusRow).getValue();
    let SyncStatusString = 'Sync Status: ' + Status + ' (' + StatusText + ')';
    let SyncStatusStringSummary = Status + ' (' + StatusText + ')';
  
    // Get the Team Questions status. 
    Status = SheetName.getRange(StatusColumnLetter + TeamQuestionsRow).getValue();
    StatusText = SheetName.getRange(StatusTextColumnLetter + TeamQuestionsRow).getValue();
    let TeamQuestionsStatusString = 'Team Questions: ' + Status + ' (' + StatusText + ')';
    let TeamQuestionsStatusStringSummary = Status + ' (' + StatusText + ')';
  
    // Get the email address of the active user.
    let email = Session.getActiveUser().getEmail();
  
    // Get the email subject line.
    let subject = 'Daily SDP Data Summary';
  
    // Define an email body in multiple parts.
  
    // Initial summary text:
    var body = 'SDP Data Summary' + '\n' + '\n' + TotalStatusString + '\n' + SyncStatusString + '\n' + TeamQuestionsStatusString + '\n' + '\n' + StatusString;
    // Add last run day count:
    body = body + '\n' + '\n' + 'Last Run Day Count: ' + '\n' + LastHeartbeatCount + ' day(s). This equates to: ' + ReadableTiming + '.';
    // Add last changes made text:
    body = body + '\n' + '\n' + 'Last Changes Made: ' + '\n' + '"' + LastChangeText + '"."' + '\n' + '\n' + 'Outcome: "' + LastChangeTextOutcome + '"';
    let LastRunDayCount = LastHeartbeatCount + ' day(s). This equates to: ' + ReadableTiming + '.';
    let LastChangesMade = '"' + LastChangeText + '"."' + '\n' + '\n' + 'Outcome: "' + LastChangeTextOutcome + '"';
  
    // Attach images of the charts from the "Graph" tab.
    // https://stackoverflow.com/questions/19999269/emailing-a-chart-from-a-google-spreadsheet-with-apps-script
    // https://developers.google.com/apps-script/reference/gmail/gmail-app#sendemailrecipient,-subject,-body,-options
    // Turned off when switched from Gmail to Outlook due to visualisation issue.
    //var SheetName = CurrentSpreadsheet.getSheetByName('Home');
    //var Charts = SheetName.getCharts();
    //if(Charts.length==0){
    //// If no charts, no emailImages not defined and therefore not added.    
    //} else {
    //// If charts exist, define emailImages.
    //var SDPCharts=new Array(Charts.length); 
    //body = body + '\n' + '\n' + "Charts attached.";
    //var emailImages={};
    //for(var i=0;i<Charts.length;i++){
    //SDPCharts[i]= Charts[i].getAs("image/png").setName("SDPCharts"+i);
    ////body = body + "<img src='cid:chart"+i+"'><br>";
    //emailImages["chart"+i]= SDPCharts[i];
    //}
    //}
    
    // Save the charts from the Home tab to the top level of Google Drive. 
    // https://webapps.stackexchange.com/questions/88646/how-should-i-automate-graph-generation-and-image-output-in-google-sheets
    var SheetName = CurrentSpreadsheet.getSheetByName('Home').setActiveSelection; // Set the Home sheet as active.
    var sheet = SpreadsheetApp.getActiveSheet(); // Grabs active sheet.
    var GoogleDriveFolderId = '13SJqr62-_xUFm8uaqNlglYzNm4hl_8zj'; // Set the folder id of where to store the images.
  
    // First image - Heartbeats.
    var chart = sheet.getCharts()[0]; // Grabs the first chart on the sheet.
    // Delete the old file(s) saved on Google drives to avoid duplication.
    //DriveApp.getFolderById(GoogleDriveFolderId).getFilesByName("Heartbeats.png").next().setTrashed(true); 
    var files = DriveApp.getFolderById(GoogleDriveFolderId).getFilesByName("Heartbeats.png"); // https://stackoverflow.com/a/30711903
    while (files.hasNext()) {
      files.next().setTrashed(true);
    }
    // Save the chart as a file on Google Drive with a name and save the fileId. https://stackoverflow.com/questions/42079656/get-id-of-newly-created-folder-in-google-apps-script
    var fileID = DriveApp.getFolderById(GoogleDriveFolderId).createFile(chart.getBlob().setName("Heartbeats.png")).getId(); 
    // Retrieve the image from Google Drive by id and set it to variable "heartbeatsChart" for later use in the HTML template. 
    // Setup embedded image. https://yagisanatode.com/2019/05/27/google-apps-script-create-an-html-email-reminder-service-from-google-sheet-data/
    var heartbeatsChart = DriveApp.getFileById(fileID).getBlob().setName("heartbeatsChart"); // Creates the variable used later in the inlineImages part of the HTML email.
  
    // Second image - Nodes and Edges.
    chart = sheet.getCharts()[1]; // Grabs the second chart on the sheet, (see the [1] rather than [0]).
    var files = DriveApp.getFolderById(GoogleDriveFolderId).getFilesByName("Nodes and Edges.png"); // Delete the old file(s) saved on Google drives to avoid duplication.
    while (files.hasNext()) {
      files.next().setTrashed(true);
    }
    fileID = DriveApp.getFolderById(GoogleDriveFolderId).createFile(chart.getBlob().setName("Nodes and Edges.png")).getId(); // Saves the chart as a file on Google Drive.
    var nodesAndEdgesChart = DriveApp.getFileById(fileID).getBlob().setName("nodesAndEdgesChart"); // Creates the variable used later in the inlineImages part of the HTML email.
  
    // Complex or non complex email?
    let ComplexEmail = true;
    if (ComplexEmail = false) {
  
      Logger.log('Simple email.');
  
      // Send yourself an email. Inlcude the HTML template and the attached images.
      MailApp.sendEmail({
        to: email,
        subject: subject,
        body: body,
        //inlineImages: emailImages
        //noReply: "TRUE"
      });
  
    } else {
  
      Logger.log('Complex email.');
  
      // Set up HTML template for the email. https://blog.gsmart.in/google-apps-script-send-html-email/
      var EmailTemplate = HtmlService.createTemplateFromFile('Daily Email Summary HTML');
  
      // Pass the variables to the HTML template.
      EmailTemplate.overallDataStatus = TotalStatusStringSummary;
      EmailTemplate.overallSyncStatus = SyncStatusStringSummary;
      EmailTemplate.overallTeamQuestionsStatus = TeamQuestionsStatusStringSummary;
  
      EmailTemplate.tabStatusTable1 = StatusArray[1];
      EmailTemplate.tabStatusTable2 = StatusArray[2];
      EmailTemplate.tabStatusTable3 = StatusArray[3];
      EmailTemplate.tabStatusTable4 = StatusArray[4];
      EmailTemplate.tabStatusTable5 = StatusArray[5];
      EmailTemplate.tabStatusTable6 = StatusArray[6];
      EmailTemplate.tabStatusTable7 = StatusArray[7];
      EmailTemplate.tabStatusTable8 = StatusArray[8];
      EmailTemplate.tabStatusTable9 = StatusArray[9];
      EmailTemplate.tabStatusTable10 = StatusArray[10];
      EmailTemplate.tabStatusTable11 = StatusArray[11];
      EmailTemplate.tabStatusTable12 = StatusArray[12];
      EmailTemplate.tabStatusTable13 = StatusArray[13];
      EmailTemplate.tabStatusTable14 = StatusArray[14];
      EmailTemplate.tabStatusTable15 = StatusArray[15];
      EmailTemplate.tabStatusTable16 = StatusArray[16];
      EmailTemplate.tabStatusTable17 = StatusArray[17];
      EmailTemplate.tabStatusTable18 = StatusArray[18];
      EmailTemplate.tabStatusTable19 = StatusArray[19];
      EmailTemplate.tabStatusTable20 = StatusArray[20];
      EmailTemplate.tabStatusTable21 = StatusArray[21];
      EmailTemplate.tabStatusTable22 = StatusArray[22];
      EmailTemplate.tabStatusTable23 = StatusArray[23];
      EmailTemplate.tabStatusTable24 = StatusArray[24];
      EmailTemplate.tabStatusTable25 = StatusArray[25];
      EmailTemplate.tabStatusTable26 = StatusArray[26];
      EmailTemplate.tabStatusTable27 = StatusArray[27];
      EmailTemplate.tabStatusTable28 = StatusArray[28];
      EmailTemplate.tabStatusTable29 = StatusArray[29];
      EmailTemplate.tabStatusTable30 = StatusArray[30];
      EmailTemplate.tabStatusTable31 = StatusArray[31];
      EmailTemplate.tabStatusTable32 = StatusArray[32];
      EmailTemplate.tabStatusTable33 = StatusArray[33];
      EmailTemplate.tabStatusTable34 = StatusArray[34];
      EmailTemplate.tabStatusTable35 = StatusArray[35];
      EmailTemplate.tabStatusTable36 = StatusArray[36];
      EmailTemplate.tabStatusTable37 = StatusArray[37];
      EmailTemplate.tabStatusTable38 = StatusArray[38];
      EmailTemplate.tabStatusTable39 = StatusArray[39];
      EmailTemplate.tabStatusTable40 = StatusArray[40];
      EmailTemplate.tabStatusTable41 = StatusArray[41];
      EmailTemplate.tabStatusTable42 = StatusArray[42];
      EmailTemplate.tabStatusTable43 = StatusArray[43];
      EmailTemplate.tabStatusTable44 = StatusArray[44];
      EmailTemplate.tabStatusTable45 = StatusArray[45];
      EmailTemplate.tabStatusTable46 = StatusArray[46];
      EmailTemplate.tabStatusTable47 = StatusArray[47];
      EmailTemplate.tabStatusTable48 = StatusArray[48];
      EmailTemplate.tabStatusTable49 = StatusArray[49];
      EmailTemplate.tabStatusTable50 = StatusArray[50];
      EmailTemplate.tabStatusTable51 = StatusArray[51];
      EmailTemplate.tabStatusTable52 = StatusArray[52];
  
      EmailTemplate.finalLastRunDayCountText = LastRunDayCount;
      EmailTemplate.finalLastChangesMadeText = LastChangesMade;
      //EmailTemplate.finalSummaryText = 'Last Run Day Count: ' + '\n' + LastHeartbeatCount + ' day(s). This equates to: ' + ReadableTiming + '.' + '\n' + '\n' + 'Last Changes Made: ' + '\n' + '"' + LastChangeText + '"."' + '\n' + '\n' + 'Outcome: "' + LastChangeTextOutcome + '"';
  
      // Evaluate the template to get the content of the HTML email.
      var HTMLMessage = EmailTemplate.evaluate().getContent();
  
      // Send yourself an email.
      MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: HTMLMessage,
        // inlineImages: emailImages
        inlineImages: // Setup embedded image. https://yagisanatode.com/2019/05/27/google-apps-script-create-an-html-email-reminder-service-from-google-sheet-data/
        {
          heartbeatsChart: heartbeatsChart,
          nodesAndEdgesChart: nodesAndEdgesChart
        }
        //noReply: "TRUE"
      });
  
    }
  
    // Display a message with confirmation that the email has been sent.
    var response = Browser.msgBox('Email Success', 'The summary email has been sent to: ' + email + '.', Browser.Buttons.OK);
    Logger.log('Response is: ' + response + '.');
    if (response == "ok") {
      Logger.log(FunctionName + '. The user clicked "OK."');
    }
  
    Logger.log(FunctionName + '. Function successfully completed.');
  
  }