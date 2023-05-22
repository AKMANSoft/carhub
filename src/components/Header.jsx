import React from "react";
import SignupPopup from "../popups/SignupPage";
import SigninPopup from "../popups/SigninPage";
import SiderBar from "./SideBar";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";


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
    const isLoggedin = false;
    const [headerActive, setHeaderActive] = React.useState(false);
    return (
        <header className={"w-full fixed top-0 left-0 bg-white" + MAIN_HORIZONTAL_PADDING}>
            <div className="py-5 border-b border-b-gray-300">
                <div className="flex items-center justify-between">
                    <div className='flex items-center gap-4 lg:gap-10'>
                        <button type="button" onClick={() => setHeaderActive(true)} className="text-2xl lg:hidden inline-flex items-center justify-center rounded text-gray-800 bg-transparent border-gray-100 transition-all hover:text-primary">
                            <i className="fa-solid fa-bars"></i>
                        </button>
                        <a href="/" className="text-3xl md:text-4xl font-extrabold text-primary">CARHUB</a>
                        <div className="hidden lg:block" >
                            <HeaderSearchComponent />
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        {
                            isLoggedin &&
                            <div className='flex items-center gap-5'>
                                <button type='button' className='text-2xl text-gray-700 transition-all hover:text-primary hover:scale-110'>
                                    <i className="fa-solid fa-message"></i>
                                </button>
                                <button type='button' className='text-2xl text-gray-700 transition-all hover:text-primary hover:scale-110'>
                                    <i className="fa-solid fa-bell"></i>
                                </button>
                                <button type='button' className='text-2xl text-gray-700 transition-all hover:text-primary hover:scale-110'>
                                    <i className="fa-solid fa-user"></i>
                                </button>
                            </div>
                        }
                        <div>
                            {
                                isLoggedin ?
                                    <a href="#" className='text-base font-medium border border-primary text-gray-800 px-8 py-3 hover:bg-primary/95 hover:text-white transition-all rounded-full'>
                                        Post Car
                                        <i className='fa-solid fa-plus ms-5'></i>
                                    </a>
                                    :
                                    <>
                                        <SignupPopup />
                                        <SigninPopup />
                                    </>
                            }
                        </div>
                    </div>
                </div>
                <div className="mt-5 lg:hidden">
                    <HeaderSearchComponent />
                </div>

                <div className="hidden lg:flex mt-4 items-center">
                    <h3 className="text-lg min-w-max text-gray-900 font-bold ps-1 lg:pr-5 xl:pr-10 border-r border-gray-500">Find A Car</h3>
                    <div className="flex lg:ms-5 xl:ms-10 gap-x-1 items-center flex-wrap">
                        {
                            categories.map((ctgry) => (
                                <a key={ctgry} href="#" className="text-base font-normal text-gray-800 px-4 py-1 rounded-lg transition-all hover:bg-gray-100 hover:text-primary">
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
            <a href='#' className="text-base md:text-lg min-w-max bg-primary text-white rounded-full m-1 ms-3 aspect-square transition-all duration-300 px-3 flex items-center hover:bg-primary/90">
                <i className="fa-solid fa-magnifying-glass"></i>
            </a>
        </div>
    );
}