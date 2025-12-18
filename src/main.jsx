import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import theme from "./style/theme.js";
import "@mantine/core/styles.css";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/query.js";
import { Notifications } from "@mantine/notifications";
import "./i18n";
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ColorSchemeScript defaultColorScheme="light" />
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Notifications position="top-right" zIndex={2077} />
    </MantineProvider>
  </QueryClientProvider>
);
