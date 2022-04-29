class Machine extends Box {
	constructor(x, y, width, height, angle, transports, color) {
		super(x, y, width, height, angle, color)

		this.type = null
		this.isConnected = false
		this.transports = transports || []
		this.connectedTransport = null
		this.connectListener()
	}

	connectListener() {
		// Оптимізувати
		window.addEventListener("keydown", (e) => {
			if (e.code === 'Space' && !this.isConnected) {
				this.transports.forEach(t => {
					if (sat(t, this) && !t.disableMove) {
						this.connectedTransport = t
						this.connectedTransport.connectedMachine = this
						this.connectedTransport.isConnected = true
						this.isConnected = true
						this.setConnectedPos()
					}
				})
			} else if (e.code === 'Space' && this.isConnected && this.connectedTransport && !this.connectedTransport.disableMove) {
				this.isConnected = false
				this.connectedTransport.connectedMachine = null
				this.connectedTransport.isConnected = true
				this.connectedTransport = null
			}
		})
	}

	setVectors() {
		this.vertex[0] = new Vector(
			(this.x + (this.halfWidth - this.a)),
			(this.y - this.b)
		)
		this.vertex[1] = new Vector(
			(this.x + (this.halfWidth + this.a)),
			(this.y + this.b)
		)
		this.vertex[2] = new Vector(
			this.vertex[1].x - this.d,
			this.vertex[1].y + this.c
		)
		this.vertex[3] = new Vector(
			this.vertex[0].x - this.d,
			this.vertex[0].y + this.c
		)
	}

	draw() {
		if (this.isConnected) {
			this.speed = this.connectedTransport.speed
			this.angle = this.connectedTransport.angle
			this.dir = this.connectedTransport.dir
			this.setConnectedPos()
		} else {
			this.speed = 0
		}
		super.draw()
	}

	setConnectedPos() {
		this.x = this.connectedTransport.x - (this.width - this.connectedTransport.width) / 2
		this.y = this.connectedTransport.y + this.connectedTransport.height
		this.x += this.speedTurnX
		this.y -= this.speedTurnY
	}

	addTransport(transport) {
		this.transports.push(transport)
	}
}



class SowingMachine extends Machine {
	constructor(x, y, width, height, angle, transports) {
		super(x, y, width, height, angle, transports, 'rgba(0, 255, 0, 1)')
		this.type = 'sowing'
		this.maxCapacity = 3000
		this.capacity = this.maxCapacity
		this.seedType = SEED_TYPE.wheat
	}
}

class Cultivator extends Machine {
	constructor(x, y, width, height, angle, transports) {
		super(x, y, width, height, angle, transports, 'rgba(0, 0, 255, 1)')
		this.type = 'cultivator'
	}
}

class Fertilizer extends Machine {
	constructor(x, y, width, height, angle, transports) {
		super(x, y, width, height, angle, transports, 'rgba(255, 255, 0, 1)')
		this.type = 'fertilizer'
		this.maxCapacity = 3000
		this.capacity = this.maxCapacity
	}
}

class Header extends Machine {
	constructor(x, y, width, height, angle, transports) {
		super(x, y, width, height, angle, transports, 'rgba(255, 0, 0, 1)')
		this.type = 'header'
		this.movingX = 0
		this.movingY = 0
	}

	setVectors() {
		this.vertex[0] = new Vector(
			(this.x + (this.halfWidth - this.a)) + this.movingX,
			(this.y + (this.height - this.b)) - this.movingY
		)
		this.vertex[1] = new Vector(
			(this.x + (this.halfWidth + this.a))  + this.movingX,
			(this.y + (this.height + this.b)) - this.movingY
		)
		this.vertex[2] = new Vector(
			this.vertex[1].x + this.d,
			this.vertex[1].y - this.c
		)
		this.vertex[3] = new Vector(
			this.vertex[0].x + this.d,
			this.vertex[0].y - this.c
		)
	}

	setConnectedPos() {
		// this.movingX = this.connectedTransport.height * this.sin
		// this.movingY = this.connectedTransport.height * this.cos
		this.x = this.connectedTransport.x + this.connectedTransport.halfWidth - this.halfWidth
		this.y = this.connectedTransport.y - this.height

		this.x += this.speedTurnX
		this.y -= this.speedTurnY
	}
}

class Tipper extends Machine{
	constructor(x, y, width, height, angle, transports) {
		super(x, y, width, height, angle, transports, 'rgba(0, 255, 255, 1)')
		this.type = 'tipper'
		this.seedType = null
		this.capacity = 8192/16
		this.maxCapacity = 8192
	}
}