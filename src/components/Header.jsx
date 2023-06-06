import React, { Fragment, useEffect } from "react";
import SignupPopup from "../popups/Signup";
import SigninPopup from "../popups/Signin";
import SiderBar from "./SideBar";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import InboxDropdown from "../dropdowns/InboxDropdown";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faLocationDot, faMagnifyingGlass, faPlus, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { Menu, Transition } from "@headlessui/react";
import { cn } from "../lib/utils";
import { accountPageTabs } from "../pages/AccountPage";


export const categories = [
    "Sedan",
    "SUV",
    "Truck",
    "Coupe",
    "Convertible",
    "Wagon/Hatchback",
    "Van/Minivian",
    "Others"
]

export default function Header({ isLoggedin = false, onLogout }) {
    const [headerActive, setHeaderActive] = React.useState(false);

    return (
        <header className={"w-full fixed top-0 left-0 bg-white z-50" + MAIN_HORIZONTAL_PADDING}>
            <div className="py-5 border-b border-b-gray-300">
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-4 lg:gap-10'>
                        <button type="button" onClick={() => setHeaderActive(true)} className="text-2xl lg:hidden inline-flex items-center justify-center rounded text-gray-800 bg-transparent border-gray-100 transition-all hover:text-primary">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <a href="/" className="text-3xl md:text-4xl font-extrabold text-primary">CARHUB</a>
                        <div className="hidden lg:flex items-center gap-2" >
                            <HeaderSearchComponent />
                            {
                                isLoggedin &&
                                <span className="hidden xl:block">
                                    <HeaderLocationEl />
                                </span>
                            }
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        {
                            isLoggedin &&
                            <div className='hidden md:flex items-center gap-2'>
                                <AboutDropdown />
                                <InboxDropdown />
                                <AccountDropdown onLogout={onLogout} />
                                {/* <a href="/account" className='text-2xl text-gray-700 transition-all hover:text-primary hover:scale-110'>
                                    <FontAwesomeIcon icon={faUser} />
                                </a> */}
                            </div>
                        }
                        {
                            isLoggedin ?
                                <div>
                                    <a href="/post-car" className='text-sm md:text-base font-medium border border-primary text-gray-800 px-4 lg:px-8 py-1.5 lg:py-3 hover:bg-primary/95 hover:text-white transition-all rounded-full'>
                                        Post Car
                                        <FontAwesomeIcon icon={faPlus} className="ms-3 lg:ms-5" />
                                    </a>
                                </div>
                                :
                                <div>
                                    <SignupPopup />
                                    <SigninPopup />
                                    <a href="?p=signin" id='trigger' className='sign-in-popup-btn text-sm md:text-base font-medium text-gray-500 px-2 md:px-3 hover:text-primary py-2 md:py-3 rounded-full'>
                                        Sign In
                                    </a>
                                    <a href="?p=signup" type='button' className='sign-up-popup-btn text-sm md:text-base font-medium bg-primary text-white px-5 md:px-8 py-2 md:py-3 hover:bg-primary/95 rounded-full'>
                                        Sign Up
                                    </a>
                                </div>
                        }
                    </div>
                </div>
                <div className="mt-5 lg:hidden">
                    <HeaderSearchComponent />
                </div>
                {
                    isLoggedin &&
                    <div className="mt-5 xl:hidden">
                        <HeaderLocationEl />
                    </div>
                }

                <div className="hidden lg:flex mt-4 items-center">
                    <h3 className="text-lg min-w-max text-gray-900 font-bold ps-1 lg:pr-5 xl:pr-10 border-r border-gray-500">Find A Car</h3>
                    <div className="flex lg:ms-5 xl:ms-10 gap-x-1 items-center flex-wrap">
                        {
                            categories.map((ctgry) => (
                                <a key={ctgry} href={"/search?category=" + ctgry} className="text-base font-normal text-gray-800 px-4 py-1 rounded-lg transition-all hover:bg-gray-100 hover:text-primary">
                                    {ctgry}
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
            {
                window.innerWidth < 1024 && headerActive &&
                <SiderBar onSidebarClose={() => setHeaderActive(false)} />
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
                            <a href="https://www.gocarhub.app/" className={cn(
                                "text-base font-normal text-gray-800 block py-2 px-5 transition-all",
                                active && "text-primary bg-gray-100"
                            )}>
                                About
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a href="https://www.gocarhub.app/" className={cn(
                                "text-base font-normal text-gray-800 block py-2 px-5 transition-all",
                                active && "text-primary bg-gray-100"
                            )}>
                                Terms of services
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a href="https://www.gocarhub.app/" className={cn(
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
                                <Menu.Item>
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


function HeaderLocationEl() {
    return (
        <a href="#" className="w-full text-xl font-semibold inline-flex justify-start items-center text-primary rounded-full px-6 py-2">
            <FontAwesomeIcon icon={faLocationDot} className="border-b border-transparent" />
            <span className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap xl:max-w-[150px] 2xl:max-w-[300px] border-b border-transparent hover:border-primary" style={{ WebkitLineClamp: 1 }}>
                Location
            </span>
        </a>
    );
}



function HeaderSearchComponent({ className }) {
    return (
        <div className={"w-full lg:w-96 xl:w-full relative text-gray-500 border border-gray-300 rounded-full overflow-hidden flex " + className}>
            <input className="ps-5 text-sm w-full min-h-full no-decor text-gray-600 appearance-none bg-transparent"
                type="search" name="search" placeholder="Search" />
            <span className="block w-0 min-h-full my-2 border-l border-gray-300"></span>
            <select name="" id="" className="w-36 md:w-auto bg-transparent no-decor transition-all duration-300 px-2 md:px-4 py-2 my-1">
                <option value="all">All Categories</option>
                {
                    categories.map((ctgry) => (
                        <option key={ctgry} value={ctgry}>{ctgry}</option>
                    ))
                }
            </select>
            <a href='/search' className="text-base md:text-lg min-w-max bg-primary text-white rounded-full m-1 ms-3 aspect-square transition-all duration-300 px-3 flex items-center hover:bg-primary/90">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </a>
        </div>
    );
}