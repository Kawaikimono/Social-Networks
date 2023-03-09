const express = require("express");
const router = express.Router();
const { Thought, Reaction, User } = require("../models");
const ObjectId = require("mongodb").ObjectId

// * `GET` all users
router.get('/',(req, res) => {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err))});

// * `GET` a single user by its `_id` and populated thought and friend data
router.get('/:id',(req, res) => {
    User.findOne({ _id: req.params.id })
    .populate("thoughts")
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))});

// * `POST` a new user:
router.post('/',(req, res) => {
    User.create(req.body)
    .then(res.json("User created!"))
    .catch((error) => res.status(500).json(error));
}),

// update
router.put('/:id',(req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        {
            username: req.body.username,
            email: req.body.email
        },
        {
            new: true
        }
    )
    .then(res.json("User Updated!"))
    .catch((error) => res.status(500).json(error));
});
``

// * `DELETE` to remove user by its `_id`
router.delete('/:id',(req, res) => {
User.findOneAndDelete({ _id: req.params.id })
        .then(res.json("User deleted!"))
        .catch((error) => res.status(500).json(error));})

module.exports = router;