import React, { Fragment, Suspense, useEffect, useState } from "react";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import InboxDropdown from "../dropdowns/InboxDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faLocationDot, faMagnifyingGlass, faPlus, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { Menu, Transition } from "@headlessui/react";
import { cn } from "../lib/utils";
import { accountPageTabs } from "../pages/AccountPage";
import { apiConfig } from "../config/api";
import useAuthUser from "./hooks/useAuthUser";
import useFiltersFetcher from "./hooks/filtersFetchers";
import { Link, useSearchParams } from "react-router-dom";
import useCurrentLocation, { getCurrentLatLng, getLocationByLatLng, useLocationByLatLng } from "./hooks/useCurrentLocation";
import { siteConfig } from "../config/site";
import ChooseLocationPopup from "../popups/ChooseLocation";

const SignupPopup = React.lazy(() => import("../popups/Signup"));
const SigninPopup = React.lazy(() => import("../popups/Signin"));
const SiderBar = React.lazy(() => import("./SideBar"));
const ForgotPasswordPopup = React.lazy(() => import("../popups/ForgotPassword"));


export default function Header({ isLoggedin = false, onLogout }) {
    const authUser = useAuthUser();
    const [headerActive, setHeaderActive] = React.useState(false);
    const [searchParams] = useSearchParams();
    const category = parseInt(searchParams.get("category"));
    const { data: categories } = useFiltersFetcher(authUser.accessToken, apiConfig.endpoints.getCategories, []);


    return (
        <header className={"w-full fixed top-0 left-0 bg-white z-50" + MAIN_HORIZONTAL_PADDING}>
            <div className="py-5 border-b border-b-gray-300">
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-4 lg:gap-10'>
                        <button type="button" onClick={() => setHeaderActive(true)} className="text-2xl lg:hidden inline-flex items-center justify-center rounded text-gray-800 bg-transparent border-gray-100 transition-all hover:text-primary">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <a href="/" className="text-3xl md:text-4xl font-extrabold text-primary">CARHUB</a>
                        <div className="hidden xl:flex items-center gap-2" >
                            <HeaderSearchComponent category={category} categories={categories} />
                            {
                                <span className="hidden xl:block">
                                    <HeaderLocationEl />
                                </span>
                            }
                        </div>
                    </div>
                    <div className='flex items-center gap-1'>
                        {

                            <div className='hidden md:flex items-center gap-2'>
                                <AboutDropdown />
                                {
                                    isLoggedin &&
                                    <>
                                        <InboxDropdown />
                                        <AccountDropdown onLogout={onLogout} />
                                    </>
                                }
                                {/* <a href="/account" className='text-2xl text-gray-700 transition-all hover:text-primary hover:scale-110'>
                                    <FontAwesomeIcon icon={faUser} />
                                </a> */}
                            </div>
                        }
                        {
                            isLoggedin ?
                                <div className="ml-3">
                                    <a href="/post-car" className='text-sm md:text-base font-medium border border-primary text-gray-800 px-4 lg:px-8 py-1.5 lg:py-3 hover:bg-primary/95 hover:text-white transition-all rounded-full'>
                                        Post Car
                                        <FontAwesomeIcon icon={faPlus} className="ms-3 lg:ms-5" />
                                    </a>
                                </div>
                                :
                                <div>
                                    <Link to="?p=signin" reloadDocument className='sign-in-popup-btn text-sm md:text-base font-medium text-gray-500 px-2 md:px-5 hover:text-primary py-2 md:py-3 rounded-full'>
                                        Sign In
                                    </Link>
                                    <Link to="?p=signup" reloadDocument className='sign-up-popup-btn text-sm md:text-base font-medium bg-primary text-white px-5 md:px-8 py-2 md:py-3 hover:bg-primary/95 rounded-full'>
                                        Sign Up
                                    </Link>
                                </div>
                        }
                    </div>
                </div>
                <div className="mt-5 xl:hidden">
                    <HeaderSearchComponent category={category} categories={categories} />
                </div>
                {
                    <div className="mt-5 xl:hidden">
                        <HeaderLocationEl />
                    </div>
                }

                <div className="hidden lg:flex mt-4 items-center">
                    <h3 className="text-lg min-w-max text-gray-900 font-bold ps-1 lg:pr-5 xl:pr-10 border-r border-gray-500">Find A Car</h3>
                    <div className="flex lg:ms-5 xl:ms-10 gap-x-1 items-center flex-wrap">
                        {
                            categories &&
                            categories.map((ctgry) => (
                                <a key={ctgry.id} href={"/search?category=" + ctgry.id} className={cn(
                                    "text-base font-normal text-gray-800 px-4 py-1 rounded-lg transition-all",
                                    category === ctgry.id ? "bg-gray-100 text-primary" : "hover:bg-gray-100 hover:text-primary"
                                )}>
                                    {ctgry.title}
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
            {
                window.innerWidth < 1024 && headerActive &&
                <Suspense>
                    <SiderBar onLogout={onLogout} onSidebarClose={() => setHeaderActive(false)} />
                </Suspense>
            }
            {
                !isLoggedin &&
                <Suspense>
                    <SignupPopup />
                    <SigninPopup />
                    <ForgotPasswordPopup />
                </Suspense>
            }
        </header>
    );
}





function AboutDropdown() {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center items-center rounded-md p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 outline-none">
                    About
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-xs" />
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
                <Menu.Items className="absolute right-0 mt-2 w-56 overflow-clip origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <a href={siteConfig.links.aboutLink} className={cn(
                                "text-base font-normal text-gray-800 block py-2 px-5 transition-all",
                                active && "text-primary bg-gray-100"
                            )}>
                                About
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a href={siteConfig.links.termsOfServices} className={cn(
                                "text-base font-normal text-gray-800 block py-2 px-5 transition-all",
                                active && "text-primary bg-gray-100"
                            )}>
                                Terms of services
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a href={siteConfig.links.privacyPolicy} className={cn(
                                "text-base font-normal text-gray-800 block py-2 px-5 transition-all",
                                active && "text-primary bg-gray-100"
                            )}>
                                Privacy
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}




function AccountDropdown({ onLogout }) {

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center items-center rounded-md p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 outline-none">
                    Account
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-xs" />
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
                <Menu.Items className="absolute right-0 mt-2 w-56 overflow-clip origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div>
                        {
                            accountPageTabs.map((accTab) => (
                                <Menu.Item key={accTab}>
                                    {({ active }) => (
                                        <a href={"/account?active=" + accTab.id} className={cn(
                                            "text-base font-normal text-gray-800 block py-2 px-5 transition-all",
                                            active && "text-primary bg-gray-100"
                                        )}>
                                            {accTab.name}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))
                        }
                    </div>
                    <div>
                        <Menu.Item>
                            {({ active }) => (
                                <button type="button" onClick={onLogout} className={cn(
                                    "text-base font-normal text-gray-800 py-2 px-5 transition-all",
                                    active && "text-primary bg-gray-100",
                                    "inline-flex w-full items-center justify-between"
                                )}>
                                    <span>Logout</span>
                                    <FontAwesomeIcon icon={faRightFromBracket} className="text-sm" />
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}


function HeaderLocationEl({ userProfile }) {
    return (
        <ChooseLocationPopup />
    );
}



function HeaderSearchComponent({ className, category, categories = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCategory, setSearchCategory] = useState(category);
    return (
        <div className={"w-full xl:w-full relative text-gray-500 border border-gray-300 rounded-full overflow-hidden flex " + className}>
            <input className="ps-5 text-sm w-full min-h-full no-decor text-gray-600 appearance-none bg-transparent"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                type="search" name="search" placeholder="Search" />
            <span className="block w-0 min-h-full my-2 border-l border-gray-300"></span>
            {/* <select name="category" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className="w-36 md:w-auto bg-transparent no-decor transition-all duration-300 px-2 md:px-4 py-2 my-1">
                {
                    categories.map((ctgry) => (
                        <option key={ctgry.id} value={ctgry.id}>{ctgry.title}</option>
                    ))
                }
            </select> */}
            <a href={`/search?category=${isNaN(searchCategory) ? -1 : searchCategory}&query=${searchTerm}`} aria-disabled="true" className="text-base md:text-lg min-w-max bg-primary text-white rounded-full m-1 ms-3 aspect-square transition-all duration-300 px-3 flex items-center hover:bg-primary/90">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </a>
        </div>
    );
}