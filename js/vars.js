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


const buttons = document.getElementById('buttons')
const upBtn = document.getElementById("up");
const downBtn = document.getElementById("down");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");


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
}

const SEED_TYPE = {
	wheat: 'wheat',
	canola: 'canola',
	corn: 'corn',
	sunflower: 'sunflower',
	potato: 'potato',
	sugarbeet: 'sugarbeet'
}

const STATION_TYPE = {
	fuel: 'fuel',
	seed: 'seed',
	fertilizer: 'fertilizer',
}

const fieldsPosition = [
	{x: 20*30, y: 20*6, partsX: 32, partsY: 12},
	{x: 20*30, y: 20*6 + 100 + 20*16, partsX: 28, partsY: 20},
	{x: 20*30, y: 20*6 + 100 + 20*16 + 60 + 20*20, partsX: 24, partsY: 24},
	{x: 20*30, y: 20*6 + 100 + 20*16 + 60 + 20*20 + 40 + 20*24, partsX: 12, partsY: 24},
]
// fieldsPosition.push({{x: fieldsPosition.x, y: 20*6 + 100 + 20*16, partsX: 32, partsY: 16}})
// 16-24; 24-16; 
canvas.height = 4000
canvas.width = 6000
