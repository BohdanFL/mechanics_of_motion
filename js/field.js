class FieldUnit {
	constructor(x, y, width, height) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height

		this.cultivated = false
		this.sown = false
		this.fertilized = false
		this.grown = false
		this.growingProgress = 0
		this.withered = false
		this.witheredProgress = 0
		this.harvested = false
		this.seedType = null

		this.color = `hsl(95, ${this.growingProgress}%, 30%)`
		this.vertex = []

		setSquareVectors(this)
		this.dir = getDirection(this.vertex)
	}
}

class Field {
	constructor(x, y, partsX, partsY, machines) {
		this.partsX = partsX;
		this.partsY = partsY;
		this.x = x;
		this.y = y;
		this.gap = 0
		this.unitWidth = 30;
		this.unitHeight = 30;
		this.width = (this.partsX) * this.unitWidth + (this.gap * (this.partsX))
		this.height = (this.partsY) * this.unitHeight + (this.gap * (this.partsY))
		this.color = "hsl(25, 50%, 20%)"
		this.machines = machines
		this.units = [];
		this.unitsCollide = []
		this.init();
		this.angle = 0
	}

	resize() {
		this.unitWidth = canvas.width / this.partsX;
		this.unitHeight = canvas.width / this.partsX;
		this.width = this.x + (this.partsX) * this.unitWidth + (this.gap * (this.partsX))
		this.height = this.y + (this.partsY) * this.unitHeight + (this.gap * (this.partsY))
		this.init();
	}

	drawField() {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}

	updateUnitsCollide() {
		this.unitsCollide = this.units.filter(unit => {
			this.machines.forEach(machine => {
				if (sat(machine, unit) && machine.isConnected && !machine.connectedTransport.disableMove && machine.active) {
					switch (machine.type) {
						case 'sowing':
							if (!unit.growingProgress && machine.capacity >= 0.2) {
								unit.growingProgress = 33
								machine.capacity -= 0.2
								unit.seedType = machine.seedType
							}
							break;
						case 'header':
							if (unit.grown && (machine.connectedTransport.capacity < machine.connectedTransport.maxCapacity)) {
								if (machine.connectedTransport.seedType && 
									machine.connectedTransport.seedType !== unit.seedType) {
									return false
								}
								unit.harvested = true
								unit.grown = false
								unit.growingProgress = 0
								console.log(unit.seedType)
								if (!machine.connectedTransport.seedType) {
									machine.connectedTransport.seedType = unit.seedType
								}

								if (unit.fertilized) {
									machine.connectedTransport.capacity += 2
									return
								}
								machine.connectedTransport.capacity += 1
							}
							break;
						case 'cultivator':
							if (unit.harvested || unit.grown || unit.growingProgress || unit.withered) {
								unit.cultivated = true
								unit.harvested = false
								unit.grown = false
								unit.growingProgress = 0
								unit.withered = 0
								unit.witheredProgress = 0
								if (unit.fertilized) {
									unit.fertilized = false
								}
							}
							break;
						case 'fertilizer':
							if (!unit.fertilized && (!unit.harvested || !unit.grown || !unit.withered) && unit.growingProgress && machine.capacity >= 0.2) {
								unit.fertilized = true
								machine.capacity -= 0.2
								if (unit.growingProgress >= 33 && unit.growingProgress <= 66) {
									unit.color = `hsl(95, 33%, ${unit.fertilized ? 20 : 30}%)`
								} else {
									unit.color = `hsl(95, 66%, ${unit.fertilized ? 20 : 30}%)`
								}
							}
							if (!unit.fertilized && !unit.growingProgress && machine.capacity >= 0.2) {
								unit.fertilized = true
								machine.capacity -= 0.2
								unit.color = "hsl(25, 50%, 10%)"
							}
							break;
						case 'tipper':
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
			if (unit.growingProgress > 0 || unit.grown || unit.harvested || unit.fertilized) {
				return unit
			}
		})
	}

	draw() {
		this.drawField()
		this.updateUnitsCollide()
		this.updateStateUnits()
	}

	updateStateUnits() {
		this.unitsCollide.forEach(unit => {
			if (unit.growingProgress <= 100 && unit.growingProgress !== 0 && !unit.grown) {
				if ((unit.growingProgress / 33 === 1) || (unit.growingProgress / 33 === 2)) {
					unit.color = `hsl(95, ${unit.growingProgress}%, ${unit.fertilized ? 20 : 30}%)`
				}
				unit.growingProgress += 2**-1
			}
			if (unit.growingProgress >= 100) {
				unit.grown = true
			}
			if (unit.grown) {
				unit.color = 'hsl(50, 70%, 30%)'
				if (unit.witheredProgress >= 100) {
					unit.withered = true
				} else {
					unit.witheredProgress += 2**-8
				}
			}

			if (unit.harvested) {
				if (unit.fertilized) {
					unit.fertilized = false
				}
				unit.color = 'hsl(50, 30%, 50%)'
			}

			if (unit.withered) {
				unit.color = 'hsl(50, 20%, 35%)'
			}
			// console.log(ctx.fillStyle, unit.color)
			// if (ctx.fillStyle !== unit.color)
			ctx.fillStyle = unit.color
			// console.log(ctx.fillStyle)
			ctx.fillRect(unit.vertex[3].x, unit.vertex[3].y, this.unitWidth, this.unitHeight)
		})
	}

	init() {
		this.units = []
		for (let i = 0; i < this.partsY; i++) {
			for (let j = 0; j < this.partsX; j++) {
				const unitX = this.x + j * this.unitWidth + (this.gap * j);
				const unitY = this.y + i * this.unitHeight + (this.gap * i);

				const unit = new FieldUnit(unitX, unitY, this.unitWidth, this.unitHeight)
				this.units.push(unit);
			}
		}
	}

	addMachine(machine) {
		this.machines.push(machine)
	}
}

// TODO: Refactor Field.draw function - done