const { apolloServer } = require('graphql-tools');
const express = require('express');
const schema = require('./schema');

const app = express();

app.use('/graphql', apolloServer({
  schema,
  graphiql: true,
}));

app.listen(3000);
