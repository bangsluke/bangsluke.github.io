function DailyEmailCountdown() {

    /**
    * DailyEmailCountdown Function
    * Sends an email to the all SDP team members with a countdown to the next SDP launch.
    * https://blog.gsmart.in/google-apps-script-send-html-email/
    */
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    var FunctionName = "DailyEmailCountdown"; // Used for identifying log entries.
    Logger.log(FunctionName + '. Function initiated.');
    
    // Get the email address of the active user.
    //var email = Session.getActiveUser().getEmail();
    
    // Define the email addresses to send the email to.
    var email = "luke.bangs@rle.co.uk" + "," + "adele.donaldsonlogan@rle.co.uk" + "," + "tony.pike@rle.co.uk" + "," + "sam.crampton@rle.co.uk" + "," + "andre.vogt@rle.de";
    
    // Get the email subject line.
    var subject = 'Daily SDP 3.0 Release Countdown';
    
    // Create email template from HTML file "Daily Email Countdown Template.html".
    var templ = HtmlService.createTemplateFromFile('Daily Email Countdown Template');
    
    // Create a user array of details.
    //var userArray = 
        //{
          //first_name: "Luke",
          //last_name : "Bangs",
          //email: "luke.bangs@rle.co.uk" 
        //};
    //userArray.name = userArray.first_name+' '+userArray.last_name;
    
    // Pass the user details to the HTML template.
    //templ.user = userArray;
    
    // Evaluate the HTML body from the template. 
    var message = templ.evaluate().getContent();
    
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: message
    });
    
    Logger.log(FunctionName + '. Function successfully completed.');
    
  }