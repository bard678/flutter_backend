// models/programModel.js
const db = require('../config/db');

// Fetch all programs
const fetchPrograms = (callback) => {
    const query = 'SELECT * FROM programme';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching programs:', err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

module.exports = {
    fetchPrograms,
};
