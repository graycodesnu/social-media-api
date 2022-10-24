const { User, Thought } = require('../models');
const { param } = require('../routes/api/thoughtRoutes');

module.exports = {

//! (/api/thoughts)
// TODO: GET all thoughts 
  getThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .sort({ createdAt: -1 })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
          console.log(err);
          res.sendStatus(400);
      });
  },

//! (/api/thoughts/:thoughtId)
// TODO: GET thought by id
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thoughtData) => 
        !thoughtData
        ? res.status(400).json({ message: 'No thought with that ID.' })
        : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

//! (/api/thoughts)
// TODO: POST new thought (associate with posting user's id)
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(thoughtData => {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true, runValidators: true }
        )
        console.log(thoughtData);
        res.json(thoughtData);
      })
      .catch(err => res.json(err));
  },

//! (/api/thoughts/:thoughtId)
// TODO: PUT to update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, 
      { $set: body },
      { new: true, runValidators: true }
    )
      .then(thoughtData => {
        !thoughtData
          ? res.status(404).json({ message: 'No thought by that ID.' })
          : res.json(thoughtData)
      })
      .catch(err => res.json(err));
  },

//! (/api/thoughts/:thoughtId)
// TODO: DELETE to remove thought by its id 
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: param.thoughtId })
    .then((thoughtData) => 
    !thoughtData
      ? res.status(404).json({ message: 'No thought by that ID.' })
      : User.deleteMany({ _id: { $in: thoughtData.user }})
      )
      .then(() => res.json({ message: 'Thoughts for user deleted.' }))
      .catch((err) => res.status(500).json(err));
  },

//! (/api/thoughts/:thoughtId/reactions)
// TODO: POST to create a reaction stored in a single thought's **reactions** array field
  addReaction({ params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(thoughtData => {
        if(thoughtData) {
          res.status(404).json({ message: 'No reaction with this ID. '});
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.json(err));
  },


// TODO: DELETE to pull and remove a reaction by the reaction's **reactionId** value
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: {reactionId: params.reactionId } } },
      { new: true }
    )
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.json(err));
  }

};