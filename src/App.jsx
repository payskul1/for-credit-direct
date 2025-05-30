import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/layout";
import Welcome from "./pages/Welcome";
import CheckoutPage from "./pages/CheoutPage";


function App() {
   useEffect(() => {
    // Get the visit count from localStorage
    const visitCount = localStorage.getItem("visitCount");

    // Convert to number and increment
    const newCount = visitCount ? parseInt(visitCount, 10) + 1 : 1;

    // Update localStorage
    localStorage.setItem("visitCount", newCount);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/check-out", element: <CheckoutPage />},

        { index: true, element: <Welcome /> },
        { path: "*", element: <h1>404</h1>}
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
