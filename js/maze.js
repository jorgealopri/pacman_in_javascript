const LEVELS = [
    {
    grid:[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
          [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
          [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
          [1,2,1,1,1,1,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,1,1,1,1,2,1],
          [1,2,2,2,2,2,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,2,2,2,2,2,1],
          [1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1],
          [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
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
    ],
    ghostSpawn: {x: 14, y:14},
    scatterTargets: [
            { x: 25, y: 0 }, { x: 2, y: 0 },
            { x: 27, y: 30 }, { x: 0, y: 30 }
        ],
        doorRow: 12,
        wallColor: '#2121DE'

    },
    {
    grid:[[0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
          [0,1,2,2,2,2,2,2,2,3,1,0,0,0,0,0,0,1,3,2,2,2,2,2,2,2,1,0],
          [0,1,2,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,2,1,0],
          [0,1,2,1,1,1,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,1,1,1,2,1,0],
          [0,1,2,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,2,1,0],
          [0,1,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,1,0],
          [0,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,0],
          [0,1,2,1,1,1,1,1,1,2,2,2,0,1,1,2,2,2,2,1,1,1,1,1,1,2,1,0],
          [0,1,2,2,2,2,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,2,2,2,2,1,0],
          [0,1,1,1,2,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,2,1,1,1,0],
          [1,1,1,1,2,1,2,1,1,0,0,0,0,0,0,0,0,0,0,2,2,2,1,2,1,1,1,1],
          [0,0,2,1,2,1,2,1,1,0,5,5,5,5,5,5,5,5,0,1,1,2,1,2,1,2,0,0],
          [1,1,2,1,2,1,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,1,2,1,2,1,1],
          [0,1,2,1,2,1,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,1,2,1,2,1,0],
          [0,1,2,2,2,2,2,0,0,0,1,4,4,4,4,4,4,1,0,0,0,2,2,2,2,2,1,0],
          [0,1,2,1,2,1,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,1,2,1,2,1,0],
          [0,1,2,1,2,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,2,1,2,1,0],
          [0,1,2,1,2,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,2,1,2,1,0],
          [0,1,2,1,2,2,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,2,2,1,2,1,0],
          [0,1,2,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,2,1,0],
          [0,1,2,2,2,2,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,2,2,2,2,1,0],
          [0,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,0],
          [0,0,0,0,0,1,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,1,0,0,0,0,0],
          [0,0,0,0,0,1,2,1,1,1,1,1,2,2,2,2,1,1,1,1,1,2,1,0,0,0,0,0],
          [1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,3,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,3,1],
          [1,2,1,1,1,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,1,1,1,2,1],
          [1,2,1,1,1,1,2,1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,1,1,1,1,2,1],
          [1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1],
          [1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1]
    ],
    ghostSpawn: {x: 14, y: 14},
    scatterTargets: [
            { x: 25, y: 0 }, { x: 2, y: 0 },
            { x: 27, y: 30 }, { x: 0, y: 30 }
        ],
        doorRow: 12,
        wallColor: '#14ff9d'
    },
    {
    grid:[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
          [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
          [1,2,1,1,1,1,2,1,1,2,1,1,2,2,2,2,1,1,2,1,1,2,1,1,1,1,2,1],
          [1,3,2,2,2,2,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,2,2,2,2,3,1],
          [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1],
          [1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1],
          [0,0,0,2,1,1,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,1,1,2,0,0,0],
          [1,1,1,2,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,2,1,1,1],
          [0,0,1,2,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,2,1,0,0],
          [0,0,1,2,1,1,2,1,1,0,5,5,5,5,5,5,5,5,0,1,1,2,1,1,2,1,0,0],
          [0,0,1,2,2,2,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,2,2,2,1,0,0],
          [0,0,1,2,1,1,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,1,1,2,1,0,0],
          [0,0,1,2,2,2,2,0,0,0,1,4,4,4,4,4,4,1,0,0,0,2,2,2,2,1,0,0],
          [0,0,1,2,1,1,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,1,1,2,1,0,0],
          [0,0,1,2,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,2,1,0,0],
          [0,0,1,2,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,2,1,0,0],
          [0,0,1,2,1,1,2,1,1,0,1,1,0,1,1,0,1,1,0,1,1,2,1,1,2,1,0,0],
          [0,0,1,2,1,1,2,1,1,0,1,1,0,1,1,0,1,1,0,1,1,2,1,1,2,1,0,0],
          [0,0,1,2,1,1,2,2,2,2,0,0,0,1,1,0,0,0,2,2,2,2,1,1,2,1,0,0],
          [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
          [0,0,0,2,2,2,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,2,2,2,0,0,0],
          [1,1,1,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,1,1,1],
          [1,2,2,2,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,2,2,2,1],
          [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
          [1,3,1,1,1,1,2,1,2,2,2,2,2,1,1,2,2,2,2,2,1,2,1,1,1,1,3,1],
          [1,2,1,1,1,1,2,1,2,1,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,1,2,1],
          [1,2,1,1,1,1,2,1,2,2,2,2,2,2,2,2,2,2,2,2,1,2,1,1,1,1,2,1],
          [1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1],
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    ghostSpawn: {x: 14, y:14},
    scatterTargets: [
            { x: 25, y: 0 }, { x: 2, y: 0 },
            { x: 27, y: 30 }, { x: 0, y: 30 }
        ],
        doorRow: 12,
        wallColor: '#ff9560'

    },
]

let currentWallColor = COLORS.WALL
const TOTAL_LEVELS = LEVELS.length
let MAZE = []
let MAZE_COPY = []

let pelletsTotal = 0
let pelletsEaten = 0

let currentTunnelRows = []
let currentTunnelCols = []
let currentDoorRow = 12
let currentGhostSpawn = {x:14, y: 14}

function initMaze(levelIndex) {
    const level = LEVELS[levelIndex]
    MAZE = level.grid.map(row => [...row])
    MAZE_COPY = MAZE.map(row => [...row])
    currentWallColor = LEVELS[levelIndex].wallColor
    currentDoorRow = level.doorRow
    currentGhostSpawn = level.ghostSpawn

    currentTunnelRows = []
    for (let r = 0; r < ROWS; r++) {
        if (MAZE[r][0] === 0 && MAZE[r][COLS - 1] === 0) {
            currentTunnelRows.push(r)
        }
    }
    currentTunnelCols = []
    for (let c = 0; c < COLS; c++) {
        if (MAZE[0][c] === 0 && MAZE[ROWS - 1][c] === 0) {
            currentTunnelCols.push(c)
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

function isOnTunnelRow(y) {
    for (const r of currentTunnelRows) {
        if (y >= r * TILE_SIZE && y < (r + 1) * TILE_SIZE) return true
    }
    return false
}

function isOnTunnelCol(x) {
    for (const c of currentTunnelCols) {
        if (x >= c * TILE_SIZE && x < (c + 1) * TILE_SIZE) return true
    }
    return false
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
                ctx.fillStyle = currentWallColor
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

    ctx.fillStyle = currentWallColor

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
