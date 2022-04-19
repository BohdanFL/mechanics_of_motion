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
	}

	on() {
		addEventListener("keydown", this.switchCallback)
	}
	off() {
		removeEventListener("keydown", this.switchCallback)
	}
}