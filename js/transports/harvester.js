class TransportPipe extends Box {
	constructor(x, y, width, height, angle, color) {
		super(x, y, width, height, angle, color)
		this.halfWidth = this.width
	}

	setVectors() {
		this.vertex[0] = new Vector(
			(this.x),
			(this.y)
		)
		this.vertex[1] = new Vector(
			(this.x + this.a),
			(this.y + this.b)
		)
		this.vertex[2] = new Vector(
			(this.vertex[1].x - this.d),
			(this.vertex[1].y + this.c)
		)		
		this.vertex[3] = new Vector(
			(this.vertex[2].x - this.a),
			(this.vertex[2].y - this.b)
		)
	}
}

class Harvester extends Transport {
	constructor(x, y, width, height, angle, color, physics) {
		super(x, y, width, height, angle, color, physics)
		this.type = 'harvester'
		// this.maxSpeed = this.maxSpeed * 0.5
		// this.velocity = this.velocity * 0.5
		// this.turnStep = this.turnStep * 0.5
		this.capacity = 100
		this.maxCapacity = 8192
		this.fuel = this.fuel*2.2
		this.pipeWidth = 7
		this.pipeHeight = 100
		// this.tippers = []
		this.pipe = new TransportPipe(this.x + 5, this.y + 5, this.pipeWidth, this.pipeHeight, this.angle, 'red')
		this.pipe.opening = false
		this.pipe.opened = false
		this.hiddenCollider = new TransportPipe(this.pipe.x-this.pipeHeight, this.pipe.y, this.pipeWidth, this.pipeWidth, 0, 'black')
	}

	draw() {
		// (function() {
			if (this.pipe.opening) {
				if (this.pipe.angle < this.angle+90) {
					this.pipe.angle++
					this.pipe.opened = false
				} else {
					this.pipe.opened = true
				}
				if (this.pipe.opened) {
					this.pipe.angle = this.angle + 90
				}
			} else if (this.pipe.opening !== null) {
				if (this.pipe.angle <= this.angle) {
					this.pipe.opening = null
				} else {
					this.pipe.angle--
				}
				this.pipe.opened = false
			}
		// }).bind(this)



		if (!this.pipe.opened && ((this.pipe.opening === null)) ) {
			this.pipe.angle = this.angle
		}
			// this.pipe.angle = this.angle

		super.draw()
		this.pipe.x = this.vertex[3].x 
		this.pipe.y = this.vertex[3].y 

		this.hiddenCollider.x = this.vertex[3].x - this.pipeHeight*this.cos
		this.hiddenCollider.y = this.vertex[3].y - this.pipeHeight*this.sin
		this.hiddenCollider.angle = this.angle
		

		if (this.tippers.some(t => sat(t, this.hiddenCollider)) && this.capacity > 0) {
			this.pipe.opening = true

			if (this.pipe.opened) {
				let currentTipper = this.tippers.find(t => sat(t, this.hiddenCollider))
				this.capacity -= 4 
				currentTipper.capacity += 4
				console.log(this.capacity, currentTipper.capacity)
			}
		} else {
			this.pipe.opening = false
		}

		this.pipe.draw()
		this.hiddenCollider.draw()
		// if (!this.pipe.reverse) {
		// 	if (this.pipe.angle >= this.angle+90) this.pipe.reverse = true
		// 	this.pipe.angle++
		// } else {
		// 	if (this.pipe.angle <= this.angle+0) this.pipe.reverse = false
		// 	this.pipe.angle--
		// }
	}

	// transportPipe
}