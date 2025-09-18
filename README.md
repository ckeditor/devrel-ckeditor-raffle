# CKEditor Raffle 🎉

A beautiful, animated web-based raffle system that reads participant names from your `names.txt` file and selects winners with smooth spinning animations.

## Features

- **Smooth Animations**: Slot machine-style spinning effect with gradual slowdown
- **Fair Selection**: Uses cryptographically secure random number generation
- **Winner Celebration**: Confetti animation and winner highlight
- **Multiple Rounds**: Track previous winners and run multiple drawings
- **Responsive Design**: Works on desktop and mobile devices
- **Keyboard Support**: Press spacebar to start the raffle

## Quick Start

1. Open `index.html` in your web browser
2. The raffle will automatically load names from `names.txt`
3. Click "Start Raffle" or press spacebar to begin
4. Watch the spinning animation and celebrate the winner!

## File Structure

- `index.html` - Main raffle interface
- `styles.css` - Animations and responsive styling
- `script.js` - Raffle logic and name parsing
- `names.txt` - Your participant list (already included)
- `CLAUDE.md` - Development guidance

## Name Format

The raffle automatically parses your `names.txt` file which uses the format:
```
1→Brandon Wood,
2→Manasseh Abijah,
3→sarah etzl,
...
```

The system handles:
- Automatic number and arrow removal
- Trailing comma cleanup  
- Whitespace trimming
- Name normalization

## Usage

### Starting a Raffle
- Click the "Start Raffle" button or press spacebar
- Watch names spin for 3 seconds with high-speed animation
- Experience the dramatic slowdown effect
- Celebrate with confetti when the winner is revealed

### Multiple Rounds
- Previous winners are tracked and displayed
- Click "Reset" to clear all previous winners
- Run unlimited rounds with the same participant pool

### Mobile Support
- Fully responsive design works on all devices
- Touch-friendly buttons and interactions
- Optimized animations for mobile performance

## Customization

### Animation Timing
Edit `script.js` to adjust:
- Initial spin duration (default: 3 seconds)
- Slowdown effect timing
- Confetti duration and count

### Visual Styling  
Modify `styles.css` for:
- Color schemes and gradients
- Animation speeds and effects
- Layout and spacing
- Mobile responsiveness

### Participant Management
- Replace `names.txt` with your own participant list
- Maintains the same format: `number→Name,`
- Supports 100-200+ participants efficiently

## Technical Details

- **Pure JavaScript**: No frameworks or dependencies required
- **Secure Randomization**: Uses `crypto.getRandomValues()` for fair selection  
- **Performance Optimized**: Efficient animations with CSS transforms
- **Cross-Browser**: Compatible with modern browsers
- **Local File System**: Works offline, no server required

Enjoy your raffle! 🎲✨