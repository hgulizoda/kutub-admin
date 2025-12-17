import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import theme from "./style/theme.js";
import "@mantine/core/styles.css";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/query.js";

createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme} defaultColorScheme="auto">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </MantineProvider>
);
