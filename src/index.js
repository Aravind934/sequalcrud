import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

let errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map((message) => {
      alert(`graphql errors ${message}`);
      return null;
    });
  }
});

let link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:8000/graphql" }),
]);

let client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
