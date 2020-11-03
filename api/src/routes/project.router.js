const router = require('express').Router();

// Controller
const ProjectController = require('../controllers/project.controller');

// Create project
router.post('/', ProjectController.create);

// Get project by id
router.get('/:id', ProjectController.getById);

// Update project by id
router.patch('/:id', ProjectController.update);

// Delete project by id
router.delete('/:id', (req, res) => {
  // TODO delete project by id
  res.json({status: "DEBUG"});
});

// Create Meeting Planning for project //TODO maybe meetings stuff other router
router.post('/:id/meeting', (req, res) => {
  // TODO create a meeting for this project
  res.json({status: "DEBUG"});
});

// Get all users for this project
router.get('/:id/user');

// Add user to this project
router.post('/:id/user');

// Remove user from the project
router.delete('/:id/user/:userId');

module.exports = router;
