class Machines {
	constructor(x, y, width, height) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height

		this.halfWidth = this.width / 2
		this.angle = 0
		this.speed = 0
		this.radian = this.angle * (Math.PI / 180)
		this.isConnected = false
		this.points = []
		this.vertex = []
		this.calculationOfPoint()
		this.edge = this.vertex[2].subtr(this.vertex[1]);
		this.length = this.edge.mag();
		this.dir = this.edge.unit();
		this.refDir = this.edge.unit()

		window.addEventListener("keydown", (e) => {
			if (e.code === 'Space' && sat(player, this) && !this.isConnected) {
				this.isConnected = true
				this.x = player.x - (this.width - player.width) / 2
				this.y = player.y + player.height
			} else if (e.code === 'Space' && this.isConnected) {
				this.isConnected = false
			}
		})
	}

	draw() {
		this.calculationOfPoint()
		ctx.save()
		ctx.beginPath()
		ctx.strokeStyle = 'rgb(0, 0, 255)'
		ctx.moveTo(this.points[3].x, this.points[3].y);

		this.points.forEach(point => {
			ctx.lineTo(point.x, point.y)
		})

		ctx.stroke()
		ctx.restore()

		this.x += this.speedTurnX
		this.y -= this.speedTurnY
		this.connectToPlayer()
	}

	calculationOfPoint() {
		this.cos = Math.cos(this.radian)
		this.sin = Math.sin(this.radian)

		this.speedTurnX = this.speed * this.sin
		this.speedTurnY = this.speed * this.cos

		this.a = (this.halfWidth) * this.cos
		this.b = (this.halfWidth) * this.sin
		this.c = this.height * this.cos
		this.d = this.height * this.sin

		this.points[0] = {
			x: (this.x + (this.halfWidth - this.a)) + this.speedTurnX,
			y: (this.y - this.b) - this.speedTurnY
		}
		this.points[1] = {
			x: (this.x + (this.halfWidth + this.a)) + this.speedTurnX,
			y: (this.y + this.b) - this.speedTurnY
		}

		this.points[2] = {
			x: this.points[1].x - this.d,
			y: this.points[1].y + this.c
		}
		this.points[3] = {
			x: this.points[0].x - this.d,
			y: this.points[0].y + this.c
		}
		this.setVector()
	}

	setVector() {
		this.vertex[0] = new Vector(this.points[0].x, this.points[0].y);
		this.vertex[1] = new Vector(this.points[1].x, this.points[1].y);
		this.vertex[2] = new Vector(this.points[2].x, this.points[2].y);
		this.vertex[3] = new Vector(this.points[3].x, this.points[3].y);
	}

	connectToPlayer() {
		if (this.isConnected) {
			this.x = player.x - (this.width - player.width) / 2
			this.y = player.y + player.height
			this.speed = player.speed
			this.radian = player.radian
			this.dir = player.dir
		} else {
			this.speed = 0
		}
	}
}

class SowingMachines extends Machines {
	constructor() {
		super()
	}
}

class Cultivator extends Machines {
	constructor() {
		super()
	}
}