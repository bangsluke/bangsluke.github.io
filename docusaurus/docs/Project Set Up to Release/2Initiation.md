---
slug: /project-set-up-to-release/initiation
description: The initiation phase of setting up the project
---

# Initiation

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

:::info
See [Code](../SDLC/code) for more information on the code (implementation) phase of the SDLC.
:::

## Create the New App

### Boilerplate Code

- Consider using <Tooltip text="boilerplate" definition="Starter code or a template project used to begin a new app with a standard structure and config." /> code to get started, as listed <a href="https://todoist.com/showTask?id=6518989300&sync_id=6518989300" target="_blank">here</a>

### CRA (Create React App)

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />

<PageBreak displayLine={false} size="1rem" />

- `npx create-react-app my-app` - Create a new React app called "my-app"
- `npx create-react-app my-app --template typescript` - Create a new React app called "my-app" with TypeScript
- `cd my-app` - Change directory to the new React app
- `npm start` - Start the React app
- `npm run build` - Build the React app for production

### Vite

<img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />

<PageBreak displayLine={false} size="1rem" />

- To use Vite with Yarn and TypeScript do the following;
  - `yarn create vite my-app --template react-ts`
  - Then follow the instructions in the terminal
    - Note: For "package name" use the name of the app
  - For other possible Vite options see <a href="https://vitejs.dev/guide/#scaffolding-your-first-vite-project" target="_blank">here</a>
- `cd my-app` - Change directory to the new React app
  - `yarn` - Install the dependencies
  - `yarn dev` - Start the React app
  - `yarn build` - Build the React app for production

### Next.js

<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />

<PageBreak displayLine={false} size="1rem" />

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

<PageBreak />

## Initiate a Git Repository and link to GitHub

<img src="https://img.shields.io/badge/Git-EA5436?style=for-the-badge&logo=git&logoColor=white" alt="Git" />

<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />

<PageBreak displayLine={false} size="1rem" />

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
- Add a .gitignore file to the root of the project

### <Tooltip text="Branching Strategy" definition="A convention for how branches are created, named, and merged in a Git repository to manage parallel work and releases." /> {#branching-strategy}

Choose a branching strategy and stick to it from the start:

- **Recommended for solo developers:** <Tooltip text="GitHub Flow" definition="A lightweight branching model where feature branches are created from main, reviewed via pull requests, and merged back into main." /> - create short-lived feature branches off `main`, merge via pull requests after review
- **Alternative:** <Tooltip text="GitFlow" definition="A branching model with long-lived develop and main branches plus feature, release, and hotfix branches. Suited to scheduled release cycles." /> with a `develop` branch - more ceremony, but useful if you want a staging buffer before production

### Branch Protection

Set up <Tooltip text="branch protection rules" definition="GitHub settings that prevent direct pushes to important branches and require conditions (e.g. passing CI, PR approval) before merging." /> on your `main` branch:

- Require pull requests before merging (no direct pushes)
- Require status checks to pass (CI pipeline) before merging
- In GitHub: Settings > Branches > Add branch protection rule for `main`

:::tip[Solo Dev PRs]
Even working solo, use pull requests. They create a review checkpoint, a searchable history of changes, and a natural place for AI code review tools to provide feedback. A PR also ensures your CI pipeline runs before code reaches `main`.
:::

<PageBreak />

## Structure and File Setup

### Folder and File Structure

#### Folder Structure

- Create a folder structure that makes sense for the project
  - For a React project, have the following set up
    > Note, this structure is based off of the <a href="https://github.com/alan2207/bulletproof-react" target="_blank">Bulletproof React</a> project

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
  - <a href="https://github.com/bangsluke/bangsluke.github.io/blob/main/FolderStructureCommand.md" target="_blank">Folder Structure Command.md</a>

#### Component Set Up

See point 4 of <a href="https://medium.com/@renanolovics/10-best-practices-in-front-end-development-react-5277a671e2df" target="_blank">10 Best Practices in Front End Development (React)</a>

Structure your components in the following way, using Export Barrelling (point 2);

```n/a
--components:
----Button
------index.ts (exports everything necessary)
------types.ts
------styles.css
------utils.ts
------component.tsx
----Icon
------index.ts (exports everything necessary)
------types.ts
------styles.css
------utils.ts
------component.tsx
----Input
------index.ts (exports everything necessary)
------types.ts
------styles.css
------utils.ts
------component.tsx
```

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

  - <a href="https://www.toptal.com/developers/gitignore" target="_blank">Gitignore.io</a> is a great resource to generate a .gitignore file for your project

### <Tooltip text=".env" definition="A file (usually not committed) that holds environment-specific variables like API keys and config." /> Files and Variables {#env-files-and-variables}

