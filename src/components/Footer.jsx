import React from "react";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";



export default function Footer() {
    return (
        <footer className={"bg-white z-50 mt-10" + MAIN_HORIZONTAL_PADDING}>
            <div className="flex items-center justify-between py-5 border-t border-gray-300">
                <div>
                    <p className="text-base text-gray-800 font-normal">
                        &copy; 2023
                        <span className="text-primary pl-1 font-semibold">CarHub Inc.</span>
                    </p>
                </div>

                <div>
                    <div className="w-full">
                        <select name="language" defaultValue="english" className="rounded w-full py-2 text-gray-900 text-sm font-normal mt-1">
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                        </select>
                    </div>
                </div>
            </div>
        </footer>
    );
}
