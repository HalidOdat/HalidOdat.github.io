var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}
const MAX_RADIUS = 40;
const INC_AMOUNT = 25;
const FPS = 35;

var circleArray = [];
var colorArray = [
    "#ffee33",
    "#ff7e33",
    "#ff9e33",
    "#ff1e33",
    "#ff1133",
    "cyan",
    "lightgreen",
    "#65f442",
    "#ff4492",
    "#d56df2",
    "#4f86ff"
];

window.onload = function() {
    init();
    //setInterval(animate, 1000 / FPS);
    animate();
}

canvas.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
canvas.addEventListener('touchmove',
    function(event) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY
    });

function Circle(x, y, vx, vy, radius) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
}

Circle.prototype.draw = function() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
};

Circle.prototype.update = function() {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
        this.vx = -this.vx;
    }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
        this.vy = -this.vy;
    }
    this.y += this.vy;
    this.x += this.vx;

    // Mouse Position Interaction.
    if (mouse.x - this.x < MAX_RADIUS && mouse.x - this.x > -MAX_RADIUS &&
        mouse.y - this.y < MAX_RADIUS && mouse.y - this.y > -MAX_RADIUS) {
        if (this.radius < MAX_RADIUS) {
            this.radius += INC_AMOUNT;
        }
    } else if (this.radius > this.minRadius && this.radius != 0) {
        this.radius--;
    }
    this.draw();
};

function init() {
    circleArray = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (var i = 0; i < 1000; i++) {
        var radius = Math.random() * 3 + 2;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var vx = (Math.random() - 0.5); // * 16;
        var vy = (Math.random() - 0.5); // * 10;

        circleArray.push(new Circle(x, y, vx, vy, radius));
    }
}

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    requestAnimationFrame(animate);
}

// Resize funcion
function resize() {
    // resizing the canvas.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}
