// jGroupHomePage.js JavaScript Functions

// Group Home Page scripts

// Publically define the location of the Google Sheet Quotes CSV.
var quotesUrlCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTHooCS-JL0ScJZ5ugygKMhP5vY_3QknMdzaEkAw8hZ5OLIXASxByceszcjvEv7P9ecV1QMVrCv3ty3/pub?gid=210059862&single=true&output=csv';

// Wait for the window to load and then run the init function below.
window.addEventListener('DOMContentLoaded', init)

// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {

    getSiteTheme(); // Update the site theme to what the user has selected.
    var selectedUserName = sessionStorage.getItem("selectedUserName"); // Retrieve the variable passed to session storage.
    console.log("selectedUserName = " + selectedUserName);

    getPapaData(quotesUrlCSV); // Call the getPapaData function to pull in the quote information.
}

// Get the data of the selected stats by using the selected URL. 
function getPapaData(selectedURL) {
    console.log("Function: getPapaData(selectedURL) called.")
    Papa.parse(selectedURL, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: false, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showSelectedInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showSelectedInfo(results) {
    console.log("Function: showSelectedInfo(results) called.")
    var data = results.data
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    console.log(data); // Log the data in the console.
    var quoteCount = data.length; // Define the number of quotes.
    var randomQuoteNumber = Math.floor(Math.random() * quoteCount); // Randomise the quote from the list of possible quotes. (https://www.w3schools.com/JS/js_random.asp).
    document.getElementById("ticker-text").innerHTML = data[randomQuoteNumber]; // Modify the text inside the element.

}