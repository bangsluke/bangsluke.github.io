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


// New Stats

// https://www.w3schools.com/howto/howto_js_cascading_dropdown.asp

// Define a statsObjects that defines the drop down values within the first drop down options on the page.
var statsObject = {
    "Strava Stats": {
        "HTML": ["Links", "Images", "Tables", "Lists"],
        "CSS": ["Borders", "Margins", "Backgrounds", "Float"],
        "JavaScript": ["Variables", "Operators", "Functions", "Conditions"]
    },
    "Brockham Badgers": {
        "Tables": ["Variables", "Strings", "Arrays"],
        "Stats": ["SELECT", "UPDATE", "DELETE"],
        "Total Stats": ["SELECT", "UPDATE", "DELETE"]
    },
    "Dorkinians": {
        "Overall Stats": ["SELECT", "UPDATE", "DELETE"],
        "2020/21": ["SELECT", "UPDATE", "DELETE"],
        "2019/20": ["SELECT", "UPDATE", "DELETE"],
        "2018/19": ["SELECT", "UPDATE", "DELETE"],
        "2017/18": ["SELECT", "UPDATE", "DELETE"],
        "2016/17": ["SELECT", "UPDATE", "DELETE"]
    },
    "Footgolf": {
        "Overall Footgolf": ["Variables", "Strings", "Arrays"],
        "Individual Footgolf Results": ["Aug 2018", "UPDATE", "DELETE"]
    },
    "COD": {
        "Total": ["Variables", "Strings", "Arrays"],
        "Multiplayer Kills": ["Aug 2018", "UPDATE", "DELETE"],
        "Multiplayer Score": ["Aug 2018", "UPDATE", "DELETE"],
        "Multiplayer Wins": ["Aug 2018", "UPDATE", "DELETE"],
        "Warzone Kills": ["Aug 2018", "UPDATE", "DELETE"],
        "Warzone Score": ["Aug 2018", "UPDATE", "DELETE"],
        "Warzone Wins": ["Aug 2018", "UPDATE", "DELETE"]
    },
    "Back-end": {
        "PHP": ["Variables", "Strings", "Arrays"],
        "SQL": ["SELECT", "UPDATE", "DELETE"]
    }
}
console.log(statsObject);




// Wait for the window to load and then run the init function below.
window.addEventListener('DOMContentLoaded', init)

// Initially call the data in from Google Sheets using Papa Parse.
function init() {
    console.log("NEW 0. init() called.")
    Papa.parse(publicSpreadsheetUrlCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}

// Populate the drop down options with values ready for the user to pick from.
window.onload = function () {
    console.log("NEW 1. function() called.")

    // Initially define the selection elements.
    var statsCategory = document.getElementById("stats-category-option"); // Get the stat category.
    var statsSelection = document.getElementById("stat-selection-option"); // Get the selected stat.
    var filterSelection = document.getElementById("stats-filter"); // Get the filter detail.

    // Loop through the statsObject .
    for (var x in statsObject) {
        statsCategory.options[statsCategory.options.length] = new Option(x, x);
    }

    // React when the user changes the statsCategory.
    statsCategory.onchange = function () {
        // Empty the stat selection dropdown.
        statsSelection.length = 1;
        // Display correct values in statsSelection.
        for (var y in statsObject[this.value]) {
            statsSelection.options[statsSelection.options.length] = new Option(y, y);
        }

        init();
    }

    // React when the user changes the statsSelection.
    statsSelection.onchange = function () {
        console.log("Stats Selection changed");
    }

    // React when the user changes the statsSelection.
    statsSelection.onchange = function () {
        //// Empty the filter selection dropdown.
        //filterSelection.length = 1;
        //// Display correct values in filterSelection.
        //for (var y in statsObject[this.value]) {
            //filterSelection.options[filterSelection.options.length] = new Option(y, y);
        //}

        init();
    }

    // React when the user changes the filterSelection.
    filterSelection.onchange = function () {
        console.log("Filter Selection changed");

        init();
    }
}





// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showInfo(results) {
    console.log("NEW 2. showInfo(results) called.")
    // Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
    var data = results.data // Read carefully: data is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    //console.log(data); // Log the data in the console.
    getStatSelection(data); // Pass the data as an array of objects (as header is true).
}

