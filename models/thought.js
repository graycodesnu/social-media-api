const { Schema, model, Types } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true, 
      maxLength: 280, 
      minLength: 4, 
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // TODO: Use a getter method to format the timestamp on query
    },
    username: {
      type: String, 
      required: true
    },
    reactions: {
      reactionSchema
    }
  }
)

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // TODO: Use a getter method to format the timestamp on query
    },
    toJson: {
      getters: true
    }
  }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;