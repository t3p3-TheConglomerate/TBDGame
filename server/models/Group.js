const mongoose = require("mongoose");

const { Schema } = mongoose;
const noteSchema = require("./Note");

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
    },
    gameName: {
      type: String,
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
    notes: [noteSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
