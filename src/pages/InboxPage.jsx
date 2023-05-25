import React from "react";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import { useSearchParams } from "react-router-dom";
import TabbedView from "../components/TabbedView";


export default function InboxPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = React.useState(searchParams.get("active") ?? "messages");

    function setTab(tab) {
        setSearchParams("active=" + tab);
        setActiveTab(tab)
    }

    return (
        <div className={"max-w-screen-2xl mx-auto py-10 md:py-20" + MAIN_HORIZONTAL_PADDING}>
            <div className="mb-12">
                <h2 className="text-2xl text-gray-900 font-bold inline-flex items-center">
                    <a href="/" className="text-lg text-gray-600">Home</a>
                    <i className="mx-3 text-sm text-gray-500 fa-solid fa-chevron-right"></i>
                    <a href="/notifications" className="text-lg text-gray-900">Inbox</a>
                </h2>
            </div>

            <TabbedView
                tabs={[
                    {
                        tabName: "Messages",
                        content: () => (
                            <div className="py-4">
                                <NotificationItem title="Message Title" />
                                <NotificationItem title="Message Title" />
                                <NotificationItem title="Message Title" />
                            </div>
                        )
                    },
                    {
                        tabName: "Notifications",
                        content: () => (
                            <div className="py-4">
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                            </div>
                        )
                    }
                ]}
            />

            {/* <div className="w-full border-4 border-gray-100 rounded-lg">
                <div className="mb-3 flex items-center border-b border-gray-100">
                    <button type="button" onClick={() => setTab("messages")} className={"text-xl font-semibold px-8 py-4 border-b-4 " + (activeTab === "messages" ? "border-primary text-primary bg-gray-50" : "border-transparent text-gray-800")}>
                        Messages
                    </button>
                    <button type="button" onClick={() => setTab("notifications")} className={"text-xl font-semibold px-8 py-4 border-b-4 " + (activeTab === "notifications" ? "border-primary text-primary bg-gray-50" : "border-transparent text-gray-800")}>
                        Notifications
                    </button>
                </div>
                {
                    activeTab === "messages" ?
                        <div className="py-4">
                            <NotificationItem title="Message Title" />
                            <NotificationItem title="Message Title" />
                            <NotificationItem title="Message Title" />
                        </div>
                        :
                        <div className="py-4">
                            <NotificationItem />
                            <NotificationItem />
                            <NotificationItem />
                        </div>
                }
            </div> */}
        </div>
    );
}

export function NotificationItem({ short = false, title = "Notification Title" }) {
    return (
        <div className={"border-b-2 last:border-none border-gray-100 px-8 transition-all bg-transparent hover:bg-gray-100 " + (short ? "py-4" : "py-6")}>
            <h4 className={"text-gray-800 " + (short ? "text-lg font-medium" : "font-semibold")}>
                <span>{title}</span>
            </h4>
            <p className={"font-normal text-gray-700 " + (short ? "line-clamp-2 mt-1 text-sm" : "mt-2 text-base")}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aspernatur odio corporis fugit quasi. Quidem amet similique cum accusamus alias id unde, vel nam itaque, soluta dolorum maiores sapiente eos.
            </p>
        </div>
    );
}