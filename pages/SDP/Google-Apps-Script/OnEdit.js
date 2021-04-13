/** @OnlyCurrentDoc */
// Only runs on the current doc, rather than on all open Google Sheet documents.

function onEdit(e) {
  
    /**
    * onEdit Function
    * SDP Nodes & Edges sheet onEdit functions.
    * https://developers.google.com/apps-script/guides/triggers
    * http://eyana.me/create-a-simple-changelog-using-google-apps-scripts/#fn:1
    */
  
    // Define the spreadsheet and the sheet name on which the change is made.
    var CurrentSpreadsheet = SpreadsheetApp.getActive();
    var CurrentSheetName = CurrentSpreadsheet.getActiveSheet().getName();
    var CurrentSheet = CurrentSpreadsheet.getSheetByName(CurrentSheetName);
  
    // Delete when testing complete.
    Logger.log('OnEdit code running on tab: ' + CurrentSheetName);
    
    // Deal with changes made. Use a switch statement to determine what to do for each sheet.
    switch(CurrentSheetName) {
      
      case 'activity': // Note: using fall through to ensure all tabs effected. https://stackoverflow.com/questions/6513585/test-for-multiple-cases-in-a-switch-like-an-or
      case 'activity_has_deliverable':
      case 'activity_has_prerequisite':
      case 'company':
      case 'edge':
      case 'errorLog':
      case 'feedbackedge':
      case 'milestone':
      case 'milestone_has_preactivity':
      case 'project':
      case 'savedproject':
      case 'schemalog':
      case 'specialactivity':
      case 'specialedge':
      case 'task_has_deliverable':
      case 'task_has_prerequisite':
      case 'user':
      case 'userLogHistory':
        
        // All tabs that have timeChanged columns.
  
        Logger.log('Triggered 1');
  
        // Define the column and row that the change is made on.
        var ColumnNumber = e.range.getColumn();
        var RowNumber = e.range.getRow();
  
        Logger.log('Row Number: ' + RowNumber);
  
        // Make additional log changes if on a particular sheet.
        if (RowNumber == 1) {
          //Logger.log('OnEdit. row is = ' + RowNumber + ' therefore skip time stamp change.')
        } else {
          //Logger.log('OnEdit. row is = ' + RowNumber + ' therefore add time stamp.')
          var SheetData = CurrentSheet.getDataRange().getValues(); // https://stackoverflow.com/questions/32565859/find-cell-matching-value-and-return-rownumber
          var SearchTerm = 'timeChanged';
          var SearchTermAlt = 'tstamp'; // Added an alternative search term for some tables such as "company".
          for(var i = 0; i<SheetData.length;i++){
            if(SheetData[0][i] == SearchTerm || SheetData[0][i] == SearchTermAlt){ // [0] Because row is 1st row.
              //Logger.log((i+1));
              var TimeChangedColumn = i+1;
              if (ColumnNumber < TimeChangedColumn) {
                // Change to the left of the TimeChangedColumn so update the time.
                //Logger.log('OnEdit. column is = ' + ColumnNumber + ' which is less than the TimeChangedColumn so add time stamp.')
                CurrentSheet.getRange(RowNumber,TimeChangedColumn).setValue(new Date());
              } else {
                //Logger.log('OnEdit. column is = ' + ColumnNumber + ' which is greater than the TimeChangedColumn so don't add time stamp.')
              } 
            }
          }
        }
        return; // Early exit from code as no other actions needed.
      
      case 'swimlane':
        
        // Swimlane Tab.
        
        // Define the column and row that the change is made on.
        var ColumnNumber = e.range.getColumn();
        var RowNumber = e.range.getRow();
  
        // Colour the hex cells on the swimlane tab if modified. https://stackoverflow.com/questions/30766943/google-spreadsheet-script-to-change-background-color-of-a-cell-based-on-a-hex-c
        var HexStartingRow = 2; // First row.
        var HexEndingRow = 20; // Last row.
        var ColumnTypeRowNumber = HexEndingRow + 2; // Type row (e.g. "Background" or "Text").
        if (RowNumber < HexStartingRow || RowNumber > HexEndingRow) { // Cancel code if not in the hex area.
          return;
        }
        var CellHexColourValue = CurrentSpreadsheet.getActiveRange().getValue(); // Define the hex colour chosen in the cell.
        var ColumnTypeRange = CurrentSheet.getRange(ColumnTypeRowNumber,ColumnNumber);
        var ColumnType = ColumnTypeRange.getValue(); // Is it a background or a text colouring cell.
        if (ColumnType == 'Background' || ColumnType == 'Text') { // Check if in the wrong column or not.
          e.range.setBackground(CellHexColourValue);
          if (CellHexColourValue == '#FFFFFF') { // If cell value is 'White'. Set text to black.
            e.range.setFontColor('#000000');
          } else if (CellHexColourValue == '#000000'){ // Cell value is 'Black'. Set text to white.
            e.range.setFontColor('#FFFFFF');
          }
        } else { // If in the wrong column.
          // Do nothing.
        }
        //Logger.log('OnEdit. CurrentSheet name is ' + CurrentSheetName + '. CellHexColourValue is ' + CellHexColourValue + '. Column type is ' + ColumnType + '.');
        return; // Early exit from code as no other actions needed.
  
      case 'swimlaneColours':
  
        // SwimlaneColours Tab.
  
        // Define the column and row that the change is made on.
        var ColumnNumber = e.range.getColumn();
        var RowNumber = e.range.getRow();
  
        // Change colour if Hex code added.
        var eCellValue = CurrentSheet.getRange(RowNumber,ColumnNumber).getValue();
        if (eCellValue.substring(0, 1) == '#'){
          let HexCode = CurrentSheet.getRange(RowNumber,ColumnNumber).getValue();
          CurrentSheet.getRange(RowNumber,ColumnNumber).setBackground(HexCode);
        }
        return; // Early exit from code as no other actions needed.
  
      default:
  
        // All other tabs that don't have a timeChanged column.
        return; // Early exit from code as none of these sheets need further action.
  
    }
      
  }
    
  