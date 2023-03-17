game_W = 0, game_H = 0;
NumberOfChicky = 3;
let bgImage = new Image();
bgImage.src = "assets/images/background1.png";
let ropeImage = new Image();
ropeImage.src = "assets/images/rope.png";
let phone_img = new Image();
phone_img.src = "assets/images/rotate.png";
class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.score = 0;
        this.heart = 5;
        this.init();
        this.listenMouse();
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

        let currentPlayer = Player.getCurrentPlayer();
        this.player = new Player(currentPlayer);
        // console.log("player", this.player);
        Util.findPlayerByPhoneNumberAndGameId(this.player.getPhonenumber(), 'get-eggs').then((respone) => {
            Util.setItem("player-get-eggs", respone);
            // console.log(Util.getItem("player-get-eggs"));
        })
        this.buttonManager = new ButtonManager(this, 100, this.player);

        this.start();
        this.listenMouse();
    }

    loop(timestamp) {
        this.render();
        if (this.heart <= 0 || game_W < 1.5 * game_H) {
            this.drawPhone();
        } else {
            Util.calculateFPS(timestamp);
            this.update();
            this.draw();
        }
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    start() {
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    update() {
        // console.log("Linh");
        // console.log(Util.fps);
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
                    if (x_leftEgg >= x_leftBasket && x_rightEgg <= x_rightBasket &&
                        y_topEgg >= y_topBasket && y_botEgg <= y_botBasket && !egg.isWait()) {
                        this.score++;
                        Util.calSystemNumber(this.score);
                        // console.log("SystemNumber", Util.systemNumber);
                        egg.setVisible(false);

                        // console.log(this.score);
                    }
                    if (egg.breakEgg) {
                        this.heart--;
                        if (this.heart == 0) {
                            let phoneNumber = this.player.getPhonenumber();
                            Util.postPlayerScore(this.player.getName(), 'get-eggs', this.player.getSchool(), this.player.getPhonenumber(), this.score).then(res => {
                                Util.findPlayerByPhoneNumberAndGameId(phoneNumber, 'get-eggs').then((respone) => {
                                    Util.setItem("player-get-eggs", respone);
                                    // console.log(Util.getItem("player-get-eggs"));
                                    alert("Số điểm của bạn là " + this.score + "\nĐiểm cao nhất của bạn là: " + (this.player.getScore() > this.score ? this.player.getScore() : this.score));
                                    window.location.href = "";
                                })
                            })
                        }
                    }
                }
            }

        }
    }

    drawScore() {
        this.context.textAlign = "center";
        var text = this.score;
        var font = "bold 30px Arial";
        this.context.font = font;
        this.context.fillStyle = "white";

        var y = this.basket.y + this.basket.height / 2.4;
        this.context.fillText(text, this.basket.x, y);
    }

    drawInfoPlayer() {
        this.context.textAlign = "left";
        var text = "Xin chào " + this.player.getName();
        var text2 = "Điểm cao nhất của bạn là: " + this.player.getScore();
        var font = "bold 15px Arial";
        this.context.font = font;
        this.context.fillStyle = "red";
        this.context.fillText(text, this.basket.width / 2, this.basket.width / 4);
        this.context.fillText(text2, this.basket.width / 2, this.basket.width / 4 + 30);
    }

    drawHeart() {
        this.context.textAlign = "center";
        var text = this.heart + "x ❤";
        var font = "bold 30px Arial";
        this.context.font = font;
        this.context.fillStyle = "red";

        var y = this.basket.y + this.basket.height / 2.4;
        this.context.fillText(text, game_W - this.basket.width / 1.5, game_H - this.basket.height / 4);
    }

    drawPhone() {
        if (game_W / game_H < 1.3) {
            this.clearScreen();
            let size = Math.min(game_W, game_H);
            let x = (game_W - size) / 2;
            let y = (game_H - size) / 2;
            this.context.drawImage(phone_img, x, y, size, size);
        }
    }
    drawRope() {
        this.context.drawImage(ropeImage, 0, this.chickies[0].height, game_W, 20);
    }

    draw() {
        this.clearScreen();
        this.drawRope()
        this.drawHeart();
        this.drawInfoPlayer();
        this.basket.draw();
        this.drawScore();
        this.buttonManager.draw();
        for (let i = 0; i < NumberOfChicky; i++)
            this.chickies[i].draw();
        this.drawPhone();
    }


    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, game_W, game_H);
        this.context.drawImage(bgImage, 0, 0, game_W, game_H);
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
            this.buttonManager.isClick(x, y);
        })

        document.addEventListener("mousemove", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            this.basket.setxEnd(x);
            this.basket.moveLeft = this.basket.moveRight = false;
        })

        document.addEventListener("mouseup", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })

        document.addEventListener("keydown", evt => {
            //space
            // console.log(evt.keyCode);
            if (evt.keyCode == 37) {
                this.basket.moveLeft = true;
                this.basket.moveRight = false;
            }
            if (evt.keyCode == 39) {
                this.basket.moveRight = true;
                this.basket.moveLeft = false;
            }
        });

        document.addEventListener("keyup", evt => {
            // console.log(evt.keyCode);
            if (evt.keyCode == 37) {
                this.basket.moveLeft = false;
            }
            if (evt.keyCode == 39) {
                this.basket.moveRight = false;
            }
            this.basket.setxEnd(this.basket.x);

        })
    }

}

var g = new game();