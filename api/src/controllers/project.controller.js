const ProjectModel = require('../models/project.model');
const UserModel = require('../models/user.model');

/**
 * Create new project.
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * Get project based on id given in the request params.
 * @param {*} req 
 * @param {*} res 
 */
exports.getById = async (req, res) => {
  ProjectModel.findById(req.params.id)
    .then((project) => {
      res.json(project);
    })
    .catch((error) => {
      res.status(404);
      res.json({error:"Project does not exist."});
    })
};

/**
 * Update a project based on the id given in the request params.
 * @param {*} req 
 * @param {*} res 
 */
exports.update = async (req, res) => {
  // TODO update (care about subdocuments)
};
