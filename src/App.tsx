import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SigninPage from "./pages/auth/SigninPage"
import SignupPage from "./pages/auth/SignupPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import Header from "./components/Header"
import ProfilePage from "./pages/ProfilePage"

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
    },
    {
      path: "/profile",
      element: <ProfilePage />
    }
  ])

  return (
    <div>
      <Header />
      <main className="mt-[140px]">
        <RouterProvider router={router} />
      </main>
    </div>
  )
}

export default App
