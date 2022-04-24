class Harvester extends Transport {
	constructor(x, y, width, height, angle, color, physics) {
		super(x, y, width, height, angle, color, physics)
		this.type = 'harvester'
		this.maxSpeed = this.maxSpeed * 0.5
		this.velocity = this.velocity * 0.5
		this.turnStep = this.turnStep * 0.5
		this.capacity = 0
		this.maxCapacity = 8192
		this.fuel = this.fuel*2.2
	}

	// transportPipe
}