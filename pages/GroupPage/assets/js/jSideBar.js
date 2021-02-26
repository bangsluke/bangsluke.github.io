// jSideBar.js JavaScript Functions

// Side bar scripts
// https://www.codingflicks.com/2020/12/toggle-sidebar-navigation-html-css-javascript.html

function openNav() {
	document.getElementById("side-menu").style.width = "300px";
	document.getElementById("content-area").style.marginRight = "300px";
    document.getElementById("burgericon").style.display = "none";
}
function closeNav() {
	document.getElementById("side-menu").style.width = "0";
	document.getElementById("content-area").style.marginRight = "0";
    document.getElementById("burgericon").style.display = "inline";
}