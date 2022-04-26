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

	addTransport(x, y, width, height, angle, color, type) {
		let transport
		switch (type) {
			case 'harvester':
				transport = new Harvester(x, y, width, height, angle, color)
				break;
			case 'tractor':
				transport = new Tractor(x, y, width, height, angle, color)
				break;
			case 'car':
				transport = new Car(x, y, width, height, angle, color)
				break;
			default:
				throw new Error('Not exist type')
				break;
		}
		this.transports.push(transport)
		this.machines.forEach(machine => {
			switch (type) {
				case 'harvester':
					if (machine.type === 'header') {
						machine.addTransport(transport)
					}
					break;
				case 'tractor':
					if (machine.type !== 'tipper' && machine.type !== 'header') {
						machine.addTransport(transport)
					}
					break;
				case 'car':
					if (machine.type === 'tipper') {
						machine.addTransport(transport)
					}
					break;
			}
		})
	}

	addMachine(x, y, width, height, type) {
		let machine
		switch (type) {
			case 'sowing':
				machine = new SowingMachine(x, y, width, height, 0, this.transports.filter(t => t.type === 'tractor'))
				break;
			case 'header':
				machine = new Header(x, y, width, height, 0, this.transports.filter(t => t.type === 'harvester'))
				break;
			case 'cultivator':
				machine = new Cultivator(x, y, width, height, 0, this.transports.filter(t => t.type === 'tractor'))
				break;
			case 'fertilizer':
				machine = new Fertilizer(x, y, width, height, 0, this.transports.filter(t => t.type === 'tractor'))
				break;
			case 'tipper':
				machine = new Tipper(x, y, width, height, 0, this.transports.filter(t => t.type === 'car'))
				break;
			default:
				throw new Error('Not exist type')
				break;
		}
		this.machines.push(machine)
		this.fields.forEach(field => {
			if (type !== 'tipper') {
				field.addMachine(machine)
			}
		})
	}

	start() {

		addEventListener("keydown", startMove)
		addEventListener("keyup", stopMove)

		// create transport
		let transportWidth = 50
		for (let i = 1; i <= 3; i++) {
			this.addTransport((transportWidth*2) * i, 300, transportWidth, 80, 0, `hsl(${(360/5) * i}, 30%, 40%)`, 'tractor')
		}

		// create harvester
		let harvester = new Harvester(transportWidth*2 * 4 + 35, 500, 80, 130, 0, `hsl(${(360/5) * 4}, 30%, 40%)`)
		this.transports.push(harvester)

		//create car
		let car = new Car(600 + (15/2), 305, 45, 75, 0, `hsl(${(360/5) * 5}, 30%, 40%)`)
		this.transports.push(car)

		// enable switch between transports
		const switcher = new Switcher(this.transports)
		switcher.on()

		// create machines
		let machineWidth = 100
		for (let i = 0; i <= 1; i++) {
			let i2 = 0
			for (const key in MACHINE_TYPE) {
				i2++
				if (key === 'header') {
					this.addMachine(machineWidth * i2-25, 400 + (i * 50), machineWidth*2, 40, key)
				} else if (key ==='tipper'){
					this.addMachine((machineWidth * (i2+1) + i*120), 400, 60, 120, key)
				} else {
					this.addMachine(machineWidth * i2-25, 400 + (i * 50), machineWidth, 40, key)
				}
			}
		}
		harvester.tippers = game.machines.filter(m => m.type ==='tipper')
		// create field
		this.addField(0, 0, 64, 16, this.machines)
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
		let activeMachine = activeTransport.connectedMachine
		$info.innerHTML = `
			<span>${Math.abs(activeTransport.speed.toFixed(1))} km/h</span> <br>
			<span>Money: ${this.money}</span> <br>
			<span>Fuel: ${activeTransport.fuel.toFixed()}</span>
		`
		let procents, current
		if (activeMachine && (activeMachine.type === 'sowing' || activeMachine.type === 'fertilizer' || activeMachine.type === 'tipper')) {

			current = activeMachine
		} else if (activeTransport.type === 'harvester') {
			current = activeTransport
		} 

		if (current) {
			procents = (100 * current.capacity) / current.maxCapacity
			$info.innerHTML += `<br><span>Capacity: ${procents.toFixed()} %</span>`
		}
	}

	setPhysicsForTransport(physics, type = 'tractor') {
		this.transports.forEach(t => {
			if (t.type !== type)  return
			if (physics.velocity!== undefined) {
				t.velocity = physics.velocity
			}
			if (physics.maxSpeed !== undefined) {
				t.maxSpeed = physics.maxSpeed
				t.maxSpeedBack = t.maxSpeed * t.maxSpeedBackKoef
			}
			if (physics.turnStep!== undefined) {
				t.turnStep = physics.turnStep
			}
			if (physics.friction!== undefined) {
				t.friction = physics.friction
			}
			if (physics.braking!== undefined) {
				t.braking = physics.braking
			}
			if (physics.maxSpeedBackKoef!== undefined) {
				t.maxSpeedBackKoef = physics.maxSpeedBackKoef
				t.maxSpeedBack = t.maxSpeed * t.maxSpeedBackKoef
			}
		})
	}
}