import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { createRoot } from 'react-dom/client';
import { setContext } from 'apollo-link-context';

import App from './App';

// Create a new http link for the Apollo client with the GraphQL server URL
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
});
// Create a new authorization link for the Apollo client to pass the token with every request
const authLink = setContext(() => {
  // Get the JWT token from the local storage if it exists
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      // Set the authorization header with the token if it exists, otherwise an empty string
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});
// Create a new instance of the Apollo client with the authorization and http links and an in-memory cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// Create a new root element to render the App component
const root = createRoot(document.getElementById('root'));
// Render the App component within the ApolloProvider and the configured client
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

