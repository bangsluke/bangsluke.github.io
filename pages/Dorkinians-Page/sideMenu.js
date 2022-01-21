// sideMenu.js JavaScript

// Common SideMenu script
// This sideMenu.js file creates a Side Menu template which is then used by the majority of pages on the website.
// All HTML for the side menu is controlled from within this file, whilst the CSS is dealt with in an external stylesheet.

// The functionality of the side menu is defined further down.

// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

//console.log("Side Menu Component Added")

const sideMenuTemplate = document.createElement('template');
const newLocal = `
  
    <!-- sideMenu CSS -->

    <style>
      /* SideMenu styling moved to SideMenuComponent.css. */
    </style>

    <!-- sideMenu HTML -->

    <!-- Side Menu - not considered part of the "main-content-area" -->

        <div id="side-menu">

            <!-- The top side bar fixed container. -->
            <div id="side-menu-top-container">

                <!-- The x close button. -->
                <a id="side-menu-close-button" href="javascript:void(0)" onclick="closeNav()">×</a>

                <!-- Add the Dorkinians logo. -->
                <img class="logo fadein center" id="side-menu-dorkinians-logo" src="/pages/Dorkinians-Page/images/Dorkinians Logo - Side Menu.webp"
                alt="Dorkinians Logo" width="80" height="80" onclick="init()">

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
                            <img src="/pages/Dorkinians-Page/images/Text Size Icon.webp" class="side-menu-icon" id="side-menu-text-size-icon" alt="Text Size Icon" onclick="changeTextSize(-1)">
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
                            <h4 id="side-menu-actions-change-height-text" onclick="resetActionVariables()">Reset Page</h4>
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

                    <!-- Add a stat limitations clickable option. -->
                    <div class="side-menu-additional-section-item-container">
                        <a href="javascript:void(0)" onclick="openPopUpBox('Stat Limitations', displaySiteDetailsArrayOfObjects[0]['Stat Limitations'])">Stat Limitations</a>
                    </div>

                    <!-- Add a stat details clickable option. -->
                    <div class="side-menu-additional-section-item-container">
                        <a href="javascript:void(0)" onclick="openPopUpBox('Stat Details', displaySiteDetailsArrayOfObjects[0]['Stat Details'])">Stat Details</a>
                    </div>

                    <!-- Add a version release details clickable option. -->
                    <div class="side-menu-additional-section-item-container">
                        <a href="javascript:void(0)" onclick="openPopUpBox('Version Release Details', displaySiteDetailsArrayOfObjects[0]['Version Release Details'])">Version Release Details</a>
                    </div>

                </section>

            </div>

        </div>

`;
sideMenuTemplate.innerHTML = newLocal;

// Create a class for the element
class sideMenu extends HTMLElement {

    // Always call super first in constructor
    constructor() {
        super();
    }

    connectedCallback() {

        // Create a shadow root
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Apply external styles to the shadow DOM
        const styleSheet = document.createElement('link');
        styleSheet.setAttribute('rel', 'stylesheet');
        styleSheet.setAttribute('href', '/pages/Dorkinians-Page/SideMenuComponent.min.css');
        shadowRoot.appendChild(styleSheet);

        // Attach the created elements to the shadow DOM
        shadowRoot.appendChild(sideMenuTemplate.content);
    }
}

customElements.define('side-menu-component', sideMenu);

// jSideBar.js JavaScript Functions

// Side bar scripts
// https://www.codingflicks.com/2020/12/toggle-sidebar-navigation-html-css-javascript.html

// Publically define a number of global constants and variables.

var sideMenuWidth = '80%'; // Originally 15.6rem.
var fontSizeMin = 10; // Set a minimum font size in pixels.
var fontSizeMax = 22; // Set a maximum font size in pixels.
var pageHeightMin = 0; // Set a minimum page height in pixels.
var pageHeightMax = 100; // Set a maximum page height in pixels.

