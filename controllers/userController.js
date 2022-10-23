const { User, Thought } = require('../models');

module.exports = {

//! (/api/users)

// TODO: GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

// TODO: Get user by id
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID.' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

// TODO: POST new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

// TODO: PUT to update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((course) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID.' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

// TODO: DELETE to remove user by id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID.' })
          : Thought.deleteMany({ _id: { $in: user.thoughts} })
      )
      .then(() => res.json({ message: 'User and thoughts deleted.' }))
      .catch((err) => res.status(500).json(err));
  }

//! (/api/users/:userId/friends/:friendId)

// TODO: POST to add a new friend to a user's friend list
// TODO: DELETE to remove user by its id


};