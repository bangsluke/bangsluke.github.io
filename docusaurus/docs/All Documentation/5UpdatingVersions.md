# Updating Versions

Before defaulting to NPM or Yarn, consider using [PNPM](https://pnpm.io/).

## NPM

![NPM Logo](https://i.imgur.com/ufPLPqy.png)

### NPM Updates

- `npm --version` - Check the current installed version of npm
- `npm install -g npm` - Install globally the latest stable version of npm

> Note - for any issues with the above, follow the 'Upgrade with npm-windows-upgrade' part of the following link <https://stackoverflow.com/a/31520672>

## Yarn

![Yarn Logo](https://i.imgur.com/IXZDNL8.png)

### Yarn Updates

- `yarn --version` - Check the current installed version of yarn
- `npm install -g yarn@v1.22.19` - Install globally a specific version of yarn (check [Yarn Windows Releases](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) for the latest version)

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
