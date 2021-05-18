// jGallerySubPage.js JavaScript Functions

// Gallery SubPage scripts

// Wait for the window to load and then run the init function below.
window.addEventListener('DOMContentLoaded', init)

// Create an init function that calls the other key functions on page load.
function init() {
    setGalleryHeaderName();
}

// Change the header name to reflect which Gallery is being shown.
function setGalleryHeaderName() {
    var clickedAlbumName = sessionStorage.getItem("clickedAlbumName", clickedAlbumName); // Get the saved variable from session storage.
    console.log(clickedAlbumName);
    document.getElementById("pageMainHeader").innerHTML = clickedAlbumName + " Gallery"; // Modify the text inside the element.
}



// https://www.w3schools.com/howto/howto_js_lightbox.asp

// Open the Modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}