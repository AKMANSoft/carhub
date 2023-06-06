import React, { Fragment } from "react";
import Popup from "reactjs-popup";
import { NotificationItem } from "../pages/InboxPage";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";


export default function InboxDropdown() {
    const [activeTab, setActiveTab] = React.useState("messages");
    return (

        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center items-center rounded-md p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 outline-none">
                    Inbox
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
                <Menu.Items className="absolute right-0 mt-2 w-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="w-full">
                        <div className="flex px-4 pt-4 items-center border-b border-gray-100 justify-center gap-20">
                            <button type="button" onClick={() => setActiveTab("messages")} className={"text-lg font-semibold px-2 py-2 border-b-4 rounded " + (activeTab === "messages" ? "border-primary text-primary" : "border-transparent text-gray-800")}>
                                Messages
                            </button>
                            <button type="button" onClick={() => setActiveTab("notifications")} className={"text-lg font-semibold px-2 py-2 border-b-4 rounded " + (activeTab === "notifications" ? "border-primary text-primary" : "border-transparent text-gray-800")}>
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
                </Menu.Items>
            </Transition>
        </Menu>
        // <Popup
        //     trigger={
        //         <button className='text-2xl text-gray-700 transition-all hover:text-primary hover:scale-110'>
        //             <i className="fa-solid fa-message"></i>
        //         </button>
        //     }
        //     position={['bottom right']}
        //     contentStyle={{ border: "none", width: 500, padding: "0" }}
        //     closeOnDocumentClick
        //     nested
        // >
        //     <div className="w-full">
        //         <div className="flex px-4 pt-4 items-center border-b border-gray-100 justify-center gap-20">
        //             <button type="button" onClick={() => setActiveTab("messages")} className={"text-xl font-semibold px-2 py-2 border-b-4 rounded " + (activeTab === "messages" ? "border-primary text-primary" : "border-transparent text-gray-800")}>
        //                 Messages
        //             </button>
        //             <button type="button" onClick={() => setActiveTab("notifications")} className={"text-xl font-semibold px-2 py-2 border-b-4 rounded " + (activeTab === "notifications" ? "border-primary text-primary" : "border-transparent text-gray-800")}>
        //                 Notifications
        //             </button>
        //         </div>
        //         {
        //             activeTab === "messages" ?
        //                 <div className="py-4">
        //                     <NotificationItem short title="Message Title" />
        //                     <NotificationItem short title="Message Title" />
        //                     <NotificationItem short title="Message Title" />
        //                 </div>
        //                 :
        //                 <div className="py-4">
        //                     <NotificationItem short />
        //                     <NotificationItem short />
        //                     <NotificationItem short />
        //                 </div>
        //         }
        //         <div className="flex items-center justify-center border-t px-3 py-4 border-gray-100">
        //             {
        //                 activeTab === "messages" ?
        //                     <a href="/inbox?active=messages" className="text-base font-semibold text-primary">View All Messages</a>
        //                     :
        //                     <a href="/inbox?active=notifications" className="text-base font-semibold text-primary">View All Notifications</a>
        //             }
        //         </div>
        //     </div>
        // </Popup>
    );
}
