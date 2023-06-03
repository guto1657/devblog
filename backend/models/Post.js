const mongoose = require('../db/conn');

const { Schema } = mongoose;

const Post = mongoose.model(
  'Post',
  Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      image: { type: String, required: true },
      tags: { type: Array, required: true },
      user: { type: Object, required: true },
    },
    { timestamps: true },
  ),
);

module.exports = Post;
