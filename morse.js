function Morse() {
	// properties
	this.x = 0;
	this.y = 0;
	this.size = 0;
	this.string = [];
	this.displayLength = 4;
	this.offset = 0;
	
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
	
	// draw object
	this.draw = function(x, y, size, frameValue) {
		this.x = x;
		this.y = y;
		this.size = size;

		textSize(size * 0.25);
		this.string
			.map((y,j) => text(
				y.split('')
					.reduce((t,s) => {
						let sVal = s == '.'? 10: 20;
						if(j || t[1] + sVal < frameValue) {
							t[0] += s;
							t[1] += sVal;
						} // end of if
						else {
							t[1] = frameValue;
						} // end of else

						return t;
					}, ['', 0])[0],
				this.x + size / this.displayLength, (1 - j/this.displayLength) * size - this.offset * this.size / this.displayLength
			)) // end of map
	} // end of draw object
	
	// update
	this.update = function(refresh, frame, duration, step) {
		this.offset = (frame % step) / step;
	} // end of update;
} // end of morse class */

