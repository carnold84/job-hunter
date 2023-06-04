import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import Root from "./layouts/Root/Root";
import HomePage from "./pages/HomePage/HomePage";
import StoreProvider from "./store";

const router = createBrowserRouter([
  {
    children: [
      {
        element: <HomePage />,
        path: "/",
      },
    ],
    element: <Root />,
    path: "/",
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);
