# Structure and File Setup

## Folder and File Structure

### Folder Structure

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

### File Set Up

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

## .env Files and Variables

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

## ESLint and Prettier Config

![ESLint Logo](https://i.imgur.com/ebsMde1.png) ![Prettier Logo](https://i.imgur.com/IJ3Ksm0.png)

- Copy over the .eslintrc.json and .prettierrc set ups from a good project (e.g. Dorkinians Mobile Stats)
- Make changes if any are required
- Consider the below references if needed

> References
>
> 1. [React + TypeScript + ESLint + Prettier Full Setup](https://dev.to/suchintan/reacttypescripteslint-prettier-full-setup-p7j)
> 2. [How to properly set up Prettier in less than 2 minutes](https://dev.to/bokub/how-to-properly-set-up-prettier-in-less-than-2-minutes-2ld0)
