/* VARIABLE ***************************************************** */

let logic = new Logic();
let polySynth;

/* START UP ***************************************************** */

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(logic.refresh);
} // end of setup

/* DRAW ********************************************************* */

function keyPressed() {
    if(!polySynth) polySynth = new p5.PolySynth();
    if(key == ' ') logic.toggleMute();
} // end of key pressed

function mousePressed(fxn) {
    if(!polySynth) polySynth = new p5.PolySynth();
    logic.pointer(fxn.clientX, fxn.clientY,
        min(windowWidth, windowHeight / 1.25), windowWidth, windowHeight)
} // end of mouse pressed

function touchStarted(fxn) {
    if(!polySynth) polySynth = new p5.PolySynth();
    logic.pointer(fxn.touches[0].clientX, fxn.touches[0].clientY,
        min(windowWidth, windowHeight / 1.25), windowWidth, windowHeight);
} // end of touch started

function draw() {
    const window_min = min(windowWidth, windowHeight / 1.25);
    const text_size = window_min / 15;
    const x = (windowWidth - window_min) / 2;

    clear();

    // update
    logic.update()
    
    // draw semaphore
    if(logic.isSemaphore) {
        fill('white');
        stroke('black');
        logic.semaphore.draw(x, window_min / 8, window_min);
    } // end of if

    // draw morse
    if(logic.isMorse) {
        fill('black');
        logic.morse.draw(x, window_min / 8, window_min);
    } // end of if
    
    fill('red');
    strokeWeight(4);
    stroke('white');

    rect(x, 0, window_min / 3, window_min / 8, text_size);
    rect(x +  window_min / 3, 0, window_min / 3, window_min / 8, text_size);
    rect(x +  window_min * 2 / 3, 0, window_min / 3, window_min / 8, text_size);

    rect(x, window_min * 9 / 8, window_min / 3, window_min / 8, text_size);
    rect(x +  window_min / 3, window_min * 9 / 8, window_min / 3, window_min / 8, text_size);
    rect(x +  window_min * 2 / 3, window_min * 9 / 8, window_min / 3, window_min / 8, text_size);

    fill('white');
    strokeWeight(1);
    textSize(text_size);
    text('Morse', x + window_min * 0.08, window_min * 0.08);
    text('Both', x + window_min * 0.435, window_min * 0.08);
    text('Sema_', x + window_min * .735, window_min * 0.08);

    text('Slower', x + window_min * 0.07, window_min * 1.205);
    text(logic.duration + ' ms', x + window_min * 0.37, window_min * 1.205);
    text('Faster', x + window_min * 0.74, window_min * 1.205);
    //*/
} // end of draw

/* EVENT ******************************************************** */

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
} // end of window resize */