const mongoose = require('../db/conn');

const { Schema } = mongoose;

const Comment = mongoose.model(
  'Comment',
  Schema(
    {
      commentText: { type: String, required: true },
      user: { type: Object, required: true },
      post: { type: Object, required: true },
    },
    { timestamps: true },
  ),
);

module.exports = Comment;
