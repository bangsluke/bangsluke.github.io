function ConditionalFormattingCommodityTab() {
 
    /**
    * ConditionalFormattingCommodityTab Function.
    * Conditionally formats the Commodity Tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    var ProperTabName = "Commodity";
    var TabName = "commodity";
    SpreadsheetUI.alert('SDP ' + ProperTabName + ' tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    Logger.log(ProperTabName + ' Sheet: SDP ' + ProperTabName + ' tab being formatted...');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Select the tab and clear all conditional formatting.
    var SheetName = CurrentSpreadsheet.getSheetByName(TabName);
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName(TabName), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 1;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    //Logger.log(ProperTabName + ' Sheet: Initial sheet variables updated.');
    
    // Set up a number of column references to be used below.
    var idColumnLetter = "A";
    var FirstDataColumnLetter = "B";
    var LastDataColumnLetter = "E";
    var ErrorCheckColumnLetter = "G";
    var FirstCheckColumnLetter = "I";
    var LastCheckColumnLetter = "K";
    //Logger.log(ProperTabName + ' Sheet: Column references set up.');
    
    // Clear all formatting below header row.
    CurrentSpreadsheet.getRange(FirstRow + ':' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    //Logger.log(ProperTabName + ' Sheet: Initial formatting cleared.');
    
    // Apply grey backgrounds to formula columns.
    CurrentSpreadsheet.getRange(ErrorCheckColumnLetter + FirstRow + ':' + ErrorCheckColumnLetter + LastRow).setBackground('#efefef')
    .setFontColor(null)
    .setFontStyle('italic');
    CurrentSpreadsheet.getRange(FirstCheckColumnLetter + FirstRow + ':' + LastCheckColumnLetter + LastRow).setBackground('#efefef')
    .setFontColor(null)
    .setFontStyle('italic');
    
    // Create an array of users to loop through. Generate a string of editors to remove for next protection code.
    SheetName = CurrentSpreadsheet.getSheetByName('user');
    var LastRowUser = SheetName.getMaxRows();
    var UserCount = SheetName.getRange('A' + LastRowUser).getDisplayValue();
    var UserEmailColumnLetter = 'I';
    var UserRoleColumnLetter = 'M';
    var UserEmailString = '';
    for (var i = 1; i <= UserCount; i++) {
      var UserRole = SheetName.getRange(UserRoleColumnLetter + (i + 1) ).getDisplayValue();
      if (UserRole == 'Data Manager') { // The + 1 offsets the header row.
        // Do nothing as Data Managers allowed to make changes to formulas.
        UserEmailString = UserEmailString;
      } else {
        if (UserEmailString == '') { // Deals with the fist case.
          UserEmailString = SheetName.getRange(UserEmailColumnLetter + (i + 1)).getDisplayValue().trim();  // The + 1 offsets the header row.
        } else { // Deals with all subsequent cases after the first email.
          UserEmailString = UserEmailString + "," + SheetName.getRange(UserEmailColumnLetter + (i + 1)).getDisplayValue().trim(); // The + 1 offsets the header row.
        }
      }
    }
    
    // Clear all protection from tab. // https://support.google.com/docs/thread/2245372?hl=en
    var AllProtections = CurrentSpreadsheet.getActiveSheet().getProtections(SpreadsheetApp.ProtectionType.RANGE);
    for (var j = 0, jLen = AllProtections.length; j < jLen; j++) {
      AllProtections[j].remove();
    };
    //Logger.log(ProperTabName + ' Sheet: All protection cleared.');
     
    // Set protection on all header names.
    var Protection = CurrentSpreadsheet.getRange(HeaderRow + ':' + HeaderRow).protect();
    Protection.removeEditors(UserEmailString.toString().split(",")); // https://stackoverflow.com/questions/31487804/how-to-remove-editors-from-protected-cells-or-permanently-protect-cells-in-googl
    // Set protection on all formula columns. Old protection method: "Protection.setWarningOnly(true);".
    Protection = CurrentSpreadsheet.getRange(ErrorCheckColumnLetter + FirstRow + ':' + ErrorCheckColumnLetter + LastRow).protect();  
    Protection.removeEditors(UserEmailString.toString().split(","));
    Protection = CurrentSpreadsheet.getRange(FirstCheckColumnLetter + FirstRow + ':' + LastCheckColumnLetter + LastRow).protect(); 
    Protection.removeEditors(UserEmailString.toString().split(","));
    
    // Key Checking Rules.
    
    // Note that the order of rules is key.
    
    // Blank Check. Highlights many columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(idColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($' + FirstDataColumnLetter + FirstRow + '=""),' + idColumnLetter + FirstRow + '="")')
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
    
    // Check Text Check. Highlights many columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(ErrorCheckColumnLetter + FirstRow + ':' + LastCheckColumnLetter + LastRow)])             
       .whenTextEqualTo('Check')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build()); 
    
    // Error Check Column. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(idColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ErrorCheckColumnLetter + FirstRow + '="Check"')
       .setBackground('#ed7d31')
       .setFontColor('#000000')
       .build());
    //Logger.log(ProperTabName + ' Sheet: Key Checking Rules formatting updated.');
    
    // Checking Columns.
    
    // ! Check Column Headers.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(ErrorCheckColumnLetter + '1:' + LastCheckColumnLetter + '1')])
       .whenTextStartsWith('!')
       .setBackground('#FF0000')
       .setFontColor('#FFFFFF')
       .build());
    //Logger.log(ProperTabName + ' Sheet: Checking Rules formatting updated.');
    
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP ' + ProperTabName + ' tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');
    Logger.log(ProperTabName + ' Sheet: SDP ' + ProperTabName + ' tab successfully formatted.');
    
  }