class Seller extends Station {
	constructor(x, y, width, height, angle, color = 'rgba(0, 200, 0, .5)') {
		super(x, y, width, height, angle, color)
		this.price = 4
		this.type = 'seller'
		this.tippers = []
	}

	draw() {
		super.draw()

		this.tippers.forEach(t => {
			if (sat(t, this) && t.capacity > 0) {
				t.capacity -= 2
				game.money += this.price*2
			} else if (t.capacity <= 0) {
				t.seedType = null
			}
		})
	}
}