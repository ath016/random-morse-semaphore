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
		let char;

		// calc new string array
		let tempArray = this.string
			.map((y,j) =>  y.split('')
				.reduce((t,s) => {
					let sVal = s == '.'? 20: 30;
					if(j || t[1] + sVal < frameValue) {
						t[0] += s;
						t[1] += sVal;
					} // end of if
					
					else {
						t[1] = frameValue;
					} // end of else

					return t;
				}, ['', 0]) // end of reduce
			) // end of map

		// check change
		if(tempArray[0] && this.stringDisplay[0] && tempArray[0][0] != this.stringDisplay[0][0]) {
			char = tempArray[0][0];
			char = char[char.length - 1];

			// make sound
			if(char == '.' && !this.mute) dot.play();
			if(char == '-' && !this.mute) dash.play();
		} // end of if

		// update string display
		this.stringDisplay = tempArray;

		// draw text
		textSize(size * 0.25);
		this.stringDisplay
			.forEach((x,i) => text(
				x[0],
				this.x + size / 8,
				(1 - i/this.displayLength) * size - this.offset * this.size / this.displayLength
			)) // end of for each
	} // end of draw object
	
	// update
	this.update = function(refresh, frame, duration, step) {
		this.offset = (frame % step) / step;
	} // end of update;
} // end of morse class */

