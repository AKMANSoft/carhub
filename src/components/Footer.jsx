import React from "react";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import SelectEl, { SelectBox } from "./selectel";



export default function Footer() {
    const [selLanguage, setSelLanguage] = React.useState("english");
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
                            value={selLanguage} onChange={setSelLanguage}
                            position="top"
                            options={[
                                {
                                    label: "English",
                                    value: "english",
                                },
                                {
                                    label: "Spanish",
                                    value: "spanish",
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
