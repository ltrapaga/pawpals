import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import { createHttpLink } from 'apollo-link-http';

const httpLink = createHttpLink({
    uri: 'http://localhost:3001'
  });

const client = new ApolloClient({
  uri: httpLink,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);