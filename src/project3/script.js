/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
let gameFrame = 0
const numberOfEnemies = 10

const enemyImages = [...Array(4).keys()].map((val) => {
    const imgNumb = val + 1
    const image = new Image()
    image.src = `./enemy${imgNumb}.png`
    return image
})

class Enemy {
    constructor(x, y, speed, image, spriteWidth, spriteHeight, scale, frames) {
        
        this.spriteWidth = spriteWidth ?? 293
        this.spriteHeight = spriteHeight ?? 155
        this.scale = scale ?? 1 / 2.5
        this.width = this.spriteWidth * this.scale
        this.height = this.spriteHeight * this.scale
        this.x = x ?? Math.random() * (CANVAS_WIDTH - this.width)
        this.y = y ?? Math.random() * (CANVAS_HEIGHT - this.height)
        this.speed = speed ?? Math.random() * 4 - 2
        this.image = image ?? enemyImages[0]
        this.frame = 0
        this.frames = frames ?? 6
        this.flapSpeed = Math.floor(Math.random() * 3 + 1)
    }
    update() {
        this.x += Math.random() * 5 - 2.5
        this.y += Math.random() * 5 - 2.5
        if (gameFrame % this.flapSpeed === 0) {
            this.frame = (this.frame + 1) % this.frames
        }
    }
    draw() {
        ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height)
    }
}

const enemies = [...Array(numberOfEnemies).keys()].map((v) => new Enemy())

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    enemies.forEach(enemy => {
        enemy.update()
        enemy.draw()
    })
    gameFrame++
    requestAnimationFrame(animate)
}
animate()