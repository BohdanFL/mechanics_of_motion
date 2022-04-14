class Machines {
	constructor(x, y, width, height) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
		this.isConnected = false
	}
}

class SowingMachines extends Machines {
	constructor() {
		super()
	}
}

class Cultivator extends Machines {
	constructor() {
		super()
	}
}