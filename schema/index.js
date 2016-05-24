const { makeExecutableSchema } = require('graphql-tools');

const modules = [
  require('./rootQuery'),
  require('./user'),
]

const typeDefs = modules
  .map(module => module.typeDef)
  .concat([`
    schema {
      query: RootQuery
    }
  `]);

const resolvers = modules
  .reduce((acc, module) => {
    return Object.assign(acc, module.resolvers);
  }, {});

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
