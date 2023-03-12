
class Chicky {
    constructor(game, x, y, width, height, indexImage) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = (this.indexImage == 1) ? 2 : -2;
        this.init();
        this.indexImage = indexImage;


    }

    init() {
        this.chicky_imgs = [];
        this.chicky_imgs[1] = new Image();
        this.chicky_imgs[1].src = "./assets/images/chicky/1.png";
        this.chicky_imgs[2] = new Image();
        this.chicky_imgs[2].src = "./assets/images/chicky/2.png";
    }

    update() {
        this.x += this.speed;
        if (this.x >= game_W || this.x <= 0) {
            this.speed = -this.speed;
            this.x += this.speed;
            this.indexImage = 3 - this.indexImage;
        }

    }

    draw() {
        // console.log(this.indexImage);
        this.game.context.drawImage(this.chicky_imgs[this.indexImage], this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

}