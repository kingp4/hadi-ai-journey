const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  speed: 3,
};

const foodRadius = 5;
const foodCount = 25;
const foods = [];

function spawnFood() {
  foods.length = 0;
  for (let i = 0; i < foodCount; i++) {
    foods.push({
      x: Math.random() * (canvas.width - foodRadius * 2) + foodRadius,
      y: Math.random() * (canvas.height - foodRadius * 2) + foodRadius,
    });
  }
}

const keys = {};
document.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});
document.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

function update() {
  if (keys['ArrowUp']) player.y -= player.speed;
  if (keys['ArrowDown']) player.y += player.speed;
  if (keys['ArrowLeft']) player.x -= player.speed;
  if (keys['ArrowRight']) player.x += player.speed;

  player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
  player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));

  for (let i = foods.length - 1; i >= 0; i--) {
    const f = foods[i];
    const dist = Math.hypot(player.x - f.x, player.y - f.y);
    if (dist < player.radius + foodRadius) {
      foods.splice(i, 1);
      player.radius += 0.5;
    }
  }

  if (foods.length === 0) {
    spawnFood();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'green';
  for (const f of foods) {
    ctx.beginPath();
    ctx.arc(f.x, f.y, foodRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'black';
  ctx.font = '16px sans-serif';
  ctx.fillText(`Size: ${Math.round(player.radius)}`, 10, 20);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

spawnFood();
loop();
