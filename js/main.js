var scrollDownArrow = document.getElementById('scroll-down-arrow-container');

window.onload = function() {
    // Handle particle background.
    initParticleAnimation();

    // handles automatic section dectection, and menu item activation.
    initSectionDetection();
    sectionDetectionHandler();

    const options = {
        strings: [
            'Hello there 👋',
            'I am Haled Odat',
            'I am a <span style="color:green">student</span>',
            'I am a <span style="color:#aa6e07">programmer</span>',
            'I am a <span style="color:tomato">developer</span>',
            '<i><b>Welcome</b> to my website!</i>'
        ],
        startDelay: 1000,
        typeSpeed: 70,
        backSpeed: 50,
        onStringTyped: (position) => {
            switch (position) {
                case 0:
                case 1:
                    break;
                case 2:
                    showColorArray[0] = true;
                    break;
                case 3:
                    showColorArray[1] = true;
                    break;
                case 4:
                    showColorArray[2] = true;
                    break;
                case 5:
                    scrollDownArrow.style.display = "block";
                    break;
            }
        }
    };
    let typed = new Typed('#greetings', options);
    typed.start();
}


