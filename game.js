game_W = 0, game_H = 0;

class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.basket = new Basket(this, 33, 45);

        this.render();
        this.start();
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
        console.log("Linh");
        this.basket.update();
    }


    draw() {
        this.clearScreen();
        this.basket.draw();
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

}

var g = new game();