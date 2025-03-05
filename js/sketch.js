let board;
let player;
let enemy;
let person;
let gameConfig;
let lenguage = "es";

let inventory = {
  bombs: 0,
  jumps: 0
}

let textures = {
  grass: null,
  character_right: null,
  water1: null,
  water2: null,
  character_left: null,
  character_up: null,
  character_down: null,
  bomb: null,
  boom: null,
  kraken1: null,
  kraken2: null,
  kraken3: null,
  kraken3_1: null,
  kraken3_2: null,
  kraken4: null,
  jellyfish: null,  
  jellyfish2: null,
  jellyfish3: null,
  jellyfish4: null,
  jellyfishdead: null,
  jellyfishdead2: null,
  jellyfishdead3: null,
  jellyfishdead4: null,
  jellyfishdead5: null,
  jellyfishdead6: null,
  character_boom: null,
  person: null,
  terrain0: null,
  terrain1: null,
  terrain2: null,
  terrain3: null,
  terrain4: null,
  terrain5: null,
  terrain6: null,
  terrain7: null,
  terrain8: null,
  terrain9: null,
  terrain10: null,
  terrain11: null,
  terrain12: null,
  terrain13: null,
  terrain14: null,
  terrain15: null,
  chestClose: null,
  chestOpen: null
};

let view = true;
let lastPosition = { x: 0, y: 0 };
let musicBackground;
let musicGameOver; 
let musicBoom;
let musicZap;
let musicPickUp;
let musicShout;
let musicSplash;
let musicChest;
let musicKraken;
let musicAddPerson;
let musicJump;
let sound = false; 
let music = false;
let gameOverMusicPlayed = false; // Variable para evitar que el sonido de Game Over se repita
let showStartMessage = true; // Variable para controlar si se muestra el mensaje de inicio
let musicCount = 1;
let soundCount = 1;

function preload() {
  textures.grass = loadImage("./textures/grass.png");
  textures.character_right = loadImage("./textures/character_right.png");
  textures.water1 = loadImage("./textures/water1.png");
  textures.water2 = loadImage("./textures/water2.png");
  textures.character_left = loadImage("./textures/character_left.png");
  textures.character_up = loadImage("./textures/character_up.png");
  textures.character_down = loadImage("./textures/character_down.png");
  textures.character_boom = loadImage("./textures/character_boom.png");
  textures.chestClose = loadImage("./textures/chestClose.png");
  textures.chestOpen = loadImage("./textures/chestOpen.png");
  textures.bomb = loadImage("./textures/bomb.png");
  textures.boom = loadImage("./textures/boom.png");
  textures.kraken1 = loadImage("./textures/kraken1.png");
  textures.kraken2 = loadImage("./textures/kraken2.png");
  textures.kraken3 = loadImage("./textures/kraken3.png");
  textures.kraken3_1 = loadImage("./textures/kraken3_1.png");
  textures.kraken3_2 = loadImage("./textures/kraken3_2.png");
  textures.kraken4 = loadImage("./textures/kraken4.png");
  textures.jellyfish = loadImage("./textures/jellyfish1.png");
  textures.jellyfish2 = loadImage("./textures/jellyfish2.png");
  textures.jellyfish3 = loadImage("./textures/jellyfish3.png");
  textures.jellyfish4 = loadImage("./textures/jellyfish4.png");
  textures.jellyfishdead = loadImage("./textures/jellyfishdead1.png");
  textures.jellyfishdead2 = loadImage("./textures/jellyfishdead2.png");
  textures.jellyfishdead3 = loadImage("./textures/jellyfishdead3.png");
  textures.jellyfishdead4 = loadImage("./textures/jellyfishdead4.png");
  textures.jellyfishdead5 = loadImage("./textures/jellyfishdead5.png");
  textures.person = loadImage("./textures/person.png");
  textures.terrain0 = loadImage("./textures/terrain0.png");
  textures.terrain1 = loadImage("./textures/terrain1.png");
  textures.terrain2 = loadImage("./textures/terrain2.png");
  textures.terrain3 = loadImage("./textures/terrain3.png");
  textures.terrain4 = loadImage("./textures/terrain4.png");
  textures.terrain5 = loadImage("./textures/terrain5.png");
  textures.terrain6 = loadImage("./textures/terrain6.png");
  textures.terrain7 = loadImage("./textures/terrain7.png");
  textures.terrain8 = loadImage("./textures/terrain8.png");
  textures.terrain9 = loadImage("./textures/terrain9.png");
  textures.terrain10 = loadImage("./textures/terrain10.png");
  textures.terrain11 = loadImage("./textures/terrain11.png");
  textures.terrain12 = loadImage("./textures/terrain12.png");
  textures.terrain13 = loadImage("./textures/terrain13.png");
  textures.terrain14 = loadImage("./textures/terrain14.png");
  textures.terrain15 = loadImage("./textures/terrain15.png");
  musicBackground = loadSound("./sound/pirate.mp3"); 
  musicGameOver = loadSound("./sound/gameover.mp3"); 
  musicZap = loadSound("./sound/zap.mp3"); 
  musicBoom = loadSound("./sound/boom.mp3"); 
  musicPickUp = loadSound("./sound/person.mp3"); 
  musicShout = loadSound("./sound/shout.mp3"); 
  musicSplash = loadSound("./sound/splash.mp3"); 
  musicChest = loadSound("./sound/chest.mp3"); 
  musicKraken = loadSound("./sound/kraken.mp3"); 
  musicAddPerson = loadSound("./sound/addperson.mp3"); 
  musicJump = loadSound("./sound/jump.mp3"); 
}

