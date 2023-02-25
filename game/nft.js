import {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty
} from './updateCustomProperty.js'

const SPEED = 0.05
const OBSTACLE_INTERVAL_MIN = 500
const OBSTACLE_INTERVAL_MAX = 2000
const gameElem = document.querySelector("[data-game]")

let nextNFTTime
export function setupNFT() {
  nextNFTTime = OBSTACLE_INTERVAL_MIN

  document.querySelectorAll("[data-nft]").forEach(nft=> {
    nft.remove()
  })
}

export function updateNFT(delta, speedScale){
  document.querySelectorAll("[data-nft]").forEach(nft => {
    incrementCustomProperty(nft, "--left", delta * speedScale * SPEED * -1)
    if(getCustomProperty(nft, "--left") <= -100) {
      nft.remove()
    }
  })

  if(nextNFTTime <= 0) {
    createNFT()

    nextNFTTime = randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedScale
  }

  nextNFTTime -= delta
}

export function getNFTRects() {
  return [...document.querySelectorAll("[data-nft]")].map(nft => {
    return nft.getBoundingClientRect()
  })
}

export function createNFT() {
  const nft = document.createElement("img")
  nft.dataset.nft = true

  nft.src = `./imgs/nft.png`

  nft.classList.add("nft")
  setCustomProperty(nft, "--left", 100)
  gameElem.append(nft)
}

export function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}