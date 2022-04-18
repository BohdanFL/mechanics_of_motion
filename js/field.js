class FieldUnit {
	constructor(x, y, width, height) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		// this.isGrew = false
		// this.isGrowing = 0

		this.cultivated = false
		this.sown = false
		this.fertilized = false
		this.grown = false
		this.growingProgress = 0
		this.harvested = false

		this.color = `hsl(95, ${this.growingProgress}%, 30%)`
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
}

class Field {
	constructor(partsX, partsY, {
		x,
		y
	}, machines) {
		this.partsX = partsX;
		this.partsY = partsY;
		this.x = x;
		this.y = y;
		this.gap = 0
		this.unitWidth = Math.round(canvas.width / partsX);
		this.unitHeight = Math.round(canvas.width / partsX);
		this.width = this.x + (this.partsX) * this.unitWidth + (this.gap * (this.partsX))
		this.height = this.y + (this.partsY) * this.unitHeight + (this.gap * (this.partsY))
		// this.unitWidth = 20
		// this.unitHeight = 20
		this.color = "hsl(25, 50%, 20%)"
		this.units = [];
		this.machines = machines
		this.unitsCollide = []
		this.calculationOfPoint();
	}

	draw() {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x, this.y, this.width, this.height)
		this.unitsCollide = []
		this.unitsCollide = this.units.filter(unit => {

			this.machines.forEach(machine => {
				if (sat(machine, unit) && machine.isConnected) {
					switch (machine.type) {
						case 'sowing':
							if (!unit.growingProgress) {
								unit.growingProgress = 33
							}
							break;
						case 'harvester':
							if (unit.grown) {
								unit.harvested = true
								unit.grown = false
								unit.growingProgress = 0
							}
							break;
						case 'cultivator':
							if (unit.harvested || unit.grown || unit.growingProgress) {
								unit.cultivated = true
								unit.harvested = false
								unit.grown = false
								unit.growingProgress = 0
							}
							break;
						case 'fertilizer':

							break;
						default:
							throw new Error('Not exist type')
							break;
					}
				}
			})
			if (unit.cultivated) {
				unit.cultivated = false
				return false
			}
			if (unit.growingProgress > 0 || unit.grown || unit.harvested) {
				return unit
			}
		})
		if (this.unitsCollide.length) {
			this.unitsCollide.forEach(unit => {

				if (unit.growingProgress <= 100 && !unit.grown) {
					if ((unit.growingProgress / 33 === 1) || (unit.growingProgress / 33 === 2)) {
						unit.color = `hsl(95, ${unit.growingProgress}%, 30%)`
					}
					unit.growingProgress += 1 / 4
				}
				if (unit.growingProgress >= 100) {
					unit.grown = true
				}
				if (unit.grown) {
					unit.color = 'hsl(50, 70%, 30%)'
				}
				if (unit.harvested) {
					unit.color = 'hsl(50, 30%, 50%)'
				}

				ctx.fillStyle = unit.color
				ctx.fillRect(unit.points[3].x, unit.points[3].y, this.unitWidth, this.unitHeight)
			})
		}
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