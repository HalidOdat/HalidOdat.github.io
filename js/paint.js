window.onload = function() {
    var canvas = document.getElementById("gc");
    var c = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Make The Screen The Background color
    var backColor = 'white';
    c.fillStyle = backColor;
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Control for the modal
    var modal = document.getElementById("menu-modal");
    var spanclose = document.getElementsByClassName("close")[0];
    var cdis = document.getElementById("color-span-display");
    var radsl = document.getElementById("radsl");
    var radval = document.getElementById("radval");

    var radius = 8;
    var dragging = false;
    var color = "#000";
    var r = g = b = 0;
    
    // Initialize Color Brush.
    setColor();

    c.lineWidth = radius * 2;
    var putPoint = function(e) {
        if (dragging) {
            var x = e.touches ? e.touches[0].clientX : e.clientX,
                y = e.touches ? e.touches[0].clientY : e.clientY;

            c.lineTo(x, y);
            c.stroke();
            c.beginPath();
            c.arc(x, y, radius, Math.PI * 2, false);
            c.fill();
            c.beginPath();
            c.moveTo(x, y);
        }
    }
    
    canvas.addEventListener('touchend', 
        function() {
            dragging = false;
            c.beginPath();
    });

    canvas.addEventListener('touchstart', 
        function(e) {
            dragging = true;
            putPoint(e);
    });

    canvas.addEventListener("touchmove", putPoint);
    canvas.addEventListener("mousemove", putPoint);
    canvas.addEventListener("mousedown",
        function(e) {
            dragging = true;
            putPoint(e);
        });
    canvas.addEventListener("mouseup",
        function() {
            dragging = false;
            c.beginPath();
        });

    canvas.addEventListener("mouseout",
        function() {
            c.beginPath();
            dragging = false;
        });
    document.addEventListener("keypress", function(e) {
        //console.log(e);
        if (e.key === 'R') {
        	c.fillStyle = backColor;
            c.fillRect(0, 0, canvas.width, canvas.height);
            setColor();
        } else if (e.key === ' ') {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            } else {
                modal.style.display = 'block';
            }
        } else if (e.key === '-') {
            if (radius > 1) {
                radius -= 8;
                c.lineWidth = radius * 2;
                radval.innerHTML = radius;
                radsl.value = radius;
            }
            if (radius < 1) {
                radius = 1;
                c.lineWidth = radius * 2;
                radval.innerHTML = radius;
                radsl.value = radius;
            }
        } else if (e.key === '+') {
            if (radius < 100) {
                radius += 8;
                c.lineWidth = radius * 2;
                radval.innerHTML = radius;
                radsl.value = radius;
            }
            if (radius > 100) {
                radius = 100;
                c.lineWidth = radius * 2;
                radval.innerHTML = radius;
                radsl.value = radius;
            }
        }
    });

    spanclose.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    radval.innerHTML = radsl.value;
    radsl.oninput = function() {
        radval.innerHTML = this.value;
        radius = this.value;
        c.lineWidth = radius * 2;
    }

    function setColor() {
        color = "rgb(" + r + ',' + g + ',' + b + ")";
        c.fillStyle = color;
        c.strokeStyle = color;
        cdis.style.color = color;
    }

    // clearButton function
    var clearButton = document.getElementById('clear-button');
    clearButton.onclick = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        c.fillStyle = backColor;
        c.fillRect(0, 0, canvas.width, canvas.height);
        c.lineWidth = radius * 2;
        setColor();
        modal.style.display = 'none';
    }

    var rval = document.getElementById('rval');
    var redslider = document.getElementById('red-slider');
    rval.innerHTML = redslider.value;
    redslider.oninput = function() {
        rval.innerHTML = this.value;
        r = this.value;
        setColor();
    }
    var gval = document.getElementById('gval');
    var greenslider = document.getElementById('green-slider');
    gval.innerHTML = greenslider.value;
    greenslider.oninput = function() {
        gval.innerHTML = this.value;
        g = this.value;
        setColor();
    }
    var bval = document.getElementById('bval');
    var blueslider = document.getElementById('blue-slider');
    bval.innerHTML = blueslider.value;
    blueslider.oninput = function() {
        bval.innerHTML = this.value;
        b = this.value;
        setColor();
    }
    let saveButton = document.getElementById('save-button');
    let imgDownload = document.getElementById('img-download');
    saveButton.onclick = function() {
        let date = new Date().toISOString().slice(0, 10);
        console.log(date);
        imgDownload.href = canvas.toDataURL();
        imgDownload.download = "canvas-img-" + date + ".png"
        imgDownload.click();
    }
}