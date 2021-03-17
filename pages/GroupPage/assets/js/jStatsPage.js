// jStatsPage.js JavaScript Functions

// TableTop Google Sheets Database scripts
// https://medium.com/@jaejohns/how-to-use-google-sheets-as-your-website-database-b0f2f13d0396
// https://github.com/jsoma/tabletop

// Start the console timer.
console.time();

// Define the location of the Google Sheet.
var publicSpreadsheetUrlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTHooCS-JL0ScJZ5ugygKMhP5vY_3QknMdzaEkAw8hZ5OLIXASxByceszcjvEv7P9ecV1QMVrCv3ty3/pub?output=csv';

console.log("The published spreadsheet is located at " + publicSpreadsheetUrlCSV); // Log the file location.

// Wait for the window to load and then run the init function below.
window.addEventListener('DOMContentLoaded', init)

// Initially call the data using TableTop.
function init() {
    Papa.parse(publicSpreadsheetUrlCSV, {
        download: true,
        header: true,
        simpleSheet: false,
        callback: showInfoDetailed,
        complete: showInfo, // Once done, call the showInfo function.
        //complete: showInfoDetailed
        // complete: function(results) {
        //     var data = results.data
        //     console.log(data)
        //     console.log(tabletop.sheets("tblCOD"));
        //   }
        //callback: createFullTable(results) // Alternatively could use the callback property.
    })
}

function showInfo(results) {
    var data = results.data
    // Data comes through as a simple array since simpleSheet is turned on
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    console.log(data); // Log the data in the console.
    createFullTable(data); // Call the createFullTable function, passing the data from TableTop.
}

// https://github.com/jsoma/tabletop#tabletop-object-attributes-and-methods
function showInfoDetailed(data, tabletop) {
    //var data = results.data
    //console.log(data); // Log the data in the console.
    alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    console.log(tabletop.sheets("tblCOD")); // Log the data in the console.
    //createFullTable(data); // Call the createFullTable function, passing the data from TableTop.
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

function createFullTable(array) {
    let table = document.querySelector("table");
    let data = Object.keys(array[0]);
    generateTableHead(table, data);
    generateTable(table, array);
}


// Create a function that returns what the user has selected from the table.
// http://corelangs.com/js/progs/options.html
function getStatSelection() {
    var dropdownSelector = document.getElementById("stats-option");
    var selectionValue = dropdownSelector.options[dropdownSelector.selectedIndex].value;
    var selectionText = dropdownSelector.options[dropdownSelector.selectedIndex].text;
    alert("Selected Item: '" + selectionText + "', Value: '" + selectionValue + "'");
    showInfo;
}


// End the console timer.
console.timeEnd();