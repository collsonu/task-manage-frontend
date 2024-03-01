import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import { Home } from "./components/index.js";
import Task from "./pages/Task.jsx";
import Signup from "./pages/Signup.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import Edit from "./pages/Edit.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'task',
        element: <Task />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'task-create',
        element: <CreateTask />,
      },
      {
        path: 'task-edit',
        element: <Edit />,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
