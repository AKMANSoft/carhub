import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import Header from "./components/Header"
import SearchPage from "./pages/SearchPage"
import InboxPage from "./pages/InboxPage"
import PostCarPage from "./pages/PostCarPage"
import FindMeBuyerPage from "./pages/FindMeBuyerPage"
import AccountPage from "./pages/AccountPage"
import Footer from "./components/Footer"
import PublicProfilePage from "./pages/PublicProfilePage"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />
    },
    {
      path: "/profiles/:id",
      element: <PublicProfilePage />
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
    },
    {
      path: "/find-me-buyer",
      element: <FindMeBuyerPage />
    },
    {
      path: "/account",
      element: <AccountPage />
    }
  ])

  return (
    <div>
      <Header />
      <main className="mt-[220px] md:mt-[200px] lg:mt-[240px] xl:mt-[140px]">
        <RouterProvider router={router} />
      </main>
      <Footer />
    </div>
  )
}

export default App
