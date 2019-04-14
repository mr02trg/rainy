// set up
var canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

var ctx = canvas.getContext('2d');
setRainStyle();

const NUM_DROPS = 500;
const MAX_WIND = 10;
const MIN_WIND = -1;
const MAX_HEAVINESS = 10;
const MIN_HEAVINESS = 2;

// event listeners
addEventListener("resize", function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    setRainStyle();
    init();
});

function setRainStyle() {
    ctx.strokeStyle = 'rgba(174,194,224,0.5)';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
}


// object
function RainDrop (x, y, wind, heaviness) {
    this.x = x;
    this.y = y;
    this.wind = wind;
    this.heaviness = heaviness;

    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.wind, this.y + this.heaviness);
        ctx.stroke();
    }

    this.update = function() {
        this.x += this.wind;
        this.y += this.heaviness;

        if (this.y > canvas.height || this.x > canvas.width || this.x < 0 ) {
            this.x = Math.random() * canvas.width;
            this.y = -10;
        }
        this.draw();
    }
}

// initalise particles
var particles = [];
function init() {
    particles = [];
    for(var i = 0; i < NUM_DROPS; i++) {
        var p = new RainDrop(
            Math.random() * canvas.width, 
            Math.random() * canvas.height, 
            getRandom(-1, 1),
            Math.random() * 5 + 10,
        );
        particles.push(p);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(x => x.update());
    requestAnimationFrame(animate);
}

init();

animate();


// utility
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}