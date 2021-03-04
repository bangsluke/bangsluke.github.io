// Sidebars Code
// Add all code that calls the various sidebars here.

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Show the sheet index sidebar
 * https://www.benlcollins.com/spreadsheets/index-sheet/#indexSidebar
 */

function showIndexSidebar() {
    var ui = HtmlService.createTemplateFromFile('SB2 - SidebarIndex.html') // Call the file "SidebarIndex.html" to create the sidebar content.
        .evaluate()
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .setTitle('Index Sidebar');
    
    SpreadsheetApp.getUi().showSidebar(ui);
  }
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  /**
   * Show the SQL generator sidebar
   * https://www.benlcollins.com/spreadsheets/index-sheet/#indexSidebar
   */
  
  function showSQLSidebar() {
    
    var SidebarTemplate = HtmlService.createTemplateFromFile('SB4 - SidebarSQL.html');
    
    var bodyText = "Test";
    SidebarTemplate.bodyText = bodyText;
    
    return SidebarTemplate.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('SQL Generator');
    
    SpreadsheetApp.getUi().showSidebar(SidebarTemplate);
    
    // Call the file "SidebarSQL.html" to create the sidebar content.
        //.evaluate()
        //.setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('SQL Generator');
    
        // Test
        //var bodyText = "Test";
       // SidebarTemplate.bodyText = "test";
    
    // Evaluate the template to get the content of the HTML email.
    //var HTMLOutput = SidebarTemplate.evaluate();
    
    //SpreadsheetApp.getUi().showSidebar(SidebarTemplate);
    
    // <p><?= bodyText ?></p>
    
  }
  
  function showSQLSidebarTest() {
    
    var SidebarTemplate = HtmlService.createTemplateFromFile('SB4 - SidebarSQL.html')
        .evaluate()
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .setTitle('SQL Generator');
    
    
    SpreadsheetApp.getUi().showSidebar(SidebarTemplate);
  }
  
  function showSQLSidebarTest2() {
    
    var SidebarTemplate = HtmlService.createTemplateFromFile('SB4 - SidebarSQL.html');
    
    SidebarTemplate.bodyText = "Test";
    
    return SidebarTemplate.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME).setTitle('SQL Generator');
    
    
    SpreadsheetApp.getUi().showSidebar(SidebarTemplate);
  }
  
  // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  // Useful links:
  // https://yagisanatode.com/2018/04/15/google-apps-script-how-to-create-javascript-and-css-files-for-a-sidebar-project-in-google-apps-script/
  // https://developers.google.com/apps-script/guides/html/best-practices
  // https://developers.google.com/apps-script/guides/html/templates
  