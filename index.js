const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
const app = express();
const { isAuth } = require("./middleware/isAuth");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).send();
  }

  next();
});

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb://${keys.MONGO_USERNAME}:${
      keys.MONGO_PASSWORD
    }@ds155815.mlab.com:55815/graphql`
  )
  .then(() => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
