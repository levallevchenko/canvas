const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
let hue = 0;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle());
  }
});

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;

  for (let i = 0; i < 5; i++) {
    particles.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.6) this.size -= 0.1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const handleParticles = () => {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 50 && distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particles[i].color;
        ctx.lineWidth = 0.2;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    if (particles[i].size <= 0.6) {
      particles.splice(i, 1);
      i--;
    }
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 0.8;
  requestAnimationFrame(animate);
};

animate();
