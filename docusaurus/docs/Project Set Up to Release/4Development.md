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
- Add smooth scrolling (in CSS file);

  ```CSS
  html {
    scroll-behavior: smooth;
  }
  ```

### React

![React Logo](https://i.imgur.com/LMShXOo.png)

- [10 Best Practices in Front End Development](https://medium.com/@renanolovics/10-best-practices-in-front-end-development-react-5277a671e2df)
  - (1) Use of Absolute Paths Instead of Relative Paths
    - Change `import { Button } from '../../../../components/Button'` to `import { Button } from '@/components/Button'`
  - (4) Proper File Naming Conventions
- [6 ways of getting data into React](https://medium.com/@Choco23/6-ways-to-get-data-in-react-528dd11f267)
- Use TanStack Router - [https://tanstack.com/router/v1/docs/overview](https://tanstack.com/router/v1/docs/overview)
- [Optimizing React Performance](https://blog.bitsrc.io/tips-for-optimizing-react-performance-890f2b3a36d7)

### Vite

![Vite Logo](https://i.imgur.com/smpppHt.png)

- Use TanStack Router - [https://tanstack.com/router/v1/docs/overview](https://tanstack.com/router/v1/docs/overview)

### Next.js

![NextJS Logo](https://i.imgur.com/OGtWPsT.png)

- [Removing Console Logs in Next.js](https://medium.com/@halilatilla/removing-console-logs-in-next-js-projects-c55713a9f635)
- [Mastering Error and Loading pages](https://levelup.gitconnected.com/mastering-error-and-loading-pages-in-next-js-13-best-practices-and-strategies-328e2622e526)
- [Handling images in Next.js 14](https://levelup.gitconnected.com/handling-images-in-next-js-14-281d67ccad36)
- [Adding unconfigured image hostname to next.config.js](https://stackoverflow.com/questions/74649324/next-image-hostname-is-not-configured-under-images-in-your-next-config-j)
- [Top 12 Libraries for Your Next.js Project](https://dev.to/nevodavid/top-12-libraries-for-your-nextjs-project-1oob)
- [How to use CORS in Next.js 14](https://levelup.gitconnected.com/how-to-use-cors-in-next-js-14-b95a1c116797)
- [A guide to caching in Next.js](https://blog.webdevsimplified.com/2024-01/next-js-app-router-cache/)
- [Advanced features of Next.js](https://codedrivendevelopment.com/posts/rarely-known-nextjs-features?utm_source=tldrwebdev)
- [Things you didn't know about Next.js](https://javascript.plainenglish.io/things-you-dont-know-about-next-js-02ee54cb5b7f)

## CSS

**Recommendations:** (from [Robin Wieruch](https://www.robinwieruch.de/react-libraries/))

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

- Tailwind CSS - [https://tailwindcss.com/](https://tailwindcss.com/)

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

## Recommended Libraries

### State Management

- [Zustand](https://github.com/pmndrs/zustand) - State management library - It allows you to manage global application state which can be read and modified by any React component that is connected to its store(s).
- Redux
  - [Redux tutorial](https://www.robinwieruch.de/react-redux-tutorial/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)

**Recommendations:** (from [Robin Wieruch](https://www.robinwieruch.de/react-libraries/))

  - useState/useReducer for co-located or shared state
  - opt-in useContext for enabling little global state
  - Zustand (or an alternative) for lots of global state

### Data Fetching

- TanStack Query (formerly known as React Query) - `yarn add @tanstack/react-query` - [https://tanstack.com/query/latest](https://tanstack.com/query/latest)
  - Works for both REST and GraphQL APIs
  - [Mastering React Query - A Complete Guide](https://javascript.plainenglish.io/mastering-react-query-a-comprehensive-guide-41c07fbcb5e?gi=2d617cfcb4b3)**
- Apollo Client - `yarn add @apollo/client` - [https://www.apollographql.com/docs/react/](https://www.apollographql.com/docs/react/)
  - Works for GraphQL APIs
- RTK Query - If using Redux - [https://redux-toolkit.js.org/rtk-query/overview](https://redux-toolkit.js.org/rtk-query/overview)
- tRPC - if you control the frontend and the backend (both TypeScript) - [https://trpc.io/](https://trpc.io/)
  - It can be combined with TanStack Query for all the niceties regarding data fetching while still being able to call your backend from your frontend by using typed functions.

### Routing

- React Router - [https://reactrouter.com/en/main](https://reactrouter.com/en/main)
  - [React Router 6 Tutorial](https://www.robinwieruch.de/react-router/)
- TanStack Router - [https://tanstack.com/router/v1/docs/overview](https://tanstack.com/router/v1/docs/overview)
  - [Why you should not use React Router](https://techmade.medium.com/why-you-should-not-use-react-router-as-a-frontend-engineer-25d96497e143)

### Components

- Material UI - Component Library - `yarn add @material-ui/core` - [https://material-ui.com/](https://material-ui.com/)
- shadcn/ui - [https://ui.shadcn.com/](https://ui.shadcn.com/)
- [saas-ui](https://saas-ui.dev/)
  - Getting started with SaaS UI is easy. First, you’ll have to install Chakra UI into your React project, then install SaaS UI, like this:
  - `npm i @chakra-ui/react @emotion/react@¹¹ @emotion/styled@¹¹ framer-motion@⁶\`
  - `npm i @saas-ui/react`
  - If yarn is more your jam, you can do this instead:
  - `yarn add @chakra-ui/react @emotion/react@¹¹ @emotion/styled@¹¹ framer-motion@⁶\`
  - `yarn add @saas-ui/react`

### Animations

In order of recommendation:

- Framer Motion - Animation library - `yarn add framer-motion` - [https://www.framer.com/motion/](https://www.framer.com/motion/)
- React Spring - Animation library - `yarn add react-spring` - [https://www.react-spring.io/](https://www.react-spring.io/)
- [10 Best Animation Libraries](https://javascript.plainenglish.io/10-best-animation-librarys-you-can-use-in-your-next-project-a6f17bddf233)
- [React Flip Move](https://www.npmjs.com/package/react-flip-move) - Animation library - `yarn add react-flip-move`
- AOS - Animation library - `yarn add aos` - [https://michalsnik.github.io/aos/](https://michalsnik.github.io/aos/)
- Animista - Animation library (All CSS) - [Animista](https://animista.net/)
- [Spinners Designs](https://tobiasahlin.com/spinkit/) - just HTML and CSS

### Charts

In order of recommendation:

- Recharts - [https://recharts.org/en-US/](https://recharts.org/en-US/)
- Apex Charts - Charts Library - `yarn add apexcharts` - [https://apexcharts.com/](https://apexcharts.com/)

### Other Libraries

- React Libraries in 2024 - [https://www.robinwieruch.de/react-libraries/](https://www.robinwieruch.de/react-libraries/)
- UUIDv4 - Key management - `yarn add uuidv4` - [https://www.npmjs.com/package/uuidv4](https://www.npmjs.com/package/uuidv4)
  - `import { v4 as uuid } from "uuid";`
  - Then use `key: uuid(),`
- Web Analytics
  - Google Analytics
  - [Umami](https://umami.is/)
  - [GoatCounter](https://www.goatcounter.com/?ref=console.dev)
  - [Top 6 tools for Node.js monitoring](https://medium.com/@akashjha9041/top-6-tools-for-node-js-monitoring-4645784b8534)
- Available [APIs](https://todoist.com/showTask?id=6002402049&sync_id=6506084811)
- Application Notifications
  - [ntfy](https://ntfy.sh/?ref=console.dev)
  - Novu [In app notifications](https://github.com/novuhq/novu)
- Other library links
  - [Email JS - send emails from your code without a backend server](https://www.emailjs.com/)
  - [React Content Loader](https://www.npmjs.com/package/react-content-loader) - SVG component to create placeholder loading, like Facebook cards loading or also known as skeleton UI
  - [React Spinners](https://www.npmjs.com/package/react-spinners) - Animation library - `yarn add react-spinners` - [https://www.davidhu.io/react-spinners/](https://www.davidhu.io/react-spinners/)
  - [React Toastify](https://www.npmjs.com/package/react-toastify) - Add quick success, failure, warning, info messages to the UI
  - [React Device Detect](https://www.npmjs.com/package/react-device-detect) - Detect the device type (mobile, tablet, desktop) and OS (iOS, Android, Windows, Mac)
  - [React Error Catching](https://www.developerway.com/posts/how-to-handle-errors-in-react?utm_source=reactdigest&utm_medium&utm_campaign=1527)
  - [Why Did You Render](https://www.npmjs.com/package/@welldone-software/why-did-you-render)
- Review the full list of Coding resources on Todoist [here](https://todoist.com/app/project/2305622709#section-86202880)
- Review the full list of React resources on Todoist [here](https://todoist.com/showTask?id=5756174140&sync_id=6506084710)
  - [React Components](https://todoist.com/showTask?id=6131657730&sync_id=6506084845)
  - [Hooks](https://todoist.com/showTask?id=6132071986&sync_id=6506084871)
  - [General Design Inspiration](https://todoist.com/showTask?id=6132126520&sync_id=6506085362)

> Note - for more, see "[Coding Resources](https://app.todoist.com/app/project/2305622709#section-86202880)" Todoist project

## Other Tips and Easy Wins

- With the `accent-color` property you can specify the predominant color for checkboxes, radio buttons, ranges, and even progress bars.
- Use the correct HTML `<input type="">` attribute for the correct input type. There are [22 HTML input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
