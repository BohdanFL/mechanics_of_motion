'use strict'

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const $info = document.getElementById("info")
const rangeMaxSpeed = document.getElementById("max-speed")
const rangeVelocity = document.getElementById("velocity")
const rangeTurnStep = document.getElementById("turn-step")
const rangeFriction = document.getElementById("friction")
const rangeBraking = document.getElementById("braking")
const rangeMaxSpeedBackKoef = document.getElementById("max-speed-back-koef")
const $settings = document.querySelector(".settings")

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
	cultivator: 'cultivator',
	fertilizer: 'fertilizer',
	header: 'header',
	tipper: 'tipper',
}

const TRANSPORT_TYPE = {
	car: 'car',
	harvester: 'harvester',
	tractor: 'tractor',
	// header: 'header',
}

canvas.height = innerHeight
canvas.width = innerWidth
