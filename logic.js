class Logic {
    constructor() {      
        this.duration = 3000
        this.refresh = 60;

        this.morse = new Morse();
        this.morseFrame = this.refresh >> 1;
        this.morseString = this.getRandomString();
        this.isMorse = true;
        
        this.semaphore = new Semaphore();  
        this.semaphoreFrame = 0;
        this.semaphoreString = this.getRandomString();
        this.isSemaphore = true;

        this.morse.set('e');
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
        if(this.semaphoreFrame % step == 0) {
            this.semaphore.set(
                this.semaphoreString[
                    this.semaphoreFrame / step]);
        } // end of if
    
        // reset random string and fram
        if(this.semaphoreFrame == step * (this.semaphoreString.length - 1)) {
            this.semaphoreString = this.getRandomString();
            this.semaphoreFrame = 0;
        } // end of if
    
        // set random letter
        if(this.morseFrame % step == 0) {
            this.morse.set(
                this.morseString[
                    this.morseFrame / step]);
        } // end of if
    
        // reset random string and frame
        if(this.morseFrame == step * (this.morseString.length - 1)) {
            this.morseString = this.getRandomString();
            this.morseFrame = 0;
        } // end of if
        
        this.semaphore.update(this.refresh);
        this.semaphoreFrame++;

        this.morse.update(this.refresh, this.morseFrame, this.duration, step);
        this.morseFrame++;
    } // end of update

    draw(x, y, size) {
        this.semaphore.draw(x, y, size);
        this.morse.draw(x, y, size)
    } // end of draw

    toggleMute() {
        this.morse.mute = !this.morse.mute;
    } // end of toggle mute

    pointer(x, y, window_min, width, height) {
        
        // top menu
        if(y < window_min / 8 ) {
            // first item
            if((width - window_min) / 2 < x && x < (width - window_min) / 2 + window_min / 3) {
                this.isMorse = true;
                this.isSemaphore = false;

                this.duration = Math
                    .max(this.duration, this.isMorse * 2000, this.isSemaphore * 1000)
            } // end of first item

            // second item
            if((width - window_min) / 2 + window_min / 3 < x && x < (width - window_min) / 2 + window_min * 2 / 3) {
                this.isMorse = true;
                this.isSemaphore = true;

                this.duration = Math
                    .max(this.duration, this.isMorse * 2000, this.isSemaphore * 1000)
            } // end of second item

            // third item
            if((width - window_min) / 2 + window_min * 2 / 3 < x && x < (width + window_min) / 2) {
                this.isMorse = false;
                this.isSemaphore = true;

                this.duration = Math
                    .max(this.duration, this.isMorse * 2000, this.isSemaphore * 1000)
            } // end of third item
        } // end of top menu

        // bottom menu
        else if(window_min * 9 / 8 < y) {
            // first item
            if((width - window_min) / 2 < x && x < (width - window_min) / 2 + window_min / 3) {
                this.duration += 100;
            } // end of first item

            // second item
            if((width - window_min) / 2 + window_min / 3 < x && x < (width - window_min) / 2 + window_min * 2 / 3) {
                // empty
            } // end of second item

            // third item
            if((width - window_min) / 2 + window_min * 2 / 3 < x && x < (width + window_min) / 2) {
                this.duration = Math
                    .max(this.duration - 100, this.isMorse * 2000, this.isSemaphore * 1000)
            } // end of third item
        } // end of if

        // middle
        else {
            // only item
            if((width - window_min) / 2 < x && x < (width + window_min) / 2) {
                this.toggleMute();
            } // end of only item
        } // end of else
    } // end of pointer
} // end of logic