let basket_img = new Image();
basket_img.src = "./assets/images/basket.png";

class Basket {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.xEnd = this.x;
        this.width = width;
        this.height = height;
        this.speed = Util.fps / 2.5;
    }

    update() {
        this.speed = Util.fps / 2;
        if (this.xEnd > this.x) {
            this.x += this.speed;
            if (this.x > this.xEnd) {
                this.x = this.xEnd;
            }
        } else {
            this.x -= this.speed;
            if (this.x < this.xEnd) {
                this.x = this.xEnd;
            }
        }
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
    }

    setX(x) {
        this.x = x;
    }
    setxEnd(xEnd) {
        this.xEnd = xEnd;
    }

    draw() {
        this.game.context.drawImage(basket_img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}