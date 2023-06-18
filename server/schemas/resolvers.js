const { AuthenticationError } = require('apollo-server-express')
const { User } = require('../models');
const { signToken } = require('../utils/auth');

resolvers = {
    Qurery: {
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId })
        },

        me: async (parent, args, context) => {
            if (context.user) {
                return Profile.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        login: async (parent, { username, email, password }) => {
            const user = await User.findOne({ $or: [{ email }, { username }] });

            if (!user) {
                throw new AuthenticationError('No profile with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, { username, email, password }) => {
            const user = User.create({ username, email, password });
            const token = signToken(user)

            return { token, user }
        },

        saveBook: async (parent, { userId, saveBook }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { savedBooks: saveBook } },
                    { new: true }
                );
            }

            throw new AuthenticationError('You are not logged in!!')
        },

        removeBook: async (parent, { bookId, saveBook }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: bookId },
                    { $pull: { savedBooks: saveBook } },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
}
