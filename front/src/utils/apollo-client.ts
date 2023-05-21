import { ApolloClient, InMemoryCache } from '@apollo/client';

/*
export const client = new ApolloClient({
  uri: 'https://practicaopcional.deno.dev/graphql',
  cache: new InMemoryCache(),
});

*/

export const client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),

  });

  export const clientSSR = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),
    ssrMode: true,

    });