module.exports.typeDef = `
  type RootQuery {
    users(limit: Int): [User]
  }
`

module.exports.resolvers = {
  RootQuery: {
    users: (root, args, context) => {
      return new Promise((resolve, reject) =>
        context.db.users.find().limit(args.limit || 10).exec((err, users) => {
          if (err) {
            reject(err)
          } else {
            resolve(users)
          }
        })
      )
    }
  }
}
