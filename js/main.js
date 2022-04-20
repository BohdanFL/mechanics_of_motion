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
	game.fields[0].resize()
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
93 + 245 + 359 + 13 + 92 + 174 + 83 + 52 + 149 + 26 + 65 + 75 + (252 - 88)
// //  Switch between machines - done
// // Переписати все на вектори - done
// // Рефакторінг коду(переписати в клас) - done
// // створити загальний клас фігури(box, square) - done