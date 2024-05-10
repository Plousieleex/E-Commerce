import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import Error from "./pages/error/error";
import Login from "./pages/login/login";
import NotFound from "./pages/notFound/notFound";
import MainLayout from "./layouts/mainLayout";
import Category from "./pages/category/category";
import { productLoader } from "./services/apiClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":parentCategory",
        element: <Category />,
        loader: ({ params }) => {
          return productLoader(params);
        },
      },
      {
        path: ":parentCategory/:subCategory",
        element: <Category />,
        loader: ({ params }) => {
          return productLoader(params);
        },
      },
      {
        path: ":parentCategory/:subCategory/:productCategory",
        element: <Category />,
        loader: ({ params }) => {
          return productLoader(params);
        },
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
