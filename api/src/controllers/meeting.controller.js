const {serializeError} = require('serialize-error');

const MeetingModel = require('../models/meeting.model');
const UserModel = require('../models/user.model');

exports.create = async (req, res) => {
  const creator = await UserModel.findOne({_id: req.body.creator});
  const meeting = new MeetingModel({
    name: req.body.name,
    description: req.body.description,
    password: req.body.password,
    public: req.body.public,
    creator: creator,
  });
  meeting.save()
      .then((meeting) => {
        res.json({success: true, data: meeting});
      })
      .catch((error) => {
        res.json({
          success: false,
          error: serializeError(error),
          message: 'Could not create meeting.',
        });
      });
};

/**
 * Get meeting based on id given in the request params.
 * @param {*} req
 * @param {*} res
 */
exports.getById = async (req, res) => {
  MeetingModel.findById(req.params.id)
      .then((meeting) => {
        res.json({success: true, data: meeting});
      })
      .catch((error) => {
        res.status(404); // ? maybe remove this line
        res.json({
          success: false,
          error: serializeError(error),
          message: 'Could not recieve meeting.',
        });
      });
};

/**
 * Update a meeting based on the id given in the request params.
 * @param {*} req
 * @param {*} res
 */
exports.update = async (req, res) => {
  MeetingModel.updateOne({_id: req.params.id}, {
    name: req.body.name,
    description: req.body.description,
    password: req.body.password,
    public: req.body.public,
  })
      .then(()=> {
        MeetingModel.findById(req.params.id)
            .then((meeting) => {
              res.json({success: true, data: meeting});
            });
      })
      .catch((error) => {
        res.status(404); // ? maybe remove
        res.json({
          success: false,
          error: serializeError(error),
          message: 'Could not update meeting.',
        });
      });
};

/**
 * Delete a meeting with given id from request params.
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
  MeetingModel.deleteOne({_id: req.params.id})
      .then(() => {
        res.status(204).json({success: true, data: {}});
      })
      .catch((error) => {
        res.status(404);
        res.send({
          success: false,
          error: serializeError(error),
          message: 'Could not delete the meeting.',
        });
      });
};
