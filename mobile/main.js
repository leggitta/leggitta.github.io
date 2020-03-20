var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = 100;
var y = 100;
var rad = 10;

function cb_touchstart(e) {
    console.log("touch start");
    console.log(e);
}


function cb_touchmove(e) {
    console.log("touch move");
    console.log(e);

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
    console.log("touch cancel");
    console.log(e);
}

function cb_touchend(e) {
    console.log("touch end");
    console.log(e);
}

document.addEventListener("touchstart", cb_touchstart, false);
document.addEventListener("touchmove", cb_touchmove, false);
document.addEventListener("touchcancel", cb_touchcancel, false);
document.addEventListener("touchend", cb_touchend, false);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI*2);
    ctx.fillStyle = "#00ff00";
    ctx.fill();
    ctx.closePath();
}

var interval = setInterval(draw, 10);
