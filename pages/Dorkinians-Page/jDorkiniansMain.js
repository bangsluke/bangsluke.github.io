// jDorkiniansMain.js JavaScript Functions

"use strict";

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
const numberReadyComponents = 10;
// const numberReadyComponents = 16;

// Create an array of phrases to be displayed on the loading page.
var phrasesArray = [
  "Locating any number 8 tops in kit bags...",
  "Calculating the likelihood of Shano scoring an 'unmissable' chance...",
  "Forgetting Oakley's 'assist' in the last game...",
  "Adding up the sheer quantity of Peck's goals...",
  "Going into overdrive counting all of Alex Wills' yellow cards...",
  "Crafting the basis of the AFA's rep teams from Dorkinians players...",
  "Questioning if Sam Smith's open play goal was actually his...",
  "Pretending the 1's team's yellow cards never happened...",
  "Accepting bribes for stat fiddling...",
  "Will be ready as soon as Rupert Cape uses his left foot...",
  "Waiting for Morley to leave the changing room so we can kick off...",
  "Check out the new Higgins range of clothes in Asda's George whilst you wait...",
  "Processing opposition complaints that our teams are too strong...",
  "Delaying pitch inspections to the last minute...",
  "Considering Dom Devlin's MoM...",
  "Expecting a goalkeeper hissy fit any moment now...",
  "Probably should get out of 1st gear for the second half...",
  "Waiting to see if Harry Lynn will turn up for the game...",
  "Enjoying Al Thom's roly poly celebration for his first club goal...",
  "Sliding Shaun Patterson into TOTW because of a bet...",
  "Counting out Will Westcott's late fines...",
  "Adjusting teams on Saturday morning following late dropouts...",
  "Waiting for Slado's speeches to finish...",
  "Ignoring Rich's match fee and membership messages...", // Don't need to leave the last array value empty.
];
// Deleted phrases.
// "Hitting on the bar staff after the game...",
// "Waiting for Ellenger to make his 1s debut...",
// "Dave Coleman is typing...",

// Globally define an object containing stat objects that can be referenced in other functions.
const statObject = {
  APP: {
    statName: "Appearances",
    displayText: "Appearances:", // The text displayed at all times on the page.
    shortText: "Apps", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of appearances made by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Appearance Stat",
  },
  M: {
    statName: "Minutes",
    displayText: "Minutes played:", // The text displayed at all times on the page.
    shortText: "Mins", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of minutes played by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Appearance Stat",
  },
  MOM: {
    statName: "Man of the Matches",
    displayText: "Man of the Matches:", // The text displayed at all times on the page.
    shortText: "MoMs", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description:
      "The number of man of the match performances achieved by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Performance Stat",
  },
  G: {
    statName: "Goals Scored",
    displayText: "Goals scored:", // The text displayed at all times on the page.
    shortText: "Goals", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description:
      "The number of goals scored by the player, including penalties.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Performance Stat",
  },
  A: {
    statName: "Assists",
    displayText: "Assists provided:", // The text displayed at all times on the page.
    shortText: "Assists", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of assists provided by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Performance Stat",
  },
  Y: {
    statName: "Yellow Cards",
    displayText: "Yellow cards received:", // The text displayed at all times on the page.
    shortText: "Yel", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of yellow cards received by the player.",
    statHigherBetterBooleanArray: false,
    numberDecimalPlaces: 0,
    statCategory: "Performance Stat",
  },
  R: {
    statName: "Red Cards",
    displayText: "Red cards received:", // The text displayed at all times on the page.
    shortText: "Red", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of red cards received by the player.",
    statHigherBetterBoolean: false,
    numberDecimalPlaces: 0,
    statCategory: "Performance Stat",
  },
  OG: {
    statName: "Own Goals",
    displayText: "Own goals scored:", // The text displayed at all times on the page.
    shortText: "OGs", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of own goals scored by the player.",
    statHigherBetterBoolean: false,
    numberDecimalPlaces: 0,
    statCategory: "Performance Stat",
  },
  C: {
    statName: "Conceded",
    displayText: "Goals conceded:", // The text displayed at all times on the page.
    shortText: "Con", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description:
      "The number of goals conceded whilst the player has been playing.",
    statHigherBetterBoolean: false,
    numberDecimalPlaces: 0,
    statCategory: "Performance Stat",
  },
  CLS: {
    statName: "Clean Sheets",
    displayText: "Clean sheets achieved:", // The text displayed at all times on the page.
    shortText: "CLS", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of clean sheets achieved by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Performance Stat",
  },
  PSC: {
    statName: "Penalties Scored",
    displayText: "Penalties scored:", // The text displayed at all times on the page.
    shortText: "Pens", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of penalties scored by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Penalty Stat",
  },
  PM: {
    statName: "Penalties Missed",
    displayText: "Penalties missed:", // The text displayed at all times on the page.
    shortText: "Pens Mis", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of penalties missed by the player.",
    statHigherBetterBoolean: false,
    numberDecimalPlaces: 0,
    statCategory: "Penalty Stat",
  },
  PCO: {
    statName: "Penalties Conceded",
    displayText: "Penalties conceded:", // The text displayed at all times on the page.
    shortText: "Pens Con", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of penalties conceded by the player.",
    statHigherBetterBoolean: false,
    numberDecimalPlaces: 0,
    statCategory: "Penalty Stat",
  },
  PSV: {
    statName: "Penalties Saved",
    displayText: "Penalties saved:", // The text displayed at all times on the page.
    shortText: "Pens Save", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of penalties saved by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Penalty Stat",
  },
  FTP: {
    statName: "Fantasy Points",
    displayText: "Fantasy points achieved:", // The text displayed at all times on the page.
    shortText: "FTP", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of fantasy points achieved by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Performance Stat",
  },
  GperAPP: {
    statName: "Goals Per Appearance",
    displayText: "Goals per app:", // The text displayed at all times on the page.
    shortText: "GperApp", // Used for short displays such as on the Comparison tab.
    statFormat: "Decimal2",
    description:
      "The average number of goals scored per appearance by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 1,
    statCategory: "Per App/Minute Stat",
  },
  CperAPP: {
    statName: "Conceded Per Appearance",
    displayText: "Goals conceded per app:", // The text displayed at all times on the page.
    shortText: "CperApp", // Used for short displays such as on the Comparison tab.
    statFormat: "Decimal2",
    description:
      "The average number of goals conceded per appearance by the player.",
    statHigherBetterBoolean: false,
    numberDecimalPlaces: 1,
    statCategory: "Per App/Minute Stat",
  },
  MperG: {
    statName: "Minutes Per Goal",
    displayText: "Minutes per goal scored:", // The text displayed at all times on the page.
    shortText: "MperG", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description:
      "The average number of minutes needed by the player to score a goal.",
    statHigherBetterBoolean: false,
    numberDecimalPlaces: 0,
    statCategory: "Per App/Minute Stat",
  },
  MperCLS: {
    statName: "Minutes Per Clean Sheet",
    displayText: "Minutes per clean sheet:", // The text displayed at all times on the page.
    shortText: "MperCLS", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description:
      "The average number of minutes needed by the player to achieve a clean sheet.",
    statHigherBetterBoolean: false,
    numberDecimalPlaces: 0,
    statCategory: "Per App/Minute Stat",
  },
  FTPperAPP: {
    statName: "Fantasy Points Per Appearance",
    displayText: "Fantasy points per app:", // The text displayed at all times on the page.
    shortText: "FTPperApp", // Used for short displays such as on the Comparison tab.
    statFormat: "Decimal2",
    description:
      "The average number of fantasy points scored per appearance by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 1,
    statCategory: "Per App/Minute Stat",
  },
  DIST: {
    statName: "Distance Travelled",
    displayText: "Distance travelled:", // The text displayed at all times on the page.
    shortText: "Dist", // Used for short displays such as on the Comparison tab.
    statFormat: "Decimal1",
    description:
      "The distance travelled in miles by the player getting to away games.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 1,
    statCategory: "Appearance Stat",
  },
  "Games%Won": {
    statName: "Percentage Games Won",
    displayText: "% games won:", // The text displayed at all times on the page.
    shortText: "% Won", // Used for short displays such as on the Comparison tab.
    statFormat: "Percentage",
    description: "The percentage of games won by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Results Stat",
  },
  HomeGames: {
    statName: "Home Games",
    displayText: "Home games:", // The text displayed at all times on the page.
    shortText: "H Apps", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of home games played by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Results Stat",
  },
  HomeWins: {
    statName: "Home Wins",
    displayText: "Home wins:", // The text displayed at all times on the page.
    shortText: "H Wins", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of home games won by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Results Stat",
  },
  "HomeGames%Won": {
    statName: "Percentage Home Games Won",
    displayText: "% home games won:", // The text displayed at all times on the page.
    shortText: "% H Won", // Used for short displays such as on the Comparison tab.
    statFormat: "Percentage",
    description: "The percentage of home games won by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Results Stat",
  },
  AwayGames: {
    statName: "Away Games",
    displayText: "Away games:", // The text displayed at all times on the page.
    shortText: "A Apps", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of away games played by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Results Stat",
  },
  AwayWins: {
    statName: "Away Wins",
    displayText: "Away wins:", // The text displayed at all times on the page.
    shortText: "A Wins", // Used for short displays such as on the Comparison tab.
    statFormat: "Integer",
    description: "The number of away games won by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Results Stat",
  },
  "AwayGames%Won": {
    statName: "Percentage Away Games Won",
    displayText: "% away games won:", // The text displayed at all times on the page.
    shortText: "% A Won", // Used for short displays such as on the Comparison tab.
    statFormat: "Percentage",
    description: "The percentage of away games won by the player.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Results Stat",
  },
  MostPlayedForTeam: {
    statName: "Most Played for Team",
    displayText: "Most played for team:", // The text displayed at all times on the page.
    shortText: "Most Play", // Used for short displays such as on the Comparison tab.
    statFormat: "String",
    description: "The Dorkinians team that the player has appeared for most.",
    statHigherBetterBoolean: false,
    numberDecimalPlaces: 0,
    statCategory: "Appearance Stat",
  },
  NumberTeamsPlayedFor: {
    statName: "Number of Teams Played for",
    displayText: "Number teams played for:", // The text displayed at all times on the page.
    shortText: "# Teams", // Used for short displays such as on the Comparison tab.
    statFormat: "String",
    description:
      "The number of Dorkinians teams that the player has appeared for.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Appearance Stat",
  },
  NumberSeasonsPlayedFor: {
    statName: "Number of Seasons Played for",
    displayText: "Number seasons played for:", // The text displayed at all times on the page.
    shortText: "# Seasons", // Used for short displays such as on the Comparison tab.
    statFormat: "String",
    description:
      "The number of seasons that the player has played for Dorkinians since stats records began.",
    statHigherBetterBoolean: true,
    numberDecimalPlaces: 0,
    statCategory: "Appearance Stat",
  },
  MostScoredForTeam: {
    statName: "Most Scored for Team",
    displayText: "Most scored for team:", // The text displayed at all times on the page.
    shortText: "Most G", // Used for short displays such as on the Comparison tab.
    statFormat: "String",
    description: "The Dorkinians team that the player has scored the most for.",
    statHigherBetterBoolean: false,
    numberDecimalPlaces: 0,
    statCategory: "Appearance Stat",
  },
};

// Google Sheet Links

// Site Details
const siteDetailsSheetURLCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=1978614347&single=true&output=csv";
var displaySiteDetailsArrayOfObjects = ""; // Define an initially blank array to be populated later.

// Homepage Tab

// Next Fixtures
const nextFixturesSheetURLCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=267145747&single=true&output=csv";
var displayNextFixturesArrayOfObjects = ""; // Define an initially blank array to be populated later.

// Captains and Awards
const captainsAndAwardsSheetURLCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=1483872425&single=true&output=csv";
var displayCaptainsAndAwardsArrayOfObjects = ""; // Define an initially blank array to be populated later.

// Club Stats Tab

// Total Club Stats
const totalClubStatsSheetURLCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=1673925166&single=true&output=csv";
var displayTotalClubStatsArrayOfObjects = ""; // Define an initially blank array to be populated later.

// Team Season Results
const teamSeasonResultsSheetURLCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=1269354033&single=true&output=csv";
// Not used right now!
var displayTeamSeasonResultsArrayOfObjects = ""; // Define an initially blank array to be populated later.

// Player Stats Tab

// This Season Stats
const displayThisSeasonStatsSheetCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=1147882021&single=true&output=csv";
var displayThisSeasonStatsArrayOfObjects = ""; // Define an initially blank array to be populated later.

// All Time Stats
const displayAllTimeStatsSheetCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=978685299&single=true&output=csv";
var displayAllTimeStatsArrayOfObjects = ""; // Define an initially blank array to be populated later.

// Fixtures List Tab
//const fixturesListSheetURLCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=1820717347&single=true&output=csv';
// Match Details Tab
//var matchDetailsSheetURLCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=1016205165&single=true&output=csv';
// Display Details Tab
//const displayDetailsSheetCSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTykPTiCIP9ovpx5P_mEqfxZ6DrRwXNIgwHmyWGev2Cm4yVfKxxpcHUe5af6MH8cUML1wsdDjMxhba6/pub?gid=628628597&single=true&output=csv';

// TOTW Tab

// TOTW Players
const displayTOTWSheetCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=2004273327&single=true&output=csv";
var displayTOTWArrayOfObjects = ""; // Define an initially blank array to be populated later.
const displayMatchDetailsSheetCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTt-X1FYq4s0zvVk8zMR2026noZnc2ULB4y-l5Z8HX10JLUCMELKiFQykK2PRRLhViBq7myWebkui4/pub?gid=162734061&single=true&output=csv";
var displayMatchDetailsArrayOfObjects = ""; // Define an initially blank array to be populated later.
var TOTWStatObject = ""; // Define an initially blank object to be populated later.

// Ready Events

// First add a DOMContentLoaded event to fire when the HTML DOM is in place and then add a load event listener for when all images and other resources are loaded.
window.addEventListener("DOMContentLoaded", init); // Wait for the window to load and then run the init function below.

