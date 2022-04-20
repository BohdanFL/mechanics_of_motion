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

	addTransport(x, y, width, height, angle) {
		let transport = new Transport(x, y, width, height, angle)
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
			this.addTransport(80 * i, 300, 40, 80)
		}

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

		// enable switch between transports

	}

	update() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		this.fields.forEach(field => field.draw())
		this.machines.forEach(machine => machine.draw())
		this.transports.forEach(transport => transport.draw())
	}
}