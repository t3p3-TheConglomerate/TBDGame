const { AuthenticationError } = require("apollo-server-express");
const { User, Group, Note } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    groups: async () => {
      return await Group.find();
    },
    group: async (parent, { _id }) => {
      return await Group.findById(_id);
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate(
          "group.groupMembers"
        );

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    addGroup: async (parent, { newGroup }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { groups: newGroup },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateGroup: async (
      parent,
      { _id, groupName, gameDescription, gameImage },
      context
    ) => {
      console.log(context);
      if (context.user) {
        return await Group.findByIdAndUpdate(_id, {
          groupName: groupName,
          gameName: gameName,
          gameDescription: gameDescription,
          gameImage: gameImage,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    deleteGroup: async (parent, { groupId }, context) => {
      await Group.findOneAndDelete({ _id: groupId });

      return await User.updateMany(
        { groups: groupId },
        { $pull: { groups: groupId } },
        { new: true }
      );
    },
    changeOwner: async (parent, { groupOwner }, context) => {
      if (context.user._id == context.group.groupOwner._id) {
        return await Group.findByIdAndUpdate(
          { _id: context.group._id },
          {
            groupOwner: groupOwner,
          },
          {
            new: true,
          }
        );
      }
      throw new AuthenticationError("Only the group owner can change this");
    },
    addNote: async (parent, { newNote }, context) => {
      if (context.user) {
        const noteToAdd = await Note.create({ newNote: newNote });
        return await Group.findOneAndUpdate(
          {
            _id: context.group._id,
          },
          {
            $addToSet: { notes: noteToAdd },
          },
          {
            new: true,
          }
        );
      }
    },
    deleteNote: async (parent, { noteId }, context) => {
      if (context.user) {
        await Note.findOneAndDelete({ noteId: noteId });
        return await Group.findOneAndUpdate(
          {
            _id: context.group._id,
          },
          {
            $pull: { notes: { noteId: noteId } },
          },
          {
            new: true,
          }
        );
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
