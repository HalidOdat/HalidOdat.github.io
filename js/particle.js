var canvas = document.getElementById('background');
var c = canvas.getContext('2d');


const MAX_RADIUS = 40;
const INC_AMOUNT = 25;
const FPS = 35;

var circleArray = [];
var colorArray = [
    "black",
    "darkgray",
    "purple"
];
var showColorArray = [
    false,
    false,
    false
];

function Circle(x, y, vx, vy, radius, colorIndex) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.minRadius = radius;
    this.colorIndex = colorIndex;
}

Circle.prototype.draw = function() {
    c.beginPath();
    c.fillStyle = colorArray[this.colorIndex];
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
};

Circle.prototype.update = function() {
    if (!showColorArray[this.colorIndex]) {
        return;
    }

    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
        this.vx = -this.vx;
    }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
        this.vy = -this.vy;
    }
    this.y += this.vy;
    this.x += this.vx;

    this.draw();
};

function createParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let tmp = [];
    for (var i = 0; i < 300; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var vx = (Math.random() - 0.5); // * 16;
        var vy = (Math.random() - 0.5); // * 10;

        let colorIndex = Math.floor(Math.random() * colorArray.length);
        tmp.push(new Circle(x, y, vx, vy, radius, colorIndex));
    }

    circleArray = tmp;
}

function animateParticles() {
    c.fillStyle = '#141414';
    c.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    requestAnimationFrame(animateParticles);
}

function initParticleAnimation() {
    createParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        createParticles();
    })
}
