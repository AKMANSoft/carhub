import React from "react";
import { categories } from "./Header";



type Props = {
    onSidebarClose: () => void
}

export default function SiderBar({ onSidebarClose }: Props) {

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 1024) {
                onSidebarClose()
            }
        })
    })

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-white shadow-lg z-50 px-4 md:px-10">
            <div className="flex items-center justify-between py-5">
                <div className="inline-flex items-center gap-4">
                    <button type="button" onClick={onSidebarClose} className="text-3xl lg:hidden inline-flex items-center justify-center rounded text-gray-800 bg-transparent border-gray-100 transition-all hover:text-primary">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <a href="/" className="text-3xl md:text-4xl font-extrabold text-primary">CARHUB</a>
                </div>
                <a href="#" className='text-sm md:text-base font-medium border border-primary text-gray-800 px-4 lg:px-8 py-1.5 lg:py-3 hover:bg-primary/95 hover:text-white transition-all rounded-full'>
                    Post Car
                    <i className='fa-solid fa-plus ms-3 lg:ms-5'></i>
                </a>
            </div>
            <div className="mt-10">
                <ul className="py-2">
                    <li>
                        <a href="#" className="text-lg font-normal text-black block py-2 px-4 transition-all hover:text-primary hover:bg-gray-100">
                            <i className="fa-solid fa-message text-base text-gray-700 mr-4"></i>
                            Messages
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-lg font-normal text-black block py-2 px-4 transition-all hover:text-primary hover:bg-gray-100">
                            <i className="fa-solid fa-bell text-base text-gray-700 mr-4"></i>
                            Notifications
                        </a>
                    </li>
                </ul>
            </div>
            <div className="mt-8 border-t pt-8">
                <h4 className="text-2xl font-bold text-gray-900">All Categories</h4>
                <ul className="py-2">
                    {
                        categories.map((ctgry) => (
                            <li>
                                <a href="#" key={ctgry} className="text-lg font-normal text-black flex items-center justify-between py-2 px-4 transition-all hover:text-primary hover:bg-gray-100">
                                    {ctgry}
                                    <i className="fa-solid fa-arrow-right text-sm text-gray-700"></i>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

