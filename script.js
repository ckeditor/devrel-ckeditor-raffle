class RaffleService {
    constructor() {
        this.participants = [];
        this.previousWinners = [];
        this.isSpinning = false;
        this.currentNameIndex = 0;
        this.spinInterval = null;
        
        this.initializeElements();
        this.loadParticipants();
        this.bindEvents();
    }

    initializeElements() {
        this.startButton = document.getElementById('start-raffle');
        this.resetButton = document.getElementById('reset-raffle');
        this.nameDisplay = document.querySelector('.current-name');
        this.participantCount = document.getElementById('participant-count');
        this.winnerSection = document.getElementById('winner-section');
        this.winnerName = document.getElementById('winner-name');
        this.previousWinnersSection = document.getElementById('previous-winners');
        this.winnersList = document.getElementById('winners-list');
        this.wheelContainer = document.querySelector('.wheel-container');
        this.confettiContainer = document.getElementById('confetti-container');
    }

    async loadParticipants() {
        try {
            const response = await fetch('names.txt');
            const text = await response.text();
            
            this.participants = text
                .split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .map(line => {
                    const match = line.match(/^\s*\d+→(.+),?\s*$/);
                    return match ? match[1].trim() : line.replace(/^\d+→/, '').replace(/,$/, '').trim();
                })
                .filter(name => name.length > 0);
                
            this.participantCount.textContent = this.participants.length;
            
            if (this.participants.length === 0) {
                this.nameDisplay.textContent = 'No participants found!';
                this.startButton.disabled = true;
            } else {
                this.nameDisplay.textContent = 'Ready to Start!';
            }
            
        } catch (error) {
            console.error('Error loading participants:', error);
            this.nameDisplay.textContent = 'Error loading names!';
            this.startButton.disabled = true;
        }
    }

    bindEvents() {
        this.startButton.addEventListener('click', () => this.startRaffle());
        this.resetButton.addEventListener('click', () => this.resetRaffle());
    }

    startRaffle() {
        if (this.isSpinning || this.participants.length === 0) return;
        
        this.isSpinning = true;
        this.startButton.disabled = true;
        this.startButton.querySelector('.btn-text').textContent = 'Spinning...';
        this.hideWinnerSection();
        
        this.wheelContainer.parentElement.classList.add('spinning');
        
        this.startSpinAnimation();
        
        setTimeout(() => {
            this.slowDownAndStop();
        }, 3000);
    }

    startSpinAnimation() {
        let spinSpeed = 50;
        this.currentNameIndex = 0;
        
        this.spinInterval = setInterval(() => {
            this.nameDisplay.textContent = this.participants[this.currentNameIndex];
            this.currentNameIndex = (this.currentNameIndex + 1) % this.participants.length;
        }, spinSpeed);
    }

    slowDownAndStop() {
        clearInterval(this.spinInterval);

        this.wheelContainer.parentElement.classList.remove('spinning');
        this.wheelContainer.parentElement.classList.add('slowing');

        // Pre-select the winner to ensure animation stops on them
        const winnerIndex = this.getSecureRandomIndex();
        const winner = this.participants[winnerIndex];

        let slowSpinSpeed = 100;
        let iterations = 0;
        const maxIterations = 20;

        const slowSpinInterval = setInterval(() => {
            this.nameDisplay.textContent = this.participants[this.currentNameIndex];
            this.currentNameIndex = (this.currentNameIndex + 1) % this.participants.length;

            iterations++;
            slowSpinSpeed += 20;

            if (iterations >= maxIterations) {
                clearInterval(slowSpinInterval);
                // Land on the pre-selected winner
                this.nameDisplay.textContent = winner;
                setTimeout(() => this.selectWinner(winner), 500);
            }
        }, slowSpinSpeed);
    }

    selectWinner(winner) {
        // If winner is already provided, use it; otherwise generate one
        if (!winner) {
            const winnerIndex = this.getSecureRandomIndex();
            winner = this.participants[winnerIndex];
            this.nameDisplay.textContent = winner;
        }

        this.winnerName.textContent = winner;
        
        this.wheelContainer.parentElement.classList.remove('slowing');
        
        setTimeout(() => {
            this.showWinner(winner);
            this.createConfetti();
        }, 1000);
        
        this.previousWinners.push({
            name: winner,
            timestamp: new Date()
        });
        
        this.isSpinning = false;
        this.startButton.disabled = false;
        this.startButton.querySelector('.btn-text').textContent = 'Start Raffle';
        this.resetButton.style.display = 'inline-flex';
        
        this.updatePreviousWinners();
    }

    getSecureRandomIndex() {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return array[0] % this.participants.length;
    }

    showWinner(winner) {
        this.winnerSection.style.display = 'block';
        
        setTimeout(() => {
            this.winnerSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    }

    hideWinnerSection() {
        this.winnerSection.style.display = 'none';
    }

    updatePreviousWinners() {
        if (this.previousWinners.length === 0) return;
        
        this.previousWinnersSection.style.display = 'block';
        this.winnersList.innerHTML = '';
        
        this.previousWinners.slice(-5).reverse().forEach((winner, index) => {
            const tag = document.createElement('div');
            tag.className = 'winner-tag';
            tag.textContent = `${index + 1}. ${winner.name}`;
            this.winnersList.appendChild(tag);
        });
    }

    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                confetti.style.animationDelay = Math.random() * 1 + 's';
                
                this.confettiContainer.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 4000);
            }, i * 50);
        }
    }

    resetRaffle() {
        this.previousWinners = [];
        this.nameDisplay.textContent = 'Ready to Start!';
        this.hideWinnerSection();
        this.previousWinnersSection.style.display = 'none';
        this.resetButton.style.display = 'none';
        
        this.wheelContainer.parentElement.classList.remove('spinning', 'slowing');
        
        const confettiElements = this.confettiContainer.querySelectorAll('.confetti');
        confettiElements.forEach(confetti => confetti.remove());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new RaffleService();
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        const startButton = document.getElementById('start-raffle');
        if (!startButton.disabled) {
            startButton.click();
        }
    }
});