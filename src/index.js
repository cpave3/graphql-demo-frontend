import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloClient, InMemoryCache, ApolloProvider, from, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const oktaTokenStorage = JSON.parse(localStorage.getItem('okta-token-storage'));
const accessToken = oktaTokenStorage?.accessToken?.accessToken;

const httpLink = createHttpLink({
  uri: 'http://localhost/graphql',
});

// inject the access token into the Apollo Client
const authLink = setContext((_, { headers }) => {
  const token = accessToken;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink])
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
