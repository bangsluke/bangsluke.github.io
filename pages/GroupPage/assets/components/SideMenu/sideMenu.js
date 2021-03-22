// sideMenu.js JavaScript

// Common SideMenu script
// This sideMenu.js file creates a Side Menu template which is then used by the majority of pages on the website.
// All HTML for the side menu is controlled from within this file, whilst the CSS is dealt with in an external stylesheet.

// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

const sideMenuTemplate = document.createElement('template');
sideMenu.innerHTML = `
  
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
            <div class="main-menu">
                <h2>Menu</h2>
                <a href="/pages/GroupPage/GroupPageHome.html"><i class="fa fa-home"></i>Home</a>
                <a href="/pages/GroupPage/SubPages/Users.html"><i class="fa fa-users"></i>Users</a>
                <a href="/pages/GroupPage/SubPages/Events.html"><i class="fa fa-calendar"></i>Events</a>
                <a href="/pages/GroupPage/SubPages/Titans.html"><i class="fa fa-trophy"></i>Titans</a>
                <a href="/pages/GroupPage/SubPages/Stats.html"><i class="fa fa-database"></i>Stats</a>
                <a href="/pages/GroupPage/SubPages/Gallery.html"><i class="fa fa-picture-o"></i>Gallery</a>
                <a href="/pages/GroupPage/SubPages/Ideas.html"><i class="fa fa-lightbulb-o"></i>Ideas</a>
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
        const shadowRoot = this.attachShadow({ mode: 'closed' });

        // Apply external styles to the shadow DOM
        const styleSheet = document.createElement('link');
        styleSheet.setAttribute('rel', 'stylesheet');
        styleSheet.setAttribute('href', '/pages/GroupPage/assets/components/SideMenu/SideMenuComponent.css');
        shadowRoot.appendChild(styleSheet);

        // Attach the created elements to the shadow DOM
        shadowRoot.appendChild(sideMenuTemplate.content);
  }
}

customElements.define('sideMenu-component', sideMenu);