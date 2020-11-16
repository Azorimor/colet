const router = require('express').Router();

// Other router
const UserRouter = require('./user.router');
const MeetingRouter = require('./meeting.router');

router.get('/', (req, res) => {
  res.json({
    status: 'API is working',
    message: 'Public API',
  });
});

router.use('/user', UserRouter);
router.use('/meeting', MeetingRouter);

module.exports = router;