- To securely store environment variables, create a .env file in the root of the project
- Then create a .gitignore file in the root of the project and add the .env file to it
- For CRA, you can create .env variables named as `REACT_APP_` and they will be available in the browser
  - Example: `REACT_APP_API_KEY=1234567890`
  - You can then use the variable in the code as `process.env.REACT_APP_API_KEY`
  - <a href="https://create-react-app.dev/docs/adding-custom-environment-variables/" target="_blank">See this article</a>
- For Vite, you can create .env variables named as `VITE_` and they will be available in the browser
  - Example: `VITE_API_KEY=1234567890`
  - You can then use the variable in the code as `import.meta.env.VITE_API_KEY`
  - <a href="https://vitejs.dev/guide/env-and-mode.html#env-files" target="_blank">See this article</a>
- For Next.JS;
  - Example: `API_KEY=1234567890`
  - If you're just working in Node.JS, you can then use the variable in the code as `process.env.API_KEY`
  - If you're working in the browser, you have to prefix the variable in the code as `process.env.NEXT_PUBLIC_API_KEY`
  - <a href="https://nextjs.org/docs/basic-features/environment-variables" target="_blank">See this article</a>
  - <a href="https://frontend-digest.com/environment-variables-in-next-js-9a272f0bf655" target="_blank">Read this Medium story if still have issues</a>

> References

> 1. <a href="https://www.pluralsight.com/guides/hiding-secret-keys-in-create-react-app" target="_blank">Hiding Secret Keys in React</a>

### <Tooltip text="Pre-commit Hooks" definition="Scripts that run automatically before a commit is created, typically used to lint, format, and validate code before it enters version control." /> {#pre-commit-hooks}

Set up pre-commit hooks to catch issues before code ever reaches a pull request. Use <a href="https://typicode.github.io/husky/" target="_blank">Husky</a> + <a href="https://github.com/lint-staged/lint-staged" target="_blank">lint-staged</a> to automate this:

```powershell
npx husky init
npm install --save-dev lint-staged
```

