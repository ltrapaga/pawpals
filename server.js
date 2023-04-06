const { ApolloServer } = require('apollo-server');
require('dotenv').config();

const typeDefs = require('./server/schemas/typeDefs');
const resolvers = require('./server/schemas/resolvers');
// const db = require('./server/config/connection');

const PORT = process.env.port || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
};
  
// Call async function to start the server
startApolloServer(typeDefs, resolvers);