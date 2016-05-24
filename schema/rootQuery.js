module.exports.typeDef = `
  type RootQuery {
    users: [User]
  }
`

module.exports.resolvers = {
  RootQuery: {
    users: (root, args) => {
      return [{username: 'a'}]
    }
  }
}