// Open the navigation side menu.
function openNav() {
    // Work down the DOM, finding the 'side-menu-component' element and then look inside it for the id 'side-menu'.
    document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu').style.width = sideMenuWidth; // Increase the width of the side-menu to make it visible.
    document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu').style.right = "0rem"; // Reset the side menu side to the edge of the screen.

    // Show the background overlay.
    document.getElementById('background-overlay-side-menu').style.display = "inline"; // Show the background overlay behind the side menu.
    document.getElementById('background-overlay-side-menu').style.zIndex = 19; // Set the z-index of the background overlay to be right behind the side menu.

    // Check if the tag 'header-component' really exists or not. If it does, action on it. If not (as for the home page), do nothing.
    var myEle = document.getElementsByTagName('header-component')[0];
    if (myEle) {
        // Work down the DOM, finding the 'header-component' element and then look inside it for the id 'options-button'.
        document.getElementsByTagName('header-component')[0].shadowRoot.getElementById('options-button').style.display = "none"; // Hide the options icon.
    } else {
        //console.log("not doing anything");
    }
}

// Close the navigation side menu.
function closeNav() {
    // Work down the DOM, finding the 'side-menu-component' element and then look inside it for the id 'side-menu'.
    document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu').style.width = "0"; // Reduce the width of the side-menu to make it invisible.
    document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu').style.right = "-0.1rem"; // Slightly position the side-menu off to the side to avoid seing the border.

    // Hide the background overlay.
    document.getElementById('background-overlay-side-menu').style.display = "none"; // Hide the background overlay behind the side menu.

    // Check if the tag 'header-component' really exists or not. If it does, action on it. If not (as for the home page), do nothing.
    var myEle = document.getElementsByTagName('header-component')[0];
    if (myEle) {
        // Work down the DOM, finding the 'header-component' element and then look inside it for the id 'options-button'.
        document.getElementsByTagName('header-component')[0].shadowRoot.getElementById('options-button').style.display = "inline"; // Show the options icon.
    } else {
        //console.log("not doing anything");
    }
}

// Change the site theme style.
function changeSiteTheme() {
    console.log("changeSiteTheme clicked."); // Log that the function has been called.

    // Select the element holding the change site theme text.
    let themeTextElement = document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu-actions-change-theme-text');

    // Check which site theme has been selected and then define the required colours for the CSS styling sheet.
    if (themeTextElement.innerHTML == "Change to Dark Theme") {
        // Change site theme to dark mode.

        // Modify the CSS variable of the DorkiniansMain.css stylesheet. https://stackoverflow.com/a/37802204/14290169.
        document.documentElement.style.setProperty('--main-background-colour', '#222129');
        document.documentElement.style.setProperty('--secondary-background-colour', '#252432');
        document.documentElement.style.setProperty('--third-background-colour', '#282735');
        document.documentElement.style.setProperty('--main-accent-colour', '#FF3CAC');
        document.documentElement.style.setProperty('--main-accent-colour-rgb', '255, 60, 172');
        document.documentElement.style.setProperty('--secondary-accent-colour', '#FFFFFF85');
        document.documentElement.style.setProperty('--tooltip-background-colour', '#222129');

        // Change the text of the element holding the change site theme text.
        themeTextElement.innerHTML = "Change to Light Theme";

        // Update the weather widget. See weatherWidget.js for details.
        createWeatherWidgetHTML('#FF3CAC', '#FFFFFF85', '#222129');
        buildWeatherWidget();

    } else {
        // Change site theme to light mode.

        // Modify the CSS variable of the DorkiniansMain.css stylesheet. https://stackoverflow.com/a/37802204/14290169.
        document.documentElement.style.setProperty('--main-background-colour', '#1C8841');
        document.documentElement.style.setProperty('--secondary-background-colour', '#31a057');
        document.documentElement.style.setProperty('--third-background-colour', '#236f38');
        document.documentElement.style.setProperty('--main-accent-colour', '#F9ED32');
        document.documentElement.style.setProperty('--main-accent-colour-rgb', '249, 237, 50');
        document.documentElement.style.setProperty('--secondary-accent-colour', '#FFFFFF');
        document.documentElement.style.setProperty('--tooltip-background-colour', '#236f38');

        // Change the text of the element holding the change site theme text.
        themeTextElement.innerHTML = "Change to Dark Theme";

        // Update the weather widget. See weatherWidget.js for details.
        createWeatherWidgetHTML('#F9ED32', '#FFFFFF', '#1C8841');
        buildWeatherWidget();

    }

    closeNav(); // Close the side navigation that the function was called from.
    //console.log("Site theme changed."); // Log a final success message.
}

