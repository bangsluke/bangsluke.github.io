// jStatsPage.js JavaScript Functions

// Papa Parse (previously TableTop) Google Sheets Database scripts
// Papa Parse - https://www.papaparse.com/docs#csv-to-json
// How to use Papa Parse - https://dev.to/bornfightcompany/using-google-sheets-as-a-simple-database-with-papa-parse-2k7o
// TableTop - https://github.com/jsoma/tabletop

// Code

// Start the console timer.
console.time();


// https://www.w3schools.com/howto/howto_js_cascading_dropdown.asp

var statsObject = {
    "Strava Stats": {
        "HTML": ["Links", "Images", "Tables", "Lists"],
        "CSS": ["Borders", "Margins", "Backgrounds", "Float"],
        "JavaScript": ["Variables", "Operators", "Functions", "Conditions"]
    },
    "Back-end": {
        "PHP": ["Variables", "Strings", "Arrays"],
        "SQL": ["SELECT", "UPDATE", "DELETE"]
    }
}

console.log(statsObject);

window.onload = function () {

    // Initially define the selection elements.
    var statsSelection = document.getElementById("stats-option-new");
    var filterSelection = document.getElementById("stats-filter");

    // Loop through the statsObject 
    for (var x in statsObject) {
        statsSelection.options[statsSelection.options.length] = new Option(x, x);
    }

    // React when the user changes the statsSelection.
    statsSelection.onchange = function () {
        // Empty the filter selection dropdown.
        filterSelection.length = 1;
        // Display correct values in filterSelection.
        for (var y in statsObject[this.value]) {
            filterSelection.options[filterSelection.options.length] = new Option(y, y);
        }

        init();
    }

    // React when the user changes the filterSelection.
    filterSelection.onchange = function () {
        console.log("Filter changed");
    }
}





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
    var selectionText = dropdownSelector.options[dropdownSelector.selectedIndex].text; // Get the corresponding value from the option selected.
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
    updateStatsTitle(selectionText); // Update the stats title text.
}

// Get the data of the selected stats by using the selected URL. 
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
    clearTable(); // Call the clearTable function to empty the table.

    filterData(data);

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
        let row = table.insertRow(); // Insert a row for each bit of table data.
        for (key in element) { // Loop through each cell in each row.
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
    let table = document.querySelector("table"); // Select the parent element from which to build the table. This selector only works if the HTML page has only one table element.
    let data = Object.keys(array[0]); // Create a data variable from the array data received.
    generateTableHead(table, data); // Call the generateTableHead function to create the table headers.
    generateTable(table, array); // Call the generateTable function to populate the rest of the table data.
    console.log("createFullTable finished.") // Log a final message to show the function is complete.
}

// Clear the table to make space for new data.
function clearTable() {
    console.log("Clear Table called.") // Log an initial message to show the function has been called.
    // https://stackoverflow.com/a/3955238/14290169
    const myNode = document.querySelector("table"); // Select the parent from which to delete all child elements from. This selector only works if the HTML page has only one table element.
    while (myNode.firstChild) { // Loop through all child elements.
        myNode.removeChild(myNode.lastChild); // Remove each child element.
    }
    console.log("Table Cleared.") // Log a final message to show the function is complete.
}

// Update the title above the stats table with the selected stats name.
function updateStatsTitle(selectionText) {
    var element = document.getElementById("stats-title");
    element.innerHTML = selectionText;
}


function filterData(data) {
    console.log("Filter the results.")
    const filteredResults = data.filter(data => data.Season == "2015/16");
    console.log(filteredResults)
}

// var ages = [32, 33, 16, 40];

// function checkAdult(age) {
//   return age >= 18;
// }

// function myFunction() {
//   document.getElementById("demo").innerHTML = ages.filter(checkAdult);
// }








// End the console timer.
console.timeEnd();