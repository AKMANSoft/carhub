import React, { Fragment } from "react";
import { NotificationItem } from "../pages/InboxPage";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";
import axios from "axios";
import useAuthUser from "../components/hooks/useAuthUser";
import { apiConfig } from "../config/api";
import useNotificationsFetcher from "../components/hooks/notificationsFetcher";
import { handleTranslation } from "../lib/i18n";


export default function InboxDropdown() {
    const { trans } = handleTranslation();
    const authUser = useAuthUser();
    const [activeTab, setActiveTab] = React.useState("notifications");
    const { notifications } = useNotificationsFetcher(authUser.accessToken, true)

    // const [notifications, setNotifications] = React.useState([]);

    // React.useEffect(async () => {
    //     try {
    //         const res = await axios.get(
    //             apiConfig.basePath + apiConfig.endpoints.getNotifications,
    //             {
    //                 headers: {
    //                     "Authorization": "Bearer " + authUser.accessToken
    //                 }
    //             }
    //         )
    //         if (res.data.success) {
    //             setNotifications(res.data.data);
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [authUser])

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center items-center rounded-md p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 outline-none">
                    {trans("inbox")}
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
                <Menu.Items className="absolute z-10 right-0 mt-2 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="w-full">
                        {/* <div className="flex px-4 pt-4 items-center border-b border-gray-100 justify-center gap-20">
                            <button type="button" onClick={() => setActiveTab("messages")} className={"text-lg font-semibold px-2 py-2 border-b-4 rounded " + (activeTab === "messages" ? "border-primary text-primary" : "border-transparent text-gray-800")}>
                                Messages
                            </button>
                            <button type="button" onClick={() => setActiveTab("notifications")} className={"text-lg font-semibold px-2 py-2 border-b-4 rounded " + (activeTab === "notifications" ? "border-primary text-primary" : "border-transparent text-gray-800")}>
                                Notifications
                            </button>
                        </div> */}
                        {
                            activeTab === "messages" ?
                                <div className="py-4">
                                    <NotificationItem short title="Message Title" />
                                    <NotificationItem short title="Message Title" />
                                    <NotificationItem short title="Message Title" />
                                </div>
                                :
                                <div className="py-3 max-h-[400px] overflow-y-auto">
                                    {
                                        notifications?.map((noti) => (
                                            <NotificationItem short notification={noti} />
                                        ))
                                    }
                                </div>
                        }
                        <div className="flex flex-col items-center justify-center border-t px-3 py-2 gap-3 border-gray-100">
                            <a href="/inbox?active=notifications" className="text-sm font-semibold text-primary">
                                {trans("view_all_notifications")}
                            </a>
                            {/* <a href="/inbox?active=messages" className="text-sm font-semibold text-primary">View Messages</a> */}
                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
