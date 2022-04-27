class Minimap {
	constructor(x, y, width, height, color = 'black') {
		this.x = x
		this.y = y-height
		this.width = width
		this.height = height
		this.color = color
	}

	draw() {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x+scrollX, this.y+scrollY, this.width, this.height)
		this.drawActive()
	}

	drawActive() {
		const koef = (canvas.width/this.width + canvas.height/this.width)/2
		if (!game.activeTransport) return
		const player = new Box(this.x+scrollX+ + game.activeTransport.x/koef, 
								this.y+scrollY+ + game.activeTransport.y/koef, 
								game.activeTransport.width/koef, 
								game.activeTransport.height/koef, 
								game.activeTransport.angle, 
								game.activeTransport.color)
		player.angle = game.activeTransport.angle
		player.draw()
	}
}