import React from "react";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import TabbedView from "../components/TabbedView";
import MessagesPage from "./MessagesPage";
import MainLayout from "../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import useNotificationsFetcher from "../components/hooks/notificationsFetcher";
import useAuthUser from "../components/hooks/useAuthUser";
import LoaderEl from "../components/loader";


export default function InboxPage() {
    const authUser = useAuthUser();
    const { notifications } = useNotificationsFetcher(authUser.accessToken)

    return (
        <MainLayout>
            <div className={"max-w-screen-2xl mx-auto py-10 md:py-20" + MAIN_HORIZONTAL_PADDING}>
                <div className="mb-12">
                    <h2 className="text-2xl text-gray-900 font-bold inline-flex items-center">
                        <a href="/" className="text-lg text-gray-600">Home</a>
                        <FontAwesomeIcon icon={faChevronRight} className="mx-3 text-sm text-gray-500" />
                        <a href="/inbox" className="text-lg text-gray-900">Inbox</a>
                    </h2>
                </div>

                <TabbedView
                    checkFromParam={true}
                    paramName="active"
                    tabs={[
                        {
                            tabName: "Messages",
                            content: () => (
                                <MessagesPage />
                            )
                        },
                        {
                            tabName: "Notifications",
                            content: () => (
                                notifications ?
                                    notifications.length > 0 ?
                                        <div className="py-4">
                                            <NotificationItem />
                                            <NotificationItem />
                                            <NotificationItem />
                                        </div>
                                        :
                                        <div className="flex items-center justify-center py-40">
                                            <p className="text-base font-medium text-gray-800">No notifications.</p>
                                        </div>
                                    :
                                    <LoaderEl />
                            )
                        }
                    ]}
                />
            </div>
        </MainLayout>
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