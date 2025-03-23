// Mock leaderboard data
module.exports = async (req, res) => {
    const leaders = [
        { name: "Kibet", points: 1500 },
        { name: "Njeri", points: 1200 },
        { name: "Muthoni", points: 900 }
    ];
    res.json(leaders);
};