// const field = new Field(0, 0, 64, 16, machines);
// const fields = [field]

const game = new Game()
game.start()


const update = () => {
	ctx.save()

	game.update()

	ctx.restore()
	requestAnimationFrame(update)
}
requestAnimationFrame(update)


addEventListener("resize", () => {
	canvas.height = innerHeight
	canvas.width = innerWidth
})




/** Main
 *  Cars
 * 	Tractors
 * 	Harvesters
 * 	Tippers 
 * 	Tools for harvesters
 *  Add capacity for harvesters, fertilizer, sowing machine
 * 	Add fuel
 */

/** Bugs
 *  Взяття двох machines одночасно
 *  Відєднується machine, коли переключаєшся на інший transport
 */


/** Additional
 *  Зробити безкінечне поле для їзди
 *  Намалювати нормальну машину(з колесами, з передом і задом)
 *  Обмеження по переміщенню
 *  Ranging for maxSpeed, velocity, turnSpeed, stopVelocity and etc.
 */

// //  Switch between machines - done
// // Переписати все на вектори - done
// // Рефакторінг коду(переписати в клас) - done
// // створити загальний клас фігури(box, square) - done