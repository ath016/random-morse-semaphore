class Logic {
    constructor() {      
        this.duration = 3000
        this.refresh = 60;

        this.morse = new Morse();
        this.morseFrame = this.step() >> 1;
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

    step() {
        return this.refresh * this.duration / 1000;
    } // end of step

    update() {
        // step
        const step = this.step();
    
        // set random letter
        if(this.semaphoreFrame % step == 0) {
            this.semaphore.set(
                this.semaphoreString[
                    this.semaphoreFrame / step]);
        } // end of if
    
        // reset random string and fram
        if(this.semaphoreFrame >= step * (this.semaphoreString.length - 1)) {
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
        if(this.morseFrame >= step * (this.morseString.length - 1)) {
            this.morseString = this.getRandomString();
            this.morseFrame = 0;
        } // end of if
        
        this.semaphore.update(this.refresh);
        this.semaphoreFrame++;

        this.morse.update(this.refresh, this.morseFrame, this.duration, step);
        this.morseFrame++;
    } // end of update

    draw(x, y, window_min, text_size) {
        // draw semaphore
        if(this.isSemaphore) {
            fill('white');
            stroke('black');
            this.semaphore.draw(x, y, window_min);
        } // end of if

        // draw morse
        if(this.isMorse) {
            fill('black');
            this.morse.draw(x, y, window_min);
        } // end of if
        
        // button
        fill('red');
        strokeWeight(window_min / 64);
        stroke('white');

        rect(x, 0, window_min / 3, window_min / 8, text_size);
        rect(x +  window_min / 3, 0, window_min / 3, window_min / 8, text_size);
        rect(x +  window_min * 2 / 3, 0, window_min / 3, window_min / 8, text_size);

        rect(x, window_min * 9 / 8, window_min / 3, window_min / 8, text_size);
        rect(x +  window_min * 2 / 3, window_min * 9 / 8, window_min / 3, window_min / 8, text_size);

        fill('white');
        stroke('red');
        rect(x +  window_min / 3, window_min * 9 / 8, window_min / 3, window_min / 8, text_size);

        // text
        fill('white');

        strokeWeight(window_min / 512);
        textSize(text_size);
        text('Morse', x + window_min * 0.08, window_min * 0.08);
        text('Both', x + window_min * 0.435, window_min * 0.08);
        text('Sema_', x + window_min * .735, window_min * 0.08);

        text('Slower', x + window_min * 0.07, window_min * 1.205);
        text('Faster', x + window_min * 0.74, window_min * 1.205);

        fill('red');
        stroke('white');
        text(this.duration + ' ms', x + window_min * 0.37, window_min * 1.205);
    } // end of draw

    toggleMute() {
        this.morse.mute = !this.morse.mute;
    } // end of toggle mute

    toggleSee() {
        this.morse.see = !this.morse.see;
    } // end of toggle see

    sync() {
        this.semaphoreString = this.getRandomString();
        this.semaphoreFrame = 0;
        this.morseString = this.getRandomString();
        this.morseFrame = this.step() >> 1;
    } // end of sync

    pointer(x, y, window_min, width, height) {
        console.log(x, y, window_min, width, height);

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
                // update duration
                this.duration += 100;
                // sync morse and semaphore
                this.sync();
            } // end of first item

            // second item
            if((width - window_min) / 2 + window_min / 3 < x && x < (width - window_min) / 2 + window_min * 2 / 3) {
                // empty
            } // end of second item

            // third item
            if((width - window_min) / 2 + window_min * 2 / 3 < x && x < (width + window_min) / 2) {
                // update duration
                this.duration = Math
                    .max(this.duration - 100, this.isMorse * 2000, this.isSemaphore * 1000)
                // sync morse and semaphore
                this.sync();
            } // end of third item
        } // end of if

        // middle
        else {
            // center item
            if((width - window_min) / 2 < x && x < (width + window_min) / 2) {
                // left center
                if(x < width / 2) {
                    this.toggleSee();
                } // end of if
                // right center
                else {
                    this.toggleMute();
                } // end of else
            } // end of only item
        } // end of else
    } // end of pointer
} // end of logic