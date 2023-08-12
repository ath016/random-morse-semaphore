class Logic {
    constructor() {        
        this.frame = 0;
        this.duration = 2000
        this.refresh = 60;
        this.offset = this.refresh >> 1;

        this.morse = new Morse();
        this.morseString = this.getRandomString();
        this.isMorse = true;
        
        this.semaphore = new Semaphore();
        this.semaphoreString = this.getRandomString();
        this.isSemaphore = false;
    } // end of constructor

    getRandomString() {
        let alpha = [
            'a','b','c','d','e','f','g','h','i','j',
            'k','l','m','n','o','p','q','r','s','t',
            'u','v','w','x','y','z'
        ]; // end of alpha
        let randomString = '';
    
        // fill random string
        while(alpha.length) {
            randomString += alpha.splice(Math.floor(Math.random() * alpha.length), 1)[0];
        } // end of while

        return randomString;
    } // end of set random string

    update() {
        // step
        const step = this.refresh * this.duration / 1000;
    
        // set random letter
        if(this.frame % step == 0) {
            this.semaphore.set(this.semaphoreString[(this.frame / step) % this.semaphoreString.length]);
        } // end of if
    
        // reset random string
        if(this.frame && (this.frame / step) % this.semaphoreString.length == 0) {
            this.semaphoreString = this.getRandomString();
        } // end of if
    
        // set random letter
        if(this.frame % step == 0) {
            this.morse.set(this.morseString[(this.frame / step) % this.morseString.length]);
        } // end of if
    
        // reset random string
        if(this.frame && (this.frame / step) % this.morseString.length == 0) {
            this.morseString = this.getRandomString();
        } // end of if
        
        this.semaphore.update(this.refresh);
        this.morse.update(this.refresh, this.frame, this.duration, step);
        this.frame++;
    } // end of update

    draw(x, y, size) {
        this.semaphore.draw(x, y, size);
        this.morse.draw(x, y, size)
    } // end of draw
} // end of logic