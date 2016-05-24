const { apolloServer } = require('graphql-tools')
const express = require('express')
const schema = require('./schema')
const { connect, createLoaders } = require('./db')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

const app = express()
const db = connect()
const loaders = createLoaders(db)

app.use(webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: '/app/',
}))

app.use('/graphql', apolloServer({
  schema,
  graphiql: true,
  context: {
    db,
    loaders,
  },
}))

app.get('/', (req, res) => {
  res.send(`
<!doctype html>
<h1> Hello World
<script src="/app/index.js" async defer></script>
`)
})

app.listen(3000)
