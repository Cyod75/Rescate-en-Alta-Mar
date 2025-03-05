class Counter {
    static counter = 0;
    static counterRecord = parseInt(localStorage.getItem("record")) || 0; //*


    static addCounterPerson() {
        this.counter++;
        if (this.counter > 9999) {
            this.counter = 0; 
        }
        this.updateCounter();
    }

    static addCounterKraken() {
        this.counter+=2;
        if (this.counter > 9999) {
            this.counter = 0; 
        }
        this.updateCounter();
    }

    static lessCounterPerson() {
        if(this.counter > 0){
           this.counter--; 
        }
        
        if (this.counter > 9999) {
            this.counter = 0; 
        }
        this.updateCounter();
    }
    static resetCounter (){
            this.counter = 0
        this.updateCounter();
        this.recordCounter(); 
    }

    static recordCounter (){ 
        if(this.counter > this.counterRecord){
          this.counterRecord = this.counter 
          localStorage.setItem("record", this.counterRecord.toString()); //* 
            document.getElementById('counterRecord').innerText = '/ ' + ('0000' + this.counterRecord).slice(-4);
          
        }
       
    }

    static updateCounter() {
        const newCounter = ('0000' + this.counter).slice(-4);
        document.getElementById('counter').innerText = newCounter;
    }
    
}
