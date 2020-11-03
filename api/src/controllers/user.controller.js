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
      .then((result) => { // TODO not return password
        res.json({success: true, result: result});
      })
      .catch((error) => {
        res.json({success: false, result: error});
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
      res.json(user);
    })
    .catch((error) => {
      res.status(404);
      res.json({error:"User does not exist."});
    })
};

/**
 * Update a User based on the given id in request params.
 * @param {*} req 
 * @param {*} res 
 */
exports.update = async (req, res) => {
  UserModel.updateOne({_id: req.params.id},req.body)
  .then(()=> {
    UserModel.findById(req.params.id)
      .then((user) => {
        res.json(user);
      });
  })
  .catch((error) => {
    res.status(404);
    res.json({error: "User does not exist."})
  });
};

/**
 * Delete a user with given id from request params.
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = async (req, res) => {
  UserModel.deleteOne({_id: req.params.id})
  .then((result) => {
    res.status(204).send();
  })
  .catch((error) => {
    res.status(404);
    res.send({error: "Could not delete the user."});
  });
};
