// weatherWidget.js JavaScript

// Javascript for building and creating the weather widget.

function buildWeatherWidget() {
    // console.log("buildWeatherWidget called."); // Log the function to the console.

    // Call the original script used to build the weather widget.
    !function (d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = 'https://weatherwidget.io/js/widget.min.js'; fjs.parentNode.insertBefore(js, fjs); } }(document, 'script', 'weatherwidget-io-js');
}


function createWeatherWidgetHTML(highColor, lowColor, cloudFillColor) {
    // console.log("createWeatherWidgetHTML called."); // Log the function to the console.
    
    // Define the parent element of the widget.
    let parentElement = document.getElementById("weather-widget-container");
    
    // Clear all children elements from the container (deleting all of the previous widget).
    parentElement.innerHTML = ''; // Clear all children. https://stackoverflow.com/a/3955238/14290169.

    // Create the new element.
    let weatherElement = document.createElement('a');
    
    // Set all of the properties of the element.
    weatherElement.setAttribute('id', 'weather-widget');
    weatherElement.setAttribute('class', 'weatherwidget-io');
    weatherElement.setAttribute('SameSite', 'None');
    weatherElement.setAttribute('href', 'https://forecast7.com/en/51d23n0d33/dorking/');
    weatherElement.setAttribute('data-label_1', 'PIXHAM LANE, DORKING');
    weatherElement.setAttribute('data-label_2', 'Weather');
    weatherElement.setAttribute('data-icons', 'Climacons Animated');
    weatherElement.setAttribute('data-theme', 'original');
    weatherElement.setAttribute('data-basecolor', 'rgba(0, 0, 0, 0.05)');
    weatherElement.setAttribute('data-accent', 'rgba(0, 0, 0, 0.05)');
    weatherElement.setAttribute('data-highcolor', highColor);
    weatherElement.setAttribute('data-lowcolor', lowColor);
    weatherElement.setAttribute('data-suncolor', '#F9ED32');
    weatherElement.setAttribute('data-cloudfill', cloudFillColor);
    weatherElement.setAttribute('data-raincolor', '#00ffff');
    weatherElement.innerHTML = 'PIXHAM LANE Weather';

    // Add the new element into the DOM.
    parentElement.appendChild(weatherElement);

    // Create the new script element.
    let scriptElement = document.createElement('script');
    
    // Set all of the properties of the element.
    scriptElement.setAttribute('id', 'weatherwidget-io-js');
    scriptElement.setAttribute('src', 'https://weatherwidget.io/js/widget.min.js');

    // Add the new element into the DOM.
    weatherElement.appendChild(scriptElement);
}

