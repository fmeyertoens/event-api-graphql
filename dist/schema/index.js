"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = graphql_1.buildSchema(`
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
exports.default = schema;
