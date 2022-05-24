class Snake {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.tail = [{ x: this.x, y: this.y }];
        this.rotateX = 0;
        this.rotateY = 1;
        this.color = "white";
    }

    move() {
        var newRect;

        if (this.rotateX === 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x + this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateX === -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x - this.size,
                y: this.tail[this.tail.length - 1].y
            }
        } else if (this.rotateY === 1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y + this.size
            }
        } else if (this.rotateY === -1) {
            newRect = {
                x: this.tail[this.tail.length - 1].x,
                y: this.tail[this.tail.length - 1].y - this.size
            }
        }
        this.tail.shift();
        this.tail.push(newRect);
    }
}

class Apple {
    constructor() {

        while (true) {
            var isTouching = false;
            this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size;
            this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size;
            for (var i = 0; i < snake.tail.length; i++) {
                if (snake.tail[i].x === this.x && snake.tail[i].y === this.y) {
                    isTouching = true;
                }
            }
            if (!isTouching) {
                break;
            }
        }
        this.color = "pink";
        this.size = snake.size;
        console.log(this.x, this.y);
    }
}

var backgroundColor = "black";

var canvas;

var snake;

var apple;

var canvasContext;


function gameLoop() {
    setInterval(show, 1000 / 20);
}

function show() {
    update();
    draw();
}

function backgroundBlink(color, delay, qty) {
    let counter = qty;
    let previousColor = backgroundColor;
    backgroundColor = color;
    new Promise((resolve, reject) => {
        setTimeout(() => {
            backgroundColor = previousColor;
            counter--;
            resolve(counter);
        }, delay);
    }).then((decrementedCounter) => {
        if (decrementedCounter > 0 ) {
            backgroundColor = previousColor;
            setTimeout(() => {                
                backgroundBlink(color, delay, decrementedCounter);
            }, delay);
            
        }
    });
}

function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    console.log("update");
    console.log("0x: " + snake.tail[0].x + " 0y: " + snake.tail[0].y);
    snake.move();
    eatApple();
    checkHitWall();
}

function checkHitWall() {
    snake.tail.forEach((item, index, array) => {
        if (item.x < 0 || item.y < 0 || item.x > canvas.width || item.y > canvas.height) {
            
        }

        if (item.x < 0) {
            snake.tail[index].x += canvas.width;
        } else if (item.x >= canvas.width) {
            snake.tail[index].x -= canvas.width;
        }

        if (item.y < 0) {
            snake.tail[index].y += canvas.height;
        } else if (item.y >= canvas.height) {
            snake.tail[index].y -= canvas.height;
        }
    });
}

function draw() {
    createRect(0, 0, canvas.width, canvas.height, backgroundColor);
    createRect(0, 0, canvas.width, canvas.height);
    snake.tail.forEach((item, index, arr) => {
        createRect(item.x + 2.5, item.y + 2.5, snake.size - 5, snake.size - 5, snake.color);
    });

    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "#00FF24";
    canvasContext.fillText("Score: " + (snake.tail.length - 1), canvas.width - 120, 18);
    createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
    console.log(snake.tail[0].x, snake.tail[0].y);
}

function eatApple() {
    if (snake.tail[snake.tail.length - 1].x == apple.x && snake.tail[snake.tail.length - 1].y == apple.y) {
        snake.tail[snake.tail.length] = { x: apple.x, y: apple.y }
        apple = new Apple();
    }
}

function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height)
}

window.onload = () => {
    canvas = document.getElementById("canvas");

    snake = new Snake(20, 20, 20);

    apple = new Apple();

    canvasContext = canvas.getContext("2d");

    gameLoop();
}

window.addEventListener("keydown", (event) => {
    setTimeout(() => {
        if (event.keyCode == 37 && snake.rotateX != 1) {
            snake.rotateX = -1;
            snake.rotateY = 0;
        } else if (event.keyCode == 38 && snake.rotateY != 1) {
            snake.rotateX = 0;
            snake.rotateY = -1;
        } else if (event.keyCode == 39 && snake.rotateX != -1) {
            snake.rotateX = 1;
            snake.rotateY = 0;
        } else if (event.keyCode == 40 && snake.roteteY != -1) {
            snake.rotateX = 0;
            snake.rotateY = 1;
        } else if (event.keyCode == 13) {
            backgroundBlink("red", 60, 1);
        }
        console.log(event.keyCode);
    }, 1);
});