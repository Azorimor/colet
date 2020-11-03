const router = require('express').Router();

// Controller
const ProjectController = require('../controllers/project.controller');

router.post('/', ProjectController.create);

module.exports = router;
