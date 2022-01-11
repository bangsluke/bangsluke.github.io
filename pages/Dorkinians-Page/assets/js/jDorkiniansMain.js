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

// Ready Global Variable
var readyComponentsCount = 0;
const numberReadyComponents = 7;

// Create an array of phrases to be displayed on the loading page.
var phrasesArray = [
    "Locating any number 8 tops in kit bags...",
    "Calculating the likelihood of Shano scoring an 'unmissable' chance...",
    "Forgetting Oakley's 'assist' in the last game...",
    "Adding up the sheer quantity of Peck's goals...",
    "Going into overdrive counting all of Alex Will's yellow cards...",
    "Crafting the basis of the AFA's rep teams from Dorkinians players...",
    "Hitting on the bar staff after the game...",
    "Waiting for Sam Smith to score from open play...",
    "Pretending the 1's team's yellow cards never happened...",
    "Accepting bribes for stat fiddling...",
    "Will be ready as soon as Rupert Cape uses his left foot...",
    "Waiting for Morley to leave the changing room so we can kick off...",
    "Check out the new Higgins range of clothes in Asda's George whilst you wait...",
    "Ignoring Rich's match fee and membership messages..." // Don't need to leave the last array value empty.
];

// Globally define an object containing stat objects that can be referenced in other functions.
const statObject = {
    APP: {
        statName: 'Appearances',
        statFormat: 'Integer',
        description: 'The number of appearances made by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Appearance Stat'
    },
    M: {
        statName: 'Minutes',
        statFormat: 'Integer',
        description: 'The number of minutes played by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Appearance Stat'
    },
    MOM: {
        statName: 'Man of the Matches',
        statFormat: 'Integer',
        description: 'The number of man of the match performances achieved by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Performance Stat'
    },
    G: {
        statName: 'Goals Scored',
        statFormat: 'Integer',
        description: 'The number of goals scored by the player, including penalties.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Performance Stat'
    },
    A: {
        statName: 'Assists',
        statFormat: 'Integer',
        description: 'The number of assists provided by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Performance Stat'
    },
    Y: {
        statName: 'Yellow Cards',
        statFormat: 'Integer',
        description: 'The number of yellow cards received by the player.',
        statHigherBetterBooleanArray: false,
        numberDecimalPlaces: 0,
        statCategory: 'Performance Stat'
    },
    R: {
        statName: 'Red Cards',
        statFormat: 'Integer',
        description: 'The number of red cards received by the player.',
        statHigherBetterBoolean: false,
        numberDecimalPlaces: 0,
        statCategory: 'Performance Stat'
    },
    OG: {
        statName: 'Own Goals',
        statFormat: 'Integer',
        description: 'The number of own goals scored by the player.',
        statHigherBetterBoolean: false,
        numberDecimalPlaces: 0,
        statCategory: 'Performance Stat'
    },
    C: {
        statName: 'Conceded',
        statFormat: 'Integer',
        description: 'The number of goals conceded whilst the player has been playing.',
        statHigherBetterBoolean: false,
        numberDecimalPlaces: 0,
        statCategory: 'Performance Stat'
    },
    CLS: {
        statName: 'Clean Sheets',
        statFormat: 'Integer',
        description: 'The number of clean sheets achieved by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Performance Stat'
    },
    PSC: {
        statName: 'Penalties Scored',
        statFormat: 'Integer',
        description: 'The number of penalties scored by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Penalty Stat'
    },
    PM: {
        statName: 'Penalties Missed',
        statFormat: 'Integer',
        description: 'The number of penalties missed by the player.',
        statHigherBetterBoolean: false,
        numberDecimalPlaces: 0,
        statCategory: 'Penalty Stat'
    },
    PCO: {
        statName: 'Penalties Conceded',
        statFormat: 'Integer',
        description: 'The number of penalties conceded by the player.',
        statHigherBetterBoolean: false,
        numberDecimalPlaces: 0,
        statCategory: 'Penalty Stat'
    },
    PSV: {
        statName: 'Penalties Saved',
        statFormat: 'Integer',
        description: 'The number of penalties saved by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Penalty Stat'
    },
    FTP: {
        statName: 'Fantasy Points',
        statFormat: 'Integer',
        description: 'The number of fantasy points achieved by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Performance Stat'
    },
    GperAPP: {
        statName: 'Goals Per Appearance',
        statFormat: 'Decimal2',
        description: 'The average number of goals scored per appearance by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 1,
        statCategory: 'Per App/Minute Stat'
    },
    CperAPP: {
        statName: 'Conceded Per Appearance',
        statFormat: 'Decimal2',
        description: 'The average number of goals conceded per appearance by the player.',
        statHigherBetterBoolean: false,
        numberDecimalPlaces: 1,
        statCategory: 'Per App/Minute Stat'
    },
    MperG: {
        statName: 'Minutes Per Goal',
        statFormat: 'Integer',
        description: 'The average number of minutes needed by the player to score a goal.',
        statHigherBetterBoolean: false,
        numberDecimalPlaces: 0,
        statCategory: 'Per App/Minute Stat'
    },
    MperCLS: {
        statName: 'Minutes Per Clean Sheet',
        statFormat: 'Integer',
        description: 'The average number of minutes needed by the player to achieve a clean sheet.',
        statHigherBetterBoolean: false,
        numberDecimalPlaces: 0,
        statCategory: 'Per App/Minute Stat'
    },
    FTPperAPP: {
        statName: 'Fantasy Points Per Appearance',
        statFormat: 'Decimal2',
        description: 'The average number of fantasy points scored per appearance by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 1,
        statCategory: 'Per App/Minute Stat'
    },
    DIST: {
        statName: 'Distance Travelled',
        statFormat: 'Decimal1',
        description: 'The distance travelled in miles by the player getting to away games.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 1,
        statCategory: 'Appearance Stat'
    },
    "Games%Won": {
        statName: 'Percentage Games Won',
        statFormat: 'Percentage',
        description: 'The percentage of games won by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Results Stat'
    },
    HomeGames: {
        statName: 'Home Games',
        statFormat: 'Integer',
        description: 'The number of home games played by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Results Stat'
    },
    HomeWins: {
        statName: 'Home Wins',
        statFormat: 'Integer',
        description: 'The number of home games won by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Results Stat'
    },
    "HomeGames%Won": {
        statName: 'Percentage Home Games Won',
        statFormat: 'Percentage',
        description: 'The percentage of home games won by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Results Stat'
    },
    AwayGames: {
        statName: 'Away Games',
        statFormat: 'Integer',
        description: 'The number of away games played by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Results Stat'
    },
    AwayWins: {
        statName: 'Away Wins',
        statFormat: 'Integer',
        description: 'The number of away games won by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Results Stat'
    },
    "AwayGames%Won": {
        statName: 'Percentage Away Games Won',
        statFormat: 'Percentage',
        description: 'The percentage of away games won by the player.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Results Stat'
    },
    "MostPlayedForTeam": {
        statName: 'Most Played for Team',
        statFormat: 'String',
        description: 'The Dorkinians team that the player has appeared for most.',
        statHigherBetterBoolean: false,
        numberDecimalPlaces: 0,
        statCategory: 'Appearance Stat'
    },
    "NumberTeamsPlayedFor": {
        statName: 'Number of Teams Played for',
        statFormat: 'String',
        description: 'The number of Dorkinians teams that the player has appeared for.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Appearance Stat'
    },
    "NumberSeasonsPlayedFor": {
        statName: 'Number of Seasons Played for',
        statFormat: 'String',
        description: 'The number of seasons that the player has played for Dorkinians since stats records began.',
        statHigherBetterBoolean: true,
        numberDecimalPlaces: 0,
        statCategory: 'Appearance Stat'
    },
    "MostScoredForTeam": {
        statName: 'Most Scored for Team',
        statFormat: 'String',
        description: 'The Dorkinians team that the player has scored the most for.',
        statHigherBetterBoolean: false,
        numberDecimalPlaces: 0,
        statCategory: 'Appearance Stat'
    }
};

// Google Sheet Links

// Site Details
const siteDetailsSheetURLCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=1978614347&single=true&output=csv';
var displaySiteDetailsArrayOfObjects = ""; // Define an initially blank array to be populated later.

// Homepage Tab

const nextFixturesSheetURLCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=267145747&single=true&output=csv';
var displayNextFixturesArrayOfObjects = ""; // Define an initially blank array to be populated later.

// Club Stats Tab

// Total Club Stats
const totalClubStatsSheetURLCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=1673925166&single=true&output=csv';
var displayTotalClubStatsArrayOfObjects = ""; // Define an initially blank array to be populated later.

// Team Season Results
const teamSeasonResultsSheetURLCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=1269354033&single=true&output=csv';
var displayTeamSeasonResultsArrayOfObjects = ""; // Define an initially blank array to be populated later.

// Player Stats Tab

// Player Selection
const displayAllowedPlayersSheetCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=0&single=true&output=csv';
var displayAllowedPlayersArrayOfObjects = ""; // Define an initially blank array to be populated later.

// This Season Stats
const displayThisSeasonStatsSheetCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=1147882021&single=true&output=csv';
var displayThisSeasonStatsArrayOfObjects = ""; // Define an initially blank array to be populated later.

// All Time Stats
const displayAllTimeStatsSheetCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=978685299&single=true&output=csv';
var displayAllTimeStatsArrayOfObjects = ""; // Define an initially blank array to be populated later.

// Fixtures List Tab
const fixturesListSheetURLCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=1820717347&single=true&output=csv';
// Match Details Tab
//var matchDetailsSheetURLCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=1016205165&single=true&output=csv';
// Display Details Tab
const displayDetailsSheetCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=628628597&single=true&output=csv';



// Ready Events

// First add a DOMContentLoaded event to fire when the HTML DOM is in place and then add a load event listener for when all images and other resources are loaded.
window.addEventListener('DOMContentLoaded', init) // Wait for the window to load and then run the init function below.

