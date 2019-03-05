const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!,
  createdBy: User!
}

type User {
  _id: ID!
  userName: String!
  password: String
  email: String
  createdEvents: [Event!]
}

input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
}

input UserInput {
  userName: String!
  password: String
  email: String!
}

type RootQuery {
    events: [Event!]!
}
type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
