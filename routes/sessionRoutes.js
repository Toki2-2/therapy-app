const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/', sessionController.getAllSessions);
router.post('/', sessionController.createSession);

module.exports = router;