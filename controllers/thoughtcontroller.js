const express = require("express");
const router = express.Router();
const { Thought, Reaction, User } = require("../models");
const ObjectId = require("mongodb").ObjectId

// get all
router.get('/',(req, res) => {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err))});


// * `GET` to get a single thought by its `_id`
router.get('/:id',(req, res) => {
    Thought.findOne({ _id: req.params.id })
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err))});

// create post
router.post('/',(req, res) => {
    Thought.create(req.body)
    .then((thought) => {
        User.findOneAndUpdate(
        { _id: req.body.userid },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      ).then(res.status(200).json("Thought created!"));
    })
    .catch((err) => res.status(500).json(err))});

router.put('/:id',(req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
            new: true
        }
    )
    .then(res.json("Thought Updated!"))
    .catch((error) => res.status(500).json(error));
});


router.delete('/:id',(req, res) => {
    Thought.deleteOne({ _id: req.params.id })
    .then(res.json("Thought deleted!"))
    .catch((error) => res.status(500).json(error));})


module.exports = router;