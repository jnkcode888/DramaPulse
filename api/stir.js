// Influence handler
module.exports = async (req, res) => {
    const success = Math.random() > 0.5; // 50% base chance
    const message = success ? "He’s hiding something! Drama amplified!" : "Stir failed, drama unchanged.";
    res.json({ success, message });
};