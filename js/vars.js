const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const info = document.getElementById("info")
const keys = {
	KeyW: false,
	KeyA: false,
	KeyS: false,
	KeyD: false,
	ArrowUp: false,
	ArrowLeft: false,
	ArrowDown: false,
	ArrowRight: false,
}

const MACHINE_TYPE = {
	sowing: 'sowing',
	harvester: 'harvester',
	cultivator: 'cultivator',
	fertilizer: 'fertilizer'
}
canvas.height = innerHeight
canvas.width = innerWidth