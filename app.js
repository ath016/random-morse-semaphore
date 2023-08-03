/* CLASS **************************************************** */

class Logic {
    constructor() {        
        this.frame = 0;
        this.duration = 2000
        this.refresh = 60;
        this.offset = this.refresh >> 1;

        this.moreseString = this.getRandomString();
        this.isMorse = true;
        
        this.semaphore = new Semaphore(0, 0, 100);
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

    draw(x, y, size) {
        this.semaphore.draw(x, y, size);
    } // end of draw
} // end of logic
// interval

/* VARIABLE ***************************************************** */

let logic = new Logic();

/* EVENT ******************************************************** */

// interal
let interval = setInterval(function() {
	// step
	const step = logic.refresh * logic.duration / 1000;

	// set random letter
	if(logic.frame % step == 0) {
		logic.semaphore.set(logic.semaphoreString[(logic.frame / step) % logic.semaphoreString.length]);
	} // end of if

	// reset random string
	if(logic.frame && (logic.frame / step) % logic.semaphoreString.length == 0) {
		logic.semaphoreString = logic.getRandomString();
	} // end of if
	
	logic.semaphore.update(logic.refresh);
	logic.frame++;
}, 1000 / logic.refresh); // end of set interval
//window.clearInterval(interval);
//*/

/* START UP ***************************************************** */

function setup() {
    createCanvas(windowWidth, windowHeight);
} // end of setup
  
function draw() {
    const WINDOW_MIN = min(windowWidth, windowHeight);
    const TEST_SIZE = WINDOW_MIN / 15;
    const X = (windowWidth - WINDOW_MIN) / 2;
    
    clear();
    /*/
    textSize(TEST_SIZE);
    text('Morse', X + WINDOW_MIN * 0.05, TEST_SIZE);
    text('Both', X + WINDOW_MIN * 0.35, TEST_SIZE);
    text('Semaphore', X + WINDOW_MIN * .6, TEST_SIZE);

    text('Slower', X + WINDOW_MIN * 0.2, windowHeight - TEST_SIZE);
    text('Faster', X + WINDOW_MIN * 0.6, windowHeight - TEST_SIZE);
    //*/

    if (mouseIsPressed) {} // end of if

    logic.draw(X, 0, WINDOW_MIN);
} // end of draw

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
} // end of window resize