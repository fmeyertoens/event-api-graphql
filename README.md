# GraphQL Event Management Server

A backend server for managing users and events with a GraphQL API.

## Workspace Relationship

This is the GraphQL backend used by the sibling [`../rest-graphql`](../rest-graphql) comparison client. The client sends a `POST` request to this server's `/api` endpoint and expects the `events` query to return event objects with `id`, `title`, `price`, `description`, and `date`.

The sibling [`../people-api`](../people-api) project offers a REST representation of similar event and user data. It is a separate application, not an HTTP dependency of this server. Both backends use the same `MONGO_URI` in the Compose stack so they query the same event data.

### Local integration

The comparison client offers `http://localhost:8000/api` as its local GraphQL URI. To use that setting, set `PORT=8000` here, set `MONGO_URI`, start this server, start the REST API separately (normally on port 5000), then run the frontend. Other ports work when the client setting is updated to match. The parent `rest-graphql-comparison` repository supplies a four-container Compose setup, including MongoDB, and mounts the shared fixture at runtime for `eventsLocal`.

## Project Overview

This is a GraphQL-based event management system that allows users to create and manage events. The server provides a robust API for querying and managing user and event data with persistence in MongoDB.

## Technologies

- **Express.js** — HTTP server framework
- **GraphQL** — Query language and API specification
- **MongoDB + Mongoose** — Database and object data modeling
- **TypeScript** — Type-safe JavaScript
- **Nodemon** — Development server with auto-reload
- **CORS** — Cross-Origin Resource Sharing support

## Data Model

### User

- `id` (ID) — Unique identifier
- `email` (String) — User email
- `password` (String) — User password
- `name` (String) — User name
- `createdEvents` ([Event]) — Events created by the user

### Event

- `id` (ID) — Unique identifier
- `title` (String) — Event title
- `description` (String) — Event description
- `price` (Float) — Event price
- `date` (String) — Event date
- `creator` (User) — User who created the event

## GraphQL API Endpoints

The GraphQL endpoint is available at `/api` with the following queries:

### Query Operations

```graphql
# Fetch events with optional amount parameter (default: 100)
query {
  events(amount: 50) {
    id
    title
    description
    price
    date
    creator {
      id
      email
      name
    }
  }
}

# Fetch events from the Compose-mounted shared fixture
query {
  eventsLocal {
    id
    title
    description
    price
    date
    creator {
      id
      email
      name
    }
  }
}

# Fetch all users
query {
  users {
    id
    email
    name
    createdEvents {
      id
      title
    }
  }
}

# Health check
query {
  test
}
```

The `eventsLocal` query reads the canonical `mongo/seed/event-mock-100.json` fixture mounted by Docker Compose. It is unavailable when this server runs standalone unless that fixture is supplied at the expected runtime path.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB connection URI (set in `.env`)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```env
MONGO_URI=mongodb://username:password@host:27017/events?authSource=admin
PORT=8000
```

### Running the Server

**Development mode** (with hot-reload):

```bash
npm run dev
```

**Production build**:

```bash
npm run build
```

**Start production server**:

```bash
npm start
```

The server will listen on the port specified in your `.env` file. Port `8000` matches the local GraphQL URI offered by the comparison client; any available port can be used when its client setting is updated.

## Health check

`GET /health` returns a successful status when the HTTP server is running. Docker Compose uses this endpoint to determine whether the service is ready for the frontend proxy.

## GraphiQL

When the server is running, you can access the GraphQL explorer at:

```
http://localhost:PORT/api
```

This interactive interface allows you to write and test GraphQL queries directly in your browser.

## Project Structure

```
.
├── src/
│   ├── index.ts              # Server entry point
│   ├── schema/
│   │   └── index.ts          # GraphQL schema definition
│   ├── resolvers/
│   │   ├── index.ts          # Resolver exports
│   │   ├── event.ts          # Event resolvers
│   │   └── user.ts           # User resolvers
│   ├── user/
│   │   ├── user.interface.ts # User TypeScript interface
│   │   └── user.model.ts     # User Mongoose model
│   └── event/
│       ├── event.interface.ts # Event TypeScript interface
│       └── event.model.ts    # Event Mongoose model
├── package.json
├── tsconfig.json
├── nodemon.json
└── README.md
```
