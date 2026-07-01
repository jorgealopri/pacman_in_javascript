const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT + 40

let gameMode = MODE.TITLE
let player, ghosts
let score = 0
let highScore = 0
let ghostModeTimer = 0
let ghostMode = 'scatter'
let ghostModeIndex = 0
let frameCount = 0
let dyingAnimation = 0
let readyTimer = 0
let currentLevel = 0
const startLevel = parseInt(new URLSearchParams(location.search).get('level')) || 0

function initGame() {
    currentLevel = startLevel 
    initMaze(startLevel)
    player = new Player()
    ghosts = createGhosts()
    gameMode = MODE.READY
    readyTimer = 90
    score = 0
    ghostMode = 'scatter'
    ghostModeIndex = 0
    ghostModeTimer = 0
    dyingAnimation = 0
    frameCount = 0
}

function startNewGame() {
    currentLevel = startLevel 
    initMaze(startLevel)
    player = new Player()
    player.lives = 3
    ghosts = createGhosts()
    gameMode = MODE.READY
    readyTimer = 90
    score = 0
    ghostMode = 'scatter'
    ghostModeIndex = 0
    ghostModeTimer = 0
    dyingAnimation = 0
    frameCount = 0
}

function resetLevel() {
    player.reset()
    ghosts = createGhosts()
    gameMode = MODE.READY
    readyTimer = 90
    ghostMode = 'scatter'
    ghostModeIndex = 0
    ghostModeTimer = 0
    dyingAnimation = 0
    
}

function update() {
    frameCount++

    if (gameMode === MODE.TITLE) {
        if (startPressed) {
            startPressed = false
            startNewGame()
        }
        return
    }

    if (gameMode === MODE.READY) {
        readyTimer--
        if (readyTimer <= 0) {
            gameMode = MODE.PLAYING
        }
        return
    }

    if (gameMode === MODE.DYING) {
        dyingAnimation++
        if (dyingAnimation > 60) {
            if (player.lives <= 0) {
                gameMode = MODE.GAME_OVER
            } else {
                resetLevel()
            }
        }
        return
    }

    if (gameMode === MODE.GAME_OVER || gameMode === MODE.WIN) {
        if (startPressed) {
            startPressed = false
            startNewGame()
        }
        return
    }

    ghostModeTimer++
    const currentPhaseDuration = ghostMode === 'scatter' ? SCATTER_DURATION : CHASE_DURATION
    if (ghostModeTimer >= currentPhaseDuration * 60) {
        ghostModeTimer = 0
        ghostMode = ghostMode === 'scatter' ? 'chase' : 'scatter'
        ghostModeIndex++
        for (const ghost of ghosts) {
            if (ghost.state === 'chase' || ghost.state === 'scatter') {
                ghost.state = ghostMode
                ghost.direction = ghost.getOpposite(ghost.direction)
            }
        }
    }

    if (inputDirection !== DIR.NONE) {
        player.nextDirection = inputDirection
        inputDirection = DIR.NONE
    }

    player.update()

    for (const ghost of ghosts) {
        ghost.update(player, ghosts)
    }

    const ptileX = player.getTileX()
    const ptileY = player.getTileY()

    const points = removePellet(ptileX, ptileY)
    if (points > 0) {
        score += points
        if (points >= 50) {
            for (const ghost of ghosts) {
                ghost.setFrightened()
            }
        }
        if (allPelletsEaten()) {
            currentLevel ++
            if (currentLevel >= TOTAL_LEVELS){
                gameMode = MODE.WIN
            } else {
                initMaze(currentLevel)
                player.reset()
                ghosts= createGhosts()
                gameMode = MODE.READY
                readyTimer = 90
                ghostMode = 'scatter'
                ghostModeIndex = 0
                ghostModeTimer = 0
                dyingAnimation = 0
            }
        }
    }

    for (const ghost of ghosts) {
        if (ghost.state === 'inHouse' || ghost.state === 'eaten') continue

        if (player.getTileX() === ghost.getTileX() && player.getTileY() === ghost.getTileY()) {
            if (ghost.state === 'frightened') {
                ghost.setEaten()
                score += 200
            } else if (ghost.state === 'chase' || ghost.state === 'scatter') {
                player.lives--
                gameMode = MODE.DYING
                dyingAnimation = 0
                break
            }
        }
    }
}

