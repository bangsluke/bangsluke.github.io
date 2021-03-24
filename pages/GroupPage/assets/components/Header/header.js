// header.js JavaScript

// Common Header script
// This header.js file creates a header template which is then used by the majority of pages on the website.
// All HTML for the header is controlled from within this file, whilst the CSS is dealt with in an external stylesheet.

// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

//console.log("Header Component Added")

const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `

    <!-- Header CSS -->

    <style>
        /* Header styling moved to HeaderComponent.css. */
    </style>
  
    <!-- Header HTML -->

    <header class="subpage-header-area">
        
        <!-- Add a homepage link by adding a group icon image. Add it within a container. -->
        <div class="avatar-container">

            <!-- Add group icon image. -->
            <a href="/pages/GroupPage/a1e0475283abec53e6cffaacba6e8888aec7bc5c/GroupHomePage.html"><img class="avatar center fadein"
                    src="/pages/GroupPage/assets/images/Page Icon.jpg" alt="Group Page Logo"></a>

        </div>

        <!-- Add some heading text. Add it within a container. -->
        <div class="heading-container">
            <!-- Add some heading text. -->
            <h1 class="center subpage-header-text fadein" id="pageMainHeader"><slot name="pageMainHeader">Group Page</slot></h1>
        </div>

        <!-- Top Menu - not considered part of the "main-content-area" -->

        <!-- The main top nav bar options. -->
        <nav class="topMenu" id="top-menu">
            <a href="/pages/GroupPage/a1e0475283abec53e6cffaacba6e8888aec7bc5c/GroupHomePage.html"><i class="fa fa-home"></i>Home</a>
            <a href="/pages/GroupPage/SubPages/Users.html"><i class="fa fa-users"></i>Users</a>
            <a href="/pages/GroupPage/SubPages/Events.html"><i class="fa fa-calendar"></i>Events</a>
            <a href="/pages/GroupPage/SubPages/Titans.html"><i class="fa fa-trophy"></i>Titans</a>
            <a href="/pages/GroupPage/SubPages/Stats.html"><i class="fa fa-database"></i>Stats</a>
            <a href="/pages/GroupPage/SubPages/Gallery.html"><i class="fa fa-picture-o"></i>Gallery</a>
            <!-- <a href="/pages/GroupPage/SubPages/Ideas.html"><i class="fa fa-lightbulb-o"></i>Ideas</a> -->
        </nav>

        <!-- Side Menu - Top burger menu clickable icon to open the menu. Add it within a container. -->
        <div class="burgericon-container">

            <!-- Add burger icon with JavaScript functionality. -->
            <!-- <span class="burgericon center fadein" onclick="openNav()">☰</span> -->
            <img class="center burgericon fadein" id="burgericon" src="/pages/GroupPage/assets/images/Burger Menu Icon.png"
                alt="Burger Menu Icon" onclick="openNav()">

        </div>

    </header>

`;

// Create a class for the element
class Header extends HTMLElement {

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
        styleSheet.setAttribute('href', '/pages/GroupPage/assets/components/Header/HeaderComponent.css');
        shadowRoot.appendChild(styleSheet);
        
        // Attach the created elements to the shadow DOM
        shadowRoot.appendChild(headerTemplate.content);

    }
}

customElements.define('header-component', Header);