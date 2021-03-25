// jIndividualsPage.js JavaScript Functions

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

// Initially call the data in from Google Sheets tab "IndividualsPage" using Papa Parse.
function init() {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vTHooCS-JL0ScJZ5ugygKMhP5vY_3QknMdzaEkAw8hZ5OLIXASxByceszcjvEv7P9ecV1QMVrCv3ty3/pub?gid=1451461694&single=true&output=csv", {
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
    //console.log(data); // Log the data in the console.
    getData(data); // Pass the data to the getData function to be processed.
}

// Get the data out into usable values to be passed to the HTML elements.
function getData(data) {
    
    // Loop through data array and match the user to return the row in the array of objects that relates to the user.
    for (let x = 0; x < data.length; x++) {
        //console.log("x = " + x + ", data[x].fullName = " + data[x].fullName); // Show the looping process.
        if (data[x].User == "Luke") {
            var foundRow = x; // The found row containing the correct user object.
        }
        
    }
    
    // Modify HTML elements with the found data.
    document.getElementById("profilePicture").src = data[foundRow].profilePictureURL;
    document.getElementById("fullName").innerHTML = data[foundRow].fullName;
    document.getElementById("height").innerHTML = data[foundRow].height;
    document.getElementById("weight").innerHTML = data[foundRow].weight;



}



// End the console timer.
console.timeEnd();