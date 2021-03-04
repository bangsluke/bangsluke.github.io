function ExportAllCSVfiles() {
  
    /**
    * ExportAllCSVfiles
    * "Export All CSV files" function, clickable on SDP Nodes & Edges menu.
    * Exports the Nodes, Edges and special tabs into CSV files in the users downloads folder.
    * https://developers.google.com/apps-script/guides/menus
    */
      
    SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
       .alert('You clicked the first menu item! Export All CSV files function yet to be written.');
    
  }
  
  // ************************************************************************************************************************************************************
  
  function ExportCSV(SheetName) {
    
    /**
    * ExportCSV Function.
    * Exports the defined tab to a CSV for the user to download.
    */
    
    Logger.log('ExportCSV Function initiated.');
    
    // Add an alert to tell the user that the tab is being exported.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP ' + SheetName + ' tab being exported...' + '\n' + '\n' + 'Please wait until you receive the next message before continuing to use the sheet.');
    
    // Define the spreadsheet and select the defined tab.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName(SheetName), true);
    
    Logger.log(SheetName + ' tab selected and set as active.');
    
    // Duplicate the tab and rename it as "ExportCSV".
    var ExportCSVName = SheetName + ' CSV'
    CurrentSpreadsheet.duplicateActiveSheet();
    CurrentSpreadsheet.getActiveSheet().setName(ExportCSVName);
    
    Logger.log(SheetName + ' tab duplicated and renamed.');
    
    // Save the file name globally using property services.
    // https://stackoverflow.com/questions/24721226/how-to-define-global-variable-in-google-apps-script
    PropertiesService.getScriptProperties().setProperty('File Name', ExportCSVName);
    
    Logger.log('File Name passed to properties service.');
    
    // Call download dialog box.
    ShowDownloadDialogBox()
    
    Logger.log('Download completed.');
    
  };
  
  // ************************************************************************************************************************************************************
  
  function ShowDownloadDialogBox() {
    
    /**
    * ShowDownloadDialogBox Function
    * Creates a simple dialog box with a download button on.
    * https://stackoverflow.com/questions/42254842/how-to-export-to-csv-from-spreadsheet-to-drive-or-download-folder
    */
    
    Logger.log('ShowDownloadDialogBox initiated.');
    
    var html = HtmlService.createHtmlOutputFromFile('Export HTML Code');
    SpreadsheetApp.getUi().showModalDialog(html, 'CSV Download Dialog');
    
  }
  
  // ************************************************************************************************************************************************************
  
  function saveAsCSV() {
    
    /**
    * saveAsCSV Function
    * Creates the CSV and gets the download link.
    * https://stackoverflow.com/questions/42254842/how-to-export-to-csv-from-spreadsheet-to-drive-or-download-folder
    */
    
    // Retreive the file name from property services.
    // https://stackoverflow.com/questions/24721226/how-to-define-global-variable-in-google-apps-script
    var FileName = PropertiesService.getScriptProperties().getProperty('File Name');
    
    Logger.log('File Name retrieved from properties service.');
    
    //var FileName = "test"; // CSV file name
    var FolderIDString = "132Eik-ude27YYu2WAb79OiMq-GtxdqVy"; // Google Drive Folder ID (https://drive.google.com/drive/folders/132Eik-ude27YYu2WAb79OiMq-GtxdqVy)
    var csv = "";
    var v = SpreadsheetApp
              .getActiveSpreadsheet()
              .getActiveSheet()
              .getDataRange()
              .getValues();
    v.forEach(function(e) {
        csv += e.join(",") + "\n";
    });
    var url = DriveApp.getFolderById(FolderIDString)
                .createFile(FileName, csv, MimeType.CSV)
                .getDownloadUrl()
                .replace("?e=download&gd=true","");
    return url;
    
    // Define the spreadsheet and delete the newly created "Export CSV" tab so the function can be re-run over and over again.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    CurrentSpreadsheet.deleteActiveSheet();
  }
  
  // ************************************************************************************************************************************************************
  
  function saveAsCSVTest() {  
    
    // http://eyana.me/create-a-simple-changelog-using-google-apps-scripts/#fn:1
  
    var folder = DriveApp.getFolderById('132Eik-ude27YYu2WAb79OiMq-GtxdqVy');
  
    var currentDate = Utilities.formatDate(new Date(), "GMT+8", "MM-dd-yy hh:mm aaa");
  
    fileName = ss.getName() + "_Changelog_" + currentDate + ".csv";
  
    var csvFile = convertRangeToCsvFile_(fileName, changelogSheet);
  
    folder.createFile(fileName, csvFile);
  
    Browser.msgBox('Uploading file in ' + folder.getName());
  }
  
  // ************************************************************************************************************************************************************
  
  function ExportActivityCSV() {
   
    /**
    * ExportActivityCSV Function.
    * Exports the Activity tab to a CSV for the user to download.
    */
    
    Logger.log('ExportActivityCSV Function initiated.');
    
    ExportCSV('activity')
    
  }
  
  // ************************************************************************************************************************************************************
  
  function ExportEdgeCSV() {
   
    /**
    * ExportEdgeCSV Function.
    * Exports the Edge tab to a CSV for the user to download.
    */
    
    Logger.log('ExportEdgeCSV Function initiated.');
    
    ExportCSV('edge')
    
  }
  
  // ************************************************************************************************************************************************************
  
  function ExportSpecialActivityCSV() {
   
    /**
    * ExportSpecialActivityCSV Function.
    * Exports the Special Activity tab to a CSV for the user to download.
    */
    
    Logger.log('ExportSpecialActivityCSV Function initiated.');
    
    ExportCSV('Special Activity')
    
  }
  
  // ************************************************************************************************************************************************************
  
  function ExportSpecialEdgeCSV() {
   
    /**
    * ExportSpecialEdgeCSV Function.
    * Exports the Special Edge tab to a CSV for the user to download.
    */
    
    Logger.log('ExportSpecialEdgeCSV Function initiated.');
    
    ExportCSV('Special Edge')
    
  }
  