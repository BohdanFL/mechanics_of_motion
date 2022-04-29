const game = new Game()

console.time('start game')
game.start()
console.timeEnd('start game')


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

initMoveBtn(upBtn, 'KeyW');
initMoveBtn(downBtn, "KeyS");
initMoveBtn(leftBtn, "KeyA");
initMoveBtn(rightBtn, "KeyD");

// image.onload = () => {
	// use the intrinsic size of image in CSS pixels for the canvas element
	// canvas.width = this.naturalWidth;
	// canvas.height = this.naturalHeight;
	
	// will draw the image as 300x227 ignoring the custom size of 60x45
	// given in the constructor
	// ctx.drawImage(this, 0, 0);
	
	// To use the custom size we'll have to specify the scale parameters
	// using the element's width and height properties - lets draw one
	// on top in the corner:
	// console.log(image, game.x, game.y, image.naturalWidth, image.naturalHeight)
// }

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
 *  Map - done
 * 	Different seeds (changing seeds)
 *  Toggle activation machines
 *  Global collision
 *  Withered field
 *  Shops
 *  Changing price seeds system
 *  Zoom
 *  Full map
 *  Field status on map, mark transports, machines and tippers
 *  Page for map
 *  Collide between machines and transports
 *  Tractors, tippers, machines with other characteristics
 *  Calculate power of tractors, mass of tractos and attached machines
// // *  Controls panel(same as fs)
 *  Microcontrol steering wheel turn
 *  Create collide manager
 *  Control buttons for mobile
 */

/** 
 *  Change binded side for harvester - done
 *  Try optimize using SVG
 */

/** Bugs 
 *  Коли fuel закінчився поворот при up або down не відбувається
 *  When fuel ended
 */


/** Additional
 *  Draw transport
 *  Settings physics for transports - done
 *  Texture for map, tractors, field and etc.
 *  Added icons
 *  Collide with some square
 */

// // * 	Add fuel - done
// // *  Відєднується machine, коли переключаєшся на інший transport - done
// //  Switch between machines - done
// // Переписати все на вектори - done
// // Рефакторінг коду(переписати в клас) - done
// // створити загальний клас фігури(box, square) - done