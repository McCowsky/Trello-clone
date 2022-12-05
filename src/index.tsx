import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { worker } from "./mocks/browser";
import { QueryClientProvider, QueryClient } from "react-query";
import { Router, Route, Outlet, ReactLocation, Link } from "@tanstack/react-location";
import HomePage from "./components/HomePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const routes: Route[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "app",
    element: (
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    ),
  },
];

const location = new ReactLocation();

worker.start();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router routes={routes} location={location}>
      <div className="w-full flex h-16 items-center text-xl font-semibold gap-10 max-w-[1460px] my-0 mx-auto">
        <Link to="/" className="h-full flex items-center hover:text-gray-400">
          Home
        </Link>
        <Link to="/app " className="h-full flex items-center hover:text-gray-400">
          Go to app
        </Link>
      </div>
      <Outlet />
    </Router>
  </React.StrictMode>
);
