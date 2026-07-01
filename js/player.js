class Player {
    constructor() {
        this.tileX = 14
        this.tileY = 23
        this.x = this.tileX * TILE_SIZE
        this.y = this.tileY * TILE_SIZE
        this.direction = DIR.LEFT
        this.nextDirection = DIR.NONE
        this.speed = PACMAN_SPEED
        this.mouthAngle = 0
        this.mouthOpening = true
        this.lives = 3
        this.animTimer = 0
    }

    reset() {
        this.tileX = 14
        this.tileY = 23
        this.x = this.tileX * TILE_SIZE
        this.y = this.tileY * TILE_SIZE
        this.direction = DIR.LEFT
        this.nextDirection = DIR.NONE
        this.mouthAngle = 0
    }

    getTileX() {
        return Math.floor((this.x + TILE_SIZE / 2) / TILE_SIZE)
    }

    getTileY() {
        return Math.floor((this.y + TILE_SIZE / 2) / TILE_SIZE)
    }

    isAligned() {
        return this.x % TILE_SIZE === 0 && this.y % TILE_SIZE === 0
    }

    canMove(dir) {
        const w = TILE_SIZE - 1
        switch (dir) {
            case DIR.UP: {
                const top = this.y
                const cur = Math.floor(top / TILE_SIZE)
                const next = Math.floor((top - this.speed) / TILE_SIZE)
                if (next === cur) return true
                if (next < 0) {
                    if (!isOnTunnelCol(this.x)) return false
                    return true
                }
                const c1 = Math.floor(this.x / TILE_SIZE)
                const c2 = Math.floor((this.x + w) / TILE_SIZE)
                for (let c = c1; c <= c2; c++) {
                    if (!isWalkable(c, next)) return false
                }
                return true
            }
            case DIR.DOWN: {
                const bot = this.y + w
                const cur = Math.floor(bot / TILE_SIZE)
                const next = Math.floor((bot + this.speed) / TILE_SIZE)
                if (next === cur) return true
                if (next >= ROWS) {
                    if (!isOnTunnelCol(this.x)) return false
                    return true
                }
                const c1 = Math.floor(this.x / TILE_SIZE)
                const c2 = Math.floor((this.x + w) / TILE_SIZE)
                for (let c = c1; c <= c2; c++) {
                    if (!isWalkable(c, next)) return false
                }
                return true
            }
            case DIR.LEFT: {
                const left = this.x
                const cur = Math.floor(left / TILE_SIZE)
                const next = Math.floor((left - this.speed) / TILE_SIZE)
                if (next === cur) return true
                if (next < 0) {
                    if (!isOnTunnelRow(this.y)) return false
                    return true
                }
                const r1 = Math.floor(this.y / TILE_SIZE)
                const r2 = Math.floor((this.y + w) / TILE_SIZE)
                for (let r = r1; r <= r2; r++) {
                    if (!isWalkable(next, r)) return false
                }
                return true
            }
            case DIR.RIGHT: {
                const right = this.x + w
                const cur = Math.floor(right / TILE_SIZE)
                const next = Math.floor((right + this.speed) / TILE_SIZE)
                if (next === cur) return true
                if (next >= COLS) {
                    if (!isOnTunnelRow(this.y)) return false
                    return true
                }
                const r1 = Math.floor(this.y / TILE_SIZE)
                const r2 = Math.floor((this.y + w) / TILE_SIZE)
                for (let r = r1; r <= r2; r++) {
                    if (!isWalkable(next, r)) return false
                }
                return true
            }
            default: return false
        }
    }

    slideToAlign(dir) {
        switch (dir) {
            case DIR.RIGHT: {
                const target = Math.ceil(this.x / TILE_SIZE) * TILE_SIZE
                if (target > this.x && target <= this.x + this.speed) {
                    const tile = Math.floor((target + TILE_SIZE - 1) / TILE_SIZE)
                    if (isWalkable(tile, this.getTileY())) { this.x = target }
                }
                break
            }
            case DIR.LEFT: {
                const target = Math.floor(this.x / TILE_SIZE) * TILE_SIZE
                if (target < this.x && target >= this.x - this.speed) {
                    if (isWalkable(Math.floor(target / TILE_SIZE), this.getTileY())) { this.x = target }
                }
                break
            }
            case DIR.DOWN: {
                const target = Math.ceil(this.y / TILE_SIZE) * TILE_SIZE
                if (target > this.y && target <= this.y + this.speed) {
                    const tile = Math.floor((target + TILE_SIZE - 1) / TILE_SIZE)
                    if (isWalkable(this.getTileX(), tile)) { this.y = target }
                }
                break
            }
            case DIR.UP: {
                const target = Math.floor(this.y / TILE_SIZE) * TILE_SIZE
                if (target < this.y && target >= this.y - this.speed) {
                    if (isWalkable(this.getTileX(), Math.floor(target / TILE_SIZE))) { this.y = target }
                }
                break
            }
        }
    }

    update() {
        this.animTimer++
        if (this.animTimer % 3 === 0) {
            if (this.mouthOpening) {
                this.mouthAngle += 0.15
                if (this.mouthAngle >= 0.7) this.mouthOpening = false
            } else {
                this.mouthAngle -= 0.15
                if (this.mouthAngle <= 0.05) this.mouthOpening = true
            }
        }

        if (this.isAligned()) {
            if (this.nextDirection !== DIR.NONE && this.canMove(this.nextDirection)) {
                this.direction = this.nextDirection
                this.nextDirection = DIR.NONE
            }
        }

        if (this.direction !== DIR.NONE && this.canMove(this.direction)) {
            switch (this.direction) {
                case DIR.UP: this.y -= this.speed; break
                case DIR.DOWN: this.y += this.speed; break
                case DIR.LEFT: this.x -= this.speed; break
                case DIR.RIGHT: this.x += this.speed; break
            }
        } else if (this.direction !== DIR.NONE && !this.isAligned()) {
            this.slideToAlign(this.direction)
        }

        if (isOnTunnelRow(this.y)) {
            if (this.x < 0) this.x = CANVAS_WIDTH - TILE_SIZE
            if (this.x >= CANVAS_WIDTH) this.x = 0
        }
        if (isOnTunnelCol(this.x)) {
            if (this.y < 0) this.y = CANVAS_HEIGHT - TILE_SIZE
            if (this.y >= CANVAS_HEIGHT) this.y = 0
        }

        this.tileX = this.getTileX()
        this.tileY = this.getTileY()
    }

    draw(ctx) {
        const cx = this.x + TILE_SIZE / 2
        const cy = this.y + TILE_SIZE / 2
        const radius = TILE_SIZE / 2 - 1

        let startAngle, endAngle

        switch (this.direction) {
            case DIR.RIGHT:
                startAngle = 0 + this.mouthAngle
                endAngle = Math.PI * 2 - this.mouthAngle
                break
            case DIR.DOWN:
                startAngle = Math.PI / 2 + this.mouthAngle
                endAngle = Math.PI / 2 + Math.PI * 2 - this.mouthAngle
                break
            case DIR.LEFT:
                startAngle = Math.PI + this.mouthAngle
                endAngle = Math.PI + Math.PI * 2 - this.mouthAngle
                break
            case DIR.UP:
                startAngle = Math.PI * 1.5 + this.mouthAngle
                endAngle = Math.PI * 1.5 + Math.PI * 2 - this.mouthAngle
                break
            default:
                startAngle = 0 + this.mouthAngle
                endAngle = Math.PI * 2 - this.mouthAngle
        }

        ctx.fillStyle = COLORS.PACMAN
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.arc(cx, cy, radius, startAngle, endAngle)
        ctx.closePath()
        ctx.fill()
    }
}
