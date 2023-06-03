//Imports
import React from "react";
import ReactDOM from "react-dom/client";
//Global Styles
import { GlobalStyle } from "./styles/global-styles";
//Theme Provider
import { ThemeProvider } from "styled-components";
//Theme
import { theme } from "./styles/theme";
//Components
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
            <GlobalStyle />
        </ThemeProvider>
    </React.StrictMode>
);
