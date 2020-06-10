const graphql = require('graphql');
const mongoose = require('mongoose');
const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql;
const SongType = require('./song_type');
const User = mongoose.model('user');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    songs: {
      type: new GraphQLList(SongType),
      resolve(parentValue) {
        return User.findSongs(parentValue.id);
      }
    }
  })
});

module.exports = UserType;
