class Player {
	constructor({
		x = 50,
		y = 100,
		width = 50,
		height = 100,
		maxSpeed = 5,
		angle = 0,
		color = 'rgba(205, 205, 50, 1)'
	}) {
		this.x = x
		this.y = y
		this.width = width
		this.halfWidth = width / 2
		this.height = height
		this.color = color
		this.speed = 0
		this.velocity = 0.08
		this.turnSpeed = 3
		this.angle = angle
		this.radian = angle * (Math.PI / 180)
		this.maxSpeed = maxSpeed
		this.vertex = [];

		this.calculatinOfPoint()

		/* getting direction */
		console.log(this.vertex)
		this.edge = this.vertex[2].subtr(this.vertex[1]);
		this.length = this.edge.mag();
		this.dir = this.edge.unit();
		this.refDir = this.edge.unit()
		this.keys = {
			KeyW: false,
			KeyA: false,
			KeyS: false,
			KeyD: false,
			ArrowUp: false,
			ArrowLeft: false,
			ArrowDown: false,
			ArrowRight: false,
		}
		this.initMoveListener()
	}

	startMove() {
		addEventListener("keydown", e => {
			e.preventDefault();
			if (this.keys.hasOwnProperty(e.code)) {
				this.keys[e.code] = true;
			}
		})
	}

	stopMove() {
		addEventListener("keyup", e => {
			e.preventDefault();
			if (this.keys.hasOwnProperty(e.code)) {
				this.keys[e.code] = false;
			}
		})
	}

	initMoveListener() {
		this.startMove()
		this.stopMove()
	}

	calculatinOfPoint() {
		this.cos = Math.cos(this.radian)
		this.sin = Math.sin(this.radian)

		this.speedTurnX = this.speed * this.sin
		this.speedTurnY = this.speed * this.cos

		this.a = (this.halfWidth) * this.cos
		this.b = (this.halfWidth) * this.sin
		this.c = this.height * this.cos
		this.d = this.height * this.sin


		this.points = [{
				x: (this.x + (this.halfWidth - this.a)) + this.speedTurnX,
				y: (this.y + (this.height - this.b)) - this.speedTurnY
			},
			{
				x: (this.x + (this.halfWidth + this.a)) + this.speedTurnX,
				y: (this.y + (this.height + this.b)) - this.speedTurnY
			}
		]
		this.points[2] = {
			x: this.points[1].x + this.d,
			y: this.points[1].y - this.c
		}
		this.points[3] = {
			x: this.points[0].x + this.d,
			y: this.points[0].y - this.c
		}

		this.setVector()
	}

	draw() {
		this.calculatinOfPoint()

		ctx.save();
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 2;
		ctx.beginPath();

		// left-top
		ctx.moveTo(this.points[3].x, this.points[3].y);
		// right-top
		ctx.lineTo(this.points[2].x, this.points[2].y);
		// right-bottom
		ctx.lineTo(this.points[1].x, this.points[1].y);
		// left bottom
		ctx.lineTo(this.points[0].x, this.points[0].y);

		ctx.lineTo(this.points[3].x, this.points[3].y);

		this.a = (this.width) * this.cos
		this.b = (this.width) * this.sin

		this.c = (this.height + this.height) * this.cos
		this.d = (this.height + this.height) * this.sin


		ctx.stroke();
		ctx.restore()



		this.x += this.speedTurnX
		this.y -= this.speedTurnY
		this.update()
	}

	setVector() {
		this.vertex[0] = new Vector(this.points[0].x, this.points[0].y);
		this.vertex[1] = new Vector(this.points[1].x, this.points[1].y);
		this.vertex[2] = new Vector(this.points[2].x, this.points[2].y);
		this.vertex[3] = new Vector(this.points[3].x, this.points[3].y);
	}

	rotate(turnSpeed) {
		if (this.keys.KeyA || this.keys.ArrowLeft) {
			if (this.keys.KeyS || this.keys.ArrowDown) {
				if (this.angle >= 360) this.angle = 0
				this.angle += turnSpeed
			} else {
				if (this.angle <= 0) this.angle = 360
				this.angle -= turnSpeed
			}
		}
		// right

		if (this.keys.KeyD || this.keys.ArrowRight) {
			if (this.keys.KeyS || this.keys.ArrowDown) {
				if (this.angle <= 0) this.angle = 360
				this.angle -= turnSpeed
			} else {
				if (this.angle >= 360) this.angle = 0
				this.angle += turnSpeed
			}
		}

		this.radian = this.angle * (Math.PI / 180)
	}

	move() {
		let rotMat = rotMx(this.radian);
		this.dir = rotMat.multiplyVec(this.refDir);

		if (this.keys.KeyW || this.keys.ArrowUp) {

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

		// bottom
		if (this.keys.KeyS || this.keys.ArrowDown) {

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

	update() {
		this.move()

		if (!(this.keys.KeyS || this.keys.KeyW || this.keys.ArrowDown || this.keys.ArrowUp)) {
			if (this.speed < 0) {
				this.speed += this.velocity;
				if (this.speed >= -this.velocity) this.speed = 0;
				if (this.speed > -1.5 && this.speed < 0) {
					this.rotate(-this.turnSpeed * Math.abs(this.speed));
				} else {
					this.rotate(-this.turnSpeed);
				}

			} else if (this.speed > 0) {
				this.speed -= this.velocity;
				if (this.speed <= this.velocity) this.speed = 0;

				if (this.speed < 1.5 && this.speed > 0) {
					this.rotate(this.turnSpeed * this.speed);
				} else {
					this.rotate(this.turnSpeed);
				}
			}
		}

		this.showInfo()
	}

	showInfo() {
		info.innerHTML = `
		<p>
			Point 1: (${this.points[0].x.toFixed(1)}, ${this.points[0].y.toFixed(1)})
		</p>
		<p>
			Point 2: (${this.points[1].x.toFixed(1)}, ${this.points[1].y.toFixed(1)})
		</p>
		<p>
			Point 3: (${this.points[2].x.toFixed(1)}, ${this.points[2].y.toFixed(1)})
		</p>
		<p>
			Point 4: (${this.points[3].x.toFixed(1)}, ${this.points[3].y.toFixed(1)})
		</p>
		<p>Angle: ${this.angle.toFixed()} deg</p>
		<p>Speed: ${Math.abs(this.speed.toFixed(1))} km/h</p>
		`
	}
}