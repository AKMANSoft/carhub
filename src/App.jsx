import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import SearchPage from "./pages/SearchPage"
import InboxPage from "./pages/InboxPage"
import PostCarPage from "./pages/PostCarPage"
import FindMeBuyerPage from "./pages/FindMeBuyerPage"
import AccountPage from "./pages/AccountPage"
import PublicProfilePage from "./pages/PublicProfilePage"
import CarDetailsPage from "./pages/CarDetailsPage"
import { createContext, useEffect, useState } from "react"
import { useCookies } from 'react-cookie'
import axios from "axios"
import { apiConfig } from "./config/api"


export const AuthUserContext = createContext({
  accessToken: "",
  userProfile: null,
  logout: () => { }
});


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
      path: "/cars/:id",
      element: <CarDetailsPage />
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
  const [cookies, setCookies, removeCookie] = useCookies(["accessToken"]);
  const [userProfile, setUserProfile] = useState(null);


  useEffect(() => {
    if (cookies.accessToken !== undefined && cookies.accessToken !== null && cookies.accessToken !== "") {
      axios.get(
        apiConfig.basePath + apiConfig.endpoints.getProfile,
        {
          headers: {
            "Authorization": "Bearer " + cookies.accessToken
          }
        }
      )
        .then((response) => {
          if (response.data.success === true) {
            setUserProfile(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error)
          setUserProfile(null);
        })
    }
  }, [cookies])


  return (
    <AuthUserContext.Provider value={{
      accessToken: cookies.accessToken,
      userProfile: userProfile,
      logout: () => removeCookie("accessToken")
    }}>
      <RouterProvider router={router} />
    </AuthUserContext.Provider>
  )
}

export default App
