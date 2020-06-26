var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String,
    rollDice(numDice: Int!, numSides: Int): [Int],
    quoteOfTheDay: String,
    random: Float!,
    rollThreeDice: [Int]
  }
`);

var root = { 
  hello: () => 'Hello world!',
  quoteOfTheDay:() => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => Math.random(),
  rollThreeDice: () => {
    return [1,2,3].map(_ => Math.floor(Math.random() * 6) + 1)
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));