const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');


const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reaction: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Reaction',
        },
      ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

ThoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reaction.length;
  });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

