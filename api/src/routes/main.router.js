const router = require('express').Router();

// Other router
const UserRouter = require('./user.router');
const ProjectRouter = require('./project.router');

router.get('/', (req, res) => {
  res.json({
    status: 'API is working',
    message: 'Public API',
  });
});

router.use('/user', UserRouter);
router.use('/project', ProjectRouter);

module.exports = router;
