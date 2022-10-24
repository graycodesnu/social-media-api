const { User, Thought } = require('../models');

module.exports = {

//! (/api/users)

// GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

//! (/api/users/:userId)
// GET user by id
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

//! (/api/users)
// POST new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

//! (/api/users/:userId)
// PUT to update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID.' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

//! (/api/users/:userId)
// DELETE to remove user by id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID.' })
          : Thought.deleteMany({ _id: { $in: user.thoughts} })
      )
      .then(() => res.json({ message: 'User and thoughts deleted.' }))
      .catch((err) => res.status(500).json(err));
  },


//! (/api/users/:userId/friends/:friendId)

// POST to add a new friend to a user's friend list
  addFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(friendData => {
        !friendData
        ? res.status(404).json({ message: 'No friends with that ID.' })
        : res.json(friendData);
      })
      .catch(err => res.json(err));
  },

// DELETE to remove a friend from a user's friend list
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(userData => {
        !userData
        ? res.status(404).json({ message: 'No friends with that ID.' })
        : res.json(userData)
      })
      .catch(err => res.json(err));
    }

};