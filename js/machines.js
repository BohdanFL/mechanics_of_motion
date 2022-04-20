class Machine extends Box {
	constructor(x, y, width, height, angle, transports, color) {
		super(x, y, width, height, angle, color)

		this.type = null
		this.isConnected = false
		this.transports = transports || []

		window.addEventListener("keydown", (e) => {
			if (e.code === 'Space' && !this.isConnected) {
				this.transports.forEach(transport => {
					if (sat(transport, this) && !transport.disableMove) {
						this.activeTransport = transport
						this.isConnected = true
						this.x = this.activeTransport.x - (this.width - this.activeTransport.width) / 2
						this.y = this.activeTransport.y + this.activeTransport.height
					}
				})
			} else if (e.code === 'Space' && this.isConnected && this.activeTransport && !this.activeTransport.disableMove) {
				this.isConnected = false
				this.activeTransport = null
			}
		})

	}

	setVectors() {
		this.vertex[0] = new Vector(
			(this.x + (this.halfWidth - this.a)) + this.speedTurnX,
			(this.y - this.b) - this.speedTurnY
		)
		this.vertex[1] = new Vector(
			(this.x + (this.halfWidth + this.a)) + this.speedTurnX,
			(this.y + this.b) - this.speedTurnY
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
		super.draw()


		if (this.isConnected) {
			this.x = this.activeTransport.x - (this.width - this.activeTransport.width) / 2
			this.y = this.activeTransport.y + this.activeTransport.height
			this.speed = this.activeTransport.speed
			this.radian = this.activeTransport.radian
			this.dir = this.activeTransport.dir
		} else {
			this.speed = 0
		}
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
	}
}

class Harvester extends Machine {
	constructor(x, y, width, height, angle, transports) {
		super(x, y, width, height, angle, transports, 'rgba(255, 0, 0, 1)')
		this.type = 'harvester'
	}
}