// jGallery.js JavaScript Functions

// Gallery scripts

function passClickedAlbumName(album) { // Set the album variable to "this" - see the calling function in the HTML.
    // https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
    var clickedAlbumName = album.id; // Get the id of the element that called the function. https://stackoverflow.com/questions/7627161/get-id-of-element-that-called-a-function
    sessionStorage.setItem("clickedAlbumName", clickedAlbumName); // Save the variable to session storage.
    console.log(clickedAlbumName);
}