// sideMenu.js JavaScript

// Common SideMenu script
// This sideMenu.js file creates a Side Menu template which is then used by the majority of pages on the website.
// All HTML for the side menu is controlled from within this file, whilst the CSS is dealt with in an external stylesheet.

// THe functionality of the side menu is defined further down.

// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

//console.log("Side Menu Component Added")

const sideMenuTemplate = document.createElement('template');
sideMenuTemplate.innerHTML = `
  
    <!-- sideMenu CSS -->

    <style>
      /* SideMenu styling moved to SideMenuComponent.css. */
    </style>

    <!-- sideMenu HTML -->

    <!-- Side Menu - not considered part of the "main-content-area" -->

        <div class="sideMenu" id="side-menu">

            <!-- The x close button. -->
            <a class="closebtn" href="javascript:void(0)" onclick="closeNav()">×</a>

            <!-- The main side bar menu options. -->
            <div class="sideMenu-Main-Container">
                <div class="sideMenu-Container">
                    <div class="sideMenu-Icon-Container">
                        <a href="/pages/Group-Page/a1e0475283abec53e6cffaacba6e8888aec7bc5c/GroupHomePage.html"><img src="/images/Icons&Logos/HomeIcon.png" class="sideMenu-Icon" alt="Email Logo"></a>
                    </div>
                    <div class="sideMenu-Text-Container">
                        <a href="/pages/Group-Page/a1e0475283abec53e6cffaacba6e8888aec7bc5c/GroupHomePage.html">Home</a>
                    </div>
                </div>

                <div class="sideMenu-Container">
                    <div class="sideMenu-Icon-Container">
                        <a href="/pages/Group-Page/Sub-Pages/Users.html"><img src="/images/Icons&Logos/UsersIcon.png" class="sideMenu-Icon" alt="Users Icon"></a>
                    </div>
                    <div class="sideMenu-Text-Container">
                        <a href="/pages/Group-Page/Sub-Pages/Users.html">Users</a>
                    </div>
                </div>
                
                <div class="sideMenu-Container">
                    <div class="sideMenu-Icon-Container">
                        <a href="/pages/Group-Page/Sub-Pages/Events.html"><img src="/images/Icons&Logos/EventsIcon.png" class="sideMenu-Icon" alt="Events Icon"></a>
                    </div>
                    <div class="sideMenu-Text-Container">
                        <a href="/pages/Group-Page/Sub-Pages/Events.html">Events</a>
                    </div>
                </div>

                <div class="sideMenu-Container">
                    <div class="sideMenu-Icon-Container">
                        <a href="/pages/Group-Page/Sub-Pages/Titans.html"><img src="/images/Icons&Logos/TitansIcon.png" class="sideMenu-Icon" alt="Titans Icon"></a>
                    </div>
                    <div class="sideMenu-Text-Container">
                        <a href="/pages/Group-Page/Sub-Pages/Titans.html">Titans</a>
                    </div>
                </div>

                <div class="sideMenu-Container">
                    <div class="sideMenu-Icon-Container">
                        <a href="/pages/Group-Page/Sub-Pages/Stats.html"><img src="/images/Icons&Logos/StatsIcon.png" class="sideMenu-Icon" alt="Stats Icon"></a>
                    </div>
                    <div class="sideMenu-Text-Container">
                        <a href="/pages/Group-Page/Sub-Pages/Stats.html">Stats</a>
                    </div>
                </div>

                <div class="sideMenu-Container">
                    <div class="sideMenu-Icon-Container">
                        <a href="/pages/Group-Page/Sub-Pages/Gallery.html"><img src="/images/Icons&Logos/GalleryIcon.png" class="sideMenu-Icon" alt="Gallery Icon"></a>
                    </div>
                    <div class="sideMenu-Text-Container">
                        <a href="/pages/Group-Page/Sub-Pages/Gallery.html">Gallery</a>
                    </div>
                </div>

                <br>

                <div class="sideMenu-Container">
                    <div class="sideMenu-Text-Container">
                        <a href="/pages/Group-Page/index.html">Log Out</a>
                    </div>
                </div>

                <!-- <div class="sideMenu-Container">
                    <div class="sideMenu-Icon-Container">
                        <a href="/pages/Group-Page/Sub-Pages/Ideas.html"><img src="/images/Icons&Logos/StatsIcon.png" class="sideMenu-Icon" alt="Ideas Icon"></a>
                    </div>
                    <div class="sideMenu-Text-Container">
                        <a href="/pages/Group-Page/Sub-Pages/Ideas.html">Ideas</a>
                    </div>
                </div> -->
            </div>

            </div>

        </div>

`;

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
    styleSheet.setAttribute('href', '/pages/Group-Page/assets/components/SideMenu/SideMenuComponent.css');
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
  document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu').style.width = "250px"; // Increase the width of the side-menu to make it visible.

  // Check if the tag 'header-component' really exists or not. If it does, action on it. If not (as for the home page), do nothing.
  var myEle = document.getElementsByTagName('header-component')[0];
  if (myEle) {
    // Work down the DOM, finding the 'header-component' element and then look inside it for the id 'burgericon'.
    document.getElementsByTagName('header-component')[0].shadowRoot.getElementById('burgericon').style.display = "none"; // Hide the burger icon.
  } else {
    //console.log("not doing anything");
  }

  // document.getElementById("content-area").style.marginRight = "300px"; // Re-add if you want the content area to shrink on menu expansion.

}

function closeNav() {

  // Work down the DOM, finding the 'side-menu-component' element and then look inside it for the id 'side-menu'.
  document.getElementsByTagName('side-menu-component')[0].shadowRoot.getElementById('side-menu').style.width = "0"; // Reduce the width of the side-menu to make it invisible.

  // Check if the tag 'header-component' really exists or not. If it does, action on it. If not (as for the home page), do nothing.
  var myEle = document.getElementsByTagName('header-component')[0];
  if (myEle) {
    // Work down the DOM, finding the 'header-component' element and then look inside it for the id 'burgericon'.
    document.getElementsByTagName('header-component')[0].shadowRoot.getElementById('burgericon').style.display = "inline"; // Show the burger icon.
  } else {
    //console.log("not doing anything");
  }

  // document.getElementById("content-area").style.marginRight = "0"; // Re-add if you want the content area to shrink on menu expansion.

}