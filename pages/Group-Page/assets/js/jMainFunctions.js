// jMainFunction.js JavaScript Functions

// Main Function scripts used across many pages

// Change the site theme style based on user selection.
function changeSiteTheme(siteThemeName) {
    console.log("changeSiteTheme clicked."); // Log that the function has been called.
    sessionStorage.setItem("siteThemeName", siteThemeName); // Save the variable to session storage.
    // Check which site theme has been selected and provide the href link to the CSS sheet.
    if (siteThemeName == "1") {
        siteThemeHref = "OriginalTheme.css";
    } else if (siteThemeName == "2") {
        siteThemeHref = "DarkGreyOrange.css";
    } else if (siteThemeName == "3") {
        siteThemeHref = "BlueGreen.css";
    } else {
        siteThemeHref = "OriginalTheme.css"; // Default back to the original if any issues.
    }
    siteThemeHref = "/pages/Group-Page/assets/css/Themes/" + siteThemeHref; // Create the full siteThemeHref link.
    console.log("siteThemeName = " + siteThemeName + ". siteThemeHref = " + siteThemeHref); // Log the selected site name and href.
    sessionStorage.setItem("siteThemeHref", siteThemeHref); // Save the variable to session storage.
    document.getElementById('css-theme').href = siteThemeHref; // Change the CSS stylesheet used on the page.
    console.log("Site theme changed."); // Log a final success message.
}

// For each page, start by getting the site theme.
function getSiteTheme() {
    var siteThemeName = sessionStorage.getItem("siteThemeName"); // Retrieve the variable passed to session storage.
    var siteThemeHref = sessionStorage.getItem("siteThemeHref"); // Retrieve the variable passed to session storage.
    document.getElementById('css-theme').href = siteThemeHref; // Update the site theme to the defined theme.
    console.log("siteThemeName = " + siteThemeName); // Log a final success message.
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

function zoomOutMobile() {
    console.log("Zoom back out to initial scale.");
    
    const viewport = document.querySelector('meta[name="viewport"]');

    if (viewport) {
        viewport.content = 'initial-scale=1';
        viewport.content = 'width=device-width';
    }

    alert("Zoomed back out");
}