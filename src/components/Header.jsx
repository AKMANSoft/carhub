import React from "react";
import SignupPopup from "../popups/SignupPage";
import SigninPopup from "../popups/SigninPage";
import SiderBar from "./SideBar";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import InboxDropdown from "../dropdowns/InboxDropdown";


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

export default function Header() {
    const isLoggedin = true;
    const [headerActive, setHeaderActive] = React.useState(false);
    return (
        <header className={"w-full fixed top-0 left-0 bg-white z-50" + MAIN_HORIZONTAL_PADDING}>
            <div className="py-5 border-b border-b-gray-300">
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-4 lg:gap-10'>
                        <button type="button" onClick={() => setHeaderActive(true)} className="text-2xl lg:hidden inline-flex items-center justify-center rounded text-gray-800 bg-transparent border-gray-100 transition-all hover:text-primary">
                            <i className="fa-solid fa-bars"></i>
                        </button>
                        <a href="/" className="text-3xl md:text-4xl font-extrabold text-primary">CARHUB</a>
                        <div className="hidden lg:flex items-center gap-2" >
                            <HeaderSearchComponent />
                            <span className="hidden xl:block">
                                <HeaderLocationEl />
                            </span>
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        {
                            isLoggedin &&
                            <div className='hidden md:flex items-center gap-5'>
                                <InboxDropdown />
                                <a href="/profile" className='text-2xl text-gray-700 transition-all hover:text-primary hover:scale-110'>
                                    <i className="fa-solid fa-user"></i>
                                </a>
                            </div>
                        }
                        {
                            isLoggedin ?
                                <div>
                                    <a href="/post-car" className='text-sm md:text-base font-medium border border-primary text-gray-800 px-4 lg:px-8 py-1.5 lg:py-3 hover:bg-primary/95 hover:text-white transition-all rounded-full'>
                                        Post Car
                                        <i className='fa-solid fa-plus ms-3 lg:ms-5'></i>
                                    </a>
                                </div>
                                :
                                <div>
                                    <SignupPopup />
                                    <SigninPopup />
                                </div>
                        }
                    </div>
                </div>
                <div className="mt-5 lg:hidden">
                    <HeaderSearchComponent />
                </div>
                <div className="mt-5 xl:hidden">
                    <HeaderLocationEl />
                </div>

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



function HeaderLocationEl() {
    return (
        <a href="#" className="w-full text-xl font-semibold inline-flex justify-start items-center text-primary rounded-full px-6 py-2">
            <i className="fa-solid fa-location-dot border-b border-transparent"></i>
            <span className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap xl:max-w-[150px] 2xl:max-w-[300px] border-b border-transparent hover:border-primary" style={{ WebkitLineClamp: 1 }}>
                Location
            </span>
        </a>
    );
}



function HeaderSearchComponent({ className }) {
    return (
        <div className={"relative text-gray-500 border border-gray-300 rounded-full overflow-hidden flex " + className}>
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
                <i className="fa-solid fa-magnifying-glass"></i>
            </a>
        </div>
    );
}