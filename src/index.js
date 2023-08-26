import React from "react";
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthForm from "./components/auth-form/auth";
import NavigationBar from "./components/navigation-bar/navigation-bar";
import { UserProvider } from "./contexts/user-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "signIn",
        element: <AuthForm />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </UserProvider>
  </React.StrictMode>
);
