import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastProvider } from "./components/ToastProvider";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // The backend has no pagination; a short staleTime keeps the
      // dashboard, list, and summary views in sync after mutations
      // without refetching on every focus change.
      staleTime: 30_000,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
