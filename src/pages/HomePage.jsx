import CarGridItem from "../components/CarGridItem"
import useAuthUser from "../components/hooks/useAuthUser"
import useCarsFetcher from "../components/hooks/useCarsFetcher"
import MainLayout from "../components/layout"
import LoaderEl from "../components/loader"
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS"


export default function HomePage() {
    const authUser = useAuthUser();
    const { cars, isLoading, error } = useCarsFetcher(authUser.accessToken);


    return (
        <MainLayout secureRoute={false}>
            <div className={"flex justify-center py-10" + MAIN_HORIZONTAL_PADDING}>
                {
                    authUser.accessToken === undefined || authUser.accessToken === null || authUser.accessToken === "" ?
                        <div className="flex flex-col gap-4 items-center justify-center w-full h-96">
                            <h4 className="text-xl font-medium text-gray-800 text-center">
                                Unauthorized. Please signin to continue.
                            </h4>
                            <a href="/?p=signin" className="text-primary outline-none transition-all hover:underline">
                                Signin
                            </a>
                        </div>
                        :
                        isLoading || error ?
                            <LoaderEl containerClassName="w-full h-[400px]" />
                            :
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 md:gap-8">
                                {
                                    cars &&
                                    cars.map((car) => (
                                        <CarGridItem key={car.id} car={car} />
                                    ))
                                }

                            </div>
                }
            </div>
        </MainLayout>
    )
}