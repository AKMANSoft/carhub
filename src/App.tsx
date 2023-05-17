import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SigninPage from "./pages/auth/SigninPage"
import SignupPage from "./pages/auth/SignupPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/signin",
      element: <SigninPage />
    },
    {
      path: "/signup",
      element: <SignupPage />
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
