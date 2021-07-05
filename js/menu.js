// Check if an element is in view (is visable to the user).
function isElementInViewport (el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    // Bounds check
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

let menuItemHome = document.getElementById("menu-list-item-home");
let menuItemAbout = document.getElementById("menu-list-item-about");
let menuItemContact = document.getElementById("menu-list-item-contact");

function sectionDetectionHandler() {
    if (isElementInViewport($("#home-section"))) {
        menuItemHome.classList.add('active');
    } else {
        menuItemHome.classList.remove('active');
    }

    if (isElementInViewport($("#about-section"))) {
        menuItemAbout.classList.add('active');
    } else {
        menuItemAbout.classList.remove('active');
    }

    if (isElementInViewport($("#contact-section"))) {
        menuItemContact.classList.add('active');
    } else {
        menuItemContact.classList.remove('active');
    }
}

// Init detection and update the menu items activation when it reaches a section.
function initSectionDetection() {
    $('#container').on('DOMContentLoaded load resize scroll', sectionDetectionHandler);
}
