// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player
const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 20,
    height: 20,
    speed: 5,
    dx: 0
};

// Enemy
const enemy = {
    x: canvas.width / 2,
    y: 30,
    width: 20,
    height: 20,
};

// Bullet
const bullets = [];
const bulletSpeed = 2;

function drawPlayer() {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawEnemy() {
    ctx.fillStyle = '#f00';
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function drawBullets() {
    bullets.forEach(bullet => {
        ctx.fillStyle = '#ff0';
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.y -= bulletSpeed;
    });
}

function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw and update player position
    drawPlayer();
    player.x += player.dx;

    // Boundary checking for player
    if (player.x < 0) {
        player.x = 0;
    } else if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    // Draw enemy and bullets
    drawEnemy();
    drawBullets();

    // Remove bullets when they go off screen
    for (let i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].y + bullets[i].height < 0) {
            bullets.splice(i, 1);
        }
    }

    requestAnimationFrame(update);
}

function moveRight() {
    player.dx = player.speed;
}

function moveLeft() {
    player.dx = -player.speed;
}

function shoot() {
    bullets.push({ x: player.x + player.width / 2 - 2.5, y: player.y, width: 5, height: 10 });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveLeft();
    } else if (e.key === ' ') {
        shoot();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'd' || e.key === 'a') {
        player.dx = 0;
    }
});

update();