// Add a load event listener - which completes after the init() function below - (https://eager.io/blog/how-to-decide-when-your-code-should-run/).
window.addEventListener("load", function () {
  console.log(
    "%c" + "> Dorkinians page images and other resources all loaded.",
    "background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Provide an initial load message.

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
  console.log(
    "%c" + "> Dorkinians page DOM content loaded.",
    "background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Provide an initial load message.

  // Step 0.
  console.log(
    "%c" +
      "> 0. init() called. Code started for each of the three sub processes.",
    "background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the function call to the console.

  // Close the side menu if open.
  closeNav();

  // Close the pop up box if open.
  closePopUpBox();

  // Reset the readyComponentsCount.
  readyComponentsCount = 0;

  // Call the updateLoadingPage function to change the shown phrase.
  // updateLoadingPage();

  // Step 0.
  // Side Menu.
  console.log(
    "%c" + "> 0. Side Menu data being loaded in.",
    "background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the function call to the console.

  // Side Menu data.
  Papa.parse(siteDetailsSheetURLCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: getSideMenuInfo, // The callback to execute when parsing is complete.
  });

  // Drop Down Options.
  console.log(
    "%c" + "> 0. Drop down data being loaded in.",
    "background-color: darkblue; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the function call to the console.

  // Step 1.
  // Homepage Tab.
  console.log(
    "%c" + "> 1. Hompage tab data being loaded in.",
    "background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the function call to the console.

  // Next Fixtures data.
  Papa.parse(nextFixturesSheetURLCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: getHomepageTabNextFixturesInfo, // The callback to execute when parsing is complete.
  });

  // !function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = 'https://weatherwidget.io/js/widget.min.js'; fjs.parentNode.insertBefore(js, fjs); } }(document, 'script', 'weatherwidget-io-js');

  // Get the next Saturday date and display it.
  let now = new Date();
  let nextSaturdayDate = nextDay(now, 6);
  nextSaturdayDate = new Date(nextSaturdayDate).toLocaleDateString("en-uk", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }); // Convert the date. https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/.
  document.getElementById("homepage-next-fixtures-sub-header-text").innerHTML =
    nextSaturdayDate; // Get the header and update it.

  // Captains and Awards data.
  Papa.parse(captainsAndAwardsSheetURLCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: getHomepageTabCaptainsAndAwardsInfo, // The callback to execute when parsing is complete.
  });

  // Globally define an object containing all awards and historical captains that can be referenced in other functions.
  const awardsObject = {
    AlanLambertSportsmanshipAward: {
      "2005/06": "John Bullock",
      "2006/07": "James Bray",
    },
    AlanLambertSportsmanshipAward: {
      "2005/06": "John Bullock",
      "2006/07": "James Bray",
    },
  };

  console.log("hello");
  for (var TrophyName in awardsObject) {
    for (var Season in awardsObject[TrophyName]) {
      console.log(awardsObject.TrophyName + awardsObject[TrophyName][Season]);
    }
  }

  // Step 2.
  // Club Stats Tab.
  console.log(
    "%c" + "> 2. Club Stats tab data being loaded in.",
    "background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the function call to the console.

  // Total Club/Team Stats Info
  Papa.parse(totalClubStatsSheetURLCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: getTotalClubStatsInfo, // The callback to execute when parsing is complete.
  });

  // Team Season Results Info
  // Papa.parse(teamSeasonResultsSheetURLCSV, {
  //     download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
  //     header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
  //     fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
  //     complete: getTeamSeasonResultsInfo, // The callback to execute when parsing is complete.
  // });

  // Update the information bar.
  displayInformation(
    "club-stats-information-bar",
    "Select a filter to begin reviewing further detailed club stats"
  );

  // Step 3.
  // Player Stats Tab.
  console.log(
    "%c" + "> 3. Player Stats tab data being loaded in.",
    "background-color: #1C8841; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the function call to the console.

  // Populate the Player Stats tab with details such as stat text and tooltips.
  prefillPlayerStatsTab();

  // This Season Stats Info
  Papa.parse(displayThisSeasonStatsSheetCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: getPlayerStatsThisSeasonTabInfo, // The callback to execute when parsing is complete.
  });

  // All Time Stats Info
  Papa.parse(displayAllTimeStatsSheetCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: getPlayerStatsAllTimeTabInfo, // The callback to execute when parsing is complete.
  });

  // Update the information bar.
  displayInformation(
    "player-stats-information-bar",
    "Select a player to view their stats. Or just marvel at Slado's achievements..."
  );

  // Step 4.
  // Team Of The Week Tab.
  console.log(
    "%c" + "> 4. Team Of The Week tab data being loaded in.",
    "background-color: lightblue; color: black; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the function call to the console.

  // Match Details Info
  Papa.parse(displayMatchDetailsSheetCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: getMatchDetailsInfo, // The callback to execute when parsing is complete.
  });

  // This Season Stats Info
  // Called later on.

  // Update the information bar.
  displayInformation(
    "team-of-the-week-information-bar",
    "Select a week filter to begin reviewing past teams of the week. Or click on a player to see more details"
  );

  // Step 5.
  // Comparison Tab.

  // Call the showComparisonStatData function to poplate the comparison tab with tooltips.
  showComparisonStatData();

  // Update the information bar.
  displayInformation(
    "comparison-information-bar",
    "Select a first player to view their all time stats"
  );

  // Step 6.
  // Tables, Results & Fixtures Tab.

  // Update the information bar.
  displayInformation(
    "tables-results-fixtures-information-bar",
    "Select a team to see their league table, results and fixtures"
  );

  // Call the updateTablesResultsandFixturesTab function to initially hide all lower team tables etc.
  updateTablesResultsandFixturesTab();
}

// Reset the whole page by clicking on the logo in the top left.
function resetFullPage() {
  window.location.reload(false); // Reset the full page. https://www.w3docs.com/snippets/javascript/how-to-reload-a-page-using-javascript.html.
}

// Loading Functions

// Update the phrase text on the page every few seconds.
function updateLoadingPage() {
  // console.log("updateLoadingPage called");

  // Create a setInterval for every 6 seconds to change the shown phrase.
  let loopPhrases = setInterval(function () {
    // console.log("loopPhrases started");

    // Initially set the opacity of the text container to be 0 (transparent).
    document.getElementById(
      "loading-page-loading-phrase-container"
    ).style.opacity = 0;

    // Then wait a second with no text (1000 milliseconds), update the text and fade it back up.
    setTimeout(function () {
      // console.log("Change text and fade back in started");

      // Get the next phrase to display.
      let phrasesArrayLength = phrasesArray.length; // Get the length of the phrases array.
      if (phrasesArrayLength === 0) {
        // Deal with if the array becomes empty.
        console.alert("loopPhrases timed out."); // Log the error.
        alert("Page timed out. Please refresh."); // Pass an alert to the user.
      }
      let pickedPhraseNumber = Math.floor(randomNumber(0, phrasesArrayLength)); // Pick a random number between 0 and the length of the array. Round the number down to an integer.
      let phraseText = phrasesArray[pickedPhraseNumber]; // Get the phrase text from the array.
      // console.log("pickedPhraseNumber = " + pickedPhraseNumber + ", and phraseText = " + phraseText); // Log the selected number and selected phrase.

      // Reduce down the array removing the selected phrase so that it is not displayed again.
      delete phrasesArray[pickedPhraseNumber]; // Delete the picked element from the array. The delete function only clears the string, leaving an empty element. w3docs.com/snippets/javascript/how-to-remove-an-element-from-an-array-in-javascript.html
      phrasesArray = phrasesArray.filter(function () {
        // Filter the array to remove the empty elements. https://www.w3docs.com/snippets/javascript/how-to-remove-empty-elements-from-an-array-in-javascript.html
        return true;
      });

      // Add the text to the phrase id.
      document.getElementById("loading-phrase").innerHTML = phraseText;

      // Make the text visible again.
      document.getElementById(
        "loading-page-loading-phrase-container"
      ).style.opacity = 1;
    }, 1000);

    // React if the tab ready count matches the number of tabs.
    if (
      readyComponentsCount === numberReadyComponents ||
      readyComponentsCount >= numberReadyComponents
    ) {
      hideLoadingPage(); // Call the function to fade out the loading page.
      clearInterval(loopPhrases); // Cancel the setInterval and escape it.
    }
  }, 6000);
}

// Increment the component ready count until it matches with the numberReadyComponents.
function incrementComponentReadyCount(tabName) {
  readyComponentsCount = readyComponentsCount + 1; // Increment the count.
  document.getElementById("loading-counter").innerHTML =
    "Sections loaded = " + readyComponentsCount + "/" + numberReadyComponents; // Get the loading-counter element on the page and update it.
  console.log(
    "%c" +
      "> readyComponentsCount (" +
      tabName +
      ") = " +
      readyComponentsCount +
      "/" +
      numberReadyComponents,
    "background-color: red; color: white; padding: 0.5em 0em; font-weight: bold;"
  ); // Log the function call to the console.
}

// Hide the loading page as all tabs have returned as ready.
function hideLoadingPage() {
  console.log("Loading Page hidden as all tabs are ready.");
  let loadingPageElement = document.getElementById("loading-page"); // Get the loading-page element on the page.
  loadingPageElement.classList.add("fadeout"); // Add the hidden class to the loading-page element.
  // Allow for a second to pass (the same duration of the fadeout css animation) and then permanently add the hidden class to the loading page div so that the user can select things below it.
  setInterval(function () {
    loadingPageElement.classList.add("hidden"); // Add the hidden class to the loading-page element.
  }, 1000);
}

// 0. Side Menu and Other Functions

// Side Menu

// 0.1. The side menu HTML
// The functionality of the side menu is defined further down. https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/
const sideMenuTemplate = document.createElement("template");
const sideMenuHTML = `

    <!-- Side Menu - not considered part of the "main-content-area" -->

        <div id="side-menu">

            <!-- The top side bar fixed container. -->
            <div id="side-menu-top-container">

                <!-- The x close button. -->
                <a id="side-menu-close-button" href="javascript:void(0)" onclick="closeNav()">×</a>

                <!-- Add the Dorkinians logo. -->
                <img class="logo center" id="side-menu-dorkinians-logo" src="/pages/Dorkinians-Page/images/Dorkinians Logo - Header and Side Menu.webp"
                alt="Dorkinians Logo" width="80" height="80">

            </div>

            <!-- The main side bar menu options. -->
            <div id="side-menu-main-container">

                <!-- The site details section of the side bar menu. -->
                <section id="side-menu-site-details-section" class="side-menu-section">

                    <h3 class="side-menu-section-header">Site Details</h3>

                    <div id="side-menu-site-details-grid-section">
                        <div class="side-menu-site-details-grid-container">
                            <p>Version Number: </p>
                        </div>
                        <div class="side-menu-site-details-grid-container">
                            <p id="side-menu-site-details-version-number-text"></p>
                        </div>

                        <div class="side-menu-site-details-grid-container">
                            <p>Current Season: </p>
                        </div>
                        <div class="side-menu-site-details-grid-container">
                            <p id="side-menu-site-details-current-season-text"></p>
                        </div>

                        <div class="side-menu-site-details-grid-container">
                            <p>Last Updated Stats: </p>
                        </div>
                        <div class="side-menu-site-details-grid-container">
                            <p id="side-menu-site-details-last-updated-stats-text"></p>
                        </div>

                        <div class="side-menu-site-details-grid-container">
                            <p>Page Details Last Refreshed: </p>
                        </div>
                        <div class="side-menu-site-details-grid-container">
                            <p id="side-menu-site-details-page-details-last-refereshed-text"></p>
                        </div>
                    </div>    

                </section>

                <!-- The actions section of the side bar menu options. -->
                <section id="side-menu-actions-section" class="side-menu-section">

                    <h3 class="side-menu-section-header">Actions</h3>

                    <div id="side-menu-actions-section-grid">

                        <!-- Add the change theme item. -->
                        <div class="side-menu-icon-container">
                            <img src="/pages/Dorkinians-Page/images/Theme Change Icon.webp" class="side-menu-icon" id="side-menu-theme-change-icon" alt="Theme Change Icon" onclick="changeSiteTheme()">
                        </div>
                        <div class="side-menu-text-container">
                            <h4 id="side-menu-actions-change-theme-text" onclick="changeSiteTheme()">Change to Dark Theme</h4>
                        </div>

                        <!-- Add the text size change action item. -->
                        <div class="side-menu-icon-container">
                            <img src="/pages/Dorkinians-Page/images/Text Size Icon.webp" class="side-menu-icon" id="side-menu-text-size-icon" alt="Text Size Icon">
                        </div>
                        <div class="side-menu-text-container side-menu-action-button-container">
                            <h4>Change Text Size</h4>
                            <button class="side-menu-button" id="side-menu-button-change-font-size-increment" onclick="changeTextSize(1)">
                                +
                            </button>
                            <button class="side-menu-button" id="side-menu-button-change-font-size-decrement" onclick="changeTextSize(-1)">
                                -
                            </button>
                        </div>

                        <!-- Add the full reset item. -->
                        <div class="side-menu-icon-container">
                            <img src="/pages/Dorkinians-Page/images/Reset Page Icon.webp" class="side-menu-icon" id="side-menu-reset-page-icon" alt="Reset Page Icon" onclick="resetActionVariables()">
                        </div>
                        <div class="side-menu-text-container">
                            <h4 id="side-menu-actions-change-height-text" onclick="resetActionVariables()">Reset Page Settings</h4>
                        </div>

                    </div>

                </section>

                <!-- The quick links section of the side bar menu. -->
                <section id="side-menu-quick-links-section" class="side-menu-section">

                    <h3 class="side-menu-section-header">Quick Links</h3>

                    <div id="side-menu-quick-links-section-grid">

                        <!-- Add a link to the Dorkinians homepage. -->
                        <div class="side-menu-icon-container">
                            <a href="https://www.dorkiniansfc.co.uk/">
                                <img src="/pages/Dorkinians-Page/images/Dorkinians Logo - Header and Side Menu.webp" class="side-menu-icon" alt="Dorkinians Logo Icon" height="25px">
                            </a>
                        </div>
                        <div class="side-menu-text-container">
                            <a href="https://www.dorkiniansfc.co.uk/">
                                <h4>dorkiniansfc.co.uk</h4>
                            </a>
                        </div>

                        <!-- Add a link to the FA homepage. -->
                        <div class="side-menu-icon-container">
                            <a href="https://fulltime.thefa.com/index.html?league=9031785&selectedSeason=697858796&selectedDivision=921408008&selectedCompetition=0&selectedFixtureGroupKey=1_513480600">
                                <img src="/pages/Dorkinians-Page/images/The FA Logo Icon.webp" class="side-menu-icon" alt="The FA Logo Icon" height="25px">
                            </a>
                        </div>
                        <div class="side-menu-text-container">
                            <a href="https://fulltime.thefa.com/index.html?league=9031785&selectedSeason=697858796&selectedDivision=921408008&selectedCompetition=0&selectedFixtureGroupKey=1_513480600">
                                <h4>FULL-TIME.TheFA.com</h4>
                            </a>
                        </div>
                    
                    </div>

                </section>

                <!-- The additional section of the side bar menu. -->
                <section id="side-menu-additional-section" class="side-menu-section">

                    <h3 class="side-menu-section-header">Additional</h3>

                    <!-- Add a "Stat Details" clickable option. -->
                    <div class="side-menu-additional-section-item-container">
                        <a href="javascript:void(0)" onclick="openPopUpBox('Stat Details', displaySiteDetailsArrayOfObjects[0]['Stat Details'])">Stat Details</a>
                    </div>

                    <!-- Add a "Version Release Details" clickable option. -->
                    <div class="side-menu-additional-section-item-container">
                        <a href="javascript:void(0)" onclick="openPopUpBox('Version Release Details', displaySiteDetailsArrayOfObjects[0]['Version Release Details'])">Version Release Details</a>
                    </div>

                    <!-- Add an "Updates To Come" clickable option. -->
                    <div class="side-menu-additional-section-item-container">
                        <a href="javascript:void(0)" onclick="openPopUpBox('Updates To Come', displaySiteDetailsArrayOfObjects[0]['Updates To Come'])">Updates To Come</a>
                    </div>

                    <!-- Add a "Stat Limitations" clickable option. -->
                    <div class="side-menu-additional-section-item-container">
                        <a href="javascript:void(0)" onclick="openPopUpBox('Stat Limitations', displaySiteDetailsArrayOfObjects[0]['Stat Limitations'])">Stat Limitations</a>
                    </div>

                </section>

            </div>

        </div>

`;
sideMenuTemplate.innerHTML = sideMenuHTML;

// 0.2. Create a sideMenu class for the element.
class sideMenu extends HTMLElement {
  // Always call super first in constructor
  constructor() {
    super();
  }

  connectedCallback() {
    // Create a shadow root
    const shadowRoot = this.attachShadow({ mode: "open" });

    // Apply external styles to the shadow DOM
    const styleSheet = document.createElement("link");
    styleSheet.setAttribute("rel", "stylesheet");
    styleSheet.setAttribute(
      "href",
      "/pages/Dorkinians-Page/DorkiniansMain.min.css"
    );
    shadowRoot.appendChild(styleSheet);

    // Attach the created elements to the shadow DOM
    shadowRoot.appendChild(sideMenuTemplate.content);
  }
}

// 0.3. Define the custom HTML element.
customElements.define("side-menu-component", sideMenu);

// 0.4 Side Bar JavaScript Sub Functions

// 0.4.1. Publically define a number of global constants and variables.
var sideMenuWidth = "80%"; // Originally 15.6rem.
var fontSizeMin = 10; // Set a minimum font size in pixels.
var fontSizeMax = 22; // Set a maximum font size in pixels.
var pageHeightMin = 0; // Set a minimum page height in pixels.
var pageHeightMax = 100; // Set a maximum page height in pixels.

// 0.4.2. Open the navigation side menu. https://www.codingflicks.com/2020/12/toggle-sidebar-navigation-html-css-javascript.html
function openNav() {
  // Work down the DOM, finding the 'side-menu-component' element and then look inside it for the id 'side-menu'.
  document
    .getElementsByTagName("side-menu-component")[0]
    .shadowRoot.getElementById("side-menu").style.width = sideMenuWidth; // Increase the width of the side-menu to make it visible.
  document
    .getElementsByTagName("side-menu-component")[0]
    .shadowRoot.getElementById("side-menu").style.right = "0rem"; // Reset the side menu side to the edge of the screen.

  // Show the background overlay.
  document.getElementById("background-overlay-side-menu").style.display =
    "inline"; // Show the background overlay behind the side menu.
  document.getElementById("background-overlay-side-menu").style.zIndex = 19; // Set the z-index of the background overlay to be right behind the side menu.

  // Check if the tag 'header-component' really exists or not. If it does, action on it. If not (as for the home page), do nothing.
  var myEle = document.getElementsByTagName("header-component")[0];
  if (myEle) {
    // Work down the DOM, finding the 'header-component' element and then look inside it for the id 'options-button'.
    document
      .getElementsByTagName("header-component")[0]
      .shadowRoot.getElementById("options-button").style.display = "none"; // Hide the options icon.
  } else {
    //console.log("not doing anything");
  }
}

// 0.4.3. Close the navigation side menu.
function closeNav() {
  // Work down the DOM, finding the 'side-menu-component' element and then look inside it for the id 'side-menu'.
  document
    .getElementsByTagName("side-menu-component")[0]
    .shadowRoot.getElementById("side-menu").style.width = "0"; // Reduce the width of the side-menu to make it invisible.
  document
    .getElementsByTagName("side-menu-component")[0]
    .shadowRoot.getElementById("side-menu").style.right = "-0.1rem"; // Slightly position the side-menu off to the side to avoid seing the border.

  // Hide the background overlay.
  document.getElementById("background-overlay-side-menu").style.display =
    "none"; // Hide the background overlay behind the side menu.

  // Check if the tag 'header-component' really exists or not. If it does, action on it. If not (as for the home page), do nothing.
  var myEle = document.getElementsByTagName("header-component")[0];
  if (myEle) {
    // Work down the DOM, finding the 'header-component' element and then look inside it for the id 'options-button'.
    document
      .getElementsByTagName("header-component")[0]
      .shadowRoot.getElementById("options-button").style.display = "inline"; // Show the options icon.
  } else {
    //console.log("not doing anything");
  }
}

// 0.4.4. Change the site theme style.
function changeSiteTheme() {
  console.log("changeSiteTheme clicked."); // Log that the function has been called.

  // Select the element holding the change site theme text.
  let themeTextElement = document
    .getElementsByTagName("side-menu-component")[0]
    .shadowRoot.getElementById("side-menu-actions-change-theme-text");

  // Check which site theme has been selected and then define the required colours for the CSS styling sheet.
  if (themeTextElement.innerHTML == "Change to Dark Theme") {
    // Change site theme to dark mode.

    // Modify the CSS variable of the DorkiniansMain.css stylesheet. https://stackoverflow.com/a/37802204/14290169.
    document.documentElement.style.setProperty(
      "--main-background-colour",
      "#222129"
    );
    document.documentElement.style.setProperty(
      "--secondary-background-colour",
      "#252432"
    );
    document.documentElement.style.setProperty(
      "--third-background-colour",
      "#282735"
    );
    document.documentElement.style.setProperty(
      "--main-accent-colour",
      "#FF3CAC"
    );
    document.documentElement.style.setProperty(
      "--main-accent-colour-rgb",
      "255, 60, 172"
    );
    document.documentElement.style.setProperty(
      "--secondary-accent-colour",
      "#FFFFFF85"
    );
    document.documentElement.style.setProperty(
      "--tooltip-background-colour",
      "#222129"
    );

    // Change the text of the element holding the change site theme text.
    themeTextElement.innerHTML = "Change to Light Theme";

    // Update the weather widget. See weatherWidget.js for details.
    createWeatherWidgetHTML("#FF3CAC", "#FFFFFF85", "#222129");
    buildWeatherWidget();
  } else {
    // Change site theme to light mode.

    // Modify the CSS variable of the DorkiniansMain.css stylesheet. https://stackoverflow.com/a/37802204/14290169.
    document.documentElement.style.setProperty(
      "--main-background-colour",
      "#1C8841"
    );
    document.documentElement.style.setProperty(
      "--secondary-background-colour",
      "#31a057"
    );
    document.documentElement.style.setProperty(
      "--third-background-colour",
      "#236f38"
    );
    document.documentElement.style.setProperty(
      "--main-accent-colour",
      "#F9ED32"
    );
    document.documentElement.style.setProperty(
      "--main-accent-colour-rgb",
      "249, 237, 50"
    );
    document.documentElement.style.setProperty(
      "--secondary-accent-colour",
      "#FFFFFF"
    );
    document.documentElement.style.setProperty(
      "--tooltip-background-colour",
      "#236f38"
    );

    // Change the text of the element holding the change site theme text.
    themeTextElement.innerHTML = "Change to Dark Theme";

    // Update the weather widget. See weatherWidget.js for details.
    createWeatherWidgetHTML("#F9ED32", "#FFFFFF", "#1C8841");
    buildWeatherWidget();
  }

  closeNav(); // Close the side navigation that the function was called from.
  //console.log("Site theme changed."); // Log a final success message.
}

// 0.4.5. Change the site text size.
function changeTextSize(delta) {
  console.log("changeTextSize clicked. Font size changed by " + delta + "."); // Log that the function has been called.

  let fontSize = getComputedStyle(document.documentElement).getPropertyValue(
    "--main-font-size"
  ); // Get the value of the CSS variable as a string. https://davidwalsh.name/css-variables-javascript.
  fontSize = parseInt(fontSize.replace("px", "")); // Remove the pixels from the returned string.

  console.log("fontSize before is = " + fontSize); // Log the font size value before the function has been run.

  if (delta == 1) {
    // Increment the font size to be larger.
    if (fontSize < fontSizeMax) {
      // Only increment the font size if it is less than the max.
      fontSize += delta;
    }
  } else {
    // Decrement the font size to be smaller.
    if (fontSize > fontSizeMin) {
      // Only dedcrement the font size if it is larger than the min.
      fontSize += delta;
    }
  }
  console.log("fontSize after is = " + fontSize); // Log the font size value after the function has been run.

  // Append the pixels to the new value.
  fontSize = fontSize + "px";

  // Modify the CSS variable of the DorkiniansMain.css stylesheet. https://stackoverflow.com/a/37802204/14290169.
  document.documentElement.style.setProperty("--main-font-size", fontSize);
  document.documentElement.style.setProperty("font-size", fontSize);
}
function increaseFontSize() {
  changeTextSize(1);
}
function decreaseFontSize() {
  changeTextSize(-1);
}

// 0.4.6. Reset all previously modified variables.
function resetActionVariables() {
  // Modify the CSS variable of the DorkiniansMain.css stylesheet. https://stackoverflow.com/a/37802204/14290169.
  document.documentElement.style.setProperty("--main-font-size", "16px");
  document.documentElement.style.setProperty("font-size", "16px");
  // Modify the CSS variable of the DorkiniansMain.css stylesheet. https://stackoverflow.com/a/37802204/14290169.
  document.documentElement.style.setProperty(
    "--main-background-colour",
    "#1C8841"
  );
  document.documentElement.style.setProperty(
    "--secondary-background-colour",
    "#31a057"
  );
  document.documentElement.style.setProperty(
    "--third-background-colour",
    "#236f38"
  );
  document.documentElement.style.setProperty("--main-accent-colour", "#F9ED32");
  document.documentElement.style.setProperty(
    "--main-accent-colour-rgb",
    "249, 237, 50"
  );
  document.documentElement.style.setProperty(
    "--secondary-accent-colour",
    "#FFFFFF"
  );
  document.documentElement.style.setProperty(
    "--tooltip-background-colour",
    "#236f38"
  );
  openPopUpBox("Page Settings Reset", "Font size and theme reset."); // Display a pop up to show the reset has worked.
}

// 0.5. Side Menu data "getter" function.
function getSideMenuInfo(results) {
  // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
  console.log(
    "%c" + ">> getSideMenuInfo.",
    "background-color: yellow; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Process the original array of objects received.
  displaySiteDetailsArrayOfObjects = results.data; // Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
  // console.log("Global variable 'displaySiteDetailsArrayOfObjects' defined:"); // Log the global variable.
  // console.log("getSideMenuInfo:");
  // console.log(displaySiteDetailsArrayOfObjects); // Log the global variable.
  showSideMenuInfo(displaySiteDetailsArrayOfObjects); // Call the showSideMenuInfo function.
}

// 0.6. Side Menu data "show-er" function.
function showSideMenuInfo(results) {
  // Display the retrieved data onto the page.
  console.log(
    "%c" + ">> showSideMenuInfo.",
    "background-color: yellow; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Set the dataArrayOfObjects.
  const dataArrayOfObjects = results; // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.

  // console.log(dataArrayOfObjects); // Log the received array of objects.
  var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
  // console.log("Original Length of dataArrayOfObjects = " + objectLength); // Log the original length.

  // Populate the site details information into the side menu.
  // Work down the DOM, finding the 'side-menu-component' element and then look inside it for ids to populate.
  document
    .getElementsByTagName("side-menu-component")[0]
    .shadowRoot.getElementById(
      "side-menu-site-details-version-number-text"
    ).innerHTML = displaySiteDetailsArrayOfObjects[0]["Version Number"]; // Add the text to the side menu.
  document
    .getElementsByTagName("side-menu-component")[0]
    .shadowRoot.getElementById(
      "side-menu-site-details-current-season-text"
    ).innerHTML = displaySiteDetailsArrayOfObjects[0]["Current Season"]; // Add the text to the side menu.
  document
    .getElementsByTagName("side-menu-component")[0]
    .shadowRoot.getElementById(
      "side-menu-site-details-last-updated-stats-text"
    ).innerHTML = displaySiteDetailsArrayOfObjects[0]["Last Updated Stats"]; // Add the text to the side menu.
  document
    .getElementsByTagName("side-menu-component")[0]
    .shadowRoot.getElementById(
      "side-menu-site-details-page-details-last-refereshed-text"
    ).innerHTML =
    displaySiteDetailsArrayOfObjects[0]["Page Details Last Refreshed"]; // Add the text to the side menu.

  // Increment the component ready count by 1.
  incrementComponentReadyCount("Side Menu");
}

// Dropdowns

// 0.7. Player Dropdown data "getter" function.
function getPlayerDropdownInfo() {
  // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
  console.log(
    "%c" + ">> getPlayerDropdownInfo.",
    "background-color: darkblue; color:white; padding: 0.5em 0em; font-weight: bold;"
  );

  // Filter the All Time Stat details object down to just the players allowed on the site. https://masteringjs.io/tutorials/fundamentals/filter-array-of-objects
  const displayAllowedPlayersArrayOfObjects =
    displayAllTimeStatsArrayOfObjects.filter(
      (playersData) => playersData.ALLOWEDONSITE === "TRUE"
    );
  // console.log("displayAllowedPlayersArrayOfObjects"); // Log the filtered object.
  // console.table(displayAllowedPlayersArrayOfObjects); // Log the filtered object in a table format.

  // Next, map the object just down to the player names.
  let allowedPlayers = displayAllowedPlayersArrayOfObjects.map(({ NAME }) => {
    return [NAME];
  });
  // console.log("allowedPlayers"); // Log the mapped object.
  // console.log(allowedPlayers); // Log the mapped object.

  // Finally, turn the object into an array to pass to the populateDropdownList function.
  const allowedPlayersArray = Object.values(allowedPlayers);
  // console.log("allowedPlayersArray");
  // console.log(allowedPlayersArray);

  // Populate the various dropdown components with player names.
  // Player Stats tab
  populateDropdownList(
    "player-stats",
    allowedPlayersArray,
    "player-stats-selection-dropdown",
    "player-stats-selection-dropdown-button",
    "player-stats-selection-dropdown-option-container"
  ); // Call the populateDropdownList function.
  // Comparison Tab
  populateDropdownList(
    "comparison",
    allowedPlayersArray,
    "comparison-player-1-selection-dropdown",
    "comparison-player-1-selection-dropdown-button",
    "comparison-player-1-selection-dropdown-option-container"
  ); // Call the populateDropdownList function.
  populateDropdownList(
    "comparison",
    allowedPlayersArray,
    "comparison-player-2-selection-dropdown",
    "comparison-player-2-selection-dropdown-button",
    "comparison-player-2-selection-dropdown-option-container"
  ); // Call the populateDropdownList function.

  // Increment the component ready count by 1.
  incrementComponentReadyCount("Dropdowns populated");
}

// 0.8. Snap Tabs

// Add a function used for SnapTabs. See https://web.dev/building-a-tabs-component/.
function t(t) {
  var n = Array.isArray(t) ? e(t) : void 0;
  if (
    (n ||
      (n =
        "undefined" != typeof Symbol && Symbol.iterator in Object(t)
          ? Array.from(t)
          : void 0),
    !n)
  )
    t: {
      if (t) {
        if ("string" == typeof t) {
          n = e(t, void 0);
          break t;
        }
        if (
          ("Object" === (n = Object.prototype.toString.call(t).slice(8, -1)) &&
            t.constructor &&
            (n = t.constructor.name),
          "Map" === n || "Set" === n)
        ) {
          n = Array.from(n);
          break t;
        }
        if (
          "Arguments" === n ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        ) {
          n = e(t, void 0);
          break t;
        }
      }
      n = void 0;
    }
  if (!(t = n))
    throw new TypeError(
      "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  return t;
}
function e(t, e) {
  (null == e || e > t.length) && (e = t.length);
  for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
  return r;
}
!(function () {
  function t(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(t, r.key, r);
    }
  }
  function e(e, n, r) {
    return n && t(e.prototype, n), r && t(e, r), e;
  }
  function n(t) {
    return (t = t.trim().match(/^(-?[0-9]*\.?[0-9]*)(px|%)$/))
      ? { value: t[1], unit: t[2] }
      : null;
  }
  function r(t) {
    return t === document.scrollingElement ? document : t;
  }
  function o(t) {
    var e = a.get(t).animations;
    if (0 !== e.length) {
      t = t.currentTime;
      for (var n = 0; n < e.length; n++)
        null == t
          ? "paused" === e[n].playState && e[n].cancel()
          : (e[n].currentTime = t);
    }
  }
  function i(t) {
    return 1 / 0 === t.iterationCount
      ? 1 / 0
      : Math.max(
          (t.startDelay || 0) +
            (t.duration || 0) * (t.iterationCount || 1) +
            (t.endDelay || 0),
          0
        );
  }
  function l(t, e, r, o, i) {
    return i
      ? i(e, r, o, "0%" === t ? "start" : "end")
      : ("block" === r
          ? (r = "vertical")
          : "inline" === r && (r = "horizontal"),
        (e =
          "vertical" === r
            ? e.scrollHeight - e.clientHeight
            : e.scrollWidth - e.clientWidth),
        "%" === (t = n("auto" === o ? t : o)).unit
          ? (parseFloat(t.value) * e) / 100
          : parseFloat(t.value));
  }
  var a = new WeakMap(),
    c = [],
    s = (function () {
      function t(t) {
        a.set(this, {
          scrollSource: null,
          orientation: "block",
          startScrollOffset: "auto",
          endScrollOffset: "auto",
          timeRange: "auto",
          fill: "none",
          animations: [],
          animationOptions: [],
        }),
          (this.scrollSource =
            (t && t.scrollSource) || document.scrollingElement),
          (this.orientation = (t && t.orientation) || "block"),
          (this.startScrollOffset = (t && t.startScrollOffset) || "auto"),
          (this.endScrollOffset = (t && t.endScrollOffset) || "auto"),
          (this.timeRange = (t && t.timeRange) || "auto"),
          (this.fill = (t && t.fill) || "none");
      }
      return (
        e(t, [
          {
            key: "scrollSource",
            set: function (t) {
              var e = this;
              this.scrollSource &&
                r(this.scrollSource).removeEventListener("scroll", function () {
                  return o(e);
                }),
                t instanceof Element || (t = document.scrollingElement),
                (a.get(this).scrollSource = t),
                r(t).addEventListener("scroll", function () {
                  return o(e);
                }),
                o(this);
            },
            get: function () {
              return a.get(this).scrollSource;
            },
          },
          {
            key: "orientation",
            set: function (t) {
              -1 === ["block", "inline", "horizontal", "vertical"].indexOf(t) &&
                (t = "block"),
                (a.get(this).orientation = t),
                o(this);
            },
            get: function () {
              return a.get(this).orientation;
            },
          },
          {
            key: "startScrollOffset",
            set: function (t) {
              var e = a.get(this);
              e.startScrollOffsetFunction = null;
              for (var n = 0; n < c.length; n++) {
                var r = c[n].parse(t);
                if (void 0 !== r) {
                  (t = r), (e.startScrollOffsetFunction = c[n].evaluate);
                  break;
                }
              }
              (e.startScrollOffset = t), o(this);
            },
            get: function () {
              return a.get(this).startScrollOffset;
            },
          },
          {
            key: "endScrollOffset",
            set: function (t) {
              a.get(this).endScrollOffsetFunction = null;
              for (var e = 0; e < c.length; e++) {
                var n = c[e].parse(t);
                if (void 0 !== n) {
                  (t = n),
                    (a.get(this).endScrollOffsetFunction = c[e].evaluate);
                  break;
                }
              }
              (a.get(this).endScrollOffset = t), o(this);
            },
            get: function () {
              return a.get(this).endScrollOffset;
            },
          },
          {
            key: "timeRange",
            set: function (t) {
              (a.get(this).timeRange = t), o(this);
            },
            get: function () {
              return a.get(this).timeRange;
            },
          },
          {
            key: "currentTime",
            get: function () {
              if (!this.scrollSource) return null;
              var t,
                e,
                n = l(
                  "0%",
                  this.scrollSource,
                  this.orientation,
                  this.startScrollOffset,
                  a.get(this).startScrollOffsetFunction
                ),
                r = l(
                  "100%",
                  this.scrollSource,
                  this.orientation,
                  this.endScrollOffset,
                  a.get(this).endScrollOffsetFunction
                ),
                o = this.timeRange;
              if ("auto" === o) {
                o = 0;
                for (
                  var c = a.get(this).animationOptions, s = 0;
                  s < c.length;
                  s++
                )
                  o = Math.max(o, i(c[s]));
                1 / 0 === o && (o = 0);
              }
              return (
                (c = this.scrollSource.scrollTop),
                ("inline" !== this.orientation &&
                  "horizontal" !== this.orientation) ||
                  (c = this.scrollSource.scrollLeft),
                c < n
                  ? "none" === this.fill || "forwards" === this.fill
                    ? null
                    : 0
                  : c >= r
                  ? r <
                      ((t = this.scrollSource),
                      "block" === (e = this.orientation)
                        ? (e = "vertical")
                        : "inline" === e && (e = "horizontal"),
                      "vertical" === e
                        ? t.scrollHeight - t.clientHeight
                        : "horizontal" === e
                        ? t.scrollWidth - t.clientWidth
                        : void 0) &&
                    ("none" === this.fill || "backwards" === this.fill)
                    ? null
                    : o
                  : ((c - n) / (r - n)) * o
              );
            },
          },
          {
            key: "__polyfill",
            get: function () {
              return !0;
            },
          },
        ]),
        t
      );
    })(),
    u = new WeakMap(),
    f = [
      [[0, 1, 2, 3]],
      [
        [0, 2],
        [1, 3],
      ],
      [[0], [1, 3], [2]],
      [[0], [1], [2], [3]],
    ],
    h = (function () {
      function t(t) {
        u.set(this, {
          target: null,
          edge: "start",
          threshold: 0,
          rootMargin: [
            [0, "px"],
            [0, "px"],
            [0, "px"],
            [0, "px"],
          ],
        }),
          (this.target = t.target),
          (this.edge = t.edge || "start"),
          (this.threshold = t.threshold || 0),
          (this.rootMargin = t.rootMargin || "0px 0px 0px 0px"),
          (this.clamp = t.clamp || !1);
      }
      return (
        e(t, [
          {
            key: "target",
            set: function (t) {
              if (!(t instanceof Element))
                throw (
                  ((u.get(this).target = null),
                  Error("Intersection target must be an element."))
                );
              u.get(this).target = t;
            },
            get: function () {
              return u.get(this).target;
            },
          },
          {
            key: "edge",
            set: function (t) {
              -1 != ["start", "end"].indexOf(t) && (u.get(this).edge = t);
            },
            get: function () {
              return u.get(this).edge;
            },
          },
          {
            key: "threshold",
            set: function (t) {
              if (0 > (t = parseFloat(t)) || 1 < t)
                throw RangeError("threshold must be in the range [0, 1]");
              u.get(this).threshold = t;
            },
            get: function () {
              return u.get(this).threshold;
            },
          },
          {
            key: "rootMargin",
            set: function (t) {
              if (1 > (t = t.split(/ +/)).length || 4 < t.length)
                throw TypeError(
                  "rootMargin must contain between 1 and 4 length components"
                );
              for (var e = [[], [], [], []], r = 0; r < t.length; r++) {
                var o = n(t[r]);
                if (!o) throw TypeError("Unrecognized rootMargin length");
                for (var i = f[t.length - 1][r], l = 0; l < i.length; l++)
                  e[i[l]] = [parseFloat(o.value), o.unit];
              }
              u.get(this).rootMargin = e;
            },
            get: function () {
              return u
                .get(this)
                .rootMargin.map(function (t) {
                  return t.join("");
                })
                .join(" ");
            },
          },
          {
            key: "clamp",
            set: function (t) {
              u.get(this).clamp = !!t;
            },
          },
        ]),
        t
      );
    })(),
    g = window.Element.prototype.animate;
  if (
    (c.push({
      parse: function (t) {
        if (t.target) return new h(t);
      },
      evaluate: function (t, e, n) {
        "block" == e ? (e = "vertical") : "inline" == e && (e = "horizontal");
        for (
          var r,
            o =
              t == document.scrollingElement
                ? {
                    left: 0,
                    right: t.clientWidth,
                    top: 0,
                    bottom: t.clientHeight,
                    width: t.clientWidth,
                    height: t.clientHeight,
                  }
                : t.getBoundingClientRect(),
            i = u.get(n).rootMargin,
            l = [],
            a = 0;
          4 > a;
          a++
        )
          l.push(
            "%" == (r = i[a])[1]
              ? (r[0] * (0 == a % 2 ? o.height : o.width)) / 100
              : r[0]
          );
        (i = o.left - l[3]),
          (r = o.right - o.left + l[3] + l[1]),
          (a = o.top - l[0]),
          (l = o.bottom - o.top + l[0] + l[2]),
          (o = u.get(n).clamp);
        var c = n.target.getBoundingClientRect(),
          s = n.threshold;
        return (
          "start" == n.edge && (s = 1 - s),
          "vertical" == e
            ? ((e = c.top + c.height * s - a + t.scrollTop),
              o
                ? "end" == n.edge
                  ? Math.max(0, e - l)
                  : Math.min(e, t.scrollHeight - l)
                : "end" == n.edge
                ? e - l
                : e)
            : ((e = c.left + c.width * s - i + t.scrollLeft),
              o
                ? "end" == n.edge
                  ? Math.max(0, e - r)
                  : Math.min(e, t.scrollWidth - r)
                : "end" == n.edge
                ? e - r
                : e)
        );
      },
    }),
    !Reflect.defineProperty(window, "ScrollTimeline", { value: s }))
  )
    throw Error(
      "Error installing ScrollTimeline polyfill: could not attach ScrollTimeline to window"
    );
  if (
    !Reflect.defineProperty(Element.prototype, "animate", {
      value: function (t, e) {
        var n = e.timeline;
        if (!(n && n instanceof s)) return g.apply(this, [t, e]);
        delete e.timeline, (t = g.apply(this, [t, e])).pause();
        var r = a.get(n).animations,
          i = a.get(n).animationOptions;
        return r.push(t), i.push(e), o(n), t;
      },
    })
  )
    throw Error(
      "Error installing ScrollTimeline polyfill: could not attach WAAPI's animate to DOM Element"
    );
})();
var n = window.matchMedia("(prefers-reduced-motion: no-preference)").matches,
  r = document.querySelector("snap-tabs"),
  o = r.querySelector(":scope > section"),
  i = r.querySelector(":scope nav"),
  l = i.querySelectorAll(":scope a"),
  a = r.querySelector(":scope .snap-indicator"),
  c = new ScrollTimeline({
    scrollSource: o,
    orientation: "inline",
    fill: "both",
  });
function s(t) {
  i.querySelector(":scope a[active]").removeAttribute("active"),
    t.setAttribute("active", ""),
    t.scrollIntoView();
}
function u() {
  var t = l[o.scrollLeft / o.clientWidth];
  t && s(t);
}
l.forEach(function (e) {
  e.animate(
    {
      color: t(l).map(function (t) {
        return t === e ? "var(--text-active-color)" : "var(--text-color)";
      }),
    },
    { duration: 1e3, fill: "both", timeline: c }
  );
}),
  n &&
    a.animate(
      {
        transform: t(l).map(function (t) {
          return "translateX(".concat(t.offsetLeft, "px)");
        }),
        width: t(l).map(function (t) {
          return "".concat(t.offsetWidth, "px");
        }),
      },
      { duration: 1e3, fill: "both", timeline: c }
    ),
  i.addEventListener("click", function (t) {
    "A" === t.target.nodeName && s(t.target);
  }),
  o.addEventListener("scroll", function () {
    clearTimeout(o.scrollEndTimer), (o.scrollEndTimer = setTimeout(u, 100));
  }),
  (window.onload = function () {
    location.hash &&
      (o.scrollLeft = document.querySelector(location.hash).offsetLeft),
      u();
  });
//# sourceMappingURL=bundle.js.map

// Tab Functions

// 1. Homepage Tab

// 1.1. Homepage tab next fixtures data "getter" function.
function getHomepageTabNextFixturesInfo(results) {
  // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
  console.log(
    "%c" + ">> getHomepageTabNextFixturesInfo.",
    "background-color: orange; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Process the original array of objects received.
  displayNextFixturesArrayOfObjects = results.data; // Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
  // console.log("Global variable 'displayNextFixturesArrayOfObjects' defined:"); // Log the global variable.
  // console.log("getHomepageTabNextFixturesInfo");
  // console.log(displayNextFixturesArrayOfObjects); // Log the global variable.
  showHomepageTabNextFixturesInfo(displayNextFixturesArrayOfObjects); // Call the showHomepageTabNextFixturesInfo function.
}

// 1.2. Homepage tab next fixtures data "show-er" function.
function showHomepageTabNextFixturesInfo(results) {
  // Display the retrieved data onto the page.
  console.log(
    "%c" + ">> showHomepageTabNextFixturesInfo.",
    "background-color: orange; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Set the dataArrayOfObjects.
  const dataArrayOfObjects = results; // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.
  // console.log(dataArrayOfObjects); // Log the received array of objects.
  var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
  // console.log("Original Length of dataArrayOfObjects = " + objectLength); // Log the original length.

  // console.log("dataArrayOfObjects[0]");
  // console.log(dataArrayOfObjects[0]);

  // Populate the team next fixtures information on the page.

  // Define an array of teams to update. Each stat corresponds to an HTML element.
  let teamArray = [
    "1stXI",
    "2ndXI",
    "3rdXI",
    "4thXI",
    "5thXI",
    "6thXI",
    "7thXI",
    "8thXI",
  ];
  for (let i = 0; i < teamArray.length; i++) {
    var teamFixtureObject = dataArrayOfObjects[i];
    // console.log(teamArray[i]); // Log the team being updated.
    document.getElementById(teamArray[i] + "-Opposition").innerHTML =
      teamFixtureObject["NEXTOPPO"]; // Get the Opposition text element and add the text to it.
    document.getElementById(teamArray[i] + "-Location").innerHTML =
      teamFixtureObject["LOCATION"]; // Get the Location text element and add the text to it.
    document.getElementById(teamArray[i] + "-Competition").innerHTML =
      teamFixtureObject["COMPETITION"]; // Get the Competition text element and add the text to it.
    document.getElementById(teamArray[i] + "-LastResult").innerHTML =
      teamFixtureObject["LASTRESULT"]; // Get the LastResult text element and add the text to it.
  }

  // Increment the component ready count by 1.
  incrementComponentReadyCount("Homepage Next Fixtures");
}

// 1.3. Homepage tab captains and awards data "getter" function.
function getHomepageTabCaptainsAndAwardsInfo(results) {
  // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
  console.log(
    "%c" + ">> getHomepageTabCaptainsAndAwardsInfo.",
    "background-color: orange; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Process the original array of objects received.
  displayCaptainsAndAwardsArrayOfObjects = results.data; // Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
  // console.log("Global variable 'displayCaptainsAndAwardsArrayOfObjects' defined:"); // Log the global variable.
  console.log("getHomepageTabCaptainsAndAwardsInfo");
  console.log(displayCaptainsAndAwardsArrayOfObjects); // Log the global variable.
  showHomepageTabCaptainsAndAwardsInfo(displayCaptainsAndAwardsArrayOfObjects); // Call the showHomepageTabCaptainsAndAwardsInfo function.
}

// 1.4. Homepage tab captains and awards data "show-er" function.
function showHomepageTabCaptainsAndAwardsInfo(results) {
  // Display the retrieved data onto the page.
  console.log(
    "%c" + ">> showHomepageTabCaptainsAndAwardsInfo.",
    "background-color: orange; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Set the dataArrayOfObjects.
  const dataArrayOfObjects = results; // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.
  // console.log(dataArrayOfObjects); // Log the received array of objects.
  var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
  // console.log("Original Length of dataArrayOfObjects = " + objectLength); // Log the original length.

  // console.log("dataArrayOfObjects");
  // console.log(dataArrayOfObjects);

  // Get the drop down selection values to be used for displaying the correct information.

  // Display selection. Letting user choose what to display (captains, club awards or team awards).
  var displayValueDropdown = document.getElementById(
    "homepage-captains-and-awards-display-selection-dropdown"
  ); // Get the display selected dropdown.
  var displayValue =
    displayValueDropdown.options[displayValueDropdown.selectedIndex].value; // Get the display selected. (https://stackoverflow.com/a/8549358/14290169).

  // Season selection.
  var seasonValueDropdown = document.getElementById(
    "homepage-captains-and-awards-season-selection-dropdown"
  ); // Get the season selected dropdown.
  var seasonValue =
    seasonValueDropdown.options[seasonValueDropdown.selectedIndex].text; // Get the season selected. (https://stackoverflow.com/a/8549358/14290169).

  // Populate the captains and awards details on the page.
  for (let i = 0; i < objectLength; i++) {
    let HTMLID = dataArrayOfObjects[i]["HTML ID"]; // Define the HTML ID to be updated that is received from the data array of objects.
    let foundValue = dataArrayOfObjects[i][seasonValue]; // Define the person to be added to the page that is recieved from the data array of objects.
    document.getElementById("homepage-" + HTMLID).innerHTML = foundValue; // Add the found player name(s) to the page.
  }

  // Loop through all child elements of the container and hide based on if their class matches the user selection. https://www.tutorialkart.com/javascript/how-to-iterate-over-children-of-html-element-in-javascript/
  let parentElement = document.getElementById(
    "homepage-club-captains-and-awards-grid-container"
  ); // Define the parent container element.
  let childrenElements = parentElement.children; // Define an array of child elements.
  for (var i = 0; i < childrenElements.length; i++) {
    let childElement = childrenElements[i]; // Define the child element to change.
    if (childElement.classList.contains(displayValue)) {
      // Check if the element has a class with name "displayValue". https://stackoverflow.com/a/5898748/14290169
      // Show the elements as the selection matches the value.
      childElement.classList.remove("hidden"); // Apply the correct CSS class to the container element.
    } else {
      // Hide the elements as the selection does not match the value.
      childElement.classList.add("hidden"); // Apply the correct CSS class to the container element.
    }
  }

  // Increment the component ready count by 1.
  incrementComponentReadyCount("Homepage Captains and Awards");
}

// 1.5. Homepage data "update-er" function.
function updateHomepageInfo() {
  // Create a function that is called when the user changes a dropdown on the Homepage tab. This function is called from the HTML select elements.

  // Display the refreshed data onto the page.
  console.log(
    "%c" + ">> updateHomepageInfo.",
    "background-color: orange; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Start the rotation of the Dorkinians logo to simulate loading.
  rotateLogo("dorkinians-header-logo");

  // Re-call the Team Season shower function to restart the process of showing data.
  showHomepageTabCaptainsAndAwardsInfo(displayCaptainsAndAwardsArrayOfObjects); // Call the showHomepageTabCaptainsAndAwardsInfo function.

  // End the rotation of the Dorkinians logo to simulate loading being completed.
  stopRotateLogo("dorkinians-header-logo");
}

// 1.6. Homepage tab Weather Forecast. weatherWidget.js JavaScript. https://weatherwidget.io/. Javascript for building and creating the weather widget.

// 1.6.1. buildWeatherWidget.
function buildWeatherWidget() {
  // console.log("buildWeatherWidget called."); // Log the function to the console.

  // Call the original script used to build the weather widget.
  !(function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = "https://weatherwidget.io/js/widget.min.js";
      fjs.parentNode.insertBefore(js, fjs);
    }
  })(document, "script", "weatherwidget-io-js");
}

// 1.6.2. createWeatherWidgetHTML.
function createWeatherWidgetHTML(highColor, lowColor, cloudFillColor) {
  // console.log("createWeatherWidgetHTML called."); // Log the function to the console.

  // Define the parent element of the widget.
  let parentElement = document.getElementById("weather-widget-container");

  // Clear all children elements from the container (deleting all of the previous widget).
  parentElement.innerHTML = ""; // Clear all children. https://stackoverflow.com/a/3955238/14290169.

  // Create the new element.
  let weatherElement = document.createElement("a");

  // Set all of the properties of the element.
  weatherElement.setAttribute("id", "weather-widget");
  weatherElement.setAttribute("class", "weatherwidget-io");
  weatherElement.setAttribute("SameSite", "None");
  weatherElement.setAttribute(
    "href",
    "https://forecast7.com/en/51d23n0d33/dorking/"
  );
  weatherElement.setAttribute("data-label_1", "PIXHAM LANE, DORKING");
  weatherElement.setAttribute("data-label_2", "Weather");
  weatherElement.setAttribute("data-icons", "Climacons Animated");
  weatherElement.setAttribute("data-theme", "original");
  weatherElement.setAttribute("data-basecolor", "rgba(0, 0, 0, 0.05)");
  weatherElement.setAttribute("data-accent", "rgba(0, 0, 0, 0.05)");
  weatherElement.setAttribute("data-highcolor", highColor);
  weatherElement.setAttribute("data-lowcolor", lowColor);
  weatherElement.setAttribute("data-suncolor", "#F9ED32");
  weatherElement.setAttribute("data-cloudfill", cloudFillColor);
  weatherElement.setAttribute("data-raincolor", "#00ffff");
  weatherElement.innerHTML = "PIXHAM LANE Weather";

  // Add the new element into the DOM.
  parentElement.appendChild(weatherElement);

  // Create the new script element.
  let scriptElement = document.createElement("script");

  // Set all of the properties of the element.
  scriptElement.setAttribute("id", "weatherwidget-io-js");
  scriptElement.setAttribute(
    "src",
    "https://weatherwidget.io/js/widget.min.js"
  );

  // Add the new element into the DOM.
  weatherElement.appendChild(scriptElement);
}

// 2. Club/Team Stats Tab

// 2.1 Total Club Stats

// 2.1.1. Total Club Stats Info data "getter" function.
function getTotalClubStatsInfo(results) {
  // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
  console.log(
    "%c" + ">> getTotalClubStatsInfo.",
    "background-color: pink; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Process the original array of objects received.
  displayTotalClubStatsArrayOfObjects = results.data; // Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
  // console.log("Global variable 'displayTotalClubStatsArrayOfObjects' defined:"); // Log the global variable.
  // console.log("getTotalClubStatsInfo");
  // console.log(displayTotalClubStatsArrayOfObjects); // Log the global variable.
  showTotalClubStatsInfo(displayTotalClubStatsArrayOfObjects); // Call the showTotalClubStatsInfo function.
}

// 2.1.2. Total Club Stats data "show-er" function.
function showTotalClubStatsInfo(results) {
  // Display the retrieved data onto the page.
  console.log(
    "%c" + ">> showTotalClubStatsInfo.",
    "background-color: pink; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Set the dataArrayOfObjects.
  const dataArrayOfObjects = results; // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.
  // console.log("dataArrayOfObjects");
  // console.log(dataArrayOfObjects); // Log the returned data.

  // console.log(dataArrayOfObjects); // Log the received array of objects.
  var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
  // console.log("Original Length of dataArrayOfObjects = " + objectLength); // Log the original length.

  // Get the drop down selection values to be used for displaying the correct information.

  // Season selection.
  var seasonValueDropdown = document.getElementById(
    "club-stats-season-selection-dropdown"
  ); // Get the season selected dropdown.
  var seasonValue =
    seasonValueDropdown.options[seasonValueDropdown.selectedIndex].text; // Get the season selected. (https://stackoverflow.com/a/8549358/14290169).

  // Team selection.
  var teamValueDropdown = document.getElementById(
    "club-stats-team-selection-dropdown"
  ); // Get the team selected dropdown.
  var teamValue =
    teamValueDropdown.options[teamValueDropdown.selectedIndex].text; // Get the team selected. (https://stackoverflow.com/a/8549358/14290169).

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
  if (teamValue === "Whole Club") {
    document.getElementById("club-stats-main-header-text").innerHTML =
      "Club Stats"; // Get the main header text element and add the text to it.
    document.getElementById("club-stats-tab-text").innerHTML = "Club Stats"; // Get the tab text element and add the text to it.
    // Update the information bar.
    displayInformation(
      "club-stats-information-bar",
      "Select a filter to begin reviewing further detailed club stats"
    );
  } else {
    document.getElementById("club-stats-main-header-text").innerHTML =
      "Team Stats"; // Get the main header text element and add the text to it.
    document.getElementById("club-stats-tab-text").innerHTML = "Team Stats"; // Get the tab text element and add the text to it.
    // Update the information bar.
    displayInformation(
      "club-stats-information-bar",
      "You can select 'Whole club' to switch back to Club stats."
    );
  }

  // Update the header text.
  document.getElementById("club-team-stats-header-text").innerHTML =
    teamValue + " Stats"; // Get the header text element and add the text to it.

  // Define an array of stats to update. Each stat corresponds to an HTML element.
  let statArray = [
    "numberGamesPlayed",
    "numberLeagueGamesPlayed",
    "numberCupGamesPlayed",
    "numberFriendlyGamesPlayed",
    "numberPlayers",
    "numberGoalsScored",
    "goalsPerGame",
    "numberGoalsConceded",
    "goalsConcededPerGame",
    "numberGoalscorers",
    "topGoalscorer",
  ];
  for (let i = 0; i < statArray.length; i++) {
    // console.log(statArray[i]); // Log the stat being updated.
    if (statObject[statArray[i]] == "") {
      // Check if the returned value is blank or not.
      document.getElementById("club-team-stats-" + statArray[i]).innerHTML =
        "n/a"; // Populate the value with an "n/a".
      document
        .getElementById("club-team-stats-" + statArray[i])
        .classList.add("hidden"); // Add the hidden CSS class to hide it.
      document
        .getElementById("club-team-stats-header-" + statArray[i])
        .classList.add("hidden"); // Add the hidden CSS class to hide it.
    } else {
      document.getElementById("club-team-stats-" + statArray[i]).innerHTML =
        statObject[statArray[i]]; // Get the stat text element and add the text to it.
      document
        .getElementById("club-team-stats-" + statArray[i])
        .classList.remove("hidden"); // Remove the hidden CSS class to show it.
      document
        .getElementById("club-team-stats-header-" + statArray[i])
        .classList.remove("hidden"); // Remove the hidden CSS class to show it.
    }
  }

  // Increment the component ready count by 1.
  incrementComponentReadyCount("Club Stats - Total Club Stats");
}

// 2.1.3. Total Club Stats data "update-er" function.

// For updater function - see full tab updater below (section 2.4).

// 2.2 Teams Season Results

// 2.2.1. Team Season Results Info data "getter" function.
function getTeamSeasonResultsInfo(results) {
  // // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
  // console.log('%c' + '>> getTeamSeasonResultsInfo.', 'background-color: pink; color:black; padding: 0.5em 0em; font-weight: bold;');
  // // Process the original array of objects received.
  // displayTeamSeasonResultsArrayOfObjects = results.data // Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
  // // console.log("Global variable 'displayNextFixturesArrayOfObjects' defined:"); // Log the global variable.
  // // console.log(displayNextFixturesArrayOfObjects); // Log the global variable.
  // showTeamSeasonResultsInfo(displayTeamSeasonResultsArrayOfObjects); // Call the showTeamSeasonResultsInfo function.
}

// 2.2.2. Team Season Results Info data "show-er" function.
function showTeamSeasonResultsInfo(results) {
  // // Display the retrieved data onto the page.
  // console.log('%c' + '>> showTeamSeasonResultsInfo.', 'background-color: pink; color:black; padding: 0.5em 0em; font-weight: bold;');
  // // Set the dataArrayOfObjects.
  // const dataArrayOfObjects = results; // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.
  // // console.log(dataArrayOfObjects); // Log the received array of objects.
  // var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
  // // console.log("Original Length of dataArrayOfObjects = " + objectLength); // Log the original length.
  // // Filter the array of objects down. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
  // // Season selection.
  // var seasonValueDropdown = document.getElementById("club-stats-season-selection-dropdown"); // Get the season selected dropdown.
  // var seasonValue = seasonValueDropdown.options[seasonValueDropdown.selectedIndex].text; // Get the season selected. (https://stackoverflow.com/a/8549358/14290169).
  // // Catch if the season value isn't a filterable value.
  // if (seasonValue === "All Seasons") {
  //     seasonValue = "";
  // }
  // // console.log("seasonValue = " + seasonValue);
  // // Team selection.
  // var teamValueDropdown = document.getElementById("club-stats-team-selection-dropdown"); // Get the team selected dropdown.
  // var teamValue = teamValueDropdown.options[teamValueDropdown.selectedIndex].text; // Get the team selected. (https://stackoverflow.com/a/8549358/14290169).
  // // Catch if the team value isn't a filterable value.
  // if (teamValue === "Whole club") {
  //     teamValue = "";
  // }
  // // console.log("teamValue = " + teamValue);
  // // Filter for all selections.
  // // Re-use the re-usable function but don't pass all arguments.
  // const filteredArrayOfObjects = multiFilterArrayOfObjects(dataArrayOfObjects, false, "SEASON", seasonValue, "PLAYER NAME", "Player", "TEAM", teamValue, "LOCATION", "Location"); // Call the created filterArrayOfObjects function.
  // // console.log(filteredArrayOfObjects); // Log the filtered array of objects.
  // objectLength = filteredArrayOfObjects.length; // Get the new length of the array.
  // // console.log("New Length = " + objectLength); // Log the original length.
  // // Call the clearTable and createFullTable functions, passing the table selector on which element to act on.
  // clearTable("#team-season-results-table"); // Call the clearTable function to empty the table.
  // createFullTable(filteredArrayOfObjects, "#team-season-results-table", true, "object"); // Call the createFullTable function, passing the data from PapaParse.
  // // Increment the component ready count by 1.
  // incrementComponentReadyCount("Club Stats - Teams Season Results");
}

// 2.2.3. Team Season Results Info data "update-er" function.

// For updater function - see full tab updater below (section 2.4).

// 2.3 All Club Results

// 2.4. Full Club Stats data "update-er" function.
function updateClubStatsInfo() {
  // Create a function that is called when the user changes the team dropdown. This function is called from the HTML select elements.

  // Display the refreshed data onto the page.
  console.log(
    "%c" + ">> updateClubStatsInfo.",
    "background-color: pink; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

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

// 3.0 Prefill the base detail onto the Player Stats tab such as stat names and tooltips.
function prefillPlayerStatsTab() {
  console.log(
    "%c" + ">> prefillPlayerStatsTab.",
    "background-color: blue; color:white; padding: 0.5em 0em; font-weight: bold;"
  );

  // Define an array of stats from the Global statObject.
  const statsArray = Object.keys(statObject);
  // console.log(statsArray); // Log the created array to see all of the stats to be looped through.

  // Group the next set of logs together to avoid cluttering the console.
  console.groupCollapsed("PrefillPlayerStatsTab Info Logs"); // Group further console logs. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

  // Create an array of the player stats sections that need to be updated.
  const playerStatsSectionArray = ["this-season", "all-time"];

  // Loop through all required sections of the player stats page.
  for (let i = 0; i < playerStatsSectionArray.length; i++) {
    // console.log("Section being updated = " + playerStatsSectionArray[i]); // Log the section being updated.

    // Loop through the created stat array. Each stat corresponds to an HTML element on the Player Stats tab.
    for (let j = 0; j < statsArray.length; j++) {
      // console.log("Stat = " + statsArray[j] + ", format = " + statObject[statsArray[j]].statFormat); // Log the stat being updated and it's format.

      // Add a try catch around dynamically updating HTML elements as not all stats object to be used.
      try {
        // Dynamically add the stat text and a tool tip to every stat container div, assigning the stat description from the Global Stat Object.

        // Stat Text
        // console.log("player-stats-" + playerStatsSectionArray[i] + "-stat-text-" + statsArray[j]);
        document.getElementById(
          "player-stats-" +
            playerStatsSectionArray[i] +
            "-stat-text-" +
            statsArray[j]
        ).innerHTML = statObject[statsArray[j]].displayText; // Update the stat text element dynamically.

        // Tool Tip
        let containerElement = document.getElementById(
          "player-stats-" +
            playerStatsSectionArray[i] +
            "-" +
            statsArray[j] +
            "-container"
        ); // Get the container element dynamically.
        const toolTipSpanElement = document.createElement("span"); // Create a span element.
        toolTipSpanElement.className = "stats-tooltip-text"; // Apply the correct CSS class to the span element.
        var toolTipText = document.createTextNode(
          statObject[statsArray[j]].description
        );
        toolTipSpanElement.appendChild(toolTipText); // Append the new tool tip text to the new span element.
        containerElement.appendChild(toolTipSpanElement); // Apppend the span element to the container element.
        containerElement.classList.add("stats-tooltip"); // Apply the correct CSS class to the container element.
      } catch (err) {
        // console.log("Stat = " + statsArray[i] + " not found on sheet so skipping.");
      }
    }
  }

  console.groupEnd(); // End the log grouping. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

  // Increment the component ready count by 1.
  incrementComponentReadyCount("Player Stats - This Season Stats");
}

// Player Stats tab needs to process two data parses, "displayThisSeasonStats" and "displayAllTimeStats".

// 3.1.a. Player Stats This Season stats tab data "getter" function.
function getPlayerStatsThisSeasonTabInfo(results) {
  // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
  console.log(
    "%c" + ">> getPlayerStatsThisSeasonTabInfo.",
    "background-color: blue; color:white; padding: 0.5em 0em; font-weight: bold;"
  );

  // Process the original array of objects received.
  displayThisSeasonStatsArrayOfObjects = results.data; // Define the global variable "displayThisSeasonStatsArrayOfObjects" to be used later on. Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
  // console.log("Global variable 'displayThisSeasonStatsArrayOfObjects' defined:"); // Log the global variable.
  // console.log("getPlayerStatsThisSeasonTabInfo");
  // console.log(displayThisSeasonStatsArrayOfObjects); // Log the global variable.
  showPlayerStatsThisSeasonTabInfo(displayThisSeasonStatsArrayOfObjects); // Call the showPlayerStatsThisSeasonTabInfo function.
}

// 3.1.b. Player Stats All Time stats tab data "getter" function.
function getPlayerStatsAllTimeTabInfo(results) {
  // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
  console.log(
    "%c" + ">> getPlayerStatsAllTimeTabInfo.",
    "background-color: blue; color:white; padding: 0.5em 0em; font-weight: bold;"
  );

  // Process the original array of objects received.
  displayAllTimeStatsArrayOfObjects = results.data; // Define the global variable "displayAllTimeStatsArrayOfObjects" to be used later on. Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
  // console.log("Global variable 'displayAllTimeStatsArrayOfObjects' defined:"); // Log the global variable.
  // console.log("getPlayerStatsAllTimeTabInfo");
  // console.log(displayAllTimeStatsArrayOfObjects); // Log the global variable.
  showPlayerStatsAllTimeTabInfo(displayAllTimeStatsArrayOfObjects); // Call the showPlayerStats function.

  // Call the getPlayerDropdownInfo function to populate the site dropdowns.
  getPlayerDropdownInfo();
}

// 3.2.a. Player Stats This Season tab data "show-er" function.
function showPlayerStatsThisSeasonTabInfo(results) {
  // Display the retrieved data onto the page.
  console.log(
    "%c" + ">> showPlayerStatsThisSeasonTabInfo.",
    "background-color: blue; color:white; padding: 0.5em 0em; font-weight: bold;"
  );

  // Process the original array of objects received.
  //const dataArrayOfObjects = results.data
  // console.log("dataArrayOfObjects = "); // Log the received array of objects.

  // Set the dataArrayOfObjects.
  const dataArrayOfObjects = results; // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.

  // console.log(dataArrayOfObjects); // Log the received array of objects.
  var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
  // console.log("Original Length of dataArrayOfObjects = " + objectLength); // Log the original length.

  // Player selection.
  let playerValue = document.getElementById(
    "player-stats-selection-dropdown-button"
  ).value; // Get the player selected. (https://stackoverflow.com/a/8549358/14290169).
  // console.log("Selected player (playerValue) = " + playerValue);

  // Filter for the selection.
  // Filter down the entire array to find the players data. Re-use the re-usable function...
  // Filter the array of objects down. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
  const filteredArrayOfObjects = filterArrayOfObjects(
    dataArrayOfObjects,
    "NAME",
    playerValue
  ); // Call the created filterArrayOfObjects function.
  // console.log("filteredArrayOfObjects = "); // Log the filtered array of objects.
  // console.log(filteredArrayOfObjects); // Log the filtered array of objects.
  objectLength = filteredArrayOfObjects.length; // Get the new length of the array.
  // console.log("New Length of dataArrayOfObjects = " + objectLength); // Log the original length.
  if (objectLength > 1) {
    // If the objectLength is greater than 1, flag an alert error.
    alert("More than one record returned for player selected!");
  }

  // Log the data that will be displayed.
  // console.log("filteredArrayOfObjects[0] = ");
  // console.log(filteredArrayOfObjects[0]);

  // Stat Category selection.
  const statCategoryValueDropdown = document.getElementById(
    "player-stats-this-season-stats-category-selection"
  ); // Get the stat category selected dropdown.
  const statCategoryValue =
    statCategoryValueDropdown.options[statCategoryValueDropdown.selectedIndex]
      .value; // Get the stat category selected. (https://stackoverflow.com/a/8549358/14290169).
  // console.log("Selected stat category (statCategoryValue) = " + statCategoryValue);

  // Populate the stats information on the page.

  // Define an array of stats from the Global statObject.
  const statsArray = Object.keys(statObject);
  // console.log(statsArray); // Log the created array to see all of the stats to be looped through.

  // Group the next set of logs together to avoid cluttering the console.
  console.groupCollapsed("ShowPlayerStatsThisSeasonTabInfo Info Logs"); // Group further console logs. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

  // Loop through the created stat array. Each stat corresponds to an HTML element in the This Seasons Grid.
  for (let i = 0; i < statsArray.length; i++) {
    // console.log("Stat = " + statsArray[i] + ", format = " + statObject[statsArray[i]].statFormat); // Log the stat being updated and it's format.

    // Add a try catch around dynamically updating HTML elements as not all stats object to be used.
    try {
      // Update the displayed stat value after correctly formatting the stat value.
      let TextElement = document.getElementById(
        "player-stats-this-season-" + statsArray[i]
      ); // Get the Text Element dynamically.
      let StatFormat = statObject[statsArray[i]].statFormat; // Get the stat format from the global stat object.
      if (StatFormat == "Integer") {
        // Convert the stat to an integer.
        var displayText = Number(
          filteredArrayOfObjects[0][statsArray[i]]
        ).toLocaleString("en-UK"); // Use a dynamic [statArray[i]] key. Convert the stat to a number and then add a comma by using the "toLocaleString" method.
      } else if (StatFormat == "Decimal2") {
        // Convert the stat to 2 decimal places.
        var displayText = Number(
          filteredArrayOfObjects[0][statsArray[i]]
        ).toFixed(2); // Use a dynamic [statArray[i]] key. Convert the stat to a number to 2 decimal places by using the "toFixed" method.
      } else if (StatFormat == "Decimal1") {
        // Convert the stat to 1 decimal places.
        var displayText = Number(
          filteredArrayOfObjects[0][statsArray[i]]
        ).toFixed(1); // Use a dynamic [statArray[i]] key. Convert the stat to a number to 1 decimal places by using the "toFixed" method.
      } else {
        // For all else, including percentages and strings, just display as passed.
        var displayText = filteredArrayOfObjects[0][statsArray[i]]; // Do nothing to passed value.
      }
      TextElement.innerHTML = displayText; // Add the text to the HTML element.
      // console.log("displayText = " + displayText); // Log the text that will be displayed.

      // Hide the stats that should not be shown based on the users selection.
      let containerElement = document.getElementById(
        "player-stats-this-season-" + statsArray[i] + "-container"
      ); // Get the container element dynamically.
      if (statCategoryValue == "All") {
        // Remove the hidden class from this container element as it should be shown.
        containerElement.classList.remove("hidden"); // Remove the hidden CSS class from the container element.
      } else if (statObject[statsArray[i]].statCategory == statCategoryValue) {
        // Remove the hidden class from this container element as it should be shown.
        containerElement.classList.remove("hidden"); // Remove the hidden CSS class from the container element.
      } else {
        // Add the hidden class to this container element as it should not be shown.
        containerElement.classList.add("hidden"); // Apply the hidden CSS class to the container element.
      }
    } catch (err) {
      console.log(
        "Stat = " + statsArray[i] + " not found on sheet so skipping."
      );
    }
  }

  console.groupEnd(); // End the log grouping. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

  // Increment the component ready count by 1.
  incrementComponentReadyCount("Player Stats - This Season Stats");
}

// 3.2.b. Player Stats All Time tab data "show-er" function.
function showPlayerStatsAllTimeTabInfo(results) {
  // Display the retrieved data onto the page.
  console.log(
    "%c" + ">> showPlayerStatsAllTimeTabInfo.",
    "background-color: blue; color:white; padding: 0.5em 0em; font-weight: bold;"
  );

  // Process the original array of objects received.
  //const dataArrayOfObjects = results.data
  // console.log("dataArrayOfObjects = "); // Log the received array of objects.

  // Set the dataArrayOfObjects.
  const dataArrayOfObjects = results; // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.

  // console.log(dataArrayOfObjects); // Log the received array of objects.
  var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
  // console.log("Original Length of dataArrayOfObjects = " + objectLength); // Log the original length.

  // Player selection.
  let playerValue = document.getElementById(
    "player-stats-selection-dropdown-button"
  ).value; // Get the player selected. (https://stackoverflow.com/a/8549358/14290169).
  // console.log("Selected player (playerValue) = " + playerValue);

  // Filter for the selection.
  // Filter down the entire array to find the players data. Re-use the re-usable function...
  // Filter the array of objects down. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
  const filteredArrayOfObjects = filterArrayOfObjects(
    dataArrayOfObjects,
    "NAME",
    playerValue
  ); // Call the created filterArrayOfObjects function.
  // console.log("filteredArrayOfObjects = "); // Log the filtered array of objects.
  // console.log(filteredArrayOfObjects); // Log the filtered array of objects.
  objectLength = filteredArrayOfObjects.length; // Get the new length of the array.
  // console.log("New Length of dataArrayOfObjects = " + objectLength); // Log the original length.
  if (objectLength > 1) {
    // If the objectLength is greater than 1, flag an alert error.
    alert("More than one record returned for player selected!");
  }

  // Log the data that will be displayed.
  // console.log("filteredArrayOfObjects[0] = ");
  // console.log(filteredArrayOfObjects[0]);

  // Stat Category selection.
  const statCategoryValueDropdown = document.getElementById(
    "player-stats-all-time-stats-category-selection"
  ); // Get the stat category selected dropdown.
  const statCategoryValue =
    statCategoryValueDropdown.options[statCategoryValueDropdown.selectedIndex]
      .value; // Get the stat category selected. (https://stackoverflow.com/a/8549358/14290169).
  // console.log("Selected stat category (statCategoryValue) = " + statCategoryValue);

  // Populate the stats information on the page.

  // Define an array of stats from the Global statObject.
  const statsArray = Object.keys(statObject);
  // console.log(statsArray); // Log the created array to see all of the stats to be looped through.

  // Group the next set of logs together to avoid cluttering the console.
  console.groupCollapsed("ShowPlayerStatsAllTimeTabInfo Info Logs"); // Group further console logs. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

  // Loop through the created stat array. Each stat corresponds to an HTML element in the All Time Grid.
  for (let i = 0; i < statsArray.length; i++) {
    // console.log("Stat = " + statsArray[i] + ", format = " + statObject[statsArray[i]].statFormat); // Log the stat being updated and it's format.

    // Add a try catch around dynamically updating HTML elements as not all stats object to be used.
    try {
      // Update the displayed stat value after correctly formatting the stat value.
      var TextElement = document.getElementById(
        "player-stats-all-time-" + statsArray[i]
      ); // Get the Text Element dynamically.
      var StatFormat = statObject[statsArray[i]].statFormat; // Get the stat format from the global stat object.
      if (StatFormat == "Integer") {
        // Convert the stat to an integer.
        var displayText = Number(
          filteredArrayOfObjects[0][statsArray[i]]
        ).toLocaleString("en-UK"); // Use a dynamic [statArray[i]] key. Convert the stat to a number and then add a comma by using the "toLocaleString" method.
      } else if (StatFormat == "Decimal2") {
        // Convert the stat to 2 decimal places.
        var displayText = Number(
          filteredArrayOfObjects[0][statsArray[i]]
        ).toFixed(2); // Use a dynamic [statArray[i]] key. Convert the stat to a number to 2 decimal places by using the "toFixed" method.
      } else if (StatFormat == "Decimal1") {
        // Convert the stat to 1 decimal places.
        var displayText = Number(
          filteredArrayOfObjects[0][statsArray[i]]
        ).toFixed(1); // Use a dynamic [statArray[i]] key. Convert the stat to a number to 1 decimal places by using the "toFixed" method.
      } else {
        // For all else, including percentages and strings, just display as passed.
        var displayText = filteredArrayOfObjects[0][statsArray[i]]; // Do nothing to passed value.
      }
      TextElement.innerHTML = displayText; // Add the text to the HTML element.
      // console.log("displayText = " + displayText); // Log the text that will be displayed.

      // Hide the stats that should not be shown based on the users selection.
      if (statCategoryValue == "All") {
        // Remove the hidden class from this container element as it should be shown.
        containerElement.classList.remove("hidden"); // Remove the hidden CSS class from the container element.
      } else if (statObject[statsArray[i]].statCategory == statCategoryValue) {
        // Remove the hidden class from this container element as it should be shown.
        containerElement.classList.remove("hidden"); // Remove the hidden CSS class from the container element.
      } else {
        // Add the hidden class to this container element as it should not be shown.
        containerElement.classList.add("hidden"); // Apply the hidden CSS class to the container element.
      }
    } catch (err) {
      // console.log("Stat = " + statsArray[i] + " not found on sheet so skipping.");
    }
  }

  console.groupEnd(); // End the log grouping. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

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

// 4.1. Team of the Week - Match Details Info data "getter" function.
function getMatchDetailsInfo(results) {
  // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
  console.log(
    "%c" + ">> getMatchDetailsInfo.",
    "background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Process the original array of objects received.
  displayMatchDetailsArrayOfObjects = results.data; // Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
  // console.log("getMatchDetailsInfo");
  // console.log(displayMatchDetailsArrayOfObjects);

  // Increment the component ready count by 1.
  incrementComponentReadyCount("Match Details information fetched");

  // This Season Stats Info
  Papa.parse(displayTOTWSheetCSV, {
    download: true, // If true, this indicates that the string you passed as the first argument to parse() is actually a URL from which to download a file and parse its contents.
    header: true, // If true, the first row of parsed data will be interpreted as field names. An array of field names will be returned in meta, and each row of data will be an object of values keyed by field name instead of a simple array. Rows with a different number of fields from the header row will produce an error. Warning: Duplicate field names will overwrite values in previous fields having the same name.
    fastmode: true, // Fast mode speeds up parsing significantly for large inputs. However, it only works when the input has no quoted fields. Fast mode will automatically be enabled if no " characters appear in the input. You can force fast mode either way by setting it to true or false.
    complete: getTeamOfTheWeekPlayersInfo, // The callback to execute when parsing is complete.
  });
}

// 4.2. Team of the Week - Players Info data "getter" function.
function getTeamOfTheWeekPlayersInfo(results) {
  // Pass the results output from Papa Parse (see - https://www.papaparse.com/docs#csv-to-json) into a function to display the contents of the data. Note that a parse result always contains three objects: data, errors, and meta. Data and errors are arrays, and meta is an object. In the step callback, the data array will only contain one element.
  console.log(
    "%c" + ">> getTeamOfTheWeekPlayersInfo.",
    "background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Add an onclick function to the HTML elements.
  for (let i = 1; i <= 11; i++) {
    // console.log(i); // Log the number being run through.
    document.getElementById("totw-player-pos-" + i).onclick =
      showTOTWPlayerInfo; // Add the onclick function to the HTML element.
  }

  // Process the original array of objects received.
  displayTOTWArrayOfObjects = results.data; // Data comes through from results as an array of objects. This is because the header setting on the above papa parse is set to true.
  // console.log("Global variable 'displayTOTWArrayOfObjects' defined:"); // Log the global variable.
  // console.log("getTeamOfTheWeekPlayersInfo");
  // console.log(displayTOTWArrayOfObjects); // Log the global variable.

  // Initially populate the week number dropdown.
  updateTeamOfTheWeekWeekNumberInfo();
}

// 4.3. Team of the Week - Week Number data "update-er" function.
function updateTeamOfTheWeekWeekNumberInfo() {
  // Create a function that is called when the user changes the season dropdown. This function is called from the HTML select elements.
  console.log(
    "%c" + ">> updateTeamOfTheWeekWeekNumberInfo.",
    "background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Start the rotation of the Dorkinians logo to simulate loading.
  rotateLogo("dorkinians-header-logo");

  // Get the selected season and the week dropdown element.
  let selectedSeason = document.getElementById(
    "TOTW-season-selection-dropdown"
  ).value; // Get the selected season text.
  let weekDropdown = document.getElementById("TOTW-week-selection-dropdown"); // Define the week dropdown.
  weekDropdown.options.length = 0; // Clear all options from the dropdown.

  // Get the TOTW object.
  // console.log("displayTOTWArrayOfObjects: ");
  // console.log(displayTOTWArrayOfObjects);

  // Filter the TOTW details array down to the selected season to get the list of week numbers for that season. https://masteringjs.io/tutorials/fundamentals/filter-array-of-objects
  const selectedSeasonWeekData = displayTOTWArrayOfObjects.filter(
    (seasonData) => seasonData.SEASON === selectedSeason
  );
  // console.log("selectedSeasonWeekData: ");
  // console.log(selectedSeasonWeekData);
  let selectedSeasonWeekCount = selectedSeasonWeekData.length; // Get the number of weeks from that season.
  // console.log("selectedSeasonWeekCount: ");
  // console.log(selectedSeasonWeekCount);

  // Populate the weeks dropdown list with options. https://betterprogramming.pub/how-to-dynamically-populate-a-year-dropdown-with-javascript-bcf4f849bc4f

  // Loop through the passed data and get the row of data to be displayed and used.
  for (let i = 0; i < selectedSeasonWeekCount; i++) {
    // console.log(i); // Log the number being run through.
    let weekOption = document.createElement("option");
    // console.log("Week selectedSeasonWeekData[i].WEEK");
    // console.log("Week " + selectedSeasonWeekData[i].WEEK);
    // weekOption.text = "Week " + selectedSeasonWeekData[i].WEEK ;
    weekOption.text =
      "Week " +
      selectedSeasonWeekData[i]["WEEK ADJUSTED"] +
      " (" +
      selectedSeasonWeekData[i]["DATE LOOKUP"] +
      ")";
    weekOption.value = selectedSeasonWeekData[i].WEEK;
    weekDropdown.add(weekOption);
  }

  // Mark the last option in the list as selected. https://stackoverflow.com/a/8140900/14290169
  document.getElementById("TOTW-week-selection-dropdown").selectedIndex =
    selectedSeasonWeekCount - 1;

  // Populate the TOTW tab.
  showTeamOfTheWeekPlayersInfo(displayTOTWArrayOfObjects); // Call the showTotalClubStatsInfo function.

  // End the rotation of the Dorkinians logo to simulate loading being completed.
  stopRotateLogo("dorkinians-header-logo");
}

// Define the y positions of each Classification.
let GKy = 1;
let DEFy = 24;
let MIDy = 47;
let FWDy = 71;
// Define the x positions of each Classification.
let PlayerWidth = 20;
let Centerx = 50 - PlayerWidth / 2;
let LeftOf2x = 30 - PlayerWidth / 2;
let RightOf2x = 70 - PlayerWidth / 2;
let LeftOf3x = 25 - PlayerWidth / 2;
let RightOf3x = 75 - PlayerWidth / 2;
let LeftOf4x = 15 - PlayerWidth / 2;
let LeftCenterOf4x = 35 - PlayerWidth / 2;
let RightCenterOf4x = 65 - PlayerWidth / 2;
let RightOf4x = 85 - PlayerWidth / 2;
let LeftOf5x = 10 - PlayerWidth / 2;
let LeftCenterOf5x = 30 - PlayerWidth / 2;
let RightCenterOf5x = 70 - PlayerWidth / 2;
let RightOf5x = 90 - PlayerWidth / 2;

// Define an object of formations to define the various positions of players.
const formationCoordinateObject = {
  "4-4-2": {
    Pos1: {
      Classification: "GK",
      x: Centerx,
      y: GKy,
    },
    Pos2: {
      Classification: "DEF1",
      x: LeftOf4x,
      y: DEFy,
    },
    Pos3: {
      Classification: "DEF2",
      x: LeftCenterOf4x,
      y: DEFy,
    },
    Pos4: {
      Classification: "DEF3",
      x: RightCenterOf4x,
      y: DEFy,
    },
    Pos5: {
      Classification: "DEF4",
      x: RightOf4x,
      y: DEFy,
    },
    Pos6: {
      Classification: "MID1",
      x: LeftOf4x,
      y: MIDy,
    },
    Pos7: {
      Classification: "MID2",
      x: LeftCenterOf4x,
      y: MIDy,
    },
    Pos8: {
      Classification: "MID3",
      x: RightCenterOf4x,
      y: MIDy,
    },
    Pos9: {
      Classification: "MID4",
      x: RightOf4x,
      y: MIDy,
    },
    Pos10: {
      Classification: "FWD1",
      x: LeftOf2x,
      y: FWDy,
    },
    Pos11: {
      Classification: "FWD2",
      x: RightOf2x,
      y: FWDy,
    },
  },
  "4-3-3": {
    Pos1: {
      Classification: "GK",
      x: Centerx,
      y: GKy,
    },
    Pos2: {
      Classification: "DEF1",
      x: LeftOf4x,
      y: DEFy,
    },
    Pos3: {
      Classification: "DEF2",
      x: LeftCenterOf4x,
      y: DEFy,
    },
    Pos4: {
      Classification: "DEF3",
      x: RightCenterOf4x,
      y: DEFy,
    },
    Pos5: {
      Classification: "DEF4",
      x: RightOf4x,
      y: DEFy,
    },
    Pos6: {
      Classification: "MID1",
      x: LeftOf3x,
      y: MIDy,
    },
    Pos7: {
      Classification: "MID2",
      x: Centerx,
      y: MIDy,
    },
    Pos8: {
      Classification: "MID3",
      x: RightOf3x,
      y: MIDy,
    },
    Pos9: {
      Classification: "FWD1",
      x: LeftOf3x,
      y: FWDy,
    },
    Pos10: {
      Classification: "FWD2",
      x: Centerx,
      y: FWDy,
    },
    Pos11: {
      Classification: "FWD3",
      x: RightOf3x,
      y: FWDy,
    },
  },
  "4-5-1": {
    Pos1: {
      Classification: "GK",
      x: Centerx,
      y: GKy,
    },
    Pos2: {
      Classification: "DEF1",
      x: LeftOf4x,
      y: DEFy,
    },
    Pos3: {
      Classification: "DEF2",
      x: LeftCenterOf4x,
      y: DEFy,
    },
    Pos4: {
      Classification: "DEF3",
      x: RightCenterOf4x,
      y: DEFy,
    },
    Pos5: {
      Classification: "DEF4",
      x: RightOf4x,
      y: DEFy,
    },
    Pos6: {
      Classification: "MID1",
      x: LeftOf5x,
      y: MIDy,
    },
    Pos7: {
      Classification: "MID2",
      x: LeftCenterOf5x,
      y: MIDy,
    },
    Pos8: {
      Classification: "MID3",
      x: Centerx,
      y: MIDy,
    },
    Pos9: {
      Classification: "MID4",
      x: RightCenterOf5x,
      y: MIDy,
    },
    Pos10: {
      Classification: "MID5",
      x: RightOf5x,
      y: MIDy,
    },
    Pos11: {
      Classification: "FWD1",
      x: Centerx,
      y: FWDy,
    },
  },
  "3-5-2": {
    Pos1: {
      Classification: "GK",
      x: Centerx,
      y: GKy,
    },
    Pos2: {
      Classification: "DEF1",
      x: LeftOf3x,
      y: DEFy,
    },
    Pos3: {
      Classification: "DEF2",
      x: Centerx,
      y: DEFy,
    },
    Pos4: {
      Classification: "DEF3",
      x: RightOf3x,
      y: DEFy,
    },
    Pos5: {
      Classification: "MID1",
      x: LeftOf5x,
      y: MIDy,
    },
    Pos6: {
      Classification: "MID2",
      x: LeftCenterOf5x,
      y: MIDy,
    },
    Pos7: {
      Classification: "MID3",
      x: Centerx,
      y: MIDy,
    },
    Pos8: {
      Classification: "MID4",
      x: RightCenterOf5x,
      y: MIDy,
    },
    Pos9: {
      Classification: "MID5",
      x: RightOf5x,
      y: MIDy,
    },
    Pos10: {
      Classification: "FWD1",
      x: LeftOf2x,
      y: FWDy,
    },
    Pos11: {
      Classification: "FWD2",
      x: RightOf2x,
      y: FWDy,
    },
  },
  "3-4-3": {
    Pos1: {
      Classification: "GK",
      x: Centerx,
      y: GKy,
    },
    Pos2: {
      Classification: "DEF1",
      x: LeftOf3x,
      y: DEFy,
    },
    Pos3: {
      Classification: "DEF2",
      x: Centerx,
      y: DEFy,
    },
    Pos4: {
      Classification: "DEF3",
      x: RightOf3x,
      y: DEFy,
    },
    Pos5: {
      Classification: "MID1",
      x: LeftOf4x,
      y: MIDy,
    },
    Pos6: {
      Classification: "MID2",
      x: LeftCenterOf4x,
      y: MIDy,
    },
    Pos7: {
      Classification: "MID3",
      x: RightCenterOf4x,
      y: MIDy,
    },
    Pos8: {
      Classification: "MID4",
      x: RightOf4x,
      y: MIDy,
    },
    Pos9: {
      Classification: "FWD1",
      x: LeftOf3x,
      y: FWDy,
    },
    Pos10: {
      Classification: "FWD2",
      x: Centerx,
      y: FWDy,
    },
    Pos11: {
      Classification: "FWD3",
      x: RightOf3x,
      y: FWDy,
    },
  },
  "5-3-2": {
    Pos1: {
      Classification: "GK",
      x: Centerx,
      y: GKy,
    },
    Pos2: {
      Classification: "DEF1",
      x: LeftOf5x,
      y: DEFy,
    },
    Pos3: {
      Classification: "DEF2",
      x: LeftCenterOf5x,
      y: DEFy,
    },
    Pos4: {
      Classification: "DEF3",
      x: Centerx,
      y: DEFy,
    },
    Pos5: {
      Classification: "DEF4",
      x: RightCenterOf5x,
      y: DEFy,
    },
    Pos6: {
      Classification: "DEF5",
      x: RightOf5x,
      y: DEFy,
    },
    Pos7: {
      Classification: "MID1",
      x: LeftOf3x,
      y: MIDy,
    },
    Pos8: {
      Classification: "MID2",
      x: Centerx,
      y: MIDy,
    },
    Pos9: {
      Classification: "MID3",
      x: RightOf3x,
      y: MIDy,
    },
    Pos10: {
      Classification: "FWD1",
      x: LeftOf2x,
      y: FWDy,
    },
    Pos11: {
      Classification: "FWD2",
      x: RightOf2x,
      y: FWDy,
    },
  },
  "5-4-1": {
    Pos1: {
      Classification: "GK",
      x: Centerx,
      y: GKy,
    },
    Pos2: {
      Classification: "DEF1",
      x: LeftOf5x,
      y: DEFy,
    },
    Pos3: {
      Classification: "DEF2",
      x: LeftCenterOf5x,
      y: DEFy,
    },
    Pos4: {
      Classification: "DEF3",
      x: Centerx,
      y: DEFy,
    },
    Pos5: {
      Classification: "DEF4",
      x: RightCenterOf5x,
      y: DEFy,
    },
    Pos6: {
      Classification: "DEF5",
      x: RightOf5x,
      y: DEFy,
    },
    Pos7: {
      Classification: "MID1",
      x: LeftOf4x,
      y: MIDy,
    },
    Pos8: {
      Classification: "MID2",
      x: LeftCenterOf4x,
      y: MIDy,
    },
    Pos9: {
      Classification: "MID3",
      x: RightCenterOf4x,
      y: MIDy,
    },
    Pos10: {
      Classification: "MID4",
      x: RightOf4x,
      y: MIDy,
    },
    Pos11: {
      Classification: "FWD1",
      x: Centerx,
      y: FWDy,
    },
  },
};

// 4.4. Team of the Week - Players Info data "show-er" function.
function showTeamOfTheWeekPlayersInfo(results) {
  // Display the retrieved data onto the page.
  console.log(
    "%c" + ">> showTeamOfTheWeekPlayersInfo.",
    "background-color: pink; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Set the dataArrayOfObjects.
  const dataArrayOfObjects = results; // Data comes through from results as an array of object. This is because the header setting on the above papa parse is set to true.
  // console.log("dataArrayOfObjects");
  // console.log(dataArrayOfObjects); // Log the received array of objects.
  var objectLength = dataArrayOfObjects.length; // Get the original length of the array.
  // console.log("Original Length of dataArrayOfObjects = " + objectLength); // Log the original length.

  // Get the drop down selection values to be used for displaying the correct information.

  // Season selection.
  var seasonValueDropdown = document.getElementById(
    "TOTW-season-selection-dropdown"
  ); // Get the season selected dropdown.
  var seasonValue =
    seasonValueDropdown.options[seasonValueDropdown.selectedIndex].text; // Get the season selected. (https://stackoverflow.com/a/8549358/14290169).

  // Week selection.
  var weekValueDropdown = document.getElementById(
    "TOTW-week-selection-dropdown"
  ); // Get the week selected dropdown.
  var weekValue =
    weekValueDropdown.options[weekValueDropdown.selectedIndex].value; // Get the week selected. (https://stackoverflow.com/a/8549358/14290169).

  // Create an ID to lookup and match to in the passed data.
  var lookUpID = seasonValue + "-" + weekValue;
  // console.log("lookUpID =");
  // console.log(lookUpID);

  // Loop through the passed data and get the row of data to be displayed and used.
  var arrayNumberRef = 0;
  for (let i = 0; i < objectLength; i++) {
    // console.log(i); // Log the number being run through.
    // console.log("dataArrayOfObjects[i]['SEASON WEEK NUM REF']");
    // console.log(dataArrayOfObjects[i]['SEASON WEEK NUM REF']);
    if (dataArrayOfObjects[i]["SEASON WEEK NUM REF"] === lookUpID) {
      arrayNumberRef = i;
    }
  }

  // Get an object from the array by creating an object from the first array value.
  TOTWStatObject = dataArrayOfObjects[arrayNumberRef];
  // console.log("TOTWStatObject =");
  // console.log(TOTWStatObject);

  // Define the formation to display.
  let formation = TOTWStatObject["BEST FORMATION"];
  // console.log("Formation = " + formation);

  // Populate the total number of points for the team.
  document.getElementById("totw-total-points").innerHTML =
    TOTWStatObject["TOTW SCORE"]; // Populate the found HTML element with the players name.

  // Filter the full match details array down to the same season fixture id to get the number of players who played. https://masteringjs.io/tutorials/fundamentals/filter-array-of-objects
  // console.log(TOTWStatObject)
  let seasonWeekNumRef = TOTWStatObject["SEASON WEEK NUM REF"];
  // console.log(seasonWeekNumRef);
  const matchDetailsWeekData = displayMatchDetailsArrayOfObjects.filter(
    (weekData) => weekData.SEASONWEEKNUMREF === seasonWeekNumRef
  );
  let weekPlayerCount = matchDetailsWeekData.length; // Get the number of players who played that week from the new length of the array.
  // console.log(weekPlayerCount);
  document.getElementById("totw-week-number-players").innerHTML =
    "Number Players Played: " + weekPlayerCount; // Populate the found HTML element with the players name.

  // Define some variables for use within the loop.
  var maxPoints = 0;
  var starManID;

  // Loop through the TOTWStatObject to add the player details. Each stat corresponds to an HTML element.
  for (let i = 1; i <= 11; i++) {
    // console.log(i);
    // console.log(TOTWStatObject["POS " + i + " PLAYER"]);

    // Populate the HTML elements.
    // Populate the player name. Limit to a certain length of characters.
    var playerName = TOTWStatObject["POS " + i + " PLAYER"];
    // console.log("playerName: " + playerName);
    if (playerName.length > 12) {
      let spacePosition = playerName.indexOf(" ") + 1;
      // console.log("spacePosition: " + spacePosition);
      let playerFirstName = playerName.substring(0, spacePosition);
      // console.log("playerFirstName: " + playerFirstName);
      let playerSecondNameInitial = playerName.substring(
        spacePosition,
        spacePosition + 1
      );
      // console.log("playerSecondNameInitial: " + playerSecondNameInitial);
      playerName = playerFirstName + " " + playerSecondNameInitial;
      // console.log("playerName changed to: " + playerName);
    }
    document.getElementById("totw-player-pos-" + i + "-name").innerHTML =
      playerName; // Populate the found HTML element with the players name.
    // Populate points.
    document.getElementById("totw-player-pos-" + i + "-points").innerHTML =
      TOTWStatObject["POS " + i + " POINTS"]; // Populate the found HTML element with the players points.

    // Get the star man details.
    if (parseInt(TOTWStatObject["POS " + i + " POINTS"]) > maxPoints) {
      // console.log("i = " + i + ", points = " + TOTWStatObject["POS " + i + " POINTS"] + ", maxPoints = " + maxPoints);
      maxPoints = parseInt(TOTWStatObject["POS " + i + " POINTS"]);
      starManID = i;
    }

    // Position the overall player div.
    let playerDiv = document.getElementById("totw-player-pos-" + i);
    let leftPosition = parseInt(
      formationCoordinateObject[formation]["Pos" + i]["x"]
    );
    let topPosition = parseInt(
      formationCoordinateObject[formation]["Pos" + i]["y"]
    );
    playerDiv.style.left = leftPosition + "%";
    playerDiv.style.top = topPosition + "%";
    // console.log("Player Name: " + TOTWStatObject["POS " + i + " PLAYER"] + " - Positioned at x=" + leftPosition + "%, y=" + topPosition + "%");
  }

  // Populate the star man details.
  document.getElementById("totw-player-pos-star-man-name").innerHTML =
    TOTWStatObject["POS " + starManID + " PLAYER"]; // Populate the found HTML element with the players name.
  document.getElementById("totw-player-pos-star-man-points").innerHTML =
    TOTWStatObject["POS " + starManID + " POINTS"]; // Populate the found HTML element with the players points.

  // Increment the component ready count by 1.
  incrementComponentReadyCount("TOTW - All TOTW Players");
}

// 4.5. Team of the Week - Players Info data "update-er" functions.
function updateTeamOfTheWeekPlayersInfo() {
  // Create a function that is called when the user changes the week dropdown. This function is called from the HTML select elements.

  // Start the rotation of the Dorkinians logo to simulate loading.
  rotateLogo("dorkinians-header-logo");

  // Call the update to the This Season grid.
  showTeamOfTheWeekPlayersInfo(displayTOTWArrayOfObjects);

  // End the rotation of the Dorkinians logo to simulate loading being completed.
  stopRotateLogo("dorkinians-header-logo");
}

// 4.6. Team of the Week - Player Pop Up Info function.
const showTOTWPlayerInfo = function () {
  // Create a function that is called when the user clicks on a player in TOTW. This function is called from the HTML elements.
  // https://thewebdev.info/2021/03/20/how-to-get-the-id-of-the-clicked-element-in-the-javascript-click-handler/

  // Display the retrieved data onto the page.
  console.log(
    "%c" + ">> showTOTWPlayerInfo.",
    "background-color: pink; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Start the rotation of the Dorkinians logo to simulate loading.
  rotateLogo("dorkinians-header-logo");

  // Return the clicked element and manipulate it to get the position number clicked on.
  let clickedHTMLElementID = this.id;
  let playerIDNumber = clickedHTMLElementID.substring(16, 18);
  // console.log(clickedHTMLElementID + ", number: " + playerIDNumber);

  // Get the required information from the saved TOTWStatObject.
  let playerName = TOTWStatObject["POS " + playerIDNumber + " PLAYER"];
  let seasonWeekNumRef = TOTWStatObject["SEASON WEEK NUM REF"];
  // console.log("seasonWeekNumRef = " + seasonWeekNumRef);

  // Begin working with the Match Details data.
  var objectLength = displayMatchDetailsArrayOfObjects.length; // Get the original length of the array.
  // console.log(objectLength);
  // console.log(displayMatchDetailsArrayOfObjects);

  // Filter the full match details array down to the same season fixture id. https://masteringjs.io/tutorials/fundamentals/filter-array-of-objects
  const matchDetailsWeekData = displayMatchDetailsArrayOfObjects.filter(
    (weekData) => weekData.SEASONWEEKNUMREF === seasonWeekNumRef
  );
  objectLength = matchDetailsWeekData.length; // Get the new length of the array.
  // console.log("matchDetailsWeekData Length: " + objectLength);
  // console.log(matchDetailsWeekData);

  // Filter the reduced array down to just the player.
  const playerMatchDetailsData = matchDetailsWeekData.filter(
    (playerData) => playerData.PLAYERNAME == playerName
  );
  objectLength = playerMatchDetailsData.length; // Get the new length of the array.
  // console.log("playerMatchDetailsData Length: " + objectLength);
  // console.log("playerMatchDetailsData:");
  // console.log(playerMatchDetailsData);

  // Populate the player pop up info box.
  // Populate the top information.
  document.getElementById("totw-player-info-box-header-text").innerHTML =
    playerName;
  document.getElementById("totw-player-info-box-result").innerHTML =
    playerMatchDetailsData[0].SUMMARY;
  // Get the player position (class).
  let playerClass = playerMatchDetailsData[0].CLASS;
  // console.log("Player class = " + playerClass);

  // Log the known information up to here.
  console.log(
    "Clicked player number = " +
      clickedHTMLElementID +
      ", name: " +
      playerName +
      ", position: " +
      playerClass
  );

  // Loop through the stats table and fill in the details.
  let statArray = [
    "APP",
    "MOM",
    "G",
    "A",
    "CLS",
    "C",
    "Y",
    "R",
    "OG",
    "PM",
    "PCO",
    "PSV",
  ];
  let multiplierValue = ""; // Initially define a multiplier value to be populated and used later.
  // console.log(statArray)
  for (let i = 0; i < statArray.length; i++) {
    // console.log("i = " + i + ", which is " + statArray[i] + ". playerMatchDetailsData[0][statArray[i]] = " + playerMatchDetailsData[0][statArray[i]])

    // Initially remove the hidden class from the row, to reset the box from the last selected person.
    document
      .getElementById("totw-player-info-box-" + statArray[i] + "-row")
      .classList.remove("hidden");

    //! TO DO - work out what to do with a player who has played twice in one game week!

    // Go into a complicated if else switch statement combindation to correctly populate the pop up box stats.
    if (statArray[i] == "G") {
      // Correctly add goals to penalties scored using parseInt and avoiding blanks.
      let goalsScored = 0;
      if (
        playerMatchDetailsData[0]["G"] == "" &&
        playerMatchDetailsData[0]["PSC"] == ""
      ) {
        goalsScored = 0;
      } else if (playerMatchDetailsData[0]["G"] == "") {
        goalsScored = parseInt(playerMatchDetailsData[0]["PSC"]);
      } else if (playerMatchDetailsData[0]["PSC"] == "") {
        goalsScored = parseInt(playerMatchDetailsData[0]["G"]);
      } else {
        goalsScored =
          parseInt(playerMatchDetailsData[0]["G"]) +
          parseInt(playerMatchDetailsData[0]["PSC"]);
      }

      // console.log(goalsScored);

      if (goalsScored == 0) {
        document
          .getElementById("totw-player-info-box-G-row")
          .classList.add("hidden");
      }

      // Change the multiplier value based on the class of the player.
      switch (playerClass) {
        case "GK":
          multiplierValue = 6;
          break;
        case "DEF":
          multiplierValue = 6;
          break;
        case "MID":
          multiplierValue = 5;
          break;
        case "FWD":
          multiplierValue = 4;
          break;
        default:
          multiplierValue = 0;
      }
      document.getElementById("totw-player-info-box-G").innerHTML = goalsScored;
      document.getElementById("totw-player-info-box-G-points").innerHTML =
        goalsScored * multiplierValue;
    } else if (
      playerMatchDetailsData[0][statArray[i]] == null ||
      playerMatchDetailsData[0][statArray[i]] == undefined ||
      playerMatchDetailsData[0][statArray[i]] == ""
    ) {
      // Check if the received value is empty/undefined/blank or not.

      // If the value is empty, hide the whole row.
      // console.log("Stat " + statArray[i] + " value is empty so hiding row.");
      document
        .getElementById("totw-player-info-box-" + statArray[i] + "-row")
        .classList.add("hidden");
    } else {
      // If the value is not empty, add the value to the pop up menu.
      // console.log("Stat " + statArray[i] + " value is not empty so populating row.");
      document.getElementById(
        "totw-player-info-box-" + statArray[i]
      ).innerHTML = playerMatchDetailsData[0][statArray[i]];

      // Add a switch statement to deal with the various different points to be awarded.
      switch (statArray[i]) {
        case "APP":
          if (playerMatchDetailsData[0]["APP"] >= 60) {
            document.getElementById(
              "totw-player-info-box-APP-points"
            ).innerHTML = 2;
          } else {
            document.getElementById(
              "totw-player-info-box-APP-points"
            ).innerHTML = 1;
          }
          break;
        case "MOM":
          document.getElementById("totw-player-info-box-MOM-points").innerHTML =
            playerMatchDetailsData[0]["MOM"] * 3;
          break;
        case "A":
          document.getElementById("totw-player-info-box-A-points").innerHTML =
            playerMatchDetailsData[0]["A"] * 3;
          break;
        case "C":
          if (
            playerMatchDetailsData[0]["C"] == 0 ||
            playerMatchDetailsData[0]["C"] == "0"
          ) {
            // Change the multiplier value based on the class of the player.
            switch (playerClass) {
              case "GK":
                multiplierValue = 4;
                break;
              case "DEF":
                multiplierValue = 4;
                break;
              case "MID":
                multiplierValue = 1;
                break;
              case "FWD":
                multiplierValue = 0;
                break;
              default:
                multiplierValue = 0;
            }
            document
              .getElementById("totw-player-info-box-C-row")
              .classList.add("hidden");
            document
              .getElementById("totw-player-info-box-CLS-row")
              .classList.remove("hidden");
            document.getElementById("totw-player-info-box-CLS").innerHTML = 1;
            document.getElementById(
              "totw-player-info-box-CLS-points"
            ).innerHTML = 1 * multiplierValue;
          } else {
            // Change the multiplier value based on the class of the player.
            switch (playerClass) {
              case "GK":
                document.getElementById(
                  "totw-player-info-box-C-points"
                ).innerHTML = Math.round(playerMatchDetailsData[0]["C"] * -0.5); // Round the number of goals conceded points to be an integer.
                break;
              case "DEF":
                document.getElementById(
                  "totw-player-info-box-C-points"
                ).innerHTML = Math.round(playerMatchDetailsData[0]["C"] * -0.5); // Round the number of goals conceded points to be an integer.
                break;
              case "MID":
                document
                  .getElementById("totw-player-info-box-C-row")
                  .classList.add("hidden"); // Hide for MID and FWD.
                break;
              case "FWD":
                document
                  .getElementById("totw-player-info-box-C-row")
                  .classList.add("hidden"); // Hide for MID and FWD.
                break;
              default:
                document
                  .getElementById("totw-player-info-box-C-row")
                  .classList.add("hidden");
            }
          }
          break;
        case "Y":
          document.getElementById("totw-player-info-box-Y-points").innerHTML =
            playerMatchDetailsData[0]["Y"] * -1;
          break;
        case "R":
          document.getElementById("totw-player-info-box-R-points").innerHTML =
            playerMatchDetailsData[0]["R"] * -3;
          break;
        case "OG":
          document.getElementById("totw-player-info-box-OG-points").innerHTML =
            playerMatchDetailsData[0]["OG"] * -2;
          break;
        case "PM":
          document.getElementById("totw-player-info-box-PM-points").innerHTML =
            playerMatchDetailsData[0]["PM"] * -2;
          break;
        case "PCO":
          document.getElementById("totw-player-info-box-PCO-points").innerHTML =
            playerMatchDetailsData[0]["PCO"] * 0;
          break;
        case "PSV":
          document.getElementById("totw-player-info-box-PSV-points").innerHTML =
            playerMatchDetailsData[0]["PSV"] * 5;
          break;
        default:
          console.log(statArray[i] + " has defaulted.");
      }
    }
  }
  // Populate the Total Points row.
  document.getElementById("totw-player-info-box-FTP-points").innerHTML =
    playerMatchDetailsData[0]["FTP"];

  // Show the background overlay.
  document.getElementById("background-overlay-totw-player-info").style.display =
    "inline"; // Show the background overlay behind the player pop up info box.
  document.getElementById(
    "background-overlay-totw-player-info"
  ).style.zIndex = 19; // Set the z-index of the background overlay to be right behind the player pop up info box.

  // Show the player pop up info box.
  document.getElementById("totw-player-info-box").style.display = "inline"; // Show the player pop up info box.
  document.getElementById("totw-player-info-box").style.zIndex = 20; // Set the z-index of the player pop up info box.

  // End the rotation of the Dorkinians logo to simulate loading being completed.
  stopRotateLogo("dorkinians-header-logo");
};

// 4.6.1. Team of the Week - Player Pop Up Info Close function.
function closeTOTWPlayerInfo() {
  // Display the retrieved data onto the page.
  console.log(
    "%c" + ">> closeTOTWPlayerInfo.",
    "background-color: pink; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Hide the background overlay.
  document.getElementById("background-overlay-totw-player-info").style.display =
    "none"; // Hide the background overlay behind the player pop up info box.

  // Hide the player pop up info box.
  document.getElementById("totw-player-info-box").style.display = "none"; // Hide the player pop up info box.
}

// 5. Comparison Tab

// 5.1. Comparison tab data "getter" function.

// There is no Comparison tab data "getter" function.

// 5.2. Comparison tab data "show-er" function.
function showComparisonStatData() {
  // Initially load in all stats tooltips to the stat containers.
  console.log(
    "%c" + ">> showComparisonStatData.",
    "background-color: grey; color:black; padding: 0.5em 0em; font-weight: bold;"
  );

  // Define an array of stats from the Global statObject.
  const statsArray = Object.keys(statObject);
  // console.log(statsArray); // Log the created array to see all of the stats to be looped through.

  // Group the next set of logs together to avoid cluttering the console.
  console.groupCollapsed("showComparisonStatData Info Logs"); // Group further console logs. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

  // Loop through the stat array calling in the load stat data function but not filling up the bars.
  for (let i = 0; i < statsArray.length; i++) {
    // Add a try catch around dynamically updating HTML elements as not all stats object to be used.
    try {
      // Dynamically add a short bit of text to the row to explain what it is.
      console.log("comparison-" + statsArray[i] + "-short-text");
      document.getElementById(
        "comparison-" + statsArray[i] + "-short-text"
      ).innerHTML = statObject[statsArray[i]].shortText; // Populate the short text element dynamically.

      // Dynamically add a tool tip to every stat container div, assigning the stst description from the Global Stat Object.
      let containerElement = document.getElementById(
        "comparison-" + statsArray[i] + "-container"
      ); // Get the container element dynamically.
      const toolTipSpanElement = document.createElement("span"); // Create a span element.
      toolTipSpanElement.className = "stats-tooltip-text"; // Apply the correct CSS class to the span element.
      var toolTipText = document.createTextNode(
        statObject[statsArray[i]].description
      );
      toolTipSpanElement.appendChild(toolTipText); // Append the new tool tip text to the new span element.
      containerElement.appendChild(toolTipSpanElement); // Apppend the span element to the container element.
      containerElement.classList.add("stats-tooltip"); // Apply the correct CSS class to the container element.

      console.log("Stat = " + statsArray[i] + " found on sheet so populating."); // Log the successful action.
    } catch (err) {
      console.warn(
        "Stat = " + statsArray[i] + " not found on sheet so skipping."
      ); // Log the unsuccessful action as a warning.
    }
  }

  console.groupEnd(); // End the log grouping. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/
}

// 5.3. Comparison tab data "update-er" functions.
function updateComparisonStatData() {
  // Reset all stats bars on the Comparison tab.
  resetStatsBars();

  // Player selection.
  let player1NameValue = document.getElementById(
    "comparison-player-1-selection-dropdown-button"
  ).value; // Get the player 1 selected. (https://stackoverflow.com/a/8549358/14290169).
  // console.log("Selected player 1 (player1NameValue) = " + player1NameValue);
  let player2NameValue = document.getElementById(
    "comparison-player-2-selection-dropdown-button"
  ).value; // Get the player 2 selected. (https://stackoverflow.com/a/8549358/14290169).
  // console.log("Selected player 2 (player2NameValue) = " + player2NameValue);

  // Define an array of stats from the Global statObject.
  const statsArray = Object.keys(statObject);
  // console.log(statsArray); // Log the created array to see all of the stats to be looped through.

  // Group the next set of logs together to avoid cluttering the console.
  console.groupCollapsed("UpdateComparisonStatData Info Logs"); // Group further console logs. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

  if (
    player1NameValue === "Select Player 1" &&
    player2NameValue === "Select Player 2"
  ) {
    // Do nothing as neither dropdown has had anything selected.
    console.log("Neither dropdown has a player selected.");
    // Update the information bar.
    displayInformation(
      "comparison-information-bar",
      "Select a first player to view their stats..."
    );
    // Loop through the stat array calling in the load stat data function but not filling up the bars.
    for (let i = 0; i < statsArray.length; i++) {
      // Add a try catch around dynamically updating HTML elements as not all stats object to be used.
      try {
        loadInComparisonStatNumbers(
          statsArray[i],
          player1NameValue,
          player2NameValue,
          false
        );
        console.log(
          "Stat = " + statsArray[i] + " found on sheet so populating."
        ); // Log the successful action.
      } catch (err) {
        console.warn(
          "Stat = " + statsArray[i] + " not found on sheet so skipping."
        ); // Log the unsuccessful action as a warning.
      }
    }
  } else if (player1NameValue === "Select Player 1") {
    // Player 1 dropdown is blank so fill in details for player 2.
    console.log("Player 1 dropdown is blank so fill in details for player 2.");
    // Update the information bar.
    displayInformation(
      "comparison-information-bar",
      "Select a second player to compare to..."
    );
    // Loop through the stat array calling in the load stat data function but not filling up the bars.
    for (let i = 0; i < statsArray.length; i++) {
      // Add a try catch around dynamically updating HTML elements as not all stats object to be used.
      try {
        loadInComparisonStatNumbers(
          statsArray[i],
          player1NameValue,
          player2NameValue,
          false
        );
        console.log(
          "Stat = " + statsArray[i] + " found on sheet so populating."
        ); // Log the successful action.
      } catch (err) {
        console.warn(
          "Stat = " + statsArray[i] + " not found on sheet so skipping."
        ); // Log the unsuccessful action as a warning.
      }
    }
  } else if (player2NameValue === "Select Player 2") {
    // Player 2 dropdown is blank so fill in details for player 1.
    console.log("Player 2 dropdown is blank so fill in details for player 1.");
    // Update the information bar.
    displayInformation(
      "comparison-information-bar",
      "Select a second player to compare to..."
    );
    // Loop through the stat array calling in the load stat data function but not filling up the bars.
    for (let i = 0; i < statsArray.length; i++) {
      // Add a try catch around dynamically updating HTML elements as not all stats object to be used.
      try {
        loadInComparisonStatNumbers(
          statsArray[i],
          player1NameValue,
          player2NameValue,
          false
        );
        console.log(
          "Stat = " + statsArray[i] + " found on sheet so populating."
        ); // Log the successful action.
      } catch (err) {
        console.warn(
          "Stat = " + statsArray[i] + " not found on sheet so skipping."
        ); // Log the unsuccessful action as a warning.
      }
    }
  } else if (player1NameValue === player2NameValue) {
    // Both dropdowns are the same.
    console.log("Both dropdowns are the same.");
    // Update the information bar.
    displayInformation(
      "comparison-information-bar",
      "Why are you comparing the same player you weirdo?"
    );
    // Loop through the stat array calling in the load stat data function and filling the bars.
    for (let i = 0; i < statsArray.length; i++) {
      // Add a try catch around dynamically updating HTML elements as not all stats object to be used.
      try {
        loadInComparisonStatNumbers(
          statsArray[i],
          player1NameValue,
          player2NameValue,
          true
        );
        console.log(
          "Stat = " + statsArray[i] + " found on sheet so populating."
        ); // Log the successful action.
      } catch (err) {
        console.warn(
          "Stat = " + statsArray[i] + " not found on sheet so skipping."
        ); // Log the unsuccessful action as a warning.
      }
    }
  } else {
    // Both player 1 and player 2 dropdowns are populated so fill in details for both players and load stat bars.
    console.log("Both dropdowns are populated so complete all details.");
    // Update the information bar.
    displayInformation(
      "comparison-information-bar",
      "Click on any stat row to see an explanation of the stat"
    );
    // Loop through the stat array calling in the load stat data function and filling the bars.
    for (let i = 0; i < statsArray.length; i++) {
      // Add a try catch around dynamically updating HTML elements as not all stats object to be used.
      try {
        loadInComparisonStatNumbers(
          statsArray[i],
          player1NameValue,
          player2NameValue,
          true
        );
        console.log(
          "Stat = " + statsArray[i] + " found on sheet so populating."
        ); // Log the successful action.
      } catch (err) {
        console.warn(
          "Stat = " + statsArray[i] + " not found on sheet so skipping."
        ); // Log the unsuccessful action as a warning.
      }
    }
  }

  console.groupEnd(); // End the log grouping. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/
}

// Sub function to load in the correct stat numbers. Called from updateComparisonStatData above.
function loadInComparisonStatNumbers(
  statName,
  player1Name,
  player2Name,
  fillBarsBoolean
) {
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
  const statCategoryValueDropdown = document.getElementById(
    "comparison-category-selection"
  ); // Get the stat category selected dropdown.
  const statCategoryValue =
    statCategoryValueDropdown.options[statCategoryValueDropdown.selectedIndex]
      .value; // Get the stat category selected. (https://stackoverflow.com/a/8549358/14290169).
  console.log(
    "Selected stat category (statCategoryValue) = " + statCategoryValue
  );

  // Loop through the created player array.
  for (let i = 1; i < playerArray.length; i++) {
    // Check if the player name in the array is blank and skip it if it is.
    if (playerArray[i] == "") {
      // As the player name is blank (or still "Select Player 1/2") then fill in the stats as blank.
      var TextElement = document.getElementById(
        "comparison-" + statName + "-player-" + i + "-value"
      ); // Get the Text Element dynamically.
      TextElement.innerHTML = ""; // Add the text to the HTML element.
    } else {
      // console.log("Filtering 'filteredArrayOfObjects' for player: " + playerArray[i]);

      // Filter for the selection.
      // Filter down the entire array to find the players data. Re-use the re-usable function. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
      const filteredArrayOfObjects = filterArrayOfObjects(
        displayAllTimeStatsArrayOfObjects,
        "NAME",
        playerArray[i]
      ); // Call the created filterArrayOfObjects function.
      // console.log("filteredArrayOfObjects = "); // Log the filtered array of objects.
      // console.log(filteredArrayOfObjects); // Log the filtered array of objects.
      objectLength = filteredArrayOfObjects.length; // Get the new length of the array.
      // console.log("New Length of dataArrayOfObjects = " + objectLength); // Log the original length.
      if (objectLength > 1) {
        // If the objectLength is greater than 1, flag an alert error.
        alert("More than one record returned for player selected!");
      }

      // Populate the stats information on the page.
      // console.log("The stat being updated is " + statName + "."); // Log the stat being updated.
      var TextElement = document.getElementById(
        "comparison-" + statName + "-player-" + i + "-value"
      ); // Get the Text Element dynamically.
      var selectedStatValue = filteredArrayOfObjects[0][statName]; // Initially save the value returned ready for later use in the comparison array.
      var displayText = formatValue(
        filteredArrayOfObjects[0][statName],
        statObject[statName].statFormat
      ); // Format the received value into the correctly defined stat format from the Global Stat Object.
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
          var BarElement = document.getElementById(
            "comparison-" + statName + "-player-" + i + "-bar"
          ); // Get the Bar Element dynamically.
          BarElement.style.animation = "progress-animation 3s forwards"; // Apply the animation (written in CSS file).
          // console.log("BarElement.style.animation:");
          // console.log(BarElement.style.animation);
        }, 1);
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
      BarElement = document
        .getElementById("comparison-" + statName + "-player-1-bar")
        .classList.remove("yellow"); // Get the player 1 Bar Element dynamically and remove the yellow class from the selected element.
      BarElement = document
        .getElementById("comparison-" + statName + "-player-2-bar")
        .classList.remove("yellow"); // Get the player 2 Bar Element dynamically and remove the yellow class from the selected element.
    } else {
      // One of the stats is higher.
      if (higherBetterBoolean === true) {
        // Colour the bars based on the higher value being better and therefore being better.
        // console.log("As higherBetterBoolean is true, colour the higher stat value yellow.")
        if (statValueArray[1] > statValueArray[2]) {
          // console.log("As statValueArray[1]: " + statValueArray[1] + " > statValueArray[2]: " + statValueArray[2] + ", make the left bar yellow.")
          // Player 1 stats are higher so colour the left bar yellow.
          BarElement = document
            .getElementById("comparison-" + statName + "-player-1-bar")
            .classList.add("yellow"); // Get the player 1 Bar Element dynamically and add the yellow class from the selected element.
          // Remove any left over yellow colour from the right bar.
          BarElement = document
            .getElementById("comparison-" + statName + "-player-2-bar")
            .classList.remove("yellow"); // Get the player 2 Bar Element dynamically and remove the yellow class from the selected element.
        } else if (statValueArray[2] > statValueArray[1]) {
          // console.log("As statValueArray[2]: " + statValueArray[2] + " > statValueArray[1]: " + statValueArray[1] + ", make the right bar yellow.")
          // Player 2 stats are higher so colour the right bar yellow.
          BarElement = document
            .getElementById("comparison-" + statName + "-player-2-bar")
            .classList.add("yellow"); // Get the player 2 Bar Element dynamically and add the yellow class from the selected element.
          // Remove any left over yellow colour from the left bar.
          BarElement = document
            .getElementById("comparison-" + statName + "-player-1-bar")
            .classList.remove("yellow"); // Get the player 1 Bar Element dynamically and remove the yellow class from the selected element.
        } else {
          // Do nothing as should not get to this case.
          console.warn("Error in logic for stat " + statName + ".");
        }
      } else {
        // Colour the bars based on the lower value being better and therefore being better.
        // console.log("As higherBetterBoolean is false, colour the lower stat value yellow.")
        if (statValueArray[1] < statValueArray[2]) {
          // console.log("As statValueArray[1]: " + statValueArray[1] + " < statValueArray[2]: " + statValueArray[2] + ", make the left bar yellow.")
          // Player 1 stats are lower so colour the left bar yellow.
          BarElement = document
            .getElementById("comparison-" + statName + "-player-1-bar")
            .classList.add("yellow"); // Get the player 1 Bar Element dynamically and add the yellow class from the selected element.
          // Remove any left over yellow colour from the right bar.
          BarElement = document
            .getElementById("comparison-" + statName + "-player-2-bar")
            .classList.remove("yellow"); // Get the player 2 Bar Element dynamically and remove the yellow class from the selected element.
        } else if (statValueArray[2] < statValueArray[1]) {
          // console.log("As statValueArray[2]: " + statValueArray[2] + " < statValueArray[1]: " + statValueArray[1] + ", make the right bar yellow.")
          // Player 2 stats are lower so colour the right bar yellow.
          BarElement = document
            .getElementById("comparison-" + statName + "-player-2-bar")
            .classList.add("yellow"); // Get the player 2 Bar Element dynamically and add the yellow class from the selected element.
          // Remove any left over yellow colour from the left bar.
          BarElement = document
            .getElementById("comparison-" + statName + "-player-1-bar")
            .classList.remove("yellow"); // Get the player 1 Bar Element dynamically and remove the yellow class from the selected element.
        } else {
          // Do nothing as should not get to this case.
          console.warn("Error in logic for stat " + statName + ".");
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
  if (statValueArray[1] + statValueArray[2] === 0) {
    BarElement = document.getElementById(
      "comparison-" + statName + "-player-1-bar-container"
    ).style.width = 0 + "%";
    BarElement = document.getElementById(
      "comparison-" + statName + "-player-2-bar-container"
    ).style.width = 0 + "%";
  } else {
    // Calculate the width of the container div holding the bar and set its width based on that.
    ElementWidth = Math.floor((statValueArray[1] / totalStatValue) * 100);
    // console.log("ElementWidth (left): " + ElementWidth + "%");
    BarElement = document.getElementById(
      "comparison-" + statName + "-player-1-bar-container"
    ).style.width = ElementWidth + "%";
    // Calculate the width of the container div holding the bar and set its width based on that.
    ElementWidth = Math.floor((statValueArray[2] / totalStatValue) * 100);
    // console.log("ElementWidth (right): " + ElementWidth + "%");
    BarElement = document.getElementById(
      "comparison-" + statName + "-player-2-bar-container"
    ).style.width = ElementWidth + "%";
  }

  // Hide the stats that should not be shown based on the users selection.
  let containerElement = document.getElementById(
    "comparison-" + statName + "-container"
  ); // Get the container element dynamically.
  console.log("containerElement = comparison-" + statName + "-container");
  if (statCategoryValue == "All") {
    // Remove the hidden class from this container element as it should be shown.
    containerElement.classList.remove("hidden"); // Remove the hidden CSS class from the container element.
  } else if (statObject[statName].statCategory == statCategoryValue) {
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
  console.groupCollapsed("ResetStatsBars Info Logs"); // Group further console logs. https://www.freecodecamp.org/news/javascript-console-log-example-how-to-print-to-the-console-in-js/

  for (let i = 0; i < statsArray.length; i++) {
    console.log("Stat being worked on: " + statsArray[i]); // Log the stat being updated.

    // Add a try catch around dynamically updating HTML elements as not all stats object to be used.
    try {
      // Reset the player stat bars by removing the animation.

      // Sort the player 1 side.
      var BarElement = document.getElementById(
        "comparison-" + statsArray[i] + "-player-1-bar"
      ); // Get the Bar Element dynamically.
      BarElement.style.animation = ""; // Clear the animation as part of the reset ready for it to be re-applied.
      // console.log("BarElement.style.animation:");
      // console.log(BarElement.style.animation);
      BarElement.classList.remove("yellow"); // Remove the yellow class from the selected element.
      BarElement = document.getElementById(
        "comparison-" + statsArray[i] + "-player-1-bar-container"
      ); // Get the Container Element dynamically.
      BarElement.style.width = "0";

      // Sort the player 2 side.
      BarElement = document.getElementById(
        "comparison-" + statsArray[i] + "-player-2-bar"
      ); // Get the Bar Element dynamically.
      BarElement.style.animation = ""; // Clear the animation as part of the reset ready for it to be re-applied.
      // console.log("BarElement.style.animation:");
      // console.log(BarElement.style.animation);
      BarElement.classList.remove("yellow"); // Remove the yellow class from the selected element.
      BarElement = document.getElementById(
        "comparison-" + statsArray[i] + "-player-2-bar-container"
      ); // Get the Container Element dynamically.
      BarElement.style.width = "0";
    } catch (err) {
      console.info(
        "Stat = " + statsArray[i] + " not found on sheet so skipping."
      );
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
  var teamSelectionDropdown = document.getElementById(
    "tables-results-fixtures-team-selection-dropdown"
  );
  var teamSelection =
    teamSelectionDropdown.options[teamSelectionDropdown.selectedIndex].value; // Get the team selected value (which comes through as 1s etc). (https://stackoverflow.com/a/8549358/14290169).

  // Update the information bar.
  displayInformation(
    "tables-results-fixtures-information-bar",
    "Click on a table for more details on the AFC site"
  );

  // Define an array of teams to update. Each team corresponds to an HTML element.
  let teamArray = ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s"];
  for (let i = 0; i < teamArray.length; i++) {
    // console.log("Processing " + teamArray[i]); // Log the team being updated.

    // Select the teamTableDiv and teamResultsAndFixturesDiv for the team.
    var teamTableDiv = document.getElementById(
      "dorkinians" + teamArray[i] + "Table"
    ); // Get the Teams table div dynamically.
    // console.log("> teamTableDiv for " + teamArray[i] + " is: dorkinians" + teamArray[i] + "Table"); // Log the teamTableDiv being updated.
    var teamResultsAndFixturesDiv = document.getElementById(
      "dorkinians" + teamArray[i] + "ResultsAndFixtures"
    ); // Get the Teams results and fixtures div dynamically.
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
  document.getElementById("pop-up-box").style.display = "inline"; // Show the pop up box.
  document.getElementById("background-overlay-pop-up-box").style.display =
    "inline"; // Show the background overlay behind the pop up box.
  document.getElementById("background-overlay-pop-up-box").style.zIndex = 29; // Set the z-index of the background overlay to be right behind the pop up box.

  // Populate the pop up box with the text passed to it.
  document.getElementById("pop-up-box-header-text").innerHTML = headerText; // Add the header text to the HTML element.
  document.getElementById("pop-up-box-message-text").innerHTML = messageText; // Add the header text to the HTML element.
}

// Close and hide the pop up box.
function closePopUpBox() {
  // console.log("Pop Up Box closed."); // Log a message to the console.

  // Select the pop up box and hide it.
  document.getElementById("pop-up-box").style.display = "none"; // Hide the pop up box.
  document.getElementById("background-overlay-pop-up-box").style.display =
    "none"; // Hide the background overlay behind the pop up box.
}

// Table Functions

// Clear the table to make space for new data.
function clearTable(selector) {
  // console.log('%c' + '>> Re-usable Function: clearTable() called. Passed variables: selector = ' + selector, ' background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
  // https://stackoverflow.com/a/3955238/14290169
  const myNode = document.querySelector(selector); // Select the parent from which to delete all child elements from. Modified the selector to be dynamic and accept any type of selector. Previously, defining as "table" meant that it only works if the HTML page has only one table element.
  while (myNode.firstChild) {
    // Loop through all child elements.
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
  if (dataForm == "array") {
    // Define the header data as from the array.
    // console.log("dataForm = " + dataForm + " therefore data is in array form, so pass through data as the first row of data of the array."); // Log if the toolTipBoolean is in play or not.
    var headerdata = data[0]; // Get the header data from the first element of the array.
    //console.log("headerdata printed below:");
    //console.log(headerdata);
  } else if (dataForm == "object") {
    // Define the header data as the keys of the object.
    // console.log("dataForm = " + dataForm + " therefore data is in object form, so pass through the header data as the first keys of the object."); // Log if the toolTipBoolean is in play or not.
    var headerdata = Object.keys(data[0]); // Create an array of the object headers from the array data received.
    // console.log("headerdata printed below:");
    // console.log(headerdata);
  } else {
    alert(
      "Error - No dataForm passed to 'createFullTable' in jMainFunctions.js."
    );
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
  for (let key of headerdata) {
    // Loop through each column header of the headerdata.
    let th = document.createElement("th"); // Create the th element.
    // If the toolTipBoolean is true, create the headers to also include the tool tips.
    if (toolTipBoolean == true) {
      // Define how to add the text depending on if toolTips are enabled for the table.
      // console.log("toolTipBoolean is true so adding tooltip.");
      var text = document.createTextNode(key); // Create a text node from the header data key to be apended.
      th.appendChild(text); // Append the text to the table header.
      // Skip the first column.
      if (counter == 0) {
        // If the counter = 0, it's the first column.
        // Do nothing.
      } else {
        // For all other columns, add the tool tip.
        th.classList.add("tooltip"); // Add the tooltip class to the th element (the container element).
        var toolTip = document.createElement("p"); // Create a paragraph element to be appended.
        toolTip.innerHTML = array[0][key]; // Add the text of the first row, with the key as the column to the new paragraph element.
        toolTip.classList.add("tooltiptext"); // Add the tooltiptext class to the new paragraph element.
        toolTip.classList.add("wordwrap"); // Add the wordwrap class to the new paragraph element.
        th.appendChild(toolTip); // Append the toolTip paragraph element as a child to the th element.
      }
    } else {
      // If toolTipBoolean is false, add text the normal way.
      // console.log("toolTipBoolean is false so not adding tooltip.");
      var text = document.createTextNode(key); // Create a text node from the header data key to be apended.
      th.appendChild(text); // Append the text to the table header.
    }
    if (counter == 0) {
      // If the counter = 0, it's the first column.
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

  for (let element of data) {
    // Loop through each row of the data.
    let row = tbody.insertRow(); // Insert a row for each bit of table data.
    columnCounter = 0; // Define a counter for checking which column to apply stick-col rule to.
    // console.log("-------------------------------------")
    // console.log("Row data = below")
    // console.log(element)
    if (rowCounter <= 1) {
      // Skip the first row regardless.
      // Do nothing.
      // console.log("Row count " + rowCounter + " skipped as this is the table headers.")
    } else {
      if (toolTipBoolean == true && rowCounter == 1) {
        // Skip doing the first row for tables that have tooltips.
        // console.log("toolTipBoolean is true so skipping row = " + rowCounter + ".");
      } else {
        // console.log("toolTipBoolean is false so not skipping row = " + rowCounter + ".");
        for (key in element) {
          // Loop through each cell in each row.
          let cell = row.insertCell(); // Create the cell.
          let text = document.createTextNode(element[key]); // Add the cell text.
          cell.appendChild(text); // Append the text to the cell.

          // Loop through the columns to apply styling.
          if (columnCounter == 0) {
            // If the columnCounter = 0, it's the first column.
            cell.classList.add("sticky-col"); // Add the sticky-col class to the first column.
            cell.classList.add("first-col"); // Add the first-col class to the first column.
          } else {
            // Do nothing as not first column.
          }

          // Get the data type of the value being added to the cell.
          //console.log("Data type of untested value '" + element[key] + "' is '" + dataType + "'.")
          testedValue = parseInt(element[key]); // First, parseInt the value.
          if (isNaN(testedValue) == true) {
            // If the parseInt returns "NaN", it's a string.
            dataType = "string";
            cell.classList.add("textleft"); // Add the textleft class to the cell.
          } else {
            // If not NaN, get the typeof of the value.
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
  const filteredArrayOfObjects = ArrayOfObjects.filter((data) =>
    data[keyName].includes(filterValue)
  ); // Filter down the data into a new array of objects.
  return filteredArrayOfObjects; // Return the new filtered array of objects.
}

// Filter an Array of Objects based on multiple inputs and return another Array of Objects, filtered by the input values, against the defined objects key. https://medium.com/@melaniecp/filtering-an-arrays-objects-based-on-a-value-in-a-key-value-array-using-filter-and-includes-27268968308f
function multiFilterArrayOfObjects(
  ArrayOfObjects,
  toolTipBoolean,
  keyNameSeason,
  filterValueSeason,
  keyNamePlayer,
  filterValuePlayer,
  keyNameTeam,
  filterValueTeam,
  keyNameLocation,
  filterValueLocation
) {
  // Receive an Array of Objects, and multiple key names and filter values.
  // console.log('%c' + '>> Re-usable Function: multiFilterArrayOfObjects(ArrayOfObjects, keyNames , filterValues...) called. Passed variables: ArrayOfObjects = not shown, keyNameSeason = ' + keyNameSeason + ', filterValueSeason = ' + filterValueSeason, ', keyNamePlayer = ' + keyNamePlayer + ', filterValuePlayer = ' + filterValuePlayer, ', keyNameTeam = ' + keyNameTeam + ', filterValueTeam = ' + filterValueTeam, ', keyNameLocation = ' + keyNameLocation + ', filterValueLocation = ' + filterValueLocation, ' background-color: lightblue; color:black; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
  // Initially define the variable that will be manipulated and produced.
  var filteredArrayOfObjects = ArrayOfObjects;
  console.log(ArrayOfObjects);

  // Check if the original ArrayOfObjects includes a toolTip row or not.
  if (toolTipBoolean === true) {
    // Remove the first element, store it and create the other filterable array for further work (without the first toolTip element).
    var filteredArrayOfObjectsFirstElement = [filteredArrayOfObjects.shift()]; // Remove the first element of the array and store it. https://bobbyhadz.com/blog/javascript-remove-first-element-from-array#remove-the-first-element-from-an-array.
    // console.log("filteredArrayOfObjectsFirstElement");
    // console.log(filteredArrayOfObjectsFirstElement);
    var filteredArrayOfObjectsWithoutFirstElement =
      filteredArrayOfObjects.slice(1); // Return the full array without the first element. https://bobbyhadz.com/blog/javascript-remove-first-element-from-array#remove-the-first-element-from-an-array.
    // console.log("filteredArrayOfObjectsWithoutFirstElement");
    // console.log(filteredArrayOfObjectsWithoutFirstElement);

    // Set the array to be worked on and filtered to be the one without the first element.
    filteredArrayOfObjects = filteredArrayOfObjectsWithoutFirstElement;
  }

  // Filter the Array of Objects for multiple criteria.

  // Filter the Array of Objects for the defined season.
  if (filterValueSeason === "Season" || filterValueSeason === "All Seasons") {
    // Don't filter if unpicked.
    // Do nothing as season hasn't been selected.
    // console.log(">>> Data not filtered for seasons as 'Season' still picked.")
  } else {
    // Filter the Array of Objects.
    filteredArrayOfObjects = filteredArrayOfObjects.filter((data) =>
      data[keyNameSeason].includes(filterValueSeason)
    ); // Filter down the data into a new array of objects.
  }

  // Filter the Array of Objects for the selected player.
  if (filterValuePlayer === "Player") {
    // Don't filter if unpicked.
    // Do nothing as player hasn't been selected.
    // console.log(">>> Data not filtered for players as 'Player' still picked.")
  } else {
    // Filter the Array of Objects.
    filteredArrayOfObjects = filteredArrayOfObjects.filter((data) =>
      data[keyNamePlayer].includes(filterValuePlayer)
    ); // Filter down the data into a new array of objects.
  }

  // Filter the Array of Objects for the selected team.
  if (filterValueTeam === "Team") {
    // Don't filter if unpicked.
    // Do nothing as team hasn't been selected.
    // console.log(">>> Data not filtered for teams as 'Team' still picked.")
  } else {
    // Filter the Array of Objects.
    filteredArrayOfObjects = filteredArrayOfObjects.filter((data) =>
      data[keyNameTeam].includes(filterValueTeam)
    ); // Filter down the data into a new array of objects.
  }

  // Filter the Array of Objects for the selected location.
  if (filterValueLocation === "Location") {
    // Don't filter if unpicked.
    // Do nothing as location hasn't been selected.
    // console.log(">>> Data not filtered for locations as 'Location' still picked.")
  } else {
    // Filter the Array of Objects.
    filteredArrayOfObjects = filteredArrayOfObjects.filter((data) =>
      data[keyNameLocation].includes(filterValueLocation)
    ); // Filter down the data into a new array of objects.
  }

  // If the original ArrayOfObjects included a toolTip row, re-add it.
  if (toolTipBoolean === true) {
    // Re-combine the toolTip row element with the new filtered element.
    // console.log("filteredArrayOfObjectsFirstElement");
    // console.log(filteredArrayOfObjectsFirstElement);
    // console.log("filteredArrayOfObjects");
    // console.log(filteredArrayOfObjects);
    var filteredArrayOfObjects = filteredArrayOfObjectsFirstElement.concat(
      filteredArrayOfObjects
    ); // Re-merge the two arrays using concat. https://www.w3schools.com/jsref/jsref_concat_array.asp.
  }

  return filteredArrayOfObjects; // Return the new filtered array of objects.
}

// Format a value based on a passed format type.
function formatValue(valueToBeFormatted, statFormat) {
  if (statFormat == "Integer") {
    // Convert the stat to an integer.
    var displayText = Number(valueToBeFormatted).toLocaleString("en-UK"); // Use a dynamic [statArray[i]] key. Convert the stat to a number and then add a comma by using the "toLocaleString" method.
  } else if (statFormat == "Decimal2") {
    // Convert the stat to 2 decimal places.
    var displayText = Number(valueToBeFormatted).toFixed(2); // Use a dynamic [statArray[i]] key. Convert the stat to a number to 2 decimal places by using the "toFixed" method.
  } else if (statFormat == "Decimal1") {
    // Convert the stat to 1 decimal places.
    var displayText = Number(valueToBeFormatted).toFixed(1); // Use a dynamic [statArray[i]] key. Convert the stat to a number to 1 decimal places by using the "toFixed" method.
  } else {
    // For all else, including percentages and strings, just display as passed.
    var displayText = valueToBeFormatted; // Do nothing to passed value.
  }

  return displayText;
}

// Other Functions

// Full Screen functions (https://stackoverflow.com/a/23971798/14290169).

// function isFullScreen() {
//     return (document.fullScreenElement && document.fullScreenElement !== null)
//         || document.mozFullScreen
//         || document.webkitIsFullScreen;
// }

// function requestFullScreen(element) {
//     if (element.requestFullscreen)
//         element.requestFullscreen();
//     else if (element.msRequestFullscreen)
//         element.msRequestFullscreen();
//     else if (element.mozRequestFullScreen)
//         element.mozRequestFullScreen();
//     else if (element.webkitRequestFullscreen)
//         element.webkitRequestFullscreen();
// }

// function exitFullScreen() {
//     if (document.exitFullscreen)
//         document.exitFullscreen();
//     else if (document.msExitFullscreen)
//         document.msExitFullscreen();
//     else if (document.mozCancelFullScreen)
//         document.mozCancelFullScreen();
//     else if (document.webkitExitFullscreen)
//         document.webkitExitFullscreen();
// }

// function toggleFullScreen(element) {
//     if (isFullScreen()) {
//         console.log("Exiting full screen mode.");
//         exitFullScreen();
//     } else {
//         console.log("Entering full screen mode.");
//         requestFullScreen(element || document.documentElement);
//     }
// }

// Math Functions

// Rounding Function (https://learnersbucket.com/examples/javascript/learn-how-to-round-to-2-decimal-places-in-javascript/).
let roundOff = (num, places) => {
  const x = Math.pow(10, places);
  return Math.round(num * x) / x;
};

// Random Number Function. https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/.
function randomNumber(min, max) {
  // Function to generate random number between a defined min and max.
  return Math.random() * (max - min) + min;
}

// Date Function

// Next Date Function - https://stackoverflow.com/a/27336600/14290169
function nextDay(d, dow) {
  d.setDate(d.getDate() + ((dow + (7 - d.getDay())) % 7));
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

// Dropdown Component Functions

// 1. Populate the dropdown with Player names.
function populateDropdownList(
  tabName,
  playerNameArray,
  dropdownID,
  dropdownButtonID,
  dropdownOptionContainerParentID
) {
  // console.log("Function populateDropdownList called with dropdownID: " + dropdownID + ", from tab: " + tabName); // Log that the function has been called.

  // console.log("playerNameArray"); // Log the received array.
  // console.log(playerNameArray); // Log the received array.

  // Loop through the player name array and add the names as options below the dropdown selector.
  for (let i = 0; i < playerNameArray.length; i++) {
    let newOption = document.createElement("div"); // Create the new option element (but as a div as option doesn't work on mobile).
    newOption.classList.add("selection-dropdown-option"); // Add the selection-dropdown-option class to the new element.
    newOption.classList.add("textleft"); // Add the textleft class to the new element.
    // Function used for onclick of all dropdown options.
    newOption.onclick = function () {
      // Add an onClick event to the added element. https://stackoverflow.com/a/3316223/14290169.
      document.getElementById(dropdownButtonID).value = playerNameArray[i]; // Update the button element to have the property value with the players name.
      document.getElementById(dropdownButtonID).innerHTML =
        playerNameArray[i] +
        "<img src='/pages/Dorkinians-Page/images/Down Arrow Icon.webp' alt='Down Arrow Icon' class='selection-dropdown-arrow-icon' height='25px' width='25px'>"; // Update the button text to show the player name.
      // alert("Hello from " + dropdownID + ", passed playerName: " + playerNameArray[i]);
      closeDropdownList(dropdownID, tabName); // Close the dropdown list.
      // Call the next function on the basis of what tab the dropdown is from.
      if (tabName == "player-stats") {
        showPlayerStatsTabUpdatedInfo(); // Update the Player Stats Tab.
      } else if (tabName == "comparison") {
        updateComparisonStatData(); // Update the Comparison Tab.
      } else {
        alert(dropdownID + " dropdown called from an unknown tab location?"); // Add a catch.
      }
    };
    let playerNameText = document.createTextNode(playerNameArray[i]); // Create a text node of the players name.
    newOption.appendChild(playerNameText); // Append the text node to the new element.
    let parentElement = document.getElementById(
      dropdownOptionContainerParentID
    ); // Get the parent dropdown element.
    parentElement.appendChild(newOption); // Append the new element to the parent dropdown element.
  }
}

// 2. When the user clicks on the button,toggle between hiding and showing the dropdown content. https://www.w3schools.com/howto/howto_js_filter_dropdown.asp.
function showDropdownList(dropdownID, tabName) {
  //console.log("showDropdownList clicked for dropdownID: " + dropdownID + " from tab: " + tabName); // Log that the dropdown has been clicked.

  // Make the selection dropdown content visible.
  document.getElementById(dropdownID + "-contents").style.display = "block"; // Show the selection dropdown contents.
  document.getElementById(dropdownID + "-contents").style.zIndex = 10; // Move the contents to the front of the page.

  // Set up the background overlay behind the contents so when a user clicks off the content, it closes.
  document.getElementById(
    "background-overlay-selection-dropdown-" + tabName
  ).style.display = "inline"; // Show the background overlay behind the selection dropdown.
  document.getElementById(
    "background-overlay-selection-dropdown-" + tabName
  ).style.zIndex = 9; // Set the z-index of the background overlay to be right behind the selection dropdown.

  // Dynamically assign the correct onClick action to the background overlay.
  document.getElementById(
    "background-overlay-selection-dropdown-" + tabName
  ).onclick = function () {
    closeDropdownList(dropdownID, tabName);
  };
}

// 3. Filter the results if the user types. https://www.w3schools.com/howto/howto_js_filter_dropdown.asp.
function filterDropdownList(dropdownID, inputID) {
  console.log("filterDropdownList clicked for dropdownID: " + dropdownID); // Log that the dropdown is being filtered.
  let input = document.getElementById(inputID); // Get the input field.
  let filter = input.value.toUpperCase(); // Get the input value.
  let containerDiv = document.getElementById(dropdownID); // Get the container div holding the options.
  let option = containerDiv.getElementsByClassName("selection-dropdown-option"); // Get the options by looking for elements with the selection-dropdown-option class.
  for (i = 0; i < option.length; i++) {
    // Loop through the array of options.
    txtValue = option[i].textContent || option[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      option[i].style.display = ""; // Display options that do match the input.
    } else {
      option[i].style.display = "none"; // Don't display options that don't match the input.
    }
  }
}

// 4. Close the dropdown list and the background overlay associated with it.
function closeDropdownList(dropdownID, tabName) {
  //console.log("closeDropdownList clicked for dropdownID: " + dropdownID + " from tab: " + tabName); // Log that the dropdown has been closed.
  document.getElementById(dropdownID + "-contents").style.display = "none"; // Hide the selection dropdown content.
  document.getElementById(
    "background-overlay-selection-dropdown-" + tabName
  ).style.display = "none"; // Hide the background overlay behind the selection dropdown.
}
