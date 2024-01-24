# Development

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

## Framework Specific Development

### All Frameworks

- [Set up your HTML head with some nice small tweaks](https://levelup.gitconnected.com/small-details-to-improve-your-websites-experience-88425116a06c)
  - Use theme-colour and add your theme `<meta name="theme-color" content="#f00" />`
  - The theme-color doesn’t have to be unique within the page. It can be personalized using the media attribute to change colors depending on the browser’s/computer’s configuration.

    ```html
    <!-- theme color is white unless in dark mode, then it's black -->
    <meta name="theme-color" content="#fff" />
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
    ```

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

  - Add a favicon

### React

![React Logo](https://i.imgur.com/LMShXOo.png)

- [10 Best Practices in Front End Development](https://medium.com/@renanolovics/10-best-practices-in-front-end-development-react-5277a671e2df)
  - (1) Use of Absolute Paths Instead of Relative Paths
    - Change `import { Button } from '../../../../components/Button'` to `import { Button } from '@/components/Button'`
  - (4) Proper File Naming Conventions
- [6 ways of getting data into React](https://medium.com/@Choco23/6-ways-to-get-data-in-react-528dd11f267)
- Use TanStack Router - [https://tanstack.com/router/v1/docs/overview](https://tanstack.com/router/v1/docs/overview)

### Vite

![Vite Logo](https://i.imgur.com/smpppHt.png)

- Use TanStack Router - [https://tanstack.com/router/v1/docs/overview](https://tanstack.com/router/v1/docs/overview)

### Next.js

![NextJS Logo](https://i.imgur.com/OGtWPsT.png)

- [Mastering Error and Loading pages](https://levelup.gitconnected.com/mastering-error-and-loading-pages-in-next-js-13-best-practices-and-strategies-328e2622e526)
- [Adding unconfigured image hostname to next.config.js](https://stackoverflow.com/questions/74649324/next-image-hostname-is-not-configured-under-images-in-your-next-config-j)
- [Top 12 Libraries for Your Next.js Project](https://dev.to/nevodavid/top-12-libraries-for-your-nextjs-project-1oob)

## Issues and Debugging

![React Logo](https://i.imgur.com/LMShXOo.png)

- For issues in `React` (including `Vite` and `Next.JS`):
  - General debugging - [Debug React in VSCode](https://profy.dev/article/debug-react-vscode)
  - Issue 1 - Cannot be used as a JSX component

    ```javascript
    'SidebarItem' cannot be used as a JSX component.   Its type '(props: SidebarLink) => Element' is not a valid JSX element type.     Type '(props: SidebarLink) => Element' is not assignable to type '(props: any, deprecatedLegacyContext?: any) => ReactNode'.       Type 'Element' is not assignable to type 'ReactNode'.         Property 'children' is missing in type 'Element' but required in type 'ReactPortal'.
    ```

    Solution [link](https://stackoverflow.com/a/75093164)

## Security and Authentication

### Security

- Set up repository security scanning via Snyk
  - Add the project to Snyk [here](https://app.snyk.io/org/bangsluke/projects)
  - Check and close off all vulnerabilities

### Authentication

- Next.js
  - NextAuth
    - [Medium Link](https://levelup.gitconnected.com/the-ultimate-guide-to-next-js-authentication-with-nextauth-js-ff6dc0c126e4)
    - [Freecodecamp Tutorial](https://www.freecodecamp.org/news/secure-next-js-applications-with-role-based-authentication-using-nextauth/)
  - Auth0
- For other authentication, consider using the following resources;
  - [PropelAuth](https://levelup.gitconnected.com/say-goodbye-to-authentication-headaches-with-propelauth-the-ultimate-solution-for-developers-b5cdad57d7d2)
  - [Logto Auth](https://logto.io/?ref=console)
  - [Firebase](https://firebase.google.com/)

## Documentation

- Set up documentation for the project via a README.md file
- Write from scratch or use a template such as [readme.so](https://readme.so/)

## Easy Adds

- Add smooth scrolling;
  `html {
    scroll-behavior: smooth;
  }`

## Recommended Libraries

### Components

- [saas-ui](https://saas-ui.dev/)
  - Getting started with SaaS UI is easy. First, you’ll have to install Chakra UI into your React project, then install SaaS UI, like this:
  - `npm i @chakra-ui/react @emotion/react@¹¹ @emotion/styled@¹¹ framer-motion@⁶\`
  - `npm i @saas-ui/react`
  - If yarn is more your jam, you can do this instead:
  - `yarn add @chakra-ui/react @emotion/react@¹¹ @emotion/styled@¹¹ framer-motion@⁶\`
  - `yarn add @saas-ui/react`
- Material UI - Component Library - `yarn add @material-ui/core` - [https://material-ui.com/](https://material-ui.com/)

### Animations

- [10 Best Animation Libraries](https://javascript.plainenglish.io/10-best-animation-librarys-you-can-use-in-your-next-project-a6f17bddf233)
- [React Flip Move](https://www.npmjs.com/package/react-flip-move) - Animation library - `yarn add react-flip-move`
- Framer Motion - Animation library - `yarn add framer-motion` - [https://www.framer.com/motion/](https://www.framer.com/motion/)
- AOS - Animation library - `yarn add aos` - [https://michalsnik.github.io/aos/](https://michalsnik.github.io/aos/)
- React Spring - Animation library - `yarn add react-spring` - [https://www.react-spring.io/](https://www.react-spring.io/)
- Animista - Animation library (All CSS) - [Animista](https://animista.net/)
- [Spinners Designs](https://tobiasahlin.com/spinkit/) - just HTML and CSS

### Other Libraries

- UUIDv4 - Key management - `yarn add uuidv4` - [https://www.npmjs.com/package/uuidv4](https://www.npmjs.com/package/uuidv4)
  - `import { v4 as uuid } from "uuid";`
  - Then use `key: uuid(),`
- React Query - `yarn add react-query` - [https://react-query.tanstack.com/](https://react-query.tanstack.com/)
  - [Mastering react Query - A Complete Guide](https://javascript.plainenglish.io/mastering-react-query-a-comprehensive-guide-41c07fbcb5e?gi=2d617cfcb4b3)
- TanStack Router - [https://tanstack.com/router/v1/docs/overview](https://tanstack.com/router/v1/docs/overview)
  - [Why you should not use React Router](https://techmade.medium.com/why-you-should-not-use-react-router-as-a-frontend-engineer-25d96497e143)
- Novu [In app notifications](https://github.com/novuhq/novu)
- Apex Charts - Charts Library - `yarn add apexcharts` - [https://apexcharts.com/](https://apexcharts.com/)
- [Email JS - send emails from your code without a backend server](https://www.emailjs.com/)
- Review the full list of Coding resources on Todoist [here](https://todoist.com/app/project/2305622709#section-86202880)
- Review the full list of React resources on Todoist [here](https://todoist.com/showTask?id=5756174140&sync_id=6506084710)
  - [React Components](https://todoist.com/showTask?id=6131657730&sync_id=6506084845)
  - [Hooks](https://todoist.com/showTask?id=6132071986&sync_id=6506084871)
  - [React Content Loader](https://www.npmjs.com/package/react-content-loader) - SVG component to create placeholder loading, like Facebook cards loading or also known as skeleton UI
  - [React Spinners](https://www.npmjs.com/package/react-spinners) - Animation library - `yarn add react-spinners` - [https://www.davidhu.io/react-spinners/](https://www.davidhu.io/react-spinners/)
  - [React Toastify](https://www.npmjs.com/package/react-toastify) - Add quick success, failure, warning, info messages to the UI
  - [React Device Detect](https://www.npmjs.com/package/react-device-detect) - Detect the device type (mobile, tablet, desktop) and OS (iOS, Android, Windows, Mac)
  - [React Error Catching](https://www.developerway.com/posts/how-to-handle-errors-in-react?utm_source=reactdigest&utm_medium&utm_campaign=1527)
  - [Why Did You Render](https://www.npmjs.com/package/@welldone-software/why-did-you-render)
  - [General Design Inspiration](https://todoist.com/showTask?id=6132126520&sync_id=6506085362)
  - [Zustand](https://github.com/pmndrs/zustand) - State management library
  - [Framer Motion](https://www.framer.com/motion/) - Animation library
- Web Analytics
  - Google Analytics
  - [Umami](https://umami.is/)
  - [GoatCounter](https://www.goatcounter.com/?ref=console.dev)
  - [Top 6 tools for Node.js monitoring](https://medium.com/@akashjha9041/top-6-tools-for-node-js-monitoring-4645784b8534)
- Available [APIs](https://todoist.com/showTask?id=6002402049&sync_id=6506084811)
- Application Notifications
  - [ntfy](https://ntfy.sh/?ref=console.dev)

> Note - for more, see "[Coding Resources](https://app.todoist.com/app/project/2305622709#section-86202880)" Todoist project

## Other Tips

- With the `accent-color` property you can specify the predominant color for checkboxes, radio buttons, ranges, and even progress bars.
- Use the correct HTML `<input type="">` attribute for the correct input type. There are [22 HTML input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
