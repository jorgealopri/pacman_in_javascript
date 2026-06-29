class Ghost {
    constructor(name, color, startTileX, startTileY, scatterTarget, personality) {
        this.name = name
        this.color = color
        this.startTileX = startTileX
        this.startTileY = startTileY
        this.scatterTarget = scatterTarget
        this.personality = personality

        this.tileX = startTileX
        this.tileY = startTileY
        this.x = startTileX * TILE_SIZE
        this.y = startTileY * TILE_SIZE
        this.direction = DIR.UP
        this.speed = GHOST_SPEED
        this.state = 'inHouse'
        this.frightenedTimer = 0
        this.flashTimer = 0
        this.releaseTimer = 0
        this.releaseDelay = 0
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
                const c1 = Math.floor(this.x / TILE_SIZE)
                const c2 = Math.floor((this.x + w) / TILE_SIZE)
                for (let c = c1; c <= c2; c++) {
                    if (!isWalkable(c, next, this)) return false
                }
                return true
            }
            case DIR.DOWN: {
                const bot = this.y + w
                const cur = Math.floor(bot / TILE_SIZE)
                const next = Math.floor((bot + this.speed) / TILE_SIZE)
                if (next === cur) return true
                const c1 = Math.floor(this.x / TILE_SIZE)
                const c2 = Math.floor((this.x + w) / TILE_SIZE)
                for (let c = c1; c <= c2; c++) {
                    if (!isWalkable(c, next, this)) return false
                }
                return true
            }
            case DIR.LEFT: {
                const left = this.x
                const cur = Math.floor(left / TILE_SIZE)
                const next = Math.floor((left - this.speed) / TILE_SIZE)
                if (next === cur) return true
                const r1 = Math.floor(this.y / TILE_SIZE)
                const r2 = Math.floor((this.y + w) / TILE_SIZE)
                for (let r = r1; r <= r2; r++) {
                    if (!isWalkable(next, r, this)) return false
                }
                return true
            }
            case DIR.RIGHT: {
                const right = this.x + w
                const cur = Math.floor(right / TILE_SIZE)
                const next = Math.floor((right + this.speed) / TILE_SIZE)
                if (next === cur) return true
                const r1 = Math.floor(this.y / TILE_SIZE)
                const r2 = Math.floor((this.y + w) / TILE_SIZE)
                for (let r = r1; r <= r2; r++) {
                    if (!isWalkable(next, r, this)) return false
                }
                return true
            }
            default: return false
        }
    }

    getOpposite(dir) {
        switch (dir) {
            case DIR.UP: return DIR.DOWN
            case DIR.DOWN: return DIR.UP
            case DIR.LEFT: return DIR.RIGHT
            case DIR.RIGHT: return DIR.LEFT
            default: return DIR.NONE
        }
    }

    getAvailableDirs() {
        const dirs = []
        for (const d of [DIR.UP, DIR.DOWN, DIR.LEFT, DIR.RIGHT]) {
            if (d !== this.getOpposite(this.direction) && this.canMove(d)) {
                dirs.push(d)
            }
        }
        if (dirs.length === 0 ||
            (dirs.length === 1 && (dirs[0] === DIR.LEFT || dirs[0] === DIR.RIGHT)
             && this.state !== 'eaten' && this.state !== 'inHouse')) {
            const opp = this.getOpposite(this.direction)
            if (opp !== dirs[0] && this.canMove(opp)) dirs.push(opp)
        }
        return dirs
    }

    chooseDirection(player) {
        const dirs = this.getAvailableDirs()
        if (dirs.length === 0) return this.direction

        let targetX, targetY

        if (this.state === 'frightened') {
            return dirs[Math.floor(Math.random() * dirs.length)]
        }

        if (this.state === 'eaten') {
            targetX = 14
            targetY = 14
        } else if (this.state === 'scatter') {
            targetX = this.scatterTarget.x
            targetY = this.scatterTarget.y
        } else {
            const p = this.personality
            switch (p) {
                case 'blinky':
                    targetX = player.tileX
                    targetY = player.tileY
                    break
                case 'pinky': {
                    let dx = 0, dy = 0
                    switch (player.direction) {
                        case DIR.UP: dx = -4; dy = -4; break
                        case DIR.DOWN: dx = 0; dy = 4; break
                        case DIR.LEFT: dx = -4; dy = 0; break
                        case DIR.RIGHT: dx = 4; dy = 0; break
                    }
                    targetX = player.tileX + dx
                    targetY = player.tileY + dy
                    break
                }
                case 'inky': {
                    let dx = 0, dy = 0
                    switch (player.direction) {
                        case DIR.UP: dx = -2; dy = -2; break
                        case DIR.DOWN: dx = 0; dy = 2; break
                        case DIR.LEFT: dx = -2; dy = 0; break
                        case DIR.RIGHT: dx = 2; dy = 0; break
                    }
                    const aheadX = player.tileX + dx
                    const aheadY = player.tileY + dy
                    targetX = aheadX + (aheadX - 14)
                    targetY = aheadY + (aheadY - 14)
                    break
                }
                case 'clyde': {
                    const dist = Math.abs(this.tileX - player.tileX) + Math.abs(this.tileY - player.tileY)
                    if (dist > 8) {
                        targetX = player.tileX
                        targetY = player.tileY
                    } else {
                        targetX = this.scatterTarget.x
                        targetY = this.scatterTarget.y
                    }
                    break
                }
                default:
                    targetX = 0
                    targetY = 0
            }
        }

        let bestDir = dirs[0]
        let bestDist = Infinity

        for (const d of dirs) {
            let nx = this.tileX, ny = this.tileY
            switch (d) {
                case DIR.UP: ny--; break
                case DIR.DOWN: ny++; break
                case DIR.LEFT: nx--; break
                case DIR.RIGHT: nx++; break
            }
            let dist = (nx - targetX) ** 2 + (ny - targetY) ** 2
            if (this.tileY === 12 && this.state !== 'eaten' && this.state !== 'inHouse') {
                if (d === DIR.LEFT || d === DIR.RIGHT) dist += 100000
            }
            if (dist < bestDist) {
                bestDist = dist
                bestDir = d
            }
        }

        return bestDir
    }

    slideToAlign(dir) {
        switch (dir) {
            case DIR.RIGHT: {
                const target = Math.ceil(this.x / TILE_SIZE) * TILE_SIZE
                if (target > this.x && target <= this.x + this.speed) {
                    const tile = Math.floor((target + TILE_SIZE - 1) / TILE_SIZE)
                    if (isWalkable(tile, this.getTileY(), this)) { this.x = target }
                }
                break
            }
            case DIR.LEFT: {
                const target = Math.floor(this.x / TILE_SIZE) * TILE_SIZE
                if (target < this.x && target >= this.x - this.speed) {
                    if (isWalkable(Math.floor(target / TILE_SIZE), this.getTileY(), this)) { this.x = target }
                }
                break
            }
            case DIR.DOWN: {
                const target = Math.ceil(this.y / TILE_SIZE) * TILE_SIZE
                if (target > this.y && target <= this.y + this.speed) {
                    const tile = Math.floor((target + TILE_SIZE - 1) / TILE_SIZE)
                    if (isWalkable(this.getTileX(), tile, this)) { this.y = target }
                }
                break
            }
            case DIR.UP: {
                const target = Math.floor(this.y / TILE_SIZE) * TILE_SIZE
                if (target < this.y && target >= this.y - this.speed) {
                    if (isWalkable(this.getTileX(), Math.floor(target / TILE_SIZE), this)) { this.y = target }
                }
                break
            }
        }
    }

    update(player, ghosts) {
        if (this.state === 'inHouse') {
            if (this.releaseTimer >= this.releaseDelay) {
                if (this.isAligned()) {
                    this.direction = DIR.UP
                    if (!this.canMove(DIR.UP)) {
                        this.state = 'chase'
                        this.speed = GHOST_SPEED
                    }
                }
                if (this.direction === DIR.UP && this.canMove(DIR.UP)) {
                    this.y -= this.speed
                }
            } else {
                this.releaseTimer++
            }
            this.tileX = this.getTileX()
            this.tileY = this.getTileY()
            return
        }

        if (this.state === 'frightened') {
            this.frightenedTimer--
            this.flashTimer++
            if (this.frightenedTimer <= 0) {
                this.state = 'chase'
                this.speed = GHOST_SPEED
            }
        }

        if (this.isAligned()) {
            this.direction = this.chooseDirection(player)
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

        if (this.getTileY() === 14) {
            if (this.x < 0) this.x = CANVAS_WIDTH - TILE_SIZE
            if (this.x >= CANVAS_WIDTH) this.x = 0
        }

        this.tileX = this.getTileX()
        this.tileY = this.getTileY()

        if (this.state === 'eaten' && this.tileX === 14 && this.tileY === 14) {
            this.x = 14 * TILE_SIZE
            this.y = 14 * TILE_SIZE
            this.state = 'inHouse'
            this.speed = GHOST_SPEED
            this.releaseTimer = 0
            this.releaseDelay = 20
        }
    }

    setFrightened() {
        if (this.state === 'chase' || this.state === 'scatter') {
            this.state = 'frightened'
            this.frightenedTimer = FRIGHTENED_DURATION * 60
            this.flashTimer = 0
            this.speed = GHOST_FRIGHTENED_SPEED
            this.direction = this.getOpposite(this.direction)
        }
    }

    setEaten() {
        this.state = 'eaten'
        this.speed = GHOST_EATEN_SPEED
    }

    draw(ctx) {
        const cx = this.x + TILE_SIZE / 2
        const cy = this.y + TILE_SIZE / 2 + 1
        const r = TILE_SIZE / 2 - 1

        if (this.state === 'eaten') {
            this.drawEyes(ctx, cx, cy, r)
            return
        }

        let fillColor = this.color

        if (this.state === 'frightened') {
            if (this.frightenedTimer < 120 && Math.floor(this.flashTimer / 8) % 2 === 0) {
                fillColor = COLORS.FRIGHTENED_FLASH
            } else {
                fillColor = COLORS.FRIGHTENED
            }
        }

        ctx.fillStyle = fillColor
        ctx.beginPath()
        ctx.arc(cx, cy - r / 4, r, Math.PI, 0, false)
        ctx.lineTo(cx + r, cy + r * 0.6)

        const waveCount = 3
        const waveWidth = (r * 2) / waveCount
        for (let i = 0; i < waveCount; i++) {
            const wx = cx + r - i * waveWidth
            const wy = cy + r * 0.6
            ctx.quadraticCurveTo(wx - waveWidth / 4, wy + 4, wx - waveWidth / 2, wy)
            ctx.quadraticCurveTo(wx - waveWidth * 3 / 4, wy - 4, wx - waveWidth, wy)
        }

        ctx.closePath()
        ctx.fill()

        this.drawEyes(ctx, cx, cy, r)
    }

    drawEyes(ctx, cx, cy, r) {
        const eyeOffsetX = r * 0.3
        const eyeOffsetY = -r * 0.15
        const eyeR = r * 0.3
        const pupilR = r * 0.15

        ctx.fillStyle = COLORS.GHOST_EYES
        ctx.beginPath()
        ctx.arc(cx - eyeOffsetX, cy + eyeOffsetY, eyeR, 0, Math.PI * 2)
        ctx.arc(cx + eyeOffsetX, cy + eyeOffsetY, eyeR, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = '#0000FF'
        let px = 0, py = 0
        switch (this.direction) {
            case DIR.UP: py = -pupilR; break
            case DIR.DOWN: py = pupilR; break
            case DIR.LEFT: px = -pupilR; break
            case DIR.RIGHT: px = pupilR; break
        }
        ctx.beginPath()
        ctx.arc(cx - eyeOffsetX + px, cy + eyeOffsetY + py, pupilR, 0, Math.PI * 2)
        ctx.arc(cx + eyeOffsetX + px, cy + eyeOffsetY + py, pupilR, 0, Math.PI * 2)
        ctx.fill()
    }
}

const SCATTER_TARGETS = [
    { x: 25, y: 0 },
    { x: 2, y: 0 },
    { x: 27, y: 30 },
    { x: 0, y: 30 }
]

function createGhosts() {
    const blinky = new Ghost('blinky', COLORS.BLINKY, 14, 14, SCATTER_TARGETS[0], 'blinky')
    blinky.state = 'inHouse'
    blinky.releaseDelay = 0

    const pinky = new Ghost('pinky', COLORS.PINKY, 14, 14, SCATTER_TARGETS[1], 'pinky')
    pinky.state = 'inHouse'
    pinky.releaseDelay = 30

    const inky = new Ghost('inky', COLORS.INKY, 14, 14, SCATTER_TARGETS[2], 'inky')
    inky.state = 'inHouse'
    inky.releaseDelay = 120

    const clyde = new Ghost('clyde', COLORS.CLYDE, 14, 14, SCATTER_TARGETS[3], 'clyde')
    clyde.state = 'inHouse'
    clyde.releaseDelay = 240

    return [blinky, pinky, inky, clyde]
}
