# Helper Doc

A document containing useful commands, set up, checklists and fixes for projects

<p align="center">
  <img src="https://i.imgur.com/Qtr66Z2.png" alt="Helper Logo" width="150"/>
</p>

## Table of Contents

- [Tool Commands/Shortcuts](#tool-commandsshortcuts)
	- [Powershell Commands](#powershell-logo-powershell-commands)
	- [Git Commands](#git-logo-git-commands)
	- [VS Code Commands](#vs-code-logo-vs-code-commands)
	- [Chrome Shortcuts](#chrome-logo-chrome-shortcuts)
	- [VBA Shortcuts](#vba-logo-vba-shortcuts)
- [Open AI and ChatGPT](#openai-logo-open-ai-and-chatgpt)
  - [OpenAI Links](#openai-links)
  - [ChatGPT Prompts](#chatgpt-prompts)
- [Python](#python-logo-python)
  - [Installing Python](#installing-python)
  - [Python Scripts](#python-scripts)
- [Package Managers](#package-managers)
  - [NPM](#npm-logo-npm)
  - [Yarn](#yarn-logo-yarn)
  - [PNPM](#pnpm-logo-pnpm)
- [Updating Versions](#updating-versions)
	- [NPM and Yarn](#npm-logo-npm-and-yarn-logo-yarn)
	- [Yarn Packages](#yarn-logo-yarn-packages)
	- [Node](#node-logo-node)
- [Project Set Up](#project-set-up)
  - [Inspiration](#inspiration)
  - [Decide on Architecture](#decide-on-architecture)
    - [Front End Architecture](#front-end-architecture)
    - [Back End Architecture](#back-end-architecture)
    - [Database](#database)
    - [Hosting](#hosting)
    - [Mobile Architecture](#mobile-architecture)
  - [Create the New App](#create-the-new-app)
    - [CRA (Create React App)](#react-logo-cra-create-react-app)
    - [Vite](#vite-logo-vite)
    - [Next.js](#nextjs-logo-nextjs)
  - [Initiate a Git Repository and link to GitHub](#initiate-a-git-repository-and-link-to-github-logo-github)
  - [Folder and File Structure](#folder-and-file-structure)
  - [ESLint and Prettier Config](#eslint-logo-eslint-and-prettier-logo-prettier-config)
  - [GitHub Workflows](#github-logo-github-workflows)
  - [Issues and Debugging](#react-logo-issues-and-debugging)
  - [Testing](#cypress-logo-testing)
  - [Deployment](#netlify-logo-deployment)
  - [Security and Authentication](#security-and-authentication)
  - [Documentation](#documentation)
  - [Optional Extras](#optional-extras)
- [Project Release Checklist](#project-release-checklist)
	- [SEO and Meta Data](#seo-and-meta-data)
	- [404 Page](#404-page)
	- [Page Speed Testing](#page-speed-testing)
	- [GitHub Information](#github-logo-github-information)
	- [Other Options](#other-options)
- [Git Fixes](#git-logo-git-fixes)
	- [Error: Unable to load Commits. fatal: bad object desktop.ini](#error-unable-to-load-commits-fatal-bad-object-desktopini)
	- [Clearing Secrets from History](#clearing-secrets-from-history)

## Tool Commands/Shortcuts

### ![Powershell Logo](https://i.imgur.com/wBg7htx.png) Powershell Commands

- To get to Powershell, you can type `powershell` into the top command line in windows explorer just like `cmd`.
- Navigating Folders and Files
  - `pwd` - To print the current directory
  - `ls` - To list all options in the current folder
  - `ls -la` - List everything in current directory
  - `cd xxx` - To change directory to the next typed characters
  - `cd ~` - To change directory back to the root level
  - `cd ..` - To change directory back up one level
  - `cat xxx` - To print the contents of a file
  - `history` - To print the history of commands
- Modifying Files
  - `mkdir xxx` - To create a new folder with the name of the next typed characters
  - `touch xxx` - To create a new file with the name of the next typed characters
  - `code xxx` - To open a file in VS Code
  - `cp xxx yyy` - To copy a file from xxx to yyy
  - `mv xxx yyy` - To move a file from xxx to yyy
  - `rm xxx` - To remove a file
  - `>` - To overwrite a file, e.g. `echo "Hello World" > hello.txt` will overwrite the file hello.txt with "Hello World"
  - `>>` - To append a call to a file, e.g. `echo "Hello World" >> hello.txt` will append "Hello World" to the end of the file hello.txt
- Aliases
  - To open your bash alias file, navigate to the root folder using `cd ~` and then open using `code .bash_aliases`. This should open the file up in VS Code.
  - `alias` - To print all aliases
  - `alias xxx="yyy"` - To create a new alias, e.g. `alias g="git"` will create an alias for git

### ![Git Logo](https://i.imgur.com/2xve41Z.png) Git Commands

- `git clone https://git.rle.de/deloitte/deloitte-pm-tool.git` - Clone a repo from the provided URL
- `git init` - Initiate a git repository
- `git remote add origin https://github.com/bangsluke/hacker-stories.git` - Add a GitHub repository
- `git branch -M main` - Switch to the main branch
- `git commit -m "Initial commit"` - Commit with the message (-m) "Initial commit"
- `git push -u origin main` - Push to the main branch
- `git fetch --prune` - Fetch all branches and remove remote deleted branches
- `git commit --allow-empty -m 'Empty commit'` - Trigger the CI/CD pipeline with a blank commit
- `git rev-list --all | xargs git grep "git"` - Search for the word "git" in all files of all commits

### ![VS Code Logo](https://i.imgur.com/2lK00uT.png) VS Code Commands

- `Ctrl + P` - Open the file search
- `Ctrl + Shift + P` - Open the command palette
- `Ctrl + D` - Multi select (highlight a word and then press multiple times to select all words to type and replace)
- `Ctrl + Space` - Autocomplete the word (and auto import)
- `Ctrl + Shift + K` - Delete the current code line
- `Alt + Up/Down` - Move the current line up or down
- `Alt + Shift + Up/Down` - Copy the current line up or down

### ![Chrome Logo](https://i.imgur.com/yTEUQ3I.png) Chrome Shortcuts

- `Ctrl + Shift + J` - Open Chrome dev tools console

### ![VBA Logo](https://i.imgur.com/TrsfWN1.png) VBA Shortcuts

- `F5` - Run the current script
- `F8` - Run the current line of code
- `Ctrl + Y` - Delete the current code line

> [^ Back To Top](#table-of-contents)

## ![OpenAI Logo](https://i.imgur.com/KkOSP3l.png) Open AI and ChatGPT

### OpenAI Links

- [ChatGPT](https://chat.openai.com/)
- [OpenAI](https://openai.com/)
- [OpenAI API](https://beta.openai.com/docs/api-reference/introduction)

### ChatGPT Prompts

- [How to use ChatGPT in daily life](https://levelup.gitconnected.com/how-to-use-chatgpt-in-daily-life-4688f7afb930)
  - Summarize a book or article
    - `Summarize animal farm by George Orwell.`
    - `Summarize the contents of this link https://docs.python.org/3/library/string.html`
  - Recommendations
    - `Recommend 5 best books on data science.`
  - Marketing
    - `Create a Facebook ad for the best web development agency.`
  - Creating content
    - `I want to build an AI-powered education platform. Suggest 10 catchy names for this startup idea.`
  - Simplifying complex concepts
    - `Explain the concept of machine learning in simple words.`
    - `Explain quantum computing like I'm 5.`
  - Prepare for interviews
    - `What are the most common interview questions for data scientists?`
    - `Act as an interviewer and ask me 10 difficult questions as a data scientist.`
  - Write bits of code
    - `Write a function to calculate the factorial of a number.`
    - `Write me a React component that displays a list of items.`
    - `Write me a React unit test for the above component.`
    - `Write me a Python script that reads a CSV file and prints the contents.`

> [^ Back To Top](#table-of-contents)

## ![Python Logo](https://i.imgur.com/PbuJx5s.png) Python

### Installing Python

- [Download Python](https://www.python.org/downloads/)
- [Install pip](https://pip.pypa.io/en/stable/installation/)
- [Set Python Path](https://stackoverflow.com/a/47808351)
- Install required packages, e.g;
  - `pip install pyautogui`
- To update pip, use the following command:
  - `python.exe -m pip install --upgrade pip`

### Python Scripts

To see my Python scripts, check out my [Python Learning](https://github.com/bangsluke/python-learning) repo.

This contains basic scripts detailing how to use Python to automate tasks and describing basic syntax.

> [^ Back To Top](#table-of-contents)

## Package Managers

Before defaulting to NPM or Yarn, consider using [PNPM](https://pnpm.io/).

### ![NPM Logo](https://i.imgur.com/ufPLPqy.png) NPM

For more commands, see this [cheatsheet](https://devhints.io/npm).

- `npm --version` - Check the current installed version of npm
- `npm init` - Create a new package.json file
- `npm i` - Can be used as a shortcut for `npm install`
- `npm install` - Install all packages
- `npm install <package>` - Install a package
- `npm install <package> --save-dev` - Install a package as a dev dependency
- `npm install <package> --global` - Install a package globally
- `npm uninstall <package>` - Uninstall a package
- `npm update` - Update all packages
- `npm outdated` - Check for outdated packages
- `npm run <script>` - Run a script from the package.json file

> [^ Back To Top](#table-of-contents)

### ![Yarn Logo](https://i.imgur.com/IXZDNL8.png) Yarn

For more commands, see this [cheatsheet](https://devhints.io/yarn).

- `yarn --version` - Check the current installed version of yarn
- `yarn init` - Create a new package.json file
- `yarn` - Install all packages defined in package.json - same as `npm install`
- `yarn add <package>` - Install a package - same as `npm install <package>`
- `yarn add <package> --dev` - Install a package as a dev dependency
- `yarn upgrade` - Update all packages - same as `npm update`

> [^ Back To Top](#table-of-contents)

### ![PNPM Logo](https://i.imgur.com/1YKlWVX.png) PNPM

- [Link](https://pnpm.io/) to all documentation
- [Introduction article](https://javascript.plainenglish.io/what-is-pnpm-why-you-should-try-it-as-a-frontend-developer-8dc3853c1ba1)

### Updating Versions

#### ![NPM Logo](https://i.imgur.com/ufPLPqy.png) NPM and ![Yarn Logo](https://i.imgur.com/IXZDNL8.png) Yarn

- `npm --version` - Check the current installed version of npm
- `npm install -g npm` - Install globally the latest stable version of npm
- `yarn --version` - Check the current installed version of yarn
- `npm install -g yarn@v1.22.19` - Install globally a specific version of yarn (check [Yarn Windows Releases](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) for the latest version)

#### ![Yarn Logo](https://i.imgur.com/IXZDNL8.png) Yarn Packages

- [Link](https://classic.yarnpkg.com/lang/en/docs/cli/upgrade/) to all documentation
- `yarn upgrade` - Upgrade all packages to their latest version
- `yarn upgrade left-pad` - Upgrade a specific package to its latest version
- `yarn upgrade left-pad@^1.0.0` - Upgrade a specific package to a specific version
- `yarn upgrade left-pad grunt` - Upgrade multiple packages to their latest version
- `yarn upgrade @angular` - Upgrade all packages with the name @angular to their latest version
- `yarn upgrade --latest` - Upgrade all packages to their latest version
- `yarn upgrade left-pad --latest` - Upgrade a specific package to its latest version
- `yarn remove left-pad` - Removes a specific package

#### ![Node Logo](https://i.imgur.com/EvX1vFR.png) Node

- `node --version` - Check the current installed version of node
- `nvm ls` - Find out which versions of Node.js you may have installed and which one of those you're currently using
- `nvm ls available` - List all versions of Node.js available for installation
- `nvm install 8.1.0` - Install a specific version of Node (check <https://nodejs.org/en/> for the latest version)

> Note - you can also use `npm install -g node@v16.18` - Install globally a specific version of node

- `nvm use 4.2` - Switch between the installed versions on your machine

> References
>
> 1. [How Do I Update NodeJS](https://stackoverflow.com/questions/8191459/how-do-i-update-node-js)
> 2. [NVM Windows Releases](https://github.com/coreybutler/nvm-windows/releases) - NVM latest release - use "nvm-setup.exe"

> [^ Back To Top](#table-of-contents)

## Project Set Up

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

## Project Release Checklist

Use this checklist tool for each site released - [frontendchecklist.io](https://frontendchecklist.io/)

### SEO and Meta Data

- This will depend on the project and its requirements and if it needs to be SEO friendly (private projects may not need this)
- Set up meta tags in the index.html file
  - [metatags.io](https://metatags.io/)
  - [The Power of Metadata in Next.js 13 (Part 2): Optimize Your Website’s SEO NOW!](https://medium.com/@danielcracbusiness/the-power-of-metadata-in-next-js-13-part-2-optimize-your-websites-seo-now-d822c82ba920)
  - [theme colour html](https://levelup.gitconnected.com/1-minute-html-tip-theme-colors-44839431eafa)

> [^ Back To Top](#table-of-contents)

### Favicon

- Create a favicon for the site and for all applications that may access the site
  - [realfavicongenerator.net](https://realfavicongenerator.net/)
  > Note: you can create a subfolder at the root called "favicon" and then update the head links to refer to this folder to keep the project tidy

> [^ Back To Top](#table-of-contents)

### 404 Page

- Create a 404 page for catching routing errors
  - [error404.fun](https://error404.fun/)
  - For a Next.js, use the following steps and code (example on [Big Lynn site](https://github.com/bangsluke/BigLynn2023));
    - Add a new page to the `pages` directory
    - Add the following import code: `import { useRouter } from "next/router";`
    - Add the following code: `const router = useRouter();` within the page component
    - Add the following onClick code to a button: `onClick={() => router.back()} // Go back to the last visited page`
- Consider if additional 404 pages are required for other errors, such as 500, 503, etc.

> [^ Back To Top](#table-of-contents)

### Page Speed Testing

- Reduce your image sizes
  - [9 Image optimisation techniques](https://medium.com/@arulvalananto/9-image-optimization-tricks-for-a-seamless-web-experience-b41867e87e54)
  - Convert all of your jpg and png files to smaller image types such as webp
  - Lazy Load
    - Lazy load images and videos - add to the image and iframe tags `loading="lazy"`
- Optimise the site for speed
  - If using React, then visit <https://reacthandbook.dev/react-performance-optimization?utm_source=reactdigest&utm_medium&utm_campaign=1678>
    - See ways to optimize loadtimes - [Link](https://reacthandbook.dev/react-performance-optimization#loadtimes-optimize)
    - See ways to optimize runtimes - [Link](https://reacthandbook.dev/react-performance-optimization#runtimes-optimize)
  - [Next.js App speed increases](https://medium.com/weekly-webtips/10-ways-to-improve-your-next-js-app-performance-8e6f81b32dac)
  - [Next.js Caching Animation](https://www.youtube.com/watch?v=KzS_AG6nWdg)
  - [Low-Hanging Web Performance Fruits: A Cheat Sheet](https://betterprogramming.pub/low-hanging-web-performance-fruits-a-cheat-sheet-3aa1d338b6c1)
    - Optimize Your Assets
    - Cache Your Assets
    - Split Your Code
    - Optimize Your Bundle
    - Manage Third-Party Scripts
  - [Everything you need to know about Web Performance (in 5 Minutes)](https://dev.to/vue-storefront/everything-you-need-to-know-about-web-performance-as-a-dev-in-5-minutes-450l)
  - [Senior Engineering Strategies for Advanced React and TypeScript](https://asimzaidi.medium.com/senior-engineering-strategies-for-advanced-react-and-typescript-9d7aa8a07fd8)
    - Specifically look at the Performance section for the LazyLoadedComponent
  - [Sniper-CSS, avoid unused styles](https://link.medium.com/JK0GxKTA7yb)
- Check the speed of the app and improve where possible
  - Use <https://www.webpagetest.org/> to test the speed of the site
    - Mark the tick box to Audit using Lighthouse
    - Review the results and make improvements based on the potential opportunities the tool suggests
  - Other Speed Testing Tools
    - Use Chrome DevTools LightHouse tool
    - [GTmetrix](https://gtmetrix.com/)

> [^ Back To Top](#table-of-contents)

## Framework Specific Checks

- If using Next.js
  - [Advanced Next JS Concepts](https://blog.devgenius.io/advanced-next-js-concepts-8439a8752597)
  - Make sure to optimize images using next/image. e.g.

    ```javascript
    import Image from 'next/image'
    <Image
        src="/images/my-image.jpg"
        alt="My Image"
        width={500}
        height={500}
        loading="lazy"
      />
    ```

  - Add Next.js Analytics (see section 4.d of the above article)
    - <https://nextjs.org/analytics>

### Other General Tests

- Check that if you have a fixed header, the page scrolls to the correct position when clicking on a link - (<https://calvinke.com/seo/fixed-header-anchor-css/>)
- Check that the site works on all devices and browsers - [BrowserStack](https://www.browserstack.com/)

> [^ Back To Top](#table-of-contents)

### ![GitHub Logo](https://i.imgur.com/zD0C9oF.png) GitHub Information

- Check that the GitHub repo has all the details that it needs, such as:
  - About Section
    - Description
    - Tags
  - Is public/private
  - Is pinned to main GitHub profile if suitable
- Check that the README has all the required details it needs, including;
  - Structure - [see here](https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/)
	- Project Title
	- Project Description
	- Table of Contents
	- Installation
	- Usage
	- Contributing
	- License
  - Badges
    - Version number
    - Repo status
    - Tests passing
    - Netlify deployment status

### Other Options

- [Remove console logs from Production](https://dev.to/gulshanaggarwal/say-goodbye-to-consolelog-from-production-environment-5382)
- [Add a share button](https://dev.to/dailydevtips1/using-the-native-web-share-javascript-api-23ei)
- [Markup validation](https://validator.w3.org/)

> [^ Back To Top](#table-of-contents)

## ![Git Logo](https://i.imgur.com/2xve41Z.png) Git Fixes

### Error: Unable to load Commits. fatal: bad object desktop.ini

Summary: Bad desktop.ini file that is created by Google Drive. Needs to be deleted.

#### Delete all desktop.ini files

1. Run CMD as administrator
2. Navigate to the folder where the bad file is using `cd`
3. Delete all "desktop.ini" files in the folder and all sub-folders using `del desktop.ini /A:H /S`
4. Reload the git graph extension and the error should have gone

#### Manually delete each desktop.ini file with explanations

1. Run CMD as administrator
2. Navigate to the folder where the bad file is using `cd`
3. Show all files in the folder along with their marked attributes using `attrib`
4. Any hidden file has an "H" file attribute next to it
5. Remove the hidden attribute of the file using `attrib -h desktop.ini`. Note, if there are more than one attribute, you need to remove all of them for this command to work (see link 3)
6. Delete the file using `del desktop.ini`
7. Continue for all files that need to be deleted
8. Reload the git graph extension and the error should have gone

> References
>
> 1. [Explanation Link](https://iamalsojohn.wordpress.com/2018/04/18/git-google-drive-and-bad-references/)
> 2. [Show Hidden Files](https://www.computerhope.com/issues/ch001464.htm)
> 3. [Remove Attributes from Files](https://answers.microsoft.com/en-us/windows/forum/all/unable-to-remove-system-attribute-not-resetting/a68ca5b6-2c4d-4055-9219-1bf6944766ad)
> 4. [Delete All Hidden Files](https://www.windows-commandline.com/show-delete-hidden-files-command-prompt/)

### Clearing Secrets from History

Summary:

- Create a text file at the parent folder of the repo (not in the repo) of the replacements you need to make such as "BigLynnReplacements.txt"
- Each line is a new replacement, e.g.;
	`‘xau_8Q9v6YrRzXgPcSvgjOvVbYEwkKm1lgBo4’==>ENV[‘XATA_API_KEY’]` would replace the API key with the environment variable name
- Copy the file "git-filter-repo" from Personal Coding into the repo
- Open the CMD for the repo
- Use the command `git filter-repo --replace-text ../BigLynnReplacements.txt --force` to go through the history of the repo and make all the required replacements

> References
>
> 1. [Rewriting Git History Cheatsheet](https://blog.gitguardian.com/rewriting-git-history-cheatsheet/)

> [^ Back To Top](#table-of-contents)
