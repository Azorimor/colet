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
  ProjectModel.updateOne({_id: req.params.id},{
    name: req.body.name,
    description: req.body.description,
    password: req.body.password,
    public: req.body.public,
  })
  .then(()=> {
    ProjectModel.findById(req.params.id)
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
 * Delete a project with given id from request params.
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = async (req, res) => {
  ProjectModel.deleteOne({_id: req.params.id})
  .then((result) => {
    res.status(204).send();
  })
  .catch((error) => {
    res.status(404);
    res.send({error: "Could not delete the project."});
  });
};

/**
 * Add an user to the project. userId in body and user type in body.
 * @param {*} req 
 * @param {*} res 
 */
exports.addUser = async (req, res) => {
  if(req.body.anonym){ //TODO refactor deal with errors
    const project = await ProjectModel.findById(req.params.id);
    project.anonyms.push({
      name: req.body.name,
      email: req.body.email,
    });
    const updated = await project.save();
    res.json(updated);
    return;
  } else {
    UserModel.findById(req.body.userId)
    .then((user) => {
      ProjectModel.findById(req.params.id,)
        .then((project) => {
          project.users.push(user);
          project.save();
          res.status(204).send();
        });
    })
    .catch((error) => {
      res.status(404);
      res.send({error: "Could not add user."});
      
    })
    .finally(()=>{return;});
  }
  res.status(404).send({error: 'Could not add user.'});
};

/**
 * Get all users (and anonym) from the project. id provided in req.
 * @param {*} req 
 * @param {*} res 
 */
exports.getAllUsers = async (req, res) => {
  // FIXME runtime errors
  const project = await ProjectModel.findOne({_id: req.params.id});
  
};
