# Tool Commands/Shortcuts

### ![Powershell Logo](https://i.imgur.com/wBg7htx.png) Powershell Commands

- To get to Powershell, you can type `powershell` into the top command line in windows explorer just like `cmd`.
- Navigating Folders and Files
  - `pwd` - To print the current directory
  - `ls` - To list all options in the current folder
  - `ls -la` - List everything in current directory
  - `cd xxx` - To change directory to the next typed characters
  - `cd ~` - To change directory back to the root level
  - `cd ..` - To change directory back up one level
  - `cat xxx` - To print the contents of a file
  - `history` - To print the history of commands
- Modifying Files
  - `mkdir xxx` - To create a new folder with the name of the next typed characters
  - `touch xxx` - To create a new file with the name of the next typed characters
  - `code xxx` - To open a file in VS Code
  - `cp xxx yyy` - To copy a file from xxx to yyy
  - `mv xxx yyy` - To move a file from xxx to yyy
  - `rm xxx` - To remove a file
  - `>` - To overwrite a file, e.g. `echo "Hello World" > hello.txt` will overwrite the file hello.txt with "Hello World"
  - `>>` - To append a call to a file, e.g. `echo "Hello World" >> hello.txt` will append "Hello World" to the end of the file hello.txt
- Aliases
  - To open your bash alias file, navigate to the root folder using `cd ~` and then open using `code .bash_aliases`. This should open the file up in VS Code.
  - `alias` - To print all aliases
  - `alias xxx="yyy"` - To create a new alias, e.g. `alias g="git"` will create an alias for git

### ![Git Logo](https://i.imgur.com/2xve41Z.png) Git Commands

- `git clone https://git.rle.de/deloitte/deloitte-pm-tool.git` - Clone a repo from the provided URL
- `git init` - Initiate a git repository
- `git remote add origin https://github.com/bangsluke/hacker-stories.git` - Add a GitHub repository
- `git branch -M main` - Switch to the main branch
- `git commit -m "Initial commit"` - Commit with the message (-m) "Initial commit"
- `git push -u origin main` - Push to the main branch
- `git fetch --prune` - Fetch all branches and remove remote deleted branches
- `git commit --allow-empty -m 'Empty commit'` - Trigger the CI/CD pipeline with a blank commit
- `git rev-list --all | xargs git grep "git"` - Search for the word "git" in all files of all commits

### ![VS Code Logo](https://i.imgur.com/2lK00uT.png) VS Code Commands

- `Ctrl + P` - Open the file search
- `Ctrl + Shift + P` - Open the command palette
- `Ctrl + D` - Multi select (highlight a word and then press multiple times to select all words to type and replace)
- `Ctrl + Space` - Autocomplete the word (and auto import)
- `Ctrl + Shift + K` - Delete the current code line
- `Alt + Up/Down` - Move the current line up or down
- `Alt + Shift + Up/Down` - Copy the current line up or down

### ![Chrome Logo](https://i.imgur.com/yTEUQ3I.png) Chrome Shortcuts

- `Ctrl + Shift + J` - Open Chrome dev tools console

### ![VBA Logo](https://i.imgur.com/TrsfWN1.png) VBA Shortcuts

- `F5` - Run the current script
- `F8` - Run the current line of code
- `Ctrl + Y` - Delete the current code line

> [^ Back To Top](#table-of-contents)
