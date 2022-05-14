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
const $topbar = document.querySelector(".topbar")
const $container = document.querySelector(".container")
const $menu = document.querySelector(".menu")
const $shop = document.querySelector(".shop")
const $map = document.querySelector(".map")
const $stats = document.querySelector(".stats")
// const $prices = document.querySelector(".prices")


const toggleControls = document.getElementById('toggle-controls')

const buttons = document.getElementById('buttons')
const upBtn = document.getElementById("up");
const downBtn = document.getElementById("down");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

const $fuelValue = document.getElementById("fuel-value");
const $capacityValue = document.getElementById("capacity-value");
const $moneyValue = document.getElementById("money-value");

const mapBtn = document.getElementById('map-open')
const shopBtn = document.getElementById('shop-open')
const menuBtn = document.getElementById('menu-open')

const menuPricesBtn = document.getElementById('menu-prices-btn')
const menuStatisticsBtn = document.getElementById('menu-statistics-btn')
const menuSettingsBtn = document.getElementById('menu-settings-btn')
const menuCloseBtn = document.getElementById('menu-close-btn')

const closeBtn = document.getElementById('close-btn')


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

const seedKeys = Object.keys(SEED_TYPE)


const STATION_TYPE = {
	fuel: 'fuel',
	seed: 'seed',
	fertilizer: 'fertilizer',
	loading: 'loading',
	unloading: 'unloading',
}

const fieldsPosition = [
	{x: 3380, y: 30*6, partsX: 32, partsY: 12},
	{x: 3380, y: 30*6 + 100 + 30*16, partsX: 28, partsY: 20},
	{x: 3380, y: 30*6 + 100 + 30*16 + 60 + 30*20, partsX: 24, partsY: 24},
	{x: 3380, y: 30*6 + 100 + 30*16 + 60 + 30*20 + 40 + 30*24, partsX: 12, partsY: 24},
]

canvas.height = 8000
canvas.width = 8000