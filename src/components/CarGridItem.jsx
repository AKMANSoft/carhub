import { Menu, Transition } from "@headlessui/react";
import { handleTranslation } from "../lib/i18n";
import { cn, formatDate, formatPrice } from "../lib/utils";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import LoaderEl from "./loader";
import axios from "axios";
import { apiConfig } from "../config/api";


export default function CarGridItem({ car, className = "", type = "BUY", accessToken = null }) {
    const { trans } = handleTranslation()
    const [showLoading, setShowLoading] = useState(false);

    const handleDeleteCar = async () => {
        setShowLoading(true);
        try {
            const res = await axios.post(
                apiConfig.basePath + apiConfig.endpoints.deleteCar,
                {
                    car_id: car.id
                },
                {
                    headers: {
                        "Authorization": "Bearer " + accessToken
                    }
                }
            )
            console.log(res.data)
            if (res.data.success === true) {
                window.location.reload();
            }
        } catch (error) {
            console.log(error)
        }
        setShowLoading(false)
    }


    const handleMarkAsSoldCar = async () => {
        setShowLoading(true);
        try {
            const res = await axios.post(
                apiConfig.basePath + apiConfig.endpoints.markSoldCar,
                {
                    car_id: car.id
                },
                {
                    headers: {
                        "Authorization": "Bearer " + accessToken
                    }
                }
            )
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
        setShowLoading(false)
    }

    return (
        <div className={"w-full relative " + className}>
            {
                type === "SELL" && accessToken !== null && accessToken !== "" &&
                <CarOptionsDropMenu deleteCar={handleDeleteCar} markAsSold={handleMarkAsSoldCar} />
            }
            {
                showLoading &&
                <div className="absolute top-0 left-0 w-full h-full bg-white/40 rounded">
                    <LoaderEl containerClassName="w-full h-full" className="w-10 h-10" />
                </div>
            }

            <a href={`cars/${car.id}`}>
                <img src={car.car_images[0]?.image} loading="lazy" width={250} height={250}
                    className="w-full h-auto object-cover aspect-square overflow-hidden object-center rounded-md bg-gray-200" alt="" />
            </a>
            <div className="w-full">
                <h3 className="text-lg font-semibold text-gray-900 mt-2 line-clamp-2">
                    {car.make} {car.model}
                </h3>
                <p className="text-base font-semibold text-primary">
                    ${formatPrice(car.amount)}
                </p>
                <p className="text-sm font-normal text-gray-600">
                    {car.user_count} {trans("views")}
                </p>
                {
                    type === "BUY" &&
                    <p className="text-sm font-normal text-gray-600">
                        {trans("zip_code")}: {car.zip_code}
                    </p>
                }
                <p className="text-sm font-normal text-gray-600">
                    {trans("posted")}: {formatDate(new Date(car.created_at), "-")}
                </p>
                {
                    type === "SELL" && car.find_me_buyer &&
                    <div>
                        <a href={`/find-me-buyer?car_id=${car.id}`} className="btn-primary block text-center text-sm w-full px-4 py-1 mt-2 hover:bg-primary">
                            {trans("find_me_buyer")}
                        </a>
                    </div>
                }
            </div>
        </div>
    );
}



function CarOptionsDropMenu({ markAsSold, deleteCar }) {
    return (
        <div className="absolute top-2 right-5 w-4">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 p-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <FontAwesomeIcon icon={faEllipsisVertical}
                            className="h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {/* <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button className={cn(
                                        "group flex w-full items-center rounded px-2 py-2 text-sm text-gray-900",
                                        'ui-active:bg-primary ui-active:text-white',
                                    )}>
                                        Edit
                                    </button>
                                )}
                            </Menu.Item>
                        </div> */}

                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={markAsSold}
                                        className={cn(
                                            "group flex w-full items-center rounded px-2 py-2 text-sm text-gray-900",
                                            'ui-active:bg-primary ui-active:text-white',
                                        )}>
                                        Mark as Sold
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                            <Menu.Item>
                                <button
                                    onClick={deleteCar}
                                    className={cn(
                                        "group flex w-full items-center rounded px-2 py-2 text-sm text-gray-900",
                                        'ui-active:bg-primary ui-active:text-white',
                                    )}>
                                    Delete
                                </button>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div >
    )
}