Configure lint-staged in your `package.json` to run on staged files:

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```

Your pre-commit hooks should run:

- **Linting and formatting** - catch style violations instantly
- **Type checking** - if using TypeScript, run `tsc --noEmit`
- **Secrets scanning** - use <a href="https://github.com/gitleaks/gitleaks" target="_blank">gitleaks</a> or <a href="https://github.com/awslabs/git-secrets" target="_blank">git-secrets</a> to prevent accidental credential commits

:::info
See [Code - Pre-Commit Hooks](../SDLC/code#pre-commit-hooks) for more detail on what to include in pre-commit hooks.
:::

<PageBreak />

### <Tooltip text="ESLint" definition="A tool that analyzes JavaScript/TypeScript code for bugs, style issues, and best-practice violations." /> and <Tooltip text="Prettier" definition="A code formatter that enforces a consistent style (indentation, quotes, line breaks) across the codebase." /> Config {#eslint-and-prettier-config}

<img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier" />

<PageBreak displayLine={false} size="1rem" />

- Copy over the .eslintrc.json and .prettierrc set ups from a good project (e.g. Dorkinians Mobile Stats)
- Make changes if any are required
- Adopt an established <Tooltip text="coding standard" definition="A set of guidelines and conventions for how code should be written, formatted, and structured within a team or project." /> rather than inventing your own:
  - **JavaScript/TypeScript:** <a href="https://github.com/airbnb/javascript" target="_blank">Airbnb</a> or <a href="https://standardjs.com/" target="_blank">Standard</a>
  - **React:** Extend the Airbnb config with `eslint-config-airbnb`
- Consider the below references if needed

:::info
See [Code - Code Quality](../SDLC/code#code-quality) for more detail on coding standards and how they prevent bugs.
:::

> References
>
> 1. <a href="https://dev.to/suchintan/reacttypescripteslint-prettier-full-setup-p7j" target="_blank">React + TypeScript + ESLint + Prettier Full Setup</a>
> 2. <a href="https://dev.to/bokub/how-to-properly-set-up-prettier-in-less-than-2-minutes-2ld0" target="_blank">How to properly set up Prettier in less than 2 minutes</a>

### React Set Up

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />

<PageBreak displayLine={false} size="1rem" />

If using React, consider the following links:

- <a href="https://medium.com/@perisicnikola37/dont-use-react-imports-like-this-use-wrapper-pattern-instead-b7a49b864ff4" target="_blank">Don't use React imports like this. Use Wrapper Pattern instead</a> - wrapper to go around library imports

## <Tooltip text="GitHub Workflows" definition="Automated jobs (CI/CD, checks) that run on GitHub when you push, open a PR, or on a schedule." /> {#github-workflows}

<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />

<PageBreak displayLine={false} size="1rem" />

- Create the folder structure .github/workflows at the root folder
- Copy over the workflow .yml files from a good project (e.g. Dorkinians Mobile Stats)
  - CI.yml
  - CD.yml
  - CodeQL.yml
  - dependencyReview.yml
  - dependabot.yml
- Modify any details of the workflow to suit your needs
- Add automated linting to CI/CD
  - <a href="https://github.com/github/super-linter#filter-linted-files" target="_blank">Super Linter GitHub</a>

### <Tooltip text="CI Pipeline" definition="Continuous Integration pipeline: an automated sequence of steps (lint, build, test, scan) that runs on every code change to validate quality." /> Design {#ci-pipeline-design}

:::info
See [Integrate - CI Pipeline Design](../SDLC/integrate#ci-pipeline-design) for comprehensive CI pipeline guidance.
:::

Structure your CI pipeline to follow this order (cheapest/fastest checks first):

1. **Lint and Format** - catch style violations instantly
2. **Type Check** - catch type errors (`tsc --noEmit`)
3. **Build** - verify the app compiles
4. **Unit Tests** - run fast, isolated tests
5. **Integration Tests** - verify cross-module contracts
6. **Security Scan** - check for known vulnerabilities (CodeQL, Snyk)
7. **Deploy** - only if all above pass

:::tip[Fail Fast]
Order your CI pipeline so the fastest checks run first. If linting fails in 10 seconds, there is no point running a 5-minute test suite. This saves CI minutes and gives you faster feedback.
:::

### Automated Dependency Updates

Set up <Tooltip text="Dependabot" definition="A GitHub tool that automatically creates pull requests to update outdated or vulnerable dependencies in your project." /> or <a href="https://www.mend.io/renovate/" target="_blank">Renovate</a> to keep dependencies current:

- **Dependabot:** Add a `dependabot.yml` to `.github/` (already included in the workflow files above)
- Configure it to open PRs weekly for patch/minor updates and flag major updates for manual review
- Never let dependencies go unpatched for months - automated PRs make this near-effortless

## Cursor/Antigravity Project Rules

<img src="https://img.shields.io/badge/Cursor-000000?style=for-the-badge&logo=cursor&logoColor=white" alt="Cursor" />
<img src="https://img.shields.io/badge/Antigravity-2F8EF5?style=for-the-badge&logo=antigravity&logoColor=white" alt="Antigravity" />

<PageBreak displayLine={false} size="1rem" />

If using either Cursor or Antigravity, you will already have a User Rule/Global Rule set up (see <a href="obsidian://open?vault=Obsidian%20Personal%20Notes&file=01%20Notes%2F02%20Areas%2FLife%20Notes%2FCoding%20Notes%2FAI%20Vibe%20Code%20Prompts" target="_blank">my Obsidian note on AI Prompts here</a>).

For setting up the Project Rules, you can follow the notes in the Obsidian notes or follow below:

- To set up Project rules, open the project in Cursor and then follow the instructions in the following link to automatically set up the correct Project rule files for your project.
  - [GitHub - Renvia-code/best-cursor-rules: Best Cursor Rules is a curated collection of 33 high-quality Cursor AI rules that actually work. Includes a Setup Wizard that analyzes your project and generates customized rules automatically.](https://github.com/Renvia-code/best-cursor-rules)
- Answer the questions in the Setup Wizard to generate the correct Project rule files for your project.

:::note
If you are using Antigravity, ensure that you copy the rules generated in Cursor over into the Rules section of Antigravity - Settings.
:::

<PageBreak />

## Development Environment Consistency

Ensure that anyone (including future-you) can set up and run the project quickly and reliably.

### Minimum: Documented Setup

- Include a clear "Getting Started" section in your README with every command needed to run the project from a fresh clone
- Specify the required Node.js version (use a `.nvmrc` or `.node-version` file)
- List any system-level dependencies (e.g. database, Redis)

### Recommended: <Tooltip text="Dev Containers" definition="Pre-configured, reproducible development environments packaged in containers (e.g. Docker) that ensure every developer works in an identical setup." /> {#dev-containers}

For any project you might hand off or return to after a break, consider a Dev Container configuration:

- Create a `.devcontainer/devcontainer.json` in the project root
- Specify the base image, extensions, port forwarding, and post-create commands
- Works with VS Code, Cursor, and GitHub Codespaces

:::note
For solo projects, a well-written README setup section is the minimum. For any project you might hand off to someone else or return to after months, a Dev Container config eliminates "works on my machine" problems entirely.
:::
