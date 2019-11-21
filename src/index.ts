import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';
import mongoose from 'mongoose';
import 'dotenv/config';

import schemaDefinition from './schema/index';
import resolvers from './resolvers/index';

const app = express();

app.use(bodyParser.json());

app.use(
  '/api',
  expressGraphQL({
    schema: schemaDefinition,
    rootValue: resolvers,
    graphiql: true
  })
);

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PATH,
  PORT
} = process.env;

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT);
    console.log(`App listening on Port: ${PORT}`);
  })
  .catch(err => {
    console.log(err);
  });
