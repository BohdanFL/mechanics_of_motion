class LoadingStation extends Station {
	constructor(x, y, width, height, angle, color = 'rgba(255, 0, 0, 0.5)') {
		super(x, y, width, height, angle, color)
		this.type = 'loading'
		this.tippers = []
	}

	update() {
		this.tippers.forEach(t => {
			if (sat(t, this) && t.capacity > 0) {
				game.storage[t.seedType] += 2
				updateSeedCapacity(t.seedType)
				t.capacity -= 2
			}
			if (t.capacity <= 0) {
				t.seedType = null
			}
		})
	}
}
class UnloadingStation extends Station {
	constructor(x, y, width, height, angle, color = 'rgba(0, 0, 255, 0.5)') {
		super(x, y, width, height, angle, color)
		this.type = 'unloading'
		this.tippers = []
		this.seedType = SEED_TYPE.wheat
	}

	update() {
		this.tippers.forEach(t => {
			if (sat(t, this) && game.storage[this.seedType] > 0 && (!t.seedType || t.seedType === this.seedType)) {
				game.storage[this.seedType] -= 2
				updateSeedCapacity(this.seedType)
				t.capacity += 2
				t.seedType = this.seedType
			}
		})
	}
	drawText() {
		ctx.font = '0.8rem monospace'
		ctx.fillStyle = 'rgb(255, 255, 255)'
		ctx.fillText(this.seedType, this.x, this.y+25, this.width)
	}
}
