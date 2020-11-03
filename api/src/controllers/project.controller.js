const ProjectModel = require('../models/project.model');
const UserModel = require('../models/user.model');

// Create and save new user.
exports.create = async (req, res) => {
  const owner = await UserModel.findOne({_id: req.body.owner});
  const project = new ProjectModel({
    name: req.body.name,
    description: req.body.description,
    password: req.body.password,
    public: req.body.public,
    owner: owner,
  });
  project.save()
      .then((result) => {
        res.json({success: true, result: result});
      })
      .catch((error) => {
        res.json({success: false, result: error});
      });
};
