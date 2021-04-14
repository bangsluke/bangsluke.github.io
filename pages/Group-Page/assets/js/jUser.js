// jUser.js JavaScript Functions

// User Page scripts

function passUserName(user) { // Set the user variable to "this" - see the calling function in the HTML.
    // https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
    var selectedUserName = user.id; // Get the id of the element that called the function. https://stackoverflow.com/questions/7627161/get-id-of-element-that-called-a-function
    sessionStorage.setItem("selectedUserName", selectedUserName); // Save the variable to session storage.
    console.log(selectedUserName);
}