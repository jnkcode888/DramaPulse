// Bet resolution logic
module.exports = async (req, res) => {
    const { option, amount, firstBet } = req.body;
    // Rig first bet to win, otherwise 60% house edge
    const outcome = firstBet ? true : Math.random() > 0.6;
    const winnings = outcome && option === 'yes' ? amount * 2 : 0;
    res.json({ outcome, winnings });
};