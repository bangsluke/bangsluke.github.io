// jGallery.js JavaScript Functions

// Gallery scripts

// Create a function to run when page is loaded.
window.onload = function () {
    console.log("Gallery page loaded.");
    //var selectedUserName = sessionStorage.getItem("selectedUserName"); // Retrieve the variable passed to session storage.
    var peaMode = document.getElementById("peaModeToggle").checked; // Get the value of the input from the toggle switch. Either true or false.
    sessionStorage.setItem("peaMode", peaMode); // Save the variable to session storage.
    console.log("On initial load, peaMode is = " + peaMode);
}

// Change the pea mode when the user has clicked on the toggle.
function togglePeaMode() {
    // console.log("Pea toggle clicked.");
    var peaMode = document.getElementById("peaModeToggle").checked; // Get the value of the input from the toggle switch. Either true or false.
    // console.log(peaMode);
    if (peaMode == true) {
        console.log("Pea mode toggle has just been turned on.");
        // Change the sources of the images to show Pea specific covers.
        document.getElementById("croatiaCover").src = "/pages/Group-Page/assets/images/Gallery/Croatia Pea Cover.JPG"; // Modify the source of the image.
        document.getElementById("glastonburyCover").src = "/pages/Group-Page/assets/images/Gallery/Glastonbury Pea Cover.JPG"; // Modify the source of the image.
        document.getElementById("bigNightsOutCover").src = "/pages/Group-Page/assets/images/Gallery/Big Nights Out Pea Cover.JPG"; // Modify the source of the image.
        document.getElementById("lockdownCover").src = "/pages/Group-Page/assets/images/Gallery/Lockdown Pea Cover.JPG"; // Modify the source of the image.
        document.getElementById("paghamCover").src = "/pages/Group-Page/assets/images/Gallery/Pagham Pea Cover.JPG"; // Modify the source of the image.     
        document.getElementById("generalCover").src = "/pages/Group-Page/assets/images/Gallery/General Pea Cover.JPG"; // Modify the source of the image.

        document.getElementById("footballCover").src = "/pages/Group-Page/assets/images/Gallery/Football Pea Cover.JPG"; // Modify the source of the image.
    } else {
        console.log("Pea mode toggle has just been turned off.");
        // Change the sources of the images to show non-Pea specific covers.
        document.getElementById("croatiaCover").src = "/pages/Group-Page/assets/images/Gallery/Croatia Cover.JPG"; // Modify the source of the image.
        document.getElementById("glastonburyCover").src = "/pages/Group-Page/assets/images/Gallery/Glastonbury Cover.JPG"; // Modify the source of the image.
        document.getElementById("bigNightsOutCover").src = "/pages/Group-Page/assets/images/Gallery/Big Nights Out Cover.JPG"; // Modify the source of the image.
        document.getElementById("lockdownCover").src = "/pages/Group-Page/assets/images/Gallery/Lockdown Cover.JPG"; // Modify the source of the image.
        document.getElementById("paghamCover").src = "/pages/Group-Page/assets/images/Gallery/Pagham Cover.JPG"; // Modify the source of the image.     
        document.getElementById("generalCover").src = "/pages/Group-Page/assets/images/Gallery/General Cover.JPG"; // Modify the source of the image.

        document.getElementById("footballCover").src = "/pages/Group-Page/assets/images/Gallery/Football Cover.JPG"; // Modify the source of the image.
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