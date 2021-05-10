// jTitanPage.js JavaScript Functions

// Papa Parse (previously TableTop) Google Sheets Database scripts
// Papa Parse - https://www.papaparse.com/docs#csv-to-json
// How to use Papa Parse - https://dev.to/bornfightcompany/using-google-sheets-as-a-simple-database-with-papa-parse-2k7o
// TableTop - https://github.com/jsoma/tabletop

// Code

// * Process Explained

// To load the table data across three different tables on the Titans tab, the JavaScript file runs the same Papa Parse process three times, each with a different selector.
// Firstly, an init function calls all three sub processes.
// Each sub process starts with a papa parse, shows and gets the data, re-papa parses the data to get the right data to display and then builds the table on the page.
// 1. Is the top main Titan table.
// 2. Is the Titan Calculated data table.
// 3. Is the Titan Factor Explained table.

// Start the console timer.
console.time();

// Publically define the location of the Google Sheet. Link to the tblStatsConfig first before selecting which stat to show.
var publicSpreadsheetUrlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTHooCS-JL0ScJZ5ugygKMhP5vY_3QknMdzaEkAw8hZ5OLIXASxByceszcjvEv7P9ecV1QMVrCv3ty3/pub?gid=114011454&single=true&output=csv';

// Log the file location.
console.log("   The published spreadsheet is located at " + publicSpreadsheetUrlCSV); // Log the file location.

// Define the Titan table names to be loaded in. "Titan - Titan" is the lookup in the stats config table of the Google Sheets file.
var TitanTableName = "Titan - Titan";
var TitanCalculatedTableName = "Titan - Factor Calculated"
var TitanFactorExplainedTableName = "Titan - Explained"

// Wait for the window to load and then run the init function below. DOMContentLoaded details - (https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)
window.addEventListener('DOMContentLoaded', init)

// Initially add the Titan table.
function init() {

    // Log the function call to the console.
    console.log("0. init() called. Code started for each of the three sub processes.")

    // Log the function call to the console.
    console.log("1. Titan table loaded and populated with values.")

    Papa.parse(publicSpreadsheetUrlCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showInitialTitanInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })

    // Log the function call to the console.
    console.log("2. Titan Calculated table loaded and populated with values.")

    Papa.parse(publicSpreadsheetUrlCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showTitanCalculatedInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })

    // Log the function call to the console.
    console.log("3. Initial Factor Explained table loaded and populated with values.")

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
    console.log("Function: showInitialTitanInfo(results) called.")
    var data = results.data // Read carefully: data is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.
    getInitialTitanData(data); // Pass the data as an array of objects (as header is true).
}

// Create a function that returns what the user has selected from the table (see http://corelangs.com/js/progs/options.html for dropdown JavaScript).
function getInitialTitanData(data) {

    console.log("Function: getInitialTitanData(data) called.")

    // Loop through the data array from the tblStatsConfig tab and match the table name var TitanTableName to find the relevant URL to get data from.
    for (let x = 0; x < data.length; x++) {
        //console.log("x = " + x + ", data[x].TableName = " + data[x].TableName); // Show the looping process.
        if (data[x].FullSelectionName == TitanTableName) {
            var selectedURL = data[x].URL;
            var lastUpdatedDate = data[x].LastUpdated;
            var sourceText = data[x].Source;
            console.log("   Table name selected is " + data[x].TableName + " and Selected URL is: " + selectedURL);
        }
    }
    getPapaData1(selectedURL); // Call the function getPapaData to return the data from that table.
    updateAdditionalTableInformation(lastUpdatedDate, sourceText); // Updates the Titan table source, last updated text and additional link.
}

