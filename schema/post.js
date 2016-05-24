module.exports.typeDef = `
  type Post {
    id: ID!
    date: String!
    author: User!
    title: String!
    text: String!
    likers: [User!]
    likeCount: Int!
  }
`

module.exports.resolvers = {
  Post: {
    id: (post) => post._id,

    author: (post, args, context) => context.loaders.users.load(post.author),

    likers: (post, args, context) => context.loaders.users.loadAll(post.likers),

    likeCount: (post) => post.likers.length,
  }
}
