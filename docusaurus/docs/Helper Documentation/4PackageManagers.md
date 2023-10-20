# Package Managers

Before defaulting to NPM or Yarn, consider using [PNPM](https://pnpm.io/).

## NPM

![NPM Logo](https://i.imgur.com/ufPLPqy.png)

### NPM Commands

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

### NPM Updates

- `npm --version` - Check the current installed version of npm
- `npm install -g npm` - Install globally the latest stable version of npm

## Yarn

![Yarn Logo](https://i.imgur.com/IXZDNL8.png)

### Yarn Commands

For more commands, see this [cheatsheet](https://devhints.io/yarn).

- `yarn --version` - Check the current installed version of yarn
- `yarn init` - Create a new package.json file
- `yarn` - Install all packages defined in package.json - same as `npm install`
- `yarn add <package>` - Install a package - same as `npm install <package>`
- `yarn add <package> --dev` - Install a package as a dev dependency
- `yarn upgrade` - Update all packages - same as `npm update`

### Yarn Updates

- `yarn --version` - Check the current installed version of yarn
- `npm install -g yarn@v1.22.19` - Install globally a specific version of yarn (check [Yarn Windows Releases](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) for the latest version)

### Yarn Package Updates

- [Link](https://classic.yarnpkg.com/lang/en/docs/cli/upgrade/) to all documentation
- `yarn upgrade` - Upgrade all packages to their latest version
- `yarn upgrade left-pad` - Upgrade a specific package to its latest version
- `yarn upgrade left-pad@^1.0.0` - Upgrade a specific package to a specific version
- `yarn upgrade left-pad grunt` - Upgrade multiple packages to their latest version
- `yarn upgrade @angular` - Upgrade all packages with the name @angular to their latest version
- `yarn upgrade --latest` - Upgrade all packages to their latest version
- `yarn upgrade left-pad --latest` - Upgrade a specific package to its latest version
- `yarn remove left-pad` - Removes a specific package

## PNPM Commands

![PNPM Logo](https://i.imgur.com/1YKlWVX.png)

- [Link](https://pnpm.io/) to all documentation
- [Introduction article](https://javascript.plainenglish.io/what-is-pnpm-why-you-should-try-it-as-a-frontend-developer-8dc3853c1ba1)

## Node

![Node Logo](https://i.imgur.com/EvX1vFR.png)

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

## Switching Package Managers

### From NPM to Yarn

![NPM Logo](https://i.imgur.com/ufPLPqy.png) > ![Yarn Logo](https://i.imgur.com/IXZDNL8.png)

- Install yarn using `npm i -g yarn` if not already installed
- Go to the directory where you install packages and run the `yarn` command
- Yarn will init and create its `yarn.lock` file
- Now delete `package-lock.json` `*Note`
- In your `package.json` file replace all npm commands with yarn in "scripts"
- Run `yarn dev` or whatever command you use for running a yarn script

> `*Note`: It is important you don't delete it before yarn command (as some people suggest) it can break things, for example your yarn command will not even work and it will throw error:
`Error: ENOENT: no such file or directory, open './package-lock.json'`

> References
>
> 1. [How do I switch from npm to yarn](https://stackoverflow.com/a/71481424)

### From Yarn to PNPM

Migrating from yarn to pnpm is quite straightforward:

- Install pnpm `npm install -g pnpm` if not already installed
- Rename all your yarn commands to pnpm:
	- `yarn` -> `pnpm install`
	- `yarn test` -> `pnpm test`
	- `yarn package` -> `pnpm package`
	- `yarn deploy` -> `pnpm run deploy` (**run** is required here, as `pnpm deploy` is a reserved command)
- Replace all occurrences of the string `yarn.lock` in your source files with `pnpm-lock.yaml` (search, prettier, etc.)
- In your CI/CD, when using `actions/setup-node@v3`, set `cache` to `'pnpm'`
- If you're using yarn PnP, remove `.yarnrc.yml` and the `.yarn` folder
- In the root `package.json` set the packageManager key to `pnpm@<version>` (replace `<version>` with the latest available version)
- Create a `pnpm-workspace.yaml` file with:

	```yaml
	packages:
	- 'services/*'
	- 'contracts/*'
	- 'packages/*'
	```

	and everything that is in the `workspaces` key of the root `package.json`
- Run `pnpm import` to generate a `pnpm-lock.yaml` from your `yarn.lock`, then remove `yarn.lock`
- Run `pnpm install`

> References
>
> 1. [Swarmion - From Yarn to PNPM](https://www.swarmion.dev/docs/how-to-guides/migration-guides/yarn-to-pnpm/#:~:text=Migrating%20from%20yarn%20to%20pnpm%20is%20quite%20straightforward%3A,remove%20.yarnrc.yml%20and%20the%20.yarn%20folder%20More%20items)
