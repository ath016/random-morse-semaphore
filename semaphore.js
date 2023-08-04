function Semaphore() {
	// properties
	this.x = 0;
	this.y = 0;
	this.size = 0;
	this.rl = 0;
	this.rr = 0;
	this.trl = 0;
	this.trr = 0;
	this.rend = true;
	this.letter = ' ';
	this.flicker = 0;
	
	// set letter
	this.set = function(c) {
		const alpha = [
			'a','b','c','d','e',
			'f','g','h','i','j',
			'k','l','m','n','o',
			'p','q','r','s','t',
			'u','v','w','x','y',
			'z',' '
		];
		const left = [
			1,2,3,4,0,
			0,0,2,3,4,
			1,1,1,1,3,
			2,2,2,2,3,
			3,4,6,7,3,
			7,0
		];
		const right = [
			0,0,0,0,5,
			6,7,1,1,6,
			4,5,6,7,2,
			4,5,6,7,4,
			5,7,5,5,6,
			6,0
		];
		
		const render = [
			1,1,1,1,1,
			1,1,1,1,1,
			1,1,1,1,1,
			1,1,1,1,1,
			1,1,0,1,1,
			1,1
		];
		
		// not found check
		if(alpha.indexOf(c) == -1) c = ' ';
		
		// flicker
		if(c == this.letter && c != ' ') {
			this.flicker = 7;
		} // end of if
		else {
			this.flicker = 0;
		} // end of else
		
		// update letter
		this.letter = c;
		
		// set target
		this.trl = Math.PI * left[alpha.indexOf(c)] / 4;
		this.trr = Math.PI * right[alpha.indexOf(c)] / 4;
		this.rend = render[alpha.indexOf(c)];
	} // end of set
	
	// flip left flag
	this.flipL = function(r) {
		return (Math.sin(r) >= 0 && r < Math.PI)? 1: -1;
	} // end of flip r
	
	// flip right flag
	this.flipR = function(r) {
		return (Math.sin(r) > 0)? 1: -1;
	} // end of flip r
	
	// draw left arm
	this.drawL = function() {
		// rotate
		rotate(this.rl);
		ret = this.getRet(
			this.x + this.size * 37 / 96,
			this.y + this.size * 43 / 96,
			-this.rl
		);

		// left arm
		rect(
			ret.x - this.size * 3 / 96,
			ret.y - this.size * 3 / 96,
			this.size * 3 / 48,
			this.size / 4,
			this.size / 48
		);
		
		// left flag
		fill('red');
		triangle(
			ret.x + this.flipL(this.rl) * this.size / 96,
			ret.y + this.size * 37 / 96,
			ret.x + this.flipL(this.rl) * this.size / 96,
			ret.y + this.size * 21 / 96,
			ret.x + this.flipL(this.rl) * this.size * 17 / 96,
			ret.y + this.size * 37 / 96
		);
		
		fill('white');
		triangle(
			ret.x + this.flipL(this.rl) * this.size * 17 / 96,
			ret.y + this.size * 21 / 96,
			ret.x + this.flipL(this.rl) * this.size / 96,
			ret.y + this.size * 21 / 96,
			ret.x + this.flipL(this.rl) * this.size * 17 / 96,
			ret.y + this.size * 37 / 96
		);
		
		// left stick
		rect(
			ret.x - this.size / 96,
			ret.y + this.size * 21 / 96,
			this.size / 48,
			this.size / 6
		);
		
		// fix rotate
		rotate(-this.rl);
	} // end of draw left arm
	
	// draw right arm
	this.drawR = function() {
		// rotate
		rotate(this.rr);
		ret = this.getRet(
			this.x + this.size * 59 / 96,
			this.y + this.size * 43 / 96,
			-this.rr
		);

		// right arm
		rect(
			ret.x - this.size * 3 / 96,
			ret.y - this.size * 3 / 96,
			this.size * 3 / 48,
			this.size / 4,
			this.size / 48
		);
		
		// right flag
		fill('red');
		triangle(
			ret.x + this.flipR(this.rr) * this.size / 96,
			ret.y + this.size * 37 / 96,
			ret.x + this.flipR(this.rr) * this.size / 96,
			ret.y + this.size * 21 / 96,
			ret.x + this.flipR(this.rr) * this.size * 17 / 96,
			ret.y + this.size * 37 / 96
		);


		fill('white');
		triangle(
			ret.x + this.flipR(this.rr) * this.size * 17 / 96,
			ret.y + this.size * 21 / 96,
			ret.x + this.flipR(this.rr) * this.size / 96,
			ret.y + this.size * 21 / 96,
			ret.x + this.flipR(this.rr) * this.size * 17 / 96,
			ret.y + this.size * 37 / 96
		);
		
		// right stick
		rect(
			ret.x - this.size / 96,
			ret.y + this.size * 21 / 96,
			this.size / 48,
			this.size / 6
		);
		
		// fix rotation
		rotate(-this.rr);
	} // end of draw right arm
	
	// draw object
	this.draw = function(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;

		let ret = undefined;

		// head
		circle(this.x + this.size / 2, this.y + this.size / 3, this.size / 6);


		// body
		rect(
			this.x + this.size * 5 / 12,
			this.y + this.size * 5 / 12,
			this.size / 6,
			this.size / 4,
			this.size / 24
		);


		// left leg
		rect(
			this.x + this.size * 21 / 48,
			this.y + this.size * 2 / 3,
			this.size * 3 / 48,
			this.size / 4,
			this.size / 48
		);


		// right leg
		rect(
			this.x + this.size * 24 / 48,
			this.y + this.size * 2 / 3,
			this.size * 3 / 48,
			this.size / 4,
			this.size / 48
		);
		
		// arm
		(this.rend)? this.drawL(): this.drawR();
		(this.rend)? this.drawR(): this.drawL();
	} // end of draw object
	
	// update
	this.update = function(move) {
		const twoPI = Math.PI * 2;
		move /= 2;
		
		if(((this.trr - this.rr + twoPI) % (twoPI)) < 0.1 ||
			(twoPI - 0.1) < ((this.trr - this.rr + twoPI) % (twoPI)))
			 this.rr = this.trr;
		else {
			if(((this.trr - this.rr + twoPI) % (twoPI)) < Math.PI)
				this.rr = (this.rr + Math.PI / move) % (twoPI);
			else
				this.rr = (this.rr + Math.PI * (2*move-1) / move) % (twoPI);
		} // end of else
		
		if(((this.trl - this.rl + twoPI) % (twoPI)) < 0.1 ||
			(twoPI - 0.1) < ((this.trl - this.rl + twoPI) % (twoPI)))
			 this.rl = this.trl;
		else {
			if(((this.trl - this.rl + twoPI) % (twoPI)) < Math.PI)
				this.rl = (this.rl + Math.PI / move) % (twoPI);
			else
				this.rl = (this.rl + Math.PI * (2*move-1) / move) % (twoPI);
		} // end of else
		
		// flicker
		if(this.flicker % 2 == 1) {
			this.rr = (this.rr + Math.PI / move) % (twoPI);
			this.rl = (this.rl + Math.PI / move) % (twoPI);
		} // end of if
		
		if(this.flicker > 0) this.flicker--;
	} // end of update;

	this.getRet = function(x, y, r) {
		let xp = x * Math.cos(r) - y * Math.sin(r);
		let yp = x * Math.sin(r) + y * Math.cos(r);
		return {x:xp, y:yp};
	} // end of rotate
} // end of semaphore class */

