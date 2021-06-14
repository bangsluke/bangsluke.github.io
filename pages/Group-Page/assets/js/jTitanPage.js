// jTitanPage.js JavaScript Functions

// Papa Parse (previously TableTop) Google Sheets Database scripts
// Papa Parse - https://www.papaparse.com/docs#csv-to-json
// How to use Papa Parse - https://dev.to/bornfightcompany/using-google-sheets-as-a-simple-database-with-papa-parse-2k7o
// TableTop - https://github.com/jsoma/tabletop

// * Process Explained

// To load the table data across three different tables on the Titans tab, the JavaScript file runs the same Papa Parse process three times, each with a different selector.
// Firstly, an init function calls all three sub processes.
// Each sub process starts with a papa parse, shows and gets the data, re-papa parses the data to get the right data to display and then builds the table on the page.
// 1. Is the top main Titan table.
// 2. Is the Titan Calculated data table.
// 3. Is the Titan Factor Explained table.

// Code

console.time(); // Start the console timer.

// Ready Events
// First add a DOMContentLoaded event to fire when the HTML DOM is in place and then add a load event listener for when all images and other resources are loaded.

window.addEventListener('DOMContentLoaded', init) // Wait for the window to load and then run the init function below.

// Add a load event listener (https://eager.io/blog/how-to-decide-when-your-code-should-run/).
window.addEventListener('load', function () {
    console.log('%c' + '> Gallery page images and other resources all loaded.', 'background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;'); // Provide an initial load message.
    hideLoaderDots('loader-div'); // Hide the loader dots. See LoaderDots.js.    
    showLoaderDots('titan-loader'); // Show the loader dots. See LoaderDots.js. 
    console.timeEnd(); // End the console timer.
});

// Other Functions

// Publically define the location of the Google Sheet. Link to the tblStatsConfig first before selecting which stat to show.
var publicSpreadsheetUrlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTHooCS-JL0ScJZ5ugygKMhP5vY_3QknMdzaEkAw8hZ5OLIXASxByceszcjvEv7P9ecV1QMVrCv3ty3/pub?gid=114011454&single=true&output=csv';

// Log the file location.
console.log("   The published spreadsheet is located at " + publicSpreadsheetUrlCSV); // Log the file location.

// Define the Titan table names to be loaded in. "Titan - Titan" is the lookup in the stats config table of the Google Sheets file.
var TitanTableName = "Titan - Titan";
var TitanCalculatedTableName = "Titan - Factor Calculated"
var TitanFactorExplainedTableName = "Titan - Explained"

// Set the Titans table as requiring tool tips.
var toolTipBoolean = true;

// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {
    console.log('%c' + '> Gallery page DOM content loaded.', 'background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;'); // Provide an initial load message.
    getSiteTheme(); // Update the site theme to what the user has selected.

    // Initially add the Titan table.

    // Log the function call to the console.
    console.log("> 0. init() called. Code started for each of the three sub processes.")

    // Log the function call to the console.
    console.log("> 1. Titan table loaded and populated with values.")

    Papa.parse(publicSpreadsheetUrlCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showInitialTitanInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })

    // Log the function call to the console.
    console.log("> 2. Titan Calculated table loaded and populated with values.")

    Papa.parse(publicSpreadsheetUrlCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showTitanCalculatedInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })

    // Log the function call to the console.
    console.log("> 3. Initial Factor Explained table loaded and populated with values.")

    Papa.parse(publicSpreadsheetUrlCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showTitanFactorExplainedInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}










// 1. Get the Titan Table onto the page.

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
function showInitialTitanInfo(results) {
    console.log("> Function [Titan Table]: showInitialTitanInfo(results) called.")
    var data = results.data // Read carefully: data is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.
    getInitialTitanData(data); // Pass the data as an array of objects (as header is true).
}

