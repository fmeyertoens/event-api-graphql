import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    events(amount: Int = 100): [Event!]!
    eventsLocal: [Event!]!
    users: [User!]!
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
