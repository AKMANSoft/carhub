import React from "react";




export default function TabbedView({
    tabs = [{ tabName: "messages", content: () => <></> }],
    tabItemClass = "", tabsContainerClass = ""
}) {
    const [activeTab, setActiveTab] = React.useState(tabs[0].tabName);

    function setTab(tab) {
        setActiveTab(tab)
    }

    return (
        <div className="w-full shadow border rounded-md bg-white">
            <div className={"px-8 py-3 flex items-center gap-7 " + tabsContainerClass}>
                {
                    tabs.map(({ tabName, _ }) => (
                        <button key={tabName} type="button" onClick={() => setTab(tabName)} className={
                            "text-base py-1 border-b-2 capitalize " +
                            (activeTab === tabName ? "border-primary text-primary" : "border-transparent text-gray-800")
                            + " " + tabItemClass
                        }>
                            {tabName}
                        </button>
                    ))
                }
            </div>
            {
                tabs.filter((tab) => tab.tabName === activeTab)?.at(0)?.content()
            }
        </div>
    );
}

