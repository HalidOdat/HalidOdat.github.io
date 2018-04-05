var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

// c.fillStyle = "green";
// c.fillRect(100,100,100,100);
// c.fillRect(100,250,100,100);
// c.fillRect(250,100,100,100);
// c.fillRect(250,250,100,100);

// // lines
// c.beginPath();
// c.moveTo(50,50);
// c.lineTo(225, 50);
// c.lineTo(225, 225);
// c.lineTo(370,225);
// c.strokeStyle = "rgba(255, 0, 0, 0.5)";
// c.stroke();

// // Arc / Circles
// c.beginPath();
// c.arc(450, 225, 30, 0, Math.PI*2,false);
// c.strokeStyle = "cyan";
// c.stroke();

// function colorRandomizer(){
// 	var r = Math.random() * 255;
// 	var g = Math.random() * 255;
// 	var b = Math.random() * 255;
// }
// for (var i = 0; i < 100; i++) {
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;

// 	var r = Math.round(Math.random() * 255);
// 	var g = Math.round(Math.random() * 255);
// 	var b = Math.round(Math.random() * 255);
// 	console.log("rgb("+r+','+g+','+b+')');
// 	c.beginPath();
// 	c.arc(x, y, 30, 0, Math.PI*2,false);
// 	c.strokeStyle = "rgb("+r+','+g+','+b+')';
// 	c.stroke();	
// }

var mouse = {
	x: undefined,
	y: undefined
}
const MAX_RADIUS = 40;
const INC_AMOUNT = 2;

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

window.addEventListener('mousemove', 
	function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	//console.log(mouse);
});

function Circle(x, y, vx, vy, radius) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	// this.color = "rgb(" + Math.round(Math.random() * 255) + "," +
	// 					  Math.round(Math.random() * 255) + "," +
	// 					  Math.round(Math.random() * 255) + ")"

	this.draw = function() {
		c.beginPath();
		c.fillStyle = this.color;
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2,false);
		c.fill();
	}

	this.update = function() {
		if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
			this.vx = -this.vx;
		}
		if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
			this.vy = -this.vy;
		}
		this.y+=this.vy;
		this.x+=this.vx;

		// Mouse Position Interaction.
		if (mouse.x - this.x < MAX_RADIUS && mouse.x - this.x > -MAX_RADIUS ) {
			if(mouse.y - this.y < MAX_RADIUS && mouse.y - this.y > -MAX_RADIUS) {
				if (this.radius < MAX_RADIUS) {
					this.radius+=MAX_RADIUS;

				}
			} 
		} else if(this.radius > this.minRadius && this.radius != 0){
			this.radius--;
		}

		this.draw();
	}
}

window.onload = function() {
	init();
	setInterval(animate, 1000/60);
}
function init() {
	circleArray = [];
	for (var i = 0; i < 2000; i++) {
		var radius = Math.random() * 3 + 1;
		var x = Math.random() * (innerWidth - radius*2) + radius;
		var y = Math.random() * (innerHeight - radius*2) + radius;
		var vx = (Math.random() - 0.5);// * 16;
		var vy = (Math.random() - 0.5);// * 10;

		circleArray.push(new Circle(x, y, vx, vy, radius));

	}
	//anime = setInterval(animate, 1000/30);
}

function animate() {
	c.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
	//console.log("t");
}

// Resize funcion
function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
}