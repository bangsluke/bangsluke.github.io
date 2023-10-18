# Git Fixes

![Git Logo](https://i.imgur.com/2xve41Z.png)

## Error: Unable to load Commits. fatal: bad object desktop.ini

Summary: Bad desktop.ini file that is created by Google Drive. Needs to be deleted.

### Delete all desktop.ini files

1. Run CMD as administrator
2. Navigate to the folder where the bad file is using `cd`
3. Delete all "desktop.ini" files in the folder and all sub-folders using `del desktop.ini /A:H /S`
4. Reload the git graph extension and the error should have gone

### Manually delete each desktop.ini file with explanations

1. Run CMD as administrator
2. Navigate to the folder where the bad file is using `cd`
3. Show all files in the folder along with their marked attributes using `attrib`
4. Any hidden file has an "H" file attribute next to it
5. Remove the hidden attribute of the file using `attrib -h desktop.ini`. Note, if there are more than one attribute, you need to remove all of them for this command to work (see link 3)
6. Delete the file using `del desktop.ini`
7. Continue for all files that need to be deleted
8. Reload the git graph extension and the error should have gone

> References
>
> 1. [Explanation Link](https://iamalsojohn.wordpress.com/2018/04/18/git-google-drive-and-bad-references/)
> 2. [Show Hidden Files](https://www.computerhope.com/issues/ch001464.htm)
> 3. [Remove Attributes from Files](https://answers.microsoft.com/en-us/windows/forum/all/unable-to-remove-system-attribute-not-resetting/a68ca5b6-2c4d-4055-9219-1bf6944766ad)
> 4. [Delete All Hidden Files](https://www.windows-commandline.com/show-delete-hidden-files-command-prompt/)

## Clearing Secrets from History

Summary:

- Create a text file at the parent folder of the repo (not in the repo) of the replacements you need to make such as "BigLynnReplacements.txt"
- Each line is a new replacement, e.g.;
	`‘xau_8Q9v6YrRzXgPcSvgjOvVbYEwkKm1lgBo4’==>ENV[‘XATA_API_KEY’]` would replace the API key with the environment variable name
- Copy the file "git-filter-repo" from Personal Coding into the repo
- Open the CMD for the repo
- Use the command `git filter-repo --replace-text ../BigLynnReplacements.txt --force` to go through the history of the repo and make all the required replacements

> References
>
> 1. [Rewriting Git History Cheatsheet](https://blog.gitguardian.com/rewriting-git-history-cheatsheet/)
