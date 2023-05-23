import React from "react";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import EditPofilePopup from "../popups/EditPofilePopup";


export default function ProfilePage() {
    const [activeTab, setActiveTab] = React.useState(1);

    return (
        <div className={"max-w-screen-2xl mx-auto py-10 md:py-20" + MAIN_HORIZONTAL_PADDING}>
            {/* <div className="w-full shadow-lg shadow-primary/30 rounded-lg p-10 lg:p-20"> */}
            {/* <div className="w-full shadow-none md:shadow-lg shadow-primary/30 rounded-lg p-0 md:p-8 lg:py-20"> */}
            <div className="w-full border-4 border-gray-100 rounded-lg">
                {/* Profile Section */}
                <div className="flex flex-col md:flex-row gap-16 md:gap-2 justify-between items-center p-10">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                        <img src="/images/car9.jpg" width={175} height={175} className="w-44 h-auto aspect-square object-cover object-center rounded-full border-4" alt="" />
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-semibold text-gray-800">Ali Hussnain</h3>
                            <p className="text-base font-normal text-gray-600">
                                Islamabad | Pakistan
                            </p>
                            <div className="mt-5 inline-flex items-center gap-4">
                                <span className="text-sm font-normal text-white rounded-full px-2 py-0.5 bg-primary">
                                    <i className="fa-solid fa-star text-xs mr-2"></i>
                                    4.9
                                </span>
                                <p className="text-base font-normal text-gray-600">2 Reviews</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <EditPofilePopup />
                    </div>
                </div>
                {/* Reviews and Offers Section  */}
                <div className="mt-10">
                    <div className="flex items-center justify-center gap-10 md:gap-20 lg:gap-40">
                        <button type="button" onClick={() => setActiveTab(0)} className={"text-lg font-semibold text-gray-800 px-5 py-2 border-b-4 rounded " + (activeTab === 0 ? "border-primary" : "border-transparent")}>
                            Offers
                        </button>
                        <button type="button" onClick={() => setActiveTab(1)} className={"text-lg font-semibold text-gray-800 px-5 py-2 border-b-4 rounded " + (activeTab === 1 ? "border-primary" : "border-transparent")}>
                            Reviews
                        </button>
                    </div>
                    <div className="mt-8">
                        <ReviewItem />
                        <ReviewItem />
                        <ReviewItem />
                        <ReviewItem />
                    </div>
                </div>
            </div>
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