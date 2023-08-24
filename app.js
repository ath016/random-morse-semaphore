/* VARIABLE ***************************************************** */

let logic = new Logic();
let polySynth;

/* START UP ***************************************************** */

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(logic.refresh);
} // end of setup

/* DRAW ********************************************************* */

function draw() {
    const window_min = min(windowWidth, windowHeight / 1.25);
    const text_size = window_min / 15;
    const x = (windowWidth - window_min) / 2;
    const y = window_min / 8;

    // clear
    clear();
    // update
    logic.update()
    // draw
    logic.draw(x, y, window_min, text_size)
} // end of draw

/* EVENT ******************************************************** */

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
} // end of window resize */

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