var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = 100;
var y = 100;
var rad = 10;

function cb_touchstart(e) {
}

function cb_touchmove(e) {
    e.preventDefault();

    touches = e.changedTouches;

    for (var i = 0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);
        if (idx >= 0) {
            x = touches[i].pageX;
            y = touches[i].pageY;
        }
    }
}


function cb_touchcancel(e) {
}

function cb_touchend(e) {
}

document.addEventListener("touchstart", cb_touchstart);
document.addEventListener("touchmove", cb_touchmove);
document.addEventListener("touchcancel", cb_touchcancel);
document.addEventListener("touchend", cb_touchend);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI*2);
    ctx.fillStyle = "#00ff00";
    ctx.fill();
    ctx.closePath();
}

var interval = setInterval(draw, 10);
