# Helper Doc

A document containing useful commands, set up, checklists and fixes for projects

## Table of Contents

- [Helper Doc](#helper-doc)
	- [Table of Contents](#table-of-contents)
	- [Powershell Commands/Shortcuts](#powershell-commandsshortcuts)
	- [Git Commands](#git-commands)
	- [Keyboard Shortcuts](#keyboard-shortcuts)
		- [VS Code](#vs-code)
		- [Chrome](#chrome)
	- [Updating Versions](#updating-versions)
		- [NPM and Yarn](#npm-and-yarn)
		- [Node](#node)
	- [Project Set Up](#project-set-up)
		- [Decide on Architecture](#decide-on-architecture)
			- [Front End Architecture](#front-end-architecture)
			- [Back End Architecture](#back-end-architecture)
			- [Database](#database)
			- [Hosting](#hosting)
		- [Create The New App](#create-the-new-app)
	- [Project Release Checklist](#project-release-checklist)
	- [Git Fixes](#git-fixes)
		- [Error: Unable to load Commits. fatal: bad object desktop.ini](#error-unable-to-load-commits-fatal-bad-object-desktopini)
			- [Delete all desktop.ini files](#delete-all-desktopini-files)
			- [Manually delete each desktop.ini file with explanations](#manually-delete-each-desktopini-file-with-explanations)
		- [Clearing Secrets from History](#clearing-secrets-from-history)

## Powershell Commands/Shortcuts
- To get to Powershell, you can type `powershell` into the top command line in windows explorer just like `cmd`.
- `pwd` - To print the current directory
- `ls` - To list all options in the current folder
- `ls -la` - List everything in current directory
- `cd xxx` - To change directory to the next typed characters
- `cd ~` - To change directory back to the root level
- `cd ..` - To change directory back up one level

> [^ Back To Top](#table-of-contents)

## Git Commands
- `git clone https://git.rle.de/deloitte/deloitte-pm-tool.git` - Clone a repo from the provided URL
- `git init` - Initiate a git repository
- `git remote add origin https://github.com/bangsluke/hacker-stories.git` - Add a GitHub repository
- `git branch -M main` - Switch to the main branch
- `git commit -m "Initial commit"` - Commit with the message (-m) "Initial commit"
- `git push -u origin main` - Push to the main branch
- `git fetch --prune` - Fetch all branches and remove remote deleted branches
- `git commit --allow-empty -m 'Empty commit'` - Trigger the CI/CD pipeline with a blank commit
- `git rev-list --all | xargs git grep "git"` - Search for the word "git" in all files of all commits

> [^ Back To Top](#table-of-contents)

## Keyboard Shortcuts

### VS Code
- `Ctrl + D` - Multi select (highlight a word and then press multiple times to select all words to type and replace)
- `Ctrl + V` - Copy Line (Copy full line of code down once)
- `Ctrl + Space` - Autocomplete the word (and auto import)
- `Ctrl + Shift + K` - Delete the current code line

### Chrome
- `Ctrl + Shift + J` - Open Chrome dev tools console

> [^ Back To Top](#table-of-contents)

## Updating Versions

### NPM and Yarn
- `npm --version` - Check the current installed version of npm
- `npm install -g npm` - Install globally the latest stable version of npm
- `yarn --version` - Check the current installed version of yarn
- `npm install -g yarn@v1.22.19` - Install globally a specific version of yarn (check [Yarn Windows Releases](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) for the latest version)

### Node
- `node --version` - Check the current installed version of node
- `nvm ls` - Find out which versions of Node.js you may have installed and which one of those you're currently using
- `nvm ls available` - List all versions of Node.js available for installation
- `nvm install 8.1.0` - Install a specific version of Node (check https://nodejs.org/en/ for the latest version)
> Note - you can also use `npm install -g node@v16.18` - Install globally a specific version of node
- `nvm use 4.2` - Switch between the installed versions on your machine

> Sources
>
> [How Do I Update NodeJS](https://stackoverflow.com/questions/8191459/how-do-i-update-node-js)
>
> [NVM Windows Releases](https://github.com/coreybutler/nvm-windows/releases) - NVM latest release - use "nvm-setup.exe"

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
> - [Which Is Better? SQL vs NoSQL](https://www.youtube.com/watch?v=t0GlGbtMTio&feature=youtu.be&ab_channel=WebDevSimplified)
> - [How To Choose a Database for your App](https://www.youtube.com/watch?v=xGCm_cLxets&feature=youtu.be&ab_channel=Prisma)
> - [Build a TypeScript API with Express, RapidAPI, and Xata](https://www.youtube.com/watch?v=8MjjmCQIdiY&t=3s&ab_channel=JamesQQuick)

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

### Create The New App

- CRA (Create React App)
  - `npx create-react-app my-app` - Create a new React app called "my-app"
  - `npx create-react-app my-app --template typescript` - Create a new React app called "my-app" with TypeScript
  - `cd my-app` - Change directory to the new React app
  - `npm start` - Start the React app
  - `npm run build` - Build the React app for production
- Vite
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
- Next.JS
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

## Project Release Checklist



> [^ Back To Top](#table-of-contents)

## Git Fixes

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

> Reference
>
> 1. [Rewriting Git History Cheatsheet](https://blog.gitguardian.com/rewriting-git-history-cheatsheet/)

> [^ Back To Top](#table-of-contents)