import {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty
} from './updateCustomProperty.js'

const playerElem = document.querySelector("[data-player]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const PLAYER_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let playerFrame
let currentTimeFrame
let yVelocity
export function setupPlayer() {
  isJumping = false
  playerFrame = 0
  currentTimeFrame = 0
  yVelocity = 0
  setCustomProperty(playerElem, "--bottom", 0)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updatePlayer(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getPlayerRect() {
  return playerElem.getBoundingClientRect()
}

export function setPlayerLose() {
  playerElem.src = `./imgs/playerJumps.png`
}

export function handleRun(delta, speedScale) {
  if(isJumping) {
    playerElem.src = `./imgs/playerJumps.png`
    return
  }

  if(currentTimeFrame >= FRAME_TIME) {
    playerFrame = (playerFrame + 1) % PLAYER_FRAME_COUNT
    playerElem.src = `./imgs/playerRuns${playerFrame}.png`
    currentTimeFrame -= FRAME_TIME
  }
  currentTimeFrame += delta * speedScale
}

export function handleJump(delta) {
  if(!isJumping) return
  incrementCustomProperty(playerElem, "--bottom", yVelocity * delta)
  if(getCustomProperty(playerElem, "--bottom") <= 0) {
    setCustomProperty(playerElem, "--bottom", 0)
    isJumping = false
  }
  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if(e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
