// header.js JavaScript

// Common Header script
// This header.js file creates a header template which is then used by the majority of pages on the website.
// All HTML and CSS for the header is controlled from within this file.

// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `

    <!-- Header CSS -->

    <style>
        
    
        /* Header styling. */
        /* From "/pages/GroupPage/assets/components/Header/CSS Files/header.css" */

            .subpage-header-area {
                /* background-color: lightcoral; */
                left: 0px;
                top: 0px;
                height: 60px;
                width: 100%;
                border-bottom: solid 2px var(--accent-color-white);
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding: 2px;
            }
            
            .subpage-header-area.homepage {
                /* background-color: lightcoral; */
                height: 80px;
                padding: 15px;
            }
            
            /* Avatar class for the main image. */
            
            .avatar-container {
                /* background-color: maroon; */
                height: 55px;
                width: 55px;
            }
            
            .avatar {
                background-color: rgba(255, 255, 255, 0.075);
                height: 55px;
                width: auto;
                border-radius: 100%;
                border: solid 1px var(--accent-color-1);
                cursor: pointer;
            }
            
            /* Main subpage header text class. */
            
            .heading-container {
                /* background-color: grey; */
                height: max-content;
                margin: auto;
            }
            
            .subpage-header-text {
                color: var(--accent-color-white);
                text-decoration: none;
                text-transform: uppercase;
                font-size: 20px;
                height: max-content;
                margin: auto;
            }
            
            /* Header area media queries. */
            
            /* Scale up for screens larger than mobile. */
            
            @media only screen and (min-width: 480px) and (max-width: 1223px) {
                /* Reduced windows on Desktops and Laptops - for when a user reduces the size of their window. */
                .avatar {
                    height: 70px;
                    margin: 0.3em 0.7em;
                }
                .subpage-header-text {
                    font-size: 30px;
                }
            }
            
            @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
                /* Covers iPads and other tablets. */
                .avatar {
                    height: 70px;
                    margin: 0.3em 0.7em;
                }
                .subpage-header-text {
                    font-size: 35px;
                }
            }
            
            @media only screen and (min-width: 1224px) {
                /* Desktops and Laptops - For most normal size screen desktops and laptops. */
                .avatar {
                    height: 70px;
                    margin: 0.3em 0.7em;
                }
                .subpage-header-text {
                    font-size: 40px;
                }
            }
            
            @media only screen and (min-width: 1824px) {
                /* Desktops and Laptops - For larger monitors and displays. */
                .avatar {
                    height: 70px;
                    margin: 0.3em 0.7em;
                }
                .subpage-header-text {
                    font-size: 40px;
                }
            }


        /* Top Menu styling. */
        /* From "/pages/GroupPage/assets/components/Header/CSS Files/TopMenu.css" */

            .topMenu {
                background: var(--accent-color-black);
                position: fixed;
                height: 80px;
                width: 80%;
                top: 0;
                left: 20%;
                z-index: 1;
                transition: 0.5s;
                padding-top: 20px;
                border-left: solid 1px var(--accent-color-1);
                display: flex;
                flex-direction: row;
                /* align-items: flex-end;
                align-content: flex-end;
                justify-items: flex-end;
                justify-content: flex-end; */
            }
            
            .topMenu a {
                padding: 8px 8px 8px 32px;
                text-decoration: none;
                color: var(--accent-color-white);
                transition: 0.3s;
                font-size: 18px;
                margin-bottom: 20px;
                text-transform: uppercase;
                font-weight: 900;
            }
            
            .topMenu a i {
                padding-right: 15px;
            }
            
            .topMenu a:hover {
                color: var(--accent-color-2);
                background: var(--accent-color-white);
            }
            
            /* Top menu media queries. */
            
            @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
                /* Smartphones - Covers most phones such as iPhone SE (my phone). */
                .topMenu {
                    display: none; /* Hide the top menu for smaller screens. */
                }
            }
            
            @media only screen and (min-width: 480px) and (max-width: 1223px) {
                /* Reduced windows on Desktops and Laptops - for when a user reduces the size of their window. */
                .topMenu {
                    display: none; /* Hide the top menu for smaller screens. */
                }
            }
            
            @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
                /* Covers iPads and other tablets. */
                .topMenu {
                    display: none; /* Hide the top menu for smaller screens. */
                }
            }
            
            @media only screen and (min-width: 1224px) {
                /* Desktops and Laptops - For most normal size screen desktops and laptops. */
                .topMenu {
                    display: inline; /* Show the top menu for larger screens. */
                }
            }
            
            @media only screen and (min-width: 1824px) {
                /* Desktops and Laptops - For larger monitors and displays. */
                .topMenu {
                    display: inline; /* Show the top menu for larger screens. */
                }
            }





        /* Side Menu CSS */
        /* From "/pages/GroupPage/assets/components/Header/CSS Files/SideMenu.css" */

            .burgericon-container {
                /* background: blue; */
                height: 55px;
                width: 55px;
                /* padding-right: 40px; */
                /* margin-right: 0px; */
            }

            .burgericon {
                color: var(--accent-color-white);
                top: 0px;
                left: 0px;
                display: block;
                font-size: 40px;
                cursor: pointer;
                padding: 0.5em;
                height: 55px;
                width: auto;
                margin: 0;
                padding: 0;
                /* width: 80px; */
                /* border-style: solid; */
                filter: invert(1) hue-rotate(180deg);
            }

            .burgericon:hover {
                color: var(--accent-color-2);
            }

            /* Side menu media queries. */

            /* Mobile size. */

            @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
                /* Smartphones - Covers most phones such as iPhone SE (my phone). */
            }

            /* Scale up for screens larger than mobile. */

            @media only screen and (min-width: 480px) and (max-width: 1223px) {
                /* Reduced windows on Desktops and Laptops - for when a user reduces the size of their window. */
                .sideMenu {
                    display: inline;
                    /* Show the side menu for smaller screens. */
                }
            }

            @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
                /* Covers iPads and other tablets. */
                .sideMenu {
                    display: inline;
                    /* Show the side menu for smaller screens. */
                }
            }

            @media only screen and (min-width: 1224px) {
                /* Desktops and Laptops - For most normal size screen desktops and laptops. */
                .sideMenu {
                    display: none;
                    /* Hide the side menu for larger screens. */
                }
                .burgericon {
                    display: none;
                    /* Hide the burger icon for larger screens. */
                }
            }

            @media only screen and (min-width: 1824px) {
                /* Desktops and Laptops - For larger monitors and displays. */
                .sideMenu {
                    display: none;
                    /* Hide the side menu for larger screens. */
                }
                .burgericon {
                    display: none;
                    /* Hide the burger icon for larger screens. */
                }
            }









    </style>
  
    <!-- Header HTML -->

    <header class="subpage-header-area">
        
        <!-- Add a homepage link by adding a group icon image. Add it within a container. -->
        <div class="avatar-container">

            <!-- Add group icon image. -->
            <a href="/pages/GroupPage/GroupPageHome.html"><img class="avatar center fadein"
                    src="/pages/GroupPage/assets/images/Page Icon.jpg" alt="Group Page Logo"></a>

        </div>

        <!-- Add some heading text. Add it within a container. -->
        <div class="heading-container">
            <!-- Add some heading text. -->
            <h1 class="center subpage-header-text fadein" id="pageMainHeader">Stats</h1>
        </div>

        <!-- Top Menu - not considered part of the "main-content-area" -->

        <nav class="topMenu" id="top-menu">
            <!-- The main top nav bar options. -->
            <a href="/pages/GroupPage/GroupPageHome.html"><i class="fa fa-home"></i>Home</a>
            <a href="/pages/GroupPage/SubPages/Users.html"><i class="fa fa-users"></i>Users</a>
            <a href="/pages/GroupPage/SubPages/Events.html"><i class="fa fa-calendar"></i>Events</a>
            <a href="/pages/GroupPage/SubPages/Titans.html"><i class="fa fa-trophy"></i>Titans</a>
            <a href="/pages/GroupPage/SubPages/Stats.html"><i class="fa fa-database"></i>Stats</a>
            <a href="/pages/GroupPage/SubPages/Gallery.html"><i class="fa fa-picture-o"></i>Gallery</a>
            <a href="/pages/GroupPage/SubPages/Ideas.html"><i class="fa fa-lightbulb-o"></i>Ideas</a>
        </nav>

        <!-- Side Menu - Top burger menu clickable icon to open the menu. Add it within a container. -->
        <div class="burgericon-container">

            <!-- Add burger icon with JavaScript functionality. -->
            <!-- <span class="burgericon center fadein" onclick="openNav()">☰</span> -->
            <img class="center burgericon fadein" src="/pages/GroupPage/assets/images/Burger Menu Icon.png"
                alt="Burger Menu Icon" onclick="openNav()">

        </div>

    </header>

`;

class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(headerTemplate.content);
  }
}

customElements.define('header-component', Header);