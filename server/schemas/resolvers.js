const { AuthenticationError } = require("apollo-server-express");
const { User, Group, Note } = require("../models");
const { signToken } = require("../utils/auth");
const { findById } = require("../models/Note");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // if (context.user) {
       const foundUser = await User.findOne({ _id: context.user._id }).populate('groups');
        
       console.log("foundUser:", foundUser )
       return foundUser
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
    groups: async () => {
      return await Group.find();
    },
    group: async (parent, { _id }) => {
      return await Group.findById(_id);
    },
    user: async (parent, { _id }) => {
      return await User.findById(_id);
    },
    users: async () => {
      return await User.find();
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
    addGroup: async (
      parent,
      { groupName, gameName, gameDescription, gameImage },
      context
    ) => {
      const newGroup = await Group.create({
        groupName,
        gameName,
        gameDescription,
        gameImage,
        groupOwner: context.user,
        groupMembers: [context.user._id],
      });
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
      // return newGroup;
    },
    updateGroup: async (
      parent,
      { _id, groupName, gameName, gameDescription, gameImage, groupOwner},
      context
    ) => {
      console.log(context);
      if (context.user) {
        return await Group.findByIdAndUpdate(_id, {
          groupName: groupName,
          gameName: gameName,
          gameDescription: gameDescription,
          gameImage: gameImage,
          groupOwner: groupOwner,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    deleteGroup: async (parent, { _id }, context) => {
      await Group.findOneAndDelete({ _id: _id });

      return await User.updateMany(
        { groups: _id },
        { $pull: { groups: _id } },
        { new: true }
      );
    },
    changeOwner: async (parent, { _id, username, email }, context) => {
      if (context.user._id == context.group.groupOwner._id) {
        const newOwner = {
          _id: _id,
          username: username,
          email: email,
        };
        return await Group.findByIdAndUpdate(
          { _id: context.group._id },
          {
            groupOwner: newOwner,
          },
          {
            new: true,
          }
        );
      }
      throw new AuthenticationError("Only the group owner can change this");
    },
    addNote: async (parent, { groupId, noteText, noteAuthor, category }, context) => {
      console.log('note user context:', context.user)
      if (context.user) {
        console.log('Step 1');
        const noteToAdd = await Note.create({
          noteText: noteText,
          // noteAuthor: context.user.username,
          noteAuthor: noteAuthor,
          category: category,
        });
        console.log("addNote",noteToAdd)
      
        await Group.findOneAndUpdate(
          {
            _id: groupId, //_id: context.group._id
          },
          {
            $addToSet: { notes: noteToAdd },
          },
          {
            new: true,
          }
        );
        return noteToAdd;
      }
    },
    deleteNote: async (parent, { _id }, context) => {
      if (context.user) {
        await Note.findOneAndDelete({ _id: _id });
        return await Group.findOneAndUpdate(
          {
            _id: context.group._id,
          },
          {
            $pull: { notes: { _id: _id } },
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
    addMember: async (parent, { _id, groupId }, context) => {
      // console.log(context);
      // if (context.user) {
        // const user = User.findById(_id);
        // console.log("hello", user);

      // const group = Group.findById(groupId);
      const group = await Group.findByIdAndUpdate(
        { _id: groupId }, 
        { $addToSet: { groupMembers: context.user._id } },
        {
          new: true,
        }
      );
      console.log("this", group);

      return await User.findOneAndUpdate(
        { _id: _id },
        {
          $addToSet: { groups: group },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      

      // }

      // throw new AuthenticationError('Not logged in');
    }
  },
};

module.exports = resolvers;
