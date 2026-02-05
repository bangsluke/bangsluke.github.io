---
slug: /general-documentation/installing-and-updating-versions
description: Installing and updating versions of NPM, Yarn, PNPM, and Node
---

# Installing and Updating Versions

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

Before defaulting to <Tooltip text="NPM" definition="Node Package Manager: the default package manager for Node.js, used to install and manage JavaScript dependencies." /> or <Tooltip text="Yarn" definition="A fast, alternative package manager for Node.js that installs and manages JavaScript dependencies." />, consider using <a href="https://pnpm.io/" target="_blank"><Tooltip text="PNPM" definition="A disk-efficient Node.js package manager that uses a single global store and symlinks to reduce duplication." /></a>.

## NPM

<img src="https://img.shields.io/badge/NPM-CD3E3D?style=for-the-badge&logo=npm&logoColor=white" alt="NPM" />

### NPM Download

- <a href="https://nodejs.org/en/download/" target="_blank">https://nodejs.org/en/download/</a>

### NPM Updates

- `npm --version` - Check the current installed version of npm
- `npm install -g npm` - Install globally the latest stable version of npm

> Note - for any issues with the above, follow the 'Upgrade with npm-windows-upgrade' part of the <a href="https://stackoverflow.com/a/31520672" target="_blank">this link</a>

<PageBreak />

## Yarn

<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" alt="Yarn" />

### Yarn Download

- `npm install --global yarn` - (<a href="https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable" target="_blank">https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable</a>)

### Yarn Updates

- `yarn --version` - Check the current installed version of yarn
- `npm install -g yarn@v1.22.19` - Install globally a specific version of yarn (check <a href="https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable" target="_blank">Yarn Windows Releases</a> for the latest version)

<PageBreak />

## PNPM

<img src="https://img.shields.io/badge/pnpm-F9B008?style=for-the-badge&logo=pnpm&logoColor=white" alt="PNPM" />

### PNPM Download

- `npm install -g pnpm` - (<a href="https://pnpm.io/" target="_blank">https://pnpm.io/</a>)

### PNPM Updates

- `pnpm --version` - Check the current installed version of pnpm
- `npm install -g pnpm@v1.22.19` - Install globally a specific version of pnpm (check <a href="https://pnpm.io/" target="_blank">PNPM Releases</a> for the latest version)

### PNPM Documentation

- <a href="https://pnpm.io/" target="_blank">Link</a> to all documentation
- <a href="https://javascript.plainenglish.io/what-is-pnpm-why-you-should-try-it-as-a-frontend-developer-8dc3853c1ba1" target="_blank">Introduction article</a>

<PageBreak />

## Node.js

<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=black" alt="Node.js" />

### Node Commands

The following use <Tooltip text="nvm" definition="Node Version Manager: a tool to install and switch between multiple versions of Node.js on the same machine." />:

- `node --version` - Check the current installed version of node
- `nvm ls` - Find out which versions of Node.js you may have installed and which one of those you're currently using
- `nvm ls available` - List all versions of Node.js available for installation
- `nvm install 8.1.0` - Install a specific version of Node (check <a href="https://nodejs.org/en/" target="_blank">node.js</a> for the latest version)

> Note - you can also use `npm install -g node@v16.18` - Install globally a specific version of node

- `nvm use 4.2` - Switch between the installed versions on your machine
- Re-run `node --version` to check the new version is being used

> Note - if after using `nvm use`, you find yourself still using the old version, you can fix this by deleting the `C:\Program Files\nodejs` folder and then running `nvm use` again (ref 3)

> References
>
> 1. <a href="https://stackoverflow.com/questions/8191459/how-do-i-update-node-js" target="_blank">How Do I Update NodeJS</a>
> 2. <a href="https://github.com/coreybutler/nvm-windows/releases" target="_blank">NVM Windows Releases</a> - NVM latest release - use "nvm-setup.exe"
> 3. <a href="https://stackoverflow.com/a/55131758" target="_blank">nvm use does not switch node versions</a>
