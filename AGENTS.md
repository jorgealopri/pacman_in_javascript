# AGENTS.md — Pacman

## Proyect overview

This project aims to create a classic Pac-Man-style game using only:

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks)

The game should run directly in the browser without requiring build tools, package managers, or external dependencies.

## Project state

Empty repository — no code, no config, no dependencies yet.

## Technical goals

- Implement the classic Pac-Man gameplay mechanics.
- Render the maze using HTML, CSS, and JavaScript.
- Handle player movement with keyboard controls.
- Implement collectible pellets and score tracking.
- Add enemy ghosts with basic AI behavior.
- Include collision detection between Pac-Man, walls, pellets, and ghosts.
- Support game states such as start, pause, game over, and level completion.
- Keep the codebase framework-free and easy to understand.

## Architecture guidelines

- Prefer modular, maintainable JavaScript files.
Separate concerns clearly:
- Rendering
- Game logic
- Input handling
- Enemy AI
- Collision detection
- Score and game state management

Suggested structure:

/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── game.js
│   ├── player.js
│   ├── ghosts.js
│   ├── maze.js
│   ├── input.js
│   └── utils.js
└── assets/
    ├── images/
    └── sounds/

## Coding Conventios

- Use modern ES6+ JavaScript.
- Prefer const and let over var.
- Use descriptive names for variables and functions.
- Keep functions focused on a single responsibility.
- Add comments only when they improve clarity.


## Context

- Served via XAMPP Apache under `C:\xampp\htdocs\jotaese\pacman`
- Intended to be a Pacman game (likely browser-based, given the webroot location)

## No existing conventions

This is a greenfield project. Any framework, tooling, and structure choices are unconstrained. If adding build / test / lint tooling, document them here once settled.
