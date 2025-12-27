const express = require('express');
const feedbackProject = require('../controllers/feedbackController');

const router = express.Router();

router.post('/sendfeedback', feedbackProject.create);

module.exports = router;