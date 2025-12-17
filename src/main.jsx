import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import theme from "./style/theme.js";
import "@mantine/core/styles.css";

createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme} defaultColorScheme="auto">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>
);
