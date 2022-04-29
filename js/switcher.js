class Switcher {
	constructor(transports) {
		this.activeIndex = 0
		this.transports = transports
		this.switchCallback = this.switch.bind(this)
		this.transports[this.activeIndex].onListeners()
	}

	switch (e) {
		e.preventDefault()
		if (e.code === 'KeyC') {
			this.activeIndex++
			if (this.activeIndex > this.transports.length - 1) {
				this.activeIndex = 0
				this.transports[this.transports.length - 1].offListeners()
			} else {
				this.transports[this.activeIndex - 1].offListeners()
			}
			this.transports[this.activeIndex].onListeners()
		}

		if (e.code === 'KeyZ') {
			this.activeIndex--
			if (this.activeIndex < 0) {
				this.activeIndex = this.transports.length - 1
				this.transports[0].offListeners()
			} else {
				this.transports[this.activeIndex + 1].offListeners()
			}
			this.transports[this.activeIndex].onListeners()
		}

		let yMax = Math.max(...this.transports[this.activeIndex].vertex.map(v => v.y))
		let yMin = Math.min(...this.transports[this.activeIndex].vertex.map(v => v.y))
		let xMax = Math.max(...this.transports[this.activeIndex].vertex.map(v => v.x))
		let xMin = Math.min(...this.transports[this.activeIndex].vertex.map(v => v.x))
		let centerY = (yMax+yMin)/2
		let centerX = (xMax+xMin)/2

		window.scrollTo({
			left: centerX - innerWidth/2,
			top: centerY - innerHeight/2
		})
	}

	on() {
		addEventListener("keydown", this.switchCallback)
	}
	off() {
		removeEventListener("keydown", this.switchCallback)
	}
}