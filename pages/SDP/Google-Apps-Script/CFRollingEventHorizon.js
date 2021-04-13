function ConditionalFormattingRollingEventHorizonTab() {
 
    /**
    * ConditionalFormattingRollingEventHorizonTab Function.
    * Conditionally formats the Rolling Event Horizon tab.
    */
    
    // Add an alert to tell the user that the sheet is being formatted.
    var SpreadsheetUI = SpreadsheetApp.getUi();
    SpreadsheetUI.alert('SDP Rolling Event Horizon tab being formatted...' + '\n' + '\n' + 'Please wait until you receive the next message before beginning to use the sheet.');
    Logger.log('Rolling Event Horizon Sheet: SDP Rolling Event Horizon tab being formatted...');
    
    // Define the spreadsheet.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    
    // Create an array of swimlane titles to loop through.
    var SheetName = CurrentSpreadsheet.getSheetByName('LookUps');
    var SwimlaneArraySize = 11;
    var SwimlaneNameArray = [];
    var SwimlaneColourArray = [];
    var SwimlaneTextColourArray = [];
    for (var i = 1; i <= SwimlaneArraySize; i++) {
       SwimlaneNameArray[i] = SheetName.getRange('C' + (i + 1)).getDisplayValue(); // The + 1 offsets the header row.
       SwimlaneColourArray[i] = SheetName.getRange('D' + (i + 1) ).getDisplayValue(); // The + 1 offsets the header row.
       SwimlaneTextColourArray[i] = SheetName.getRange('E' + (i + 1) ).getDisplayValue(); // The + 1 offsets the header row.
    }
    
    // Select the tab and clear all conditional formatting.
    SheetName = CurrentSpreadsheet.getSheetByName('Rolling Event Horizon');
    CurrentSpreadsheet.setActiveSheet(CurrentSpreadsheet.getSheetByName('Rolling Event Horizon'), true);
    ClearConditionalFormatting(); // See Re-Usable Functions code.
    
    // Select the range over which to apply the conditional formatting.
    SheetName.getRange(1, 1, SheetName.getMaxRows(), SheetName.getMaxColumns()).activate();
    var ConditionalFormatRules = CurrentSpreadsheet.getActiveSheet().getConditionalFormatRules();
    var HeaderRow = 9;
    var FirstRow = HeaderRow + 1;
    var LastRow = SheetName.getMaxRows();
    
    // Set up a number of column and row references to be used below.
    var DayRowNumber = "7";
    var DayNumberRowNumber = "8";
    var NumberColumnLetter = "A";
    var OwnerColumnLetter = "C";
    var NameColumnLetter = "D";
    var TaskNameColumnLetter = "G";
    var OrderingIDColumnLetter = "I";
    var StartDayColumnLetter = "J";
    var EndDayColumnLetter = "K";
    var StartWeekColumnLetter = "L";
    var EndWeekColumnLetter = "M";
    var CompleteColumnLetter = "N";
    var PastColumnLetter = "P";
    var HorizonChartStartColumnLetter = "Q";
    var HorizonChartEndColumnLetter = "AS";
    var FutureColumnLetter = "AT";
    var MainTimingChartStartColumnLetter = "AW";
    var MainTimingChartEndColumnLetter = "BD";
    // Set up trigger cell reference.
    var TriggerCellReference = "$D$6";
    
    // Clear all formatting below header row.
    CurrentSpreadsheet.getRange(FirstRow + ':' + LastRow).activate();
    CurrentSpreadsheet.getActiveRangeList().setBackground(null)
    .setFontColor(null);
    
    // Apply grey backgrounds to formula columns.
    CurrentSpreadsheet.getRange(NumberColumnLetter + FirstRow + ':' + OwnerColumnLetter + LastRow).setBackground('#efefef')
    .setFontColor(null)
    .setFontStyle('italic');
    CurrentSpreadsheet.getRange(OrderingIDColumnLetter + FirstRow + ':' + CompleteColumnLetter + LastRow).setBackground('#efefef')
    .setFontColor(null)
    .setFontStyle('italic');
    CurrentSpreadsheet.getRange(PastColumnLetter + FirstRow + ':' + PastColumnLetter + LastRow).setBackground('#efefef')
    .setFontColor(null)
    .setFontStyle('italic');
    CurrentSpreadsheet.getRange(FutureColumnLetter + FirstRow + ':' + FutureColumnLetter + LastRow).setBackground('#efefef')
    .setFontColor(null)
    .setFontStyle('italic');
  
    // Formatting Rules.
    
    // Weekend Highlight. Highlights all gantt chart columns.
    ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
       .setRanges([CurrentSpreadsheet.getRange(HorizonChartStartColumnLetter + DayRowNumber + ':' + HorizonChartEndColumnLetter + LastRow),CurrentSpreadsheet.getRange(MainTimingChartStartColumnLetter + DayRowNumber + ':' + MainTimingChartEndColumnLetter + LastRow)])             
       .whenFormulaSatisfied('=OR(WEEKDAY(' + HorizonChartStartColumnLetter + '$' + DayNumberRowNumber + ',2)=6,WEEKDAY(' + HorizonChartStartColumnLetter + '$' + DayNumberRowNumber + ',2)=7)')
       .setBackground('#f3f3f3')
       .setFontColor('#000000')
       .build());
    
    // Swimlane Formatting.
    
    // Loop through the swimlane array and add conditional formatting based on the swimlane name and colour.
    for (i = 1; i <= SwimlaneArraySize; i++) {
      // Activity Formatting. Highlights the activity name, start, duration and task name for all swimlanes.
       ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
          .setRanges([CurrentSpreadsheet.getRange(NameColumnLetter + FirstRow + ':' + NameColumnLetter + LastRow)])
          .whenFormulaSatisfied('=$' + OwnerColumnLetter + FirstRow + '="' + SwimlaneNameArray[i] + '"')
          .setBackground(SwimlaneColourArray[i])
          .setFontColor(SwimlaneTextColourArray[i])
          .build());
      // Horizon Chart Formatting. Highlights first gantt chart columns where timing is correct for all swimlanes.
       ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
          .setRanges([CurrentSpreadsheet.getRange(HorizonChartStartColumnLetter + FirstRow + ':' + HorizonChartEndColumnLetter + LastRow)])
          .whenFormulaSatisfied('=AND($' + StartDayColumnLetter + FirstRow + '<=' + HorizonChartStartColumnLetter + '$' + DayNumberRowNumber + ',$' + EndDayColumnLetter + FirstRow + '>=' + HorizonChartStartColumnLetter + '$' + DayNumberRowNumber + ',$' + OwnerColumnLetter + FirstRow + '="' + SwimlaneNameArray[i] + '")')
          .setBackground(SwimlaneColourArray[i])
          .setFontColor(SwimlaneTextColourArray[i])
          .build());
       // Main Timing Chart Formatting. Highlights second gantt chart columns where timing is correct for all swimlanes.
       ConditionalFormatRules.push(SpreadsheetApp.newConditionalFormatRule()
          .setRanges([CurrentSpreadsheet.getRange(MainTimingChartStartColumnLetter + FirstRow + ':' + MainTimingChartEndColumnLetter + LastRow)])
          .whenFormulaSatisfied('=AND(' + TriggerCellReference + '="Yes",$' + StartDayColumnLetter + FirstRow + '<=' + MainTimingChartStartColumnLetter + '$' + DayNumberRowNumber + ',$' + EndDayColumnLetter + FirstRow + '>=' + MainTimingChartStartColumnLetter + '$' + DayNumberRowNumber + ',$' + OwnerColumnLetter + FirstRow + '="' + SwimlaneNameArray[i] + '")')
          .setBackground(SwimlaneColourArray[i])
          .setFontColor(SwimlaneTextColourArray[i])
          .build());
    }
  
    // Apply all conditional format rules.
    CurrentSpreadsheet.getActiveSheet().setConditionalFormatRules(ConditionalFormatRules);
    
    // Add a final message saying that the user can continue.
    SpreadsheetUI.alert('SDP Rolling Event Horizon tab successfully formatted.' + '\n' + '\n' + 'Please begin using the sheet.');
    Logger.log('Rolling Event Horizon Sheet: SDP Rolling Event Horizon tab successfully formatted.');
    
  }