const router = require('express').Router();

const MeetingController = require('../controllers/meeting.controller');

router.post('/', MeetingController.create);

router.get('/:id', MeetingController.getById);

// Update meeting by id
router.patch('/:id', MeetingController.update);

// Delete meeting by id
router.delete('/:id', MeetingController.delete);

module.exports = router;
