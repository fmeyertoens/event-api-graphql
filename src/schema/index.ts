import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    events: [Event!]!
    test: Boolean
  }

  type Event {
    id: ID!
    title: String!
    description: String!
    price: Float!
    date: String
    creator: User!
  }

  type User {
    id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
  }
`);

export default schema;
