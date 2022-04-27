class Station extends Box{
	constructor(x, y, width, height, angle, color = 'rgb(200, 200, 200)') {
		super(x, y, width, height, angle, color)
		this.type = null
		this.price = 0
	}

	draw() {
		super.draw()
		this.drawText(this.x, this.y+25, this.type)
	}

	drawText(x, y, text) {
		ctx.font = '0.8rem monospace'
		ctx.fillStyle = 'rgb(255, 255, 255)'
		ctx.fillText(text, x, y, this.width)
	}
}