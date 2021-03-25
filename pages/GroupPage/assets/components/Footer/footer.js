// footer.js JavaScript

// Common Footer script
// This footer.js file creates a footer template which is then used by the majority of pages on the website.
// All HTML for the footer is controlled from within this file, whilst the CSS is dealt with in an external stylesheet.

// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

//console.log("Footer Component Added")

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `
  
    <!-- Footer CSS -->

    <style>
      /* Footer styling moved to FooterComponent.css. */
    </style>

    <!-- Footer HTML -->

    <!-- Link into font-awesome logos and icons. -->
	  <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

    <footer class="footer fadein">

      <!-- <p>&copy; Untitled. All rights reserved. Design: <a href="http://templated.co">TEMPLATED</a>. Demo Images: <a href="http://unsplash.com">Unsplash</a>.</p> -->
      <a href="https://github.com/bangsluke/bangsluke">&copy; 2021 bangsluke designs.</a>
      <a href="#">&nbsp</a>
      <a href="mailto:bangsluke@gmail.com" class="icon fa fa-envelope">&nbsp</a>
      <a href="https://github.com/my-github-profile"><i class="fab fa-github"></i></a>
      <a href="https://twitter.com/my-twitter-profile"><i class="fab fa-twitter"></i></a>
      <a href="https://www.linkedin.com/in/my-linkedin-profile"><i class="fab fa-linkedin"></i></a>

	  </footer>

`;

// Create a class for the element
class Footer extends HTMLElement {

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
        styleSheet.setAttribute('href', '/pages/GroupPage/assets/components/Footer/FooterComponent.css');
        shadowRoot.appendChild(styleSheet);

        // Attach the created elements to the shadow DOM
        shadowRoot.appendChild(footerTemplate.content);
  }
}

customElements.define('footer-component', Footer);