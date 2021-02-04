"use strict";

const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

// Helper func
function setCanvasDimensions() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

setCanvasDimensions();

let particlesArr = [];

class Particle {
    constructor(moveRadius, step, position, size) {
        this.moveRadius = moveRadius;
        this.step = step;
        this.position = position;
        this.size = size;
    }

    draw() {
        let x = Math.cos(this.position) * this.moveRadius + canvas.width / 2;
        let y = Math.sin(this.position) * this.moveRadius + canvas.height / 2;

        generateStar(x, y, 5, this.size, this.size / 2);

        ctx.fill();
    }

    update() {
        this.position += this.step;
    }
}

function init() {
    particlesArr = [];

    for (let i = 0; i < 50; i++) {
        const moveRadius = Math.random() * canvas.width / 4;
        const step = (Math.random() * 0.002) + 0.002;
        const position = Math.random() * (2 * Math.PI);
        const size = (Math.random() * 25) + 15;

        particlesArr.push(new Particle(moveRadius, step, position, size));
    }
}

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0, 0, 0, .05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set fill style for stars
    ctx.fillStyle = "#fff";

    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].update();
        particlesArr[i].draw();
    }
}

init();
animate();

window.addEventListener("resize", () => {
    setCanvasDimensions();
});

function generateStar(positionX, positionY, spikes, outerRadius, innerRadius) {
    let rotation = Math.PI / 2 * 3;
    let x = positionX;
    let y = positionY;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(positionX, positionY - outerRadius);

    for (let i = 0; i < spikes; i++) {
        x = positionX + Math.cos(rotation) * outerRadius;
        y = positionY + Math.sin(rotation) * outerRadius;
        ctx.lineTo(x, y);
        rotation += step;

        x = positionX + Math.cos(rotation) * innerRadius;
        y = positionY + Math.sin(rotation) * innerRadius;
        ctx.lineTo(x, y);
        rotation += step;
    }

    ctx.lineTo(positionX, positionY - outerRadius);
    ctx.closePath();
}