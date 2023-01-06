# Helper Doc

A document containing useful commands and fixes for projects

## Table of Contents

## Powershell Commands/Shortcuts
- To get to Powershell, you can type `powershell` into the top command line in windows explorer just like `cmd`.
- `pwd` - To print the current directory
- `ls` - To list all options in the current folder
- `ls -la` - List everything in current directory
- `cd xxx` - To change directory to the next typed characters
- `cd ~` - To change directory back to the root level
- `cd ..` - To change directory back up one level


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

## Keyboard Shortcuts

### VS Code
- `Ctrl + D` - Multi select (highlight a word and then press multiple times to select all words to type and replace)
- `Ctrl + V` - Copy Line (Copy full line of code down once)
- `Ctrl + Space` - Autocomplete the word (and auto import)

### Chrome
- `Ctrl + Shift + J` - Open Chrome dev tools console


## Versions and Updates

## NPM and Yarn
- `npm --version` - Check the current installed version of npm
- `npm install -g npm` - Install globally the latest stable version of npm
- `yarn --version` - Check the current installed version of yarn
- `npm install -g yarn@v1.22.19` - Install globally a specific version of yarn (check https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable for the latest version)

## Node
- `node --version` - Check the current installed version of node
- `nvm ls` - Find out which versions of Node.js you may have installed and which one of those you're currently using
- `nvm ls available` - List all versions of Node.js available for installation
- `nvm install 8.1.0` - Install a specific version of Node (check https://nodejs.org/en/ for the latest version)
> note - you can also use `npm install -g node@v16.18` - Install globally a specific version of node
- `nvm use 4.2` - Switch between the installed versions on your machine
> Sources
> https://stackoverflow.com/questions/8191459/how-do-i-update-node-js
> https://github.com/coreybutler/nvm-windows/releases - NVM latest release - use "nvm-setup.exe"


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

Link 1: Explanation Link: https://iamalsojohn.wordpress.com/2018/04/18/git-google-drive-and-bad-references/
Link 2: Show Hidden Files: https://www.computerhope.com/issues/ch001464.htm
Link 3: Remove Attributes from Files: https://answers.microsoft.com/en-us/windows/forum/all/unable-to-remove-system-attribute-not-resetting/a68ca5b6-2c4d-4055-9219-1bf6944766ad
Link 4: Delete All Hidden Files: https://www.windows-commandline.com/show-delete-hidden-files-command-prompt/


### Clearing Secrets from History

Summary:

- Create a text file at the parent folder of the repo (not in the repo) of the replacements you need to make such as "BigLynnReplacements.txt"
- Each line is a new replacement, e.g.;
	`‘xau_8Q9v6YrRzXgPcSvgjOvVbYEwkKm1lgBo4’==>ENV[‘XATA_API_KEY’]` would replace the API key with the environment variable name
- Copy the file "git-filter-repo" from Personal Coding into the repo
- Open the CMD for the repo
- Use the command `git filter-repo --replace-text ../BigLynnReplacements.txt --force` to go through the history of the repo and make all the required replacements

> Reference

Link 1: https://blog.gitguardian.com/rewriting-git-history-cheatsheet/