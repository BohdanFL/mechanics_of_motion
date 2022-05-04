class FuelStation extends Station {
	constructor(x, y, width, height, angle, color) {
		super(x, y, width, height, angle, color)
		this.type = STATION_TYPE.fuel
		this.price = 1
		this.transports = []
	}

	update() {
		this.transports.forEach(t => {
			if (sat(t, this) && game.money > 0 && t.maxFuel >= t.fuel) {
				t.fuel++
				game.money -= this.price
			}
		})
	}
}