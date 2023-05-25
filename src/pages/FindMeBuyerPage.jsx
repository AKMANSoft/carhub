import React from "react";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import { useSearchParams } from "react-router-dom";




const subscriptions = [
    {
        stars: 1,
        days: 2
    },
    {
        stars: 2,
        days: 6
    },
    {
        stars: 3,
        days: 10
    },
    {
        stars: 4,
        days: 15
    },

]


export default function FindMeBuyerPage() {
    const [selectedSubscription, setSelectedSubscription] = React.useState(-1);

    return (
        <div className={"max-w-screen-2xl mx-auto py-10 md:py-20" + MAIN_HORIZONTAL_PADDING}>
            <div className="mb-12">
                <h2 className="text-2xl text-gray-900 font-bold inline-flex items-center">
                    <a href="/" className="text-lg text-gray-600">Home</a>
                    <i className="mx-3 text-sm text-gray-500 fa-solid fa-chevron-right"></i>
                    <a href="/notifications" className="text-lg text-gray-900">Find Me Buyer</a>
                </h2>
            </div>

            <div className="p-6 md:p-10 lg:p-20 w-full shadow border rounded-md bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 lg:gap-20 max-w-screen-lg mx-auto">
                    {
                        subscriptions.map((subscription, index) => (
                            <SubscriptionItem
                                subscription={subscription}
                                selected={selectedSubscription === index}
                                onSelect={() => setSelectedSubscription(index)} />
                        ))
                    }
                    <div className="w-full md:col-span-2 flex justify-center md:justify-end">
                        <button type="button" className="btn-primary">
                            Continue to Pay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const range = (start, end, step = 1) => {
    let output = [];
    if (typeof end === 'undefined') {
        end = start;
        start = 0;
    }
    for (let i = start; i < end; i += step) {
        output.push(i);
    }
    return output;
};




export function SubscriptionItem({ subscription, selected, onSelect }) {
    return (
        <div onClick={onSelect} role="button" className={"group w-full rounded-md p-4 md:p-7 py-10 md:min-h-[300px] border-gray-200 flex flex-col justify-center text-center cursor-pointer border-2 transition-all " + (selected ? "border-primary" : "hover:bg-gray-50")}>
            <span className={"text-gray-700 text-xl md:text-4xl transition-all inline-flex justify-center items-center gap-2 flex-wrap " + (selected ? "text-primary" : "group-hover:text-primary")}>
                {
                    range(0, subscription.stars).map(() => (
                        <i class="fa-solid fa-star"></i>
                    ))
                }
            </span>
            <h3 className={"text-lg md:text-xl font-semibold text-gray-800 mt-5 " + (selected ? "text-primary" : "group-hover:text-primary")}>
                Boost your offer for {subscription.days} days
            </h3>
            <p className="text-sm md:text-base text-gray-600 font-normal mt-4">
                Keep your post at the Top for {subscription.days} days.
            </p>
        </div>
    );
}