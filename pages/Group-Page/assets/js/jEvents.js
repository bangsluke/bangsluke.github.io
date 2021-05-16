// jEvents.js JavaScript Functions

// Events Page scripts

// When the Peter Griffin button is clicked, hide the main Events page content, and flash up the Peter Griffin image for a second.
function peterButtonClick() {
    console.log("Peter button clicked.")  // Log the function in the console.
    document.getElementById("peterAlertButton").classList.add("hidden"); // Add the hidden class to the clicked button.
    document.getElementById("peterAlertImage").classList.remove("hidden"); // Remove the hidden class on the Peter Griffin image.
    document.getElementById("main-events-section").classList.add("hidden"); // Add the hidden class to the main-events-section.
    window.setTimeout(resetEventsPage, 1000); // Wait 1 second and then call the reset page function. (https://www.w3schools.com/js/js_timing.asp).
}

// Reset the page as if nothing has happened.
function resetEventsPage() {
    console.log("Events page reset.")  // Log the function in the console.
    document.getElementById("peterAlertImage").classList.add("hidden"); // Add the hidden class on the Peter Griffin image.
    document.getElementById("main-events-section").classList.remove("hidden"); // Remove the hidden class to the main-events-section.
}
