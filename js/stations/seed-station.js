class SeedStation extends Station {
	constructor(x, y, width, height, angle, color) {
		super(x, y, width, height, angle, color)
		this.type = STATION_TYPE.seed
		this.price = 1
		this.sowings = []
	}

	draw() {
		super.draw()

		this.sowings.forEach(s => {
			if (sat(s, this) && game.money > 0 && s.maxCapacity > s.capacity) {
				s.capacity++
				game.money -= this.price
			}
		})
	}
}