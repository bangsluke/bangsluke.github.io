# Development

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

## Framework Specific Development

### All Frameworks

#### HTML Tips

- Theme Colour
  - <a href="https://levelup.gitconnected.com/small-details-to-improve-your-websites-experience-88425116a06c" target="_blank">Set up your HTML head with some nice small tweaks</a>
    - Use theme-colour and add your theme `<meta name="theme-color" content="#f00" />`
    - The theme-color doesn’t have to be unique within the page. It can be personalized using the media attribute to change colors depending on the browser’s/computer’s configuration.

      ```html
      <!-- theme color is white unless in dark mode, then it's black -->
      <meta name="theme-color" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      ```

- Meta Tags
  - Add open graph meta tags - but note that the values should be page-specific and should be updated when navigating between pages.

    ```html
    <meta property="og:type" content="website">
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Description of the page.">
    <meta property="og:url" content="link.to.be.displayed.when.shared">
    <meta property="og:image" content="link.to.thumbnail.image">

    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="Page Title">
    <meta name="twitter:description" content="Description of the page.">
    <meta name="twitter:url" content="link.to.be.displayed.when.shared">
    <meta name="twitter:image" content="link.to.thumbnail.image">
    ```

- Add smooth scrolling (in CSS file);

  ```CSS
  html {
    scroll-behavior: smooth;
  }
  ```

- enterkeyhint property of the virtual keyboard
  - <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/enterkeyhint" target="_blank">enterkeyhint MDN</a>
  - `enterkeyhint` is a new attribute of the HTML `input` tag. This attribute affects the style and behavior of the enter keys of the virtual keyboard. It is mainly used on devices such as mobile terminals and tablets, so that users can clearly know what action the enter key will perform. Typical values for this attribute are "enter", "done", "go", "next", "previous", "search", and "send". 📱
  - 🔎 For example, if you use the attribute in a search box enterkeyhint="search", when the user uses the search box on a mobile device, the enter key will change to "Search" and the user will be able to submit the search by clicking this key. 🔍

    ```html
    <form action="/search">
    <input type="text" enterkeyhint="search" name="q">
    <input type="submit" value="Search">
    </form>
    ```

  - In this example, the input field’s enterkeyhint property is set to “search”, so that on the mobile device’s virtual keyboard, the label of the enter key changes to “search”. 🔑 For `enterkeyhint` the possible values and their meanings are as follows:
    - “enter”: The default behavior, which generally means a newline operation. ↩️
    - “done”: Indicates that the input operation is completed, such as after filling the last field of the form, the button on the virtual keyboard may change to “done”. ✅
    - “go”: means to navigate to a new page or view, or to start a process. 🚦
    - “next”: Indicates that the user will move to the next input field, suitable for forms with multiple input fields. ➡️
    - “previous”: Indicates that the user will move to the previous input field, suitable for forms with multiple input fields. ⬅️
    - “search”: Indicates to initiate a search operation, applicable to the search box. 🔍
    - “send”: Indicates that a message or other type of text will be sent, suitable for chat or mail applications. 📤

### React

