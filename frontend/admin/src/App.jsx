import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import NotFound from "./pages/notFound/notFound";
import Login from "./pages/login/login";
import Error from "./pages/error/error";
import Customers from "./pages/customers/customers";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import ProductList from "./pages/products/productList";
import ProductCreate from "./pages/products/productCreate";
import Categories from "./pages/categories/categories";
import CreateCategory from "./pages/categories/createCategory";
import MainSidebar from "./layouts/mainSidebar";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainSidebar />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      { path: "products/create", element: <ProductCreate /> },
      {
        path: "categories",
        element: <Categories />,
      },
      { path: "categories/create", element: <CreateCategory /> },
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

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontSize: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: "40px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: "8px", minHeight: "40px" },
        multiline: { height: "120px" },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { width: 36, height: 36 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: "#E3E9EF" },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