// Create a function that returns what the user has selected from the table (see http://corelangs.com/js/progs/options.html for dropdown JavaScript).
function getStatSelection(data) {
    console.log("NEW 3. getStatSelection(data) called.")
    
    // Category Selection.
    var dropdownCategorySelector = document.getElementById("stats-category-option"); // Select the "stats-category-option" element by id.
    //var categoryValue = dropdownCategorySelector.options[dropdownCategorySelector.selectedIndex].value; // Get the category selected.
    var categoryText = dropdownCategorySelector.options[dropdownCategorySelector.selectedIndex].text; // Get the corresponding value from the category selected.
    //console.log("Category Selection: Value = " + categoryValue + ", Text = " + categoryText); // Display what the category selection box is showing.
    console.log("Category Selection = " + categoryText); // Display what the category selection box is showing.
    // Check if the category selection box is empty or not (considered empty if the text is still "Select category").
    if (categoryText == "Select category"){
        return; // Early return from function.
    }
    
    // Stat Selection.
    var dropdownStatSelector = document.getElementById("stat-selection-option"); // Select the "stat-selection-option" element by id.
    //var selectionValue = dropdownStatSelector.options[dropdownStatSelector.selectedIndex].value; // Get the option selected.
    var selectionText = dropdownStatSelector.options[dropdownStatSelector.selectedIndex].text; // Get the corresponding value from the option selected.
    //console.log("Stat Selection: Value = " + selectionValue + ", Text = " + selectionText); // Display what the stat selection box is showing.
    console.log("Stat Selection = " + selectionText); // Display what the stat selection box is showing.
    // Check if the stat selection box is empty or not (considered empty if the text is still "Select stat").
    if (selectionText == "Select stat"){
        return; // Early return from function.
    }


    // Concat the category text and selection text to produce a fullSelectionName, used to look up the correct data set from the Group Data Page.
    var fullSelectionName = categoryText + " - " + selectionText;
    console.log("Full selection name = " + fullSelectionName); // Display what the full selection name is from the combined drop downs.

    // Loop through the data array from the tblStatsConfig tab and match the selected stat value to find the relevant URL to get data from.
    for (let x = 0; x < data.length; x++) {
        //console.log("x = " + x + ", data[x].TableName = " + data[x].TableName); // Show the looping process.
        if (data[x].FullSelectionName == fullSelectionName) {
            var selectedURL = data[x].URL;
            console.log("Table name selected is " + data[x].TableName + " and Selected URL is: " + selectedURL);
        }
    }
    getPapaData(selectedURL); // Call the function getPapaData to return the data from that table.
    updateStatsTitle(fullSelectionName); // Update the stats title text.


    // Populate the Filter Header dropdown from the received data.

    // Filter Header Selection.
    var dropdownFilterHeaderSelector = document.getElementById("stats-filter"); // Select the "stats-filter" element by id.
    var filterHeaderText = dropdownFilterHeaderSelector.options[dropdownFilterHeaderSelector.selectedIndex].text; // Get the corresponding value from the filter header selected.
    console.log("Filter Header Selection = " + filterHeaderText); // Display what the filter header selection box is showing.
    // Check if the filter header selection box is empty or not (considered empty if the text is still "Select header").
    if (filterHeaderText == "Select header"){
        return; // Early return from function.
    }








    
}

