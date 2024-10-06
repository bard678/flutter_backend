// controllers/programController.js
const ProgramModel = require('../models/programModel');

// Controller function to fetch all programs
const fetchPrograms = (req, res) => {
    ProgramModel.fetchPrograms((err, result) => {
        if (err) {
            return res.status(500).send('Failed to fetch programs');
        }
        res.json(result);
    });
};

module.exports = {
    fetchPrograms,
};
