const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("graphql-express");
const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser);

app.use("/graphql", {
  schema: buildSchema(`
        rootQuery: {
            events: [String!]!
        }

        rootMutation: {
            getEvent(name: String) String
        }

        schema: {
            query: RootQuery
            mutation: RootMutation
        }
    `),
  rootValue: {
    events: () => {
      return ["Walkin", "Reading", "Sleeping"];
    },
    getEvents: args => {
      const name = args.name;
      return name;
    }
  },
  graphiql: true
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
