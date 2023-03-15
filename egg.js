let egg_img = new Image();
egg_img.src = "./assets/images/egg.png";
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
        this.speed = 2;
        this.wait = 0;
        this.breakEgg = false;
        this.visible = true;
    }
    isWait() {
        return (this.wait > 0);
    }
    update() {
        this.y += this.speed;
        if (!this.isWait()) {
            if (this.y >= game_H - this.height / 2) {
                this.speed = 0;
                this.wait = 100;

            }
        } else {
            this.wait--;
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
                this.game.context.drawImage(egg_img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            else
                this.game.context.drawImage(eggVo_img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height / 2);
        }
    }
}