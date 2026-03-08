import { createBrowserRouter, Outlet, useNavigate } from "react-router";
import Home from "@/pages/Home";
import Navbar from "@/ui/Navbar";
import ErrorElement from "./ErrorElement";

const Layout = () => (
  <div className="app">
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <ErrorElement
        onGoHome={() => {
          router.navigate("/");
        }}
      />
    ),
    children: [
      {
        index: true,
        element: <div>Hello World</div>,
      },
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);
