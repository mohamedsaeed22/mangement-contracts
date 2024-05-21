import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import AppRouter from "./routes/AppRouter";
import store from "./store/index";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
// styles

import "./styles/global.css";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";

const defaultTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: [
      "Cairo",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
    ].join(","),
  },
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  </CacheProvider>
);
