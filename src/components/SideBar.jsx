import React from "react";
import { accountPageTabs } from "../pages/AccountPage";
import { faBell, faCircleInfo, faList, faLock, faMessage, faPlus, faRightFromBracket, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthUser from "./hooks/useAuthUser";
import useFiltersFetcher from "./hooks/filtersFetchers";
import { apiConfig } from "../config/api";
import { siteConfig } from "../config/site";
import { handleTranslation } from "../lib/i18n";



export default function SiderBar({ onSidebarClose, onLogout }) {
    const { trans, apiTrans } = handleTranslation()
    const authUser = useAuthUser();
    const { data: categories } = useFiltersFetcher(authUser.accessToken, apiConfig.endpoints.getCategories, []);


    React.useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 1024) {
                onSidebarClose()
            }
        })
    })

    return (
        <div className="fixed top-0 left-0 w-full h-screen max-h-screen overflow-y-auto bg-white shadow-lg z-50 px-4 md:px-10">
            <div className="flex items-center justify-between py-5">
                <div className="inline-flex items-center gap-4">
                    <button type="button" onClick={onSidebarClose} className="text-3xl lg:hidden inline-flex items-center justify-center rounded text-gray-800 bg-transparent border-gray-100 transition-all hover:text-primary">
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <a href="/" className="text-3xl md:text-4xl font-extrabold text-primary">CARHUB</a>
                </div>
                <a href="/post-car" className='text-sm md:text-base font-medium border border-primary text-gray-800 px-4 lg:px-8 py-1.5 lg:py-3 hover:bg-primary/95 hover:text-white transition-all rounded-full'>
                    {trans("post_car")}
                    <FontAwesomeIcon icon={faPlus} className=' ms-3 lg:ms-5' />
                </a>
            </div>
            <div className="mt-10">
                <ul className="py-2">
                    <li>
                        <a href="/inbox?active=messages" className="text-lg font-normal text-black block py-2 px-4 transition-all hover:text-primary hover:bg-gray-100">
                            <FontAwesomeIcon icon={faMessage} className=" text-base text-gray-700 mr-4" />
                            {trans("messages")}
                        </a>
                    </li>
                    <li>
                        <a href="/inbox?active=notifications" className="text-lg font-normal text-black block py-2 px-4 transition-all hover:text-primary hover:bg-gray-100">
                            <FontAwesomeIcon icon={faBell} className=" text-base text-gray-700 mr-4" />
                            {trans("notifications")}
                        </a>
                    </li>
                    {
                        accountPageTabs.map((tab) => (
                            <li>
                                <a href={"/account?active=" + tab.id} className="text-lg font-normal text-black block py-2 px-4 transition-all hover:text-primary hover:bg-gray-100">
                                    <FontAwesomeIcon icon={tab.icon} className=" text-base text-gray-700 mr-4" />
                                    {trans(tab.name)}
                                </a>
                            </li>
                        ))
                    }
                    <li className="border-t mt-6 pt-4"></li>
                    <li>
                        <a href={siteConfig.links.aboutLink} className="text-lg font-normal text-black block py-2 px-4 transition-all hover:text-primary hover:bg-gray-100">
                            <FontAwesomeIcon icon={faCircleInfo} className=" text-base text-gray-700 mr-4" />
                            {trans("about")}
                        </a>
                    </li>
                    <li>
                        <a href={siteConfig.links.termsOfServices} className="text-lg font-normal text-black block py-2 px-4 transition-all hover:text-primary hover:bg-gray-100">
                            <FontAwesomeIcon icon={faList} className=" text-base text-gray-700 mr-4" />
                            {trans("tos")}
                        </a>
                    </li>
                    <li>
                        <a href={siteConfig.links.privacyPolicy} className="text-lg font-normal text-black block py-2 px-4 transition-all hover:text-primary hover:bg-gray-100">
                            <FontAwesomeIcon icon={faLock} className=" text-base text-gray-700 mr-4" />
                            {trans("privacy")}
                        </a>
                    </li>
                    <li className="border-t mt-6 pt-4"></li>
                    <li>
                        <button type="button" onClick={onLogout} className="text-lg font-normal text-black block py-2 px-4 transition-all hover:text-primary hover:bg-gray-100">
                            <FontAwesomeIcon icon={faRightFromBracket} className=" text-base text-gray-700 mr-4" />
                            {trans("logout")}
                        </button>
                    </li>
                </ul>
            </div>
            <div className="mt-8 border-t pt-8">
                <h4 className="text-2xl font-bold text-gray-900">Categories</h4>
                <ul className="py-2">
                    {
                        categories.map((ctgry) => (
                            <li key={ctgry.id}>
                                <a href={"search?category=" + ctgry.id} className="text-lg font-normal text-black flex items-center justify-between py-2 px-4 transition-all hover:text-primary hover:bg-gray-100">
                                    {apiTrans(ctgry, "title")}
                                    <i className="fa-solid fa-arrow-right text-sm text-gray-700"></i>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

