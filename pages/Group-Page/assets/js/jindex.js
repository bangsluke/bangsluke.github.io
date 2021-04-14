// jindex.js JavaScript Functions


// Code

// Start the console timer.
console.time();

window.onload = function () {

    // Initially define the selection element.
    var userSelection = document.getElementById("userdropdown");

    // React when the user changes the userSelection.
    userSelection.onchange = function () {
        // Get the picked user from the userSelection.
        var user = userSelection.value;
        sessionStorage.setItem("selectedUserName", selectedUserName); // Save the variable to session storage.
        console.log(selectedUserName);
    }
}




// End the console timer.
console.timeEnd();