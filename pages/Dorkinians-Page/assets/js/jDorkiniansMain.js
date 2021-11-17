// jDorkiniansMain.js JavaScript Functions

// Papa Parse (previously TableTop) Google Sheets Database scripts
// Papa Parse - https://www.papaparse.com/docs#csv-to-json
// How to use Papa Parse - https://dev.to/bornfightcompany/using-google-sheets-as-a-simple-database-with-papa-parse-2k7o
// TableTop - https://github.com/jsoma/tabletop

// * Process Explained

// Firstly, an addEventListener('DOMContentLoaded') function waits for the window to load before triggering an init() function.
// An init function calls all papa parse statements to get the required data for the page.
// There are three arrays of data to load in; // * THIS IS TO BE UPDATED ONCE ALL HAVE BEEN IDENTIFIED.
// 1. The full club fixtures list - fixturesListSheetURLCSV
// 2. The all stats table - displayDetailsSheetCSV
// 3. The all time player stats - allTimeStatsSheetCSV

// For each data set, there are four sub functions/processes;
// 1. The papa parse - done in the init() function.
// 2. A "getter" function which is called from the papa parse. The "getter" function defines the global variable for the data so it can be re-called.
// 3. A "show-er" function which is called from the "getter" function and displays the initial data on the page.
// 4. A "update-er" function which is called from the "show-er" function and displays the updated data on the page.




// First section loads in the Stats tab data.
// Second section loads in the Results tab data.
// Third section loads in the Fixtures tab data.





// ! Code

console.time(); // Start the console timer.

// Publically define a number of global constants and variables such as the location of the Google Sheets.

// Fixtures List Tab
const fixturesListSheetURLCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=1820717347&single=true&output=csv';
// Match Details Tab
//var matchDetailsSheetURLCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=1016205165&single=true&output=csv';
// Display Details Tab
const displayDetailsSheetCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=628628597&single=true&output=csv';
// All Time Stats Tab
const displayAllTimeStatsSheetCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=246566173&single=true&output=csv';
var displayAllTimeStatsArrayOfObjects = "";

// Ready Events

// First add a DOMContentLoaded event to fire when the HTML DOM is in place and then add a load event listener for when all images and other resources are loaded.
window.addEventListener('DOMContentLoaded', init) // Wait for the window to load and then run the init function below.

