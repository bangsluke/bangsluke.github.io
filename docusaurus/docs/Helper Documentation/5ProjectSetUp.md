# Project Set Up

### Inspiration

For inspiration for projects, check out the following resources on the `Coding Resources` - [`Design UI_UX Links` Todoist list](https://todoist.com/showTask?id=6132126520&sync_id=6506085362)

### Decide on Architecture

If it is just a web app to be built, consider the below Front End, Back End and Database Architecture options. If it also needs to be a mobile app, consider the below Mobile Architecture options.

#### Front End Architecture

- Considerations:
  - Single page application or not?
  - SSR (Server side rendering) or SSG (Static site generation) required?
- Options:
  - CRA (Create React App)
  - Vite
  - NextJS

#### Back End Architecture

- Considerations:
  - Need to investigate
  - [Backend development is more than writing endpoints for frontend](https://dev.to/this-is-learning/backend-development-is-more-than-writing-endpoints-for-frontend-gl1)
- Options:
  - ExpressJS
  - NodeJS

#### Database

- Considerations:
  - Should it be SQL or non SQL?
  - How am I going to query my database? Via a client? By the CLI?
  - Consider TypeORM or Prisma for type safe access to your database
- Options:
  - Sequel DBs:
    - Xata
    - MySQL
    - Postgress (recommended)
  - No Sequel DBs:
    - Firebase
    - MongoDB
    - PlanetScale
    - Supebase

> References
>
> 1. [Which Is Better? SQL vs NoSQL](https://www.youtube.com/watch?v=t0GlGbtMTio&feature=youtu.be&ab_channel=WebDevSimplified)
> 2. [How To Choose a Database for your App](https://www.youtube.com/watch?v=xGCm_cLxets&feature=youtu.be&ab_channel=Prisma)
> 3. [Build a TypeScript API with Express, RapidAPI, and Xata](https://www.youtube.com/watch?v=8MjjmCQIdiY&t=3s&ab_channel=JamesQQuick)

#### Hosting

- Considerations:
  - How much will hosting the site cost?
  - What features does the hosting provide?
  - What access protection does the hosting service offer for limiting access to your app or database?
- Options:
  - Netlify (free)
  - Vercel
  - Heroku (cheap)
  - DigitalOcean (cheap)
  - Amazon RDS (expensive)
  - BlueHost (basic)

#### Mobile Architecture

- Expo - <https://expo.io/>
- Capacitor.js - <https://capacitorjs.com/>

> [^ Back To Top](#table-of-contents)

### Create the New App

### Boilerplate Code

  - Consider using a boilerplate code to get started, as listed [here](https://todoist.com/showTask?id=6518989300&sync_id=6518989300)

> [^ Back To Top](#table-of-contents)

#### ![React Logo](https://i.imgur.com/LMShXOo.png) CRA (Create React App)

  - `npx create-react-app my-app` - Create a new React app called "my-app"
  - `npx create-react-app my-app --template typescript` - Create a new React app called "my-app" with TypeScript
  - `cd my-app` - Change directory to the new React app
  - `npm start` - Start the React app
  - `npm run build` - Build the React app for production

> [^ Back To Top](#table-of-contents)

#### ![Vite Logo](https://i.imgur.com/smpppHt.png) Vite

  - To use Vite with Yarn and TypeScript do the following;
    - `yarn create vite my-app --template react-ts`
    - Then follow the instructions in the terminal
      - Note: For "package name" use the name of the app
    - For other possible Vite options see [here](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
  - `cd my-app` - Change directory to the new React app
	- `yarn` - Install the dependencies
	- `yarn dev` - Start the React app
	- `yarn build` - Build the React app for production

> [^ Back To Top](#table-of-contents)

#### ![NextJS Logo](https://i.imgur.com/OGtWPsT.png) Next.JS

  - JavaScript and npm
	- `npx create-next-app@latest` - Create a new Next.JS app (name will be requested)
	- `cd xxx` - Change directory to the new Next.JS app replacing the xxx with the name of the app
	- `npm install` - Install the dependencies
	- `npm run dev` - Start the React app
	- `npm run build` - Build the React app for production
  - Typescript and yarn
    - `yarn create next-app --typescript` - Create a new Next.JS app with TypeScript (name will be requested)
    - `cd xxx` - Change directory to the new Next.JS app replacing the xxx with the name of the app
  - `yarn` - Install the dependencies
	- `yarn dev` - Start the React app
	- `yarn build` - Build the React app for production

> [^ Back To Top](#table-of-contents)

### Initiate a Git Repository and link to ![GitHub Logo](https://i.imgur.com/zD0C9oF.png) GitHub

- Create a new repository on GitHub
- In the app terminal, initiate git and push to GitHub (replace the below GitHub URL with your own);

```powershell
git init
git remote add origin https://github.com/bangsluke/hacker-stories.git
git branch -M main
git commit -m "Initial commit"
git push -u origin main
```

- Make the repo private or public based on the requirements
- Protect the main branch from being pushed to directly
- Create a develop branch
- Add a .gitignore file to the root of the project

> [^ Back To Top](#table-of-contents)

### Folder and File Structure

#### Folder Structure

- Create a folder structure that makes sense for the project
  - For a React project, have the following set up
  > Note, this structure is based off of the [Bulletproof React](https://github.com/alan2207/bulletproof-react) project

```n/a
src
|
+-- /assets            # Assets folder can contain all the static files such as images, fonts, etc.
+-- /components        # Shared components used across the entire application
+-- /config            # All the global configuration, env variables etc. get exported from here and used in the app
+---- .env             # Environment variables
+-- /data              # Any stored data that is used across the application (my own addition)
+-- /features          # Feature based modules
+-- /hooks             # Shared hooks used across the entire application
+-- /lib               # Re-exporting different libraries preconfigured for the application
+-- /providers         # All of the application providers
+-- /routes            # Routes configuration
+-- /stores            # Global state stores
+-- /test              # Test utilities and mock server
+-- /types             # Base types used across the application
+-- /utils             # Shared utility functions
```

  - For a Next project, consider which folders are not needed, e.g. Routes would not be needed as Next handles routing via the pages folder
  - To set up the above structure, first, navigate to the root folder of your project and then run the command from the linked file in the terminal
    - [Folder Structure Command.md](https://github.com/bangsluke/bangsluke.github.io/blob/main/FolderStructureCommand.md)

> [^ Back To Top](#table-of-contents)

#### File Set Up

- Also, it is best practice to have a certain few files within your project

> Note, these files are already created in the above command

  - README.md file in the root of the project
    `echo "# Project" > README.md`
  - An empty .env file in the root of the project

    ```powershell
    echo "# Add an API Key" > .env
    echo "API_KEY=AddKey" >> .env
    ```

  - .gitignore file in the root of the project

    ```powershell
    echo "# local env files" > .gitignore
    echo ".env" >> .gitignore
    ```

    - [Gitignore.io](https://www.toptal.com/developers/gitignore) is a great resource to generate a .gitignore file for your project

> [^ Back To Top](#table-of-contents)

### ![ESLint Logo](https://i.imgur.com/ebsMde1.png) ESLint and ![Prettier Logo](https://i.imgur.com/IJ3Ksm0.png) Prettier Config

- Copy over the .eslintrc.json and .prettierrc set ups from a good project (e.g. Dorkinians Mobile Stats)
- Make changes if any are required
- Consider the below references if needed

> References
>
> 1. [React + TypeScript + ESLint + Prettier Full Setup](https://dev.to/suchintan/reacttypescripteslint-prettier-full-setup-p7j)
> 2. [How to properly set up Prettier in less than 2 minutes](https://dev.to/bokub/how-to-properly-set-up-prettier-in-less-than-2-minutes-2ld0)

> [^ Back To Top](#table-of-contents)

### .env Files and Variables

- To securely store environment variables, create a .env file in the root of the project
- Then create a .gitignore file in the root of the project and add the .env file to it
- For CRA, you can create .env variables named as `REACT_APP_` and they will be available in the browser
  - Example: `REACT_APP_API_KEY=1234567890`
  - You can then use the variable in the code as `process.env.REACT_APP_API_KEY`
  - [See this article](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- For Vite, you can create .env variables named as `VITE_` and they will be available in the browser
  - Example: `VITE_API_KEY=1234567890`
  - You can then use the variable in the code as `import.meta.env.VITE_API_KEY`
  - [See this article](https://vitejs.dev/guide/env-and-mode.html#env-files)
- For Next.JS;
  - Example: `API_KEY=1234567890`
  - If you're just working in Node.JS, you can then use the variable in the code as `process.env.API_KEY`
  - If you're working in the browser, you have to prefix the variable in the code as `process.env.NEXT_PUBLIC_API_KEY`
  - [See this article](https://nextjs.org/docs/basic-features/environment-variables)
  - [Read this Medium story if still have issues](https://frontend-digest.com/environment-variables-in-next-js-9a272f0bf655)

> References

> 1. [Hiding Secret Keys in React](https://www.pluralsight.com/guides/hiding-secret-keys-in-create-react-app)

> [^ Back To Top](#table-of-contents)

### ![GitHub Logo](https://i.imgur.com/zD0C9oF.png) GitHub Workflows

- Create the folder structure .github/workflows at the root folder
- Copy over the workflow .yml files from a good project (e.g. Dorkinians Mobile Stats)
  - CI.yml
  - CD.yml
  - CodeQL.yml
  - dependencyReview.yml
  - dependabot.yml
- Modify any details of the workflow to suit your needs

> [^ Back To Top](#table-of-contents)

### ![React Logo](https://i.imgur.com/LMShXOo.png) Issues and Debugging

- For issues in `React` (including `Vite` and `Next.JS`):
  - Issue 1 - Cannot be used as a JSX component

    ```javascript
    'SidebarItem' cannot be used as a JSX component.   Its type '(props: SidebarLink) => Element' is not a valid JSX element type.     Type '(props: SidebarLink) => Element' is not assignable to type '(props: any, deprecatedLegacyContext?: any) => ReactNode'.       Type 'Element' is not assignable to type 'ReactNode'.         Property 'children' is missing in type 'Element' but required in type 'ReactPortal'.
    ```

    Solution: <https://stackoverflow.com/a/75093164>

> [^ Back To Top](#table-of-contents)

### ![Cypress Logo](https://i.imgur.com/BUzlvBh.png) Testing

- Review the testing resources saved in [Todoist](https://todoist.com/showTask?id=6132185936&sync_id=6506084877)
- Set up testing throughout the application based on its requirements
- [Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
  - Static tests (ESLint, TypeScript) - Done automatically in VS Code e.g. typos and type errors
  - Unit tests (Jest)
  - Integration tests (React Testing Library / Cypress)
  - E2E tests (Cypress)

> [^ Back To Top](#table-of-contents)

### ![Netlify Logo](https://i.imgur.com/reePUUY.png) Deployment

- Set up deployment to the hosting service of choice
- Recommend Netlify for a simple deployment
- Set up additional Netlify integrations (e.g. Lighthouse, Checklinks, HTML Validate). Link is [here](https://app.netlify.com/sites/dorkinians-mobile-stats/integrations) once deployed. (!NOTE - Not yet got these working on a repo)
  - Must haves
    - LightHouse - Automatically run a Lighthouse audit on your website after every build.
    - Checklinks - Checklinks helps you keep all your asset references correct and avoid embarrassing broken links to your internal pages, or even to external pages you link out to.
    - HTML Validate - Validate HTML generated by your build.
  - Possible haves
    - Image Optim - Optimize images as part of your Netlify build process.
    - Is Website Vulnerable - A Netlify plugin that uses Snyk to test for security vulnerabilities in a website's JavaScript libraries.
    - Minify HTML - A plugin to add HTML minification as a post-processing optimisation in Netlify.
    - Snyk Security - A Snyk Netlify plugin to find and monitor new security vulnerabilities in JavaScript libraries (also see below).

> [^ Back To Top](#table-of-contents)

### Security and Authentication

#### Security

- Set up repository security scanning via Snyk
  - Add the project to Snyk [here](https://app.snyk.io/org/bangsluke/projects)
  - Check and close off all vulnerabilities

#### Authentication

- Next.js - NextAuth - [Link](https://levelup.gitconnected.com/the-ultimate-guide-to-next-js-authentication-with-nextauth-js-ff6dc0c126e4)
- For other authentication, consider using the following resources;
  - [PropelAuth](https://levelup.gitconnected.com/say-goodbye-to-authentication-headaches-with-propelauth-the-ultimate-solution-for-developers-b5cdad57d7d2)
  - [Logto Auth](https://logto.io/?ref=console)
  - [Firebase](https://firebase.google.com/)

> [^ Back To Top](#table-of-contents)

### Documentation

- Set up documentation for the project via a README.md file
- Write from scratch or use a template such as [readme.so](https://readme.so/)

> [^ Back To Top](#table-of-contents)

### Optional Extras

- Recommended Libraries
  - UUIDv4 - Key management - `yarn add uuidv4` - [https://www.npmjs.com/package/uuidv4](https://www.npmjs.com/package/uuidv4)
    - `import { v4 as uuid } from "uuid";`
    - Then use `key: uuid(),`
  - React Query - `yarn add react-query` - [https://react-query.tanstack.com/](https://react-query.tanstack.com/)
    - [Mastering react Query - A Complete Guide](https://javascript.plainenglish.io/mastering-react-query-a-comprehensive-guide-41c07fbcb5e?gi=2d617cfcb4b3)
  - Material UI - Component Library - `yarn add @material-ui/core` - [https://material-ui.com/](https://material-ui.com/)
  - Apex Charts - Charts Library - `yarn add apexcharts` - [https://apexcharts.com/](https://apexcharts.com/)
  - Animations
    - [React Flip Move](https://www.npmjs.com/package/react-flip-move) - Animation library - `yarn add react-flip-move`
    - Framer Motion - Animation library - `yarn add framer-motion` - [https://www.framer.com/motion/](https://www.framer.com/motion/)
    - AOS - Animation library - `yarn add aos` - [https://michalsnik.github.io/aos/](https://michalsnik.github.io/aos/)
    - React Spring - Animation library - `yarn add react-spring` - [https://www.react-spring.io/](https://www.react-spring.io/)
    - Animista - Animation library (All CSS) - <https://animista.net/>
    - [Spinners Designs](https://tobiasahlin.com/spinkit/) - just HTML and CSS
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

> Note - for more, see "Coding Resources" Todoist project

> [^ Back To Top](#table-of-contents)
