import React from "react";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import EditPofilePopup from "../popups/EditProfilePopup";
import { Navigate, useSearchParams } from "react-router-dom";
import TabbedView from "../components/TabbedView";
import { faArrowUpRightFromSquare, faCar, faChevronDown, faCreditCard, faEllipsisVertical, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import MainLayout from "../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthUser from "../components/hooks/useAuthUser";
import EditProfilePopup from "../popups/EditProfilePopup";
import LoaderEl from "../components/loader";
import useCarsFetcher from "../components/hooks/useCarsFetcher";
import { apiConfig } from "../config/api";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "preact";
import CarGridItem from "../components/CarGridItem";
import { handleTranslation } from "../lib/i18n";


export const accountPageTabs = [
    // {
    //     id: "payments-and-deposit-methods",
    //     name: "Payment & Deposit methods",
    //     icon: faCreditCard,
    //     content: (authUser) => <PaymentAndDepositMethodsSection />
    // },
    {
        id: "my-cars",
        name: "my_cars",
        icon: faCar,
        content: (authUser) => <MyCarsSection authUser={authUser} />
    },
    {
        id: "account-settings",
        name: "acc_settings",
        icon: faUser,
        content: (authUser) => <ProfileSection authUser={authUser} />
    }
]

export default function AccountPage() {
    const { trans } = handleTranslation()
    const authUser = useAuthUser();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = React.useState(() => {
        let queryTab = accountPageTabs.find((tb) => tb.id === searchParams.get("active")?.toLowerCase())
        if (queryTab === undefined || queryTab === null) return accountPageTabs[accountPageTabs.length - 1]
        else return queryTab
    });


    function setTab(tab) {
        setSearchParams("active=" + tab.id);
        setActiveTab(tab)
    }

    return (
        <MainLayout>
            {
                authUser.accessToken === undefined || authUser.accessToken === null || authUser.accessToken === "" ?
                    <Navigate to={"/?p=signin"} replace />
                    :
                    <div className={"py-10 md:py-20" + MAIN_HORIZONTAL_PADDING}>
                        <div className="w-full flex min-h-[600px] shadow border rounded-md bg-white">
                            <div className="w-1/4 hidden lg:block min-w-[300px] max-w-[300px] border-r pb-5">
                                <div className="">
                                    {
                                        accountPageTabs.map((tab) => (
                                            <button type="button" key={tab.id} onClick={() => setTab(tab)} className={
                                                "text-base font-normal border-b w-full text-start border-gray-100 text-black block py-5 px-4 transition-all last:border-none "
                                                + (activeTab.id === tab.id ? "text-primary bg-gray-100 font-semibold" : "hover:text-primary hover:bg-gray-100 hover:font-semibold")
                                            }>
                                                {trans(tab.name)}
                                            </button>
                                        ))
                                    }

                                </div>
                                {/* <div className="px-4 mt-10">
                                    <a href="/profiles/1" className={"text-base font-normal border-b border-transparent border-gray-100 transition-all text-primary hover:border-primary"}>
                                        View public profile
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-sm ml-2" />
                                    </a>
                                </div> */}
                            </div>
                            <div className="w-full relative pt-5">
                                <div className="mx-8 my-6 absolute -top-[41px] bg-white px-2">
                                    <h2 className="text-2xl text-gray-900 font-bold inline-flex items-center">
                                        {trans(activeTab?.name)}
                                    </h2>
                                </div>
                                {activeTab?.content(authUser)}
                            </div>
                        </div>
                    </div>
            }
        </MainLayout>
    );
}





function PaymentAndDepositMethodsSection() {
    return (
        <div className="px-5 py-10 md:p-10 max-w-[900px]">
            <TabbedView
                tabs={[
                    {
                        tabName: "Accounts",
                        content: () => (
                            <div className="bg-gray-50 p-3">
                                <div className="bg-white rounded-md px-6 py-5">
                                    <h4 className="text-gray-900 text-base pb-1 font-medium border-b border-gray-200">Balance</h4>
                                    <p className="text-gray-700 text-base font-normal mt-2">$ 0.0</p>
                                </div>
                                <div className="w-full flex items-center justify-between bg-white rounded-md px-6 py-4 mt-4">
                                    <h4 className="text-gray-900 text-base font-medium">
                                        Payment methods
                                    </h4>
                                    <a className="text-primary text-base font-medium">
                                        Add credit/debit card
                                    </a>
                                </div>
                            </div>
                        )
                    },
                    {
                        tabName: "Transactions",
                        content: () => (
                            <div>

                            </div>
                        )
                    }
                ]}
            />
        </div>
    );
}




function MyCarsSection({ authUser }) {
    const { trans } = handleTranslation();
    const { cars: myCars, isLoading, error } = useCarsFetcher(authUser.accessToken, null, "SELL");

    console.log(myCars)

    return (
        <div className="p-10">
            {
                isLoading || error ?
                    <LoaderEl className="" />
                    :
                    myCars?.length > 0 ?
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5 md:gap-8">
                            {
                                myCars &&
                                myCars.map((car) => (
                                    <CarGridItem car={car} type="SELL" accessToken={authUser.accessToken} />
                                ))
                            }
                        </div>
                        :
                        <div className="w-full h-52 flex flex-col gap-1 items-center justify-center text-center">
                            <p>
                                {trans("nothing_to_show")}
                            </p>
                            <a href="/post-car" className="text-primary transition-all hover:underline text-base">
                                {trans("add_car_to_sell")}
                            </a>
                        </div>
            }
        </div>
    );
}



function MyCarGridItem({ car }) {
    return (
        <a href={`cars/${car.id}`}>
            <div className="w-full relative">
                {/* <MyCarOptionsDropMenu /> */}
                <img src={car.car_images[0].image} width={200} height={200}
                    className="w-full h-auto object-cover aspect-square overflow-hidden object-center rounded-md" alt="" />
                <h3 className="text-base font-semibold mt-2 line-clamp-2">
                    {car.make} {car.model}
                </h3>

                {/* {
                    car.find_me_buyer &&
                    <button className="btn-primary text-sm w-full px-4 py-1 mt-2 hover:bg-primary">
                        Find Me Buyer
                    </button>
                } */}
            </div>
        </a>
    );
}


function MyCarOptionsDropMenu() {
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
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-primary text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        Edit
                                    </button>
                                )}
                            </Menu.Item>
                        </div>

                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`${active ? 'bg-primary text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        Delete
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}




function ProfileSection({ authUser = null }) {
    const { trans } = handleTranslation()
    const [activeTab, setActiveTab] = React.useState(1);

    return (
        authUser?.userProfile === null ?
            <LoaderEl dark />
            :
            <div className="w-full">
                {/* Profile Section */}
                <div className="flex flex-col md:flex-row gap-16 md:gap-2 justify-between items-center p-10">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                        {
                            <img src={authUser.userProfile.image} width={175} height={175} className="w-44 h-auto aspect-square object-cover object-center rounded-full border-4" alt="" />
                        }
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-semibold text-gray-800">
                                {authUser?.userProfile?.name ?? ""}
                            </h3>
                            {
                                authUser?.userProfile?.description && authUser?.userProfile?.description !== "" &&
                                <p className="text-base font-normal text-gray-600">
                                    {authUser?.userProfile?.description}
                                </p>
                            }
                            <p className="text-base font-normal text-gray-600">
                                {
                                    authUser?.userProfile?.user_address === null ?
                                        <span>
                                            Address not set.
                                        </span>
                                        :
                                        <span>
                                            {
                                                (authUser?.userProfile?.user_address?.city !== null && authUser?.userProfile?.user_address?.country !== null)
                                                &&
                                                `${authUser?.userProfile?.user_address?.city ?? ""} | ${authUser?.userProfile?.user_address?.country ?? ""}`
                                            }
                                        </span>

                                }
                            </p>
                            <div className="mt-5 inline-flex items-center gap-4">
                                <span className="text-sm font-normal text-white rounded-full px-2 py-0.5 bg-primary inline-flex items-center">
                                    <FontAwesomeIcon icon={faStar} className="text-xs mr-2" />
                                    {authUser?.userProfile?.average_rating ?? 0.0}
                                </span>
                                <p className="text-base font-normal text-gray-600">
                                    {authUser?.userProfile?.ratings_count ?? 0} {trans("reviews")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <EditProfilePopup authUser={authUser} />
                    </div>
                </div>
                {/* Reviews and Offers Section  */}
                {/* <div className="mt-10">
                    <div className="flex items-center justify-center gap-10 md:gap-20 lg:gap-40">
                        <button type="button" onClick={() => setActiveTab(0)} className={"text-lg font-semibold text-gray-800 px-5 py-2 border-b-4 rounded " + (activeTab === 0 ? "border-primary" : "border-transparent")}>
                            Offers
                        </button>
                        <button type="button" onClick={() => setActiveTab(1)} className={"text-lg font-semibold text-gray-800 px-5 py-2 border-b-4 rounded " + (activeTab === 1 ? "border-primary" : "border-transparent")}>
                            Reviews
                        </button>
                    </div>
                    {
                        activeTab === 0 ?
                            <div className="mt-8">
                                <OfferItem />
                                <OfferItem />
                                <OfferItem />
                                <OfferItem />
                            </div>
                            :
                            <div className="mt-8">
                                <ReviewItem />
                                <ReviewItem />
                                <ReviewItem />
                                <ReviewItem />
                            </div>
                    }
                </div> */}
            </div>
    );
}





function OfferItem() {
    return (
        <div className="border-b-2 last:border-none border-gray-100 py-6 px-4 md:px-10 transition-all bg-transparent hover:bg-gray-100">
            <h4 className="text-xl font-semibold text-primary">
                <span className="mr-8">John Doe</span>
            </h4>
            <p className="text-base font-normal text-gray-600 mt-1">
                Made an offer of 1000$ for
                <a href="#" className="text-primary ml-2">{"{Car Name}"}</a>
            </p>
        </div>
    );
}



function ReviewItem() {
    return (
        <div className="border-b-2 last:border-none border-gray-100 py-6 px-4 md:px-10 transition-all bg-transparent hover:bg-gray-100">
            <h4 className="text-xl font-semibold text-primary">
                <span className="mr-8">John Doe</span>
                <span className="text-sm font-normal text-white rounded-full px-2 py-0.5 bg-primary">
                    <i className="fa-solid fa-star text-xs mr-2"></i>
                    4.9
                </span>
            </h4>
            <p className="text-sm font-normal text-gray-600 mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aspernatur odio corporis fugit quasi. Quidem amet similique cum accusamus alias id unde, vel nam itaque, soluta dolorum maiores sapiente eos.
            </p>
        </div>
    );
}