// footer.js JavaScript

// Common Footer script
// This footer.js file creates a footer template which is then used by the majority of pages on the website.
// All HTML and CSS for the footer is controlled from within this file.

// https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = `
  
    <!-- Footer CSS -->

    <style>
    
        /* Footer styling. */
        /* From "/pages/GroupPage/assets/components/Footer/CSS Files/footer.css" */

        .footer {
          /* background-color: green; */
          /* background: var(--accent-color-black); */
          background-color: rgba(var(--accent-color-black-rgb), 0.5);
          grid-area: footer;
          width: 100%;
          top: 90%;
          color: var(--accent-color-white);
          justify-self: center;
          align-content: center;
          text-align: center;
          padding: auto;
        }
        
        /* Create a sticky footer - https://stackoverflow.com/questions/42294/how-do-you-get-the-footer-to-stay-at-the-bottom-of-a-web-page */
        
        .footer, .push {
          height: 25px;
          /* .push must be the same height as .footer */
        }
        
        .footer a {
          color: var(--accent-color-white);
          text-decoration: none;
          font-size: 20px;
        }
        
        .footer a:hover {
          color: var(--accent-color-1);
          text-decoration: var(--accent-color-white);
        }
        
        /* Footer media queries. */
        
        @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
          /* Smartphones - Covers most phones such as iPhone SE (my phone). */
          .footer a {
            font-size: 10px;
          }
        }

    </style>

    <!-- Footer HTML -->

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

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(footerTemplate.content);
  }
}

customElements.define('footer-component', Footer);