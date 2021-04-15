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
    <script src="https://kit.fontawesome.com/e0e1bfc304.js" crossorigin="anonymous"></script>

    <footer class="fadein">

      <ul>

        <li><p>&copy; 2021 bangsluke designs.</p></li>
        <li><a href="mailto:bangsluke@gmail.com"><i class="icon fas fa-envelope"></i></a></li>
        <li><a href="https://github.com/bangsluke/bangsluke"><i class="icon fab fa-github"></i></a></li>
        <li><a href="https://twitter.com/bangsluke"><i class="fab fa-twitter"></i></a></li>
        <li><a href="https://www.linkedin.com/in/bangsluke/"><i class="fab fa-linkedin"></i></a></li>

      </ul>

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
        styleSheet.setAttribute('href', '/pages/Group-Page/assets/components/Footer/FooterComponent.css');
        shadowRoot.appendChild(styleSheet);

        // Attach the created elements to the shadow DOM
        shadowRoot.appendChild(footerTemplate.content);
  }
}

customElements.define('footer-component', Footer);