// Add a load event listener - which completes after the init() function below - (https://eager.io/blog/how-to-decide-when-your-code-should-run/).
window.addEventListener('load', function () {
    console.log('%c' + '> Dorkinians page images and other resources all loaded.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Provide an initial load message. 
    console.timeEnd(); // End the console timer.

    // End the rotation of the Dorkinians logo to simulate loading being completed.
    // stopRotateLogo();
});

// Init Function

// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {
    console.log('%c' + '> Dorkinians page DOM content loaded.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Provide an initial load message.

    // Step 0.
    console.log('%c' + '> 0. init() called. Code started for each of the three sub processes.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.

    // Start the rotation of the Dorkinians logo to simulate loading.
    rotateLogo();

    // Step 1. 
    // Player Stats Tab.
    // All Time Player Stats data.
    console.log('%c' + '> 1. Player Stats tab data being loaded in.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.
    Papa.parse(displayAllTimeStatsSheetCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: getPlayerStatsTabInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })


    // Step 1. All Stats tab data.
    // console.log('%c' + '> 1. All Stats tab data being loaded in.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.
    // Papa.parse(matchDetailsSheetURLCSV, {
    // Papa.parse(displayDetailsSheetCSV, {
    //     download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    //     header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    //     fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    //     complete: showAllStatsTabInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    // })

    // Step 2. Results tab data.
    // console.log('%c' + '> 2. Results tab data being loaded in.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.
    // Papa.parse(fixturesListSheetURLCSV, {
    //     download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    //     header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    //     fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    //     complete: showResultsTabInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    // })

    // Step 3. Fixtures tab data.
    // console.log('%c' + '> 3. Fixtures tab data being loaded in.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.
    // Papa.parse(publicSpreadsheetUrlCSV, {
    //     download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    //     header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    //     fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    //     complete: showTitanFactorExplainedInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    // })

    // End the rotation of the Dorkinians logo to simulate loading being completed.
    stopRotateLogo();
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

    // End the rotation of the Dorkinians logo to simulate loading being completed.
    stopRotateLogo();
}

// 1.2. Club Stats Results tab data refresh.

// Create a function that is called when the user changes the team dropdown. This function is called from the HTML select elements.
function showAllResultsTabUpdatedInfo() {
    console.log("> Function [Stats Table]: showAllResultsTabUpdatedInfo(results) called.")

    // Start the rotation of the Dorkinians logo to simulate loading.
    rotateLogo();

    Papa.parse(resultsSheetURLCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showResultsTabInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })

    // End the rotation of the Dorkinians logo to simulate loading being completed.
    // stopRotateLogo();
}





// 2. Player Stats Tab

// 2.1. Player Stats tab data "getter" function.

function getPlayerStatsTabInfo(results) {
    // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
    console.log('%c' + '>> getPlayerStatsTabInfo.', 'background-color: blue; color:black; padding: 0.5em 0em; font-weight: bold;');
    displayAllTimeStatsArrayOfObjects = results.data // Define the global variable "displayAllTimeStatsArrayOfObjects" to be used later on.
    // console.log("Global variable 'displayAllTimeStatsArrayOfObjects' defined:"); // Log the global variable.
    // console.log(displayAllTimeStatsArrayOfObjects); // Log the global variable.
    showPlayerStatsTabInfo(displayAllTimeStatsArrayOfObjects); // Call the showPlayerStats function.
}

// 2.2. Player Stats tab data "show-er" function.

function showPlayerStatsTabInfo(results) {
    // Display the retrieved data onto the page.
    console.log("> Function [Results Table]: showPlayerStatsTabInfo(results) called.")

    // Process the original array of objects received.
    //const dataArrayOfObjects = results.data 
    // console.log("dataArrayOfObjects = "); // Log the received array of objects.

    // Set the dataArrayOfObjects.
    const dataArrayOfObjects = results; // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.

    // console.log(dataArrayOfObjects); // Log the received array of objects.
    var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
    // console.log("Original Length of dataArrayOfObjects = " + objectLength); // Log the original length.

    // Filter down the entire array to find the players data.

    // Filter the array of objects down. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
    // Player selection.
    const playerValueDropdown = document.getElementById("player-stats-player-selection"); // Get the player selected dropdown.
    const playerValue = playerValueDropdown.options[playerValueDropdown.selectedIndex].text; // Get the player selected. (https://stackoverflow.com/a/8549358/14290169).
    console.log("Selected player (playerValue) = " + playerValue);

    // Filter for the selection.
    // Re-use the re-usable function..
    const filteredArrayOfObjects = filterArrayOfObjects(dataArrayOfObjects, "NAME", playerValue); // Call the created filterArrayOfObjects function.
    // console.log("filteredArrayOfObjects = "); // Log the filtered array of objects.
    // console.log(filteredArrayOfObjects); // Log the filtered array of objects.
    objectLength = filteredArrayOfObjects.length; // Get the new length of the array.
    // console.log("New Length of dataArrayOfObjects = " + objectLength); // Log the original length.
    if (objectLength > 1) { // If the objectLength is greater than 1, flag an alert error.
        alert("More than one record returned for player selected!");
    }

    // Log the data that will be displayed.
    console.log("filteredArrayOfObjects[0] = ");
    console.log(filteredArrayOfObjects[0]);

    // Populate the stats information on the page.

    // Define an array of stats to update. Each stat corresponds to an HTML element.
    let statArray = ["APP", "M", "MOM", "G", "A", "Y", "R", "OG", "C", "CLS", "GperAPP", "CperAPP", "MperG"];
    for (let i = 0; i < statArray.length; i++) {
        // console.log(statArray[i]); // Log the stat being updated.
        var HeaderElement = document.getElementById("player-stats-" + statArray[i] + "-header"); // Get the HeaderElement dynamically.
        var TextElement = document.getElementById("player-stats-" + statArray[i]); // Get the Text Element dynamically.
        var displayText = Number(filteredArrayOfObjects[0][statArray[i]]).toLocaleString("en-UK"); // Use a dynamic [statArray[i]] key. Convert the stat to a number and then add a comma by using the "toLocaleString" method.
        // console.log("displayText = " + displayText); // Log the text that will be displayed.
        TextElement.innerHTML = displayText; // Add the text to the HTML element.
        // console.log(statArray[i] + " done"); // Log that the stat has been done.
        // Add a tooltip hover over.
        // HeaderElement.classList.add("tooltip"); // Add the tooltip class to the element (the container element).
        // var toolTip = document.createElement("p"); // Create a paragraph element to be appended.
        // toolTip.innerHTML = "Test text"; // Add the text of the second row, counter column to the new paragraph element.
        // toolTip.classList.add("tooltiptext"); // Add the tooltiptext class to the new paragraph element.
        // toolTip.classList.add("wordwrap"); // Add the wordwrap class to the new paragraph element.
        // HeaderElement.appendChild(toolTip); // Append the toolTip paragraph element as a child to the th element.
    }

}

// 2.3. Player Stats tab data "update-er" function.

function showPlayerStatsTabUpdatedInfo() {
    // Create a function that is called when the user changes the team dropdown. This function is called from the HTML select elements.

    // Start the rotation of the Dorkinians logo to simulate loading.
    rotateLogo();

    showPlayerStatsTabInfo(displayAllTimeStatsArrayOfObjects);

    // End the rotation of the Dorkinians logo to simulate loading being completed.
    stopRotateLogo();
}







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
}

