import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "preact";
import React from 'react'
import { cn } from '../lib/utils'
import { handleTranslation } from "../lib/i18n";

export default function SelectEl({ label = "", children, items = null, value, onChange, isOptional = false, disabled = false }) {
    const { trans } = handleTranslation();
    return (
        <div className="w-full">
            {
                label !== "" &&
                <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-sm font-normal text-gray-800">
                    {label}
                    {
                        isOptional &&
                        <span className="ms-2 text-gray-500">
                            ({trans("optional")})
                        </span>
                    }
                </label>
            }
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="rounded w-full py-3 text-gray-900 text-base font-medium mt-1">
                <option value="">{trans("select")} {label}</option>
                {
                    items && items !== null ?
                        items.map((item) => (
                            <option key={item.value} value={item.value}>{item.label}</option>
                        ))
                        : children
                }
            </select>
        </div>
    );
}



export function SelectBox({ label = "", options, value, onChange, isOptional = false, position = "bottom" }) {
    const [selOpt, setSelOpt] = React.useState(options.find((opt) => opt.value === value) ?? options[0]);

    const onOptChange = (opt) => {
        setSelOpt(opt);
        onChange(opt)
    }

    return (
        <div className="relative w-full">
            <Listbox value={selOpt} onChange={onOptChange}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg text-gray-800 py-2 px-5 flex items-center justify-between gap-7 text-left font-medium text-base border border-gray-300">
                        <span className="block truncate">{selOpt.label}</span>
                        <FontAwesomeIcon icon={faChevronDown}
                            className="text-sm transition-all text-gray-600 ui-open:rotate-180"
                            aria-hidden="true"
                        />
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className={cn(
                            "absolute max-h-60 w-full overflow-y-auto rounded-md bg-white border border-gray-300 text-base shadow-lg",
                            position === "bottom" ? "top-full mt-1" : "bottom-full mb-1"
                        )}>
                            {
                                options.map((option) => (
                                    <Listbox.Option
                                        key={option.value}
                                        className={cn(
                                            "relative cursor-default select-none py-2 px-5",
                                            "ui-selected:bg-primary ui-selected:text-white",
                                            "ui-active:ui-not-selected:bg-gray-100",
                                        )}
                                        value={option}
                                    >
                                        <span className="block truncate">{option.label}</span>
                                    </Listbox.Option>
                                ))
                            }
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

