class Box {
	constructor(x, y, width, height, angle = 0, color = 'black') {
		this.x = x
		this.y = y
		this.width = width
		this.halfWidth = this.width / 2
		this.height = height

		this.speed = 0
		this.angle = angle
		this.radian = this.angle * (Math.PI / 180)
		this.color = color
		this.tempColor = color

		this.vertex = []
		this.init()
		this.dir = getDirection(this.vertex)
	}

	setVectors() {
		this.vertex[0] = new Vector(
			(this.x + (this.halfWidth - this.a)),
			(this.y + (this.height - this.b))
		)
		this.vertex[1] = new Vector(
			(this.x + (this.halfWidth + this.a)),
			(this.y + (this.height + this.b))
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

	init() {
		this.radian = this.angle * (Math.PI / 180)
		this.cos = Math.cos(this.radian)
		this.sin = Math.sin(this.radian)

		this.speedTurnX = this.speed * this.sin
		this.speedTurnY = this.speed * this.cos

		this.a = (this.halfWidth) * this.cos
		this.b = (this.halfWidth) * this.sin
		this.c = this.height * this.cos
		this.d = this.height * this.sin

		this.setVectors()
	}

	draw() {
		this.init()
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(this.vertex[3].x, this.vertex[3].y);
		this.vertex.forEach(point => ctx.lineTo(point.x, point.y))
		ctx.fill();
	}
}


class Transport extends Box {
	constructor(x, y, width, height, angle, color, physics = {}) {
		super(x, y, width, height, angle, color)
		this.velocity = physics.velocity ?? 0.1
		this.maxSpeed = physics.maxSpeed ?? 6
		this.maxSpeedBackKoef = 0.3
		this.maxSpeedBack = this.maxSpeed * (physics.maxSpeedBackKoef || this.maxSpeedBackKoef)
		this.friction = physics.friction ?? 0.07
		this.turnStep = physics.turnStep ?? 1.2
		this.braking = physics.braking ?? 2
		this.fuel = 160
		this.fuelConsumption = 1 / 512
		this.maxFuel = this.fuel
		this.refDir = this.dir
		this.disableMove = true
		this.connectedMachine = null
		this.isConnected = false
		this.type = null
	}

	onListeners() {
		this.disableMove = false
		return this
	}
	offListeners() {
		this.disableMove = true
		return this
	}

	draw() {

		if (this.disableMove) {
			this.color = this.tempColor
		} else {
			let color = this.tempColor.slice(0, -1).slice(4).split(',')
			let colorDeg = parseInt(color[0])
			let brightness = parseInt(color[1].slice(0, -1))
			let lightness = parseInt(color[2].slice(0, -1))
			this.color = `hsl(${colorDeg}, ${brightness + 40}%, ${lightness + 10}%)`
		}
		this.x += this.speedTurnX
		this.y -= this.speedTurnY
		super.draw()
		this.update()
	}

	rotate(turnStep) {
		// left
		if (keys.KeyA || keys.ArrowLeft) {
			if (keys.KeyS || keys.ArrowDown) {
				if (this.angle >= 360) this.angle = 0
				this.angle += turnStep
			} else {
				if (this.angle <= 0) this.angle = 360
				this.angle -= turnStep
			}
		}

		// right
		if (keys.KeyD || keys.ArrowRight) {
			if (keys.KeyS || keys.ArrowDown) {
				if (this.angle <= 0) this.angle = 360
				this.angle -= turnStep
			} else {
				if (this.angle >= 360) this.angle = 0
				this.angle += turnStep
			}
		}
		this.radian = this.angle * (Math.PI / 180)
	}

	moveUp() {
		if (keys.KeyW || keys.ArrowUp) {
			this.fuel -= this.fuelConsumption
			if (this.maxSpeed > this.speed && this.maxSpeed) {
				let stopVelocity = this.speed < 0 ? this.braking : 1;
				this.speed += this.velocity * stopVelocity;
			} else {
				this.speed = this.maxSpeed
			}

			if (this.speed < this.maxSpeed / 4 && this.speed > 0) {
				this.rotate(this.turnStep * this.speed);
				return
			}
			this.rotate(this.turnStep);
		}
	}

	moveDown() {
		if (keys.KeyS || keys.ArrowDown) {
			this.fuel -= this.fuelConsumption
			if (-this.maxSpeedBack < this.speed && this.maxSpeed) {
				let stopVelocity = this.speed > 0 ? this.braking : 1;
				this.speed -= this.velocity * stopVelocity;
			} else {
				this.speed = -this.maxSpeedBack

			}

			if (this.speed > -this.maxSpeed / 4 && this.speed < 0) {
				this.rotate(this.turnStep * Math.abs(this.speed));
				return
			}
			this.rotate(this.turnStep);
		}
	}

	move() {
		let rotMat = rotMx(this.radian);
		this.dir = rotMat.multiplyVec(this.refDir);
		this.moveDown()
		this.moveUp()
	}

	smoothStop() {
		if (!(keys.KeyS || keys.KeyW || keys.ArrowDown || keys.ArrowUp) || this.disableMove) {
			if (this.speed < 0) {
				this.speed += this.friction;
				if (this.speed >= -this.friction) this.speed = 0;

				if (!this.disableMove) {
					if (this.speed > -1.5 && this.speed < 0) {
						this.rotate(-this.turnStep * Math.abs(this.speed));
					} else {
						this.rotate(-this.turnStep);
					}
				}
			} else if (this.speed > 0) {
				this.speed -= this.friction;
				if (this.speed <= this.friction) this.speed = 0;

				if (!this.disableMove) {
					if (this.speed < 1.5 && this.speed > 0) {
						this.rotate(this.turnStep * this.speed);
					} else {
						this.rotate(this.turnStep);
					}
				}
			}
		}
	}

	update() {
		if (this.disableMove || this.fuel <= 0) {
			this.smoothStop()
			return
		}
		this.move()
		this.smoothStop()
		this.moveView()
	}

	moveView() {
		let yMax = Math.max(...this.vertex.map(v => v.y))
		let yMin = Math.min(...this.vertex.map(v => v.y))
		let xMax = Math.max(...this.vertex.map(v => v.x))
		let xMin = Math.min(...this.vertex.map(v => v.x))
		if (yMax > scrollY + innerHeight) {
			window.scrollTo({
				left: scrollX,
				top: yMax - innerHeight
			})
		} else if (yMin < scrollY) {
			window.scrollTo({
				left: scrollX,
				top: yMin
			})
		}

		if (xMax > scrollX + innerWidth) {
			window.scrollTo({
				left: xMax - innerWidth,
				top: scrollY
			})
		} else if (xMin < scrollX) {
			window.scrollTo({
				left: xMin,
				top: scrollY
			})
		}
	}
}

// Centered point of view on moving