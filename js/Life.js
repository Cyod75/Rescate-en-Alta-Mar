class Life {
  constructor(){
    this.life = 5; 
    this.player = new Player
    this.enemy = new Enemy
  }  

     static updateLife(health){
      this.life = health 
      const image = document.getElementById("life")

        if(this.life == 5){
          image.src = "./image/life100.png"
        }else if(this.life == 4){
          image.src = "./image/life75.png"
        }else if(this.life == 3){
          image.src = "./image/life60.png"
        }else if(this.life == 2){
          image.src = "./image/life30.png"
        }else if(this.life == 1){
          image.src = "./image/life10.png"
        }else if(this.life == 0){
          image.src = "./image/life0.png"
          player.checkGameOver();
          enemy.cryKraken();
        }
      }

      static subtractLife(){
        const image = document.getElementById("life")
        image.src = "./image/life0.png"
      }

      static addLife(){
        const image = document.getElementById("life")
        image.src = "./image/life100.png"
      }

}