// Add a load event listener - which completes after the init() function below - (https://eager.io/blog/how-to-decide-when-your-code-should-run/).
window.addEventListener('load', function () {
    console.log('%c' + '> Dorkinians page images and other resources all loaded.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Provide an initial load message. 

    // console.log("End timer");
    console.timeEnd(); // End the console timer.

    // Increment the component ready count by 1.
    incrementComponentReadyCount("All Resources Loaded");

    // End the rotation of the Dorkinians logo to simulate loading being completed.
    // stopRotateLogo();
});

// Init Function

// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {
    console.log("init() called."); // Log that the init function has been called.
    console.log('%c' + '> Dorkinians page DOM content loaded.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Provide an initial load message.

    // Step 0.
    // console.log('%c' + '> 0. init() called. Code started for each of the three sub processes.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.

    // Close the side menu if open.
    closeNav();

    // Close the pop up box if open.
    closePopUpBox();

    // Reset the readyComponentsCount.
    readyComponentsCount = 0;

    // Initially show the loading text on the loading page using the typewriter effect.
    // Clear the text element, define the initial required variables and then call the typeWriter function.
    document.getElementById("loading-phrase").innerHTML = ""; // Initially clear the HTML text.
    let i = 0; // The integer counter.
    let speed = 50; // The speed/duration of the effect in milliseconds.
    let phraseText = "Loading data into site...";
    typeWriter(); // Call the typeWriter function to update the HTML element with text.
    function typeWriter() { // Typewriter Text Effect. Load the text in in a typewriter effect. https://www.w3schools.com/howto/howto_js_typewriter.asp
        if (i < phraseText.length) {
            document.getElementById("loading-phrase").innerHTML += phraseText.charAt(i); // Get the provided element on the page and add text to it.
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // Call the updateLoadingPage function to change the shown phrase.
    // updateLoadingPage();


    // Step 0. 
    // Side Menu.
    console.log('%c' + '> 0. Side Menu data being loaded in.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.

    // Side Menu data.
    Papa.parse(siteDetailsSheetURLCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: getSideMenuInfo, // The callback to execute when parsing is complete.
    })

    // Drop Down Options.
    console.log('%c' + '> 0. Drop down data being loaded in.', 'background-color: darkblue; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.

    // Drop Down Options Info
    Papa.parse(displayAllowedPlayersSheetCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: false, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: getPlayerDropdownInfo, // The callback to execute when parsing is complete.
    })


    // Step 1. 
    // Homepage Tab.
    console.log('%c' + '> 1. Hompage tab data being loaded in.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.

    // Next Fixtures data.
    Papa.parse(nextFixturesSheetURLCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: getHomepageTabInfo, // The callback to execute when parsing is complete.
    })

    // !function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = 'https://weatherwidget.io/js/widget.min.js'; fjs.parentNode.insertBefore(js, fjs); } }(document, 'script', 'weatherwidget-io-js');

    // Get the next Saturday date and display it.
    let now = new Date();
    let nextSaturdayDate = nextDay(now, 6);
    nextSaturdayDate = new Date(nextSaturdayDate).toLocaleDateString('en-uk', { weekday: "short", year: "numeric", month: "short", day: "numeric" }) // Convert the date. https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/.
    document.getElementById("homepage-next-fixtures-header-text").innerHTML = "Next Fixtures (" + nextSaturdayDate + ")"; // Get the header and update it.


    // Step 2.
    // Club Stats Tab.
    console.log('%c' + '> 2. Club Stats tab data being loaded in.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.

    // Total Club Stats Info
    Papa.parse(totalClubStatsSheetURLCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: getTotalClubStatsInfo, // The callback to execute when parsing is complete.
    })

    // Team Season Results Info
    Papa.parse(teamSeasonResultsSheetURLCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: getTeamSeasonResultsInfo, // The callback to execute when parsing is complete.
    })

    // Update the information bar.
    displayInformation("club-stats-information-bar", "Select a filter to begin reviewing further detailed club stats");


    // Step 3. 
    // Player Stats Tab.
    console.log('%c' + '> 3. Player Stats tab data being loaded in.', 'background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.

    // This Season Stats Info
    Papa.parse(displayThisSeasonStatsSheetCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: getPlayerStatsThisSeasonTabInfo, // The callback to execute when parsing is complete.
    })

    // All Time Stats Info
    Papa.parse(displayAllTimeStatsSheetCSV, {
        download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
        header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
        fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
        complete: getPlayerStatsAllTimeTabInfo, // The callback to execute when parsing is complete.
    })

    // Update the information bar.
    displayInformation("player-stats-information-bar", "Select a player to view their stats. Or just marvel at Slado's achievements...");


    // Step 4. 
    // Team Of The Week Tab.

    // Update the information bar.
    displayInformation("team-of-the-week-information-bar", "Select a week filter to begin reviewing past teams of the week. Or click on a player to see more details");


    // Step 5. 
    // Comparison Tab.

    // Call the showComparisonStatData function to poplate the comparison tab with tooltips.
    showComparisonStatData();

    // Update the information bar.
    displayInformation("comparison-information-bar", "Select a first player to view their all time stats");


    // Step 6. 
    // Tables, Results & Fixtures Tab.

    // Update the information bar.
    displayInformation("tables-results-fixtures-information-bar", "Select a team to see their league table, results and fixtures");

    // Call the updateTablesResultsandFixturesTab function to initially hide all lower team tables etc.
    updateTablesResultsandFixturesTab();

}



// Loading Functions

// Update the phrase text on the page every few seconds.
function updateLoadingPage() {
    // Create a setInterval for every 6 seconds to change the shown phrase.
    let loopPhrases = setInterval(function () {
        let phrasesArrayLength = phrasesArray.length; // Get the length of the phrases array.
        if (phrasesArrayLength === 0) { // Deal with if the array becomes empty.
            console.log("loopPhrases timed out.")
            alert("Page timed out. Please refresh."); // Pass an alert to the user.
        }
        let pickedPhraseNumber = Math.floor(randomNumber(0, phrasesArrayLength)); // Pick a random number between 0 and the length of the array. Round the number down to an integer.
        // console.log("pickedPhraseNumber = " + pickedPhraseNumber); // Log the selected number.
        let phraseText = phrasesArray[pickedPhraseNumber]; // Get the phrase text from the array.
        // console.log("phraseText = " + phraseText); // Log the selected phrase.

        // Reduce down the array removing the selected phrase so that it is not displayed again.
        delete phrasesArray[pickedPhraseNumber]; // Delete the picked element from the array. The delete function only clears the string, leaving an empty element. w3docs.com/snippets/javascript/how-to-remove-an-element-from-an-array-in-javascript.html
        phrasesArray = phrasesArray.filter(function () { // Filter the array to remove the empty elements. https://www.w3docs.com/snippets/javascript/how-to-remove-empty-elements-from-an-array-in-javascript.html
            return true
        });

        // Clear the text element, define the initial required variables and then call the typeWriter function.
        // let loadingPhraseElement = document.getElementById("loading-phrase").innerHTML = phraseText; // Get the loading-phrase element on the page and add text to it.
        document.getElementById("loading-phrase").innerHTML = ""; // Initially clear the HTML text.
        let i = 0; // The integer counter.
        let speed = 50; // The speed/duration of the effect in milliseconds.
        typeWriter(); // Call the typeWriter function to update the HTML element with text.
        function typeWriter() { // Typewriter Text Effect. Load the text in in a typewriter effect. https://www.w3schools.com/howto/howto_js_typewriter.asp
            if (i < phraseText.length) {
                document.getElementById("loading-phrase").innerHTML += phraseText.charAt(i); // Get the provided element on the page and add text to it.
                i++;
                setTimeout(typeWriter, speed);
            }
        }

        // React if the tab ready count matches the number of tabs.
        if (readyComponentsCount === numberReadyComponents || readyComponentsCount >= numberReadyComponents) {
            hideLoadingPage(); // Call the function to fade out the loading page.
            clearInterval(loopPhrases); // Cancel the setInterval and escape it.
        }
    }, 6000);
}

// Increment the component ready count until it matches with the numberReadyComponents.
function incrementComponentReadyCount(tabName) {
    readyComponentsCount = readyComponentsCount + 1;
    console.log('%c' + '> readyComponentsCount (' + tabName + ') = ' + readyComponentsCount + '/' + numberReadyComponents, 'background-color: red; color: white; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.
}

// Hide the loading page as all tabs have returned as ready.
function hideLoadingPage() {
    console.log("Loading Page hidden as all tabs are ready.")
    let loadingPageElement = document.getElementById("loading-page"); // Get the loading-page element on the page.
    loadingPageElement.classList.add("fadeout"); // Add the hidden class to the loading-page element.
    // Allow for a second to pass (the same duration of the fadeout css animation) and then permanently add the hidden class to the loading page div so that the user can select things below it.
    setInterval(function () {
        loadingPageElement.classList.add("hidden"); // Add the hidden class to the loading-page element.
    }, 1000);
}



// 0. Side Menu and Other Functions

// 0.1. Side Menu data "getter" function.
function getSideMenuInfo(results) {
    // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
    console.log('%c' + '>> getSideMenuInfo.', 'background-color: yellow; color:black; padding: 0.5em 0em; font-weight: bold;');

    // Process the original array of objects received.
    displaySiteDetailsArrayOfObjects = results.data // Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
    // console.log("Global variable 'displaySiteDetailsArrayOfObjects' defined:"); // Log the global variable.
    // console.log(displaySiteDetailsArrayOfObjects); // Log the global variable.
    showSideMenuInfo(displaySiteDetailsArrayOfObjects); // Call the showSideMenuInfo function.
}

// 0.2. Side Menu data "show-er" function.
function showSideMenuInfo(results) {
    // Display the retrieved data onto the page.
    console.log('%c' + '>> showSideMenuInfo.', 'background-color: yellow; color:black; padding: 0.5em 0em; font-weight: bold;');

    // Set the dataArrayOfObjects.
    const dataArrayOfObjects = results; // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.

    // console.log(dataArrayOfObjects); // Log the received array of objects.
    var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
    // console.log("Original Length of dataArrayOfObjects = " + objectLength); // Log the original length.

    // Populate the site details information into the side menu.

    // var versionNumber = displaySiteDetailsArrayOfObjects[0]["Version Number"];
    // console.log(versionNumber);

    // Work down the DOM, finding the 'side-menu-component' element and then look inside it for ids to populate.
    document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu-site-details-version-number-text').innerHTML = displaySiteDetailsArrayOfObjects[0]["Version Number"]; // Add the text to the side menu.
    document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu-site-details-current-season-text').innerHTML = displaySiteDetailsArrayOfObjects[0]["Current Season"]; // Add the text to the side menu.
    document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu-site-details-last-updated-stats-text').innerHTML = displaySiteDetailsArrayOfObjects[0]["Last Updated Stats"]; // Add the text to the side menu.
    document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu-site-details-page-details-last-refereshed-text').innerHTML = displaySiteDetailsArrayOfObjects[0]["Page Details Last Refreshed"]; // Add the text to the side menu.

    // Increment the component ready count by 1.
    incrementComponentReadyCount("Side Menu");
}

// 0.3. Player Dropdown data "getter" function.
function getPlayerDropdownInfo(results) {
    // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
    console.log('%c' + '>> getPlayerDropdownInfo.', 'background-color: darkblue; color:white; padding: 0.5em 0em; font-weight: bold;');

    // Process the original array of objects received.
    displayAllowedPlayersArrayOfObjects = results.data // Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
    // console.log("Global variable 'displayAllowedPlayersArrayOfObjects' defined:"); // Log the global variable.
    // console.log(displayAllowedPlayersArrayOfObjects); // Log the global variable.
    populateDropdownList(displayAllowedPlayersArrayOfObjects, 'player-stats-selection-dropdown'); // Call the addPlayerDropdownInfo function.
}



// Tab Functions

// 1. Homepage Tab

// 1.1. Homepage tab data "getter" function.
function getHomepageTabInfo(results) {
    // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
    console.log('%c' + '>> getHomepageTabInfo.', 'background-color: orange; color:black; padding: 0.5em 0em; font-weight: bold;');

    // Process the original array of objects received.
    displayNextFixturesArrayOfObjects = results.data // Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
    // console.log("Global variable 'displayNextFixturesArrayOfObjects' defined:"); // Log the global variable.
    // console.log(displayNextFixturesArrayOfObjects); // Log the global variable.
    showHomepageTabInfo(displayNextFixturesArrayOfObjects); // Call the showHomepageTabInfo function.
}

// 1.2. Homepage tab data "show-er" function.
function showHomepageTabInfo(results) {
    // Display the retrieved data onto the page.
    console.log('%c' + '>> showHomepageTabInfo.', 'background-color: orange; color:black; padding: 0.5em 0em; font-weight: bold;');

    // Set the dataArrayOfObjects.
    const dataArrayOfObjects = results; // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.
    // console.log(dataArrayOfObjects); // Log the received array of objects.
    var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
    // console.log("Original Length of dataArrayOfObjects = " + objectLength); // Log the original length.

    // console.log("dataArrayOfObjects[0]");
    // console.log(dataArrayOfObjects[0]);

    // Populate the team next fixtures information on the page.

    // Define an array of teams to update. Each stat corresponds to an HTML element.
    let teamArray = ["1stXI", "2ndXI", "3rdXI", "4thXI", "5thXI", "6thXI", "7thXI", "8thXI"];
    for (let i = 0; i < teamArray.length; i++) {

        var teamFixtureObject = dataArrayOfObjects[i];
        // console.log(teamArray[i]); // Log the team being updated.
        document.getElementById(teamArray[i] + "-Opposition").innerHTML = teamFixtureObject['NEXTOPPO']; // Get the Opposition text element and add the text to it.
        document.getElementById(teamArray[i] + "-Location").innerHTML = teamFixtureObject['LOCATION']; // Get the Location text element and add the text to it.
        document.getElementById(teamArray[i] + "-Competition").innerHTML = teamFixtureObject['COMPETITION']; // Get the Competition text element and add the text to it.
        document.getElementById(teamArray[i] + "-LastResult").innerHTML = teamFixtureObject['LASTRESULT']; // Get the LastResult text element and add the text to it.

    }

    // Increment the component ready count by 1.
    incrementComponentReadyCount("Homepage");
}



// 2. Club/Team Stats Tab

// 2.1 Total Club Stats

// 2.1.1. Total Club Stats Info data "getter" function.
function getTotalClubStatsInfo(results) {
    // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
    console.log('%c' + '>> getTotalClubStatsInfo.', 'background-color: pink; color:black; padding: 0.5em 0em; font-weight: bold;');

    // Process the original array of objects received.
    displayTotalClubStatsArrayOfObjects = results.data // Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
    // console.log("Global variable 'displayNextFixturesArrayOfObjects' defined:"); // Log the global variable.
    // console.log(displayNextFixturesArrayOfObjects); // Log the global variable.
    showTotalClubStatsInfo(displayTotalClubStatsArrayOfObjects); // Call the showTotalClubStatsInfo function.
}

// 2.1.2. Total Club Stats data "show-er" function.
function showTotalClubStatsInfo(results) {
    // Display the retrieved data onto the page.
    console.log('%c' + '>> showTotalClubStatsInfo.', 'background-color: pink; color:black; padding: 0.5em 0em; font-weight: bold;');

    // Set the dataArrayOfObjects.
    const dataArrayOfObjects = results; // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.

    // console.log(dataArrayOfObjects); // Log the received array of objects.
    var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
    // console.log("Original Length of dataArrayOfObjects = " + objectLength); // Log the original length.

    // Get the drop down selection values to be used for displaying the correct information.

    // Season selection.
    var seasonValueDropdown = document.getElementById("club-stats-season-selection-dropdown"); // Get the season selected dropdown.
    var seasonValue = seasonValueDropdown.options[seasonValueDropdown.selectedIndex].text; // Get the season selected. (https://stackoverflow.com/a/8549358/14290169).

    // Team selection.
    var teamValueDropdown = document.getElementById("club-stats-team-selection-dropdown"); // Get the team selected dropdown.
    var teamValue = teamValueDropdown.options[teamValueDropdown.selectedIndex].text; // Get the team selected. (https://stackoverflow.com/a/8549358/14290169).

    // Create an ID to lookup and match to in the passed data.
    var lookUpID = seasonValue + " - " + teamValue;
    // console.log("lookUpID =");
    // console.log(lookUpID);

    // Loop through the passed data and get the row of data to be displayed and used.
    var arrayNumberRef = 0;
    for (let i = 0; i < objectLength; i++) {
        // console.log(i); // Log the number being run through.
        // console.log("dataArrayOfObjects[i]['ID']");
        // console.log(dataArrayOfObjects[i]['ID']);
        if (dataArrayOfObjects[i]["ID"] === lookUpID) {
            arrayNumberRef = i;
        }
    }

    // Get an object from the array by creating an object from the first array value.
    let statObject = dataArrayOfObjects[arrayNumberRef];

    // Populate the team next fixtures information on the page.

    // Update the main header text.
    if (teamValue === "Whole club") {
        document.getElementById("club-stats-main-header-text").innerHTML = "Club Stats"; // Get the main header text element and add the text to it.
        document.getElementById("club-stats-tab-text").innerHTML = "Club Stats"; // Get the tab text element and add the text to it.
        // Update the information bar.
        displayInformation("club-stats-information-bar", "Select a filter to begin reviewing further detailed club stats");
    } else {
        document.getElementById("club-stats-main-header-text").innerHTML = "Team Stats"; // Get the main header text element and add the text to it.
        document.getElementById("club-stats-tab-text").innerHTML = "Team Stats"; // Get the tab text element and add the text to it.
        // Update the information bar.
        displayInformation("club-stats-information-bar", "You can select 'Whole club' to switch back to Club stats.");
    }

    // Update the header text.
    document.getElementById("club-team-stats-header-text").innerHTML = teamValue + " Stats"; // Get the header text element and add the text to it.

    // Define an array of stats to update. Each stat corresponds to an HTML element.
    let statArray = ["numberGamesPlayed", "numberLeagueGamesPlayed", "numberCupGamesPlayed", "numberFriendlyGamesPlayed", "numberPlayers", "numberGoalsScored", "goalsPerGame", "numberGoalsConceded", "goalsConcededPerGame", "numberGoalscorers", "topGoalscorer"];
    for (let i = 0; i < statArray.length; i++) {
        // console.log(statArray[i]); // Log the stat being updated.
        document.getElementById("club-team-stats-" + statArray[i]).innerHTML = statObject[statArray[i]]; // Get the stat text element and add the text to it.
    }

    // Increment the component ready count by 1.
    incrementComponentReadyCount("Club Stats - Total Club Stats");
}

// 2.1.3. Total Club Stats data "update-er" function.

// For updater function - see full tab updater below (section 2.4).

// 2.2 Teams Season Results

// 2.2.1. Team Season Results Info data "getter" function.
function getTeamSeasonResultsInfo(results) {
    // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
    console.log('%c' + '>> getTeamSeasonResultsInfo.', 'background-color: pink; color:black; padding: 0.5em 0em; font-weight: bold;');

    // Process the original array of objects received.
    displayTeamSeasonResultsArrayOfObjects = results.data // Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
    // console.log("Global variable 'displayNextFixturesArrayOfObjects' defined:"); // Log the global variable.
    // console.log(displayNextFixturesArrayOfObjects); // Log the global variable.
    showTeamSeasonResultsInfo(displayTeamSeasonResultsArrayOfObjects); // Call the showTeamSeasonResultsInfo function.
}

// 2.2.2. Team Season Results Info data "show-er" function.
function showTeamSeasonResultsInfo(results) {
    // Display the retrieved data onto the page.
    console.log('%c' + '>> showTeamSeasonResultsInfo.', 'background-color: pink; color:black; padding: 0.5em 0em; font-weight: bold;');

    // Set the dataArrayOfObjects.
    const dataArrayOfObjects = results; // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.

    // console.log(dataArrayOfObjects); // Log the received array of objects.
    var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
    // console.log("Original Length of dataArrayOfObjects = " + objectLength); // Log the original length.

    // Filter the array of objects down. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
    // Season selection.
    var seasonValueDropdown = document.getElementById("club-stats-season-selection-dropdown"); // Get the season selected dropdown.
    var seasonValue = seasonValueDropdown.options[seasonValueDropdown.selectedIndex].text; // Get the season selected. (https://stackoverflow.com/a/8549358/14290169).
    // Catch if the season value isn't a filterable value.
    if (seasonValue === "All Seasons") {
        seasonValue = "";
    }
    // console.log("seasonValue = " + seasonValue);

    // Team selection.
    var teamValueDropdown = document.getElementById("club-stats-team-selection-dropdown"); // Get the team selected dropdown.
    var teamValue = teamValueDropdown.options[teamValueDropdown.selectedIndex].text; // Get the team selected. (https://stackoverflow.com/a/8549358/14290169).
    // Catch if the team value isn't a filterable value.
    if (teamValue === "Whole club") {
        teamValue = "";
    }
    // console.log("teamValue = " + teamValue);

    // Filter for all selections.
    // Re-use the re-usable function but don't pass all arguments.
    const filteredArrayOfObjects = multiFilterArrayOfObjects(dataArrayOfObjects, true, "SEASON", seasonValue, "PLAYER NAME", "Player", "TEAM", teamValue, "LOCATION", "Location"); // Call the created filterArrayOfObjects function.

    // console.log(filteredArrayOfObjects); // Log the filtered array of objects.
    objectLength = filteredArrayOfObjects.length; // Get the new length of the array.
    // console.log("New Length = " + objectLength); // Log the original length.

    // Call the clearTable and createFullTable functions, passing the table selector on which element to act on.
    clearTable("#team-season-results-table"); // Call the clearTable function to empty the table.
    createFullTable(filteredArrayOfObjects, "#team-season-results-table", true, "object"); // Call the createFullTable function, passing the data from PapaParse.

    // Increment the component ready count by 1.
    incrementComponentReadyCount("Club Stats - Teams Season Results");
}

// 2.2.3. Team Season Results Info data "update-er" function.

// For updater function - see full tab updater below (section 2.4).

// 2.3 All Club Results

// 2.4. Full Club Stats data "update-er" function.
function updateClubStatsInfo() {
    // Create a function that is called when the user changes the team dropdown. This function is called from the HTML select elements.

    // Display the refreshed data onto the page.
    console.log('%c' + '>> updateClubStatsInfo.', 'background-color: pink; color:black; padding: 0.5em 0em; font-weight: bold;');

    // Start the rotation of the Dorkinians logo to simulate loading.
    rotateLogo("dorkinians-header-logo");

    // Re-call the Team Season shower function to restart the process of showing data.
    showTotalClubStatsInfo(displayTotalClubStatsArrayOfObjects); // Call the showTotalClubStatsInfo function.

    // Re-call the Team Season shower function to restart the process of showing data.
    showTeamSeasonResultsInfo(displayTeamSeasonResultsArrayOfObjects); // Call the showTeamSeasonResultsInfo function.

    // End the rotation of the Dorkinians logo to simulate loading being completed.
    stopRotateLogo("dorkinians-header-logo");
}



// 3. Player Stats Tab

// Player Stats tab needs to process two data parses, "displayThisSeasonStats" and "displayAllTimeStats".

// 3.1.a. Player Stats This Season stats tab data "getter" function.
function getPlayerStatsThisSeasonTabInfo(results) {
    // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
    console.log('%c' + '>> getPlayerStatsThisSeasonTabInfo.', 'background-color: blue; color:white; padding: 0.5em 0em; font-weight: bold;');

    // Process the original array of objects received.
    displayThisSeasonStatsArrayOfObjects = results.data // Define the global variable "displayThisSeasonStatsArrayOfObjects" to be used later on. Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
    // console.log("Global variable 'displayThisSeasonStatsArrayOfObjects' defined:"); // Log the global variable.
    // console.log(displayThisSeasonStatsArrayOfObjects); // Log the global variable.
    showPlayerStatsThisSeasonTabInfo(displayThisSeasonStatsArrayOfObjects); // Call the showPlayerStatsThisSeasonTabInfo function.
}

// 3.1.b. Player Stats All Time stats tab data "getter" function.
function getPlayerStatsAllTimeTabInfo(results) {
    // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
    console.log('%c' + '>> getPlayerStatsAllTimeTabInfo.', 'background-color: blue; color:white; padding: 0.5em 0em; font-weight: bold;');

    // Process the original array of objects received.
    displayAllTimeStatsArrayOfObjects = results.data // Define the global variable "displayAllTimeStatsArrayOfObjects" to be used later on. Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
    // console.log("Global variable 'displayAllTimeStatsArrayOfObjects' defined:"); // Log the global variable.
    // console.log(displayAllTimeStatsArrayOfObjects); // Log the global variable.
    showPlayerStatsAllTimeTabInfo(displayAllTimeStatsArrayOfObjects); // Call the showPlayerStats function.
}

// 3.2.a. Player Stats This Season tab data "show-er" function.
function showPlayerStatsThisSeasonTabInfo(results) {
    // Display the retrieved data onto the page.
    console.log('%c' + '>> showPlayerStatsThisSeasonTabInfo.', 'background-color: blue; color:white; padding: 0.5em 0em; font-weight: bold;');

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
    // console.log("Selected player (playerValue) = " + playerValue);

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

    // Stat Category selection.
    const statCategoryValueDropdown = document.getElementById("player-stats-this-season-stats-category-selection"); // Get the stat category selected dropdown.
    const statCategoryValue = statCategoryValueDropdown.options[statCategoryValueDropdown.selectedIndex].value; // Get the stat category selected. (https://stackoverflow.com/a/8549358/14290169).
    // console.log("Selected stat category (statCategoryValue) = " + statCategoryValue);

    // Populate the stats information on the page.

    // Define an array of stats from the Global statObject.
    const statsArray = Object.keys(statObject);
    // console.log(statsArray); // Log the created array to see all of the stats to be looped through.

    // Group the next set of logs together to avoid cluttering the console.
    console.groupCollapsed("ShowPlayerStatsThisSeasonTabInfo Info Logs"); // Group further console logs. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

    // Loop through the created stat array. Each stat corresponds to an HTML element in the This Seasons Grid.
    for (let i = 0; i < statsArray.length; i++) {
        console.log("Stat = " + statsArray[i] + ", format = " + statObject[statsArray[i]].statFormat); // Log the stat being updated and it's format.

        // Add a try catch around dynamically updating HTML elements as not all stats object to be used. 
        try {
            // Dynamically add a tool tip to every stat container div, assigning the stst description from the Global Stat Object.
            let containerElement = document.getElementById("player-stats-this-season-" + statsArray[i] + "-container"); // Get the container element dynamically.
            const toolTipSpanElement = document.createElement("span"); // Create a span element.
            toolTipSpanElement.className = "stats-tooltip-text" // Apply the correct CSS class to the span element.
            var toolTipText = document.createTextNode(statObject[statsArray[i]].description);
            toolTipSpanElement.appendChild(toolTipText); // Append the new tool tip text to the new span element.
            containerElement.appendChild(toolTipSpanElement); // Apppend the span element to the container element.
            containerElement.classList.add("stats-tooltip"); // Apply the correct CSS class to the container element.

            // Update the displayed stat value after correctly formatting the stat value.
            var TextElement = document.getElementById("player-stats-this-season-" + statsArray[i]); // Get the Text Element dynamically.
            var StatFormat = statObject[statsArray[i]].statFormat; // Get the stat format from the global stat object. 
            if (StatFormat == "Integer") { // Convert the stat to an integer.
                var displayText = Number(filteredArrayOfObjects[0][statsArray[i]]).toLocaleString("en-UK"); // Use a dynamic [statArray[i]] key. Convert the stat to a number and then add a comma by using the "toLocaleString" method.
            } else if (StatFormat == "Decimal2") { // Convert the stat to 2 decimal places.
                var displayText = Number(filteredArrayOfObjects[0][statsArray[i]]).toFixed(2); // Use a dynamic [statArray[i]] key. Convert the stat to a number to 2 decimal places by using the "toFixed" method.
            } else if (StatFormat == "Decimal1") { // Convert the stat to 1 decimal places.
                var displayText = Number(filteredArrayOfObjects[0][statsArray[i]]).toFixed(1); // Use a dynamic [statArray[i]] key. Convert the stat to a number to 1 decimal places by using the "toFixed" method.
            } else { // For all else, including percentages and strings, just display as passed.
                var displayText = filteredArrayOfObjects[0][statsArray[i]]; // Do nothing to passed value.
            }
            TextElement.innerHTML = displayText; // Add the text to the HTML element.
            // console.log("displayText = " + displayText); // Log the text that will be displayed.

            // Hide the stats that should not be shown based on the users selection.
            if (statCategoryValue == "All") {
                // Remove the hidden class from this container element as it should be shown.
                containerElement.classList.remove("hidden"); // Remove the hidden CSS class from the container element.
            }
            else if (statObject[statsArray[i]].statCategory == statCategoryValue) {
                // Remove the hidden class from this container element as it should be shown.
                containerElement.classList.remove("hidden"); // Remove the hidden CSS class from the container element.
            } else {
                // Add the hidden class to this container element as it should not be shown.
                containerElement.classList.add("hidden"); // Apply the hidden CSS class to the container element.
            }

        }
        catch (err) {
            console.log("Stat = " + statsArray[i] + " not found on sheet so skipping.");
        }
    }

    console.groupEnd(); // End the log grouping. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

    // Increment the component ready count by 1.
    incrementComponentReadyCount("Player Stats - This Season Stats");
}

// 3.2.b. Player Stats All Time tab data "show-er" function.
function showPlayerStatsAllTimeTabInfo(results) {
    // Display the retrieved data onto the page.
    console.log('%c' + '>> showPlayerStatsAllTimeTabInfo.', 'background-color: blue; color:white; padding: 0.5em 0em; font-weight: bold;');

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
    // console.log("Selected player (playerValue) = " + playerValue);

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

    // Define an array of stats and seasons to update. Each stat and season combine to correspond to an HTML element in the Past Seasons Table.
    let statArray = ["APP", "M", "MOM", "G", "A", "Y", "R", "OG", "C", "CLS", "GperAPP", "CperAPP", "MperG"];
    let seasonArray = ["2016/17", "2017/18", "2018/19"];
    // for (let i = 0; i < statArray.length; i++) {
    //     // console.log(statArray[i]); // Log the stat being updated.
    //     for (let j = 0; j < seasonArray.length; j++) {
    //         // console.log(seasonArray[j]); // Log the season being updated.
    //         // console.log("player-stats-past-seasons-" + seasonArray[j] + "-" + statArray[i]); // Log the id of the text element being updated.
    //         var TextElement = document.getElementById("player-stats-past-seasons-" + seasonArray[j] + "-" + statArray[i]); // Get the Text Element dynamically.
    //         var displayText = Number(filteredArrayOfObjects[0][statArray[i]]).toLocaleString("en-UK"); // Use a dynamic [statArray[i]] key. Convert the stat to a number and then add a comma by using the "toLocaleString" method.
    //         TextElement.innerHTML = displayText; // Add the text to the HTML element.
    //     }

    //     // player-stats-past-seasons-2016/17-appearances

    //     // console.log("displayText = " + displayText); // Log the text that will be displayed.

    // }

    // Increment the component ready count by 1.
    incrementComponentReadyCount("Player Stats - All Time Stats");
}

// 3.3. Player Stats tab data "update-er" function.
function showPlayerStatsTabUpdatedInfo() {
    // Create a function that is called when the user changes the team dropdown. This function is called from the HTML select elements.

    // Start the rotation of the Dorkinians logo to simulate loading.
    rotateLogo("dorkinians-header-logo");

    // Call the update to the This Season grid.
    showPlayerStatsThisSeasonTabInfo(displayThisSeasonStatsArrayOfObjects);

    // Call the update to all other All Time stats.
    showPlayerStatsAllTimeTabInfo(displayAllTimeStatsArrayOfObjects);

    // End the rotation of the Dorkinians logo to simulate loading being completed.
    stopRotateLogo("dorkinians-header-logo");
}



// 4. Team of the Week Tab



// 5. Comparison Tab

// 5.1. Comparison tab data "getter" function.

// There is no Comparison tab data "getter" function.

// 5.2. Comparison tab data "show-er" function.
function showComparisonStatData() {
    // Initially load in all stats tooltips to the stat containers.
    console.log('%c' + '>> showComparisonStatData.', 'background-color: grey; color:black; padding: 0.5em 0em; font-weight: bold;');

    // Define an array of stats from the Global statObject.
    const statsArray = Object.keys(statObject);
    // console.log(statsArray); // Log the created array to see all of the stats to be looped through.

    // Group the next set of logs together to avoid cluttering the console.
    console.groupCollapsed("showComparisonStatData Info Logs"); // Group further console logs. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

    // Loop through the stat array calling in the load stat data function but not filling up the bars.
    for (let i = 0; i < statsArray.length; i++) {

        // Add a try catch around dynamically updating HTML elements as not all stats object to be used. 
        try {
            // Dynamically add a tool tip to every stat container div, assigning the stst description from the Global Stat Object.
            let containerElement = document.getElementById("comparison-" + statsArray[i] + "-container"); // Get the container element dynamically.               
            const toolTipSpanElement = document.createElement("span"); // Create a span element.
            toolTipSpanElement.className = "stats-tooltip-text" // Apply the correct CSS class to the span element.
            var toolTipText = document.createTextNode(statObject[statsArray[i]].description);
            toolTipSpanElement.appendChild(toolTipText); // Append the new tool tip text to the new span element.
            containerElement.appendChild(toolTipSpanElement); // Apppend the span element to the container element.
            containerElement.classList.add("stats-tooltip"); // Apply the correct CSS class to the container element.

            console.log("Stat = " + statsArray[i] + " found on sheet so populating."); // Log the successful action.
        }
        catch (err) {
            console.warn("Stat = " + statsArray[i] + " not found on sheet so skipping."); // Log the unsuccessful action as a warning.
        }

    }

    console.groupEnd(); // End the log grouping. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/
}

// 5.3. Comparison tab data "update-er" functions.
function updateComparisonStatData() {
    // Reset all stats bars on the Comparison tab.
    resetStatsBars();

    let player1NameDropdown = document.getElementById("comparison-player-1-dropdown"); // Get the player 1 dropdown.
    let player1NameValue = player1NameDropdown.options[player1NameDropdown.selectedIndex].text; // Get the player selected. (https://stackoverflow.com/a/8549358/14290169).
    // console.log("Selected player 1 (player1NameValue) = " + player1NameValue);

    let player2NameDropdown = document.getElementById("comparison-player-2-dropdown"); // Get the player 2 dropdown.
    let player2NameValue = player2NameDropdown.options[player2NameDropdown.selectedIndex].text; // Get the player selected. (https://stackoverflow.com/a/8549358/14290169).
    // console.log("Selected player 2 (player2NameValue) = " + player2NameValue);

    // Define an array of stats from the Global statObject.
    const statsArray = Object.keys(statObject);
    // console.log(statsArray); // Log the created array to see all of the stats to be looped through.

    // Group the next set of logs together to avoid cluttering the console.
    console.groupCollapsed("UpdateComparisonStatData Info Logs"); // Group further console logs. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

    if (player1NameValue === "Select Player 1" && player2NameValue === "Select Player 2") {
        // Do nothing as neither dropdown has had anything selected.
        console.log("Neither dropdown has a player selected.");
        // Update the information bar.
        displayInformation("comparison-information-bar", "Select a first player to view their stats");
        // Loop through the stat array calling in the load stat data function but not filling up the bars.
        for (let i = 0; i < statsArray.length; i++) {
            // Add a try catch around dynamically updating HTML elements as not all stats object to be used. 
            try {
                loadInComparisonStatNumbers(statsArray[i], player1NameValue, player2NameValue, false);
                console.log("Stat = " + statsArray[i] + " found on sheet so populating."); // Log the successful action.
            }
            catch (err) {
                console.warn("Stat = " + statsArray[i] + " not found on sheet so skipping."); // Log the unsuccessful action as a warning.
            }
        }
    } else if (player1NameValue === "Select Player 1") {
        // Player 1 dropdown is blank so fill in details for player 2.
        console.log("Player 1 dropdown is blank so fill in details for player 2.");
        // Update the information bar.
        displayInformation("comparison-information-bar", "Select a second player to compare to");
        // Loop through the stat array calling in the load stat data function but not filling up the bars.
        for (let i = 0; i < statsArray.length; i++) {
            // Add a try catch around dynamically updating HTML elements as not all stats object to be used. 
            try {
                loadInComparisonStatNumbers(statsArray[i], player1NameValue, player2NameValue, false);
                console.log("Stat = " + statsArray[i] + " found on sheet so populating."); // Log the successful action.
            }
            catch (err) {
                console.warn("Stat = " + statsArray[i] + " not found on sheet so skipping."); // Log the unsuccessful action as a warning.
            }
        }
    } else if (player2NameValue === "Select Player 2") {
        // Player 2 dropdown is blank so fill in details for player 1.
        console.log("Player 2 dropdown is blank so fill in details for player 1.");
        // Update the information bar.
        displayInformation("comparison-information-bar", "Select a second player to compare to");
        // Loop through the stat array calling in the load stat data function but not filling up the bars.
        for (let i = 0; i < statsArray.length; i++) {
            // Add a try catch around dynamically updating HTML elements as not all stats object to be used. 
            try {
                loadInComparisonStatNumbers(statsArray[i], player1NameValue, player2NameValue, false);
                console.log("Stat = " + statsArray[i] + " found on sheet so populating."); // Log the successful action.
            }
            catch (err) {
                console.warn("Stat = " + statsArray[i] + " not found on sheet so skipping."); // Log the unsuccessful action as a warning.
            }
        }
    } else if (player1NameValue === player2NameValue) {
        // Both dropdowns are the same.
        console.log("Both dropdowns are the same.");
        // Update the information bar.
        displayInformation("comparison-information-bar", "Why are you comparing the same player you weirdo?");
        // Loop through the stat array calling in the load stat data function and filling the bars.
        for (let i = 0; i < statsArray.length; i++) {
            // Add a try catch around dynamically updating HTML elements as not all stats object to be used. 
            try {
                loadInComparisonStatNumbers(statsArray[i], player1NameValue, player2NameValue, true);
                console.log("Stat = " + statsArray[i] + " found on sheet so populating."); // Log the successful action.
            }
            catch (err) {
                console.warn("Stat = " + statsArray[i] + " not found on sheet so skipping."); // Log the unsuccessful action as a warning.
            }
        }
    } else {
        // Both player 1 and player 2 dropdowns are populated so fill in details for both players and load stat bars.
        console.log("Both dropdowns are populated so complete all details.");
        // Update the information bar.
        displayInformation("comparison-information-bar", "Click on any stat row to see an explanation of the stat");
        // Loop through the stat array calling in the load stat data function and filling the bars.
        for (let i = 0; i < statsArray.length; i++) {
            // Add a try catch around dynamically updating HTML elements as not all stats object to be used. 
            try {
                loadInComparisonStatNumbers(statsArray[i], player1NameValue, player2NameValue, true);
                console.log("Stat = " + statsArray[i] + " found on sheet so populating."); // Log the successful action.
            }
            catch (err) {
                console.warn("Stat = " + statsArray[i] + " not found on sheet so skipping."); // Log the unsuccessful action as a warning.
            }
        }
    }

    console.groupEnd(); // End the log grouping. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/
}

// Sub function to load in the correct stat numbers. Called from updateComparisonStatData above.
function loadInComparisonStatNumbers(statName, player1Name, player2Name, fillBarsBoolean) {
    // Use the global variable "displayAllTimeStatsArrayOfObjects" and filter it down for the defined player name.
    // console.log(displayAllTimeStatsArrayOfObjects); // Log the received array of objects.
    var objectLength = displayAllTimeStatsArrayOfObjects.length; // Get the original length of the array.
    // console.log("Original Length of displayAllTimeStatsArrayOfObjects = " + objectLength); // Log the original length.

    // Define the higherBetterBoolean from the Global Stat Object.
    let higherBetterBoolean = statObject[statName].statHigherBetterBoolean; // Get the statHigherBetterBoolean from the global stat object. 
    // console.log("higherBetterBoolean"); // Log the retrieved higherBetterBoolean.
    // console.log(higherBetterBoolean); // Log the retrieved higherBetterBoolean.

    // Do below code for both player 1 and player 2.
    // Define an array of players to update. Each stat corresponds to an HTML element.
    let playerArray = ["", "", ""]; // Define a blank array initially to populate with player names.
    // Set up the player array based on the names selected on the comparison tab. Create blank names if yet to be selected.
    if (player1Name === "Select Player 1") {
        playerArray = ["", "", player2Name]; // First value is blank (as this offsets the for loop below to align the loop with the HTML element references being 1 and 2).
    } else if (player2Name === "Select Player 2") {
        playerArray = ["", player1Name, ""]; // First value is blank (as this offsets the for loop below to align the loop with the HTML element references being 1 and 2).
    } else {
        playerArray = ["", player1Name, player2Name]; // First value is blank (as this offsets the for loop below to align the loop with the HTML element references being 1 and 2).
    }
    let statValueArray = ["", "", ""]; // Define a blank array to populate with stat values.
    // console.log(playerArray);

    // Stat Category selection.
    const statCategoryValueDropdown = document.getElementById("comparison-category-selection"); // Get the stat category selected dropdown.
    const statCategoryValue = statCategoryValueDropdown.options[statCategoryValueDropdown.selectedIndex].value; // Get the stat category selected. (https://stackoverflow.com/a/8549358/14290169).
    console.log("Selected stat category (statCategoryValue) = " + statCategoryValue);

    // Loop through the created player array.
    for (let i = 1; i < playerArray.length; i++) {

        // Check if the player name in the array is blank and skip it if it is.
        if (playerArray[i] == "") {

            // As the player name is blank (or still "Select Player 1/2") then fill in the stats as blank.
            var TextElement = document.getElementById("comparison-" + statName + "-player-" + i + "-value"); // Get the Text Element dynamically.
            TextElement.innerHTML = ''; // Add the text to the HTML element.

        } else {
            // console.log("Filtering 'filteredArrayOfObjects' for player: " + playerArray[i]);

            // Filter for the selection.
            // Filter down the entire array to find the players data. Re-use the re-usable function. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
            const filteredArrayOfObjects = filterArrayOfObjects(displayAllTimeStatsArrayOfObjects, "NAME", playerArray[i]); // Call the created filterArrayOfObjects function.
            // console.log("filteredArrayOfObjects = "); // Log the filtered array of objects.
            // console.log(filteredArrayOfObjects); // Log the filtered array of objects.
            objectLength = filteredArrayOfObjects.length; // Get the new length of the array.
            // console.log("New Length of dataArrayOfObjects = " + objectLength); // Log the original length.
            if (objectLength > 1) { // If the objectLength is greater than 1, flag an alert error.
                alert("More than one record returned for player selected!");
            }

            // Populate the stats information on the page.
            // console.log("The stat being updated is " + statName + "."); // Log the stat being updated.
            var TextElement = document.getElementById("comparison-" + statName + "-player-" + i + "-value"); // Get the Text Element dynamically.
            var selectedStatValue = filteredArrayOfObjects[0][statName]; // Initially save the value returned ready for later use in the comparison array.
            var displayText = formatValue(filteredArrayOfObjects[0][statName], statObject[statName].statFormat); // Format the received value into the correctly defined stat format from the Global Stat Object.
            console.warn(displayText);
            TextElement.innerHTML = displayText; // Add the text to the HTML element.

            // Populate the statValueArray with the recorded score for later comparison.
            statValueArray[i] = parseFloat(selectedStatValue); // Use parseFloat() to turn them into float values instead of strings - https://stackoverflow.com/a/6442038/14290169.
            // console.log("statValueArray[i] = " + parseFloat(selectedStatValue));

            // Fill bars if the passed boolean is true.
            if (fillBarsBoolean === true) {
                // Fill the bars as the boolean is true.
                // console.log("Filling the stats bars as fillBarsBoolean is true.");

                // Fill the bars using setTimeout to trigger the re-animation of the bars filling. https://stackoverflow.com/a/36676399/14290169.
                setTimeout(function () {
                    var BarElement = document.getElementById("comparison-" + statName + "-player-" + i + "-bar"); // Get the Bar Element dynamically.
                    BarElement.style.animation = "progress-animation 3s forwards"; // Apply the animation (written in CSS file).
                    // console.log("BarElement.style.animation:");
                    // console.log(BarElement.style.animation);
                }, 1)

            } else {
                // Do nothing as fillBarsBoolean is false.
                // console.log("Not filling the stats bars as fillBarsBoolean is false.");
            }
        }
    }

    // Log the stat being modified.
    // console.log("For stat: " + statName + ", the statValueArray is " + statValueArray);

    // Add and remove coloured classes based on the stat value comparison.
    if (fillBarsBoolean === true) {
        if (statValueArray[1] === statValueArray[2]) {
            // console.log("Ensure both bars are white as the stats are equal.")
            // Remove any left over yellow colour from both bars.
            BarElement = document.getElementById("comparison-" + statName + "-player-1-bar").classList.remove("yellow"); // Get the player 1 Bar Element dynamically and remove the yellow class from the selected element.
            BarElement = document.getElementById("comparison-" + statName + "-player-2-bar").classList.remove("yellow"); // Get the player 2 Bar Element dynamically and remove the yellow class from the selected element.
        } else {
            // One of the stats is higher.
            if (higherBetterBoolean === true) {
                // Colour the bars based on the higher value being better and therefore being better.
                // console.log("As higherBetterBoolean is true, colour the higher stat value yellow.")
                if (statValueArray[1] > statValueArray[2]) {
                    // console.log("As statValueArray[1]: " + statValueArray[1] + " > statValueArray[2]: " + statValueArray[2] + ", make the left bar yellow.")
                    // Player 1 stats are higher so colour the left bar yellow.
                    BarElement = document.getElementById("comparison-" + statName + "-player-1-bar").classList.add("yellow");; // Get the player 1 Bar Element dynamically and add the yellow class from the selected element.
                    // Remove any left over yellow colour from the right bar.
                    BarElement = document.getElementById("comparison-" + statName + "-player-2-bar").classList.remove("yellow");; // Get the player 2 Bar Element dynamically and remove the yellow class from the selected element.
                } else if (statValueArray[2] > statValueArray[1]) {
                    // console.log("As statValueArray[2]: " + statValueArray[2] + " > statValueArray[1]: " + statValueArray[1] + ", make the right bar yellow.")
                    // Player 2 stats are higher so colour the right bar yellow.
                    BarElement = document.getElementById("comparison-" + statName + "-player-2-bar").classList.add("yellow"); // Get the player 2 Bar Element dynamically and add the yellow class from the selected element.
                    // Remove any left over yellow colour from the left bar.
                    BarElement = document.getElementById("comparison-" + statName + "-player-1-bar").classList.remove("yellow"); // Get the player 1 Bar Element dynamically and remove the yellow class from the selected element.
                } else {
                    // Do nothing as should not get to this case.
                    console.warn("Error in logic for stat " + statName + ".")
                }
            } else {
                // Colour the bars based on the lower value being better and therefore being better.
                // console.log("As higherBetterBoolean is false, colour the lower stat value yellow.")
                if (statValueArray[1] < statValueArray[2]) {
                    // console.log("As statValueArray[1]: " + statValueArray[1] + " < statValueArray[2]: " + statValueArray[2] + ", make the left bar yellow.")
                    // Player 1 stats are lower so colour the left bar yellow.
                    BarElement = document.getElementById("comparison-" + statName + "-player-1-bar").classList.add("yellow");; // Get the player 1 Bar Element dynamically and add the yellow class from the selected element.
                    // Remove any left over yellow colour from the right bar.
                    BarElement = document.getElementById("comparison-" + statName + "-player-2-bar").classList.remove("yellow");; // Get the player 2 Bar Element dynamically and remove the yellow class from the selected element.
                } else if (statValueArray[2] < statValueArray[1]) {
                    // console.log("As statValueArray[2]: " + statValueArray[2] + " < statValueArray[1]: " + statValueArray[1] + ", make the right bar yellow.")
                    // Player 2 stats are lower so colour the right bar yellow.
                    BarElement = document.getElementById("comparison-" + statName + "-player-2-bar").classList.add("yellow"); // Get the player 2 Bar Element dynamically and add the yellow class from the selected element.
                    // Remove any left over yellow colour from the left bar.
                    BarElement = document.getElementById("comparison-" + statName + "-player-1-bar").classList.remove("yellow"); // Get the player 1 Bar Element dynamically and remove the yellow class from the selected element.
                } else {
                    // Do nothing as should not get to this case.
                    console.warn("Error in logic for stat " + statName + ".")
                }
            }
        }
    }

    // Define the widths of the bars.
    var totalStatValue = statValueArray[1] + statValueArray[2];
    var ElementWidth = 0; // Initially define the ElementWidth variable for later use.
    // console.log("totalStatValue: ");
    // console.log(totalStatValue);
    // Catch if both stats are 0 and the element width can't be calculated.
    if ((statValueArray[1] + statValueArray[2]) === 0) {
        BarElement = document.getElementById("comparison-" + statName + "-player-1-bar-container").style.width = 0 + '%';
        BarElement = document.getElementById("comparison-" + statName + "-player-2-bar-container").style.width = 0 + '%';
    } else {
        // Calculate the width of the container div holding the bar and set its width based on that.
        ElementWidth = Math.floor((statValueArray[1] / totalStatValue) * 100);
        // console.log("ElementWidth (left): " + ElementWidth + "%");
        BarElement = document.getElementById("comparison-" + statName + "-player-1-bar-container").style.width = ElementWidth + '%';
        // Calculate the width of the container div holding the bar and set its width based on that.
        ElementWidth = Math.floor((statValueArray[2] / totalStatValue) * 100);
        // console.log("ElementWidth (right): " + ElementWidth + "%");
        BarElement = document.getElementById("comparison-" + statName + "-player-2-bar-container").style.width = ElementWidth + '%';
    }

    // Hide the stats that should not be shown based on the users selection.
    let containerElement = document.getElementById("comparison-" + statName + "-container"); // Get the container element dynamically.
    console.log("containerElement = comparison-" + statName + "-container");
    if (statCategoryValue == "All") {
        // Remove the hidden class from this container element as it should be shown.
        containerElement.classList.remove("hidden"); // Remove the hidden CSS class from the container element.
    }
    else if (statObject[statName].statCategory == statCategoryValue) {
        // Remove the hidden class from this container element as it should be shown.
        containerElement.classList.remove("hidden"); // Remove the hidden CSS class from the container element.
    } else {
        // Add the hidden class to this container element as it should not be shown.
        containerElement.classList.add("hidden"); // Apply the hidden CSS class to the container element.
    }
}

// Sub function to reset the bars. Called from updateComparisonStatData above.
function resetStatsBars() {
    // Create a function to reset all stat bars whenever needed.
    console.log("function resetStatsBars called.");

    // Define an array of stats from the Global statObject.
    const statsArray = Object.keys(statObject);
    // console.log(statsArray); // Log the created array to see all of the stats to be looped through.

    // Group the next set of logs together to avoid cluttering the console.
    console.groupCollapsed('ResetStatsBars Info Logs'); // Group further console logs. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

    for (let i = 0; i < statsArray.length; i++) {
        console.log("Stat being worked on: " + statsArray[i]); // Log the stat being updated.

        // Add a try catch around dynamically updating HTML elements as not all stats object to be used. 
        try {

            // Reset the player stat bars by removing the animation.

            // Sort the player 1 side.
            var BarElement = document.getElementById("comparison-" + statsArray[i] + "-player-1-bar"); // Get the Bar Element dynamically.
            BarElement.style.animation = ''; // Clear the animation as part of the reset ready for it to be re-applied.
            // console.log("BarElement.style.animation:");
            // console.log(BarElement.style.animation);
            BarElement.classList.remove("yellow"); // Remove the yellow class from the selected element.
            BarElement = document.getElementById("comparison-" + statsArray[i] + "-player-1-bar-container"); // Get the Container Element dynamically.
            BarElement.style.width = "0";

            // Sort the player 2 side.
            BarElement = document.getElementById("comparison-" + statsArray[i] + "-player-2-bar"); // Get the Bar Element dynamically.
            BarElement.style.animation = ''; // Clear the animation as part of the reset ready for it to be re-applied.
            // console.log("BarElement.style.animation:");
            // console.log(BarElement.style.animation);
            BarElement.classList.remove("yellow"); // Remove the yellow class from the selected element.
            BarElement = document.getElementById("comparison-" + statsArray[i] + "-player-2-bar-container"); // Get the Container Element dynamically.
            BarElement.style.width = '0';

        }
        catch (err) {
            console.info("Stat = " + statsArray[i] + " not found on sheet so skipping.");
        }
    }

    console.groupEnd(); // End the log grouping. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/
}



// 6. Tables, Fixtures & Results Tab

// 6.1. Tables, Fixtures & Results tab data "getter" function.

// There is no Tables, Fixtures & Results tab data "getter" function.

// 6.2. Tables, Fixtures & Results tab data "show-er" function.

// There is no Tables, Fixtures & Results tab data "show-er" function.

// 6.3. Tables, Fixtures & Results tab data "update-er" function.
function updateTablesResultsandFixturesTab() {
    // console.log("> Function: updateTablesResultsandFixturesTab() called.")

    // Start the rotation of the Dorkinians logo to simulate loading.
    rotateLogo("dorkinians-header-logo");

    // Get the team selection dropdown and get the team picked.
    var teamSelectionDropdown = document.getElementById("tables-results-fixtures-team-selection-dropdown");
    var teamSelection = teamSelectionDropdown.options[teamSelectionDropdown.selectedIndex].value; // Get the team selected value (which comes through as 1s etc). (https://stackoverflow.com/a/8549358/14290169).

    // Update the information bar.
    displayInformation("tables-results-fixtures-information-bar", "Click on a table for more details on the AFC site");

    // Define an array of teams to update. Each team corresponds to an HTML element.
    let teamArray = ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s"];
    for (let i = 0; i < teamArray.length; i++) {
        // console.log("Processing " + teamArray[i]); // Log the team being updated.

        // Select the teamTableDiv and teamResultsAndFixturesDiv for the team.
        var teamTableDiv = document.getElementById("dorkinians" + teamArray[i] + "Table"); // Get the Teams table div dynamically.
        // console.log("> teamTableDiv for " + teamArray[i] + " is: dorkinians" + teamArray[i] + "Table"); // Log the teamTableDiv being updated.
        var teamResultsAndFixturesDiv = document.getElementById("dorkinians" + teamArray[i] + "ResultsAndFixtures"); // Get the Teams results and fixtures div dynamically.
        // console.log("> teamResultsAndFixturesDiv for " + teamArray[i] + " is: dorkinians" + teamArray[i] + "ResultsAndFixtures"); // Log the teamResultsAndFixturesDiv being updated.

        // Either add or remove the "hidden" class from the gathered element.
        if (teamArray[i] === teamSelection) {
            teamTableDiv.classList.remove("hidden"); // Remove the hidden class from the selected element so that it is shown.
            // console.log("> dorkinians" + teamArray[i] + "Table is shown by removing the 'hidden' class"); // Log the teamTableDiv being updated.
            teamResultsAndFixturesDiv.classList.remove("hidden"); // Remove the hidden class from the selected element so that it is shown.
            // console.log("> dorkinians" + teamArray[i] + "ResultsAndFixtures is shown by removing the 'hidden' class"); // Log the teamResultsAndFixturesDiv being updated.
        } else if (teamSelection === "WholeClub") {
            teamTableDiv.classList.remove("hidden"); // Remove the hidden class from the selected element so that it is shown.
            // console.log("> dorkinians" + teamArray[i] + "Table is shown by removing the 'hidden' class"); // Log the teamTableDiv being updated.
            teamResultsAndFixturesDiv.classList.remove("hidden"); // Remove the hidden class from the selected element so that it is shown.
            // console.log("> dorkinians" + teamArray[i] + "ResultsAndFixtures is shown by removing the 'hidden' class"); // Log the teamResultsAndFixturesDiv being updated.

        } else {
            teamTableDiv.classList.add("hidden"); // Add the hidden class to the selected element so that it is hidden.
            // console.log("> dorkinians" + teamArray[i] + "Table is hidden by adding the 'hidden' class"); // Log the teamTableDiv being updated.
            teamResultsAndFixturesDiv.classList.add("hidden"); // Add the hidden class to the selected element so that it is hidden.
            // console.log("> dorkinians" + teamArray[i] + "ResultsAndFixtures is hidden by adding the 'hidden' class"); // Log the teamResultsAndFixturesDiv being updated.
        }
    }

    // End the rotation of the Dorkinians logo to simulate loading being completed.
    stopRotateLogo("dorkinians-header-logo");
}



// Pop Up Box Functions

// Open and display a message on the pop up box.
function openPopUpBox(headerText, messageText) {
    // console.log("Pop Up Box opened."); // Log a message to the console.

    // Select the pop up box and show it.
    document.getElementById('pop-up-box').style.display = "inline"; // Show the pop up box.
    document.getElementById('background-overlay-pop-up-box').style.display = "inline"; // Show the background overlay behind the pop up box.
    document.getElementById('background-overlay-pop-up-box').style.zIndex = 29; // Set the z-index of the background overlay to be right behind the pop up box.

    // Populate the pop up box with the text passed to it.
    document.getElementById("pop-up-box-header-text").innerHTML = headerText; // Add the header text to the HTML element.
    document.getElementById("pop-up-box-message-text").innerHTML = messageText; // Add the header text to the HTML element.
}

// Close and hide the pop up box.
function closePopUpBox() {
    // console.log("Pop Up Box closed."); // Log a message to the console.

    // Select the pop up box and hide it.
    document.getElementById('pop-up-box').style.display = "none"; // Hide the pop up box.
    document.getElementById('background-overlay-pop-up-box').style.display = "none"; // Hide the background overlay behind the pop up box.
}



// Table Functions

// Clear the table to make space for new data.
function clearTable(selector) {
    // console.log('%c' + '>> Re-usable Function: clearTable() called. Passed variables: selector = ' + selector, ' background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
    // https://stackoverflow.com/a/3955238/14290169
    const myNode = document.querySelector(selector); // Select the parent from which to delete all child elements from. Modified the selector to be dynamic and accept any type of selector. Previously, defining as "table" meant that it only works if the HTML page has only one table element.
    while (myNode.firstChild) { // Loop through all child elements.
        myNode.removeChild(myNode.lastChild); // Remove each child element.
    }
    //console.log("Function: Table Cleared.") // Log a final message to show the function is complete.
}

// Create the table by passing the data to the function.
function createFullTable(data, selector, toolTipBoolean, dataForm) {
    // console.log('%c' + '>> Re-usable Function: createFullTable(data, selector, toolTipBoolean, dataForm) called. Passed variables: data = shown below, selector = ' + selector + ', toolTipBoolean = ' + toolTipBoolean + ', dataForm = ' + dataForm, ' background-color: lightgreen; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.

    // console.log(data); // Log the passed data to the console.
    let table = document.querySelector(selector); // Select the parent element from which to build the table. Modified the selector to be dynamic and accept any type of selector. Previously, defining as "table" meant that it only works if the HTML page has only one table element.
    // If the toolTipBoolean is true, define header data as from the array, instead of the keys of an object.
    if (dataForm == "array") { // Define the header data as from the array.
        // console.log("dataForm = " + dataForm + " therefore data is in array form, so pass through data as the first row of data of the array."); // Log if the toolTipBoolean is in play or not.
        var headerdata = data[0]; // Get the header data from the first element of the array.
        //console.log("headerdata printed below:");
        //console.log(headerdata);
    } else if (dataForm == "object") { // Define the header data as the keys of the object.
        // console.log("dataForm = " + dataForm + " therefore data is in object form, so pass through the header data as the first keys of the object."); // Log if the toolTipBoolean is in play or not.
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
    // console.log('%c' + '>> Re-usable Function: generateTableHead(table, data) called. Passed variables: table = not shown, headerdata = shown below, array = shown below, toolTipBoolean = ' + toolTipBoolean, ' background-color: lightyellow; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.

    // console.log("Header data is an array:");
    // console.log(headerdata); // Log the passed headerdata to the console.
    // console.log("Array is an array of objects:");
    // console.log(array); // Log the passed array to the console.

    let thead = table.createTHead(); // Create table headers.
    let row = thead.insertRow(); // Insert a row for the table headers.
    var counter = 0; // Define a counter for checking which column to apply stick-col rule to.
    for (let key of headerdata) { // Loop through each column header of the headerdata.
        let th = document.createElement("th"); // Create the th element.
        // If the toolTipBoolean is true, create the headers to also include the tool tips.
        if (toolTipBoolean == true) { // Define how to add the text depending on if toolTips are enabled for the table.
            // console.log("toolTipBoolean is true so adding tooltip.");
            var text = document.createTextNode(key); // Create a text node from the header data key to be apended.
            th.appendChild(text); // Append the text to the table header.
            // Skip the first column.
            if (counter == 0) { // If the counter = 0, it's the first column.
                // Do nothing.
            } else { // For all other columns, add the tool tip.
                th.classList.add("tooltip"); // Add the tooltip class to the th element (the container element).
                var toolTip = document.createElement("p"); // Create a paragraph element to be appended.
                toolTip.innerHTML = array[0][key]; // Add the text of the first row, with the key as the column to the new paragraph element.
                toolTip.classList.add("tooltiptext"); // Add the tooltiptext class to the new paragraph element.
                toolTip.classList.add("wordwrap"); // Add the wordwrap class to the new paragraph element.
                th.appendChild(toolTip); // Append the toolTip paragraph element as a child to the th element.
            }
        } else { // If toolTipBoolean is false, add text the normal way.
            // console.log("toolTipBoolean is false so not adding tooltip.");
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
    // console.log('%c' + '>> Re-usable Function: generateTable(table, data, toolTipBoolean) called. Passed variables: table = not shown, data = shown below, toolTipBoolean = ' + toolTipBoolean, ' background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
    // console.log(data); // Log the passed array to the console.
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
            if (toolTipBoolean == true && rowCounter == 1) {
                // Skip doing the first row for tables that have tooltips.
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
    // console.log('%c' + '>> Re-usable Function: filterArrayOfObjects(ArrayOfObjects, keyName, filterValue) called. Passed variables: ArrayOfObjects = not shown, keyName = ' + keyName + ', filterValue = ' + filterValue, ' background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
    const filteredArrayOfObjects = ArrayOfObjects.filter(data => (data[keyName].includes(filterValue))); // Filter down the data into a new array of objects.
    return filteredArrayOfObjects; // Return the new filtered array of objects.
}

// Filter an Array of Objects based on multiple inputs and return another Array of Objects, filtered by the input values, against the defined objects key. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
function multiFilterArrayOfObjects(ArrayOfObjects, toolTipBoolean, keyNameSeason, filterValueSeason, keyNamePlayer, filterValuePlayer, keyNameTeam, filterValueTeam, keyNameLocation, filterValueLocation) {
    // Receive an Array of Objects, and multiple key names and filter values.
    // console.log('%c' + '>> Re-usable Function: multiFilterArrayOfObjects(ArrayOfObjects, keyNames , filterValues...) called. Passed variables: ArrayOfObjects = not shown, keyNameSeason = ' + keyNameSeason + ', filterValueSeason = ' + filterValueSeason, ', keyNamePlayer = ' + keyNamePlayer + ', filterValuePlayer = ' + filterValuePlayer, ', keyNameTeam = ' + keyNameTeam + ', filterValueTeam = ' + filterValueTeam, ', keyNameLocation = ' + keyNameLocation + ', filterValueLocation = ' + filterValueLocation, ' background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
    // Initially define the variable that will be manipulated and produced.
    var filteredArrayOfObjects = ArrayOfObjects;

    // Check if the original ArrayOfObjects includes a toolTip row or not.
    if (toolTipBoolean === true) {

        // Remove the first element, store it and create the other filterable array for further work (without the first toolTip element).
        var filteredArrayOfObjectsFirstElement = [filteredArrayOfObjects.shift()]; // Remove the first element of the array and store it. https://bobbyhadz.com/blog/javascript-remove-first-element-from-array#remove-the-first-element-from-an-array.
        // console.log("filteredArrayOfObjectsFirstElement");
        // console.log(filteredArrayOfObjectsFirstElement);
        var filteredArrayOfObjectsWithoutFirstElement = filteredArrayOfObjects.slice(1); // Return the full array without the first element. https://bobbyhadz.com/blog/javascript-remove-first-element-from-array#remove-the-first-element-from-an-array.
        // console.log("filteredArrayOfObjectsWithoutFirstElement");
        // console.log(filteredArrayOfObjectsWithoutFirstElement);

        // Set the array to be worked on and filtered to be the one without the first element.
        filteredArrayOfObjects = filteredArrayOfObjectsWithoutFirstElement;
    }

    // Filter the Array of Objects for multiple criteria.

    // Filter the Array of Objects for the defined season.
    if (filterValueSeason === "Season") { // Don't filter if unpicked.
        // Do nothing as season hasn't been selected.
        // console.log(">>> Data not filtered for seasons as 'Season' still picked.")
    } else { // Filter the Array of Objects.
        filteredArrayOfObjects = filteredArrayOfObjects.filter(data => (data[keyNameSeason].includes(filterValueSeason))); // Filter down the data into a new array of objects.
    }

    // Filter the Array of Objects for the selected player.
    if (filterValuePlayer === "Player") { // Don't filter if unpicked.
        // Do nothing as player hasn't been selected.
        // console.log(">>> Data not filtered for players as 'Player' still picked.")
    } else { // Filter the Array of Objects.
        filteredArrayOfObjects = filteredArrayOfObjects.filter(data => (data[keyNamePlayer].includes(filterValuePlayer))); // Filter down the data into a new array of objects.
    }

    // Filter the Array of Objects for the selected team.
    if (filterValueTeam === "Team") { // Don't filter if unpicked.
        // Do nothing as team hasn't been selected.
        // console.log(">>> Data not filtered for teams as 'Team' still picked.")
    } else { // Filter the Array of Objects.
        filteredArrayOfObjects = filteredArrayOfObjects.filter(data => (data[keyNameTeam].includes(filterValueTeam))); // Filter down the data into a new array of objects.
    }

    // Filter the Array of Objects for the selected location.
    if (filterValueLocation === "Location") { // Don't filter if unpicked.
        // Do nothing as location hasn't been selected.
        // console.log(">>> Data not filtered for locations as 'Location' still picked.")
    } else { // Filter the Array of Objects.
        filteredArrayOfObjects = filteredArrayOfObjects.filter(data => (data[keyNameLocation].includes(filterValueLocation))); // Filter down the data into a new array of objects.
    }

    // If the original ArrayOfObjects included a toolTip row, re-add it.
    if (toolTipBoolean === true) {
        // Re-combine the toolTip row element with the new filtered element.
        // console.log("filteredArrayOfObjectsFirstElement");
        // console.log(filteredArrayOfObjectsFirstElement);
        // console.log("filteredArrayOfObjects");
        // console.log(filteredArrayOfObjects);
        var filteredArrayOfObjects = filteredArrayOfObjectsFirstElement.concat(filteredArrayOfObjects); // Re-merge the two arrays using concat. https://www.w3schools.com/jsref/jsref_concat_array.asp.

    }

    return filteredArrayOfObjects; // Return the new filtered array of objects.
}



// Format a value based on a passed format type.
function formatValue(valueToBeFormatted, statFormat) {
    if (statFormat == "Integer") { // Convert the stat to an integer.
        var displayText = Number(valueToBeFormatted).toLocaleString("en-UK"); // Use a dynamic [statArray[i]] key. Convert the stat to a number and then add a comma by using the "toLocaleString" method.
    } else if (statFormat == "Decimal2") { // Convert the stat to 2 decimal places.
        var displayText = Number(valueToBeFormatted).toFixed(2); // Use a dynamic [statArray[i]] key. Convert the stat to a number to 2 decimal places by using the "toFixed" method.
    } else if (statFormat == "Decimal1") { // Convert the stat to 1 decimal places.
        var displayText = Number(valueToBeFormatted).toFixed(1); // Use a dynamic [statArray[i]] key. Convert the stat to a number to 1 decimal places by using the "toFixed" method.
    } else { // For all else, including percentages and strings, just display as passed.
        var displayText = valueToBeFormatted; // Do nothing to passed value.
    }

    return displayText;
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



// Math Functions

// Rounding Function (https://learnersbucket.com/examples/javascript/learn-how-to-round-to-2-decimal-places-in-javascript/).
let roundOff = (num, places) => {
    const x = Math.pow(10, places);
    return Math.round(num * x) / x;
}

// Random Number Function. https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/.
function randomNumber(min, max) {
    // Function to generate random number between a defined min and max.
    return Math.random() * (max - min) + min;
}



// Date Function

// Next Date Function - https://stackoverflow.com/a/27336600/14290169
function nextDay(d, dow) {
    d.setDate(d.getDate() + (dow + (7 - d.getDay())) % 7);
    return d;
}



// Dorkinians Logo Rotation Functions

// Start Rotation
function rotateLogo(logoID) {
    // Begin rotating the logo given the defined id of the logo to rotate.
    // console.log('%c' + '> rotateLogo() called. Dorkinians logo rotating.', 'background-color: #F9ED32; color: black; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.

    // Add classes to the Dorkinians logo in the top left corner to simulate loading.
    var dorkiniansLogo = document.getElementById(logoID); // Get the Dorkinians Logo.
    dorkiniansLogo.classList.add("rotate"); // Add the "rotate" class to the logo.
    dorkiniansLogo.classList.add("linear"); // Add the "linear" class to the logo.
    dorkiniansLogo.classList.add("infinite"); // Add the "infinite" class to the logo.
}

// Finish Rotation
function stopRotateLogo(logoID) {
    // Finish rotating the logo given the defined id of the logo to rotate.
    // console.log('%c' + '> stopRotateLogo() called. Dorkinians logo stopped rotating.', 'background-color: #F9ED32; color: black; padding: 0.5em 0em; font-weight: bold;'); // Log the function call to the console.

    // Remove classes from the Dorkinians logo in the top left corner to simulate loading being completed.
    var dorkiniansLogo = document.getElementById(logoID); // Get the Dorkinians Logo.
    dorkiniansLogo.classList.remove("rotate"); // Remove the "rotate" class from the logo.
    dorkiniansLogo.classList.remove("linear"); // Remove the "linear" class from the logo.
    dorkiniansLogo.classList.remove("infinite"); // Remove the "infinite" class from the logo.
}



// Information Bar Function

// Display New Message
function displayInformation(informationBarID, displayMessage) {
    // Update the identified information bar with a given message. 
    var informationBar = document.getElementById(informationBarID); // Get the Information Bar using the provided ID.
    informationBar.innerHTML = displayMessage; // Add the text to the HTML element.
}



// When the user clicks on the button,toggle between hiding and showing the dropdown content. https://www.w3schools.com/howto/howto_js_filter_dropdown.asp.
function showDropdownList(dropdownID) {
    document.getElementById(dropdownID).style.display = "block"; // Show the selection dropdown.
    document.getElementById('player-stats-selection-dropdown-container').style.zIndex = 6;  // Show the selection dropdown.
    // document.getElementById('background-overlay-selection-dropdown').style.display = "inline"; // Show the background overlay behind the selection dropdown.
    // document.getElementById('background-overlay-selection-dropdown').style.zIndex = 5; // Set the z-index of the background overlay to be right behind the selection dropdown.
}

// Populate the dropdown with Player names.
function populateDropdownList(playerNameArray, dropdownID) {
    console.log("playerNameArray:");
    console.log(playerNameArray);

    // Loop through the player name array and add the names as options below the dropdown selector.
    for (let i = 0; i < playerNameArray.length; i++) {
        let newOption = document.createElement("option"); // Create the new option element.
        let playerNameText = document.createTextNode(playerNameArray[i]); // Create a text node of the players name.
        newOption.appendChild(playerNameText); // Append the text node to the new element.
        let parentElement = document.getElementById(dropdownID); // Get the parent dropdown element.
        parentElement.appendChild(newOption); // Append the new element to the parent dropdown element.
    }   
}

// Filter the results if the user types. https://www.w3schools.com/howto/howto_js_filter_dropdown.asp.
function filterDropdownList(dropdownID, inputID) {
    var input, filter, ul, li, option, i;
    input = document.getElementById(inputID);
    filter = input.value.toUpperCase();
    div = document.getElementById(dropdownID);
    option = div.getElementsByTagName("option");
    for (i = 0; i < option.length; i++) {
        txtValue = option[i].textContent || option[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            option[i].style.display = "";
        } else {
            option[i].style.display = "none";
        }
    }
}

function closeDropdownList() {
    document.getElementById('player-stats-selection-dropdown').style.display = "none"; // Hide the selection dropdown.
    document.getElementById('background-overlay-selection-dropdown').style.display = "none"; // Hide the background overlay behind the selection dropdown.
}
