class Car extends Transport {
	constructor(x, y, width, height, angle, color, physics) {
		super(x, y, width, height, angle, color, physics)
		this.type = 'car'
	}
}