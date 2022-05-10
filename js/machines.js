class Machine extends Box {
	constructor(x, y, width, height, angle, transports, color) {
		super(x, y, width, height, angle, color)

		this.type = null
		this.active = false
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
			if (e.code === 'KeyF' && this.isConnected && this.active !== null) {
				this.active = !this.active
				let t = this.connectedTransport
				t.currentMaxSpeed = t.maxSpeed / (this.active+1)
				t.maxSpeedBack = t.currentMaxSpeed * t.maxSpeedBackKoef
			}
			if (this.type === MACHINE_TYPE.sowing && this.isConnected) {
				let index
				if (e.code === 'KeyE') {
					index = seedKeys.indexOf(this.seedType)
					if (index < seedKeys.length-1) {
						index++
					} else {
						index = 0
					}
				}
				if (e.code === 'KeyQ') {
					index = seedKeys.indexOf(this.seedType)
					if (index > 0) {
						index--
					} else {
						index = seedKeys.length-1
					}
				}
				if (index >= 0) {
					this.seedType = seedKeys[index]
				}
			}
		})
	}

	setVectors() {
		this.vertex[0] = new Vector(
			(this.x + (this.width/2 - this.a)),
			(this.y - this.b)
		)
		this.vertex[1] = new Vector(
			(this.x + (this.width/2 + this.a)),
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
			(this.x + (this.width/2 - this.a)) + this.movingX,
			(this.y + (this.height - this.b)) - this.movingY
		)
		this.vertex[1] = new Vector(
			(this.x + (this.width/2 + this.a))  + this.movingX,
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
		this.x = this.connectedTransport.x + this.connectedTransport.halfWidth - this.width / 2
		this.y = this.connectedTransport.y - this.height

		this.x += this.speedTurnX
		this.y -= this.speedTurnY
	}
}

class Tipper extends Machine {
	constructor(x, y, width, height, angle, transports) {
		super(x, y, width, height, angle, transports, 'rgba(0, 255, 255, 1)')
		this.type = 'tipper'
		this.seedType = SEED_TYPE.canola
		this.active = null
		this.capacity = 8192/16
		this.maxCapacity = 8192
	}
}