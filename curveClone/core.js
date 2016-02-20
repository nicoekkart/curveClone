var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// position ball

var ballX = Math.floor(Math.random() * canvas.width);
var ballY = Math.floor(Math.random() * canvas.height);
var ballRadius = 3;
var direction = Math.floor(Math.random() * (Math.PI * 2));
var dx = 1;
var dy = 1;
var speed = 2;

// Keyboard

var rightPressed = false;
var leftPressed = false;

// trace

var trail = [];
var tempTrail = [];
var counter = 0;

function radToCoordinates(rad) {    //convert a direction in radians to dx and dy
    "use strict";
    var dx = Math.cos(rad),
        dy = Math.sin(rad);
    return {
        dx: dx,
        dy: dy
    };
}

function drawBall() {
    "use strict";
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function moveBall() {
    "use strict";
    if (rightPressed) {             //change direction in function of keys
        direction += Math.PI * speed / 100;
    } else if (leftPressed) {
        direction -= Math.PI * speed / 100;

    }
    dx = radToCoordinates(direction).dx;
    dy = radToCoordinates(direction).dy;
    var dxdy = Math.abs(dx) + Math.abs(dy);

    dx = dx * speed / dxdy;
    dy = dy * speed / dxdy;

    ballX += dx;
    ballY += dy;
    tempTrail.push({                //add current position to temporary trail
        X: ballX,
        Y: ballY,
        radius: ballRadius
    });
    counter += 1;
    if (counter > 5) {              //after a while, start copying the temporary trail to the trail (this is to avoid that the ball collides with the just-made trail)
        trail.push(tempTrail[0]);
        tempTrail = [];
        counter = 0;

    }
}

function touchWalls() {
    "use strict";
    if (ballX < ballRadius || ballX > canvas.width - ballRadius || ballY < ballRadius || ballY > canvas.height - ballRadius) {
        return true;
    }
    return false;
}

    function distance(x1, x2, y1, y2) {  // Compute distance between 2 points
    "use strict";
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

    function touchTrail() {      //detect contact with trail
    "use strict";
    var t, dist;
    for (t = 0; t < trail.length; t += 1) {
        dist = distance(trail[t].X, ballX, trail[t].Y, ballY);
        if (dist < ballRadius * 2) {
            console.log(dist);
            return true;

        }
    }
    return false;
}

// main function

function draw() {
    "use strict";
    drawBall();
    moveBall();
    if (touchWalls() || touchTrail()) {
        console.log(trail);
        alert("Game Over!");
        document.location.reload();

    }
    requestAnimationFrame(draw);
}

    //Keyboard events functions

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    "use strict";
    if (e.keyCode === 39) {
        rightPressed = true;
    } else if (e.keyCode === 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    "use strict";
    if (e.keyCode === 39) {
        rightPressed = false;
    } else if (e.keyCode === 37) {
        leftPressed = false;
    }
}

draw();