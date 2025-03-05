class Enemy {
    constructor(board) {
        this.board = board;
        this.sprite = textures.kraken1;
        this.x = 0;
        this.y = 0;
        this.lastDir = 0;
        this.spawn();
        this.gameOver = false;
        this.step = 0;
        this.frameCount = 0;
        this.animation = 0;
        this.enemigoWins = false;
        
    }

    spawn() {
        //Prueba Enemigo
        /*this.x = player.x+5
        this.y = player.y+5*/
        
        do {
            this.x = Math.floor(Math.random() * this.board.width);
            this.y = Math.floor(Math.random() * this.board.height);
        } while (
            this.board.cells[this.x][this.y].island ||
            this.board.cells[this.x - 1][this.y].island ||
            this.board.cells[this.x][this.y - 1].island ||
            this.board.cells[this.x][this.y + 1].island ||
            this.board.cells[this.x + 1][this.y].island ||
            this.board.cells[this.x][this.y] instanceof Jellyfish ||
            this.board.cells[this.x][this.y] instanceof ChestClose
        );   
    }

    cryKraken() {
        this.sprite = textures.kraken4
        this.gameOver = true;
    }

    restartGame() {
        if (this.gameOver == true) {
            if (sound) {
                musicKraken.play();
            }
            this.spawn();
            this.sprite = textures.kraken1;
            this.gameOver = false;
            Counter.addCounterKraken()
        }
    }

    stepSprite() {
        if (this.step % 2 == 0) {
            this.sprite = textures.kraken1
        } else {
            this.sprite = textures.kraken2
        }
    }


    collision() {
        this.animation = min(this.animation + 1, 3);
        if (this.animation == 0) {
            this.sprite = textures.kraken3;
        } else if (this.animation == 1) {
            this.sprite = textures.kraken3_1;
        } else {
            this.sprite = textures.kraken3_2;
            player.sprite = textures.character_boom;
            player.checkGameOver();
        }
       
    }

    move(playerX, playerY) {
        let nextX = this.x;
        let nextY = this.y;

        if (this.gameOver == false && player.start == true && (keyCode == 87 || keyCode == 83 || keyCode == 65 || keyCode == 68 || keyCode == 32)) {
            let enemyX = playerX - this.x;
            let enemyY = playerY - this.y;

            if (Math.abs(enemyX) <= 1 && Math.abs(enemyY) <= 1) {
                nextX = playerX;
                nextY = playerY;
            } else {
                if (Math.abs(enemyX) > Math.abs(enemyY)) {
                    if (enemyX > 0 && (this.board.cells[nextX][nextY] && this.board.cells[nextX][nextY].move == true)) {
                        nextX++;
                        this.step++;
                        this.lastDir = 68; // D
                        this.stepSprite();
                    } else if (enemyX < 0 && (this.board.cells[nextX][nextY] && this.board.cells[nextX][nextY].move == true)) {
                        nextX--;
                        this.step++;
                        this.lastDir = 65; // A
                        this.stepSprite();
                    }
                } else {
                    if (enemyY > 0 && (this.board.cells[nextX][nextY] && this.board.cells[nextX][nextY].move == true)) {
                        nextY++;
                        this.step++;
                        this.lastDir = 83; // S
                        this.stepSprite();
                    } else if (enemyY < 0 && (this.board.cells[nextX][nextY] && this.board.cells[nextX][nextY].move == true)) {
                        nextY--;
                        this.step++;
                        this.lastDir = 87; // W
                        this.stepSprite();
                    }
                }
            }

            this.chestCollision(this.x, this.y, nextX, nextY);


            if (this.canMove(nextX, nextY)) {
                this.x = nextX;
                this.y = nextY;

                if (this.x === playerX && this.y === playerY) {
                    player.collision(this.x, this.y);
                    this.animation = -1
                    this.enemigoWins = true;
                    this.gameOver = true;
                }

                if (this.board.cells[nextX][nextY] instanceof Jellyfish){
                    this.board.cells[nextX][nextY] = new Jellyfishdead();
                    if (sound) {
                        musicZap.play(); 
                    }
                }

                if (this.board.cells[nextX][nextY] instanceof Bomb) {
                    this.board.cells[nextX][nextY] = new Boom();
                    this.sprite = textures.boom;
                    this.gameOver = true;
                    this.restartGame();
                    if (sound) {
                        musicBoom.play(); 
                    }
                }
            }
            person.collisionEnemy(this.x,this.y)
            
        }
    }

    canMove(x, y) {
        if (this.gameOver == false && player.start == true) {
            return (x >= 0 && x < this.board.width && y >= 0 && y < this.board.height && this.board.cells[x][y] && this.board.cells[x][y].move == true);
        }
    }

    chestCollision(x, y, nextX, nextY) {
       
        if ((x > 0 && this.board.cells[x - 1][y] instanceof ChestClose) || 
            (x < this.board.width - 1 && this.board.cells[x + 1][y] instanceof ChestClose) || 
            (y > 0 && this.board.cells[x][y - 1] instanceof ChestClose) || 
            (y < this.board.height - 1 && this.board.cells[x][y + 1] instanceof ChestClose)) { 
    
            let chestX, chestY;
    
           
            if (x > 0 && this.board.cells[x - 1][y] instanceof ChestClose) { 
                chestX = x - 1;
                chestY = y;
            } else if (x < this.board.width - 1 && this.board.cells[x + 1][y] instanceof ChestClose) {
                chestX = x + 1;
                chestY = y;
            } else if (y > 0 && this.board.cells[x][y - 1] instanceof ChestClose) { 
                chestX = x;
                chestY = y - 1;
            } else if (y < this.board.height - 1 && this.board.cells[x][y + 1] instanceof ChestClose) { 
                chestX = x;
                chestY = y + 1;
            }
    
            if ((nextX === chestX && nextY === chestY)) {
                this.board.cells[chestX][chestY] = new Water1();
    
                if (sound) {
                    musicSplash.play();
                }
            }
        }
    }

    display() {


        if (this.enemigoWins == true) {
            if (frameCount % 30 == 0) {
                this.collision();
            }
        }

        let size = this.board.size;
        image(this.sprite, this.x * size, this.y * size, size, size);
    }
}
