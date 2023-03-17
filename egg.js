let eggVo_img = new Image();
eggVo_img.src = "./assets/images/eggVo.png";

class Egg {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.xEnd = this.x;
        this.width = width;
        this.height = height;
        this.speed = Util.fps / 20;
        this.wait = 0;
        this.breakEgg = false;
        this.visible = true;
        this.egg_img = new Image();
        this.egg_img.src = "./assets/images/eggs/" + (Math.ceil(Math.random() * 10000) % 9 + 1) + ".png";
    }
    isWait() {
        return (this.wait > 0);
    }
    update() {
        if (!this.visible)
            return;
        if (this.speed != 0)
            this.speed = Util.fps / 20;
        this.y += (this.speed * (1 + Util.systemNumber * 1.2));
        if (!this.isWait()) {
            if (this.y >= game_H - this.height / 2) {
                this.speed = 0;
                this.wait = 2 * Util.fps;

            }
        } else {
            this.wait--;
            // console.log("wait", this.wait, this.visible);
            if (this.wait == 1) {
                this.breakEgg = true;
            }
            if (this.wait == 0) {
                this.visible = false;
            }
        }


    }
    setVisible(visible) {
        this.visible = visible;
    }

    draw() {
        if (this.visible) {
            if (this.speed != 0)
                this.game.context.drawImage(this.egg_img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            else
                this.game.context.drawImage(eggVo_img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height / 2);
        }
    }
}