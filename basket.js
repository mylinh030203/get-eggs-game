let basket_img = new Image();
basket_img.src = "./assets/images/basket.png";

class Basket {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.speed = 10;
    }

    update() {
        this.x += this.speed;
    }

    draw() {
        this.game.context.drawImage(basket_img, this.x, this.y, 134, 150);
    }
}