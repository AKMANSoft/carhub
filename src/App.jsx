import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SigninPage from "./popups/SigninPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import Header from "./components/Header"
import ProfilePage from "./pages/ProfilePage"
import SignupPage from "./popups/SignupPage"
import SearchPage from "./pages/SearchPage"
import InboxPage from "./pages/InboxPage"
import MessagesPage from "./pages/MessagesPage"
import PostCarPage from "./pages/PostCarPage"

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
    },
    {
      path: "/search",
      element: <SearchPage />
    },
    {
      path: "/inbox",
      element: <InboxPage />
    },
    {
      path: "/post-car",
      element: <PostCarPage />
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
