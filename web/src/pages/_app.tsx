import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/globalStyle";
import { theme } from "../styles/theme";
import { createClient, Provider, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {},
      },
    }),
    fetchExchange,
  ],

  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider value={client}>
        <GlobalStyle />
        <ToastContainer />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
