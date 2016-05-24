module.exports.typeDef = `
  type User {
    username: String
  }
`

module.exports.resolvers = {
  User: {
    username: (root, args) => {
      return 'qwe'
    }
  }
}