// 3.2. All Stats tab data refresh.

// Create a function that is called when the user changes a dropdown. This function is called from the HTML select elements.
function showAllStatsTabUpdatedInfo() {
    console.log("> Function [Stats Table]: showAllStatsTabUpdatedInfo(results) called.")

    // Start the rotation of the Dorkinians logo to simulate loading.
    rotateLogo();

    Papa.parse(displayDetailsSheetCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: showAllStatsTabInfo, // The callback to execute when parsing is complete. Once done, call the showInfo function.
    })

    // End the rotation of the Dorkinians logo to simulate loading being completed.
    // stopRotateLogo();
}




// 4. Team of the Week Tab



// 5. Comparison Tab

function updateComparisonStatData() {

    // Reset all stats bars on the Comparison tab.
    resetStatsBars();

    let player1NameDropdown = document.getElementById("comparison-player-1-dropdown"); // Get the player 1 dropdown.
    let player1NameValue = player1NameDropdown.options[player1NameDropdown.selectedIndex].text; // Get the player selected. (https://stackoverflow.com/a/8549358/14290169).
    // console.log("Selected player 1 (player1NameValue) = " + player1NameValue);

    let player2NameDropdown = document.getElementById("comparison-player-2-dropdown"); // Get the player 2 dropdown.
    let player2NameValue = player2NameDropdown.options[player2NameDropdown.selectedIndex].text; // Get the player selected. (https://stackoverflow.com/a/8549358/14290169).
    // console.log("Selected player 2 (player2NameValue) = " + player2NameValue);

    if (player1NameValue === "Select Player 1" && player2NameValue === "Select Player 2") {
        // Do nothing as neither dropdown has had anything selected.
        console.log("Neither dropdown has a player selected.");
    } else if (player1NameValue === "Select Player 1") {
        // Player 1 dropdown is blank so fill in details for player 2.
        console.log("Player 1 dropdown is blank so fill in details for player 2.");
        loadInComparisonStatNumbers(player2NameValue, 2, false);
    } else if (player2NameValue === "Select Player 2") {
        // Player 2 dropdown is blank so fill in details for player 1.
        console.log("Player 2 dropdown is blank so fill in details for player 1.");
        loadInComparisonStatNumbers(player1NameValue, 1, false);
    } else {
        // Both player 1 and player 2 dropdowns are populated so fill in details for both players and load stat bars.
        // loadInComparisonStatNumbers(player1NameValue, 1, true);
        // loadInComparisonStatNumbers(player2NameValue, 2, true);
        //loadInComparisonStatNumbersNew("APP", player1NameValue, player2NameValue, true);


        // Define an array of stats to update. Each stat corresponds to an HTML element.
        let statArray = ["APP", "MOM", "G"];
        // let statArray = ["APP", "M", "MOM", "G", "A", "Y", "R", "OG", "C", "CLS", "GperAPP", "CperAPP", "MperG"];
        for (let i = 0; i < statArray.length; i++) {
            loadInComparisonStatNumbersNew(statArray[i], player1NameValue, player2NameValue, true);
        }

    }

    // For the comparison page, have two dropdown selection boxes.

    // Select Name 1            Select Name 2
    //                         Icon
    //                         Icon


    // When the user changes "Select Name 1", show the scores of the player 1. Don't load in the score bar, just show the number of the score.

    // Select Name 1            Select Name 2
    //             Score  Icon
    //             Score  Icon


    // When the user changes the "Select Name 2", show the scores of both players then animate the bars loading in;

    // Select Name 1            Select Name 2
    //             Score  Icon   Score
    //             Score  Icon   Score

    // Animate:

    // Select Name 1            Select Name 2
    // ----------  Score  Icon   Score ----
    //         --   Score  Icon   Score -------

    // Have these functions;

    // loadInScore (statName, selectNumber) - loads in the score value given which statName and which selectNumber (1 or 2) to load into.

    // animateComparison - which triggers when both Select Name 1 and Select Name 2 have been populated.

    // Have a reset button to clear both names and then clear animations.

    

}

