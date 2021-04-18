// jGallerySubPage.js JavaScript Functions

// Wait for the window to load and then run the init function below.
window.addEventListener('DOMContentLoaded', init)

// Initially receive the clicked album name from the Gallery Page.
function init() {
    // https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
    var clickedAlbumName = sessionStorage.getItem("clickedAlbumName"); // Retrieve the variable passed to session storage.
    console.log(clickedAlbumName); // Log the passed variable.
    var element = document.getElementById("pageMainHeader"); // Grab the very top title element.
    element.innerHTML = clickedAlbumName + " Gallery"; // Set the title to be the passed variable.

    //console.log("Call openPhotoSwipe");
    //openPhotoSwipe();
}

// Create a function that counts the number of image files in a certain folder, and then updates the DOM to create the correct number of image elements.






// Test function - feel free to delete.
function openPhotoSwipe() {

    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [
        {
            src: '/pages/Group-Page/assets/images/Gallery/Glastonbury/Glastonbury Cover.jpg',
            w: 600,
            h: 400
        },
        {
            src: '/pages/Group-Page/assets/images/Gallery/Glastonbury/Glastonbury Cover.jpg',
            w: 600,
            h: 400
        },
        {
            src: '/pages/Group-Page/assets/images/Gallery/Glastonbury/Glastonbury Cover.jpg',
            w: 600,
            h: 400
        },
        {
            src: '/pages/Group-Page/assets/images/Gallery/Glastonbury/Glastonbury Pea Cover.JPG',
            w: 1200,
            h: 900
        }
    ];

    // define options (if needed)
    var options = {
        // optionName: 'option value'
        // for example:
        index: 0 // start at first slide
    };

    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();

}





// Gallery SubPage scripts
// https://photoswipe.com/
// https://codepen.io/dimsemenov/pen/ZYbPJM

var initPhotoSwipeFromDOM = function (gallerySelector) {

    console.log("function (gallerySelector) initiated");

    // Parse slide data (url, title, size ...) from DOM elements (children of gallerySelector).
    var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        console.log(thumbElements);

        for (var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element
            console.log("figureEl = " + figureEl);

            // include only element nodes 
            if (figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };

            if (figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        console.log("items = " + items);

        return items;
    };

    // Find nearest parent element
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // Triggers when user clicks on thumbnail
    var onThumbnailsClick = function (e) {
        
        console.log("onThumbnailsClick selected");

        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // Find root element of slide.
        var clickedListItem = closest(eTarget, function (el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if (!clickedListItem) {
            return;
        }

        // Find index of clicked item by looping through all child nodes, alternatively, you may define index via data- attribute.
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        console.log("clickedGallery = " + clickedGallery);
        console.log("childNodes = " + childNodes);
        console.log("numChildNodes = " + numChildNodes);
        console.log("nodeIndex = " + nodeIndex);
        console.log("index = " + index);

        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }

            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }

        if (index >= 0) {
            // Open PhotoSwipe if valid index found.
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };

    // Parse picture index and gallery index from URL (#&pid=1&gid=2).
    var photoswipeParseHash = function () {
        
        console.log("photoswipeParseHash called");
        
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        console.log("items = " + items);

        // Define options (if needed).
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function (index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            }

        };

        console.log("options = " + options);

        // PhotoSwipe opened from URL.
        if (fromURL) {
            
            console.log("PhotoSwipe opened from URL");
            
            if (options.galleryPIDs) {
                // Parse real index when custom PIDs are used - http://photoswipe.com/documentation/faq.html#custom-pid-in-url.
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // In URL indexes start from 1.
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // Exit if index not found.
        if (isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it.
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        console.log("hashData.pid = " + hashData.pid);
        console.log("galleryElements[hashData.gid - 1] = " + galleryElements[hashData.gid - 1]);
        
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};

// Execute above function.
initPhotoSwipeFromDOM('.my-gallery');