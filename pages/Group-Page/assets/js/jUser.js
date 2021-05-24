// jUser.js JavaScript Functions

// User Page scripts

// Wait for the window to load and then run the init function below.
window.addEventListener('DOMContentLoaded', init)

// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {
    getSiteTheme(); // Update the site theme to what the user has selected.
}

// Pass the User Name by setting it in session storage.
function passUserName(user) { // Set the user variable to "this" - see the calling function in the HTML.
    // https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
    var selectedUserName = user.id; // Get the id of the element that called the function. https://stackoverflow.com/questions/7627161/get-id-of-element-that-called-a-function
    sessionStorage.setItem("selectedUserName", selectedUserName); // Save the variable to session storage.
    console.log(selectedUserName);
}