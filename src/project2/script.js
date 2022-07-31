/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 800
const CANVAS_HEIGHT = canvas.height = 700
let gameSpeed = 10

class Layer {
    /**
     * 
     * @param {Image} image 
     * @param {number} speedModifier 
     */
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400
        this.height = 700
        this.image = image
        this.speedModifier = speedModifier
        this.speed = gameSpeed * this.speedModifier
    }
    update() {
        this.speed = gameSpeed * this.speedModifier
        if (this.x <= -this.width) {
            this.x = 0
        }
        this.x -= this.speed
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

window.addEventListener('load', () => {
    /**
     * @type {HTMLInputElement}
     */
    const slider = document.getElementById('slider')
    slider.value = gameSpeed
    const showGameSpeed = document.getElementById('showGameSpeed')
    showGameSpeed.innerHTML = gameSpeed
    slider.addEventListener('change', (e) => {
        gameSpeed = e.target.value
        showGameSpeed.innerHTML = gameSpeed
    })



    const backgroundLayers = [...Array(5).keys()].map((val) => {
        const numb = val + 1
        const image = new Image()
        image.src = `./layer-${numb}.png`
        const layer = new Layer(image, 0.2 * numb)
        return layer
    })

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        backgroundLayers.forEach((layer) => {
            layer.update()
            layer.draw()
        })
        requestAnimationFrame(animate)
    }
    animate()
})

