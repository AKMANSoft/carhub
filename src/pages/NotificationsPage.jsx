import React from "react";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";


export default function NotificationsPage() {
    return (
        <div className={"max-w-screen-2xl mx-auto py-10 md:py-20" + MAIN_HORIZONTAL_PADDING}>
            <div className="mb-12">
                <h2 className="text-4xl text-gray-900 font-bold">
                    <a href="/" className="text-gray-400">Home</a>
                    <i className="mx-4 text-[70%] text-gray-500 fa-solid fa-chevron-right"></i>
                    <a href="/notifications">Notifications</a>
                </h2>
            </div>
            <div className="w-full border-4 border-gray-100 rounded-lg">
                <div className="">
                    <NotificationItem />
                    <NotificationItem />
                    <NotificationItem />
                </div>
            </div>
        </div>
    );
}

function NotificationItem() {
    return (
        <div className="border-b-2 last:border-none border-gray-100 py-8 px-8 transition-all bg-transparent hover:bg-gray-100">
            <h4 className="text-xl font-semibold text-primary">
                <span className="mr-8">Notification Title</span>
            </h4>
            <p className="text-base font-normal text-gray-700 mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aspernatur odio corporis fugit quasi. Quidem amet similique cum accusamus alias id unde, vel nam itaque, soluta dolorum maiores sapiente eos.
            </p>
        </div>
    );
}