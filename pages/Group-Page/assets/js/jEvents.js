// jEvents.js JavaScript Functions

// Events Page scripts

// Wait for the window to load and then run the init function below.
window.addEventListener('DOMContentLoaded', init)

// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {
    getSiteTheme(); // Update the site theme to what the user has selected.
}

// When the Peter Griffin button is clicked, hide the main Events page content, and flash up the Peter Griffin image for a second.
function peterButtonClick() {
    console.log("Peter button clicked.")  // Log the function in the console.
    document.getElementById("peterAlertButton").classList.add("hidden"); // Add the hidden class to the clicked button.
    document.getElementById("peterAlertImage").classList.remove("hidden"); // Remove the hidden class on the Peter Griffin image.
    var audio = new Audio('/pages/Group-Page/assets/audio/DecoysLois.mp3'); // Define the audio file to be played.
    audio.play(); // Trigger the audio file.
    document.getElementById("main-events-section").classList.add("hidden"); // Add the hidden class to the main-events-section.
    window.setTimeout(resetEventsPage, 1000); // Wait 1 second and then call the reset page function. (https://www.w3schools.com/js/js_timing.asp).
}

// Reset the page as if nothing has happened.
function resetEventsPage() {
    console.log("Events page reset.")  // Log the function in the console.
    document.getElementById("peterAlertImage").classList.add("hidden"); // Add the hidden class on the Peter Griffin image.
    document.getElementById("main-events-section").classList.remove("hidden"); // Remove the hidden class to the main-events-section.
}
