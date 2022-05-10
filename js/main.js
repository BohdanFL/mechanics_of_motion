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
		maxSpeed: parseFloat(rangeMaxSpeed.value),
		maxSpeedReserve: parseFloat(rangeMaxSpeed.value)
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
toggleControls.addEventListener('click', toggleShowButton)
menuBtn.addEventListener('click', () => {
	$container.classList.remove('hide')
	$menu.classList.remove('hide')
})
menuCloseBtn.addEventListener('click', () => {
	$container.classList.add('hide')
	$menu.classList.add('hide')
})
shopBtn.addEventListener('click', () => {
	$container.classList.remove('hide')
	$shop.classList.remove('hide')
})
mapBtn.addEventListener('click', () => {
	$container.classList.remove('hide')
	$map.classList.remove('hide')
})
closeBtn.addEventListener('click', () => {
	$container.classList.add('hide')
	$menu.classList.add('hide')
	$shop.classList.add('hide')
	$stats.classList.add('hide')
})

menuStatisticsBtn.addEventListener('click', () => {
	$container.classList.remove('hide')
	$stats.classList.remove('hide')
	$menu.classList.add('hide')
})
fullSeedStats()

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
 * 	Different seeds (changing seeds) - done
 *  Toggle activation machines - done
 *  Withered field - done
 *  Control buttons for mobile - done
 *  Global collision
 *  Shop
 *  Storage(loading, unloading)
 *  Changing price seeds system
 *  Zoom
 *  Full the map with content
 *  Topbar - done
 *  Page for map
 *  Field status on map, mark transports, machines and tippers
 *  Tractors, tippers, machines with other characteristics
 *  Calculate power of tractors, mass of tractos and attached machines - 50%
// // *  Controls panel(same as fs)
 *  Microcontrol steering wheel turn
 *  Create collide manager
 *  Dependence consumption fuel from speed or other factors
 *  Menu
 */

/** Additional
 *  Draw transport
 *  Settings physics for transports - done
 *  Texture for map, tractors, field and etc. - started
 *  Added icons - 50%
 *  Detect collide with some square
 *  Change binded side for harvester - done
 *  Try optimize using SVG (field)
 *  Коли fuel закінчився поворот при up або down не відбувається
 */

// // * 	Add fuel - done
// // *  Відєднується machine, коли переключаєшся на інший transport - done
// //  Switch between machines - done
// // Переписати все на вектори - done
// // Рефакторінг коду(переписати в клас) - done
// // створити загальний клас фігури(box, square) - done











/* 
Not every representational system is complex enough or has the need to develop a symbol for itself.
Even complex organisms such as insects can run on pure instincts, blindly crawling to the next bit of sustenance.
Even still, there is some fuzzy threshold at which point the self-symbol becomes inevitable.
*/