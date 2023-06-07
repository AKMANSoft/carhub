import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import React, { createContext, Suspense, useEffect, useState } from "react"
import { useCookies } from 'react-cookie'
import axios from "axios"
import { apiConfig } from "./config/api"
import { SWRConfig } from "swr"

const CarDetailsPage = React.lazy(() => import("./pages/CarDetailsPage"))
const PublicProfilePage = React.lazy(() => import("./pages/PublicProfilePage"))
const AccountPage = React.lazy(() => import("./pages/AccountPage"))
const FindMeBuyerPage = React.lazy(() => import("./pages/FindMeBuyerPage"))
const PostCarPage = React.lazy(() => import("./pages/PostCarPage"))
const InboxPage = React.lazy(() => import("./pages/InboxPage"))
const SearchPage = React.lazy(() => import("./pages/SearchPage"))

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
      path: "/profiles/:id",
      element: (
        <Suspense>
          <PublicProfilePage />
        </Suspense>
      )
    },
    {
      path: "/cars/:id",
      element: (
        <Suspense>
          <CarDetailsPage />
        </Suspense>
      )
    },
    {
      path: "/search",
      element: (
        <Suspense>
          <SearchPage />
        </Suspense>
      )
    },
    {
      path: "/inbox",
      element: (
        <Suspense>
          <InboxPage />
        </Suspense>
      )
    },
    {
      path: "/post-car",
      element: (
        <Suspense>
          <PostCarPage />
        </Suspense>
      )
    },
    {
      path: "/find-me-buyer",
      element: (
        <Suspense>
          <FindMeBuyerPage />
        </Suspense>
      )
    },
    {
      path: "/account",
      element: (
        <Suspense>
          <AccountPage />
        </Suspense>
      )
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
