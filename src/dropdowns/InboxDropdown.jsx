import React from "react";
import Popup from "reactjs-popup";
import { NotificationItem } from "../pages/InboxPage";


export default function InboxDropdown() {
    const [activeTab, setActiveTab] = React.useState("messages");
    return (
        <Popup
            trigger={
                <button className='text-2xl text-gray-700 transition-all hover:text-primary hover:scale-110'>
                    <i className="fa-solid fa-message"></i>
                </button>
            }
            position={['bottom right']}
            contentStyle={{ border: "none", width: 500, padding: "0" }}
            closeOnDocumentClick
            nested
        >
            <div className="w-full">
                <div className="flex px-4 pt-4 items-center border-b border-gray-100 justify-center gap-20">
                    <button type="button" onClick={() => setActiveTab("messages")} className={"text-xl font-semibold px-2 py-2 border-b-4 rounded " + (activeTab === "messages" ? "border-primary text-primary" : "border-transparent text-gray-800")}>
                        Messages
                    </button>
                    <button type="button" onClick={() => setActiveTab("notifications")} className={"text-xl font-semibold px-2 py-2 border-b-4 rounded " + (activeTab === "notifications" ? "border-primary text-primary" : "border-transparent text-gray-800")}>
                        Notifications
                    </button>
                </div>
                {
                    activeTab === "messages" ?
                        <div className="py-4">
                            <NotificationItem short title="Message Title" />
                            <NotificationItem short title="Message Title" />
                            <NotificationItem short title="Message Title" />
                        </div>
                        :
                        <div className="py-4">
                            <NotificationItem short />
                            <NotificationItem short />
                            <NotificationItem short />
                        </div>
                }
                <div className="flex items-center justify-center border-t px-3 py-4 border-gray-100">
                    {
                        activeTab === "messages" ?
                            <a href="/inbox?active=messages" className="text-base font-semibold text-primary">View All Messages</a>
                            :
                            <a href="/inbox?active=notifications" className="text-base font-semibold text-primary">View All Notifications</a>
                    }
                </div>
            </div>
        </Popup>
    );
}
