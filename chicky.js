class Chicky {
    constructor(game, x, y, width, height, indexImage) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = (this.indexImage == 1) ? 2 : -2;
        this.wait = 0;
        this.init();
        this.indexImage = indexImage;

    }

    isWait() {
        return (this.wait > 0);
    }

    randomWait() {
        let recent = 0.1 * (1 + Util.systemNumber * 3);
        if (Math.random() * 100 < recent) {
            this.wait = 3 * Util.fps;
        }
    }

    init() {
        this.chicky_imgs = [];
        this.chicky_imgs[1] = new Image();
        this.chicky_imgs[1].src = "./assets/images/chicky/1.png";
        this.chicky_imgs[2] = new Image();
        this.chicky_imgs[2].src = "./assets/images/chicky/2.png";
        this.eggs = [];
    }

    update() {
        if (!this.isWait()) {
            this.x += (this.speed * (1 + Util.systemNumber * 3));
            if (this.x >= game_W || this.x <= 0) {
                this.speed = -this.speed;
                this.x += this.speed;
                this.indexImage = 3 - this.indexImage;
            }
            this.randomWait();
        } else {
            // de
            this.wait--;
            if (this.wait == 0) {
                this.addEgg(this.x, this.y)
            }
        }
        for (let i = 0; i < this.eggs.length; i++)
            this.eggs[i].update();

    }
    addEgg(x, y) {
        let egg = new Egg(this.game, x, y + this.height / 2, 30, 40);
        this.eggs.push(egg);
    }

    draw() {
        // console.log(this.indexImage);
        this.game.context.drawImage(this.chicky_imgs[this.indexImage], this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        for (let i = 0; i < this.eggs.length; i++)
            this.eggs[i].draw()
    }

}