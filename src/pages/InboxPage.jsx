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
import { cn } from "../lib/utils";


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
                                authUser.userProfile !== null &&
                                <MessagesPage authUser={authUser} />
                            )
                        },
                        {
                            tabName: "Notifications",
                            content: () => (
                                notifications ?
                                    notifications.length > 0 ?
                                        <div className="py-4 max-h-[80vh] lg:max-h-[600px] overflow-y-auto">
                                            {
                                                notifications?.map((noti) => (
                                                    <NotificationItem notification={noti} />
                                                ))
                                            }
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

export function NotificationItem({ notification, short = false, }) {
    console.log(notification);
    return (
        <div className={cn(
            "border-b-2 last:border-none border-gray-100 transition-all bg-transparent hover:bg-gray-100 ",
            short ? "py-3 px-4" : "py-4 px-8",
            "flex items-center gap-5"
        )}>
            {
                notification.type === "TYPE_MESSAGE" &&
                <img src={notification?.seller_detail?.image} width={50} height={50} className="min-w-[50px] aspect-square rounded-full border-2 border-gray-200" alt="" />
            }
            <div>
                {
                    notification.type === "TYPE_MESSAGE" &&
                    <h4 className={"text-gray-800 " + (short ? "text-base font-semibold" : "font-semibold")}>
                        <span>{notification?.seller_detail?.name}</span>
                    </h4>
                }
                <p className={cn(
                    "font-normal text-gray-700",
                    short ? "line-clamp-2 mt-1 text-sm" : "mt-2 text-base"
                )}>
                    {notification?.message}
                </p>
            </div>
        </div>
    );
}