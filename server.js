const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const path = require('path');
const typeDefs = require('./server/schemas/typeDefs');
const resolvers = require('./server/schemas/resolvers');
const db = require('./server/config/connection');
const app = express();
const PORT = process.env.PORT || 3001;


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

// Parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: false }));
// Parses incoming requests with JSON payloads
app.use(express.json());


// Serve client/build as static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => { // Start listening to incoming requests
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call async function to start the server
startApolloServer(typeDefs, resolvers);