function drawTitle(ctx) {
    ctx.fillStyle = COLORS.BACKGROUND
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = COLORS.TEXT
    ctx.font = 'bold 24px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('PAC-MAN', CANVAS_WIDTH / 2, 150)

    ctx.fillStyle = COLORS.PELLET
    ctx.font = '14px monospace'
    ctx.fillText('Tap or press SPACE to start', CANVAS_WIDTH / 2, 300)

    ctx.fillStyle = COLORS.SCORE
    ctx.font = '12px monospace'
    ctx.fillText('Arrow keys / swipe to move', CANVAS_WIDTH / 2, 340)
    ctx.fillText('Eat pellets to score points', CANVAS_WIDTH / 2, 360)
    ctx.fillText('Power pellets let you eat ghosts!', CANVAS_WIDTH / 2, 380)
}

function drawUI(ctx) {
    ctx.fillStyle = COLORS.BACKGROUND
    ctx.fillRect(0, CANVAS_HEIGHT, canvas.width, 40)

    ctx.fillStyle = COLORS.SCORE
    ctx.textAlign = 'left'
    ctx.fillText('LEVEL: ' + (currentLevel + 1), 8, CANVAS_HEIGHT + 10) 
    
    ctx.fillStyle = COLORS.SCORE
    ctx.font = '14px monospace'
    ctx.textAlign = 'left'
    ctx.fillText('SCORE: ' + score, 8, CANVAS_HEIGHT + 25)

    ctx.textAlign = 'center'
    ctx.fillText('HIGH SCORE: ' + highScore, CANVAS_WIDTH / 2, CANVAS_HEIGHT + 25)

    for (let i = 0; i < player.lives; i++) {
        const lx = CANVAS_WIDTH - 30 - i * 24
        const ly = CANVAS_HEIGHT + 14
        ctx.fillStyle = COLORS.PACMAN
        ctx.beginPath()
        ctx.arc(lx, ly, 8, 0.2, Math.PI * 2 - 0.2)
        ctx.lineTo(lx, ly)
        ctx.closePath()
        ctx.fill()
    }
}

function drawGameOver(ctx) {
    ctx.fillStyle = COLORS.TEXT
    ctx.font = 'bold 20px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10)

    ctx.fillStyle = COLORS.SCORE
    ctx.font = '12px monospace'
    ctx.fillText('Tap or press SPACE to play again', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20)
}

function drawWin(ctx) {
    ctx.fillStyle = COLORS.TEXT
    ctx.font = 'bold 20px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('YOU WIN!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10)

    ctx.fillStyle = COLORS.SCORE
    ctx.font = '12px monospace'
    ctx.fillText('Tap or press SPACE to play again', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20)
}

function drawReady(ctx) {
    ctx.fillStyle = COLORS.TEXT
    ctx.font = 'bold 16px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('READY!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 80)
}

function drawDying(ctx) {
    const cx = player.x + TILE_SIZE / 2
    const cy = player.y + TILE_SIZE / 2
    const progress = Math.min(dyingAnimation / 60, 1)
    const r = TILE_SIZE / 2 - 1

    ctx.fillStyle = COLORS.PACMAN
    const angle = progress * Math.PI
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.arc(cx, cy, r, angle, Math.PI * 2 - angle)
    ctx.closePath()
    ctx.fill()
}

function draw() {
    ctx.fillStyle = COLORS.BACKGROUND
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    if (gameMode === MODE.TITLE) {
        drawTitle(ctx)
        return
    }

    drawMaze(ctx)
    drawUI(ctx)

    if (gameMode === MODE.READY) {
        drawReady(ctx)
    }

    if (gameMode === MODE.DYING) {
        drawDying(ctx)
        return
    }

    if (gameMode === MODE.GAME_OVER) {
        drawGameOver(ctx)
        return
    }

    if (gameMode === MODE.WIN) {
        drawWin(ctx)
        return
    }

    for (const ghost of ghosts) {
        ghost.draw(ctx)
    }

    player.draw(ctx)
}

function gameLoop() {
    update()
    draw()

    if (score > highScore) {
        highScore = score
    }

    requestAnimationFrame(gameLoop)
}

initInput()
gameMode = MODE.TITLE
gameLoop()
