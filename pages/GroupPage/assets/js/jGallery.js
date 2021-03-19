// jGallery.js JavaScript Functions

// Gallery scripts

function passClickedAlbumName() {
    // https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
    var clickedAlbumName = "General";
    sessionStorage.setItem("clickedAlbumName", clickedAlbumName); // Save the variable to session storage.
    console.log(clickedAlbumName);
}