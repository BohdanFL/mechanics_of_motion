class Tractor extends Transport {
	constructor(x, y, width, height, angle, color, physics) {
		super(x, y, width, height, angle, color, physics)
		this.type = 'tractor'
		this.fuel = 160
		this.maxFuel = 160-1
		this.texture.src = 'images/tractor.png'
	}
}