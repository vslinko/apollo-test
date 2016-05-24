const { makeExecutableSchema } = require('graphql-tools');

const modules = [
  require('./address'),
  require('./avatar'),
  require('./company'),
  require('./post'),
  require('./rootMutation'),
  require('./rootQuery'),
  require('./user'),
]

const typeDefs = modules
  .filter(module => !!module.typeDef)
  .map(module => module.typeDef)
  .concat([`
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `]);

const resolvers = modules
  .reduce((acc, module) => {
    if (!module.resolvers) return acc
    return Object.assign(acc, module.resolvers);
  }, {});

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
