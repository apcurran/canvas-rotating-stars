"use strict";

const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let particlesArr = [];

class Particle {
    constructor(moveRadius, step, position, size) {
        this.moveRadius = moveRadius;
        this.step = step;
        this.position = position;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(
            Math.cos(this.position) * this.moveRadius + canvas.width / 2,
            Math.sin(this.position) * this.moveRadius + canvas.height / 2,
            this.size,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = "#fff";
        ctx.fill();
    }

    update() {
        this.position += this.step;
    }
}

function init() {
    particlesArr = [];

    for (let i = 0; i < 500; i++) {
        const moveRadius = Math.random() * canvas.width / 4;
        const step = (Math.random() * 0.002) + 0.002;
        const position = Math.random() * (2 * Math.PI);
        const size = (Math.random() * 8) + 0.5;

        particlesArr.push(new Particle(moveRadius, step, position, size));
    }
}

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0, 0, 0, .05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].update();
        particlesArr[i].draw();
    }
}

init();
animate();