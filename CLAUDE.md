# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a web-based raffle/drawing system for CKEditor-related participants. The application is a pure client-side web app with no build process or dependencies.

## Architecture

### Core Components
- `index.html` - Main application interface with raffle wheel and controls
- `script.js` - `RaffleService` class handling raffle logic, animations, and state management
- `styles.css` - Complete styling including animations, responsive design, and visual effects
- `names.txt` - Participant data (107 names, comma-separated format)
- `assets/` - Contains background.png and price.png images

### Key Features
- Slot machine-style spinning animation with gradual slowdown
- Cryptographically secure random winner selection using `crypto.getRandomValues()`
- Confetti celebration animation
- Previous winners tracking (displays last 5)
- Keyboard support (spacebar to start)
- Mobile responsive design

## Development

### Running the Application
Open `index.html` directly in a web browser - no build process or server required.

### Data Format
The `names.txt` file contains participants in the format:
```
Name,
Name,
...
```
The application automatically handles:
- Whitespace trimming
- Trailing comma removal
- Name normalization

### Architecture Notes
- Pure JavaScript ES6+ classes, no frameworks
- Uses modern Web APIs (fetch, crypto.getRandomValues)
- CSS animations for smooth visual effects
- Event-driven architecture with proper cleanup