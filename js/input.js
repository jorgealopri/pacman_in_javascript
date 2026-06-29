const keys = {}

let inputDirection = DIR.NONE
let startPressed = false
let touchStartX = 0
let touchStartY = 0

function initInput() {
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true

        switch (e.key) {
            case 'ArrowUp': inputDirection = DIR.UP; e.preventDefault(); break
            case 'ArrowDown': inputDirection = DIR.DOWN; e.preventDefault(); break
            case 'ArrowLeft': inputDirection = DIR.LEFT; e.preventDefault(); break
            case 'ArrowRight': inputDirection = DIR.RIGHT; e.preventDefault(); break
            case ' ':
            case 'Enter':
                startPressed = true
                e.preventDefault()
                break
        }
    })

    document.addEventListener('keyup', (e) => {
        keys[e.key] = false
    })

    document.addEventListener('touchstart', (e) => {
        const t = e.touches[0]
        touchStartX = t.clientX
        touchStartY = t.clientY
    }, { passive: true })

    document.addEventListener('touchmove', (e) => {
        e.preventDefault()
    }, { passive: false })

    document.addEventListener('touchend', (e) => {
        const t = e.changedTouches[0]
        const dx = t.clientX - touchStartX
        const dy = t.clientY - touchStartY
        const absDx = Math.abs(dx)
        const absDy = Math.abs(dy)
        const minSwipe = 15

        if (absDx < minSwipe && absDy < minSwipe) {
            startPressed = true
            return
        }

        if (absDx > absDy) {
            inputDirection = dx > 0 ? DIR.RIGHT : DIR.LEFT
        } else {
            inputDirection = dy > 0 ? DIR.DOWN : DIR.UP
        }
    }, { passive: true })
}
