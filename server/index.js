const { ApolloServer } = require('apollo-server');

const { MONGODB } = require('./config/connection');

const PORT = process.env.port || 3001;

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })