let egg_img = new Image();
egg_img.src = "./assets/images/egg.png";

class Egg {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.xEnd = this.x;
        this.width = width;
        this.height = height;
        this.speed = 2;
    }
    update() {
        this.y += this.speed;

    }

    draw() {
        this.game.context.drawImage(egg_img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}