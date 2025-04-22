const Save = require('../models/save');

exports.saveGameData = async (req, res) => {
    console.log('Received request to save game data:', req.body); // Log the request body
    const { userID, gameDate, failed, difficulty, completed, timeTaken } = req.body;

    console.log('Received data to save:', req.body); 

    try {
       
        if (!userID || !gameDate || difficulty === undefined || completed === undefined || timeTaken === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newSave = new Save({
            userID,
            gameDate,
            failed,
            difficulty,
            completed,
            timeTaken,
        });

        await newSave.save(); 
        res.status(201).json({ message: 'Game data saved successfully' });
    } catch (error) {
        console.error('Error saving game data:', error);
        res.status(500).json({ message: 'Error saving game data', error });
    }
};

exports.listGameData = async (req, res) => {
    const { userID } = req.params;

    try {
        const saves = await Save.find({}).sort({ gameDate: -1 });

        if (!saves || saves.length === 0) {
            return res.status(404).json({ message: 'No game data found for this user' });
        }

        res.status(200).json(saves);
    } catch (error) {
        console.error('Error retrieving game data:', error);
        res.status(500).json({ message: 'Error retrieving game data', error });
    }
}