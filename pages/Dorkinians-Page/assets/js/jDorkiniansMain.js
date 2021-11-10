// jDorkiniansMain.js JavaScript Functions

// Papa Parse (previously TableTop) Google Sheets Database scripts
// Papa Parse - https://www.papaparse.com/docs#csv-to-json
// How to use Papa Parse - https://dev.to/bornfightcompany/using-google-sheets-as-a-simple-database-with-papa-parse-2k7o
// TableTop - https://github.com/jsoma/tabletop

// * Process Explained

// Firstly, there are three arrays of data to load in;
    // 1. The full club fixtures list - fixturesListSheetURLCSV
    // 2. The all stats table - displayDetailsSheetCSV
    // 3. The all time player stats - allTimeStatsSheetCSV
// TBC
// To load the table data across three different tables on the three Dorkinians tabs, the JavaScript file runs the same Papa Parse process three times, each with a different selector.
// Firstly, an init function calls all three sub processes.
// An event listener hides the loader dots when images
// First section loads in the Stats tab data.
// Second section loads in the Results tab data.
// Third section loads in the Fixtures tab data.

// Code

console.time(); // Start the console timer.

// Ready Events
// First add a DOMContentLoaded event to fire when the HTML DOM is in place and then add a load event listener for when all images and other resources are loaded.

window.addEventListener('DOMContentLoaded', init) // Wait for the window to load and then run the init function below.

