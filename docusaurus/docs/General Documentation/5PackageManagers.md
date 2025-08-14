# Package Managers

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

Before defaulting to NPM or Yarn, consider using <a href="https://pnpm.io/" target="_blank">PNPM</a>.

## NPM

![NPM Logo](https://i.imgur.com/ufPLPqy.png)

### NPM Commands

For more commands, see this <a href="https://devhints.io/npm" target="_blank">cheatsheet</a>.

#### NPM Initialization

- `npm init` - Create a new package.json file
- `npm i` - Can be used as a shortcut for `npm install`

#### NPM Install

- `npm install` - Install all packages
- `npm install <package>` - Install a package
- `npm install <package> --save-dev` - Install a package as a dev dependency
- `npm install <package> --global` - Install a package globally
- `npm uninstall <package>` - Uninstall a package

#### NPM Update and Audit

- `npm update` - Update all packages
- `npm outdated` - Check for outdated packages
- `npm audit` - Check for vulnerabilities in installed packages
- `npm audit fix` - Fix vulnerabilities in installed packages
- `npm audit fix --force` - Fix vulnerabilities in installed packages and remove outdated packages

#### NPM Run

- `npm run <script>` - Run a script from the package.json file

## Yarn

![Yarn Logo](https://i.imgur.com/IXZDNL8.png)

### Yarn Commands

For more commands, see this <a href="https://devhints.io/yarn" target="_blank">cheatsheet</a>.

#### Yarn Initialization

- `yarn init` - Create a new package.json file

#### Yarn Install

- `yarn` - Install all packages defined in package.json - same as `npm install`
- `yarn add <package>` - Install a package - same as `npm install <package>`
- `yarn add <package> --dev` - Install a package as a dev dependency

#### Yarn Upgrade

- `yarn upgrade` - Update all packages - same as `npm update`

### Yarn Package Updates

- <a href="https://classic.yarnpkg.com/lang/en/docs/cli/upgrade/" target="_blank">Link</a> to all documentation
- `yarn upgrade` - Upgrade all packages to their latest version
- `yarn upgrade left-pad` - Upgrade a specific package to its latest version
- `yarn upgrade left-pad@^1.0.0` - Upgrade a specific package to a specific version
- `yarn upgrade left-pad grunt` - Upgrade multiple packages to their latest version
- `yarn upgrade @angular` - Upgrade all packages with the name @angular to their latest version
- `yarn upgrade --latest` - Upgrade all packages to their latest version
- `yarn upgrade left-pad --latest` - Upgrade a specific package to its latest version
- `yarn upgrade left-pad@^1.0.0 --dev` - Upgrade a specific development dependency package to a specific version
- `yarn remove left-pad` - Removes a specific package

## PNPM Commands

![PNPM Logo](https://i.imgur.com/1YKlWVX.png)

- <a href="https://pnpm.io/" target="_blank">Link</a> to all documentation
- <a href="https://javascript.plainenglish.io/what-is-pnpm-why-you-should-try-it-as-a-frontend-developer-8dc3853c1ba1" target="_blank">Introduction article</a>

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
> 1. <a href="https://stackoverflow.com/a/71481424" target="_blank">How do I switch from npm to yarn</a>

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
> 1. <a href="https://www.swarmion.dev/docs/how-to-guides/migration-guides/yarn-to-pnpm/#:~:text=Migrating%20from%20yarn%20to%20pnpm%20is%20quite%20straightforward%3A,remove%20.yarnrc.yml%20and%20the%20.yarn%20folder%20More%20items" target="_blank">Swarmion - From Yarn to PNPM</a>