function loadInComparisonStatNumbers(playerName, playerNumber, fillBarsBoolean) {

    // Use the global variable "displayAllTimeStatsArrayOfObjects" and filter it down for the defined player name.

    // console.log(displayAllTimeStatsArrayOfObjects); // Log the received array of objects.
    var objectLength = displayAllTimeStatsArrayOfObjects.length; // Get the original length of the array.
    // console.log("Original Length of displayAllTimeStatsArrayOfObjects = " + objectLength); // Log the original length.

    // Filter down the entire array to find the players data.

    // Filter the array of objects down. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
    // console.log("Selected player (playerName) = " + playerName);

    // Filter for the selection.
    // Re-use the re-usable function..
    const filteredArrayOfObjects = filterArrayOfObjects(displayAllTimeStatsArrayOfObjects, "NAME", playerName); // Call the created filterArrayOfObjects function.
    // console.log("filteredArrayOfObjects = "); // Log the filtered array of objects.
    // console.log(filteredArrayOfObjects); // Log the filtered array of objects.
    objectLength = filteredArrayOfObjects.length; // Get the new length of the array.
    // console.log("New Length of dataArrayOfObjects = " + objectLength); // Log the original length.
    if (objectLength > 1) { // If the objectLength is greater than 1, flag an alert error.
        alert("More than one record returned for player selected!");
    }

    // Log the data that will be displayed.
    // console.log("filteredArrayOfObjects[0] = ");
    // console.log(filteredArrayOfObjects[0]);

    // Populate the stats information on the page.

    // Define an array of stats to update. Each stat corresponds to an HTML element.
    let statArray = ["APP", "MOM", "G"];
    // let statArray = ["APP", "M", "MOM", "G", "A", "Y", "R", "OG", "C", "CLS", "GperAPP", "CperAPP", "MperG"];
    for (let i = 0; i < statArray.length; i++) {
        // console.log(statArray[i]); // Log the stat being updated.
        console.log("comparison-" + statArray[i] + "-player-" + playerNumber + "-value");
        var TextElement = document.getElementById("comparison-" + statArray[i] + "-player-" + playerNumber + "-value"); // Get the Text Element dynamically.
        var displayText = Number(filteredArrayOfObjects[0][statArray[i]]).toLocaleString("en-UK"); // Use a dynamic [statArray[i]] key. Convert the stat to a number and then add a comma by using the "toLocaleString" method.
        // console.log("displayText = " + displayText); // Log the text that will be displayed.
        TextElement.innerHTML = displayText; // Add the text to the HTML element.
    }

    // Fill both bars if the passed boolean is true.
    if (fillBarsBoolean === true) {
        // Fill the bars as the boolean is true.
        console.log("Filling the stats bars as fillBarsBoolean is true.");
        fillStatsBars(playerNumber);
    } else {
        // Do nothing as fillBarsBoolean is false.
        console.log("Not filling the stats bars as fillBarsBoolean is false.");
    }
}

