import Footer from "./Footer";
import Header from "./Header";
import useAuthUser from "./hooks/useAuthUser";
import { Navigate, useNavigate } from "react-router-dom";


export default function MainLayout({ children, secureRoute = true }) {
    const authUser = useAuthUser()
    const isLoggedin = authUser.accessToken !== undefined && authUser !== null && authUser !== "";
    const navigate = useNavigate();

    const onLogout = () => {
        authUser.logout();
        navigate("/", { replace: true });
        window.location.reload();
    }
    return (
        <div>
            <Header isLoggedin={isLoggedin} onLogout={onLogout} />
            <main className="mt-[220px] min-h-screen md:mt-[200px] lg:mt-[240px] xl:mt-[140px]">
                {
                    secureRoute && !isLoggedin ?
                        <Navigate to={"/?p=signin"} replace />
                        :
                        children

                }
            </main>
            <Footer />
        </div>
    )
}