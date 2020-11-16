const UserModel = require('../models/user.model');

/**
 * Create and save new user.
 * @param {*} req 
 * @param {*} res 
 */
exports.create = async (req, res) => {
  const user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  user.save()
      .then((user) => { // TODO not return password
        res.json({success: true, data: user});
      })
      .catch((error) => {
        res.json({success: false, error: serializeError(error), message: 'Could not create user.'});
      });
};

/**
 * Get user by id given in the request params.
 * @param {*} req 
 * @param {*} res 
 */
exports.getById = async (req, res) => {
  UserModel.findById(req.params.id)
    .then((user) => {
      res.json({success: true, data: user});
    })
    .catch((error) => {
      res.status(404);
      res.json({success: false, error: serializeError(error), message: 'Could not find user.'});
    })
};

/**
 * Update a User based on the given id in request params.
 * @param {*} req 
 * @param {*} res 
 */
exports.update = async (req, res) => {
  UserModel.updateOne({_id: req.params.id},{
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  .then(()=> {
    UserModel.findById(req.params.id)
      .then((user) => {
        res.json({success: true, data: user});
      });
  })
  .catch((error) => {
    res.status(404);
    res.json({success: false, error: serializeError(error), message: 'Could not update user.'})
  });
};

/**
 * Delete a user with given id from request params.
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = async (req, res) => {
  UserModel.deleteOne({_id: req.params.id})
  .then(() => {
    res.status(204).json({success: true, data: {}});
  })
  .catch((error) => {
    res.status(404);
    res.send({success: false, error: serializeError(error), message: 'Could not delete the user.'});
  });
};
