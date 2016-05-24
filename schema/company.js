module.exports.typeDef = `
  type Company {
    address: Address!
    suffixes: String!
    companyName: String!
    companySuffix: String!
    catchPhrase: String!
    bs: String!
    catchPhraseAdjective: String!
    catchPhraseDescriptor: String!
    catchPhraseNoun: String!
    bsAdjective: String!
    bsBuzz: String!
    bsNoun: String!
    team: [User!]
  }
`

module.exports.resolvers = {
  Company: {
    address: (company) => company.address,

    team: (company, args, context) => {
      return new Promise((resolve, reject) =>
        context.db.users.find({ company: company._id }, (err, users) => {
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
