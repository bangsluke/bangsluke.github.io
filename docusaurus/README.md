# Docusaurus

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Table of Contents

- [Docusaurus](#docusaurus)
  - [Table of Contents](#table-of-contents)
  - [Before Starting](#before-starting)
    - [Installation](#installation)
    - [MDX Checking](#mdx-checking)
    - [Local Development](#local-development)
    - [Build](#build)
    - [Deployment](#deployment)

## Before Starting

Use `cd docusaurus` to navigate to the root of the website. Then `yarn dev` to start a local development server.

### Installation

```bash
yarn
```

### MDX Checking

To check the MDX files are formatted correctly, use `npx docusaurus-mdx-checker`

### Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## PWA and Offline Support

This site is configured as a Progressive Web App (PWA) using `@docusaurus/plugin-pwa`. It allows users to install the documentation as an app and access content offline.

### Features

- **Offline Access**: The entire site is precached upon installation. Users can browse all documentation pages without an internet connection.
- **Offline Ready Indicator**: A popup notification ("Ready for offline use") appears when the offline cache has fully downloaded.

### Validating Offline Mode Locally

Service Workers require a production build to function. To test offline capabilities locally:

1. Build the project:
   ```bash
   npm run build
   ```
2. Serve the build:
   ```bash
   npm run serve
   ```
3. Test the "Downloading" popup (simulates a fresh install):
   - Open `http://localhost:3000/?offlineMode=true` in your browser.
