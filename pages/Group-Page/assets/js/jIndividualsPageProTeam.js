// jIndividualsPageProTeam.js JavaScript Functions

// Papa Parse (previously TableTop) Google Sheets Database scripts
// Papa Parse - https://www.papaparse.com/docs#csv-to-json
// How to use Papa Parse - https://dev.to/bornfightcompany/using-google-sheets-as-a-simple-database-with-papa-parse-2k7o
// TableTop - https://github.com/jsoma/tabletop

// Code

// Start the console timer.
console.time();

// Define the location of the Google Sheet. Link to the tblStatsConfig first before selecting which stat to show.
var publicSpreadsheetUrlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTHooCS-JL0ScJZ5ugygKMhP5vY_3QknMdzaEkAw8hZ5OLIXASxByceszcjvEv7P9ecV1QMVrCv3ty3/pub?gid=114011454&single=true&output=csv';

// Add callable function "getProTeamTable" to be called in "jIndividualsPage.js". Initially call the data in from Google Sheets using Papa Parse.
function getProTeamTable() {
    Papa.parse(publicSpreadsheetUrlCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: selectProTable, // The callback to execute when parsing is complete. Once done, call the selectProTable function.
    })
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function selectProTable(results) {
    // Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
    var data = results.data // Read carefully: data is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    //console.log(data); // Log the data in the console.
    var proTeam = sessionStorage.getItem("proTeam"); // Retrieve the variable passed to session storage.
    console.log("getProTeamTable() called with team " + proTeam + " passed.") // Pass a message to show the value has been successfully retrieved.
    // Loop through data array and match the proTeam value to find the relevant table URL to get data from.
    for (let x = 0; x < data.length; x++) {
        //console.log("x = " + x + ", data[x].TableName = " + data[x].TableName); // Show the looping process.
        if (data[x].TableName == proTeam) {
            var selectedURL = data[x].URL;
            console.log(selectedURL);
        }
    }
    getPapaData(selectedURL); // Call the function getPapaData to return the data from that table.
}

// Get the data of the selected proTeam table by using the selected URL. 
function getPapaData(selectedURL) {
    Papa.parse(selectedURL, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showProTable, // The callback to execute when parsing is complete. Once done, call the showProTable function.
    })
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showProTable(results) {
    var data = results.data
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    console.log(data); // Log the data in the console.
    clearTable(); // Call the clearTable function to empty the table.
    createFullTable(data); // Call the createFullTable function, passing the data from PapaParse.
}

// Create a table of data from the received data.
// Back To The Basics: How To Generate a Table With JavaScript - https://www.valentinog.com/blog/html-table/

function generateTableHead(table, data) {
    console.log("generateTableHead called.") // Log an initial message to show the function has been called.
    let thead = table.createTHead(); // Create table headers.
    let row = thead.insertRow(); // Insert a row for the table headers.
    for (let key of data) { // Loop through each column header of the data.
        let th = document.createElement("th"); // Create the th element.
        let text = document.createTextNode(key); // Add the column header text.
        th.appendChild(text); // Append the new data to the table.
        row.appendChild(th); // Append the new data to the table.
    }
    console.log("generateTableHead finished.") // Log a final message to show the function is complete.
}

function generateTable(table, data) {
    console.log("generateTable called.") // Log an initial message to show the function has been called.
    
    
    for (let element of data) { // Loop through each row of the data.
        
        console.log("CHECK HERE - ROW - element " + element);
        
        let row = table.insertRow(); // Insert a row for each bit of table data.
        for (key in element) { // Loop through each cell in each row.
            console.log("CHECK HERE - ROW - element[key] " + element[key]);
            let cell = row.insertCell(); // Create the cell.
            let text = document.createTextNode(element[key]); // Add the cell text.
            cell.appendChild(text); // Append the text to the cell.
        }
    }
    console.log("generateTable finished.") // Log a final message to show the function is complete.
}

// Create the table by passing the data to the function.
function createFullTable(array) {
    console.log("createFullTable called.") // Log an initial message to show the function has been called.
    let table = document.querySelector("#pro-team-table"); // Select the parent element from which to build the table. Use the id "#pro-team-table".
    let data = Object.keys(array[0]); // Create a data variable from the array data received.
    generateTableHead(table, data); // Call the generateTableHead function to create the table headers.
    generateTable(table, array); // Call the generateTable function to populate the rest of the table data.
    console.log("createFullTable finished.") // Log a final message to show the function is complete.
}

// Clear the table to make space for new data.
function clearTable() {
    console.log("Clear Table called.") // Log an initial message to show the function has been called.
    // https://stackoverflow.com/a/3955238/14290169
    const myNode = document.querySelector("#pro-team-table"); // Select the parent from which to delete all child elements from. Use the id "#pro-team-table".
    while (myNode.firstChild) { // Loop through all child elements.
        myNode.removeChild(myNode.lastChild); // Remove each child element.
    }
    console.log("Table Cleared.") // Log a final message to show the function is complete.
}

// End the console timer.
console.timeEnd();