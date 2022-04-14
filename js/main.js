const player = new Player({
	x: 200,
	y: 300
})

const machine1 = new Machines(185, 500, 80, 40)
const machine2 = new Machines(350, 500, 30, 40)

const field = new Field(1000, 1000, {
	x: 0,
	y: 0
}, [machine1, machine2]);



const update = () => {
	ctx.save()
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	field.draw()
	player.draw()
	machine1.draw()
	machine2.draw()

	ctx.restore()
	// requestAnimationFrame(update)
}
requestAnimationFrame(update)

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