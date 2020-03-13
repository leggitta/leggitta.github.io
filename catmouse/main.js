var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var mouse = new Image();
mouse.src = 'mouse.jpg';


class Cat {
    constructor(x, y, dx, dy, acc, img) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.acc = acc;
        this.img = img;
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y);

        // update position
        this.x += this.dx;
        this.y += this.dy;

        // update velocity based on keypress
        if (rightPressed) {
            this.dx += this.acc;
        }
        if (leftPressed) {
            this.dx -= this.acc;
        }
        if (upPressed) {
            this.dy -= this.acc;
        }
        if (downPressed) {
            this.dy += this.acc;
        }

        // prevent cat from running off screen 
        if (this.x < 0) {
            this.dx = 0;
            this.x = 0;
        }
        if (this.x > canvas.width-50) {
            this.dx = 0;
            this.x = canvas.width-50;
        }
        if (this.y < 0) {
            this.dy = 0;
            this.y = 0;
        }
        if (this.y > canvas.height-50) {
            this.dy = 0;
            this.y = canvas.height-50;
        }
    }

}
var cat_img = new Image();
cat_img.src = 'cat.jpeg';
cat = new Cat(100, 100, 0, 0, 0.1, cat_img);


class Mouse {
    constructor(x, y, speed, img) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.dx = speed;
        this.dy = speed;
        this.img = img;
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y);

        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0) {
            this.dx = this.speed;
        } else if (this.y < 0) {
            this.dy = this.speed;
        } else if (this.x > canvas.width-30) {
            this.dx = -this.speed;
        } else if (this.y > canvas.height-30) {
            this.dy = -this.speed;
        }
    }
}
var mouse_img = new Image();
mouse_img.src = 'mouse.jpg';
mouse = new Mouse(700, 500, 10, mouse_img);
mouse2 = new Mouse(300, 300, 5, mouse_img);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cat.draw();
    mouse.draw();
    mouse2.draw();

    // win the game
    if (Math.pow(cat.x - mouse.x, 2) + Math.pow(cat.y - mouse.y, 2) < 100) {
        mouse.dx = 0;
        mouse.dy = 0;        
    }
    if (Math.pow(cat.x - mouse2.x, 2) + Math.pow(cat.y - mouse2.y, 2) < 100) {
        mouse2.dx = 0;
        mouse2.dy = 0;
    }
};
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}
var interval = setInterval(draw, 10);
