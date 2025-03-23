let pulsePoints = 300; // Starting points
let firstBet = true; // Rig first bet to win
let dramaProgress = 0;

// Fetch initial drama seed
async function loadDrama() {
    const res = await fetch('/api/drama');
    const drama = await res.json();
    document.getElementById('drama-title').textContent = drama.title;
    startDramaMeter();
    startTimer();
}

// Update Drama Meter every 5 seconds
function startDramaMeter() {
    const meter = document.getElementById('meter-fill');
    const status = document.getElementById('drama-status');
    const interval = setInterval(() => {
        dramaProgress += 10;
        meter.style.width = `${dramaProgress}%`;
        status.textContent = dramaProgress < 50 ? 'Crowd growing!' : 'Drama iko moto sana!';
        if (dramaProgress >= 100) {
            clearInterval(interval);
            resolveDrama();
        }
    }, 5000);
}

// 10-minute countdown timer
function startTimer() {
    let timeLeft = 600; // 10 minutes in seconds
    const countdown = document.getElementById('countdown');
    const interval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdown.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeLeft <= 0) {
            clearInterval(interval);
            alert('Time’s up! Drama resolved.');
        }
    }, 1000);
}

// Handle betting
document.getElementById('bet-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const option = document.getElementById('bet-option').value;
    const amount = parseInt(document.getElementById('bet-amount').value);
    if (amount > pulsePoints) return alert('Not enough Points!');
    pulsePoints -= amount;
    updatePoints();
    const res = await fetch('/api/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option, amount, firstBet })
    });
    const result = await res.json();
    pulsePoints += result.winnings;
    updatePoints();
    alert(`Result: ${result.outcome ? 'You won!' : 'You lost.'} +${result.winnings} Points`);
    firstBet = false;
});

// Stir the Pot
document.getElementById('stir-btn').addEventListener('click', async () => {
    if (pulsePoints < 50) return alert('Need 50 Points to stir!');
    pulsePoints -= 50;
    updatePoints();
    const res = await fetch('/api/stir', { method: 'POST' });
    const stir = await res.json();
    document.getElementById('stir-result').textContent = stir.message;
    if (stir.success) dramaProgress += 5;
});

// Buy Points
document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const points = parseInt(btn.dataset.points);
        const ksh = parseInt(btn.dataset.ksh);
        pulsePoints += points;
        updatePoints();
        console.log(`Payment processed: KSh ${ksh}`);
    });
});

// Update UI
function updatePoints() {
    document.getElementById('pulse-points').textContent = pulsePoints;
    document.getElementById('ksh-balance').textContent = pulsePoints; // 1 Point = 1 KSh for simplicity
}

// Load leaderboard
async function loadLeaderboard() {
    const res = await fetch('/api/leaderboard');
    const leaders = await res.json();
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = leaders.map(l => `<li>${l.name}: ${l.points} Points</li>`).join('');
}

// Simulate notifications
setInterval(() => {
    if (Math.random() > 0.7) {
        alert('Breaking: CBD Chaos! Bet now!');
    }
}, 30000);

// Initial load
loadDrama();
loadLeaderboard();
updatePoints();