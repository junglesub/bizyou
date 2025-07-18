import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Survey from "./pages/Survey.jsx";
import SurveyResult from "./pages/SurveyResult.jsx";
import LandPage from "./pages/LandPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Home from "./pages/Home.jsx";
import PosterPage from "./pages/PosterPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/survey",
    element: <Survey />,
  },
  {
    path: "/result",
    element: <SurveyResult />,
  },
  {
    path: "/land",
    element: <LandPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/poster",
    element: <PosterPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
