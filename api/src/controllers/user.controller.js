const UserModel = require('../models/user.model');

// Create and save new user.
exports.create = (req, res) => {
  const user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password, // FIXME dont store password
  });
  user.save()
      .then((result) => {
        res.json({success: true, result: result});
      })
      .catch((error) => {
        res.json({success: false, result: error});
      });
};
