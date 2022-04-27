class Game {
	constructor(fields = [], machines = [], transports = [], stations = [], sellers = []) {
		this.fields = fields
		this.machines = machines
		this.transports = transports
		this.stations = stations
		this.sellers = sellers
		this.activeTransport = null
		this.activeMachine = null
		this.money = 3000
	}

	addField(x, y, partsX, partsY, machines) {
		this.fields.push(new Field(x, y, partsX, partsY, machines))
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

	addStation(x, y, width, height, angle, color, type) {
		let station 
		switch (type) {
			case STATION_TYPE.fuel:
				station = new FuelStation(x, y, width, height, angle, color)
				station.transports = this.transports
				break;
			case STATION_TYPE.seed:
				station = new SeedStation(x, y, width, height, angle, color)
				station.sowings = this.machines.filter(m => m.type === MACHINE_TYPE.sowing)
				break;
			case STATION_TYPE.fertilizer:
				station = new FertilizerStation(x, y, width, height, angle, color)
				station.fertilizers = this.machines.filter(m => m.type === MACHINE_TYPE.fertilizer)
				break;
			default:
				throw new Error('Not exist type')
				break;
		}
		this.stations.push(station)
	}

	addSellers(x, y, width, height, angle, color) {
		let seller = new Seller(x, y, width, height, angle, color)
		seller.tippers = this.machines.filter(m => m.type === MACHINE_TYPE.tipper)
		this.sellers.push(seller)
	}

	start() {
		// window.scrollTo({top: 0, left: 0})

		addEventListener("keydown", startMove)
		addEventListener("keyup", stopMove)

		// create transport
		let transportWidth = 40
		for (let i = 1; i <= 3; i++) {
			this.addTransport((transportWidth*2) * i, 300, transportWidth, transportWidth*1.6, 0, `hsl(${(360/5) * i}, 30%, 40%)`, 'tractor')
		}

		// create harvester'
		let harvesterWidth = transportWidth*1.6
		let harvester = new Harvester(transportWidth*2 * 4 + 35, 500, harvesterWidth, harvesterWidth*1.6, 0, `hsl(${(360/5) * 4}, 30%, 40%)`)
		this.transports.push(harvester)

		//create car
		let carWidth = transportWidth * 0.9
		let car = new Car(600 + (15/2), 305, carWidth, carWidth*1.6, 0, `hsl(${(360/5) * 5}, 30%, 40%)`)
		this.transports.push(car)

		// enable switch between transports
		const switcher = new Switcher(this.transports)
		switcher.on()

		// create machines
		let machineWidth = transportWidth*2
		for (let i = 0; i <= 1; i++) {
			let i2 = 0
			for (const key in MACHINE_TYPE) {
				i2++
				if (key === 'header') {
					this.addMachine(machineWidth * i2-25, 400 + (i * 50), machineWidth*2, machineWidth*0.4, key)
				} else if (key ==='tipper'){
					this.addMachine((machineWidth * (i2+1) + i*120), 400, machineWidth* 0.6, machineWidth*1.2, key)
				} else {
					this.addMachine(machineWidth * i2-25, 400 + (i * 50), machineWidth, machineWidth*0.4, key)
				}
			}
		}
		harvester.tippers = game.machines.filter(m => m.type ==='tipper')
		// create field
		for	(let i = 0; i < 4; i++) {
			this.addField(15 + (16*10)*i + (60*i), 30, 16, 32, this.machines)
		}

		// create stations 
		let i3 = 0
		let stationWidth = 60
		for (const key in STATION_TYPE) {
			let y = game.fields[0].units.findLast(t => t).y + game.fields[0].units.findLast(t => t).height
			this.addStation(innerWidth-stationWidth, y + (stationWidth*2)*i3, 
			stationWidth, stationWidth, 0, 'rgb(100, 100, 100)', key)
			i3++
		}

		//create sellers
		this.addSellers(0, innerHeight-stationWidth*3, stationWidth, stationWidth)

		// create minimap
		this.minimap = new Minimap(10, innerHeight-10, 100, 100)
	}

	update() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		this.fields.forEach(f => f.draw())
		this.machines.forEach(m => m.draw())
		this.transports.forEach(t => t.draw())
		this.stations.forEach(s => s.draw())
		this.sellers.forEach(s => s.draw())
		this.minimap.draw()
		this.showInfo()
		this.globalCollide()
	}

	showInfo() {
		this.activeTransport = this.transports.find(t => !t.disableMove)
		this.activeMachine = this.activeTransport.connectedMachine
		$info.innerHTML = `
			<span>${Math.abs(this.activeTransport.speed.toFixed(1))} km/h</span> <br>
			<span>Money: ${this.money}</span> <br>
			<span>Fuel: ${this.activeTransport.fuel.toFixed()}</span>
		`
		let procents, current, seed
		if (this.activeMachine && this.activeMachine.hasOwnProperty('capacity')) {
			current = this.activeMachine
		} else if (this.activeTransport.hasOwnProperty('capacity')) {
			current = this.activeTransport
		}

		if (current && current.capacity > 0) {
			procents = (100 * current.capacity) / current.maxCapacity
			if (current.hasOwnProperty('seedType') && current.seedType) {
				seed = capitalize(current.seedType)
			} else {
				seed = 'Capacity'
			}
			$info.innerHTML += `<br><span>${seed}: ${procents.toFixed()} %</span>`
		}
		$info.style.top = scrollY + 20+'px'
		$info.style.left = scrollX + (innerWidth*0.8)+'px'

		$settings.style.top = scrollY +15+'px'
		$settings.style.left = scrollX +10+'px'
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

	globalCollide() {
		// this.machines.forEach(machine => {
		// 	this.transports.forEach(transport => {
		// 		if (sat(machine, transport)) {

		// 			// transport.speed = -transport.speed
		// 		}
		// 	})
		// })
	}
}