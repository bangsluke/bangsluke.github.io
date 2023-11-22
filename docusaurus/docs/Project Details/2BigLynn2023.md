<p align="center">
  <img src="https://i.imgur.com/OhMP4b0.png" alt="Big Lynn Logo" width="200"></img>
</p>

# Big Lynn 2023

An information page for the Big Lynn 2023 golf competition including details and stats from past years.

## Live Site

The live site can be found at [biglynn2023.netlify.app/info](https://biglynn2023.netlify.app/info)

## Start Up

Use `yarn dev` to start up the tool and it will be available at [localhost:3000](http://localhost:3000/)

Look at package.json for other commands.

## Data Source

All the data for the site is stored in [Google Sheets](https://docs.google.com/spreadsheets/d/13vUKIiVuYGmoSFvf2TNKi9lLDjgg3-fvDbC9E1GvHuo/edit#gid=0)

## Update The Data

The best way to quickly update the data from the Google Sheet is to use the SheetDB.io service, detailed [fully below](#sheetdbio).

Steps:

1. Go to [SheetDB.io](https://sheetdb.io/)
2. Sign in using Google Account
3. On the StatsSection.tsx, change the constant `dataMethod` to be `DataMethods.sheetDBio`
4. Two axios calls will be made via the sheetDBio API, which can be seen on the web page
5. Run the main page and in the console logs, the response from the API will be shown
6. Copy and paste the response into the `savedDataResponse.ts` file in the `data` folder
7. Once done, return the `dataMethod` to be `DataMethods.savedData`

## Possible Data Sources

### Google Sheets API

Used the following links to get the sheet API working

- [Google Sheets as a Database for Next.js](https://www.andredevries.dev/posts/google-sheets-database-nextjs)
- [Authenticating Google Sheets](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication)

Steps (using above links):

1. Create a service account in the Google Cloud Console ([Getting Started](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account))

### SheetDB.io

Really simple method of creating a REST API for a Google Sheet. [SheetDB.io](https://sheetdb.io/)

> Note: There is a 500 API request per month limit though before you have to begin paying for the service which is expensive. See [SheeDB.io Usage](https://sheetdb.io/app/statistics/usage)" for usage

1. Either install and use axios (yarn add axios) or use the SheetDB.io library (npm install sheetdb-js --save).
2. Create an API for the Google Sheet using the SheetDB.io website at "[SheetDB.io/app/api](https://sheetdb.io/app/api)". All you need to do is copy across the URL from the Google Sheet and paste it into the SheetDB.io website.
3. If you call a get request on the API, e.g. axios.get("https://sheetdb.io/api/v1/sob72d8vw4tpv").then((response), then all of the data on the first sheet of the Google Sheet will be returned. To instead select a sheet, add ?sheet=SheetName to the end of the URL, e.g. axios.get("https://sheetdb.io/api/v1/sob72d8vw4tpv?sheet=Sheet1").then((response). See "https://docs.sheetdb.io/?html--javascript#multiple-sheets-tabs" for more details.
