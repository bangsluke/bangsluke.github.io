function ConditionalFormattingSpecialEdgeTab() {
 
    /**
    * ConditionalFormattingSpecialEdgeTab Function.
    * Conditionally formats the Special Edge tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    var ProperTabName = "Special Edge";
    var TabName = "specialedge";
    SpreadsheetUI.alert('SDP ' + ProperTabName + ' tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    Logger.log(ProperTabName + ' Sheet: SDP ' + ProperTabName + ' tab being formatted...');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Create an array of swimlane titles to loop through.
    var SheetName = CurrentSpreadsheet.getSheetByName('swimlane');
    var SwimlaneArraySize = 19;
    var SwimlaneNameArray = [];
    var SwimlaneColourArray = [];
    var SwimlaneTextColourArray = [];
    for (var i = 1; i <= SwimlaneArraySize; i++) {
       SwimlaneNameArray[i] = SheetName.getRange('B' + (i + 1)).getDisplayValue(); // The + 1 offsets the header row.
       SwimlaneColourArray[i] = SheetName.getRange('F' + (i + 1) ).getDisplayValue(); // The + 1 offsets the header row.
       SwimlaneTextColourArray[i] = SheetName.getRange('H' + (i + 1) ).getDisplayValue(); // The + 1 offsets the header row.
    }
    
    // Select the tab and clear all conditional formatting.
    SheetName = CurrentSpreadsheet.getSheetByName(TabName);
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
    var NumberColumnLetter = "B";
    var FirstDataColumnLetter = "C";
    var activityIDFromColumnLetter = "C";
    var specialActivityIDFromColumnLetter = "D";
    var activityIDToColumnLetter = "E";
    var specialActivityIDToColumnLetter = "F";
    var fromLoopNColumnLetter = "J";
    var toLoopNColumnLetter = "K";
    var ActiveColumnLetter = "N";
    var LastDataColumnLetter = "P";
    var LineStatusColumnLetter = "R";
    var RemarkColumnLetter = "S";
    var ActivityFromColumnLetter = "W";
    var ActivityToColumnLetter = "X";
    var FromTaskColumnLetter = "Y";
    var ToTaskColumnLetter = "Z";
    var ErrorCheckColumnLetter = "AB";
    var FirstCheckColumnLetter = "AD";
    var activityFromCheckColumnLetter = "AD";
    var activityToCheckColumnLetter = "AE";
    var fromLoopNEdgeConnectionCheckColumnLetter = "AP";
    var toLoopNEdgeConnectionCheckColumnLetter = "AQ";
    var FromTaskOwnerColumnLetter = "BC";
    var ToTaskOwnerColumnLetter = "BD";
    var LastCheckColumnLetter = "BE";
    //Logger.log(ProperTabName + ' Sheet: Column references set up.');
    
    // Clear all formatting below header row.
    CurrentSpreadsheet.getRange(FirstRow + ':' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    //Logger.log(ProperTabName + ' Sheet: Initial formatting cleared.');
    
    // Apply grey backgrounds to formula columns.
    CurrentSpreadsheet.getRange(activityIDFromColumnLetter + FirstRow + ':' + specialActivityIDToColumnLetter + LastRow).setBackground('#efefef')
    .setFontColor(null)
    .setFontStyle('italic');
    CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow).setBackground('#efefef')
    .setFontColor(null)
    .setFontStyle('italic');
    CurrentSpreadsheet.getRange(ErrorCheckColumnLetter + FirstRow + ':' + ErrorCheckColumnLetter + LastRow).setBackground('#efefef')
    .setFontColor(null)
    .setFontStyle('italic');
    CurrentSpreadsheet.getRange(activityFromCheckColumnLetter + FirstRow + ':' + activityToCheckColumnLetter + LastRow).setBackground('#efefef')
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
    Protection = CurrentSpreadsheet.getRange(activityIDFromColumnLetter + FirstRow + ':' + specialActivityIDToColumnLetter + LastRow).protect();  
    Protection.removeEditors(UserEmailString.toString().split(","));
    Protection = CurrentSpreadsheet.getRange(FromTaskColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow).protect();  
    Protection.removeEditors(UserEmailString.toString().split(","));
    Protection = CurrentSpreadsheet.getRange(ErrorCheckColumnLetter + FirstRow + ':' + ErrorCheckColumnLetter + LastRow).protect();
    Protection.removeEditors(UserEmailString.toString().split(","));
    Protection = CurrentSpreadsheet.getRange(FirstCheckColumnLetter + FirstRow + ':' + LastCheckColumnLetter + LastRow).protect(); 
    Protection.removeEditors(UserEmailString.toString().split(","));
    
    // Key Checking Rules.
    
    // Note that the order of rules is key.
    
    // Blank Check. Highlights many columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(idColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow),CurrentSpreadsheet.getRange(ActivityFromColumnLetter + FirstRow + ':' + ToTaskColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=AND(NOT($' + NumberColumnLetter + FirstRow + '=""),' + idColumnLetter + FirstRow + '="")')
       .setBackground('#5b9bd5')
       .setFontColor('#000000')
       .build());
  
    // Deleted Parts. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(idColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Deleted."')
       .setBackground('#000000')
       .setFontColor('#FF0000')
       .build());
    
    // Check Text Check. Highlights many columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(ErrorCheckColumnLetter + FirstRow + ':' + LastCheckColumnLetter + LastRow)])             
       .whenTextEqualTo('Check')
       .setBackground('#660000')
       .setFontColor('#ffffff')
       .build()); 
    
    // fromLoopNEdgeConnectionCheckColumnLetter Column. Highlights fromLoopN or toLoopN columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(fromLoopNColumnLetter + FirstRow + ':' + fromLoopNColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + fromLoopNEdgeConnectionCheckColumnLetter + FirstRow + '="Check"')
       .setBackground('#ffff00')
       .setFontColor('#000000')
       .build());
    
    // toLoopNEdgeConnectionCheckColumnLetter Column. Highlights fromLoopN or toLoopN columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(toLoopNColumnLetter + FirstRow + ':' + toLoopNColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + toLoopNEdgeConnectionCheckColumnLetter + FirstRow + '="Check"')
       .setBackground('#ffff00')
       .setFontColor('#000000')
       .build());
    
    // Error Check Column. Highlights all data columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(idColumnLetter + FirstRow + ':' + LastDataColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + ErrorCheckColumnLetter + FirstRow + '="Check"')
       .setBackground('#ed7d31')
       .setFontColor('#000000')
       .build());
    //Logger.log(ProperTabName + ' Sheet: Key Checking Rules formatting updated.');
    
    // Swimlane Formatting.
    
    // Loop through the swimlane array and add conditional formatting based on the swimlane name and colour.
    for (i = 1; i <= SwimlaneArraySize; i++) {
      // ActivityFrom Formatting. Highlights the Activity From for all swimlanes.
       ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
          .setRanges([CurrentSpreadsheet.getRange(ActivityFromColumnLetter + FirstRow + ':' + ActivityFromColumnLetter + LastRow)])
          .whenFormulaSatisfied('=$' + FromTaskOwnerColumnLetter + FirstRow + '="' + SwimlaneNameArray[i] + '"')
          .setBackground(SwimlaneColourArray[i])
          .setFontColor(SwimlaneTextColourArray[i])
          .build());
      // ActivityTo Formatting. Highlights the Activity To for all swimlanes.
       ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
          .setRanges([CurrentSpreadsheet.getRange(ActivityToColumnLetter + FirstRow + ':' + ActivityToColumnLetter + LastRow)])
          .whenFormulaSatisfied('=$' + ToTaskOwnerColumnLetter + FirstRow + '="' + SwimlaneNameArray[i] + '"')
          .setBackground(SwimlaneColourArray[i])
          .setFontColor(SwimlaneTextColourArray[i])
          .build());
    }
    //Logger.log(ProperTabName + ' Sheet: Swimlane formatting updated.');
    
    // Line Status Text.
    
    // Loaded In To Be Tested. 
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(idColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="Loaded In To Be Tested."')
       .setFontColor('#70ad47')
       .build());
    
    // WIP.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(idColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenFormulaSatisfied('=$' + LineStatusColumnLetter + FirstRow + '="WIP."')
       .setFontColor('#FF0000')
       .build());
    
    // Active Parts. Highlights "id" and "number" (first two) columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(idColumnLetter + FirstRow + ':' + NumberColumnLetter + LastRow)])
       .whenFormulaSatisfied('=AND($' + ActiveColumnLetter + FirstRow + '=0,NOT($' + NumberColumnLetter + FirstRow + '=""))')
       .setBackground('#999999')
       .setFontColor('#FF0000')
       .build());
    //Logger.log(ProperTabName + ' Sheet: Line Status Text formatting updated.');
    
    // Remark Column
    
    // Comment text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Comment')
       .setBackground('#B7E1CD')
       .build());
    
    // Follow Up text in Remark Column.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(RemarkColumnLetter + FirstRow + ':' + RemarkColumnLetter + LastRow)])
       .whenTextContains('Follow Up')
       .setBackground('#fce5cd')
       .build());
    
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