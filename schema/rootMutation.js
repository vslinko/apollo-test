module.exports.typeDef = `
  type RootMutation {
    updatePostTitle(id: ID!, title: String): Post!
  }
`

module.exports.resolvers = {
  RootMutation: {
    updatePostTitle: (root, args, context) => {
      return new Promise((resolve, reject) =>
        context.db.posts.update({ _id: args.id }, { $set: {title: args.title } }, { returnUpdatedDocs: true }, (err, numAffected, post) => {
          if (err) {
            reject(err)
          } else if (numAffected === 0) {
            reject(new Error(`Uknown post "${args.id}"`))
          } else {
            resolve(post)
          }
        })
      )
    }
  }
}
