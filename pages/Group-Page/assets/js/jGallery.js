// jGallery.js JavaScript Functions

// Gallery scripts

console.time(); // Start the console timer.

// Ready Events
// First add a DOMContentLoaded event to fire when the HTML DOM is in place and then add a load event listener for when all images and other resources are loaded.

window.addEventListener('DOMContentLoaded', init) // Wait for the window to load and then run the init function below.

// Add a load event listener (https://eager.io/blog/how-to-decide-when-your-code-should-run/).
window.addEventListener('load', function () {
    console.log('%c' + '> Gallery page images and other resources all loaded.', 'background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;'); // Provide an initial load message.
    hideLoaderDots(); // Hide the loader dots. See LoaderDots.js.    
    console.timeEnd(); // End the console timer.
});

// Other Functions

// The intial function does the initial work required on the page, as soon as the DOM has loaded.
function init() {
    console.log('%c' + '> Gallery page DOM content loaded.', 'background-color: black; color: white; padding: 0.5em 0em; font-weight: bold;'); // Provide an initial load message.
    getSiteTheme(); // Update the site theme to what the user has selected.
    var peaMode = sessionStorage.getItem("peaMode"); // Retrieve the variable passed to session storage.
    console.log("> On initial load, peaMode is = " + peaMode); // Check what the initial loaded state is.
    if (peaMode == "true") { // If Pea mode was true, turn the check box on and modify the images.
        // console.log("Triggered");
        document.getElementById("peaModeToggle").checked = true;
        togglePeaMode();
    } else { // If Pea mode was false, do nothing.
        // console.log("Not triggered");
    }
}

// Change the pea mode when the user has clicked on the toggle.
function togglePeaMode() {
    // console.log("Pea toggle clicked.");
    var peaMode = document.getElementById("peaModeToggle").checked; // Get the value of the input from the toggle switch. Either true or false.
    // console.log(peaMode);
    if (peaMode == true) {
        console.log("Pea mode toggle has just been turned on.");
        // Change the sources of the images to show Pea specific covers. NOTE: the file extensions here are very important for loading the images. JPG or jpg makes a difference.
        document.getElementById("croatiaCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Croatia Pea Cover.JPG"; // Modify the source of the image.
        document.getElementById("glastonburyCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Glastonbury Pea Cover.JPG"; // Modify the source of the image.
        document.getElementById("bigNightsOutCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Big Nights Out Pea Cover.JPG"; // Modify the source of the image.
        document.getElementById("lockdownCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Lockdown Pea Cover.jpg"; // Modify the source of the image.
        document.getElementById("paghamCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Pagham Pea Cover.JPG"; // Modify the source of the image.     
        document.getElementById("generalCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/General Pea Cover.JPG"; // Modify the source of the image.
        document.getElementById("skiingCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Skiing Pea Cover.JPG"; // Modify the source of the image.
        document.getElementById("footballCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Football Pea Cover.JPG"; // Modify the source of the image.
        document.getElementById("edinburghCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Edinburgh Pea Cover.jpg"; // Modify the source of the image.
        document.getElementById("portugalCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Portugal Pea Cover.JPG"; // Modify the source of the image.
    } else {
        console.log("Pea mode toggle has just been turned off.");
        // Change the sources of the images to show non-Pea specific covers. NOTE: the file extensions here are very important for loading the images. JPG or jpg makes a difference.
        document.getElementById("croatiaCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Croatia Cover.jpg"; // Modify the source of the image.
        document.getElementById("glastonburyCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Glastonbury Cover.jpg"; // Modify the source of the image.
        document.getElementById("bigNightsOutCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Big Nights Out Cover.jpg"; // Modify the source of the image.
        document.getElementById("lockdownCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Lockdown Cover.jpg"; // Modify the source of the image.
        document.getElementById("paghamCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Pagham Cover.jpg"; // Modify the source of the image.     
        document.getElementById("generalCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/General Cover.JPG"; // Modify the source of the image.
        document.getElementById("skiingCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Skiing Cover.JPG"; // Modify the source of the image.
        document.getElementById("footballCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Football Cover.JPG"; // Modify the source of the image.
        document.getElementById("edinburghCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Edinburgh Cover.jpg"; // Modify the source of the image.
        document.getElementById("portugalCover").src = "/pages/Group-Page/assets/images/Gallery/Covers/Portugal Cover.jpg"; // Modify the source of the image.
    }
    sessionStorage.setItem("peaMode", peaMode); // Save the variable to session storage.
}

// Create a function that passes the clicked album name to the Sub Gallery Page.
function passClickedAlbumName(album) { // Set the album variable to "this" - see the calling function in the HTML.
    // https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
    var clickedAlbumName = album.id; // Get the id of the element that called the function. https://stackoverflow.com/questions/7627161/get-id-of-element-that-called-a-function
    sessionStorage.setItem("clickedAlbumName", clickedAlbumName); // Save the variable to session storage.
    console.log(clickedAlbumName);
}