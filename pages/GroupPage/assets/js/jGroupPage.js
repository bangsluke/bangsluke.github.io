
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