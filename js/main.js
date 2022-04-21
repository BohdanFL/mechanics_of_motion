const game = new Game()
game.start()


const update = () => {
	ctx.save()

	game.update()

	ctx.restore()
	requestAnimationFrame(update)
}
requestAnimationFrame(update)

rangeMaxSpeed.addEventListener('input', e => {
	let physics = {
		maxSpeed: parseFloat(rangeMaxSpeed.value)
	}
	game.setPhysicsForTransport(physics)
	document.getElementById(rangeMaxSpeed.id + '-value').textContent = rangeMaxSpeed.value
})
rangeVelocity.addEventListener('input', e => {
	let physics = {
		velocity: parseFloat(rangeVelocity.value)
	}
	game.setPhysicsForTransport(physics)
	document.getElementById(rangeVelocity.id + '-value').textContent = rangeVelocity.value
})
rangeTurnStep.addEventListener('input', e => {
	let physics = {
		turnStep: parseFloat(rangeTurnStep.value)
	}
	game.setPhysicsForTransport(physics)
	document.getElementById(rangeTurnStep.id + '-value').textContent = rangeTurnStep.value
})
rangeFriction.addEventListener('input', e => {
	let physics = {
		friction: parseFloat(rangeFriction.value)
	}
	game.setPhysicsForTransport(physics)
	document.getElementById(rangeFriction.id + '-value').textContent = rangeFriction.value
})
rangeBraking.addEventListener('input', e => {
	let physics = {
		braking: parseFloat(rangeBraking.value)
	}
	game.setPhysicsForTransport(physics)
	document.getElementById(rangeBraking.id + '-value').textContent = rangeBraking.value
})
rangeMaxSpeedBackKoef.addEventListener('input', e => {
	let physics = {
		maxSpeedBackKoef: parseFloat(rangeMaxSpeedBackKoef.value)
	}
	game.setPhysicsForTransport(physics)
	document.getElementById(rangeMaxSpeedBackKoef.id + '-value').textContent = rangeMaxSpeedBackKoef.value
})

addEventListener("resize", () => {
	canvas.height = innerHeight
	canvas.width = innerWidth
	game.fields[0].resize()
})



// setTimeout(() => {
// 	alert("The keys Z and C switch between transports")
// }, 300);

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