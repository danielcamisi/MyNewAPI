const express = require('express');
const projectController = require('../controllers/projectController');
const upload = require('../config/multer');

const router = express.Router();

// Definindo as rotas para projetos
router.post('/posting', upload.single('image'), projectController.createProject);
router.get('/', projectController.getAllProjects);
router.delete('/by-name/:projectname', projectController.deleteProjectByName);

module.exports = router;