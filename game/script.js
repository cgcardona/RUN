import { updateGround, setupGround } from "./ground.js"
import { updatePlayer, setupPlayer, getPlayerRect, setPlayerLose } from "./player.js"
import { updateObstacle, setupObstacle, getObstacleRects } from "./obstacle.js"
import { updateNFT, setupNFT, getNFTRects } from "./nft.js"

const GAME_WIDTH = 100
const GAME_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001

const gameElem = document.querySelector("[data-game]")
const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]") 
const gavaxTotalScoreElem = document.querySelector("[data-avax-total-score]")
const nftTotalScoreElem = document.querySelector("[data-nft-total-score]")
const nftScoreElem = document.querySelector("[data-nft-score]")

setPixelToGameScale()
window.addEventListener("resize", setPixelToGameScale)
document.addEventListener("keydown", handleStart, { once: true })

let lastTime
let speedScale
let score
let nftScore = 0

function update(time) {
  if(lastTime === null) {  
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }

  const delta = time - lastTime

  updateGround(delta, speedScale)
  updatePlayer(delta, speedScale)
  updateObstacle(delta, speedScale)
  updateNFT(delta, speedScale)
  updateSpeedScale(delta, speedScale)
  updateScore(delta, speedScale)
  checkIfWeGotNFT()
  // if there is a collision lose the game
  if(checkLose()) return handleLose()
  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const playerRect = getPlayerRect()
  return getObstacleRects().some(rect => isCollision(rect, playerRect))
}

function isCollision(rect1, rect2) {
  return(
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left && 
    rect1.bottom > rect2.top
  )
}

function checkIfWeGotNFT() {
  const playerRect = getPlayerRect()
  if(getNFTRects().some(rect => isCollision(rect, playerRect))) { 
    const nftToRemove = document.querySelectorAll("[data-nft]")[0]
    nftToRemove.remove()
    nftScore += 1
    nftScoreElem.textContent = `nft score: ${nftScore}`
  }
  return getNFTRects().some(rect => isCollision(rect, playerRect))
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = `GAVAX score: ${Math.floor(score)}`
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupPlayer()
  setupObstacle()
  setupNFT()
  startScreenElem.classList.add("hide")

  window.requestAnimationFrame(update)
}

window.totalNFTScore = 0
window.totalGAVAXScore = 0

function handleLose() {
  window.totalGAVAXScore += Math.floor(score)
  window.totalNFTScore += nftScore

  nftTotalScoreElem.textContent = `NFT total score: ${window.totalNFTScore}`
  gavaxTotalScoreElem.textContent = `GAVAX total score: ${window.totalGAVAXScore}`

  nftScore = 0
  nftScoreElem.textContent = `NFT score: ${nftScore}`
  setPlayerLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true })
    startScreenElem.classList.remove("hide")
  }, 100);
}

function setPixelToGameScale() {
  let gameToPixelScale
  if(window.innerWidth / window.innerHeight < GAME_WIDTH / GAME_HEIGHT) {
    gameToPixelScale = window.innerWidth / GAME_WIDTH
  } else {
    gameToPixelScale = window.innerHeight / GAME_HEIGHT
  }

  gameElem.style.width = `${GAME_WIDTH * gameToPixelScale}px`
  gameElem.style.height = `${GAME_HEIGHT * gameToPixelScale}px`

}