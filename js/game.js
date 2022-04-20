class Game {
	constructor(fields = [], machines = [], transports = []) {
		this.fields = fields
		this.machines = machines
		this.transports = transports
		this.money = 0
	}

	addField(x, y, partsX, partsY) {
		this.fields.push(new Field(x, y, partsX, partsY, this.machines))
	}

	addTransport(x, y, width, height, angle, color) {
		let transport = new Transport(x, y, width, height, angle, color)
		this.transports.push(transport)
		this.machines.forEach(machine => {
			machine.addTransport(transport)
		})
	}

	addMachine(x, y, width, height, type) {
		let machine
		switch (type) {
			case 'sowing':
				machine = new SowingMachine(x, y, width, height, 0, this.transports)
				break;
			case 'harvester':
				machine = new Harvester(x, y, width, height, 0, this.transports)
				break;
			case 'cultivator':
				machine = new Cultivator(x, y, width, height, 0, this.transports)
				break;
			case 'fertilizer':
				machine = new Fertilizer(x, y, width, height, 0, this.transports)
				break;
			default:
				throw new Error('Not exist type')
				break;
		}
		this.machines.push(machine)
		this.fields.forEach(field => {
			field.addMachine(machine)
		})
	}

	start() {
		addEventListener("keydown", startMove)
		addEventListener("keyup", stopMove)

		// create transport
		for (let i = 1; i <= 4; i++) {
			this.addTransport(80 * i, 300, 40, 80, 0, `hsl(${(360/4) * i}, 30%, 40%)`)
		}
		// enable switch between transports
		const switcher = new Switcher(this.transports)
		switcher.on()

		// create machines
		let i = 1
		for (const key in MACHINE_TYPE) {
			this.addMachine((80 * i - 20), 400, 80, 40, key)
			i++
		}

		// create field
		this.addField(0, 0, 128, 16, this.machines)
	}

	update() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		this.fields.forEach(field => field.draw())
		this.machines.forEach(machine => machine.draw())
		this.transports.forEach(transport => transport.draw())

		this.showInfo()
	}

	showInfo() {
		let activeTransport = this.transports.find(t => !t.disableMove)
		const fuelText = `Fuel: ${Math.abs(activeTransport.fuel.toFixed())}`
		const moneyText = `Money: ${this.money}`
		ctx.font = '24px monospace'
		const fuelTextInfo = ctx.measureText(fuelText)
		const moneyTextInfo = ctx.measureText(moneyText)
		ctx.fillStyle = activeTransport.color
		ctx.fillText(fuelText, fuelTextInfo.width / 3, canvas.height - 20)
		ctx.fillStyle = 'gold'
		ctx.fillText(moneyText, fuelTextInfo.width / 3 + fuelTextInfo.width + moneyTextInfo.width / 3, canvas.height - 20)
	}
}