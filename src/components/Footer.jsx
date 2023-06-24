import React from "react";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import { SelectBox } from "./selectel";
import { handleTranslation } from "../lib/i18n";



export default function Footer() {
    const { i18n } = handleTranslation()
    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang.value);
        localStorage.setItem("language", lang.value);
    }
    return (
        <footer className={"bg-white z-50 mt-10" + MAIN_HORIZONTAL_PADDING}>
            <div className="flex items-center justify-between py-5 border-t border-gray-300">
                <div>
                    <p className="text-base text-gray-800 font-normal">
                        &copy; 2023
                        <span className="text-primary pl-1 font-semibold">GO CARHUB1 LLC.</span>
                    </p>
                </div>

                <div>
                    <div className="w-full">
                        <SelectBox
                            value={i18n.language}
                            onChange={handleChangeLanguage}
                            position="top"
                            options={[
                                {
                                    label: "English",
                                    value: "en",
                                },
                                {
                                    label: "Spanish",
                                    value: "es",
                                }
                            ]}
                        />
                        {
                            /* <select name="language" defaultValue="english" className="rounded w-full py-2 text-gray-900 text-sm font-normal mt-1">
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                            </select> */
                        }
                    </div>
                </div>
            </div>
        </footer>
    );
}
