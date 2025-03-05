class Player {
    constructor(board) {
        this.board = board;
        this.sprite = textures.character_right;
        this.x = 0;
        this.y = 0;
        this.lastDir = 0;
        this.spawn();
        this.gameOver = false;
        this.start = false;
        this.health = 5;
        this.point = 0;
        
    }
   
    spawn() {
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

    checkGameOver() {
        this.gameOver = true;
        Life.subtractLife();  
    }



    collision(x,y){
        if(this.x == x && this.y == y && !this.board.cells[this.x+1][this.y].island){
            player.start = false;
            this.x++;
        }else if (this.x == x && this.y == y && this.board.cells[this.x+1][this.y].island){
            player.start = false;
            enemy.x --
        }
    }



    move(code) {
        let nextX = this.x;
        let nextY = this.y;
        if (this.gameOver == false && this.start == true ){
        switch (code) {
            case 32: // Jump (Espacio)
            if(inventory.jumps > 0){
                 if(this.lastDir == 87 && !(this.board.cells[this.x][this.y+1].island) ){ // W
                    nextY = nextY - 2;
                    inventory.jumps--
                    if (sound) {    
                        musicJump.play();
                        }
                } else if(this.lastDir == 83 && !(this.board.cells[this.x][this.y-1].island)){ // S
                    nextY = nextY + 2;
                    inventory.jumps--
                    if (sound) {    
                        musicJump.play();
                        }
                } else if(this.lastDir == 65 && !(this.board.cells[this.x-1][this.y].island)){ // A
                    nextX = nextX - 2;
                    inventory.jumps--
                    if (sound) {    
                        musicJump.play();
                        }
                } else if(this.lastDir == 68 && !(this.board.cells[this.x+1][this.y].island)){ // D
                    nextX = nextX + 2;
                    inventory.jumps--
                    if (sound) {    
                        musicJump.play();
                        }
                }
                itemsCounter();
                
            } 

                break;
            case 87: // W
                this.lastDir = 87;
                nextY--;
                this.sprite = textures.character_up;
                break;
            case 83: // S
                this.lastDir = 83;
                nextY++;
                this.sprite = textures.character_down;
                break;
            case 65: // A
                this.lastDir = 65;
                nextX--;
                this.sprite = textures.character_left;
                break;
            case 68: // D
                this.lastDir = 68;
                nextX++;
                this.sprite = textures.character_right;
                break;
        }}
            
        if (this.canMove(nextX, nextY)) {
            this.x = nextX;
            this.y = nextY;
        }
        enemy.move(this.x, this.y); 
        this.pushBomb(nextX, nextY);
        this.takeBomb(nextX, nextY);
        this.chestAnimation(nextX, nextY);
        person.collisionPlayer(this.x,this.y)
        person.pushPerson(this.x,this.y);

        
        if (this.board.cells[nextX][nextY] instanceof Jellyfish){
            this.board.cells[nextX][nextY] = new Jellyfishdead();
            this.health--;
            Life.updateLife(this.health)
            if (sound) {
                musicZap.play(); 
            }
        }

        // Explosion
        if (this.board.cells[nextX][nextY] instanceof Bomb){
            this.board.cells[nextX][nextY] = new Boom();
            this.sprite = textures.boom;
            enemy.cryKraken();
            if (sound) {
                musicBoom.play(); 
            }
            this.checkGameOver();
            
        }

        
    }


    chestAnimation(nextX, nextY) {
        if (keyCode == 69 && (
            this.board.cells[nextX - 1][nextY] instanceof ChestClose ||
            this.board.cells[nextX + 1][nextY] instanceof ChestClose ||
            this.board.cells[nextX][nextY - 1] instanceof ChestClose ||
            this.board.cells[nextX][nextY + 1] instanceof ChestClose)) {
            let chestX, chestY;
    
            
            if (this.board.cells[nextX - 1][nextY] instanceof ChestClose) {
                chestX = nextX - 1;
                chestY = nextY;
            } else if (this.board.cells[nextX + 1][nextY] instanceof ChestClose) {
                chestX = nextX + 1;
                chestY = nextY;
            } else if (this.board.cells[nextX][nextY + 1] instanceof ChestClose) {
                chestX = nextX;
                chestY = nextY + 1;
            } else if (this.board.cells[nextX][nextY - 1] instanceof ChestClose) {
                chestX = nextX;
                chestY = nextY - 1;
            }
    
            
            this.board.cells[chestX][chestY] = new ChestOpen();
    
            
            if (sound) {
                musicChest.play();
            }
    
            // Convertir el cofre abierto en Water1
            setTimeout(() => {
                this.board.cells[chestX][chestY] = new Water1();
            }, 700);
        }
    }

    pushBomb(x, y){
        if(inventory.bombs > 0){
            if(keyCode == 81){
            if (this.lastDir == 68 && enemy.x != x-1 && (this.board.cells[x-1][y] instanceof Water1 ||  this.board.cells[x-1][y] instanceof Water2)) { // D
                inventory.bombs--
                this.board.cells[x-1][y] = new Bomb();
                if (sound) {
                    musicSplash.play(); 
                }
            } else if(this.lastDir == 65 && enemy.x != x+1 && (this.board.cells[x+1][y] instanceof Water1 ||  this.board.cells[x+1][y] instanceof Water2)) { // A
                inventory.bombs--
                this.board.cells[x+1][y] = new Bomb();
                if (sound) {
                    musicSplash.play(); 
                }
            } else if(this.lastDir == 87 && enemy.x != y+1 && (this.board.cells[x][y+1] instanceof Water1 ||  this.board.cells[x][y]+1 instanceof Water2)) { // W
                inventory.bombs--
                this.board.cells[x][y+1] = new Bomb();
                if (sound) {
                    musicSplash.play(); 
                }
            } else if(this.lastDir == 83 && enemy.x != y-1 && (this.board.cells[x][y-1] instanceof Water1 ||  this.board.cells[x][y-1] instanceof Water2)) { // S
                inventory.bombs--
                this.board.cells[x][y-1] = new Bomb();
                if (sound) {
                    musicSplash.play(); 
                }
            }
            itemsCounter();
        }
        }
    }

    

    takeBomb(x, y){
        if(keyCode == 69 && (this.board.cells[x-1][y] instanceof Bomb || this.board.cells[x+1][y] instanceof Bomb || this.board.cells[x][y-1] instanceof Bomb || this.board.cells[x][y+1] instanceof Bomb) ){
            if (this.board.cells[x-1][y] instanceof Bomb) { 
                this.board.cells[x-1][y] = new Water1();
                inventory.bombs++
            } else if(this.board.cells[x+1][y] instanceof Bomb) { 
                this.board.cells[x+1][y] = new Water1();
                inventory.bombs++
            } else if(this.board.cells[x][y+1] instanceof Bomb) { 
                this.board.cells[x][y+1] = new Water1();
                inventory.bombs++
            } else if(this.board.cells[x][y-1] instanceof Bomb) { 
                this.board.cells[x][y-1] = new Water1();
                inventory.bombs++
            }
            itemsCounter();
            if (sound) {
                musicPickUp.play(); 
            }
        }
    }

    canMove(x, y) {
        if(person.takePerson == false){
            if (this.gameOver == false && this.start == true){
                return (x >= 0 && x < this.board.width 
                    && y >= 0 && y < this.board.height 
                    && this.board.cells[x][y] && this.board.cells[x][y].move == true 
                    && (x!=person.x || y !=person.y )); 
            }
        }else{
            if (this.gameOver == false && this.start == true){
                return (x >= 0 && x < this.board.width 
                    && y >= 0 && y < this.board.height 
                    && this.board.cells[x][y] && this.board.cells[x][y].move == true);
            }
        }
        
    }


    display() {
        let size = this.board.size;
        image(this.sprite, this.x * size, this.y * size, size, size);
    }
}
