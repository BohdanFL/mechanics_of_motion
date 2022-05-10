function rotMx(angle) {
	let mx = new Matrix(2, 2);
	mx.data[0][0] = Math.cos(angle);
	mx.data[0][1] = -Math.sin(angle);
	mx.data[1][0] = Math.sin(angle);
	mx.data[1][1] = Math.cos(angle);
	return mx;
}
//applying the separating axis theorem on two objects
function sat(o1, o2) {
	axes1 = [];
	axes2 = [];
	axes1.push(o1.dir.normal());
	axes1.push(o1.dir);
	axes2.push(o2.dir.normal());
	axes2.push(o2.dir);
	let proj1, proj2 = 0;

	for (let i = 0; i < axes1.length; i++) {
		proj1 = projShapeOntoAxis(axes1[i], o1);
		proj2 = projShapeOntoAxis(axes1[i], o2);
		let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
		if (overlap < 0) {
			return false;
		}
	};

	for (let i = 0; i < axes2.length; i++) {
		proj1 = projShapeOntoAxis(axes2[i], o1);
		proj2 = projShapeOntoAxis(axes2[i], o2);
		overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
		if (overlap < 0) {
			return false;
		}
	};

	return true;
}
//returns the min and max projection values of a shape onto an axis
function projShapeOntoAxis(axis, obj) {
	let min = Vector.dot(axis, obj.vertex[0]);
	let max = min;
	for (let i = 0; i < obj.vertex.length; i++) {
		let p = Vector.dot(axis, obj.vertex[i]);
		if (p < min) {
			min = p;
		}
		if (p > max) {
			max = p;
		}
	}
	return {
		min: min,
		max: max
	}
}

function setSquareVectors(square) {
	square.vertex[0] = new Vector(square.x, square.y + square.height)
	square.vertex[1] = new Vector(square.x + square.width, square.y + square.height)
	square.vertex[2] = new Vector(square.x + square.width, square.y)
	square.vertex[3] = new Vector(square.x, square.y)
}

function setWindowVectors(window) {
	window.vertex[0] = new Vector(window.scrollX, window.scrollY + window.innerHeight)
	window.vertex[1] = new Vector(window.scrollX + window.innerWidth, window.scrollY + window.innerHeight)
	window.vertex[2] = new Vector(window.scrollX + window.innerWidth, window.scrollY)
	window.vertex[3] = new Vector(window.scrollX, window.scrollY)
}

function setVectorsBindedBottom() {
	this.vertex[0] = new Vector(
		(this.x + (this.width / 2 - this.a)),
		(this.y - this.b)
	)
	this.vertex[1] = new Vector(
		(this.x + (this.width / 2 + this.a)),
		(this.y + this.b)
	)
	this.vertex[2] = new Vector(
		this.vertex[1].x - this.d,
		this.vertex[1].y + this.c
	)
	this.vertex[3] = new Vector(
		this.vertex[0].x - this.d,
		this.vertex[0].y + this.c
	)
}

function getDirection(vertex) {
	const edge = vertex[1].subtr(vertex[0]);
	const dir = edge.unit();
	return dir
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function startMove(e) {
	e.preventDefault();
	if (keys.hasOwnProperty(e.code)) {
		keys[e.code] = true;
	}
}

function stopMove(e) {
	e.preventDefault();
	if (keys.hasOwnProperty(e.code)) {
		keys[e.code] = false;
	}
}

function toggleShowButton(e) {
	buttons.classList.toggle('hide')
}

function initMoveBtn(btn, keyCode) {
	btn.addEventListener("touchstart", (e) => (keys[keyCode] = true), {passive: true});
	btn.addEventListener("touchend", (e) => (keys[keyCode] = false), {passive: true});
}

function updateSeedCapacity(type) {
	let seedCapacity = game.storage[type].toString()
	let koef = Math.floor(seedCapacity.length / 3)
	for (let i = 1; i < koef+1; i++) {
		seedCapacity = seedCapacity.split('')
		let length = seedCapacity.length - 1
		seedCapacity.splice(length-2*i, 0, "'")
		seedCapacity = seedCapacity.join('')
	}
	document.getElementById(type + '-capacity').textContent = seedCapacity
}

function fullSeedStats() {
	let list = document.querySelector('.seeds__list')
	list.innerHTML = ''
	for (const key in SEED_TYPE) {
		const seed = SEED_TYPE[key];
		list.innerHTML += `
		<li class="seeds__item">
			<span class="seeds__item-name">
				<img src="images/${seed}.png" alt="${seed}">
				${capitalize(seed)}
			</span>
			<span class="seeds__item-capacity" id="${seed}-capacity"></span>
		</li>
		`
		updateSeedCapacity(seed)
	}
}