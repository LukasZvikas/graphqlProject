const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("graphql-express");
const { buildSchema} = require("graphql");

const app = express();

app.use(bodyParser);

app.use('/graphql', {
    schema: buildSchema(`
        
    `),
    rootValue: {}
})

const PORT = process.env.PORT || 5000;

app.listen(PORT);
