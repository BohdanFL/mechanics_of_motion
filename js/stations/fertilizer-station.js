class FertilizerStation extends Station {
	constructor(x, y, width, height, angle, color) {
		super(x, y, width, height, angle, color)
		this.type = STATION_TYPE.fertilizer
		this.price = 1
		this.fertilizers = []
	}

	update() {
		this.fertilizers.forEach(f => {
			if (sat(f, this) && game.money > 0 && f.maxCapacity > f.capacity) {
				f.capacity++
				game.money -= this.price
			}
		})
	}
}