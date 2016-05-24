const { apolloServer } = require('graphql-tools')
const express = require('express')
const schema = require('./schema')
const { connect, createLoaders } = require('./db')

const app = express()
const db = connect()
const loaders = createLoaders(db)

app.use('/graphql', apolloServer({
  schema,
  graphiql: true,
  context: {
    db,
    loaders,
  },
}))

app.listen(3000)
