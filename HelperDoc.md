# Helper Doc

A document containing useful commands, set up, checklists and fixes for projects

<p align="center">
  <img src="https://i.imgur.com/Qtr66Z2.png" alt="Helper Logo" width="150"/>
</p>

## Table of Contents

- [Tool Commands/Shortcuts](#tool-commandsshortcuts)
	- [Powershell Commands](#-powershell-commands)
	- [Git Commands](#--git-commands)
	- [VS Code Commands](#-vs-code-commands)
	- [Chrome Shortcuts](#-chrome-shortcuts)
- [Updating Versions](#updating-versions)
	- [NPM and Yarn](#-npm-and--yarn)
	- [Node](#-node)
- [Project Set Up](#project-set-up)
	- [Decide on Architecture](#decide-on-architecture)
		- [Front End Architecture](#front-end-architecture)
		- [Back End Architecture](#back-end-architecture)
		- [Database](#database)
		- [Hosting](#hosting)
	- [Create the New App](#create-the-new-app)
		- [CRA (Create React App)](#-cra-create-react-app)
		- [Vite](#-vite)
		- [Next.js](#-nextjs)
	- [Initiate a Git Repository and link to GitHub](#initiate-a-git-repository-and-link-to--github)
	- [ESLint and Prettier Config](#-eslint-and--prettier-config)
	- [GitHub Workflows](#-github-workflows)
	- [Testing](#-testing)
	- [Deployment](#-deployment)
	- [Documentation](#documentation)
	- [Optional Extras](#optional-extras)
- [Project Release Checklist](#project-release-checklist)
	- [SEO and Meta Data](#seo-and-meta-data)
	- [404 Page](#404-page)
	- [Page Speed Testing](#page-speed-testing)
	- [GitHub Information](#-github-information)
	- [Other Options](#other-options)
- [Git Fixes](#--git-fixes)
	- [Error: Unable to load Commits. fatal: bad object desktop.ini](#error-unable-to-load-commits-fatal-bad-object-desktopini)
	- [Clearing Secrets from History](#clearing-secrets-from-history)


## Tool Commands/Shortcuts

### ![](https://i.imgur.com/wBg7htx.png) Powershell Commands
- To get to Powershell, you can type `powershell` into the top command line in windows explorer just like `cmd`.
- `pwd` - To print the current directory
- `ls` - To list all options in the current folder
- `ls -la` - List everything in current directory
- `cd xxx` - To change directory to the next typed characters
- `cd ~` - To change directory back to the root level
- `cd ..` - To change directory back up one level

### ![](https://i.imgur.com/2xve41Z.png)  Git Commands
- `git clone https://git.rle.de/deloitte/deloitte-pm-tool.git` - Clone a repo from the provided URL
- `git init` - Initiate a git repository
- `git remote add origin https://github.com/bangsluke/hacker-stories.git` - Add a GitHub repository
- `git branch -M main` - Switch to the main branch
- `git commit -m "Initial commit"` - Commit with the message (-m) "Initial commit"
- `git push -u origin main` - Push to the main branch
- `git fetch --prune` - Fetch all branches and remove remote deleted branches
- `git commit --allow-empty -m 'Empty commit'` - Trigger the CI/CD pipeline with a blank commit
- `git rev-list --all | xargs git grep "git"` - Search for the word "git" in all files of all commits

### ![](https://i.imgur.com/2lK00uT.png) VS Code Commands
- `Ctrl + P` - Open the file search
- `Ctrl + Shift + P` - Open the command palette
- `Ctrl + D` - Multi select (highlight a word and then press multiple times to select all words to type and replace)
- `Ctrl + V` - Copy Line (Copy full line of code down once)
- `Ctrl + Space` - Autocomplete the word (and auto import)
- `Ctrl + Shift + K` - Delete the current code line

### ![](https://i.imgur.com/yTEUQ3I.png) Chrome Shortcuts
- `Ctrl + Shift + J` - Open Chrome dev tools console

> [^ Back To Top](#table-of-contents)

## Updating Versions

### ![](https://i.imgur.com/ufPLPqy.png) NPM and ![](https://i.imgur.com/IXZDNL8.png) Yarn
- `npm --version` - Check the current installed version of npm
- `npm install -g npm` - Install globally the latest stable version of npm
- `yarn --version` - Check the current installed version of yarn
- `npm install -g yarn@v1.22.19` - Install globally a specific version of yarn (check [Yarn Windows Releases](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) for the latest version)

### ![](https://i.imgur.com/EvX1vFR.png) Node
- `node --version` - Check the current installed version of node
- `nvm ls` - Find out which versions of Node.js you may have installed and which one of those you're currently using
- `nvm ls available` - List all versions of Node.js available for installation
- `nvm install 8.1.0` - Install a specific version of Node (check https://nodejs.org/en/ for the latest version)
> Note - you can also use `npm install -g node@v16.18` - Install globally a specific version of node
- `nvm use 4.2` - Switch between the installed versions on your machine

> References
>
> 1. [How Do I Update NodeJS](https://stackoverflow.com/questions/8191459/how-do-i-update-node-js)
> 2. [NVM Windows Releases](https://github.com/coreybutler/nvm-windows/releases) - NVM latest release - use "nvm-setup.exe"

> [^ Back To Top](#table-of-contents)

## Project Set Up

### Decide on Architecture

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

### Create the New App

#### ![](https://i.imgur.com/LMShXOo.png) CRA (Create React App)
  - `npx create-react-app my-app` - Create a new React app called "my-app"
  - `npx create-react-app my-app --template typescript` - Create a new React app called "my-app" with TypeScript
  - `cd my-app` - Change directory to the new React app
  - `npm start` - Start the React app
  - `npm run build` - Build the React app for production
#### ![](https://i.imgur.com/smpppHt.png) Vite
  - JavaScript and npm
    - `npm create vite@latest my-app --template react` - Create a new React app called "my-app"
    > Note - npm 7+, extra double-dash is needed: `npm create vite@latest my-app -- --template react`
    - `cd my-app` - Change directory to the new React app
    - `npm install` - Install the dependencies
    - `npm run dev` - Start the React app
    - `npm run build` - Build the React app for production
  - Typescript and yarn
	- `yarn create vite@latest my-app --template react-ts` - Create a new React app called "my-app" with TypeScript
	- `cd my-app` - Change directory to the new React app
	- `yarn` - Install the dependencies
	- `yarn dev` - Start the React app
	- `yarn build` - Build the React app for production
#### ![](https://i.imgur.com/OGtWPsT.png) Next.JS
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

### Initiate a Git Repository and link to ![](https://i.imgur.com/zD0C9oF.png) GitHub

- Create a new repository on GitHub
- In the app terminal, initiate git and push to GitHub (replace the below GitHub URL with your own);
```
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

### ![](https://i.imgur.com/ebsMde1.png) ESLint and ![](https://i.imgur.com/IJ3Ksm0.png) Prettier Config

- Copy over the .eslintrc.json and .prettierrc set ups from a good project (e.g. Dorkinians Mobile Stats)
- Make changes if any are required
- Consider the below references if needed

> References
>
> 1. [React + TypeScript + ESLint + Prettier Full Setup](https://dev.to/suchintan/reacttypescripteslint-prettier-full-setup-p7j)
> 2. [How to properly set up Prettier in less than 2 minutes](https://dev.to/bokub/how-to-properly-set-up-prettier-in-less-than-2-minutes-2ld0)

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
- For Next.JS, you can create .env variables with any name (no prefix needed) and they will be available in the browser
  - Example: `API_KEY=1234567890`
  - You can then use the variable in the code as `process.env.API_KEY`
  - [See this article](https://nextjs.org/docs/basic-features/environment-variables)

> References
>
> 1. [Hiding Secret Keys in React](https://www.pluralsight.com/guides/hiding-secret-keys-in-create-react-app)

### ![](https://i.imgur.com/zD0C9oF.png) GitHub Workflows

- Create the folder structure .github/workflows at the root folder
- Copy over the workflow .yml files from a good project (e.g. Dorkinians Mobile Stats)
  - CI.yml
  - CD.yml
  - CodeQL.yml
  - dependencyReview.yml
  - dependabot.yml
- Modify any details of the workflow to suit your needs

### ![](https://i.imgur.com/BUzlvBh.png) Testing

- Set up testing throughout the application based on its requirements
- [Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
  - Static tests (ESLint, TypeScript) - Done automatically in VS Code e.g. typos and type errors
  - Unit tests (Jest)
  - Integration tests (React Testing Library / Cypress)
  - E2E tests (Cypress)

### ![](https://i.imgur.com/reePUUY.png) Deployment

- Set up deployment to the hosting service of choice
- Recommend Netlify for a simple deployment

### Documentation

- Set up documentation for the project via a README.md file
- Write from scratch or use a template such as [readme.so](https://readme.so/)

### Optional Extras

- Web Analytics
  - Google Analytics
  - [GoatCounter](https://www.goatcounter.com/?ref=console.dev)
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

### 404 Page

- Create a 404 page for catching routing errors
  - [error404.fun](https://error404.fun/)
- Consider if additional 404 pages are required for other errors, such as 500, 503, etc.

### Page Speed Testing

- Check the speed of the app and improve where possible
  - Use Chrome DevTools LightHouse tool
  - [GTmetrix](https://gtmetrix.com/)
  - [HTML & CSS Features, Tips For a 10x fast Page Loading Speed](https://levelup.gitconnected.com/html-css-features-tips-for-a-10x-fast-page-loading-speed-5fb6c2d88df8)
  - [Everything you need to know about Web Performance (in 5 Minutes)](https://dev.to/vue-storefront/everything-you-need-to-know-about-web-performance-as-a-dev-in-5-minutes-450l)

### ![](https://i.imgur.com/zD0C9oF.png) GitHub Information

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

## ![](https://i.imgur.com/2xve41Z.png)  Git Fixes

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