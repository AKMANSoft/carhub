import { useNavigate, useSearchParams } from "react-router-dom"
import React from "react"
import useCarSearchUsers from "../components/hooks/buyersFetcher"
import useAuthUser from "../components/hooks/useAuthUser"
import MainLayout from "../components/layout"
import LoaderEl from "../components/loader"
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS"


export default function FindMeBuyerPage() {
    const authUser = useAuthUser();
    const [searchParams, _] = useSearchParams();
    const navigate = useNavigate();
    const { data: buyers, isLoading, error } = useCarSearchUsers(authUser.accessToken, searchParams.get("car_id"))


    React.useEffect(() => {
        if (searchParams.get("car_id") === null) {
            navigate("/");
        }
    }, [])

    return (
        <MainLayout secureRoute={true}>
            <div className={"flex justify-center py-10" + MAIN_HORIZONTAL_PADDING}>
                {
                    isLoading || error ?
                        <LoaderEl containerClassName="w-full h-[400px]" />
                        :
                        buyers?.length > 0 ?
                            <div>

                            </div>
                            :
                            <div className="w-full h-52 flex flex-col gap-1 items-center justify-center text-center">
                                <p className="text-lg text-gray-700">
                                    No customers have searched for this car yet.
                                </p>
                            </div>
                }
            </div>
        </MainLayout>
    )
}