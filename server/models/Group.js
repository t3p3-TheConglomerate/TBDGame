const mongoose = require("mongoose");

const { Schema } = mongoose;
const Note = require("./Note");

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
      type: String,
    },
    groupMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    notes: [Note.schema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