async function setup() {
  let canvas = createCanvas(1000, 500);
  canvas.parent("#game");

  board = new Board();
  player = new Player(board);
  enemy = new Enemy(board);
  person = new Person(board);
  Life.addLife();
  
  inventory.bombs = 2;
  inventory.jumps = 2;

  Counter.counterRecord = parseInt(localStorage.getItem("record")) || 0;  // Parsear a número
  document.getElementById('counterRecord').innerText = '/ ' + ('0000' + Counter.counterRecord).slice(-4);

  let response = await fetch("language.json");
  gameConfig = await response.json();

  //document.title = config[lenguage].title;
  //document.querySelector()...

}



  
function draw() {
  clear();
  person.positionPerson();

  // Calcular la posición de la cámara y aplicar restricciones directamente
  let camX = constrain(-player.x * board.size, -board.width * board.size + width / 2, -width / 2);
  let camY = constrain(-player.y * board.size, -board.height * board.size + height / 2, -height / 2);

  // Si la vista está activada, actualiza la última posición
  if (view === true) {
    lastPosition.x = camX;
    lastPosition.y = camY;
  }

  translate(lastPosition.x, lastPosition.y);
  translate(width / 2, height / 2);

  
  board.display();
  player.display();
  enemy.display();
  if(person.takePerson == false){
    person.display();
  }

  // Mostrar el mensaje de inicio si es necesario
  if (showStartMessage) {
    displayStartMessage();
  }

  // Mostrar mensaje de Game Over si es necesario
  if (player.gameOver) {
    Counter.recordCounter();
    displayGameOver();
    if (music == true && !gameOverMusicPlayed) { // Solo si el sonido está activado y no se ha reproducido antes (se buguea sino)
      musicBackground.stop();
       
      musicGameOver.play(); 
      gameOverMusicPlayed = true; 
    }
  }
}


let currentLanguage = "es"; // Idioma por defecto

function displayStartMessage() {
  push();
  resetMatrix();

  fill(0, 0, 0, 150);
  rect(width / 4 -35, 160, width / 2 +70, 200, 20);

  textFont("Caveat");
  textSize(75);
  textAlign(CENTER, CENTER);

  fill(0, 0, 0, 200);
  text(gameConfig.canvasText.startGame[currentLanguage], width / 2 + 4, height / 2 + 3);

  fill(204, 153, 51);
  text(gameConfig.canvasText.startGame[currentLanguage], width / 2, height / 2);

  textSize(30);
  fill(255, 215, 0);
  text(gameConfig.canvasText.pressEnter[currentLanguage], width / 2, height / 2 + 70);

  pop();
}

// Mostrar mensaje de Game Over (Necesité Ayuda)
function displayGameOver() {
  push(); // Guarda la transformación actual
  resetMatrix(); // Restablece la transformación para que las coordenadas sean fijas en la pantalla

  fill(0, 0, 0, 150); // Fondo oscuro
  rect(width / 4 -55, 160 , width / 2 +110 , 200, 20); // Caja con bordes redondeados

  textFont("Caveat"); // Fuente estilo manuscrita
  textSize(80); // Aumentar tamaño de "GAME OVER"
  textAlign(CENTER, CENTER);

  fill(0, 0, 0, 200); // Sombra
  text(gameConfig.canvasText.gameOver[currentLanguage], width / 2 + 4, height / 2 + 3);

  fill(204, 153, 51); // Color dorado oxidado
  text(gameConfig.canvasText.gameOver[currentLanguage], width / 2, height / 2);

  textSize(30); // Reducir tamaño del subtexto
  fill(255, 215, 0); // Color dorado
  text(gameConfig.canvasText.pressEnterReset[currentLanguage], width / 2, height / 2 + 70); // Subtexto centrado

  pop(); // Restaura la transformación original
}


function keyPressed() {
  console.log("has pulsado una tecla: " + keyCode);

  // Si el mensaje de inicio está visible y se presiona "Enter", ocultarlo
  if (showStartMessage && keyCode == 13) {
    showStartMessage = false;
    player.start=true
  }

  if (player.gameOver == true) {
    if (keyCode == 13) {
      startGame();
      player.start = true;
      if (music == true) {
        musicBackground.loop(); 
      }
      musicGameOver.stop(); 
    }
  } 
    
  

  player.move(keyCode);
}



function countMusic(){
  const image1 = document.getElementById("button1")
  musicCount ++;

  if(musicCount % 2 == 0){
    image1.src = "./image/on.png"
    musicBackground.setVolume(0.7);
    musicBackground.loop();
    music = true; 
  } else {
    image1.src = "./image/off.png"
    musicBackground.stop();
    music = false; 
  }
}

function countSound(){
  const image2 = document.getElementById("button2")
  soundCount ++;
  if(soundCount % 2 == 0){
    image2.src = "./image/on.png"
    sound = true; 
  } else {
    image2.src = "./image/off.png"
    sound = false; 
  }
}



function checkStartGame(){
  if (player.gameOver == false ){
    startGame();
    showStartMessage = true
    displayStartMessage()
  }
}

function startGame() {
  inventory.bombs = 2;
  inventory.jumps = 2;
  itemsCounter();
  Counter.resetCounter();
  board = new Board();
  player = new Player(board);
  enemy = new Enemy(board);
  person = new Person(board);
  Life.addLife();
  gameOverMusicPlayed = false; 
}

 function itemsCounter(){
  document.getElementById("bomb-count").textContent = inventory.bombs
  document.getElementById("jump-count").textContent = inventory.jumps
}