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
    console.log(data); // Log the data in the console.
    // Initially receive the clicked user name from the User Page or Login Page. https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
    var clickedUserName = sessionStorage.getItem("clickedUserName"); // Retrieve the variable passed to session storage.
    if (clickedUserName == null) { clickedUserName = "Alex"; } // Deal with initial load of the page where no user has been selected.
    getData(data, clickedUserName); // Pass the data to the getData function to be processed.
}

// Get the data out into usable values to be passed to the HTML elements.
function getData(data, clickedUserName) {

    // Loop through data array and match the user to return the row in the array of objects that relates to the user.
    for (let x = 0; x < data.length; x++) {
        //console.log("x = " + x + ", data[x].fullName = " + data[x].fullName); // Show the looping process.
        if (data[x].User === clickedUserName) {
            var foundRow = x; // The found row containing the correct user object.
        }

    }

    console.log("Found Row = " + foundRow)

    // Modify HTML elements with the found data.

    // document.getElementById("height").innerHTML = document.getElementById("height").innerHTML.replace("--",data[foundRow].height); // This is an alternative way of replacing the data using the replace function.

    // Profile Tab
    document.getElementById("profilePicture").src = data[foundRow].profilePictureURL; // Modify the source of the image.
    document.getElementById("fullName").innerHTML = data[foundRow].funName; // Modify the text inside the element.
    document.getElementById("height").innerHTML = data[foundRow].height; // Modify the text inside the element.
    document.getElementById("weight").innerHTML = data[foundRow].weight; // Modify the text inside the element.
    document.getElementById("phone").innerHTML = data[foundRow].phone; // Modify the text inside the element.
    document.getElementById("email").innerHTML = data[foundRow].email; // Modify the text inside the element.
    console.log('mailto:' + data[foundRow].email);
    document.getElementById("email").setAttribute('href', 'mailto:' + data[foundRow].email); // Update the href of the link dynamically.
    document.getElementById("facebook").innerHTML = data[foundRow].facebookHandle; // Modify the text inside the element.
    document.getElementById("facebook").setAttribute('href', data[foundRow].facebookURL); // Update the href of the link dynamically.
    document.getElementById("twitter").innerHTML = data[foundRow].twitterHandle; // Modify the text inside the element.
    document.getElementById("twitter").setAttribute('href', data[foundRow].twitterURL); // Update the href of the link dynamically.
    document.getElementById("instagram").innerHTML = data[foundRow].instagramHandle; // Modify the text inside the element.
    document.getElementById("instagram").setAttribute('href', data[foundRow].instagramURL); // Update the href of the link dynamically.

    // Contact Tab

    // History Tab
    
    /// Ashcombe
    document.getElementById("ashcombeYear11YearBookQuote").innerHTML = data[foundRow].ashcombeYear11YearBookQuote; // Modify the text inside the element.
    document.getElementById("ashcombeSixthFormYearBookQuote").innerHTML = data[foundRow].ashcombeSixthFormYearBookQuote; // Modify the text inside the element.

    /// Brockham Badgers    
    document.getElementById("brockhamBadgersPicture").src = data[foundRow].brockhamBadgersImagePath; // Modify the source of the image.
    document.getElementById("BBsU11sQuote").innerHTML = data[foundRow].BBsU11sQuote; // Modify the text inside the element.
    document.getElementById("BBsU12sQuote").innerHTML = data[foundRow].BBsU12sQuote; // Modify the text inside the element.
    document.getElementById("BBsU13sQuote").innerHTML = data[foundRow].BBsU13sQuote; // Modify the text inside the element.
    document.getElementById("BBsU14sQuote").innerHTML = data[foundRow].BBsU14sQuote; // Modify the text inside the element.
    document.getElementById("BBsU15sQuote").innerHTML = data[foundRow].BBsU15sQuote; // Modify the text inside the element.
    document.getElementById("BBsU16sQuote").innerHTML = data[foundRow].BBsU16sQuote; // Modify the text inside the element.
    document.getElementById("BBsAwards").innerHTML = data[foundRow].BBsAwards; // Modify the text inside the element.

    // Football Tab
    document.getElementById("footballHeader").src = data[foundRow].footballHeaderImagePath; // Modify the source of the image.
    document.getElementById("proTeamLeagueLogo").src = data[foundRow].proTeamLeagueLogoImagePath; // Modify the source of the image.
    var proTeam = data[foundRow].proTeam; // Get the proTeam from the IndividualsPage table.
    sessionStorage.setItem("proTeam", proTeam); // Save the variable to session storage.
    getProTeamTable(); // Call the getProTeamTable() function from jIndividualsPageProTeam.js to get the league table into the sheet.
    //document.getElementById("dorkiniansTable").innerHTML = data[foundRow].dorkiniansLeagueCode; // Modify the text inside the element.
    var lrcode = data[foundRow].dorkiniansLeagueCode;
    getDorkiniansTable(lrcode);

    // Widgets Tab
    //document.querySelector(".weatherwidget-io").innerHTML = data[foundRow].weatherWidgetHomeTown; // Modify the text inside the element.
    document.querySelector(".weatherwidget-io").setAttribute('href', data[foundRow].weatherWidgetURL); // Update the href of the link dynamically to the correct URL.
    document.querySelector(".weatherwidget-io").setAttribute('data-label_1', data[foundRow].weatherWidgetHomeTown); // Update the data label 1 dynamically to read the town name. 


    // Once the widget has been updated with the new attributes, re-run the JavaScript for the widget (copied directly from 'https://weatherwidget.io/js/widget.min.js').
    "use strict"; function __weatherwidget_init() { var a = document.getElementsByClassName("weatherwidget-io"), i = []; if (0 !== a.length) { for (var t = function (t) { var e = a[t], o = {}; o.id = "weatherwidget-io-" + t, o.href = e.href, o.label_1 = e.getAttribute("data-label_1"), o.label_2 = e.getAttribute("data-label_2"), o.font = e.getAttribute("data-font"), o.icons = e.getAttribute("data-icons"), o.mode = e.getAttribute("data-mode"), o.days = e.getAttribute("data-days"), o.theme = e.getAttribute("data-theme"), o.basecolor = e.getAttribute("data-basecolor"), o.accent = e.getAttribute("data-accent"), o.textcolor = e.getAttribute("data-textcolor"), o.textAccent = e.getAttribute("data-textAccent"), o.highcolor = e.getAttribute("data-highcolor"), o.lowcolor = e.getAttribute("data-lowcolor"), o.suncolor = e.getAttribute("data-suncolor"), o.mooncolor = e.getAttribute("data-mooncolor"), o.cloudcolor = e.getAttribute("data-cloudcolor"), o.cloudfill = e.getAttribute("data-cloudfill"), o.raincolor = e.getAttribute("data-raincolor"), o.snowcolor = e.getAttribute("data-snowcolor"), o.windcolor = e.getAttribute("data-windcolor"), o.fogcolor = e.getAttribute("data-fogcolor"), o.thundercolor = e.getAttribute("data-thundercolor"), o.hailcolor = e.getAttribute("data-hailcolor"), o.dayscolor = e.getAttribute("data-dayscolor"), o.tempcolor = e.getAttribute("data-tempcolor"), o.desccolor = e.getAttribute("data-desccolor"), o.label1color = e.getAttribute("data-label1color"), o.label2color = e.getAttribute("data-label2color"), o.shadow = e.getAttribute("data-shadow"), o.scale = e.getAttribute("data-scale"), (r = document.getElementById(o.id)) && e.removeChild(r), i[o.id] = document.createElement("iframe"), i[o.id].setAttribute("id", o.id), i[o.id].setAttribute("class", "weatherwidget-io-frame"), i[o.id].setAttribute("title", "Weather Widget"), i[o.id].setAttribute("scrolling", "no"), i[o.id].setAttribute("frameBorder", "0"), i[o.id].setAttribute("width", "100%"), i[o.id].setAttribute("src", "https://weatherwidget.io/w/"), i[o.id].style.display = "block", i[o.id].style.position = "absolute", i[o.id].style.top = "0", i[o.id].onload = function () { i[o.id].contentWindow.postMessage(o, "https://weatherwidget.io") }, e.style.display = "block", e.style.position = "relative", e.style.height = "150px", e.style.padding = "0", e.style.overflow = "hidden", e.style.textAlign = "left", e.style.textIndent = "-299rem", e.appendChild(i[o.id]) }, e = 0, o = Math.min(a.length, 10); e < o; e++) { var r; t(e) } window.addEventListener("message", function (t) { "https://weatherwidget.io" === t.origin && i[t.data.wwId] && i[t.data.wwId].parentNode && (i[t.data.wwId].style.height = t.data.wwHeight + "px", i[t.data.wwId].parentNode.style.height = t.data.wwHeight + "px") }) } else setTimeout(__weatherwidget_init, 1500) } setTimeout(__weatherwidget_init, 100);
}

// End the console timer.
console.timeEnd();