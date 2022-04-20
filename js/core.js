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

		this.vertex = []
		this.init()
		this.dir = getDirection(this.vertex)
	}

	setVectors() {
		this.vertex[0] = new Vector(
			(this.x + (this.halfWidth - this.a)) + this.speedTurnX,
			(this.y + (this.height - this.b)) - this.speedTurnY
		)
		this.vertex[1] = new Vector(
			(this.x + (this.halfWidth + this.a)) + this.speedTurnX,
			(this.y + (this.height + this.b)) - this.speedTurnY
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
	constructor(x, y, width, height, angle, color) {
		super(x, y, width, height, angle, color)

		this.velocity = 0.12
		this.maxSpeed = 6
		this.turnSpeed = 1.4
		this.fuel = 100

		this.refDir = this.dir
		this.disableMove = true
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
			this.color = 'black'
		} else {
			this.color = 'yellow'
		}
		super.draw()
		this.x += this.speedTurnX
		this.y -= this.speedTurnY
		this.update()
	}

	rotate(turnSpeed) {
		// left
		if (keys.KeyA || keys.ArrowLeft) {
			if (keys.KeyS || keys.ArrowDown) {
				if (this.angle >= 360) this.angle = 0
				this.angle += turnSpeed
			} else {
				if (this.angle <= 0) this.angle = 360
				this.angle -= turnSpeed
			}
		}

		// right
		if (keys.KeyD || keys.ArrowRight) {
			if (keys.KeyS || keys.ArrowDown) {
				if (this.angle <= 0) this.angle = 360
				this.angle -= turnSpeed
			} else {
				if (this.angle >= 360) this.angle = 0
				this.angle += turnSpeed
			}
		}

		this.radian = this.angle * (Math.PI / 180)
	}

	moveUp() {
		if (keys.KeyW || keys.ArrowUp) {
			if (this.maxSpeed >= this.speed) {
				let stopVelocity = this.speed < 0 ? 1.5 : 1;
				this.speed += this.velocity * stopVelocity;
			}

			if (this.speed < 1.5 && this.speed > 0) {
				this.rotate(this.turnSpeed * this.speed);
			} else {
				this.rotate(this.turnSpeed);
			}
		}
	}

	moveDown() {
		if (keys.KeyS || keys.ArrowDown) {
			if (-this.maxSpeed / 1.5 <= this.speed) {
				let stopVelocity = this.speed > 0 ? 1.5 : 1;
				this.speed -= this.velocity * stopVelocity;
			}

			if (this.speed > -1.5 && this.speed < 0) {
				this.rotate(this.turnSpeed * Math.abs(this.speed));
			} else {
				this.rotate(this.turnSpeed);
			}
		}
	}

	move() {
		let rotMat = rotMx(this.radian);
		this.dir = rotMat.multiplyVec(this.refDir);

		this.moveUp()
		this.moveDown()
	}

	smoothStop() {
		if (!(keys.KeyS || keys.KeyW || keys.ArrowDown || keys.ArrowUp) || this.disableMove) {
			if (this.speed < 0) {
				this.speed += this.velocity;
				if (this.speed >= -this.velocity) this.speed = 0;

				if (!this.disableMove) {
					if (this.speed > -1.5 && this.speed < 0) {
						this.rotate(-this.turnSpeed * Math.abs(this.speed));
					} else {
						this.rotate(-this.turnSpeed);
					}
				}
			} else if (this.speed > 0) {
				this.speed -= this.velocity;
				if (this.speed <= this.velocity) this.speed = 0;

				if (!this.disableMove) {
					if (this.speed < 1.5 && this.speed > 0) {
						this.rotate(this.turnSpeed * this.speed);
					} else {
						this.rotate(this.turnSpeed);
					}
				}
			}
		}
	}

	update() {
		if (this.disableMove) {
			this.smoothStop()
			return
		}
		this.move()
		this.smoothStop()
	}
}