// Mock Drama Seeds API
module.exports = async (req, res) => {
    const dramas = [
        { title: "MP caught in Karen scandal", id: 1 },
        { title: "Salasya beaten at Nyayo Stadium", id: 2 },
        { title: "Woman’s loan death mystery", id: 3 }
    ];
    const randomDrama = dramas[Math.floor(Math.random() * dramas.length)];
    res.json(randomDrama);
};