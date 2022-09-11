import { InMemoryCache, ApolloClient } from "@apollo/client";
import { createApolloProvider } from "@vue/apollo-option";

const dateParse = (isoFormatDateString: string) => {
  return new Date(Date.parse(isoFormatDateString));
};

const cache = new InMemoryCache({
  typePolicies: {
    Schedule: {
      fields: {
        date: {
          read(date) {
            return dateParse(date);
          },
        },
      },
    },
  },
});

const apolloClient = new ApolloClient({
  cache,
  uri: "http://localhost:5044/graphql",
});

export const provider = createApolloProvider({
  defaultClient: apolloClient,
});