// Get all of the required information from the tblStatsConfig table for later use.
// Create a function that returns what the user has selected from the table (see http://corelangs.com/js/progs/options.html for dropdown JavaScript).
function getInitialTitanData(data) {

    console.log("> Function [Titan Table]: getInitialTitanData(data) called.")

    // Define the count variables used within the loop.
    let dataSourceCount = 0;
    let uniqueSkillCount = 0;

    // Loop through the data array from the tblStatsConfig tab and match the table name var TitanTableName to find the relevant URL to get data from.
    for (let x = 0; x < data.length; x++) {
        //console.log("x = " + x + ", data[x].TableName = " + data[x].TableName); // Show the looping process.
        if (data[x].FullSelectionName == TitanTableName) {
            var selectedURL = data[x].URL;
            var lastUpdatedDate = data[x].LastUpdated;
            var sourceText = data[x].Source;
            var titanBoolean = data[x].TitanBoolean;
            //console.log("   Table name selected is " + data[x].TableName + " and Selected URL is: " + selectedURL);
        }

        // Within the loop, count up the number of data sources.
        //console.log("Row: " + x + " dataSourceCount = " + dataSourceCount + " and the data[x].DataSource is = " + data[x].DataSource);
        if (data[x].DataSource == "") { // Deal with if there is a blank field in the DataSource column.
            // Do nothing.
        } else if (data[x].DataSource == 0) { // Deal with if the DataSource column has a 0.
            // Do nothing.
        } else { // Deal with if the DataSource column has a 1.
            dataSourceCount = dataSourceCount + parseInt(data[x].DataSource); // Increment the dataSourceCount.
        }

        // Do the same for uniqueSkillCount.
        //console.log("Row: " + x + " uniqueSkillCount = " + uniqueSkillCount + " and the data[x].UniqueSkill is = " + data[x].UniqueSkill);
        if (data[x].UniqueSkill == "") { // Deal with if there is a blank field in the UniqueSkill column.
            // Do nothing.
        } else if (data[x].UniqueSkill == 0) { // Deal with if the UniqueSkill column has a 0.
            // Do nothing.
        } else { // Deal with if the UniqueSkill column has a 1.
            uniqueSkillCount = uniqueSkillCount + parseInt(data[x].UniqueSkill); // Increment the uniqueSkillCount.
        }
    }
    getPapaData1(selectedURL); // Call the function getPapaData to return the data from that table.
    updateAdditionalTableInformation(lastUpdatedDate, sourceText); // Updates the Titan table source, last updated text and additional link.
    applyTitanTableFormatting('titans-table', titanBoolean, toolTipBoolean); // Add a border below the 4th person if the table is flagged as a Titan table.
    updateStatSourcesCount(dataSourceCount, uniqueSkillCount); // Update the stat count in the summary text below the Titan table.
}

