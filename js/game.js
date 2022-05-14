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
		this.x = canvas.width/2 - innerWidth/2
		this.y = canvas.height/2 - innerHeight/2
		this.zoom = 1
		this.storage = {}
		for (const key in SEED_TYPE) {
			this.storage[key] = 10000
		}
	}

	addField(x, y, partsX, partsY, machines) {
		let field = new Field(x, y, partsX, partsY, machines)
		this.fields.push(field)
		return field
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
		return transport
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
		return machine
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
			case STATION_TYPE.loading:
				station = new LoadingStation(x, y, width, height, angle, color)
				station.tippers = this.machines.filter(m => m.type === MACHINE_TYPE.tipper)
				break;
			case STATION_TYPE.unloading:
				station = new UnloadingStation(x, y, width, height, angle, color)
				station.tippers = this.machines.filter(m => m.type === MACHINE_TYPE.tipper)
				break;
			default:
				throw new Error('Not exist type')
				break;
		}
		this.stations.push(station)
		return station
	}

	addSellers(x, y, width, height, angle, color) {
		let seller = new Seller(x, y, width, height, angle, color)
		seller.tippers = this.machines.filter(m => m.type === MACHINE_TYPE.tipper)
		this.sellers.push(seller)
		return seller
	}

	start() {
		window.scrollTo({top: this.x, left: this.y})
		// ctx.scale(this.zoom, this.zoom)
		addEventListener("keydown", startMove)
		addEventListener("keyup", stopMove)

		// create transport
		// відношення(ширина-висота) = 1 -- 1.5
		let transportWidth = 36
		for (let i = 0; i < 3; i++) {
			this.addTransport(this.x + (transportWidth*1.2) * i + 4, this.y + 350, transportWidth, transportWidth*1.5, 0, `hsl(${(360/5) * i}, 30%, 40%)`, 'tractor')
		}
		// create harvester
		// відношення(ширина-висота) = 1 -- 1.8
		let harvesterWidth = transportWidth*1.7
		let harvester = new Harvester(this.x + transportWidth*1.2 * 3 + 16,this.y + 500, harvesterWidth, harvesterWidth*1.8, 0, `hsl(${(360/5) * 4}, 30%, 40%)`)
		this.transports.push(harvester)

		//create car
		// відношення(ширина-висота) = 1 - 2
		let carWidth = transportWidth * 0.9
		let car = new Car(this.x + 238 + 5, this.y +350, carWidth, carWidth*2, 0, `hsl(${(360/5) * 5}, 30%, 40%)`)
		this.transports.push(car)
		// enable switch between transports
		const switcher = new Switcher(this.transports)
		switcher.on()

		// create machines
		let machineWidth = transportWidth*1.2
			let i2 = 0
			for (const key in MACHINE_TYPE) {
				if (key === 'header') {
					// відношення(ширина-висота) = 3 / 1
					this.addMachine(this.x + machineWidth * i2, this.y + 450, machineWidth*2, machineWidth*2/3, key)
				} else if (key ==='tipper'){
					
					// відношення(ширина-висота) = 1 / 2.54
					this.addMachine(this.x + (machineWidth * i2 + machineWidth*1.5), this.y + 450, machineWidth * 0.9, machineWidth * 0.9 * 2.54, key)
				} else {
					this.addMachine(this.x + machineWidth * i2, this.y + 450, machineWidth, machineWidth*1.2, key)
				}
				i2++
			}
		harvester.tippers = game.machines.filter(m => m.type ==='tipper')

		// create field
		for (let i = 0; i < fieldsPosition.length; i++) {
			const field = fieldsPosition[i];
			this.addField(field.x, field.y, field.partsX, field.partsY, this.machines)
		}

		// create stations 
		let i3 = 0
		let stationWidth = 60
		for (const stationKey in STATION_TYPE) {
			let y = game.fields[0].units.findLast(t => t).y + game.fields[0].units.findLast(t => t).height
			if (stationKey === STATION_TYPE.unloading) {
				let j = 1
				for (const seedKey in SEED_TYPE) {
					const station = this.addStation(this.x + innerWidth-(stationWidth*2)*j, this.y + y + (stationWidth*2)*i3, 
					stationWidth, stationWidth, 0, 'rgb(100, 100, 100)', stationKey)
					station.seedType = seedKey
					j++
				}
			} else {
				this.addStation(this.x + innerWidth-stationWidth, this.y + y + (stationWidth*2)*i3, 
				stationWidth, stationWidth, 0, 'rgb(100, 100, 100)', stationKey)
			}
			i3++
		}

		//create sellers
		this.addSellers(this.x, this.y + 450 + transportWidth*1.5, stationWidth, stationWidth)
		// create minimap
		this.minimap = new Minimap(10, innerHeight-10, 36, 'black', this)
		window.vertex = []
	}

	update() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		setWindowVectors(window)
		window.dir = getDirection(window.vertex)

		this.activeTransport = this.transports.find(t => !t.disableMove)

		this.activeMachine = this.activeTransport.connectedMachine
		
		this.fields.forEach(f => f.draw())
		this.machines.forEach(m => {
			if (!this.activeMachine || this.activeMachine.type !== m.type) {
				m.draw()
			}
		})
		this.transports.forEach(t => {if (t.disableMove) t.draw()})
		this.stations.forEach(s => s.draw())
		this.sellers.forEach(s => s.draw())
		
		this.activeMachine && this.activeMachine.draw()
		this.activeTransport.draw()
		this.minimap.draw()
		this.showInfo()
		this.globalCollide()
	}

	showInfo() {
		$info.innerHTML = `
			<span>${Math.abs(this.activeTransport.speed.toFixed(1))} km/h</span>
		`
		const moneyPlaceholderValue = '0'.repeat(9-this.money.toString().length)
		const fuelPlaceholderValue = '0'.repeat(3-this.activeTransport.fuel.toFixed().toString().length)
		$moneyValue.innerHTML = `<span class="placeholder">${moneyPlaceholderValue}</span>${this.money}`
		$fuelValue.innerHTML = `<span class="placeholder">${fuelPlaceholderValue}</span>${this.activeTransport.fuel.toFixed()}`

		if (this.activeMachine && this.activeMachine.active !== null)  {
			$info.innerHTML += `<br><span>Active: ${this.activeMachine.active}</span>`
		}

		let procents, current, seed
		if (this.activeMachine && this.activeMachine.hasOwnProperty('capacity')) {
			current = this.activeMachine
		} else if (this.activeTransport.hasOwnProperty('capacity')) {
			current = this.activeTransport
		}
		let sibling = $capacityValue.previousSibling
		if (current && current.capacity > 0) {
			procents = (100 * current.capacity) / current.maxCapacity
			let capacityPlaceholderValue = '0'.repeat(3-procents.toFixed().toString().length)
			if (current.hasOwnProperty('seedType') && current.seedType) {
				seed = capitalize(current.seedType)
				sibling.innerHTML = `<img src="images/${seed}.png" alt="${seed}" >`
			} else {
				sibling.innerHTML = `Capacity`
			}
			$capacityValue.innerHTML = `<span class="placeholder">${capacityPlaceholderValue}</span>${procents.toFixed()}%`
		} else {
			sibling.innerHTML = ''
			$capacityValue.innerHTML = ''
		}
		$info.style.top = scrollY + 60+'px'
		$info.style.left = scrollX + (innerWidth*0.8)+'px'

		$settings.style.top = scrollY +60+'px'
		$settings.style.left = scrollX +10+'px'
	}

	setPhysicsForTransport(physics, type = 'tractor') {
		this.transports.forEach(t => {
			if (t.type !== type)  return
			if (physics.velocity!== undefined) {
				t.velocity = physics.velocity
			}
			if (physics.maxSpeed !== undefined) {
				if (t.maxSpeed === t.currentMaxSpeed) {
					t.currentMaxSpeed = physics.maxSpeed
				} else {
					t.currentMaxSpeed = physics.maxSpeed / 2
				}
				t.maxSpeed = physics.maxSpeed
				t.maxSpeedBack = t.maxSpeed * t.maxSpeedBackKoef
			}
			if (physics.maxSpeedReserve !== undefined) {
				t.maxSpeedReserve = physics.maxSpeedReserve
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