// Change the site text size.
function changeTextSize(delta) {
    console.log("changeTextSize clicked. Font size changed by " + delta + "."); // Log that the function has been called.

    let fontSize = getComputedStyle(document.documentElement).getPropertyValue('--main-font-size'); // Get the value of the CSS variable as a string. https://davidwalsh.name/css-variables-javascript.
    fontSize = parseInt(fontSize.replace("px", "")); // Remove the pixels from the returned string.

    console.log('fontSize before is = ' + fontSize); // Log the font size value before the function has been run.

    if (delta == 1) {
        // Increment the font size to be larger.
        if (fontSize < fontSizeMax) { // Only increment the font size if it is less than the max. 
            fontSize += delta;
        }
    } else {
        // Decrement the font size to be smaller.
        if (fontSize > fontSizeMin) { // Only dedcrement the font size if it is larger than the min. 
            fontSize += delta;
        }
    }
    console.log('fontSize after is = ' + fontSize); // Log the font size value after the function has been run.

    // Append the pixels to the new value.
    fontSize = fontSize + "px";

    // Modify the CSS variable of the DorkiniansMain.css stylesheet. https://stackoverflow.com/a/37802204/14290169.
    document.documentElement.style.setProperty('--main-font-size', fontSize);
    document.documentElement.style.setProperty('font-size', fontSize);
}
function increaseFontSize() {
    changeTextSize(1);
}
function decreaseFontSize() {
    changeTextSize(-1);
}

// Change the height of the snap tabs bar to fit the screen.
// function changePageHeight(delta) {
//     console.log("changePageHeight clicked. Page height changed by " + delta + "px."); // Log that the function has been called.

//     let pageHeight = getComputedStyle(document.documentElement).getPropertyValue('--ChromeSafari-bottom-bar-height'); // Get the value of the CSS variable as a string. https://davidwalsh.name/css-variables-javascript.
//     pageHeight = parseInt(pageHeight.replace("px", "")); // Remove the pixels from the returned string.

//     console.log('pageHeight before is = ' + pageHeight); // Log the page height value before the function has been run.

//     if (delta == 1) {
//         // Increment the page height  to be larger.
//         if (pageHeight < pageHeightMax) { // Only increment the page height if it is less than the max. 
//             pageHeight += delta;
//         }
//     } else {
//         // Decrement the page height to be smaller.
//         if (pageHeight > pageHeightMin) { // Only dedcrement the page height if it is larger than the min. 
//             pageHeight += delta;
//         }
//     }
//     console.log('pageHeight after is = ' + pageHeight); // Log the page height value after the function has been run.

//     // Append the pixels to the new value.
//     pageHeight = pageHeight + "px";

//     // Modify the CSS variable of the DorkiniansMain.css stylesheet. https://stackoverflow.com/a/37802204/14290169.
//     document.documentElement.style.setProperty('--ChromeSafari-bottom-bar-height', pageHeight);
// }
// function increasePageHeight() {
//     changePageHeight(-5);
// }
// function decreasePageHeight() {
//     changePageHeight(5);
// }

// Reset all prveiously modified variables.
function resetActionVariables() {
    // Modify the CSS variable of the DorkiniansMain.css stylesheet. https://stackoverflow.com/a/37802204/14290169.
    document.documentElement.style.setProperty('--main-font-size', '16px');
    document.documentElement.style.setProperty('font-size', '16px');
    document.documentElement.style.setProperty('--ChromeSafari-bottom-bar-height', '50px');
}