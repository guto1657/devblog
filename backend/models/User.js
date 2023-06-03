const mongoose = require('../db/conn');

const { Schema } = mongoose;

const User = mongoose.model(
  'User',
  Schema(
    {
      name: { type: String, required: true },
      password: { type: String, required: true },
      email: { type: String, required: true },
      image: { type: String, default: process.env.DEFAULT_PHOTO_URL },
    },
    { timestamps: true },
  ),
);

module.exports = User;
