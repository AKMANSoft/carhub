import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import useAuthUser from "./hooks/useAuthUser";
import { useNavigate } from "react-router-dom";


export default function MainLayout({ children }) {
    const authUser = useAuthUser()
    const isLoggedin = authUser.accessToken !== undefined && authUser !== null && authUser !== "";
    const navigate = useNavigate();
    const [loggedOut, setLoggedOut] = useState(false);

    const onLogout = () => {
        authUser.logout();
        navigate("/", { replace: true })
    }
    return (
        <div>
            <Header isLoggedin={isLoggedin} onLogout={onLogout} />
            <main className="mt-[220px] min-h-screen md:mt-[200px] lg:mt-[240px] xl:mt-[140px]">
                {children}
            </main>
            <Footer />
        </div>
    )
}