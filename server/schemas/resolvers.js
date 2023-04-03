const { AuthenticationError } = require('apollo-server-express');
const { User, Book} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {

   me: async (parent, args, context) => {
    console.log('queryme called')
    console.log(context.user)
    if (context.user) {
      return User.findOne({ _id: context.user._id })
      .populate('savedBooks');
    }
    throw new AuthenticationError('You need to be logged in!');
  },
},



  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      console.log('addUser resolver called');

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log('login called')
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

    saveBook: async (parent, { book }, context) => {
      console.log('savebook called');
      console.log(context.user._id);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id  },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
   
    removeBook: async (parent, { bookId }, context) => {
      console.log('remove book called')
      if (context.user) {
        // const book = await Book.findOne({ bookId: bookId });
        // console.log(book);
        // if (!book) {
        //   throw new Error(`${bookId} not found`);
        // }
        const updated = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        // console.log(book);
        // const removedBook = await Book.findOneAndDelete({ _id: book._id });
        return updated;
      }
        throw new AuthenticationError('You need to be logged in!');
      }
    }
  }


module.exports = resolvers;
