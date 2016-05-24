module.exports.typeDef = `
  type Post {
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
    author: (post, args, context) => context.loaders.users.load(post.author),
    
    likers: (post, args, context) => context.loaders.users.loadAll(post.likers),

    likeCount: (post) => post.likers.length,
  }
}
