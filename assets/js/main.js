/*
	Visualize by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

$(function () {

	// Vars.
	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper');

	// Breakpoints.
	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	// Disable animations/transitions until everything's loaded.
	$body.addClass('is-loading');

	$window.on('load', function () {
		$body.removeClass('is-loading');
	});

	// Poptrox.
	$window.on('load', function () {

		$('.thumbnails').poptrox({
			onPopupClose: function () { $body.removeClass('is-covered'); },
			onPopupOpen: function () { $body.addClass('is-covered'); },
			baseZIndex: 10001,
			useBodyOverflow: false,
			usePopupEasyClose: true,
			overlayColor: '#000000',
			overlayOpacity: 0.75,
			popupLoaderText: '',
			fadeSpeed: 500,
			usePopupDefaultStyling: false,
			windowMargin: (skel.breakpoint('small').active ? 5 : 50)
		});

	});

});

// Search box
// JavaScript for reacting to the user pressing Enter.
// https://stackoverflow.com/questions/7060750/detect-the-enter-key-in-a-text-input-field
// e.key is the modern way of detecting keys
// e.keyCode is deprecated (left here for for legacy browsers support)
// keyup is not compatible with Jquery select(), Keydown is.
$(".searchbox").on('keyup', function (e) {
	if (e.key === 'Enter' || e.keyCode === 13) {
		// Get the string that the user searched for.
		var searchString = document.getElementById('SearchBox').value;
		// Modify the string to make it a search query in Ecosia.
		var searchURL = 'https://www.ecosia.org/search?q=' + searchString;
		// Load the search URL in the current window.
		window.location.href = searchURL;
	}
});

