/* VARIABLE ***************************************************** */

let logic = new Logic();
let dot, dash;

/* START UP ***************************************************** */

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(logic.refresh);

    dot = createAudio('dot.mp3');
    dash = createAudio('dash.mp3');
} // end of setup

/* DRAW ********************************************************* */

function draw() {
    const WINDOW_MIN = min(windowWidth, windowHeight);
    const TEST_SIZE = WINDOW_MIN / 15;
    const X = (windowWidth - WINDOW_MIN) / 2;
    
    clear();
    /*/
    fill('black');
    textSize(TEST_SIZE);
    text('Morse', X + WINDOW_MIN * 0.05, TEST_SIZE);
    text('Both', X + WINDOW_MIN * 0.35, TEST_SIZE);
    text('Semaphore', X + WINDOW_MIN * .6, TEST_SIZE);

    text('Slower', X + WINDOW_MIN * 0.2, windowHeight - TEST_SIZE);
    text('Faster', X + WINDOW_MIN * 0.6, windowHeight - TEST_SIZE);
    //*/

    logic.update()
    // mute switch
    if (mouseIsPressed) {
        logic.toggleMute();
    } // end of if

    if(logic.isMorse) {
        fill('black');
        logic.morse.draw(X, 0, WINDOW_MIN, logic.frame % (logic.refresh * logic.duration / 1000));
    } // end of if

    if(logic.isSemaphore) {
        fill('white');
        logic.semaphore.draw(X, 0, WINDOW_MIN);
    } // end of if
} // end of draw

/* EVENT ******************************************************** */

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
} // end of window resize */