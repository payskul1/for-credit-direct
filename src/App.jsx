import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/layout";
import Welcome from "./pages/Welcome";
import CheckoutPage from "./pages/CheoutPage";
import CheckJson from "./pages/CheckJson";
import StudentLoanForm from "./pages/studentLoanForm";
import StudentLoan from "./components/steps/StudentLoan";
import ErrorBoundary from "./components/ErrorBoundary";


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
        { path: "/check-json", element: <CheckJson /> },
        { path: "/loan", element: <StudentLoanForm /> },
        { path: "/school", element: <StudentLoan /> },


        { index: true, element: <Welcome /> },
        { path: "*", element: <h1>404</h1>}
      ],
    },
  ]);

  return <RouterProvider router={router} />;

}

export default App;



function ErrorBoundaryFallback() {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Page Error</h2>
        <p className="text-gray-600 mb-4">
          Something went wrong loading this page.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}