// Add a load event listener - which completes after the init() function below - (https://eager.io/blog/how-to-decide-when-your-code-should-run/).
window.addEventListener('load', function () {
    console.log('%c' + '> Dorkinians page images and other resources all loaded.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Provide an initial load message.
    //hideLoaderDots('loader-div'); // Hide the loader dots. See LoaderDots.js.    
    //showLoaderDots('titan-loader'); // Show the loader dots. See LoaderDots.js. 
    console.timeEnd(); // End the console timer.
});

// Initiation Function

// Publically define the location of the Google Sheets.

// Fixtures List Tab
const fixturesListSheetURLCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=1820717347&single=true&output=csv';

// Match Details Tab
//var matchDetailsSheetURLCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=1016205165&single=true&output=csv';

// Display Details Tab
const displayDetailsSheetCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=628628597&single=true&output=csv';

// All Time Stats Tab
const allTimeStatsSheetCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=1722492164&single=true&output=csv';


// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {
    console.log('%c' + '> Dorkinians page DOM content loaded.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Provide an initial load message.

    // Step 0.
    console.log('%c' + '> 0. init() called. Code started for each of the three sub processes.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.

    // Step 1. All Stats tab data.
    console.log('%c' + '> 1. All Stats tab data being loaded in.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.
    // Papa.parse(matchDetailsSheetURLCSV, {
    Papa.parse(displayDetailsSheetCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showAllStatsTabInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })

    // Step 2. Results tab data.
    console.log('%c' + '> 2. Results tab data being loaded in.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.
    Papa.parse(fixturesListSheetURLCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showResultsTabInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })

    // Step 3. Fixtures tab data.
    console.log('%c' + '> 3. Fixtures tab data being loaded in.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.
    // Papa.parse(publicSpreadsheetUrlCSV, {
    //     download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    //     header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    //     fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    //     complete: showTitanFactorExplainedInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    // })
}








// Tab Functions

// 1. Club/Team Stats Tab

// 1.1. Club/Team Stats tab data.

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
function showResultsTabInfo(results) {
    console.log("> Function [Results Table]: showResultsTabInfo(results) called.")

    // Process the original array of objects received.
    var dataArrayOfObjects = results.data // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.
    //console.log(dataArrayOfObjects); // Log the received array of objects.
    //var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
    //console.log("Original Length = " + objectLength); // Log the original length.

    // Filter the array of objects down. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
    // Season selection.
    var seasonValueDropdown = document.getElementById("club-stats-season-selection-dropdown"); // Get the season selected dropdown.
    var seasonValue = seasonValueDropdown.options[seasonValueDropdown.selectedIndex].text; // Get the season selected. (https://stackoverflow.com/a/8549358/14290169).
    //console.log("seasonValue = " + seasonValue);
    // Team selection.
    var teamValueDropdown = document.getElementById("club-stats-team-selection-dropdown"); // Get the team selected dropdown.
    var teamValue = teamValueDropdown.options[teamValueDropdown.selectedIndex].text; // Get the team selected. (https://stackoverflow.com/a/8549358/14290169).
    //console.log("teamValue = " + teamValue);

    // Filter for all selections.
    // Re-use the re-usable function but don't pass all arguments.
    const filteredArrayOfObjects = multiFilterArrayOfObjects(dataArrayOfObjects, "SEASON", seasonValue, "PLAYER NAME", "Player", "TEAM", teamValue, "LOCATION", "Location"); // Call the created filterArrayOfObjects function.

    //console.log(filteredArrayOfObjects); // Log the filtered array of objects.
    //objectLength = filteredArrayOfObjects.length; // Get the new length of the array.
    //console.log("New Length = " + objectLength); // Log the original length.

    // Call the clearTable and createFullTable functions, passing the table selector on which element to act on.
    clearTable("#results-table"); // Call the clearTable function to empty the table.
    createFullTable(filteredArrayOfObjects, "#results-table", "TRUE", "object"); // Call the createFullTable function, passing the data from PapaParse.
    hideLoaderDots('results-loader-div'); // Hide the loader dots. See LoaderDots.js.
}

// 1.2. Club Stats Results tab data refresh.

// Create a function that is called when the user changes the team dropdown. This function is called from the HTML select elements.
function showAllResultsTabUpdatedInfo() {
    console.log("> Function [Stats Table]: showAllResultsTabUpdatedInfo(results) called.")

    Papa.parse(resultsSheetURLCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showResultsTabInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}





// 2. Player Stats Tab





// 3. All Stats Tab

// 3.1. All Stats tab data.

// Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
function showAllStatsTabInfo(results) {
    console.log("> Function [Stats Table]: showAllStatsTabInfo(results) called.")

    // Process the original array of objects received.
    var dataArrayOfObjects = results.data // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.
    //console.log(dataArrayOfObjects); // Log the received array of objects.
    //var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
    //console.log("Original Length = " + objectLength); // Log the original length.

    // Filter the array of objects down. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f

    // Old code. // First filter for the player name.
    //const filteredArrayOfObjects = filterArrayOfObjects(dataArrayOfObjects, "PLAYER NAME", "Henry Warne"); // Call the created filterArrayOfObjects function.

    // Get the selections from the selection boxes.
    // Season selection.
    var seasonValueDropdown = document.getElementById("season-selection-dropdown"); // Get the season selected dropdown.
    var seasonValue = seasonValueDropdown.options[seasonValueDropdown.selectedIndex].text; // Get the season selected. (https://stackoverflow.com/a/8549358/14290169).
    //console.log("seasonValue = " + seasonValue);
    // Player selection.
    var playerValueDropdown = document.getElementById("player-selection-dropdown"); // Get the player selected dropdown.
    var playerValue = playerValueDropdown.options[playerValueDropdown.selectedIndex].text; // Get the player selected. (https://stackoverflow.com/a/8549358/14290169).
    //console.log("playerValue = " + playerValue);
    // Team selection.
    var teamValueDropdown = document.getElementById("team-selection-dropdown"); // Get the team selected dropdown.
    var teamValue = teamValueDropdown.options[teamValueDropdown.selectedIndex].text; // Get the team selected. (https://stackoverflow.com/a/8549358/14290169).
    //console.log("teamValue = " + teamValue);
    // Location selection.
    var locationValueDropdown = document.getElementById("location-selection-dropdown"); // Get the location selected dropdown.
    var locationValue = locationValueDropdown.options[locationValueDropdown.selectedIndex].text; // Get the location selected. (https://stackoverflow.com/a/8549358/14290169).
    //console.log("locationValue = " + locationValue);

    // Filter for all selections.
    const filteredArrayOfObjects = multiFilterArrayOfObjects(dataArrayOfObjects, "SEASON", seasonValue, "PLAYER NAME", playerValue, "TEAM", teamValue, "LOCATION", locationValue); // Call the created filterArrayOfObjects function.

    //console.log(filteredArrayOfObjects); // Log the filtered array of objects.
    //objectLength = filteredArrayOfObjects.length; // Get the new length of the array.
    //console.log("New Length = " + objectLength); // Log the original length.

    // Call the clearTable and createFullTable functions, passing the table selector on which element to act on.
    clearTable("#all-stats-table"); // Call the clearTable function to empty the table.
    createFullTable(filteredArrayOfObjects, "#all-stats-table", "TRUE", "object"); // Call the createFullTable function, passing the data from PapaParse.
    hideLoaderDots('stats-loader-div'); // Hide the loader dots. See LoaderDots.js.
}

// 3.2. All Stats tab data refresh.

// Create a function that is called when the user changes a dropdown. This function is called from the HTML select elements.
function showAllStatsTabUpdatedInfo() {
    console.log("> Function [Stats Table]: showAllStatsTabUpdatedInfo(results) called.")

    Papa.parse(displayDetailsSheetCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showAllStatsTabInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })
}




// 4. Team of the Week Tab



// 5. Comparison Tab


// 6. Tables, Results & Fixture Tab







// Table Functions

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
function createFullTable(data, selector, toolTipBoolean, dataForm) {
    console.log('%c' + '>> Re-usable Function: createFullTable(data, selector, toolTipBoolean, dataForm) called. Passed variables: data = shown below, selector = ' + selector + ', toolTipBoolean = ' + toolTipBoolean + ', dataForm = ' + dataForm, ' background-color: lightgreen; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
    //console.log(data); // Log the passed data to the console.
    let table = document.querySelector(selector); // Select the parent element from which to build the table. Modified the selector to be dynamic and accept any type of selector. Previously, defining as "table" meant that it only works if the HTML page has only one table element.
    // If the toolTipBoolean is true, define header data as from the array, instead of the keys of an object.
    if (dataForm == "array") { // Define the header data as from the array.
        //console.log("dataForm = " + dataForm + " therefore data is in array form, so pass through data as the first row of data of the array."); // Log if the toolTipBoolean is in play or not.
        var headerdata = data[0]; // Get the header data from the first element of the array.
        //console.log("headerdata printed below:");
        //console.log(headerdata);
    } else if (dataForm == "object") { // Define the header data as the keys of the object.
        //console.log("dataForm = " + dataForm + " therefore data is in object form, so pass through the header data as the first keys of the object."); // Log if the toolTipBoolean is in play or not.
        var headerdata = Object.keys(data[0]); // Create an array of the object headers from the array data received.
        //console.log("headerdata printed below:");
        //console.log(headerdata);
    } else {
        alert("Error - No dataForm passed to 'createFullTable' in jMainFunctions.js.");
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
    //console.log(headerdata); // Log the passed headerdata to the console.
    //console.log(array); // Log the passed array to the console.
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
        th.classList.add("textleft"); // Add the textleft class to all column headers.
        row.appendChild(th); // Append the new table header to the table.
        counter = counter + 1; // Increment the counter.
    }
    //console.log("Function: generateTableHead finished.") // Log a final message to show the function is complete.
}

// Create the rest of the table below head including all table rows.
function generateTable(table, data, toolTipBoolean) {
    console.log('%c' + '>> Re-usable Function: generateTable(table, data, toolTipBoolean) called. Passed variables: table = not shown, data = shown below, toolTipBoolean = ' + toolTipBoolean, ' background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
    //console.log(data); // Log the passed array to the console.
    var rowCounter = 1; // Define a counter for checking which row to work with.
    var columnCounter;
    var testedValue;
    let tbody = table.createTBody(); // Create table body - https://stackoverflow.com/a/6483237/14290169.

    // console.log("--------------------------------------")
    // console.log("Generate Table Data Start")
    // console.log("Starting Row Counter = " + rowCounter);
    // console.log("toolTipBoolean = " + toolTipBoolean);

    for (let element of data) { // Loop through each row of the data.
        let row = tbody.insertRow(); // Insert a row for each bit of table data.
        columnCounter = 0; // Define a counter for checking which column to apply stick-col rule to.

        // console.log("-------------------------------------")
        // console.log("Row data = below")
        // console.log(element)

        if (rowCounter <= 1) { // Skip the first row regardless.

            // Do nothing.
            // console.log("Row count " + rowCounter + " skipped as this is the table headers.")

        } else {

            if (toolTipBoolean == true && rowCounter == 2) {
                //if (toolTipBoolean == true && rowCounter <= 1) { // Define how to add the text depending on if toolTips are enabled for the table.
                // Skip doing the first two rows for tables that have tooltips.
                // console.log("toolTipBoolean is true so skipping row = " + rowCounter + ".");

            } else {

                // console.log("toolTipBoolean is false so not skipping row = " + rowCounter + ".");

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

        }

        rowCounter = rowCounter + 1; // Increment the rowCounter.
    }
    //console.log("Function: generateTable finished.") // Log a final message to show the function is complete.
}


// Filter Array Functions

// Filter an Array of Objects and return another Array of Objects, filtered by the input value, against the defined objects key. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
function filterArrayOfObjects(ArrayOfObjects, keyName, filterValue) {
    // Receive an Array of Objects, a key name and a filter value.
    console.log('%c' + '>> Re-usable Function: filterArrayOfObjects(ArrayOfObjects, keyName, filterValue) called. Passed variables: ArrayOfObjects = not shown, keyName = ' + keyName + ', filterValue = ' + filterValue, ' background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
    const filteredArrayOfObjects = ArrayOfObjects.filter(data => (data[keyName].includes(filterValue))); // Filter down the data into a new array of objects.
    return filteredArrayOfObjects; // Return the new filtered array of objects.
}

// Filter an Array of Objects based on multiple inputs and return another Array of Objects, filtered by the input values, against the defined objects key. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
function multiFilterArrayOfObjects(ArrayOfObjects, keyNameSeason, filterValueSeason, keyNamePlayer, filterValuePlayer, keyNameTeam, filterValueTeam, keyNameLocation, filterValueLocation) {
    // Receive an Array of Objects, and multiple key names and filter values.
    console.log('%c' + '>> Re-usable Function: multiFilterArrayOfObjects(ArrayOfObjects, keyNames , filterValues...) called. Passed variables: ArrayOfObjects = not shown, keyNameSeason = ' + keyNameSeason + ', filterValueSeason = ' + filterValueSeason, ', keyNamePlayer = ' + keyNamePlayer + ', filterValuePlayer = ' + filterValuePlayer, ', keyNameTeam = ' + keyNameTeam + ', filterValueTeam = ' + filterValueTeam, ', keyNameLocation = ' + keyNameLocation + ', filterValueLocation = ' + filterValueLocation, ' background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
    // Initially define the variable that will be manipulated and produced.
    var filteredArrayOfObjects = ArrayOfObjects;
    // Filter the Array of Objects for multiple criteria.

    // Filter the Array of Objects for the defined season.
    if (filterValueSeason === "Season") { // Don't filter if unpicked.
        // Do nothing as season hasn't been selected.
        console.log(">>> Data not filtered for seasons as 'Season' still picked.")
    } else { // Filter the Array of Objects.
        filteredArrayOfObjects = filteredArrayOfObjects.filter(data => (data[keyNameSeason].includes(filterValueSeason))); // Filter down the data into a new array of objects.
    }

    // Filter the Array of Objects for the selected player.
    if (filterValuePlayer === "Player") { // Don't filter if unpicked.
        // Do nothing as player hasn't been selected.
        console.log(">>> Data not filtered for players as 'Player' still picked.")
    } else { // Filter the Array of Objects.
        filteredArrayOfObjects = filteredArrayOfObjects.filter(data => (data[keyNamePlayer].includes(filterValuePlayer))); // Filter down the data into a new array of objects.
    }

    // Filter the Array of Objects for the selected team.
    if (filterValueTeam === "Team") { // Don't filter if unpicked.
        // Do nothing as team hasn't been selected.
        console.log(">>> Data not filtered for teams as 'Team' still picked.")
    } else { // Filter the Array of Objects.
        filteredArrayOfObjects = filteredArrayOfObjects.filter(data => (data[keyNameTeam].includes(filterValueTeam))); // Filter down the data into a new array of objects.
    }

    // Filter the Array of Objects for the selected location.
    if (filterValueLocation === "Location") { // Don't filter if unpicked.
        // Do nothing as location hasn't been selected.
        console.log(">>> Data not filtered for locations as 'Location' still picked.")
    } else { // Filter the Array of Objects.
        filteredArrayOfObjects = filteredArrayOfObjects.filter(data => (data[keyNameLocation].includes(filterValueLocation))); // Filter down the data into a new array of objects.
    }

    return filteredArrayOfObjects; // Return the new filtered array of objects.
}



// Other Functions

// Full Screen functions (https://stackoverflow.com/a/23971798/14290169).

function isFullScreen() {
    return (document.fullScreenElement && document.fullScreenElement !== null)
        || document.mozFullScreen
        || document.webkitIsFullScreen;
}

function requestFullScreen(element) {
    if (element.requestFullscreen)
        element.requestFullscreen();
    else if (element.msRequestFullscreen)
        element.msRequestFullscreen();
    else if (element.mozRequestFullScreen)
        element.mozRequestFullScreen();
    else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
}

function exitFullScreen() {
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.msExitFullscreen)
        document.msExitFullscreen();
    else if (document.mozCancelFullScreen)
        document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
}

function toggleFullScreen(element) {
    if (isFullScreen()) {
        console.log("Exiting full screen mode.");
        exitFullScreen();
    } else {
        console.log("Entering full screen mode.");
        requestFullScreen(element || document.documentElement);
    }
}