// Get the data of the selected stats by using the selected URL. 
function getPapaData1(selectedURL) {
    console.log("> Function [Titan Table]: getPapaData1(selectedURL) called.")
    Papa.parse(selectedURL, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: false, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        // Note, the above has been changed to false so that the Titans data is passed through as an array, not as an object.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showSelectedInfo1, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showSelectedInfo1(results) {
    console.log("> Function [Titan Table]: showSelectedInfo1(results) called.")
    var dataArray = results.data // Data comes through from results as an array of arrays. This is because the header setting on the above papa parse is set to false.
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    //console.log(">> Data through for showSelectedInfo1 is in an array format.") // Log a message about the data.
    //console.log(dataArray); // Log the data in the console.
    // Call the clearTable and createFullTable functions, passing the table selector on which element to act on.
    clearTable("table"); // Call the clearTable function to empty the table.
    createFullTable(dataArray, "table", toolTipBoolean); // Call the createFullTable function, passing the data from PapaParse.
    hideLoaderDots('titan-loader'); // Hide the loader dots. See LoaderDots.js.
    showDateAndSourceArea(); // Show the date and source area which is initially hidden.
}

// Updates the Titan Table source, last updated text and additional link.
function updateAdditionalTableInformation(lastUpdatedDate, sourceText) {
    console.log("> Function [Titan Table]: updateAdditionalStatsInformation(lastUpdatedDate, sourceText, additionalLink) called.")
    var element = document.getElementById("data-last-updated"); // Get the data-last-updated element by id.
    element.innerHTML = "Last Updated: " + lastUpdatedDate; // Update the text inside the element with the last updated date.
    element = document.getElementById("data-source"); // Get the data-source element by id.
    element.innerHTML = "Source: " + sourceText; // Update the text inside the element with the stats source.
}










// 2. Get the Titan Calculated Data onto the page.

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
function showTitanCalculatedInfo(results) {
    console.log("> Function [Titan Calculated Data]: showTitanCalculatedInfo(results) called.")
    var data = results.data // Read carefully: data is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.
    getTitanCalculatedData(data); // Pass the data as an array of objects (as header is true).
}

// Create a function that returns what the user has selected from the table (see http://corelangs.com/js/progs/options.html for dropdown JavaScript).
function getTitanCalculatedData(data) {
    console.log("> Function [Titan Calculated Data]: getTitanCalculatedData(data) called.")
    // Loop through the data array from the tblStatsConfig tab and match the table name var TitanCalculatedTableName to find the relevant URL to get data from.
    for (let x = 0; x < data.length; x++) {
        //console.log("x = " + x + ", data[x].TableName = " + data[x].TableName); // Show the looping process.
        if (data[x].FullSelectionName == TitanCalculatedTableName) {
            var selectedURL = data[x].URL;
            //console.log("   Table name selected is " + data[x].TableName + " and Selected URL is: " + selectedURL);
        }
    }
    getPapaData2(selectedURL); // Call the function getPapaData to return the data from that table.
}

// Get the data of the selected stats by using the selected URL. 
function getPapaData2(selectedURL) {
    console.log("> Function [Titan Calculated Data]: getPapaData2(selectedURL) called.")
    Papa.parse(selectedURL, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showSelectedInfo2, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showSelectedInfo2(results) {
    console.log("> Function [Titan Calculated Data]: showSelectedInfo2(results) called.")
    var dataObject = results.data // Data comes through from results as an object. This is because the header setting on the above papa parse is set to true.
    var toolTipBoolean = false; // Set the Titans Calculated Data table as not requiring tool tips.
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    //console.log(">> Data through for showSelectedInfo2 is in an object format.") // Log a message about the data.
    //console.log(dataObject); // Log the data in the console.

    // Call the clearTable and createFullTable functions, passing the id "titanFactorCalculatedTable" selector on which element to act on.
    clearTable("#titanFactorCalculatedTable"); // Call the clearTable function to empty the table.
    createFullTable(dataObject, "#titanFactorCalculatedTable", toolTipBoolean); // Call the createFullTable function, passing the data from PapaParse.
}







// 3. Get the Titan Factor Explained Data onto the page.

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
function showTitanFactorExplainedInfo(results) {
    console.log("> Function [Titan Factor Explained]: showTitanFactorExplainedInfo(results) called.")
    var data = results.data // Read carefully: data is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.
    getTitanFactorExplainedData(data); // Pass the data as an array of objects (as header is true).
}

// Create a function that returns what the user has selected from the table (see http://corelangs.com/js/progs/options.html for dropdown JavaScript).
function getTitanFactorExplainedData(data) {
    console.log("> Function [Titan Factor Explained]: getTitanFactorExplainedData(data) called.")
    // Loop through the data array from the tblStatsConfig tab and match the table name var TitanFactorExplainedTableName to find the relevant URL to get data from.
    for (let x = 0; x < data.length; x++) {
        //console.log("x = " + x + ", data[x].TableName = " + data[x].TableName); // Show the looping process.
        if (data[x].FullSelectionName == TitanFactorExplainedTableName) {
            var selectedURL = data[x].URL;
            //console.log("   Table name selected is " + data[x].TableName + " and Selected URL is: " + selectedURL);
        }
    }
    getPapaData3(selectedURL); // Call the function getPapaData to return the data from that table.
}

// Get the data of the selected stats by using the selected URL. 
function getPapaData3(selectedURL) {
    console.log("> Function [Titan Factor Explained]: getPapaData3(selectedURL) called.")
    Papa.parse(selectedURL, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showSelectedInfo3, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showSelectedInfo3(results) {
    console.log("> Function [Titan Factor Explained]: showSelectedInfo3(results) called.")
    var dataObject = results.data // Data comes through from results as an object. This is because the header setting on the above papa parse is set to true.
    var toolTipBoolean = false; // Set the Titans Calculated Data table as not requiring tool tips.
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    //console.log(">> Data through for showSelectedInfo3 is in an object format.") // Log a message about the data.
    //console.log(dataObject); // Log the data in the console.

    // Call the clearTable and createFullTable functions, passing the id "titanFactorExplainedTable" selector on which element to act on.
    clearTable("#titanFactorExplainedTable"); // Call the clearTable function to empty the table.
    createFullTable(dataObject, "#titanFactorExplainedTable", toolTipBoolean); // Call the createFullTable function, passing the data from PapaParse.
}










// Re-usable Table Functions.

// Clear the table to make space for new data.
function clearTable(selector) {
    console.log('%c' + '>> Re-usable Function: clearTable() called. Passed variables: selector = ' + selector, ' background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
    // https://stackoverflow.com/a/3955238/14290169
    const myNode = document.querySelector(selector); // Select the parent from which to delete all child elements from. Modified the selector to be dynamic and accept any type of selector. Previously, defining as "table" meant that it only works if the HTML page has only one table element.
    while (myNode.firstChild) { // Loop through all child elements.
        myNode.removeChild(myNode.lastChild); // Remove each child element.
    }
    //console.log("Function: Table Cleared.") // Log a final message to show the function is complete.
}

// Create the table by passing the data to the function.
function createFullTable(data, selector, toolTipBoolean) {
    console.log('%c' + '>> Re-usable Function: createFullTable(array, selector, toolTipBoolean) called. Passed variables: data = shown below, selector = ' + selector + ', toolTipBoolean = ' + toolTipBoolean, ' background-color: lightgreen; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
    console.log(data); // Log the passed data to the console.
    let table = document.querySelector(selector); // Select the parent element from which to build the table. Modified the selector to be dynamic and accept any type of selector. Previously, defining as "table" meant that it only works if the HTML page has only one table element.
    // If the toolTipBoolean is true, define header data as from the array, instead of the keys of an object.
    if (toolTipBoolean == true) { // Define the header data as from the array.
        //console.log("toolTipBoolean = " + toolTipBoolean + " therefore pass through data as the first row of data of the array."); // Log if the toolTipBoolean is in play or not.
        var headerdata = data[0]; // Get the header data from the first element of the array.
        //console.log("headerdata printed below:");
        //console.log(headerdata);
    } else { // Define the header data as the keys of the object.
        var headerdata = Object.keys(data[0]); // Create an array of the object headers from the array data received.
    }
    generateTableHead(table, headerdata, data, toolTipBoolean); // Call the generateTableHead function to create the table headers. Note that headerdata contains the headers only, array contains the full data.
    generateTable(table, data, toolTipBoolean); // Call the generateTable function to populate the rest of the table data.
    //console.log("Function: createFullTable finished.") // Log a final message to show the function is complete.
}

// Create a table of data from the received data.
// Back To The Basics: How To Generate a Table With JavaScript - https://www.valentinog.com/blog/html-table/

// Create the table head including the table headers.
function generateTableHead(table, headerdata, array, toolTipBoolean) {
    console.log('%c' + '>> Re-usable Function: generateTableHead(table, data) called. Passed variables: table = not shown, headerdata = shown below, array = shown below, toolTipBoolean = ' + toolTipBoolean, ' background-color: lightyellow; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
    console.log(headerdata); // Log the passed headerdata to the console.
    console.log(array); // Log the passed array to the console.
    let thead = table.createTHead(); // Create table headers.
    let row = thead.insertRow(); // Insert a row for the table headers.
    var counter = 0; // Define a counter for checking which column to apply stick-col rule to.
    for (let key of headerdata) { // Loop through each column header of the headerdata.
        let th = document.createElement("th"); // Create the th element.
        // If the toolTipBoolean is true, create the headers to also include the tool tips.
        if (toolTipBoolean == true) { // Define how to add the text depending on if toolTips are enabled for the table.
            //console.log("toolTipBoolean is true so adding tooltip.");
            var text = document.createTextNode(key); // Create a text node from the header data key to be apended.
            th.appendChild(text); // Append the text to the table header.
            // Skip the first column.
            if (counter == 0) { // If the counter = 0, it's the first column.
                // Do nothing.
            } else { // For all other columns, add the tool tip.
                th.classList.add("tooltip"); // Add the tooltip class to the th element (the container element).
                var toolTip = document.createElement("p"); // Create a paragraph element to be appended.
                toolTip.innerHTML = array[1][counter]; // Add the text of the second row, counter column to the new paragraph element.
                toolTip.classList.add("tooltiptext"); // Add the tooltiptext class to the new paragraph element.
                toolTip.classList.add("wordwrap"); // Add the wordwrap class to the new paragraph element.
                th.appendChild(toolTip); // Append the toolTip paragraph element as a child to the th element.
            }
        } else { // Add text the normal way.
            //console.log("toolTipBoolean is false so not adding tooltip.");
            var text = document.createTextNode(key); // Create a text node from the header data key to be apended.
            th.appendChild(text); // Append the text to the table header.
        }
        if (counter == 0) { // If the counter = 0, it's the first column.
            th.classList.add("sticky-col"); // Add the sticky-col class to the first column.
            th.classList.add("first-col"); // Add the first-col class to the first column.
            th.classList.add("first-cell"); // Add the first-cell class to the first column. This only applies to the top left cell of the table.
        } else {
            // Do nothing as not first column.
        }
        row.appendChild(th); // Append the new table header to the table.
        counter = counter + 1; // Increment the counter.
    }
    //console.log("Function: generateTableHead finished.") // Log a final message to show the function is complete.
}




// Create the rest of the table below head including all table rows.
function generateTable(table, data, toolTipBoolean) {
    console.log(">> Re-usable Function: generateTable(table, data) called.") // Log an initial message to show the function has been called.
    var rowCounter = 0; // Define a counter for checking which row to work with.
    var columnCounter;
    var testedValue;
    var dataType;
    let tbody = table.createTBody(); // Create table body - https://stackoverflow.com/a/6483237/14290169.
    for (let element of data) { // Loop through each row of the data.
        let row = tbody.insertRow(); // Insert a row for each bit of table data.
        columnCounter = 0; // Define a counter for checking which column to apply stick-col rule to.
        
        console.log("toolTipBoolean = " + toolTipBoolean);

        if (toolTipBoolean == true && rowCounter <= 1) { // Define how to add the text depending on if toolTips are enabled for the table.
            // Skip doing the first two rows for tables that have tooltips.
            console.log("toolTipBoolean is true so skipping row = " + rowCounter + ".");

        } else {

            for (key in element) { // Loop through each cell in each row.
                let cell = row.insertCell(); // Create the cell.
                let text = document.createTextNode(element[key]); // Add the cell text.
                cell.appendChild(text); // Append the text to the cell.
    
                // Loop through the columns to apply styling.
                if (columnCounter == 0) { // If the columnCounter = 0, it's the first column.
                    cell.classList.add("sticky-col"); // Add the sticky-col class to the first column.
                    cell.classList.add("first-col"); // Add the first-col class to the first column.
                } else {
                    // Do nothing as not first column.
                }
    
                // Get the data type of the value being added to the cell.
                //console.log("Data type of untested value '" + element[key] + "' is '" + dataType + "'.")
                testedValue = parseInt(element[key]); // First, parseInt the value.
                if (isNaN(testedValue) == true) { // If the parseInt returns "NaN", it's a string.
                    dataType = "string";
                    cell.classList.add("textleft"); // Add the textleft class to the cell.
                } else { // If not NaN, get the typeof of the value.
                    dataType = typeof testedValue;
                    cell.classList.add("textcenter"); // Add the textcenter class to the cell.
                }
                //console.log("Data type of tested value '" + element[key] + "' is '" + dataType + "'.")
                //console.log("-");
    
                columnCounter = columnCounter + 1; // Increment the columnCounter.
            }
        }
        rowCounter = rowCounter + 1; // Increment the rowCounter.
    }
    //console.log("Function: generateTable finished.") // Log a final message to show the function is complete.
}






// Additional functions.

// Add a border below the 4th person if the table is flagged as a Titan table.
function applyTitanTableFormatting(tableID, titanBoolean, toolTipBoolean) {
    if (titanBoolean == true) { // Check that the titanBoolean is true.
        //console.log("Adding titan4thRow class to the table as titanBoolean is " + titanBoolean);
        if (toolTipBoolean == true) { // Tool tip is required so add the special titan4thRowToolTip class that deals with the tool tip.
            document.getElementById(tableID).classList.add("titan4thRowToolTip"); // Get the titans-table table by id and add the titan4thRowToolTip class to the table.
        } else { // Tool tip isn't required so add the normal titan4thRow class.
            document.getElementById(tableID).classList.add("titan4thRow"); // Get the titans-table table by id and add the titan4thRow class to the table.
        }
    }
}

// Update the data source and unique skill count in the summary text below the Titan table.
function updateStatSourcesCount(dataSourceCount, uniqueSkillCount) {
    //console.log("dataSourceCount passed is " + dataSourceCount);
    dataSourceCount = parseInt(dataSourceCount);
    document.getElementById("data-source-count").innerHTML = dataSourceCount; // Get the id of the text to be updated and update the text inside the element with the data source count.
    document.getElementById("unique-skill-count").innerHTML = uniqueSkillCount; // Get the id of the text to be updated and update the text inside the element with the unique skill count.
}

// Write functions for the two buttons on the Titans page.

function toggleDataExplanationSection() {
    // Toggle between showing and hiding the data explanation section.
    var toggleButton = document.getElementById("toggleDataExplanationButton") // Get the toggle button by its ID.
    var element = document.getElementById("data-explanation-section") // Get the id of the section to be shown/hidden.
    if (toggleButton.innerText == "Show data details") {
        element.classList.remove("hidden"); // Remove the hidden class. https://www.w3schools.com/howto/howto_js_remove_class.asp.
        toggleButton.innerText = "Hide data details"; // Set the button text to change.
    } else {
        element.classList.add("hidden"); // Add the hidden class. https://www.w3schools.com/howto/howto_js_remove_class.asp.
        toggleButton.innerText = "Show data details"; // Set the button text to change.
    }
}

function toggleTitanFactorsExplainedSection() {
    // Toggle between showing and hiding the Titan factors explanation section.
    var toggleButton = document.getElementById("toggleTitanFactorsExplainedButton") // Get the toggle button by its ID.
    var element = document.getElementById("titan-factors-explained-section") // Get the id of the section to be shown/hidden.
    if (toggleButton.innerText == "Show factors explanation") {
        element.classList.remove("hidden"); // Remove the hidden class. https://www.w3schools.com/howto/howto_js_remove_class.asp.
        toggleButton.innerText = "Hide factors explanation"; // Set the button text to change.
    } else {
        element.classList.add("hidden"); // Add the hidden class. https://www.w3schools.com/howto/howto_js_remove_class.asp.
        toggleButton.innerText = "Show factors explanation"; // Set the button text to change.
    }
}

// Show the data and source area.
function showDateAndSourceArea() {
    document.getElementById("date-and-source-area").classList.remove("hidden"); // Remove the hidden class to the loader dots.
}