// Get the data of the selected stats by using the selected URL. 
function getPapaData(selectedURL) {
    console.log("NEW 4. getPapaData(selectedURL) called.")
    Papa.parse(selectedURL, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showSelectedInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function showSelectedInfo(results) {
    console.log("NEW 5. showSelectedInfo(results) called.")
    var data = results.data
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    console.log(data); // Log the data in the console.
    
    clearTable(); // Call the clearTable function to empty the table.

    var filterHeader = "Name";
    var filterValue = "Bangs";
    //data = filterData(data, filterHeader, filterValue);

    createFullTable(data); // Call the createFullTable function, passing the data from PapaParse.

    populateFilterHeaderDropDown(data) // Call the populateFilterHeaderDropDown function to populate the dropdown list for the Filter Header dropdown.

}



// Table Functions.

// Clear the table to make space for new data.
function clearTable() {
    console.log("Function: clearTable() called.") // Log an initial message to show the function has been called.
    // https://stackoverflow.com/a/3955238/14290169
    const myNode = document.querySelector("table"); // Select the parent from which to delete all child elements from. This selector only works if the HTML page has only one table element.
    while (myNode.firstChild) { // Loop through all child elements.
        myNode.removeChild(myNode.lastChild); // Remove each child element.
    }
    console.log("Function: Table Cleared.") // Log a final message to show the function is complete.
}

// Create the table by passing the data to the function.
function createFullTable(array) {
    console.log("Function: createFullTable(array) called.") // Log an initial message to show the function has been called.
    let table = document.querySelector("table"); // Select the parent element from which to build the table. This selector only works if the HTML page has only one table element.
    let data = Object.keys(array[0]); // Create a data variable from the array data received.
    generateTableHead(table, data); // Call the generateTableHead function to create the table headers.
    generateTable(table, array); // Call the generateTable function to populate the rest of the table data.
    console.log("Function: createFullTable finished.") // Log a final message to show the function is complete.
}

// Create a table of data from the received data.
// Back To The Basics: How To Generate a Table With JavaScript - https://www.valentinog.com/blog/html-table/

function generateTableHead(table, data) {
    console.log("Function: generateTableHead(table, data) called.") // Log an initial message to show the function has been called.
    let thead = table.createTHead(); // Create table headers.
    let row = thead.insertRow(); // Insert a row for the table headers.
    for (let key of data) { // Loop through each column header of the data.
        let th = document.createElement("th"); // Create the th element.
        let text = document.createTextNode(key); // Add the column header text.
        th.appendChild(text); // Append the new data to the table.
        row.appendChild(th); // Append the new data to the table.
    }
    console.log("Function: generateTableHead finished.") // Log a final message to show the function is complete.
}

function generateTable(table, data) {
    console.log("Function: generateTable(table, data) called.") // Log an initial message to show the function has been called.
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





// Update the title above the stats table with the selected stats name.
function updateStatsTitle(selectionText) {
    console.log("Function: updateStatsTitle(selectionText) called.")
    var element = document.getElementById("stats-title"); // Get the stats-title element by id.
    element.innerHTML = selectionText; // Update the text inside the element with the new stats name.
}



// Populate the filter header drop down list with the headers of the selected table data.
function populateFilterHeaderDropDown(array) { // NOTE: data comes in as an array of objects. Remember this!
    console.log("Function: populateFilterHeaderDropDown() called.")
    var filterSelection = document.getElementById("stats-filter"); // Get the filter detail.
    filterSelection.length = 1; // Empty the filter selection dropdown.
    let data = Object.keys(array[0]); // The Object.keys() method was introduced in ES6. It takes the object that you want to iterate over as an argument and returns an array containing all properties names (or keys). https://attacomsian.com/blog/javascript-iterate-objects
    console.log("Table headers = " + data); // Log the headers of the table.
    for (let key of data) { // Loop through each value of the data.
        //console.log(key); // Individually log each header.
        filterSelection.options[filterSelection.options.length] = new Option(key); // Populate the filterSelection dropdown with the header values.
    }
    console.log("Function: populateFilterHeaderDropDown() completed.")
}




// Filter the data if the user has selected a filter.
function filterData(data, filterHeader, filterValue) {
    //console.log("Filter the results - doing nothing yet.")
    console.log("Function: filterData(data, filterHeader, filterValue) called.")
    console.log("filterHeader = " + filterHeader + ", filterValue = " + filterValue);
    const filteredResults = data.filter(data => data.filterHeader == filterValue);
    console.log(filteredResults);
    showSelectedInfo(filteredResults);
}









// var ages = [32, 33, 16, 40];

// function checkAdult(age) {
//   return age >= 18;
// }

// function myFunction() {
//   document.getElementById("demo").innerHTML = ages.filter(checkAdult);
// }








// Old Stats

// Wait for the window to load and then run the init function below.
//window.addEventListener('DOMContentLoaded', oldinit)

// Initially call the data in from Google Sheets using Papa Parse.
function oldinit() {
    console.log("OLD 1. oldinit() called.")
    Papa.parse(publicSpreadsheetUrlCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function oldshowInfo(results) {
    console.log("OLD 2. oldshowInfo(results) called.")
    // Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
    var data = results.data // Read carefully: data is an array of rows. If header is false, rows are arrays; otherwise they are objects of data keyed by the field name.
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    //console.log(data); // Log the data in the console.
    oldgetStatSelection(data); // Pass the data as an array of objects (as header is true).
}

// Create a function that returns what the user has selected from the table (see http://corelangs.com/js/progs/options.html for dropdown JavaScript).
function oldgetStatSelection(data) {
    console.log("OLD 3. oldgetStatSelection(data) called.")
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
            //console.log(selectedURL);
        }
    }
    oldgetPapaData(selectedURL); // Call the function getPapaData to return the data from that table.
    updateStatsTitle(selectionText); // Update the stats title text.
}

// Get the data of the selected stats by using the selected URL. 
function oldgetPapaData(selectedURL) {
    console.log("OLD 4. oldgetPapaData(selectedURL) called.")
    Papa.parse(selectedURL, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: oldshowSelectedInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data.
function oldshowSelectedInfo(results) {
    console.log("OLD 5. oldshowSelectedInfo(results) called.")
    var data = results.data
    //alert("Successfully processed " + data.length + " rows!") // Provide an alert that the data has been processed. 
    console.log(data); // Log the data in the console.
    clearTable(); // Call the clearTable function to empty the table.

    filterData(data);

    createFullTable(data); // Call the createFullTable function, passing the data from PapaParse.
}











// End the console timer.
console.timeEnd();