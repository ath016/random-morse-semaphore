function Morse() {
	// properties
	this.x = 0;
	this.y = 0;
	this.size = 0;
	
	this.string = [];
	
	this.stringDisplay = [];
	this.displayLength = 4;
	this.offset = 0;

	this.mute = true;
	this.sound = '';

	this.OCTAVE = 2;
	this.C_SHARP_5 = 554.37;
	this.D_5 = 587.33;
	this.A_SHARP_5 = 932.33;
	this.B_5 = 987.77;

	// set letter
	this.set = function(c) {
		const alpha = [
			'.-', '-...', '-.-.', '-..', '.',
			'..-.', '--.', '....', '..', '.---',
			'-.-', '.-..', '--', '-.', '---', '.--.',
			'--.-', '.-.', '...', '-', '..-',
			'...-', '.--', '-..-', '-.--', '--..'
		]; // end of alphabet

		this.string.unshift(alpha[c.charCodeAt() - 97]);
		this.string.length = this.displayLength + 1;
	} // end of set
	
	this.dash = function() {
		// synth
		let time = 0;
		let random = Math.random() / 4 + .75;
	  
		// notes can overlap with each other
		// play(note, volume, delay, duration)
		polySynth.play(this.A_SHARP_5 * random, .05, time, .1);
		polySynth.play(this.C_SHARP_5 * random, .02, time, .1);
	  
		polySynth.play(this.B_5 * random, .05, time += .01, .3);
		polySynth.play(this.D_5 * random, .02, time, .3);
	} // end of dash

	this.dot = function() {
		// synth
		let time = 0;
		let random = Math.random() / 4 + 1;
	  
		// notes can overlap with each other
		// play(note, volume, delay, duration)
		polySynth.play(this.B_5 * random, .05, time, .08);
		polySynth.play(this.D_5 * random, .02, time, .08);
		
		polySynth.play(this.A_SHARP_5 * random, .05, time += .01, .08);
		polySynth.play(this.C_SHARP_5 * random, .02, time, .1);
	} // end of dot

	this.stringCalc = function(string, frameValue) {
		return this.string[0]
			.split('')
			.reduce((t,s) => {
				// calc character value
				let sVal = s == '.'? 20: 30;
				
				// update total
				if(!t[2]) {
					t[0] += s;
					t[1] += sVal;
				} // end of if
				
				// check total
				if(t[2] || t[1] > frameValue) {
					t[2] = true;
					return t;
				} // end of if

				// return total
				return t;
			}, ['', 0, false])[0] // end of reduce
	} // end of string calculation

	// draw object
	this.draw = function(x, y, size, frameValue) {
		this.x = x;
		this.y = y;
		this.size = size;

		// make sound
		if(this.sound == '.' && !this.mute) this.dot();
		if(this.sound == '-' && !this.mute) this.dash();
		this.sound = '';

		// draw text
		textSize(size * 0.25);
		this.stringDisplay
			.forEach((x,i) => text(
				x,
				this.x + size / 8,
				(1 - i/this.displayLength) * size - this.offset * this.size / this.displayLength
			)) // end of for each
	} // end of draw object
	
	// update
	this.update = function(refresh, frame, duration, step) {
		this.offset = (frame % step) / step;

		// save string display
		let saveStringDispaly = this.stringDisplay.slice();

		// reset string display
		this.stringDisplay = this.string.slice();

		// calc new string array
		let tempString = this.stringCalc(this.stringDisplay[0], frame % step);

		// update string display
		this.stringDisplay[0] = tempString;
		
		if((saveStringDispaly.slice(1).join() == this.stringDisplay.slice(1).join() &&
			saveStringDispaly[0] != this.stringDisplay[0]) ||
			saveStringDispaly.slice(1).join() != this.stringDisplay.slice(1).join()) {
			
			// trigger sound in draw
			this.sound = this.stringDisplay[0][this.stringDisplay[0].length - 1];
		} // end of if
	} // end of update;
} // end of morse class */