// Get the data of the selected stats by using the selected URL. 
function getPapaData1(selectedURL) {
    console.log("Function: getPapaData1(selectedURL) called.")
    Papa.parse(selectedURL, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showSelectedInfo1, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showSelectedInfo1(results) {
    console.log("Function: showSelectedInfo1(results) called.")
    var data = results.data
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    //console.log(data); // Log the data in the console.
    
    // Call the clearTable and createFullTable functions, passing the table selector on which element to act on.
    clearTable("table"); // Call the clearTable function to empty the table.
    createFullTable(data, "table"); // Call the createFullTable function, passing the data from PapaParse.
}

// Updates the Titan Table source, last updated text and additional link.
function updateAdditionalTableInformation(lastUpdatedDate, sourceText) {
    console.log("Function: updateAdditionalStatsInformation(lastUpdatedDate, sourceText, additionalLink) called.")
    var element = document.getElementById("stats-last-updated"); // Get the stats-last-updated element by id.
    element.innerHTML = "Last Updated: " + lastUpdatedDate; // Update the text inside the element with the last updated date.
    element = document.getElementById("stats-source"); // Get the stats-source element by id.
    element.innerHTML = "Source: " + sourceText; // Update the text inside the element with the stats source.
}










// 2. Get the Titan Calculated Data onto the page.

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
function showTitanCalculatedInfo(results) {
    console.log("Function: showTitanCalculatedInfo(results) called.")
    var data = results.data // Read carefully: data is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.
    getTitanCalculatedData(data); // Pass the data as an array of objects (as header is true).
}

// Create a function that returns what the user has selected from the table (see http://corelangs.com/js/progs/options.html for dropdown JavaScript).
function getTitanCalculatedData(data) {

    console.log("Function: getTitanCalculatedData(data) called.")

    // Loop through the data array from the tblStatsConfig tab and match the table name var TitanCalculatedTableName to find the relevant URL to get data from.
    for (let x = 0; x < data.length; x++) {
        //console.log("x = " + x + ", data[x].TableName = " + data[x].TableName); // Show the looping process.
        if (data[x].FullSelectionName == TitanCalculatedTableName) {
            var selectedURL = data[x].URL;
            console.log("   Table name selected is " + data[x].TableName + " and Selected URL is: " + selectedURL);
        }
    }
    getPapaData2(selectedURL); // Call the function getPapaData to return the data from that table.
}

// Get the data of the selected stats by using the selected URL. 
function getPapaData2(selectedURL) {
    console.log("Function: getPapaData2(selectedURL) called.")
    Papa.parse(selectedURL, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showSelectedInfo2, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showSelectedInfo2(results) {
    console.log("Function: showSelectedInfo2(results) called.")
    var data = results.data
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    //console.log(data); // Log the data in the console.
    
    // Call the clearTable and createFullTable functions, passing the class "titanFactorCalculatedTable" selector on which element to act on.
    clearTable(".titanFactorCalculatedTable"); // Call the clearTable function to empty the table.
    createFullTable(data, ".titanFactorCalculatedTable"); // Call the createFullTable function, passing the data from PapaParse.
}







// 3. Get the Titan Factor Explained Data onto the page.

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
function showTitanFactorExplainedInfo(results) {
    console.log("Function: showTitanFactorExplainedInfo(results) called.")
    var data = results.data // Read carefully: data is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.
    getTitanFactorExplainedData(data); // Pass the data as an array of objects (as header is true).
}

// Create a function that returns what the user has selected from the table (see http://corelangs.com/js/progs/options.html for dropdown JavaScript).
function getTitanFactorExplainedData(data) {

    console.log("Function: getTitanFactorExplainedData(data) called.")

    // Loop through the data array from the tblStatsConfig tab and match the table name var TitanFactorExplainedTableName to find the relevant URL to get data from.
    for (let x = 0; x < data.length; x++) {
        //console.log("x = " + x + ", data[x].TableName = " + data[x].TableName); // Show the looping process.
        if (data[x].FullSelectionName == TitanFactorExplainedTableName) {
            var selectedURL = data[x].URL;
            console.log("   Table name selected is " + data[x].TableName + " and Selected URL is: " + selectedURL);
        }
    }
    getPapaData3(selectedURL); // Call the function getPapaData to return the data from that table.
}

// Get the data of the selected stats by using the selected URL. 
function getPapaData3(selectedURL) {
    console.log("Function: getPapaData3(selectedURL) called.")
    Papa.parse(selectedURL, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showSelectedInfo3, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showSelectedInfo3(results) {
    console.log("Function: showSelectedInfo3(results) called.")
    var data = results.data
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    //console.log(data); // Log the data in the console.
    
    // Call the clearTable and createFullTable functions, passing the class "titanFactorExplainedTable" selector on which element to act on.
    clearTable(".titanFactorExplainedTable"); // Call the clearTable function to empty the table.
    createFullTable(data, ".titanFactorExplainedTable"); // Call the createFullTable function, passing the data from PapaParse.
}










// Re-usable Table Functions.

// Clear the table to make space for new data.
function clearTable(selector) {
    console.log("Re-usable Function: clearTable() called.") // Log an initial message to show the function has been called.
    // https://stackoverflow.com/a/3955238/14290169
    const myNode = document.querySelector(selector); // Select the parent from which to delete all child elements from. Modified the selector to be dynamic and accept any type of selector. Previously, defining as "table" meant that it only works if the HTML page has only one table element.
    while (myNode.firstChild) { // Loop through all child elements.
        myNode.removeChild(myNode.lastChild); // Remove each child element.
    }
    console.log("Function: Table Cleared.") // Log a final message to show the function is complete.
}

// Create the table by passing the data to the function.
function createFullTable(array, selector) {
    console.log("Re-usable Function: createFullTable(array) called.") // Log an initial message to show the function has been called.
    let table = document.querySelector(selector); // Select the parent element from which to build the table. Modified the selector to be dynamic and accept any type of selector. Previously, defining as "table" meant that it only works if the HTML page has only one table element.
    let data = Object.keys(array[0]); // Create a data variable from the array data received.
    generateTableHead(table, data); // Call the generateTableHead function to create the table headers.
    generateTable(table, array); // Call the generateTable function to populate the rest of the table data.
    console.log("Function: createFullTable finished.") // Log a final message to show the function is complete.
}

// Create a table of data from the received data.
// Back To The Basics: How To Generate a Table With JavaScript - https://www.valentinog.com/blog/html-table/

function generateTableHead(table, data) {
    console.log("Re-usable Function: generateTableHead(table, data) called.") // Log an initial message to show the function has been called.
    let thead = table.createTHead(); // Create table headers.
    let row = thead.insertRow(); // Insert a row for the table headers.
    for (let key of data) { // Loop through each column header of the data.
        let th = document.createElement("th"); // Create the th element.
        let text = document.createTextNode(key); // Add the column header text.
        th.appendChild(text); // Append the new data to the table.
        th.classList.add("thTitanHeader"); // Add the header class to the newly created header element. https://www.javatpoint.com/how-to-add-a-class-to-an-element-using-javascript.
        row.appendChild(th); // Append the new data to the table.
    }
    console.log("Function: generateTableHead finished.") // Log a final message to show the function is complete.
}

function generateTable(table, data) {
    console.log("Re-usable Function: generateTable(table, data) called.") // Log an initial message to show the function has been called.
    for (let element of data) { // Loop through each row of the data.
        let row = table.insertRow(); // Insert a row for each bit of table data.
        for (key in element) { // Loop through each cell in each row.
            let cell = row.insertCell(); // Create the cell.
            let text = document.createTextNode(element[key]); // Add the cell text.
            cell.appendChild(text); // Append the text to the cell.
        }
    }
    console.log("Function: generateTable finished.") // Log a final message to show the function is complete.
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
    if (toggleButton.innerText == "Show Titan Factors explanation") {
        element.classList.remove("hidden"); // Remove the hidden class. https://www.w3schools.com/howto/howto_js_remove_class.asp.
        toggleButton.innerText = "Hide Titan Factors explanation"; // Set the button text to change.
    } else {
        element.classList.add("hidden"); // Add the hidden class. https://www.w3schools.com/howto/howto_js_remove_class.asp.
        toggleButton.innerText = "Show Titan Factors explanation"; // Set the button text to change.
    }
}






// End the console timer.
console.timeEnd();