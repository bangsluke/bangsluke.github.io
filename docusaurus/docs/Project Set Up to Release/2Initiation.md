# Initiation

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

## Create the New App

### Boilerplate Code

  - Consider using a boilerplate code to get started, as listed [here](https://todoist.com/showTask?id=6518989300&sync_id=6518989300)

### CRA (Create React App)

![React Logo](https://i.imgur.com/LMShXOo.png)

  - `npx create-react-app my-app` - Create a new React app called "my-app"
  - `npx create-react-app my-app --template typescript` - Create a new React app called "my-app" with TypeScript
  - `cd my-app` - Change directory to the new React app
  - `npm start` - Start the React app
  - `npm run build` - Build the React app for production

### Vite

![Vite Logo](https://i.imgur.com/smpppHt.png)

  - To use Vite with Yarn and TypeScript do the following;
    - `yarn create vite my-app --template react-ts`
    - Then follow the instructions in the terminal
      - Note: For "package name" use the name of the app
    - For other possible Vite options see [here](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
  - `cd my-app` - Change directory to the new React app
	- `yarn` - Install the dependencies
	- `yarn dev` - Start the React app
	- `yarn build` - Build the React app for production

### Next.JS

![NextJS Logo](https://i.imgur.com/OGtWPsT.png)

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

## Initiate a Git Repository and link to GitHub

![GitHub Logo](https://i.imgur.com/zD0C9oF.png)

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

## GitHub Workflows

![GitHub Logo](https://i.imgur.com/zD0C9oF.png)

- Create the folder structure .github/workflows at the root folder
- Copy over the workflow .yml files from a good project (e.g. Dorkinians Mobile Stats)
  - CI.yml
  - CD.yml
  - CodeQL.yml
  - dependencyReview.yml
  - dependabot.yml
- Modify any details of the workflow to suit your needs
- Add automated linting to CI/CD
  - [Super Linter GitHub](https://github.com/github/super-linter#filter-linted-files)
