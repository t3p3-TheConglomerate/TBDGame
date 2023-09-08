const mongoose = require("mongoose");

const { Schema } = mongoose;
const Note = require("./Note");

const groupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
    trim: true,
  },
  gameName: {
    type: String,
    required: true,
  },
  gameDescription: {
    type: String,
  },
  gameImage: {
    type: String,
  },
  groupOwner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  groupMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  notes: [Note.Schema],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
