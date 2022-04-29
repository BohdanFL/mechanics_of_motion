class Minimap {
	constructor(x, y, koefSmall, color = 'black', game) {
		this.width = canvas.width/koefSmall
		this.height = canvas.height/koefSmall
		this.koef = (canvas.width/this.width + canvas.height/this.height)/2
		this.x = x
		this.y = y-this.height
		this.color = color
		// this.game = game
		this.boxes = [...game.fields, ...game.transports, ...game.machines, ...game.stations, ...game.sellers]
	}

	drawBoxes() {
		this.boxes.forEach(b => {
			if (!b.hasOwnProperty('disableMove') || (b.hasOwnProperty('disableMove') && b.disableMove)) {
				let miniB = new Box(this.x+scrollX+ b.x/this.koef, 
									this.y+scrollY+ b.y/this.koef, 
									b.width/this.koef, 
									b.height/this.koef, 
									b.angle, 
									b.color)
									miniB.draw()
			}
		})
	}

	draw() {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x+scrollX, this.y+scrollY, canvas.width/this.koef, canvas.height/this.koef)
		this.drawShowedWindow()
		this.drawBoxes()
		this.drawActive()
	}

	drawActive() {
		if (!game.activeTransport) return
		this.player = new Box(this.x+scrollX+ game.activeTransport.x/this.koef, 
								this.y+scrollY+ game.activeTransport.y/this.koef, 
								game.activeTransport.width/this.koef, 
								game.activeTransport.height/this.koef, 
								game.activeTransport.angle, 
								game.activeTransport.color)
		if (game.activeTransport.type === 'harvester') {
			this.player.setVectors = () => setVectorsBindedBottom.call(this.player)
		}
		this.player.draw()
	}

	drawShowedWindow() {
		ctx.fillStyle = 'rgba(70, 70, 70)'
		ctx.fillRect((this.x+scrollX+ scrollX/this.koef),
					(this.y+scrollY+ scrollY/this.koef), 
					(innerWidth/this.koef), 
					(innerHeight/this.koef))
	}
}