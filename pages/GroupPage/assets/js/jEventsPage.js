// jEventsPage.js JavaScript Functions

// Wait for the window to load and then run the init function below.
window.addEventListener('DOMContentLoaded', init)

// Immediately update the page header.
function init() {
    //alert(elem.shadowRoot.host === elem); // true

    console.log("Event Page JS init started")
    let testelement = document.getElementByid("pageMainHeader");
    
    testelement.innerHTML = "Events"; // Set the title to be correct.

    //let testelement = document.getElementsByName("header-component");
    //let subelement = testelement.getElementById("pageMainHeader");

    document.createElement('my-element')

    //let element = document.shadowRoot.getElementById("pageMainHeader"); // Grab the very top title element.
    //element.innerHTML = "Events"; // Set the title to be correct.
}

