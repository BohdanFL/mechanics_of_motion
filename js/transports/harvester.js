class TransportPipe extends Box {
	constructor(x, y, width, height, angle, color) {
		super(x, y, width, height, angle, color)
		this.opening = false
		this.opened = false
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
		// this.turnStep = this.turnStep * 0.7
		this.capacity = 1000
		this.seedType = SEED_TYPE.wheat
		this.maxCapacity = 8192
		this.fuel = this.fuel*2.2
		this.maxFuel = this.fuel*2.2
		this.texture.src = 'images/harvester.png'
		this.pipe = new TransportPipe(this.x + 5, this.y + 5, this.width/6, this.height*0.8, this.angle, 'red')
		this.hiddenCollider = new TransportPipe(this.pipe.x-this.pipe.height, this.pipe.y, this.pipe.width, this.pipe.width)
		this.reverseBind = true
	}

	setVectors() {
		setVectorsBindedBottom.call(this)
	}

	draw() {
		this.movingPipe()
		super.draw()
		this.pipe.x = this.vertex[0].x
		this.pipe.y = this.vertex[0].y
		// this.pipe.angle = this.angle

		this.hiddenCollider.x = this.vertex[0].x - this.pipe.height*this.cos
		this.hiddenCollider.y = this.vertex[0].y - this.pipe.height*this.sin
		this.hiddenCollider.angle = this.angle
		
		this.checkActiveTippers()

		this.pipe.draw()
		this.hiddenCollider.init()
	}

	checkActiveTippers() {
		let currentTipper = this.tippers.find(t => sat(t, this.hiddenCollider))
		if (currentTipper && this.capacity > 15) {
			if (this.pipe.opened) {
				if (!currentTipper.seedType) {
					currentTipper.seedType = this.seedType
				}
				this.capacity -= 16 
				currentTipper.capacity += 16
			}
			if (currentTipper.seedType && currentTipper.seedType !== this.seedType) {
				return false
			}
			this.pipe.opening = true

		} else{
			if (this.pipe.opening !== null) {
				this.pipe.opening = false
			}
			if (this.capacity < 16) {
				this.seedType = null
			}
		}
	}

	movingPipe() {
		let turnStep = 1.2
		if (this.pipe.opening) {
			if (this.pipe.angle < this.angle+90) {
				this.pipe.angle += turnStep
				this.pipe.opened = false
			} else {
				this.pipe.opened = true
			}
			if (this.pipe.opened) {
				this.pipe.angle = this.angle + 90
			}
		} else if (this.pipe.opening !== null) {
			if (this.pipe.angle > this.angle) {
				this.pipe.angle -= turnStep
			} else {
				this.pipe.opening = null
			}
			this.pipe.opened = false
		}

		if (!this.pipe.opened && ((this.pipe.opening === null)) ) {
			this.pipe.angle = this.angle
		}
	}
}
