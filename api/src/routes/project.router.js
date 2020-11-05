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
router.delete('/:id', ProjectController.delete);

// Create Meeting Planning for project //TODO maybe meetings stuff other router
router.post('/:id/meeting', (req, res) => {
  // TODO create a meeting for this project
  res.json({status: "DEBUG"});
});

// Get all users for this project
router.get('/:id/user', ProjectController.getAllUsers);

// Add user to this project
router.post('/:id/user', ProjectController.addUser);

// Remove user from the project
router.delete('/:id/user/:userId');

module.exports = router;
