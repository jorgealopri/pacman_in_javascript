const MAZE = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
    [1,2,1,1,1,1,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1],
    [1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
    [0,0,0,0,0,1,2,1,1,0,5,5,5,5,5,5,5,5,0,1,1,2,1,0,0,0,0,0],
    [0,0,0,0,0,1,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,1,0,0,0,0,0],
    [1,1,1,1,1,1,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,1,1,1,1,1,1],
    [0,0,0,0,0,0,2,0,0,0,1,4,4,4,4,4,4,1,0,0,0,2,0,0,0,0,0,0],
    [1,1,1,1,1,1,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,1,1,1,1,1,1],
    [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
    [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
    [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
    [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,3,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,3,1],
    [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
    [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
    [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
    [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

const MAZE_ORIGINAL = MAZE.map(row => [...row])

let pelletsTotal = 0
let pelletsEaten = 0

function initMaze() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            MAZE[r][c] = MAZE_ORIGINAL[r][c]
        }
    }
    pelletsTotal = 0
    pelletsEaten = 0
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (MAZE[r][c] === TILE.PELLET || MAZE[r][c] === TILE.POWER_PELLET) {
                pelletsTotal++
            }
        }
    }
}

function getTile(col, row) {
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return TILE.EMPTY
    return MAZE[row][col]
}

function isWalkable(col, row, ghost = null) {
    const tile = getTile(col, row)
    if (tile === TILE.WALL) return false
    if (tile === TILE.GHOST_DOOR) {
        if (!ghost) return false
        if (ghost.state !== 'eaten' && ghost.state !== 'inHouse') return false
        return true
    }
    if (tile === TILE.GHOST_HOUSE) {
        if (!ghost) return false
        if (ghost.state !== 'eaten' && ghost.state !== 'inHouse') return false
        return true
    }
    return true
}

function removePellet(col, row) {
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return 0
    const tile = MAZE[row][col]
    if (tile === TILE.PELLET) {
        MAZE[row][col] = TILE.EMPTY
        pelletsEaten++
        return 10
    }
    if (tile === TILE.POWER_PELLET) {
        MAZE[row][col] = TILE.EMPTY
        pelletsEaten++
        return 50
    }
    return 0
}

function isPellet(col, row) {
    const tile = getTile(col, row)
    return tile === TILE.PELLET || tile === TILE.POWER_PELLET
}

function allPelletsEaten() {
    return pelletsEaten >= pelletsTotal
}

function drawMaze(ctx) {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const x = c * TILE_SIZE
            const y = r * TILE_SIZE
            const tile = MAZE[r][c]

            if (tile === TILE.WALL) {
                ctx.fillStyle = COLORS.WALL
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE)
                drawWallPattern(ctx, c, r)
            } else if (tile === TILE.PELLET) {
                ctx.fillStyle = COLORS.PELLET
                ctx.beginPath()
                ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 2, 0, Math.PI * 2)
                ctx.fill()
            } else if (tile === TILE.POWER_PELLET) {
                ctx.fillStyle = COLORS.POWER_PELLET
                ctx.beginPath()
                ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 6, 0, Math.PI * 2)
                ctx.fill()
            } else if (tile === TILE.GHOST_DOOR) {
                ctx.fillStyle = '#FFB8FF'
                ctx.fillRect(x, y + TILE_SIZE / 2 - 2, TILE_SIZE, 4)
            } else if (tile === TILE.GHOST_HOUSE) {
                ctx.fillStyle = '#000000'
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE)
                ctx.strokeStyle = '#FFB8FF'
                ctx.lineWidth = 0.5
                ctx.strokeRect(x, y, TILE_SIZE, TILE_SIZE)
            }
        }
    }
}

function drawWallPattern(ctx, col, row) {
    const x = col * TILE_SIZE
    const y = row * TILE_SIZE
    const s = TILE_SIZE

    ctx.fillStyle = COLORS.WALL

    const top = getTile(col, row - 1) !== TILE.WALL
    const bottom = getTile(col, row + 1) !== TILE.WALL
    const left = getTile(col - 1, row) !== TILE.WALL
    const right = getTile(col + 1, row) !== TILE.WALL

    ctx.fillStyle = '#000000'

    const inset = 2
    if (!top) ctx.fillRect(x + inset, y, s - inset * 2, inset)
    if (!bottom) ctx.fillRect(x + inset, y + s - inset, s - inset * 2, inset)
    if (!left) ctx.fillRect(x, y + inset, inset, s - inset * 2)
    if (!right) ctx.fillRect(x + s - inset, y + inset, inset, s - inset * 2)

    if (top && left) ctx.fillRect(x, y, inset, inset)
    if (top && right) ctx.fillRect(x + s - inset, y, inset, inset)
    if (bottom && left) ctx.fillRect(x, y + s - inset, inset, inset)
    if (bottom && right) ctx.fillRect(x + s - inset, y + s - inset, inset, inset)
}
