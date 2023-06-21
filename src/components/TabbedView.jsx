import React from "react";
import { useSearchParams } from "react-router-dom";




export default function TabbedView({
    tabs = [{ tabName: "messages", tabKey, content: () => <></> }],
    tabItemClass = "", tabsContainerClass = "",
    checkFromParam = false,
    paramName = "active"
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = React.useState(() => {
        if (!checkFromParam) return tabs[0].tabKey;
        return searchParams.get(paramName)?.toLowerCase() ?? tabs[0].tabKey
    });


    function setTab(tab) {
        if (checkFromParam) setSearchParams(paramName + "=" + tab.toLowerCase());
        setActiveTab(tab.toLowerCase())
    }


    return (
        <div className="w-full h-full shadow border rounded-md bg-white overflow-hidden">
            <div className={"px-8 py-3 flex items-center gap-7 " + tabsContainerClass}>
                {
                    tabs.map(({ tabName, tabKey, _ }) => (
                        <button key={tabName} type="button" onClick={() => setTab(tabKey)} className={
                            "text-base py-1 border-b-2 capitalize " +
                            (activeTab === tabKey ? "border-primary text-primary" : "border-transparent text-gray-800")
                            + " " + tabItemClass
                        }>
                            {tabName}
                        </button>
                    ))
                }
            </div>
            {
                tabs.find((tab) => tab.tabKey === activeTab)?.content()
            }
        </div>
    );
}

