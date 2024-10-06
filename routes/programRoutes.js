// routes/programRoutes.js
const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');

// Define the route to fetch programs
router.get('/fetch-program', programController.fetchPrograms);

module.exports = router;