function loadInComparisonStatNumbersNew(statName, player1Name, player2Name, fillBarsBoolean) {

    // Use the global variable "displayAllTimeStatsArrayOfObjects" and filter it down for the defined player name.

    // console.log(displayAllTimeStatsArrayOfObjects); // Log the received array of objects.
    var objectLength = displayAllTimeStatsArrayOfObjects.length; // Get the original length of the array.
    // console.log("Original Length of displayAllTimeStatsArrayOfObjects = " + objectLength); // Log the original length.

    // Filter down the entire array to find the players data.

    // Filter the array of objects down. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
    // console.log("Selected player (playerName) = " + playerName);

    // Do below code for both player 1 and player 2.
    // Define an array of players to update. Each stat corresponds to an HTML element.
    let playerArray = ["", player1Name, player2Name]; // First value is blank (as this offsets the for loop below to align the loop with the HTML element references being 1 and 2).
    let statValueArray = ["", "", ""]; // Define a blank array to populate with stat values.
    console.log(playerArray);

    for (let i = 1; i < playerArray.length; i++) {

        // Filter for the selection.
        // Re-use the re-usable function..
        const filteredArrayOfObjects = filterArrayOfObjects(displayAllTimeStatsArrayOfObjects, "NAME", playerArray[i]); // Call the created filterArrayOfObjects function.
        // console.log("filteredArrayOfObjects = "); // Log the filtered array of objects.
        // console.log(filteredArrayOfObjects); // Log the filtered array of objects.
        objectLength = filteredArrayOfObjects.length; // Get the new length of the array.
        // console.log("New Length of dataArrayOfObjects = " + objectLength); // Log the original length.
        if (objectLength > 1) { // If the objectLength is greater than 1, flag an alert error.
            alert("More than one record returned for player selected!");
        }

        // Populate the stats information on the page.
        // console.log(statArray[i]); // Log the stat being updated.
        //console.log("comparison-" + statName + "-player-" + i + "-value");
        var TextElement = document.getElementById("comparison-" + statName + "-player-" + i + "-value"); // Get the Text Element dynamically.

        // console.log("statname = " + statName);
        // console.log(filteredArrayOfObjects[0]);

        var displayText = Number(filteredArrayOfObjects[0][statName]).toLocaleString("en-UK"); // Use a dynamic [statArray[i]] key. Convert the stat to a number and then add a comma by using the "toLocaleString" method.
        //console.log("displayText = " + displayText); // Log the text that will be displayed.
        TextElement.innerHTML = displayText; // Add the text to the HTML element.

        statValueArray[i] = displayText; // Populate the statValueArray with the recorded score for later comparison.

        // Fill bars if the passed boolean is true.
        if (fillBarsBoolean === true) {
            // Fill the bars as the boolean is true.
            console.log("Filling the stats bars as fillBarsBoolean is true.");
            var BarElement = document.getElementById("comparison-" + statName + "-player-" + i + "-bar"); // Get the Bar Element dynamically.
            // BarElement.setAttribute('id', 'play-animation');
            BarElement.classList.add("play-animation"); // Add the play-animation class from the selected element.
        } else {
            // Do nothing as fillBarsBoolean is false.
            console.log("Not filling the stats bars as fillBarsBoolean is false.");
        }

    }

    console.log('%c' + '>> See here for latest changes.', 'background-color: red; color:black; padding: 0.5em 0em; font-weight: bold;');

    // Compare the values stored in the stat array and decide which side to colour yellow (if any).
    console.log(statValueArray);
    console.log("statValueArray[1]");
    console.log(statValueArray[1]);
    console.log("statValueArray[2]");
    console.log(statValueArray[2]);
    console.log("For stat: " + statName + ", the statValueArray is " + statValueArray);
    if (statValueArray[1] > statValueArray[2]) {
        // Player 1 stats are higher so colour the left bar yellow.
        console.log("As statValueArray[1]: " + statValueArray[1] + " > statValueArray[2]: " + statValueArray[2] + ", make the left bar yellow.")
        BarElement = document.getElementById("comparison-" + statName + "-player-1-bar").classList.add("yellow"); // Get the player 1 Bar Element dynamically and add the yellow class from the selected element.
        BarElement = document.getElementById("comparison-" + statName + "-player-2-bar").classList.remove("yellow"); // Get the player 2 Bar Element dynamically and remove the yellow class from the selected element.
        // BarElement // Add the yellow class from the selected element.
    } else if (statValueArray[2] > statValueArray[1]) {
        // Player 2 stats are higher so colour the left bar yellow.
        console.log("As statValueArray[2]: " + statValueArray[2] + " > statValueArray[1]: " + statValueArray[1] + ", make the right bar yellow.")
        BarElement = document.getElementById("comparison-" + statName + "-player-2-bar").classList.add("yellow"); // Get the player 2 Bar Element dynamically and add the yellow class from the selected element.
        BarElement = document.getElementById("comparison-" + statName + "-player-1-bar").classList.remove("yellow"); // Get the player 1 Bar Element dynamically and remove the yellow class from the selected element.
    } else {
        // Do nothing and leave both white.
        console.log("Leave both bars white as the stats are equal.")
    }

    console.log('%c' + '>> See here for end of latest changes.', 'background-color: red; color:black; padding: 0.5em 0em; font-weight: bold;');
}



