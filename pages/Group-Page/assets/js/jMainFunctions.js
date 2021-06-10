// jMainFunction.js JavaScript Functions

// Main Function scripts used across many pages

// Change the site theme style based on user selection.
function changeSiteTheme(siteThemeName) {
    //console.log("changeSiteTheme clicked."); // Log that the function has been called.
    sessionStorage.setItem("siteThemeName", siteThemeName); // Save the variable to session storage.
    var siteThemeHref;
    var siteThemeMainStyleHexColour;
    var siteThemeBackgroundHexColour;
    if (siteThemeName == "1") { // Check which site theme has been selected and provide the href link to the CSS sheet.
        siteThemeHref = "OriginalTheme.css";
        siteThemeMainStyleHexColour = "#FF3CAC";
        siteThemeBackgroundHexColour = "#784BA0";
    } else if (siteThemeName == "2") {
        siteThemeHref = "DarkGreyOrange.css";
        siteThemeMainStyleHexColour = "#F7573A";
        siteThemeBackgroundHexColour = "#222129";
    } else if (siteThemeName == "3") {
        siteThemeHref = "BlueGreen.css";
        siteThemeMainStyleHexColour = "#419D78";
        siteThemeBackgroundHexColour = "#010619";
    } else {
        siteThemeHref = "DarkGreyOrange.css"; // Default back to orange if any issues.
        siteThemeMainStyleHexColour = "#F7573A";
        siteThemeBackgroundHexColour = "#222129";
    }
    console.log('%c' + '> Site theme changed: siteThemeName = ' + siteThemeName + ', siteThemeHref = ' + siteThemeHref, ' background-color:' + siteThemeBackgroundHexColour + '; color:' + siteThemeMainStyleHexColour + '; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
    siteThemeHref = "/pages/Group-Page/assets/css/Themes/" + siteThemeHref; // Create the full siteThemeHref link.
    sessionStorage.setItem("siteThemeHref", siteThemeHref); // Save the variable to session storage.
    sessionStorage.setItem("siteThemeMainStyleHexColour", siteThemeMainStyleHexColour); // Save the variable to session storage.
    sessionStorage.setItem("siteThemeBackgroundHexColour", siteThemeBackgroundHexColour); // Save the variable to session storage.
    document.getElementById('css-theme').href = siteThemeHref; // Change the CSS stylesheet used on the page.
    closeNav(); // Close the side navigation that the function was called from.
    //console.log("Site theme changed."); // Log a final success message.
}

// For each page, start by getting the site theme.
function getSiteTheme() {
    var siteThemeName = sessionStorage.getItem("siteThemeName"); // Retrieve the variable passed to session storage.
    var siteThemeHref = sessionStorage.getItem("siteThemeHref"); // Retrieve the variable passed to session storage.
    var siteThemeMainStyleHexColour = sessionStorage.getItem("siteThemeMainStyleHexColour"); // Retrieve the variable passed to session storage.
    var siteThemeBackgroundHexColour = sessionStorage.getItem("siteThemeBackgroundHexColour"); // Retrieve the variable passed to session storage.
    // Default back to the original if any issues.
    if (siteThemeName == null) {
        siteThemeName = 2;
        siteThemeHref = "DarkGreyOrange.css";
        siteThemeHref = "/pages/Group-Page/assets/css/Themes/" + siteThemeHref; // Create the full siteThemeHref link.
        siteThemeMainStyleHexColour = "#F7573A";
        siteThemeBackgroundHexColour = "#222129";
    }
    document.getElementById('css-theme').href = siteThemeHref; // Update the site theme to the defined theme.
    console.log('%c' + '> siteThemeName = ' + siteThemeName + ', siteThemeMainStyleHexColour = ' + siteThemeMainStyleHexColour, ' background-color:' + siteThemeBackgroundHexColour + '; color:' + siteThemeMainStyleHexColour + '; padding: 0.5em 0em; font-weight: bold;'); // Log the selected site name and href.
}

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

// Not needed for now.
// function zoomOutMobile() {
//     console.log("Zoom back out to initial scale.");
    
//     const viewport = document.querySelector('meta[name="viewport"]');

//     if (viewport) {
//         viewport.content = 'initial-scale=1';
//         viewport.content = 'width=device-width';
//     }

//     alert("Zoomed back out");
// }