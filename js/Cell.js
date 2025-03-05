class Cell {
    constructor(terrain, move) {
        this.terrain = terrain;
        this.move = move;
        this.island = true; 
    }
}

class Grass extends Cell {
    constructor() {
        super("grass", false);
    }
    display(x, y, size) {
        image(textures.grass, x * size, y * size, size, size);
    }
}

class Bomb extends Cell{
    constructor(){
        super("bomb",true);
        }
        display(x,y,size){
            image(textures.bomb, x * size, y * size, size, size)
    }
}

class Terrain_0 extends Cell {
    constructor() {
        super("terrain0", false);
    }
    display(x, y, size) {
        image(textures.terrain0, x * size, y * size, size, size);
    }
}

class Terrain_1 extends Cell {
    constructor() {
        super("terrain1", false);
    }
    display(x, y, size) {
        image(textures.terrain1, x * size, y * size, size, size);
    }
}

class Terrain_2 extends Cell {
    constructor() {
        super("terrain2", false);
    }
    display(x, y, size) {
        image(textures.terrain2, x * size, y * size, size, size);
    }
}

class Terrain_3 extends Cell {
    constructor() {
        super("terrain3", false);
    }
    display(x, y, size) {
        image(textures.terrain3, x * size, y * size, size, size);
    }
}

class Terrain_4 extends Cell {
    constructor() {
        super("terrain4", false);
    }
    display(x, y, size) {
        image(textures.terrain4, x * size, y * size, size, size);
    }
}

class Terrain_5 extends Cell {
    constructor() {
        super("terrain5", false);
    }
    display(x, y, size) {
        image(textures.terrain5, x * size, y * size, size, size);
    }
}

class Terrain_6 extends Cell {
    constructor() {
        super("terrain6", false);
    }
    display(x, y, size) {
        image(textures.terrain6, x * size, y * size, size, size);
    }
}

class Terrain_7 extends Cell {
    constructor() {
        super("terrain7", false);
    }
    display(x, y, size) {
        image(textures.terrain7, x * size, y * size, size, size);
    }
}

class Terrain_8 extends Cell {
    constructor() {
        super("terrain8", false);
    }
    display(x, y, size) {
        image(textures.terrain8, x * size, y * size, size, size);
    }
}

class Terrain_9 extends Cell {
    constructor() {
        super("terrain9", false);
    }
    display(x, y, size) {
        image(textures.terrain9, x * size, y * size, size, size);
    }
}

class Terrain_10 extends Cell {
    constructor() {
        super("terrain10", false);
    }
    display(x, y, size) {
        image(textures.terrain10, x * size, y * size, size, size);
    }
}

class Terrain_11 extends Cell {
    constructor() {
        super("terrain11", false);
    }
    display(x, y, size) {
        image(textures.terrain11, x * size, y * size, size, size);
    }
}

class Terrain_12 extends Cell {
    constructor() {
        super("terrain12", false);
    }
    display(x, y, size) {
        image(textures.terrain12, x * size, y * size, size, size);
    }
}

class Terrain_13 extends Cell {
    constructor() {
        super("terrain13", false);
    }
    display(x, y, size) {
        image(textures.terrain13, x * size, y * size, size, size);
    }
}

class Terrain_14 extends Cell {
    constructor() {
        super("terrain14", false);
    }
    display(x, y, size) {
        image(textures.terrain14, x * size, y * size, size, size);
    }
}

class Terrain_15 extends Cell {
    constructor() {
        super("terrain15", false);
    }
    display(x, y, size) {
        image(textures.terrain15, x * size, y * size, size, size);
    }
}

class Water1 extends Cell {
    constructor() {
        super("water1", true);
        this.island = false; 
    }
    display(x, y, size) {
        image(textures.water1, x * size, y * size, size, size);
    }
}

class Water2 extends Cell {
    constructor() {
        super("water2", true);
        this.island = false; 
    }
    display(x, y, size) {
        image(textures.water2, x * size, y * size, size, size);
    }
}

class ChestClose extends Cell {
    constructor() {
        super("chestClose", false);
        this.island = false; 
    }
    display(x, y, size) {
        image(textures.chestClose, x * size, y * size, size, size);
    }
}

class ChestOpen extends Cell {
    constructor() {
        super("chestOpen", false);
        this.island = false;
        this.bombsAdded = Math.floor(Math.random() * 6);
        inventory.bombs += this.bombsAdded; 
        this.jumpsAdded = Math.floor(Math.random() * 6);
        inventory.jumps += this.jumpsAdded; 
        itemsCounter();
    }
    display(x, y, size) {
        image(textures.chestOpen, x * size, y * size, size, size);
    }
}


class Jellyfish extends Cell {
    constructor() {
        super("jellyfish", true);
        this.frameCount = 0;
        this.animation = 0;
        this.island = false; 
    }
    update() {
        this.frameCount++;
        if (this.frameCount % 20 == 0) {
            this.animation = (this.animation + 1) % 4;
        }
    }
    display(x, y, size) {
        this.update();
        if (this.animation == 0) {
            image(textures.jellyfish, x * size, y * size, size, size);
        } else if (this.animation == 1) {
            image(textures.jellyfish2, x * size, y * size, size, size);
        } else if (this.animation == 2) {
            image(textures.jellyfish3, x * size, y * size, size, size);
        } else {
            image(textures.jellyfish4, x * size, y * size, size, size);
        }
    }
}

class Jellyfishdead extends Cell {
    constructor() {
        super("jellyfishdead", true);
        this.frameCount = 0; 
        this.animation = 0; 
        this.finished = false; 
    }

    update() {
        if (this.finished) {
            return; 
        }

        this.frameCount++; 

        if (this.frameCount % 20 == 0) {
            this.animation = (this.animation + 1) % 6;

            if (this.animation === 5) {
                this.finished = true;
            }
        }
    }

    display(x, y, size) {
        this.update();
        if (this.finished) {
            image(textures.water1, x * size, y * size, size, size);
        } else {
            if (this.animation == 0) {
                image(textures.jellyfishdead, x * size, y * size, size, size);
            } else if (this.animation == 1) {
                image(textures.jellyfishdead2, x * size, y * size, size, size);
            } else if (this.animation == 2) {
                image(textures.jellyfishdead3, x * size, y * size, size, size);
            } else if (this.animation == 3){
                image(textures.jellyfishdead4, x * size, y * size, size, size);
            } else{
                image(textures.jellyfishdead5, x * size, y * size, size, size);
            }
        }
    }
}

class Boom extends Cell{
    constructor(){
        super("boom", false);
        }
        display(x,y,size){
            image(textures.boom, x * size, y * size, size, size)
    }
}