import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home.jsx";
import Survey from "./pages/survey.jsx";
import SurveyResult from "./pages/SurveyResult.jsx";
import LandPage from "./pages/LandPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
