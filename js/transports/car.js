class Car extends Transport {
	constructor(x, y, width, height, angle, color, physics) {
		super(x, y, width, height, angle, color, physics)
		this.type = 'car'
		this.maxSpeed = this.maxSpeed*1.2
		this.velocity = this.velocity*1.2
		this.maxSpeedBackKoef = this.maxSpeedBackKoef * 1.5
		this.maxSpeedBack = this.maxSpeed * this.maxSpeedBackKoef
	}
}