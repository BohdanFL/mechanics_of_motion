const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const direction = document.getElementById("direction")



canvas.height = innerHeight
canvas.width = innerWidth


let LEFT, UP, RIGHT, DOWN;
let friction = 0.05;

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(v) {
		return new Vector(this.x + v.x, this.y + v.y);
	}

	subtr(v) {
		return new Vector(this.x - v.x, this.y - v.y);
	}


	mag() {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}

	// множимо весь вектор на n
	mult(n) {
		return new Vector(this.x * n, this.y * n);
	}

	normal() {
		return new Vector(-this.y, this.x).unit();
	}

	unit() {
		if (this.mag() === 0) {
			return new Vector(0, 0);
		} else {
			return new Vector(this.x / this.mag(), this.y / this.mag());
		}
	}

	static dot(v1, v2) {
		return v1.x * v2.x + v1.y * v2.y;
	}

}

class Matrix {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		this.data = [];

		for (let i = 0; i < this.rows; i++) {
			this.data[i] = [];
			for (let j = 0; j < this.cols; j++) {
				this.data[i][j] = 0;
			}
		}
	}

	multiplyVec(vec) {
		let result = new Vector(0, 0);
		result.x = this.data[0][0] * vec.x + this.data[0][1] * vec.y;
		result.y = this.data[1][0] * vec.x + this.data[1][1] * vec.y;
		return result;
	}
}

//creating a new class
class Box {
	constructor(x1, y1, x2, y2, width) {
		this.vertex = [];
		this.vertex[0] = new Vector(x1, y1);
		this.vertex[1] = new Vector(x2, y2);
		this.width = width;

		/* getting direction */
		this.edge = this.vertex[1].subtr(this.vertex[0]);
		this.length = this.edge.mag();
		this.dir = this.edge.unit();
		this.refDir = this.edge.unit();

		this.vertex[2] = this.vertex[1].add(this.dir.normal().mult(this.width));
		this.vertex[3] = this.vertex[2].add(this.dir.mult(-this.length));

		// console.log(this.vertex)
		// console.log(this.vertex[1], this.vertex[0])
		// console.log(this.edge)
		// console.log(this.length)
		// console.log(this.dir)
		// console.log(this.dir.normal())
		// console.log("<><><><><><>")

		this.pos = this.vertex[0].add(this.dir.mult(this.length / 2)).add(this.dir.normal().mult(this.width / 2));

		this.vel = new Vector(0, 0);
		this.acc = new Vector(0, 0);
		this.acceleration = 0.3;
		this.angVel = 0;
		this.angle = 0;
	}

	draw() {
		ctx.strokeStyle = 'yellow'
		ctx.beginPath();
		ctx.moveTo(this.vertex[0].x, this.vertex[0].y);
		ctx.lineTo(this.vertex[1].x, this.vertex[1].y);
		ctx.stroke();

		ctx.strokeStyle = 'black'
		ctx.beginPath()
		ctx.moveTo(this.vertex[1].x, this.vertex[1].y)
		ctx.lineTo(this.vertex[2].x, this.vertex[2].y);
		ctx.lineTo(this.vertex[3].x, this.vertex[3].y);
		ctx.lineTo(this.vertex[0].x, this.vertex[0].y);
		ctx.stroke();
	}

	keyControl() {
		if (UP) {
			this.acc = this.dir.mult(-this.acceleration);;
		}
		if (DOWN) {
			this.acc = this.dir.mult(this.acceleration);;
		}
		if (LEFT) {
			this.angVel = -0.04;
		}
		if (RIGHT) {
			this.angVel = 0.04;
		}
		if (!UP && !DOWN) {
			this.acc = new Vector(0, 0);
		}
	}

	reposition() {
		this.acc = this.acc.unit().mult(this.acceleration);
		this.vel = this.vel.add(this.acc);
		this.vel = this.vel.mult(0.8);
		this.pos = this.pos.add(this.vel);
		this.angle += this.angVel;
		this.angVel *= 0.001;
		let rotMat = rotMx(this.angle);
		this.dir = rotMat.multiplyVec(this.refDir);

		this.vertex[0] = this.pos.add(this.dir.mult(-this.length / 2))
			.add(this.dir.normal().mult(this.width / 2));
		this.vertex[1] = this.pos.add(this.dir.mult(-this.length / 2))




			.add(this.dir.normal().mult(-this.width / 2));
		this.vertex[2] = this.pos.add(this.dir.mult(this.length / 2))
			.add(this.dir.normal().mult(-this.width / 2));
		this.vertex[3] = this.pos.add(this.dir.mult(this.length / 2))
			.add(this.dir.normal().mult(this.width / 2));
	}
}

function userInput() {
	window.addEventListener('keydown', function (e) {
		if (e.keyCode === 37) {
			LEFT = true;
		}
		if (e.keyCode === 38) {
			UP = true;
		}
		if (e.keyCode === 39) {
			RIGHT = true;
		}
		if (e.keyCode === 40) {
			DOWN = true;
		}
	});

	window.addEventListener('keyup', function (e) {
		if (e.keyCode === 37) {
			LEFT = false;
		}
		if (e.keyCode === 38) {
			UP = false;
		}
		if (e.keyCode === 39) {
			RIGHT = false;
		}
		if (e.keyCode === 40) {
			DOWN = false;
		}
	});
}

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
	console.clear()
	direction.innerHTML = `(${o1.dir.normal().x.toFixed(2)}, ${o1.dir.normal().y.toFixed(2)})
	(${o2.dir.normal().x.toFixed(2)}, ${o2.dir.normal().y.toFixed(2)})`


	for (let i = 0; i < axes1.length; i++) {
		proj1 = projShapeOntoAxis(axes1[i], o1);
		proj2 = projShapeOntoAxis(axes1[i], o2);
		console.log(proj1, proj2)
		$proj1.innerHTML = `(${proj1.min.toFixed()}, ${proj1.max.toFixed()}), (${proj2.min.toFixed()}, ${proj2.max.toFixed()})`

		let overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
		overlap1.innerHTML = overlap.toFixed()


		if (overlap < 0) {
			return false;
		}
	};

	for (let i = 0; i < axes2.length; i++) {
		proj1 = projShapeOntoAxis(axes2[i], o1);
		proj2 = projShapeOntoAxis(axes2[i], o2);
		overlap = Math.min(proj1.max, proj2.max) - Math.max(proj1.min, proj2.min);
		// overlap2.innerHTML = overlap.toFixed()

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

function mainLoop(timestamp) {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	userInput();

	//two box objects to test the collision detection using sat
	testBox.draw();
	testBox.keyControl();
	testBox.reposition();
	Box2.draw();

	if (sat(testBox, Box2)) {
		ctx.fillText("COLLISION", 500, 400);
	}

	requestAnimationFrame(mainLoop);
}

let testBox = new Box(200, 50, 200, 150, 50);
let Box2 = new Box(200, 200, 300, 200, 100);

requestAnimationFrame(mainLoop);