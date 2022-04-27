const game = new Game()
game.start()


const update = () => {
	ctx.save()

	game.update()

	ctx.restore()
	requestAnimationFrame(update)
	// setTimeout(update, 1000/60)
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

// addEventListener("resize", () => {
// 	canvas.height = innerHeight
// 	canvas.width = innerWidth
// 	game.fields[0].resize()
// })



// setTimeout(() => {
// 	alert("The keys Z and C switch between transports")
// }, 300);

/** Main
 *  Cars - done
 * 	Tractors - done
 * 	Harvesters - done
 * 	Tippers - done
 * 	Headrers - done
 *  Add capacity for harvesters, fertilizer, sowing machine - done
 *  Seller - done
 *  Chargers - done
 *  Map
 * 	Different seeds (changing seeds)
 *  Toggle activation machines
 *  Global collision
 *  Withered field
 *  Shops
 *  Collide between machines and transports
 *  Calculate power of tractors, mass of tractos and attached machines
// // *  Controls panel(same as fs)
 *  Microcontrol steering wheel turn
 *  Create collide manager
 */

/** 
 * Change binded side for harvester - done
 *  Try optimize using SVG
 */

/** Bugs 
 *  Коли fuel закінчився поворот при up або down не відбувається
 */


/** Additional
 *  Намалювати нормальну машину(з колесами, з передом і задом)
 *  Добавити картинки для машин, полів і т.д
 *  Обмеження по переміщенню
 *  Settings physics for transports - done
 */


// // * 	Add fuel - done
// // *  Відєднується machine, коли переключаєшся на інший transport - done
// //  Switch between machines - done
// // Переписати все на вектори - done
// // Рефакторінг коду(переписати в клас) - done
// // створити загальний клас фігури(box, square) - done