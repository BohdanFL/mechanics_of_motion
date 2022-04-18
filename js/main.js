const player = new Player({
	x: 250 + (80 / 2 - 25),
	y: 350
})

const sowing = new SowingMachines(250, 500, 80, 40)
const harvester = new Harvester(350, 500, 80, 40)
const cultivator = new Cultivator(450, 500, 80, 40)
const fertilizer = new Fertilizer(550, 500, 80, 40)

const field = new Field(64, 16, {
	x: 0,
	y: 0
}, [sowing, cultivator, fertilizer, harvester]);



const update = () => {
	ctx.save()
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	field.draw()
	player.draw()
	sowing.draw()
	cultivator.draw()
	fertilizer.draw()
	harvester.draw()

	ctx.restore()
	requestAnimationFrame(update)
	// setTimeout(update, 1000 / 60)
}
requestAnimationFrame(update)
setTimeout(() => {

	alert("Green - sowing machine \n Blue - cultivator \n Red - harvester \n Yellow - fertilizer(not work)")
}, 1000);

addEventListener("resize", () => {
	canvas.height = innerHeight
	canvas.width = innerWidth
})

// Рефакторінг коду(переписати в клас) - done
// Зробити безкінечне поле для їзди - in future
// Намалювати нормальну машину(з колесами, з передом і задом)
// Обмеження по переміщенню
// Переписати все на вектори
// створити загальний клас фігури(box, square)