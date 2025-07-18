import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home/Home";
import HomeLayout from "../layout/HomeLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);