function fillStatsBars(playerNumber) {

    // Define an array of stats to update. Each stat corresponds to an HTML element.
    let statArray = ["APP", "MOM", "G"];
    // let statArray = ["APP", "M", "MOM", "G", "A", "Y", "R", "OG", "C", "CLS", "GperAPP", "CperAPP", "MperG"];
    for (let i = 0; i < statArray.length; i++) {
        // console.log(statArray[i]); // Log the stat being updated.
        // console.log("comparison-" + statArray[i] + "-player-" + playerNumber + "-value");
        // Set the player stats bar.
        var BarElement = document.getElementById("comparison-" + statArray[i] + "-player-" + playerNumber + "-bar"); // Get the Bar Element dynamically.
        // BarElement.setAttribute('id', 'play-animation');
        BarElement.classList.add("play-animation"); // Add the play-animation class from the selected element.
    }

}

function resetStatsBars() {

    console.log("function resetStatsBars called.")
    let statArray = ["APP", "MOM", "G"];
    // let statArray = ["APP", "M", "MOM", "G", "A", "Y", "R", "OG", "C", "CLS", "GperAPP", "CperAPP", "MperG"];
    for (let i = 0; i < statArray.length; i++) {
        // console.log(statArray[i]); // Log the stat being updated.
        // console.log("comparison-" + statArray[i] + "-player-" + playerNumber + "-value");
        // Reset the player stats bar by removing the animation.
        var BarElement = document.getElementById("comparison-" + statArray[i] + "-player-1-bar"); // Get the Bar Element dynamically.
        // BarElement.removeAttribute('id', 'play-animation');
        BarElement.classList.remove("play-animation"); // Remove the play-animation class from the selected element.
        BarElement.classList.remove("yellow"); // Remove the yellow class from the selected element.
        BarElement = document.getElementById("comparison-" + statArray[i] + "-player-2-bar"); // Get the Bar Element dynamically.
        // BarElement.removeAttribute('id', 'play-animation');
        BarElement.classList.remove("play-animation"); // Remove the play-animation class from the selected element.
        BarElement.classList.remove("yellow"); // Remove the yellow class from the selected element.
    }
}





