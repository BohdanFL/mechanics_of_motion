class Station extends Box{
	constructor(x, y, width, height, angle, color = 'rgb(200, 200, 200)') {
		super(x, y, width, height, angle, color)
		this.type = null
	}

	draw() {
		super.draw()
		this.drawText()
		this.update()
	}

	drawText() {
		ctx.font = '0.8rem monospace'
		ctx.fillStyle = 'rgb(255, 255, 255)'
		ctx.fillText(this.type, this.x, this.y+25, this.width)
	}
	update() {}
}