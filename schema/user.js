module.exports.typeDef = `
  type User {
    address: Address!
    company: Company!
    firstName: String!
    lastName: String!
    findName: String!
    jobTitle: String!
    prefix: String!
    suffix: String!
    title: String!
    jobDescriptor: String!
    jobArea: String!
    jobType: String!
    avatar(width: Int!): Avatar
    followers: [User!]
    posts: [Post!]
  }
`

module.exports.resolvers = {
  User: {
    address: (user) => user.address,

    company: (user, args, context) => context.loaders.companies.load(user.company),

    avatar: (user, args) => {
      if (!user.avatar[args.width]) {
        return null
      }

      return {
        width: args.width,
        url: user.avatar[args.width],
      }
    },

    posts: (user, args, context) => {
      return new Promise((resolve, reject) =>
        context.db.posts.find({ author: user._id }, (err, posts) => {
          if (err) {
            reject(err)
          } else {
            resolve(posts)
          }
        })
      )
    },

    followers: (user, args, context) => context.loaders.users.loadAll(user.followers),
  }
}