// 6. Tables, Results & Fixture Tab

function updateTablesResultsandFixturesTab() {
    console.log("> Function: updateTablesResultsandFixturesTab() called.")

    // Get the team selection dropdown and get the team picked.
    var teamSelectionDropdown = document.getElementById("tables-results-fixtures-team-selection-dropdown");
    var teamSelection = teamSelectionDropdown.options[teamSelectionDropdown.selectedIndex].value; // Get the team selected value (which comes through as 1s etc). (https://stackoverflow.com/a/8549358/14290169).
    
    // Define an array of teams to update. Each team corresponds to an HTML element.
    let teamArray = ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s"];
    for (let i = 0; i < teamArray.length; i++) {
        console.log("Processing " + teamArray[i]); // Log the team being updated.

        // Select the teamTableDiv and teamResultsAndFixturesDiv for the team.
        var teamTableDiv = document.getElementById("dorkinians" + teamArray[i] + "Table"); // Get the Teams table div dynamically.
        console.log("> teamTableDiv for " + teamArray[i] + " is: dorkinians" + teamArray[i] + "Table"); // Log the teamTableDiv being updated.
        var teamResultsAndFixturesDiv = document.getElementById("dorkinians" + teamArray[i] + "ResultsAndFixtures"); // Get the Teams results and fixtures div dynamically.
        console.log("> teamResultsAndFixturesDiv for " + teamArray[i] + " is: dorkinians" + teamArray[i] + "ResultsAndFixtures"); // Log the teamResultsAndFixturesDiv being updated.

        // Either add or remove the "hidden" class from the gathered element.
        if (teamArray[i] === teamSelection){
            teamTableDiv.classList.remove("hidden"); // Remove the hidden class from the selected element so that it is shown.
            console.log("> dorkinians" + teamArray[i] + "Table is shown by removing the 'hidden' class"); // Log the teamTableDiv being updated.
            teamResultsAndFixturesDiv.classList.remove("hidden"); // Remove the hidden class from the selected element so that it is shown.
            console.log("> dorkinians" + teamArray[i] + "ResultsAndFixtures is shown by removing the 'hidden' class"); // Log the teamResultsAndFixturesDiv being updated.
        } else if (teamSelection === "WholeClub") {
            teamTableDiv.classList.remove("hidden"); // Remove the hidden class from the selected element so that it is shown.
            console.log("> dorkinians" + teamArray[i] + "Table is shown by removing the 'hidden' class"); // Log the teamTableDiv being updated.
            teamResultsAndFixturesDiv.classList.remove("hidden"); // Remove the hidden class from the selected element so that it is shown.
            console.log("> dorkinians" + teamArray[i] + "ResultsAndFixtures is shown by removing the 'hidden' class"); // Log the teamResultsAndFixturesDiv being updated.
        
        } else {
            teamTableDiv.classList.add("hidden"); // Add the hidden class to the selected element so that it is hidden.
            console.log("> dorkinians" + teamArray[i] + "Table is hidden by adding the 'hidden' class"); // Log the teamTableDiv being updated.
            teamResultsAndFixturesDiv.classList.add("hidden"); // Add the hidden class to the selected element so that it is hidden.
            console.log("> dorkinians" + teamArray[i] + "ResultsAndFixtures is hidden by adding the 'hidden' class"); // Log the teamResultsAndFixturesDiv being updated.
        }
    }
}





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

    // console.log(data); // Log the passed data to the console.
    let table = document.querySelector(selector); // Select the parent element from which to build the table. Modified the selector to be dynamic and accept any type of selector. Previously, defining as "table" meant that it only works if the HTML page has only one table element.
    // If the toolTipBoolean is true, define header data as from the array, instead of the keys of an object.
    if (dataForm == "array") { // Define the header data as from the array.
        console.log("dataForm = " + dataForm + " therefore data is in array form, so pass through data as the first row of data of the array."); // Log if the toolTipBoolean is in play or not.
        var headerdata = data[0]; // Get the header data from the first element of the array.
        //console.log("headerdata printed below:");
        //console.log(headerdata);
    } else if (dataForm == "object") { // Define the header data as the keys of the object.
        console.log("dataForm = " + dataForm + " therefore data is in object form, so pass through the header data as the first keys of the object."); // Log if the toolTipBoolean is in play or not.
        var headerdata = Object.keys(data[0]); // Create an array of the object headers from the array data received.
        // console.log("headerdata printed below:");
        // console.log(headerdata);
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

    // console.log("Header data is an array:");
    // console.log(headerdata); // Log the passed headerdata to the console.
    console.log("Array is an array of objects:");
    console.log(array); // Log the passed array to the console.

    let thead = table.createTHead(); // Create table headers.
    let row = thead.insertRow(); // Insert a row for the table headers.
    var counter = 0; // Define a counter for checking which column to apply stick-col rule to.
    for (let key of headerdata) { // Loop through each column header of the headerdata.
        let th = document.createElement("th"); // Create the th element.
        // If the toolTipBoolean is true, create the headers to also include the tool tips.
        if (toolTipBoolean == true) { // Define how to add the text depending on if toolTips are enabled for the table.
            console.log("toolTipBoolean is true so adding tooltip.");
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
        } else { // If toolTipBoolean is false, add text the normal way.
            console.log("toolTipBoolean is false so not adding tooltip.");
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



// Dorkinians Logo Rotation Functions

// Start Rotation
function rotateLogo() {
    console.log('%c' + '> rotateLogo() called. Dorkinians logo rotating.', 'background-color: #F9ED32; color: black; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.

    // Add classes to the Dorkinians logo in the top left corner to simulate loading.
    var dorkiniansLogo = document.getElementById("dorkiniansLogo"); // Get the Dorkinians Logo.
    dorkiniansLogo.classList.add("rotate"); // Add the "rotate" class to the logo.
    dorkiniansLogo.classList.add("linear"); // Add the "linear" class to the logo.
    dorkiniansLogo.classList.add("infinite"); // Add the "infinite" class to the logo.
}

// Finish Rotation
function stopRotateLogo() {
    console.log('%c' + '> stopRotateLogo() called. Dorkinians logo stopped rotating.', 'background-color: #F9ED32; color: black; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.

    // Remove classes from the Dorkinians logo in the top left corner to simulate loading being completed.
    var dorkiniansLogo = document.getElementById("dorkiniansLogo"); // Get the Dorkinians Logo.
    dorkiniansLogo.classList.remove("rotate"); // Remove the "rotate" class from the logo.
    dorkiniansLogo.classList.remove("linear"); // Remove the "linear" class from the logo.
    dorkiniansLogo.classList.remove("infinite"); // Remove the "infinite" class from the logo.
}