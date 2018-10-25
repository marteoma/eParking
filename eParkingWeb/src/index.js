import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Dashboard />
    </MuiThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
