// jStatsPage.js JavaScript Functions

// Papa Parse (previously TableTop) Google Sheets Database scripts
// Papa Parse - https://www.papaparse.com/docs#csv-to-json
// How to use Papa Parse - https://dev.to/bornfightcompany/using-google-sheets-as-a-simple-database-with-papa-parse-2k7o
// TableTop - https://github.com/jsoma/tabletop

// Code

// Start the console timer.
console.time();

// Define the location of the Google Sheet. Link to the tblStatsConfig first before selecting which stat to show.
var publicSpreadsheetUrlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTHooCS-JL0ScJZ5ugygKMhP5vY_3QknMdzaEkAw8hZ5OLIXASxByceszcjvEv7P9ecV1QMVrCv3ty3/pub?gid=114011454&single=true&output=csv';

// Log the file location.
console.log("The published spreadsheet is located at " + publicSpreadsheetUrlCSV); // Log the file location.

// Wait for the window to load and then run the init function below.
window.addEventListener('DOMContentLoaded', init)

// Initially call the data in from Google Sheets using Papa Parse.
function init() {
    Papa.parse(publicSpreadsheetUrlCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showInfo(results) {
    // Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
    var data = results.data // Read carefully: data is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    //console.log(data); // Log the data in the console.
    getStatSelection(data); // Pass the data as an array of objects (as header is true).
}

// Create a function that returns what the user has selected from the table (see http://corelangs.com/js/progs/options.html for dropdown JavaScript).
function getStatSelection(data) {
    var dropdownSelector = document.getElementById("stats-option"); // Select the "stats-option" element by id.
    var selectionValue = dropdownSelector.options[dropdownSelector.selectedIndex].value; // Get the option selected.
    //var selectionText = dropdownSelector.options[dropdownSelector.selectedIndex].text; // Get the corresponding value from the option selected.
    //alert("Selected Item: '" + selectionText + "', Value: '" + selectionValue + "'"); // Display an alert showing what the user has selected.
    //console.log("Selected value: " + selectionValue) // Log what the user has selected.
    //console.log(data.length); // Log the data array length.
    // Loop through data array and match the selected stat value to find the relevant URL to get data from.
    for (let x = 0; x < data.length; x++) {
        //console.log("x = " + x + ", data[x].TableName = " + data[x].TableName); // Show the looping process.
        if (data[x].TableName == selectionValue) {
            var selectedURL = data[x].URL;
            console.log(selectedURL);
        }
    }
    getPapaData(selectedURL); // Call the function getPapaData to return the data from that table.
}

function getPapaData(selectedURL) {
    Papa.parse(selectedURL, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showSelectedInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}


// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showSelectedInfo(results) {
    var data = results.data
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    console.log(data); // Log the data in the console.
    clearTable();
    createFullTable(data); // Call the createFullTable function, passing the data from TableTop.
}



// Create a table of data from the received data.
// Back To The Basics: How To Generate a Table With JavaScript - https://www.valentinog.com/blog/html-table/

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

// Create the table by passing the data to the function.
function createFullTable(array) {
    let table = document.querySelector("table");
    let data = Object.keys(array[0]);
    generateTableHead(table, data);
    generateTable(table, array);
}

// Clear the table to make space for new data.
function clearTable() {
    // https://stackoverflow.com/a/3955238/14290169
    const myNode = document.querySelector("table"); // Select the parent from which to delete all child elements from.
    while (myNode.firstChild) { // Loop through all child elements.
        myNode.removeChild(myNode.lastChild); // Remove each child element.
    }
}





// End the console timer.
console.timeEnd();