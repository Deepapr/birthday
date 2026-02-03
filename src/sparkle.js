const canvas = document.getElementById("sparkles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let sparkles = [];

function createSparkle() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const size = Math.random() * 3 + 1;
  const speed = Math.random() * 0.5 + 0.2;
  const hue = Math.floor(Math.random() * 360);
  sparkles.push({ x, y, size, speed, hue });
}

function animateSparkles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < sparkles.length; i++) {
    let s = sparkles[i];
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${s.hue}, 100%, 70%)`;
    ctx.fill();

    s.y -= s.speed;
    s.x += Math.sin(s.y * 0.05) * 0.5;

    if (s.y < -s.size) {
      sparkles.splice(i, 1);
      i--;
    }
  }

  while (sparkles.length < 200) {
    createSparkle();
  }

  requestAnimationFrame(animateSparkles);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animateSparkles();
