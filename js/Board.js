class Board {
    constructor() {
        this.width = 200;
        this.height = 200;
        this.size = 30;
        this.cells = new Array(this.width);

        for (let i = 0; i < this.width; i++) {
            this.cells[i] = new Array(this.height);
        }
        this.fillRandom();
    }

    fillRandom() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let r = 200 * noise(x * 0.1, y * 0.1);
                if (r > 60) {
                    let isWater2 = Math.random() < 0.05; // 5% de probabilidad de Water2
    
                    if (isWater2) {
                        this.cells[x][y] = new Water2();
                    } else {
                        this.cells[x][y] = new Water1();
    
                        // 0.5% de probabilidad de que aparezca un Chest en Water1
                        let isChest = Math.random() < 0.001; // 0.5% de probabilidad
                        if (isChest) {
                            this.cells[x][y] = new ChestClose();
                        }
                    }
    
                    if (this.cells[x][y] instanceof Water1) {
                        let RANDOM = Math.floor(Math.random() * 60);
                        if (RANDOM === 2) {
                            this.cells[x][y] = new Jellyfish();
                        }
                    }
                } else {
                    this.cells[x][y] = new Grass();
                }
            }
        }


        
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.cells[x][y] instanceof Grass) {
                    this.bitMasking(x, y); 
                }
            }
        }
    }

    bitMasking(x, y) {
        let bitmask = 0;

        // Verificar celdas adyacentes y sumar valores según la presencia de agua
        // Arriba (1)
        if (y > 0 && !this.cells[x][y - 1].island) bitmask += 1;
        // Derecha (2)
        if (x < this.width - 1 && !this.cells[x + 1][y].island) bitmask += 2;
        // Abajo (4)
        if (y < this.height - 1 && !this.cells[x][y + 1].island) bitmask += 4;
        // Izquierda (8)
        if (x > 0 && !this.cells[x - 1][y].island) bitmask += 8;

        // Cambiar el terreno según el valor de bitmask
        this.cells[x][y] = this.getTerrain(bitmask);
    }

    getTerrain(bitmask) {
        switch (bitmask) {
            case 0: 
            return new Terrain_0();  
            case 1:
                return new Terrain_1();   
            case 2: 
                return new Terrain_2();   
            case 3: 
                return new Terrain_3();   
            case 4: 
                return new Terrain_4();   
            case 5: 
                return new Terrain_5();   
            case 6: 
                return new Terrain_6();  
            case 7: 
                return new Terrain_7();  
            case 8: 
                return new Terrain_8();   
            case 9: 
                return new Terrain_9();   
            case 10: 
                return new Terrain_10(); 
            case 11: 
                return new Terrain_11(); 
            case 12: 
                return new Terrain_12(); 
            case 13: 
                return new Terrain_13(); 
            case 14: 
                return new Terrain_14(); 
            case 15: 
                return new Terrain_15(); 
        }
    }

    display() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.cells[x][y].display(x, y, this.size);
            }
        }
    }
}