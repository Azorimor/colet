const router = require('express').Router();

// Controller
const UserController = require('../controllers/user.controller');

router.post('/', UserController.create);

module.exports = router;
