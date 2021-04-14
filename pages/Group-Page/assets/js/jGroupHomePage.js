// Wait for the window to load and then run the init function below.
window.addEventListener('DOMContentLoaded', init)

function init() {

    var selectedUserName = sessionStorage.getItem("selectedUserName"); // Retrieve the variable passed to session storage.
    console.log("selectedUserName = " + selectedUserName);

}
