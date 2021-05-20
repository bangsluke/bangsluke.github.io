// jCollapsible.js JavaScript Functions

// Wait for the window to load and then run the init function below. DOMContentLoaded details - (https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)
window.addEventListener('DOMContentLoaded', init)

// Initially add a default table and then populate the statistic category dropdown and create the onchange functions for each dropdown.
function init() {

  sortOutActivityCollapsibles();

  sortOutTaskCollapsibles();

}

function sortOutActivityCollapsibles() {

  // Collapsible section scripts
  // https://www.w3schools.com/howto/howto_js_collapsible.asp

  var coll = document.getElementsByClassName("collapsible");
  var i;

  console.log("Activity collapsible clicked.");
  //console.log("coll.length is: " + coll.length);

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      console.log("Activity collapsible clicked.");
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }

      adjustTaskContentHeights(); // Loop through the page and update the heights of all Task content to take into account the expanded/minimised activity.
    });
  }

}

function sortOutTaskCollapsibles() {

  var taskcoll = document.getElementsByClassName("taskcollapsible");
  var j;

  console.log("Task collapsible clicked.")
  //console.log("taskcoll.length is: " + taskcoll.length);

  for (j = 0; j < taskcoll.length; j++) {
    taskcoll[j].addEventListener("click", function () {
      console.log("Task collapsible clicked.")
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }

}

// Loop through the page and update the heights of all Task content to take into account the expanded/minimised activity.
function adjustTaskContentHeights() {

  var taskcontent = document.getElementsByClassName("task-content");
  var k;

  for (k = 0; k < taskcontent.length; k++) {
      //console.log("Task content " + k + " is " + taskcontent[k].style.maxHeight);
      if (taskcontent[k].style.maxHeight == null) {
        taskcontent[k].style.maxHeight = null;
      } else if (taskcontent[k].style.maxHeight == 0) {
        taskcontent[k].style.maxHeight = null;
      } else {
        taskcontent[k].style.maxHeight = "max-content";
      }
  }
  console.log("Task contents adjusted."); // Log the result.
}