class FieldUnit {
	constructor(x, y, width, height) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.color = false
		this.isGrew = false
		this.points = [{
				x: x,
				y: y + this.height
			},
			{
				x: x + this.width,
				y: y + this.height
			},
			{
				x: x + this.width,
				y: y
			},
			{
				x: x,
				y: y
			}
		]

		this.vertex = []
		this.vertex[0] = new Vector(this.points[0].x, this.points[3].y);
		this.vertex[1] = new Vector(this.points[1].x, this.points[2].y);
		this.vertex[2] = new Vector(this.points[2].x, this.points[1].y);
		this.vertex[3] = new Vector(this.points[3].x, this.points[0].y);

		this.edge = this.vertex[1].subtr(this.vertex[0]);
		this.length = this.edge.mag();
		this.dir = this.edge.unit();
	}

	startTimer(brightness = 0) {
		if (brightness < 70) {
			this.color = `hsl(95, ${brightness}%, 30%)`
			brightness++
			setTimeout(() => this.startTimer(brightness), 10)
		} else {
			this.isGrew = true
		}
	}
}

class Field {
	constructor(partsX, partsY, {
		x,
		y
	}, colliders) {
		this.partsX = partsX;
		this.partsY = partsY;
		this.x = x;
		this.y = y;
		this.unitWidth = Math.round(canvas.width / partsX);
		this.unitHeight = Math.round(canvas.width / partsX);
		this.units = [];
		this.gap = 0
		this.colliders = colliders

		this.calculationOfPoint();
	}

	draw() {
		this.units.forEach(unit => {
			ctx.save()

			ctx.beginPath()
			ctx.moveTo(unit.points[3].x, unit.points[3].y)

			if (unit.color) {
				if (!unit.isGrew) {
					ctx.fillStyle = unit.color
				} else {
					ctx.fillStyle = 'hsl(48, 70%, 30%)'
				}
			} else {
				this.colliders.forEach(collider => {
					if (sat(collider, unit)) {
						unit.startTimer()
					}
				})
			}

			unit.points.forEach(point => {
				ctx.lineTo(point.x, point.y)
			})

			ctx.fill()
			ctx.restore()
		})
	}


	calculationOfPoint() {
		for (let i = 0; i < this.partsY; i++) {
			for (let j = 0; j < this.partsX; j++) {
				const unitX = this.x + j * this.unitWidth + (this.gap * j);
				const unitY = this.y + i * this.unitHeight + (this.gap * i);

				const unit = new FieldUnit(unitX, unitY, this.unitWidth, this.unitHeight)
				this.units.push(unit);
			}
		}
	}
}