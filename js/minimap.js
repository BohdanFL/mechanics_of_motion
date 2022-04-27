class Minimap {
	constructor(x, y, koefSmall, color = 'black') {
		this.width = canvas.width/koefSmall
		this.height = canvas.height/koefSmall
		this.koef = (canvas.width/this.width + canvas.height/this.height)/2
		this.x = x
		this.y = y-this.height
		this.color = color
	}

	draw() {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x+scrollX, this.y+scrollY, canvas.width/this.koef, canvas.height/this.koef)
		this.drawShowedWindow()
		this.drawActive()
	}

	drawActive() {
		if (!game.activeTransport) return
		const player = new Box(this.x+scrollX+ game.activeTransport.x/this.koef, 
								this.y+scrollY+ game.activeTransport.y/this.koef, 
								game.activeTransport.width/this.koef, 
								game.activeTransport.height/this.koef, 
								game.activeTransport.angle, 
								game.activeTransport.color)
		player.angle = game.activeTransport.angle
		player.draw()
	}

	drawShowedWindow() {
		ctx.fillStyle = 'rgba(70, 70, 70)'
		ctx.fillRect(this.x+scrollX+ scrollX/this.koef, this.y+scrollY+ scrollY/this.koef, innerWidth/this.koef, innerHeight/this.koef)
	}
}