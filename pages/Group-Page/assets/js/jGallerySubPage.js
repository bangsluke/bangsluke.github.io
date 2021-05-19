// jGallerySubPage.js JavaScript Functions

// Gallery SubPage scripts

// Wait for the window to load and then run the init function below.
window.addEventListener('DOMContentLoaded', init)

// Define a maximum number of possible photos in any one gallery folder.
var maxImageCount = 20;

// Create an init function that calls the other key functions on page load.
function init() {
    setGalleryHeaderName();
    populateImageSources();
}

// Change the header name to reflect which Gallery is being shown.
function setGalleryHeaderName() {
    var clickedAlbumName = sessionStorage.getItem("clickedAlbumName", clickedAlbumName); // Get the saved variable from session storage.
    if (clickedAlbumName == null) { // Update clickedAlbumName to be General by deafult if error.
        clickedAlbumName = "General";
    }
    console.log(clickedAlbumName);
    document.getElementById("pageMainHeader").innerHTML = clickedAlbumName + " Gallery"; // Modify the text inside the element.
}

// Loop through the images populating their sources correctly.
function populateImageSources() {
    var clickedAlbumName = sessionStorage.getItem("clickedAlbumName", clickedAlbumName); // Get the saved variable from session storage.
    if (clickedAlbumName == null) { // Update clickedAlbumName to be General by deafult if error.
        clickedAlbumName = "General";
    }
    var albumSize;
    switch (clickedAlbumName) { // Add a switch statement to define how many images are in the Gallery.
        case "Big Nights Out":
            albumSize = 10;
            break;
        case "Croatia":
            albumSize = 10;
            break;
        case "Edinburgh":
            albumSize = 13;
            break;
        case "Football":
            albumSize = 20;
            break;
        case "General":
            albumSize = 20;
            break;
        case "Glastonbury":
            albumSize = 20;
            break;
        case "Lockdown":
            albumSize = 16;
            break;
        case "Pagham":
            albumSize = 12;
            break;
        case "Portugal":
            albumSize = 10;
            break;
        case "Skiing":
            albumSize = 18;
            break;
        default: // Default statement or expression;
            albumSize = 10;
    }
    console.log(clickedAlbumName + ' album size is ' + albumSize); // Log the album size to be used.
    var x; // Define the variable for looping.
    for (x = 1; x <= maxImageCount; x++) { // Loop through all images.
        console.log(x);
        if (x <= albumSize) { // If the image number falls within the album size, update the source of the image.
            var sourcePath = "/pages/Group-Page/assets/images/Gallery/" + clickedAlbumName + "/" + clickedAlbumName + x + ".jpg"; // Define the source path used for both images.
            document.getElementById("image" + x).src = sourcePath; // Set the source of the image dynamically.
            document.getElementById("modalimage" + x).src = sourcePath; // Set the source of the modal image dynamically.
        } else { // If the image number is larger than the album size, hide the placeholder.
            document.getElementById("image" + x).classList.add("hidden"); // Add the hidden class to the image.
        }
    }
}

// https://www.w3schools.com/howto/howto_js_lightbox.asp

// Open the Modal
function openModal() {
    document.getElementById("myModal").style.display = "block"; // Turn on the modal display.
}

// Close the Modal
function closeModal() {
    document.getElementById("myModal").style.display = "none"; // Turn off the modal display.
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n); // Call the show slides function, passing the next or previous integer.
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n); // Call the show slides function for the current image.
}

function showSlides(n) {
    var i; // Define the variable for looping.
    var slides = document.getElementsByClassName("mySlides"); // Get all images with class "mySlides".
    //var dots = document.getElementsByClassName("demo"); // Get all images with class "dots".
    //var captionText = document.getElementById("caption"); // Get the caption id text.
    if (n > slides.length) { // Deal with n going over the maximum number of images.
        slideIndex = 1
    }
    if (n < 1) { // Deal with n going under 1.
        slideIndex = slides.length
    }
    // Update the image number text.
    document.getElementById("numbertext").innerHTML = slideIndex + "/" + slides.length; // Modify the text inside the element.
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    //for (i = 0; i < dots.length; i++) { // Loop through the images with class "dots".
    //dots[i].className = dots[i].className.replace(" active", "");
    //}
    slides[slideIndex - 1].style.display = "block";
    // dots[slideIndex - 1].className += " active"; // Add the active class to the demo class image.
    //captionText.innerHTML = dots[slideIndex - 1].alt; // Update the caption text based on the alt property of the demo class image.
}