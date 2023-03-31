const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {

   me: async (parent, args, context) => {
    if (context.user) {
      return User.findOne({ _id: context.user._id }).populate('savedBooks');
    }
    throw new AuthenticationError('You need to be logged in!');
  },
},



  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { authors, description, title, bookId, image }, context) => {
      
      if (context.user) {
        const { _id: userId } = context.user;
        const book = { authors, description, title, bookId, image };
        console.log(book);
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { books: book },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    },
   
    removeBook: async (parent, { userId, book }, context) => {
      if (context.user) {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { books: book } },
        { new: true }
      );
    }
  },
}
};

module.exports = resolvers;
