const router = require('express').Router();

// Controller
const UserController = require('../controllers/user.controller');

// Create user
router.post('/', UserController.create);

// Log user in
router.get('/login', (req, res) => {
  // TODO log user in
  res.json({status: "DEBUG"});
});

// Log user out
router.get('/logout', (req, res) => {
  // TODO log user out
  res.json({status: "DEBUG"});
});

// Get user by user id
router.get('/:id', UserController.getById);

// Update user by id
router.patch('/:id', UserController.update);

// Delete user by id
router.delete('/:id', UserController.delete);

module.exports = router;
