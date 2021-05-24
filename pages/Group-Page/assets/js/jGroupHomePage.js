// jGroupHomePage.js JavaScript Functions

// Group Home Page scripts

// Wait for the window to load and then run the init function below.
window.addEventListener('DOMContentLoaded', init)

// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {

    getSiteTheme(); // Update the site theme to what the user has selected.
    var selectedUserName = sessionStorage.getItem("selectedUserName"); // Retrieve the variable passed to session storage.
    console.log("selectedUserName = " + selectedUserName);

}