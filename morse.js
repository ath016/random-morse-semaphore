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
		this.string.unshift(c);
		this.string.length = this.displayLength + 1;
	} // end of set
	
	// draw object
	this.draw = function(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;

		textSize(size * 0.25);
		this.string
			.map((x,i) => text(x, this.x + size / this.displayLength, (1 - i/this.displayLength) * size - this.offset * this.size / this.displayLength)) // end of map
	} // end of draw object
	
	// update
	this.update = function(refresh, frame, duration, step) {
		this.offset = (frame % step) / step;
	} // end of update;
} // end of morse class */

