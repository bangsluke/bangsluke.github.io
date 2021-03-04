//https://developers.google.com/speed/docs/insights/v5/get-started

function GetWebpageScreenshot() {

    var bogus = DriveApp.getRootFolder();
    
    var siteUrl = "https://docs.microsoft.com/en-us/advertising/scripts/examples/fetch-resources";
    
    
    try // https://stackoverflow.com/questions/13983925/urlfetchapp-mutehttpexception-doesnt-work
    {
      var page = UrlFetchApp.fetch(siteUrl);
    }
    catch(err)
    {
      Browser.msgBox("error");
    }
    
    
    var correctSiteURL = encodeURIComponent(siteUrl); // https://blog.praveen.science/generating-screenshots-of-urls-using-googles-secret-magic-api/
    var url = "https://www.googleapis.com/pagespeedonline/v4/runPagespeed?screenshot=true&fields=screenshot&url=" + correctSiteURL;
    var res = UrlFetchApp.fetch(url,{muteHttpExceptions:true}); // https://docs.microsoft.com/en-us/advertising/scripts/examples/fetch-resources
    
    
    
    var response = UrlFetchApp.fetch(url,{muteHttpExceptions:true});
    var responseText = response.getContentText();
    
    var responseHtml = UrlFetchApp.fetch(url,{muteHttpExceptions:true});
    Logger.log('Got this far.');
    var responseHtmlText = responseHtml.getContentText();
    
    var data = JSON.parse(responseText);
    Logger.log(data);
    if (data.estimated_need_time) {
      Logger.log('Data JSON.');
      Utilities.sleep(data.estimated_need_time * 2000);
      response = UrlFetchApp.fetch(url1);
      responseText = response.getContentText();
      data = JSON.parse(responseText);
    }
    if (data.image_url) {
      Logger.log('Data URL.');
      var response2 = UrlFetchApp.fetch(data.image_url);
      var blob = response2.getBlob();
      var d = new Date();
      var folder1 = createOrReturnFolder(DriveApp.getRootFolder(), "Website Image Backups");
      var folder2 = createOrReturnFolder(folder1, d.getYear()+"-"+(d.getMonth()+1));    
      folder2.createFile(blob);
      folder2.createFile(d.getYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+blob.getName()+".html" , responseHtmlText);
    }
    
    Logger.log('Function done.');
    
    
    
    
    
    
    
    var obj = JSON.parse(JSON.stringify(res).getContentText());
    var blob = Utilities.newBlob(Utilities.base64DecodeWebSafe(obj.screenshot.data), "image/png", "sample.png");
    DriveApp.createFile(blob);
    
  }
  
  function GetWebpageScreenshot2() {
  
    
    var url = "https://www.googleapis.com/pagespeedonline/v1/runPagespeed?screenshot=true&strategy=mobile&url=https%3A%2F%2Fpraveen.science%2F"
    var res = UrlFetchApp.fetch(url,{muteHttpExceptions:true}).getContentText();
    var obj = JSON.parse(res);
    var blob = Utilities.newBlob(Utilities.base64DecodeWebSafe(obj.screenshot.data), "image/png", "sample.png");
    DriveApp.createFile(blob);
    
  }
  
  
  
  
  
  
  function getWebsiteImage() {
    storeOneUrlImage("https://www.bbc.co.uk/sport");
    storeOneUrlImage("https://smile.amazon.co.uk/?tag=googhydr-21&hvadid=232361766627&hvpos=1t1&hvexid=&hvnetw=g&hvrand=13295204698862816476&hvpone=&hvptwo=&hvqmt=p&hvdev=c&ref=pd_sl_88t6ja85j9_b");
   // ... add more URLs here if you want
  }
  
  function storeOneUrlImage(url) {
   var url1 = "http://api.page2images.com/restfullink?p2i_url="+encodeURIComponent(url)+"&p2i_device=6&p2i_screen=1200x1024&p2i_size=1200x1024&p2i_key=YOUR_PAGE2IMAGES_API_KEY";
    var response = UrlFetchApp.fetch(url1,{muteHttpExceptions:true});
    var responseText = response.getContentText();
    
    var responseHtml = UrlFetchApp.fetch(url,{muteHttpExceptions:true});
    Logger.log('Got this far.');
    var responseHtmlText = responseHtml.getContentText();
    
    var data = JSON.parse(responseText);
    Logger.log(data);
    if (data.estimated_need_time) {
      Logger.log('Data JSON.');
      Utilities.sleep(data.estimated_need_time * 2000);
      response = UrlFetchApp.fetch(url1);
      responseText = response.getContentText();
      data = JSON.parse(responseText);
    }
    if (data.image_url) {
      Logger.log('Data URL.');
      var response2 = UrlFetchApp.fetch(data.image_url);
      var blob = response2.getBlob();
      var d = new Date();
      var folder1 = createOrReturnFolder(DriveApp.getRootFolder(), "Website Image Backups");
      var folder2 = createOrReturnFolder(folder1, d.getYear()+"-"+(d.getMonth()+1));    
      folder2.createFile(blob);
      folder2.createFile(d.getYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+blob.getName()+".html" , responseHtmlText);
    }
    
    Logger.log('Function done.');
    
  }
  
  function createOrReturnFolder( parent,  folderName) {
    
    Logger.log('Creating folder.');
    
    var folders1 =  parent.getFoldersByName(folderName);
      if (!folders1.hasNext()) {
        var newFolder = parent.createFolder(folderName);
        
        Logger.log(newFolder);
        return newFolder;
        
      }
    return folders1.next();
  }
  
  
  
  
  
    
  /* Function 1: creates a Menu when the script loads */
  
  function onOpenWebpage() {
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    // Adds a menu item with a single drop-down 'Email report'
    activeSpreadsheet.addMenu(
        "Email this report", [{
          name: "Email report", functionName: "emailAsPDF"
        }]);
  }
  
  /* Function 2: sends Spreadsheet in an email as a PDF */
  
  // reworked from ctrlq.org/code/19869-email-google-spreadsheets-pdf //
  
  function emailAsPDF() {
  
    // Send the PDF of the spreadsheet to this email address
    var email = "luke.bangs@rle.co.uk";
  
    // Gets the URL of the currently active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var url = ss.getUrl();
    url = url.replace(/edit$/,'');
  
    // Subject of email message
    // The date time string can be formatted using Utilities.formatDate method
    // see examples at https://developers.google.com/apps-script/reference/utilities/utilities#formatdatedate-timezone-format
    // and http://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
    var subject = "Metrics mailing - " + Utilities.formatDate(new Date(), "GMT", "dd-MMM-yyyy");
  
    // Body of email message
    var body = "\n\nHello\n\nThis is a mailing of a Google Sheet.\n \n";
  
    /* Specify PDF export parameters
    // Taken from: code.google.com/p/google-apps-script-issues/issues/detail?id=3579
      exportFormat = pdf / csv / xls / xlsx
      gridlines = true / false
      printtitle = true (1) / false (0)
      size = A4 / letter /legal
      fzr (repeat frozen rows) = true / false
      portrait = true (1) / false (0)
      fitw (fit to page width) = true (1) / false (0)
      add gid if to export a particular sheet - 0, 1, 2,..
    */
  
    var url_ext = 'export?exportFormat=pdf' // export as pdf
                  + '&format=pdf'           // export as pdf
                  + '&size=A4'              // paper size
                  + '&portrait=true'        // page orientation
                  + '&fitw=true'            // fits width; false for actual size
                  + '&sheetnames=false'     // hide optional headers and footers
                  + '&printtitle=false'     // hide optional headers and footers
                  + '&pagenumbers=false'    // hide page numbers
                  + '&gridlines=false'      // hide gridlines
                  + '&fzr=false'            // do not repeat row headers
                  + '&gid=0';               // the sheet's Id
  
    var token = ScriptApp.getOAuthToken();
  
    // Convert worksheet to PDF
    var response = UrlFetchApp.fetch(url + url_ext)
  
    //convert the response to a blob
    file = response.getBlob().setName('mailing.pdf');
  
    // Send the email with the PDF attachment. Google sets limits on the number of emails you can send: https://docs.google.com/macros/dashboard
    if (MailApp.getRemainingDailyQuota() > 0)
       GmailApp.sendEmail(email, subject, body, {attachments:[file]});
  
  }
  
  
  