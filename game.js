game_W = 0, game_H = 0;
NumberOfChicky = 3;
class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.score = 0;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.render();
        this.basket = new Basket(this, 33, game_H - 75, 134, 150);
        this.chickies = []
        for (let i = 0; i < NumberOfChicky; i++) {
            this.chickies[i] = new Chicky(this, Math.random() * game_W, 60, 100, 120, Math.ceil(Math.random() + 1));
        }

        this.start();
        this.listenMouse();
    }

    loop(timestamp) {
        this.update();
        this.draw();
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    start() {
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    update() {
        // console.log("Linh");
        this.basket.update();
        for (let i = 0; i < NumberOfChicky; i++) {
            this.chickies[i].update();
        }
        for (let i = 0; i < NumberOfChicky; i++) {
            for (let j = 0; j < this.chickies[i].eggs.length; j++) {
                let egg = this.chickies[i].eggs[j];
                let x_leftBasket = this.basket.x - this.basket.width / 2;
                let x_rightBasket = this.basket.x + this.basket.width / 2;
                let y_topBasket = this.basket.y - egg.height / 4;
                let y_botBasket = this.basket.y + this.basket.height / 2;

                let x_leftEgg = egg.x - egg.width / 2;
                let x_rightEgg = egg.x + egg.width / 2;
                let y_topEgg = egg.y - egg.height / 2;
                let y_botEgg = egg.y + egg.height / 2;
                if (egg.visible) {
                    if (x_leftEgg >= x_leftBasket && x_rightEgg <= x_rightBasket
                        && y_topEgg >= y_topBasket && y_botEgg <= y_botBasket) {
                        console.log("hellofdbdg");
                        egg.setVisible(false);
                        this.score++;
                        console.log(this.score);
                    }
                }
            }
        }

    }


    draw() {
        this.clearScreen();
        this.basket.draw();
        for (let i = 0; i < NumberOfChicky; i++)
            this.chickies[i].draw();

    }


    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = "Black";
        this.context.textAlign = "center";
        this.context.fillRect(0, 0, game_W, game_H);
    }


    render() {
        if (this.canvas.width != document.documentElement.clientWidth || this.canvas.height != document.documentElement.clientHeight) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            game_W = this.canvas.width;
            game_H = this.canvas.height;
        }
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })

        document.addEventListener("mousemove", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            this.basket.setxEnd(x);
        })

        document.addEventListener("mouseup", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;

        })
    }

}

var g = new game();