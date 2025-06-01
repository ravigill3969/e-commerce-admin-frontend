import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login";
import InActiveProduct from "./pages/InActiveProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/inactivr-p",
    element: <InActiveProduct />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
