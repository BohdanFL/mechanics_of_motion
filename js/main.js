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


setTimeout(() => {
	alert("The keys Z and C switch between transports")
}, 300);

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
 *  Коли fuel закінчився поворот при up або down не відбувається
 */


/** Additional
 *  Зробити безкінечне поле для їзди
 *  Намалювати нормальну машину(з колесами, з передом і задом)
 *  Обмеження по переміщенню
 *  Ranging for maxSpeed, velocity, turnSpeed, stopVelocity and etc.
 */

// // *  Відєднується machine, коли переключаєшся на інший transport - done
// //  Switch between machines - done
// // Переписати все на вектори - done
// // Рефакторінг коду(переписати в клас) - done
// // створити загальний клас фігури(box, square) - done