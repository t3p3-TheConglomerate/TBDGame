const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const noteSchema = new Schema({
  noteText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  noteAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  category: {
    type: String
  },
  comments: [
    {
      commentText: {
        type: String,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
