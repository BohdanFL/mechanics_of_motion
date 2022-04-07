const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const info = document.getElementById("info")




canvas.height = innerHeight
canvas.width = innerWidth

const width = 50
const height = 100

// let angleStep = 2
let angle = 0
let radian = angle * (Math.PI / 180)
let speed = 1
let turnSpeed = 1
let distance = 0

// const velocity = 2
const startX = width * 2
const startY = height

let x = 300
let y = 0

const keys = {
	68: false, // right
	65: false, // left
	39: false, // right
	37: false, // left
	87: false, // top
	38: false, // top
	83: false, // bottom
	40: false // bottom
};

const startMove = (e) => {
	e.preventDefault();
	if (keys.hasOwnProperty(e.keyCode)) {
		keys[e.keyCode] = true;
	}
}

const stopMove = (e) => {
	e.preventDefault();
	if (keys.hasOwnProperty(e.keyCode)) {
		keys[e.keyCode] = false;
	}
}

const rotate = (angleStep) => {
	// left
	if (keys["65"] || keys["37"]) {
		if (keys["83"] || keys["40"]) {
			if (angle >= 360) angle = 0
			angle += angleStep
		} else {
			if (angle <= 0) angle = 360
			angle -= angleStep
		}
	}
	// right

	if (keys["68"] || keys["39"]) {
		if (keys["83"] || keys["40"]) {
			if (angle <= 0) angle = 360
			angle -= angleStep
		} else {
			if (angle >= 360) angle = 0
			angle += angleStep
		}
	}

	radian = angle * (Math.PI / 180)
}

const move = () => {
	// top
	speed = 0
	if (keys["87"] || keys["38"]) {
		// if (-maxSpeed <= speed) {
		// 	let stopVelocity = speed > 0 ? 2 : 1;
		// 	speed -= velocity * stopVelocity;
		// }
		speed = 1

		rotate(turnSpeed);

	}

	// bottom
	if (keys["83"] || keys["40"]) {
		// if (maxSpeed / 1.5 >= speed) {
		// 	let stopVelocity = speed < 0 ? 2 : 1;
		// 	speed += velocity * stopVelocity;
		// }
		speed = -1
		rotate(turnSpeed);

	}

	// if (!(keys["83"] || keys["40"] || keys["87"] || keys["38"])) {
	// 	if (speed < 0) {
	// 		speed += velocity;
	// 		if (speed >= -velocity) speed = 0;
	// 	} else if (speed > 0) {
	// 		speed -= velocity;
	// 		if (speed <= velocity) speed = 0;
	// 	}
	// }
	// infoSpeed.textContent = Math.abs(speed.toFixed(1));
	// ctx.translate(0, speed);
}

const drawRect = (radian = 0, color = "blue") => {
	ctx.save();
	ctx.strokeStyle = color;
	ctx.lineWidth = 2;
	ctx.beginPath();
	const cos = Math.cos(radian)
	const sin = Math.sin(radian)

	const a = (width / 2) * cos
	const b = (width / 2) * sin
	const c = height * cos
	const d = height * sin

	const x1 = ((x + ((width / 2) - a)) + speed * sin);
	const y1 = ((y + (height - b)) - speed * cos);

	const x2 = ((x + ((width / 2) + a)) + speed * sin);
	const y2 = ((y + (height + b)) - speed * cos)

	const x3 = x2 + d
	const y3 = y2 - c

	const x4 = x1 + d
	const y4 = y1 - c
	x += speed * sin
	y -= speed * cos
	// clockwise
	// left-top
	ctx.moveTo(x4, y4);
	// ctx.moveTo(x1, y1);
	// right-top
	ctx.lineTo(x3, y3);
	// ctx.lineTo(x2, y2);
	// right-bottom
	ctx.lineTo(x2, y2);
	// left bottom
	ctx.lineTo(x1, y1);

	ctx.lineTo(x4, y4);
	ctx.stroke();
	ctx.restore()

	ctx.beginPath()
	ctx.arc(x + (width / 2) + distance * sin, y + (height) - distance * cos, width / 10, 0, Math.PI * 2)
	ctx.fill()

	// ctx.restore();

	info.innerHTML = `
	<p>
		Point 1: (${x1.toFixed(1)}, ${y1.toFixed(1)})
	</p>
	<p>
		Point 2: (${x2.toFixed(1)}, ${y2.toFixed(1)})
	</p>
	<p>Angle: ${angle} deg</p>
	<p>Distance: ${distance}</p>
	`
}



const update = () => {
	ctx.save()
	ctx.clearRect(0, 0, canvas.width, canvas.height)


	ctx.translate(startX, startY)

	drawRect(radian, "rgba(255, 255, 20, 1)")
	move()

	ctx.restore()

	requestAnimationFrame(update)
}

addEventListener("keydown", startMove)
addEventListener("keyup", stopMove)
requestAnimationFrame(update)