![React Logo](https://i.imgur.com/LMShXOo.png)

- <a href="https://medium.com/@renanolovics/10-best-practices-in-front-end-development-react-5277a671e2df" target="_blank">10 Best Practices in Front End Development</a>
  - (1) Use of Absolute Paths Instead of Relative Paths
    - Change `import { Button } from '../../../../components/Button'` to `import { Button } from '@/components/Button'`
  - (4) Proper File Naming Conventions
- <a href="https://medium.com/@Choco23/6-ways-to-get-data-in-react-528dd11f267" target="_blank">6 ways of getting data into React</a>
- Use TanStack Router - <a href="https://tanstack.com/router/v1/docs/overview" target="_blank">https://tanstack.com/router/v1/docs/overview</a>
- <a href="https://blog.bitsrc.io/tips-for-optimizing-react-performance-890f2b3a36d7" target="_blank">Optimizing React Performance</a>
- <a href="https://medium.com/devlander/youre-using-context-providers-the-wrong-way-heres-how-to-fix-it-c91247b6e828" target="_blank">You're Using Context Providers the Wrong Way! Here's How to Fix It | by Landon Johnson | devlander | Nov, 2024 | Medium</a>

### Vite

![Vite Logo](https://i.imgur.com/smpppHt.png)

- Use TanStack Router - <a href="https://tanstack.com/router/v1/docs/overview" target="_blank">https://tanstack.com/router/v1/docs/overview</a>

### Next.js

![NextJS Logo](https://i.imgur.com/OGtWPsT.png)

- <a href="https://medium.com/@halilatilla/removing-console-logs-in-next-js-projects-c55713a9f635" target="_blank">Removing Console Logs in Next.js</a>
- <a href="https://levelup.gitconnected.com/mastering-error-and-loading-pages-in-next-js-13-best-practices-and-strategies-328e2622e526" target="_blank">Mastering Error and Loading pages</a>
- <a href="https://levelup.gitconnected.com/handling-images-in-next-js-14-281d67ccad36" target="_blank">Handling images in Next.js 14</a>
- <a href="https://stackoverflow.com/questions/74649324/next-image-hostname-is-not-configured-under-images-in-your-next-config-j" target="_blank">Adding unconfigured image hostname to next.config.js</a>
- <a href="https://dev.to/nevodavid/top-12-libraries-for-your-nextjs-project-1oob" target="_blank">Top 12 Libraries for Your Next.js Project</a>
- <a href="https://levelup.gitconnected.com/how-to-use-cors-in-next-js-14-b95a1c116797" target="_blank">How to use CORS in Next.js 14</a>
- <a href="https://blog.webdevsimplified.com/2024-01/next-js-app-router-cache/" target="_blank">A guide to caching in Next.js</a>
- <a href="https://codedrivendevelopment.com/posts/rarely-known-nextjs-features?utm_source=tldrwebdev" target="_blank">Advanced features of Next.js</a>
- <a href="https://javascript.plainenglish.io/things-you-dont-know-about-next-js-02ee54cb5b7f" target="_blank">Things you didn't know about Next.js</a>

## CSS

**Recommendations:** (from <a href="https://www.robinwieruch.de/react-libraries/" target="_blank">Robin Wieruch</a>)

### CSS-in-CSS

- CSS Modules - CSS Modules give you a way to encapsulate your CSS into component co-located modules. This way, styles don't leak accidentally into other components:

  ```CSS
  import styles from './style.module.css';

  const Headline = ({ title }) =>
    <h1 className={styles.headline}>
      {title}
    </h1>
  ```

### Utility-First-CSS

- Tailwind CSS - <a href="https://tailwindcss.com/" target="_blank">https://tailwindcss.com/</a>

```CSS
const Headline = ({ title }) =>
  <h1 className="text-blue-700">
    {title}
  </h1>
```

### CSS-in-JS

Personally I'd not recommended runtime CSS-in-JS anymore due to performance and other problems in server-side environments

- Styled Components
- StyleX by Facebook

```CSS
import styled from 'styled-components';

const BlueHeadline = styled.h1`
  color: blue;
`;

const Headline = ({ title }) =>
  <BlueHeadline>
    {title}
  </BlueHeadline>
```

## Issues and Debugging

### React Issues

![React Logo](https://i.imgur.com/LMShXOo.png)

- For issues in `React` (including `Vite` and `Next.JS`):
  - General debugging - <a href="https://profy.dev/article/debug-react-vscode" target="_blank">Debug React in VSCode</a>
  - Issue 1 - Cannot be used as a JSX component

    ```javascript
    'SidebarItem' cannot be used as a JSX component.   Its type '(props: SidebarLink) => Element' is not a valid JSX element type.     Type '(props: SidebarLink) => Element' is not assignable to type '(props: any, deprecatedLegacyContext?: any) => ReactNode'.       Type 'Element' is not assignable to type 'ReactNode'.         Property 'children' is missing in type 'Element' but required in type 'ReactPortal'.
    ```

    Solution <a href="https://stackoverflow.com/a/75093164" target="_blank">link</a>

### HTML, CSS and JavaScript Issues

- If you are trying to minify JavaScript files and you get the error `Minify Failed: 'preserve_line' is not a supported option`, then run the command "Minify" again in VSCode using `CTRL + Shift + M`.
  - If this still fails, open user settings in VSCode, change a value in the minify section and try to save the file again to force the minification.
  - Return the user settings options back once done.

## Security and Authentication

### Security

- Set up repository security scanning via Snyk
  - Add the project to Snyk <a href="https://app.snyk.io/org/bangsluke/projects" target="_blank">here</a>
  - Check and close off all vulnerabilities

### Authentication

- Next.js
  - NextAuth
    - <a href="https://levelup.gitconnected.com/the-ultimate-guide-to-next-js-authentication-with-nextauth-js-ff6dc0c126e4" target="_blank">Medium Link</a>
    - <a href="https://www.freecodecamp.org/news/secure-next-js-applications-with-role-based-authentication-using-nextauth/" target="_blank">Freecodecamp Tutorial</a>
  - Auth0
- For other authentication, consider using the following resources;
  - <a href="https://levelup.gitconnected.com/say-goodbye-to-authentication-headaches-with-propelauth-the-ultimate-solution-for-developers-b5cdad57d7d2" target="_blank">PropelAuth</a>
  - <a href="https://logto.io/?ref=console" target="_blank">Logto Auth</a>
  - <a href="https://firebase.google.com/" target="_blank">Firebase</a>

## Analytics

- Set up analytics for the project if it requires it. Ask AI to define the best solution, however possible options include:
  - <a href="https://umami.is/" target="_blank">Umami</a>
    - Benefits including being self-hosted, no tracking of users, no cookies, no data collection, no data sharing, no data selling
  - <a href="https://analytics.google.com/" target="_blank">Google Analytics</a>
    - Benefits including being free, easy to set up, and has a lot of features
  - <a href="https://www.goatcounter.com/?ref=console.dev" target="_blank">GoatCounter</a>

## Documentation

- Set up documentation for the project via a README.md file
- Write from scratch or use a template such as <a href="https://readme.so/" target="_blank">readme.so</a>
- Ensure that there is a Cursor rule for keeping the documentation up to date

## Recommended Libraries

### State Management

- <a href="https://github.com/pmndrs/zustand" target="_blank">Zustand</a> - State management library - It allows you to manage global application state which can be read and modified by any React component that is connected to its store(s).
- Redux
  - <a href="https://www.robinwieruch.de/react-redux-tutorial/" target="_blank">Redux tutorial</a>
  - <a href="https://redux-toolkit.js.org/" target="_blank">Redux Toolkit</a>

**Recommendations:** (from <a href="https://www.robinwieruch.de/react-libraries/" target="_blank">Robin Wieruch</a>)

  - useState/useReducer for co-located or shared state
  - opt-in useContext for enabling little global state
  - Zustand (or an alternative) for lots of global state

### Data Fetching

- TanStack Query (formerly known as React Query) - `yarn add @tanstack/react-query` - <a href="https://tanstack.com/query/latest" target="_blank">https://tanstack.com/query/latest</a>
  - Works for both REST and GraphQL APIs
  - <a href="https://javascript.plainenglish.io/mastering-react-query-a-comprehensive-guide-41c07fbcb5e?gi=2d617cfcb4b3" target="_blank">Mastering React Query - A Complete Guide</a>**
- Apollo Client - `yarn add @apollo/client` - <a href="https://www.apollographql.com/docs/react/" target="_blank">https://www.apollographql.com/docs/react/</a>
  - Works for GraphQL APIs
- RTK Query - If using Redux - <a href="https://redux-toolkit.js.org/rtk-query/overview" target="_blank">https://redux-toolkit.js.org/rtk-query/overview</a>
- tRPC - if you control the frontend and the backend (both TypeScript) - <a href="https://trpc.io/" target="_blank">https://trpc.io/</a>
  - It can be combined with TanStack Query for all the niceties regarding data fetching while still being able to call your backend from your frontend by using typed functions.

### Routing

- React Router - <a href="https://reactrouter.com/en/main" target="_blank">https://reactrouter.com/en/main</a>
  - <a href="https://www.robinwieruch.de/react-router/" target="_blank">React Router 6 Tutorial</a>
- TanStack Router - <a href="https://tanstack.com/router/v1/docs/overview" target="_blank">https://tanstack.com/router/v1/docs/overview</a>
  - <a href="https://techmade.medium.com/why-you-should-not-use-react-router-as-a-frontend-engineer-25d96497e143" target="_blank">Why you should not use React Router</a>

### Components

- Material UI - Component Library - `yarn add @material-ui/core` - <a href="https://material-ui.com/" target="_blank">https://material-ui.com/</a>
- shadcn/ui - <a href="https://ui.shadcn.com/" target="_blank">https://ui.shadcn.com/</a>
- <a href="https://saas-ui.dev/" target="_blank">saas-ui</a>
  - Getting started with SaaS UI is easy. First, you’ll have to install Chakra UI into your React project, then install SaaS UI, like this:
  - `npm i @chakra-ui/react @emotion/react@¹¹ @emotion/styled@¹¹ framer-motion@⁶\`
  - `npm i @saas-ui/react`
  - If yarn is more your jam, you can do this instead:
  - `yarn add @chakra-ui/react @emotion/react@¹¹ @emotion/styled@¹¹ framer-motion@⁶\`
  - `yarn add @saas-ui/react`

### Animations

In order of recommendation:

- Framer Motion - Animation library - `yarn add framer-motion` - <a href="https://www.framer.com/motion/" target="_blank">https://www.framer.com/motion/</a>
- React Spring - Animation library - `yarn add react-spring` - <a href="https://www.react-spring.io/" target="_blank">https://www.react-spring.io/</a>
- <a href="https://javascript.plainenglish.io/10-best-animation-librarys-you-can-use-in-your-next-project-a6f17bddf233" target="_blank">10 Best Animation Libraries</a>
- <a href="https://www.npmjs.com/package/react-flip-move" target="_blank">React Flip Move</a> - Animation library - `yarn add react-flip-move`
- AOS - Animation library - `yarn add aos` - <a href="https://michalsnik.github.io/aos/" target="_blank">https://michalsnik.github.io/aos/</a>
- Animista - Animation library (All CSS) - <a href="https://animista.net/" target="_blank">Animista</a>
- <a href="https://tobiasahlin.com/spinkit/" target="_blank">Spinners Designs</a> - just HTML and CSS

### Charts

In order of recommendation:

- Recharts - <a href="https://recharts.org/en-US/" target="_blank">https://recharts.org/en-US/</a>
- Apex Charts - Charts Library - `yarn add apexcharts` - <a href="https://apexcharts.com/" target="_blank">https://apexcharts.com/</a>

### Other Libraries

- React Libraries in 2024 - <a href="https://www.robinwieruch.de/react-libraries/" target="_blank">https://www.robinwieruch.de/react-libraries/</a>
- UUIDv4 - Key management - `yarn add uuidv4` - <a href="https://www.npmjs.com/package/uuidv4" target="_blank">https://www.npmjs.com/package/uuidv4</a>
  - `import { v4 as uuid } from "uuid";`
  - Then use `key: uuid(),`
- Web Analytics
  - Google Analytics
  - <a href="https://umami.is/" target="_blank">Umami</a>
  - <a href="https://www.goatcounter.com/?ref=console.dev" target="_blank">GoatCounter</a>
  - <a href="https://medium.com/@akashjha9041/top-6-tools-for-node-js-monitoring-4645784b8534" target="_blank">Top 6 tools for Node.js monitoring</a>
- Available <a href="https://todoist.com/showTask?id=6002402049&sync_id=6506084811" target="_blank">APIs</a>
- Application Notifications
  - <a href="https://ntfy.sh/?ref=console.dev" target="_blank">ntfy</a>
  - Novu <a href="https://github.com/novuhq/novu" target="_blank">In app notifications</a>
- Other library links
  - <a href="https://www.emailjs.com/" target="_blank">Email JS - send emails from your code without a backend server</a>
  - <a href="https://www.npmjs.com/package/react-content-loader" target="_blank">React Content Loader</a> - SVG component to create placeholder loading, like Facebook cards loading or also known as skeleton UI
  - <a href="https://www.npmjs.com/package/react-spinners" target="_blank">React Spinners</a> - Animation library - `yarn add react-spinners` - <a href="https://www.davidhu.io/react-spinners/" target="_blank">https://www.davidhu.io/react-spinners/</a>
  - <a href="https://www.npmjs.com/package/react-toastify" target="_blank">React Toastify</a> - Add quick success, failure, warning, info messages to the UI
  - <a href="https://www.npmjs.com/package/react-device-detect" target="_blank">React Device Detect</a> - Detect the device type (mobile, tablet, desktop) and OS (iOS, Android, Windows, Mac)
  - <a href="https://www.developerway.com/posts/how-to-handle-errors-in-react?utm_source=reactdigest&utm_medium&utm_campaign=1527" target="_blank">React Error Catching</a>
  - <a href="https://www.npmjs.com/package/@welldone-software/why-did-you-render" target="_blank">Why Did You Render</a>
- Review the full list of Coding resources on Todoist <a href="https://todoist.com/app/project/2305622709#section-86202880" target="_blank">here</a>
- Review the full list of React resources on Todoist <a href="https://todoist.com/showTask?id=5756174140&sync_id=6506084710" target="_blank">here</a>
  - <a href="https://todoist.com/showTask?id=6131657730&sync_id=6506084845" target="_blank">React Components</a>
  - <a href="https://todoist.com/showTask?id=6132071986&sync_id=6506084871" target="_blank">Hooks</a>
  - <a href="https://todoist.com/showTask?id=6132126520&sync_id=6506085362" target="_blank">General Design Inspiration</a>

> Note - for more, see "<a href="https://app.todoist.com/app/project/2305622709#section-86202880" target="_blank">Coding Resources</a>" Todoist project

## Other Tips and Easy Wins

- With the `accent-color` property you can specify the predominant color for checkboxes, radio buttons, ranges, and even progress bars.
- Use the correct HTML `<input type="">` attribute for the correct input type. There are <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input" target="_blank">22 HTML input types</a>.


## Deployment

![Netlify Logo](https://i.imgur.com/reePUUY.png)

- Set up deployment to the hosting service of choice
- Recommend Netlify for a simple deployment
- Set up additional Netlify integrations (e.g. Lighthouse, Checklinks, HTML Validate). Link is <a href="https://app.netlify.com/sites/dorkinians-mobile-stats/integrations" target="_blank">here</a> once deployed. (!NOTE - Not yet got these working on a repo)
  - Must haves
    - LightHouse - Automatically run a Lighthouse audit on your website after every build.
    - Checklinks - Checklinks helps you keep all your asset references correct and avoid embarrassing broken links to your internal pages, or even to external pages you link out to.
    - HTML Validate - Validate HTML generated by your build.
  - Possible haves
    - Image Optim - Optimize images as part of your Netlify build process.
    - Is Website Vulnerable - A Netlify plugin that uses Snyk to test for security vulnerabilities in a website's JavaScript libraries.
    - Minify HTML - A plugin to add HTML minification as a post-processing optimisation in Netlify.
    - Snyk Security - A Snyk Netlify plugin to find and monitor new security vulnerabilities in JavaScript libraries (also see below).