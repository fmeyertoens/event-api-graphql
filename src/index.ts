import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import 'dotenv/config';

import schemaDefinition from './schema/index';
import resolvers from './resolvers/index';

const app = express();

app.use(bodyParser.json());
// set Access-Control-Max-Age Header to cache Options request
app.use(cors({maxAge: 600}));
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(
  '/api',
  graphqlHTTP({
    schema: schemaDefinition,
    rootValue: resolvers,
    graphiql: true
  })
);

const { MONGO_URI, PORT = '8000' } = process.env;

async function start() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI must be set');
  }

  await mongoose.connect(MONGO_URI);

  app.listen(Number(PORT), () => {
    console.log(`App listening on Port: ${PORT}`);
  });
}

start().catch(error => {
  console.error('Unable to start GraphQL server', error);
  process.exitCode = 1;
});
