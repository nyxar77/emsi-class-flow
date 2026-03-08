import { APITester } from "./APITester";
import "@/styles/index.css";

import { RouterProvider } from "react-router";
import { router } from "./Routes.tsx";

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
