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

        <div class="side-menu" id="side-menu">

            <!-- The x close button. -->
            <a id="closebtn" href="javascript:void(0)" onclick="closeNav()">×</a>

            <!-- The main side bar menu options. -->
            <div class="side-menu-main-container">

                <!-- Add the Dorkinians logo. -->
                <img class="logo fadein center" id="dorkinians-side-menu-logo"
                src="/pages/Dorkinians-Page/assets/images/Dorkinians Logo - Yellow Logo - No Background.png"
                alt="Dorkinians Logo" width="100" height="100" onclick="init()">

                <!-- The actions section of the side bar menu options. -->
                <section id="side-menu-actions-section" class="side-menu-section">

                    <h3 class="side-menu-section-header">Actions</h3>

                    <!-- Add the text size change action item. -->
                    <div class="side-menu-item-container">
                        <div class="side-menu-item-container-icon">
                            <img src="/pages/Dorkinians-Page/assets/images/Icons/Text Size Icon.png" class="side-menu-icon" id="side-menu-text-size-icon" alt="Text Size Icon">
                        </div>
                        <div class="side-menu-item-container-text">
                            <h4>Change Text Size</h4>
                        </div>
                    </div>

                    <!-- Add the change theme item. -->
                    <div class="side-menu-item-container">
                        <div class="side-menu-item-container-icon">
                            <img src="/pages/Dorkinians-Page/assets/images/Icons/Theme Change Icon.png" class="side-menu-icon" id="side-menu-theme-change-icon" alt="Theme Change Icon">
                        </div>
                        <div class="side-menu-item-container-text">
                            <h4>Change to Dark Theme</h4>
                        </div>
                    </div>

                </section>

                <!-- The quick links section of the side bar menu. -->
                <section id="side-menu-quick-links-section" class="side-menu-section">

                    <h3 class="side-menu-section-header">Quick Links</h3>

                    <!-- Add a link to the Dorkinians homepage. -->
                    <div class="side-menu-item-container">
                        <!-- Add a hyperlink around the image and text. -->
                        <a href="https://www.dorkiniansfc.co.uk/">
                            <div class="side-menu-item-container-icon">
                                <img src="/pages/Dorkinians-Page/assets/images/Dorkinians Logo - Yellow Logo - No Background - Reduced.png" class="side-menu-icon" alt="Dorkinians Logo Icon">
                            </div>
                            <div class="side-menu-item-container-text">
                                <h4>dorkiniansfc.co.uk</h4>
                            </div>
                        </a>
                    </div>

                    <!-- Add a link to the FA homepage. -->
                    <div class="side-menu-item-container">
                        <!-- Add a hyperlink around the image and text. -->
                        <a href="https://fulltime.thefa.com/index.html?league=9031785&selectedSeason=697858796&selectedDivision=921408008&selectedCompetition=0&selectedFixtureGroupKey=1_513480600">
                            <div class="side-menu-item-container-icon">
                                <img src="/pages/Dorkinians-Page/assets/images/Icons/The FA Logo Icon.png" class="side-menu-icon" alt="The FA Logo Icon">
                            </div>
                            <div class="side-menu-item-container-text">
                                <h4>FULL-TIME.TheFA.com</h4>
                            </div>
                        </a>
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

    // Check if the tag 'header-component' really exists or not. If it does, action on it. If not (as for the home page), do nothing.
    var myEle = document.getElementsByTagName('header-component')[0];
    if (myEle) {
        // Work down the DOM, finding the 'header-component' element and then look inside it for the id 'optionsbutton'.
        document.getElementsByTagName('header-component')[0].shadowRoot.getElementById('optionsbutton').style.display = "none"; // Hide the options icon.
    } else {
        //console.log("not doing anything");
    }

}

function closeNav() {

    // Work down the DOM, finding the 'side-menu-component' element and then look inside it for the id 'side-menu'.
    document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu').style.width = "0"; // Reduce the width of the side-menu to make it invisible.
    document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu').style.right = "-0.1rem"; // Slightly position the side-menu off to the side to avoid seing the border.

    // Check if the tag 'header-component' really exists or not. If it does, action on it. If not (as for the home page), do nothing.
    var myEle = document.getElementsByTagName('header-component')[0];
    if (myEle) {
        // Work down the DOM, finding the 'header-component' element and then look inside it for the id 'optionsbutton'.
        document.getElementsByTagName('header-component')[0].shadowRoot.getElementById('optionsbutton').style.display = "inline"; // Show the options icon.
    } else {
        //console.log("not doing anything");
    }

}