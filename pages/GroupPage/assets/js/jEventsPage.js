// jEventsPage.js JavaScript Functions

// Wait for the window to load and then run the init function below.
window.addEventListener('DOMContentLoaded', init)

// Immediately update the page header.
function init() {
    var element = document.getElementById("pageMainHeader"); // Grab the very top title element.
    element.innerHTML = "Events"; // Set the title to be correct.
}