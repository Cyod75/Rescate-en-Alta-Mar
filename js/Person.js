class Person{
    constructor(board) {
        this.board = board;
        this.x = 0;
        this.y = 0;
        this.sprite = textures.person;
        this.spawn();
        this.takePerson = false;
    } 

    spawn() {
        this.x = player.x-5
        this.y = player.y-5
        /*do {
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
        );*/
        
        
    }
    
    collisionPlayer(Px, Py) {
        const adjacent = 
            (Math.abs(this.x - Px) === 1 && this.y === Py) ||  
            (Math.abs(this.y - Py) === 1 && this.x === Px);    
    
        if (adjacent && keyCode === 69) {
            this.takePerson = true
            if (sound) {
                musicPickUp.play();
            }
            
        }
    }
// Modificando... (añadir un personaje en el inventario)
    pushPerson(Px, Py){
        if(this.takePerson){
            this.x = Px;
            this.y = Py; 
        
        if (keyCode == 70 && this.takePerson==true && 
            (this.board.cells[this.x][this.y].island ||
            this.board.cells[this.x - 1][this.y].island ||
            this.board.cells[this.x][this.y - 1].island ||
            this.board.cells[this.x][this.y + 1].island ||
            this.board.cells[this.x + 1][this.y].island) ){    

                this.takePerson=false;
                if (sound) {
                musicAddPerson.play();
                }
                this.spawn();
                Counter.addCounterPerson();
            }

        }
    }
    
/* pushPerson(Px, Py) {
    if (this.takePerson) {
        this.x = Px;
        this.y = Py;

        // Verifica si las coordenadas están dentro de los límites del tablero
        let isWithinBounds = (x, y) => {
            return x >= 0 && x < this.board.cells.length && y >= 0 && y < this.board.cells[0].length;
        };

        if (keyCode == 70 && this.takePerson == true) {
            // Verifica si la celda actual o alguna de las adyacentes es una isla
            let isIsland = this.board.cells[this.x][this.y].island ||
                (isWithinBounds(this.x - 1, this.y) && this.board.cells[this.x - 1][this.y].island ||
                (isWithinBounds(this.x, this.y - 1)) && this.board.cells[this.x][this.y - 1].island ||
                (isWithinBounds(this.x, this.y + 1)) && this.board.cells[this.x][this.y + 1].island ||
                (isWithinBounds(this.x + 1, this.y)) && this.board.cells[this.x + 1][this.y].island)

            if (isIsland) {
                this.takePerson = false;
                if (sound) {
                    musicAddPerson.play();
                }
                this.spawn();
                Counter.addCounterPerson();
            }
        }
    }
}*/


    collisionEnemy(Ex,Ey){
        if(this.x == Ex && this.y == Ey){
            this.spawn();
            if (sound) {
                musicShout.play(); 
            }
            Counter.lessCounterPerson();
        }
        
    }



    positionPerson(){
        const image = document.getElementById("compass")
        if(this.x > player.x && this.y > player.y ){
            image.src = "./image/compass_SE.png"
        }else if (this.x < player.x && this.y < player.y ){
            image.src = "./image/compass_NW.png"
        }else if (this.x > player.x && this.y < player.y ){
            image.src = "./image/compass_NE.png"
        }else if (this.x < player.x && this.y > player.y ){
            image.src = "./image/compass_SW.png"
        }else if (this.x < player.x && this.y == player.y ){
            image.src = "./image/compass_W.png"
        }else if (this.x == player.x && this.y < player.y ){
            image.src = "./image/compass_N.png"
        }else if (this.x > player.x && this.y == player.y ){
            image.src = "./image/compass_E.png"
        }else if (this.x == player.x && this.y > player.y ){
            image.src = "./image/compass_S.png"
        }else if (this.x == player.x && this.y == player.y ){
            image.src = "./image/compass.png"
        }
    }

    display() {
        let size = this.board.size;
        image(this.sprite, this.x * size, this.y * size, size+7,size+7); 
    }

}