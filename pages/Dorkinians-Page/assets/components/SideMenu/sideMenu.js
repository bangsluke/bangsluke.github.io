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
                <img class="logo fadein center" id="side-menu-dorkinians-logo"
                src="/pages/Dorkinians-Page/assets/images/Dorkinians Logo - Yellow Logo - No Background.png"
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

                        <!-- Add the text size change action item. -->
                        <div class="side-menu-icon-container">
                            <img src="/pages/Dorkinians-Page/assets/images/Icons/Text Size Icon.png" class="side-menu-icon" id="side-menu-text-size-icon" alt="Text Size Icon">
                        </div>
                        <div class="side-menu-text-container">
                            <h4>Change Text Size</h4>
                        </div>

                        <!-- Add the change theme item. -->
                        <div class="side-menu-icon-container">
                            <img src="/pages/Dorkinians-Page/assets/images/Icons/Theme Change Icon.png" class="side-menu-icon" id="side-menu-theme-change-icon" alt="Theme Change Icon" onclick="changeSiteTheme()">
                        </div>
                        <div class="side-menu-text-container">
                            <h4 id="side-menu-actions-change-theme-text" onclick="changeSiteTheme()">Change to Dark Theme</h4>
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
                                <img src="/pages/Dorkinians-Page/assets/images/Dorkinians Logo - Yellow Logo - No Background - Reduced.png" class="side-menu-icon" alt="Dorkinians Logo Icon">
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
                                <img src="/pages/Dorkinians-Page/assets/images/Icons/The FA Logo Icon.png" class="side-menu-icon" alt="The FA Logo Icon">
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
        styleSheet.setAttribute('href', '/pages/Dorkinians-Page/assets/components/SideMenu/SideMenuComponent.css');
        shadowRoot.appendChild(styleSheet);

        // Attach the created elements to the shadow DOM
        shadowRoot.appendChild(sideMenuTemplate.content);
    }
}

customElements.define('side-menu-component', sideMenu);

// jSideBar.js JavaScript Functions

// Side bar scripts
// https://www.codingflicks.com/2020/12/toggle-sidebar-navigation-html-css-javascript.html

function openNav() {

    // Work down the DOM, finding the 'side-menu-component' element and then look inside it for the id 'side-menu'.
    document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu').style.width = "15.6rem"; // Increase the width of the side-menu to make it visible.
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

// Change the site theme style based on user selection.
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

        // Change the text of the element holding the change site theme text.
        themeTextElement.innerHTML = "Change to Light Theme";

        // Update the weather widget. See weatherWidget.js for details.
        createWeatherWidgetHTML('#FF3CAC','#FFFFFF85','#222129');
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

        // Change the text of the element holding the change site theme text.
        themeTextElement.innerHTML = "Change to Dark Theme";

        // Update the weather widget. See weatherWidget.js for details.
        createWeatherWidgetHTML('#F9ED32','#FFFFFF','#1C8841');
        buildWeatherWidget();

    }

    closeNav(); // Close the side navigation that the function was called from.
    //console.log("Site theme changed."); // Log a final success message.
}