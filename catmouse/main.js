var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

class Cat {
    constructor(x, y, dx, dy, width, height, acc, img) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.acc = acc;
        this.img = img;
        this.width = width;
        this.height = height;
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y);

        // update position
        this.x += this.dx;
        this.y += this.dy;

        // update velocity based on keypress
        if (rightPressed) {
            this.dx += this.acc;
            this.img.src = 'cat.png';
        }
        if (leftPressed) {
            this.dx -= this.acc;
            this.img.src = 'cat_r.png';
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
        if (this.x > canvas.width - this.width) {
            this.dx = 0;
            this.x = canvas.width - this.width;
        }
        if (this.y < 0) {
            this.dy = 0;
            this.y = 0;
        }
        if (this.y > canvas.height - this.height) {
            this.dy = 0;
            this.y = canvas.height - this.height;
        }
    }
    compute_distance(object) {
        var dist_x = this.x + this.width/2 - object.x - object.width/2
        var dist_y = this.y + this.height/2 - object.y - object.height/2
        var dist = Math.pow(dist_x, 2) + Math.pow(dist_y, 2)
        return dist
    }
}
var cat_img = new Image();
cat_img.src = 'cat.png';
cat = new Cat(100, 100, 0, 0, 138, 174, 0.1, cat_img);


class Mouse {
    constructor(x, y, speed, width, height) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.dx = speed;
        this.dy = speed;
        this.width = width;
        this.height = height;

        this.img = new Image();
        this.img.src = 'mouse.png';
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y);

        this.x += this.dx;
        this.y += this.dy;

        if (this.dx > 0) {
            this.img.src = 'mouse_r.png';
        } else if (this.dx < 0) {
            this.img.src = 'mouse.png';
        }

        if (this.x < 0) {
            this.dx = this.speed;
        } else if (this.y < 0) {
            this.dy = this.speed;
        } else if (this.x > canvas.width - this.width) {
            this.dx = -this.speed;
        } else if (this.y > canvas.height - this.height) {
            this.dy = -this.speed;
        }
    }
}
mouse = new Mouse(700, 500, 10, 72, 82);
mouse2 = new Mouse(300, 300, 5, 72, 82);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cat.draw();
    mouse.draw();
    mouse2.draw();

    // win the game
    if (cat.compute_distance(mouse) < 1000) {
        mouse.img.src = 'explode.png';
        mouse.dx = 0;
        mouse.dy = 0;
    }
    if (cat.compute_distance(mouse2) < 1000) {
        mouse2.img.src = 'explode.png';
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
