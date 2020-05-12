import React from 'react';
import './App.css';
import config from 'react-global-configuration';
import Main from './compnents/Main';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        {/* App Component Has a Child Component called Main*/}
        <Main />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
