import React from "react";
import TabbedView from "../components/TabbedView";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import ImageDragDropInput from "../components/ImageDragDropInput";



const expandableSections = [
    {
        name: "Photos",
        content: (onValidated) => <PhotosSection onValidated={onValidated} />
    },
    {
        name: "Colors and Options",
        content: (onValidated) => <PhotosSection onValidated={onValidated} />
    },
    {
        name: "Condition and Mileage",
        content: (onValidated) => <PhotosSection onValidated={onValidated} />
    },
    {
        name: "Condition Questions",
        content: (onValidated) => <PhotosSection onValidated={onValidated} />
    }
]



export default function PostCarPage() {
    const [expandedSection, setExpandedSection] = React.useState(expandableSections[0].name)
    const [validatedSections, setValidatedSections] = React.useState([]);
    return (
        <div className={"max-w-screen-2xl mx-auto py-10 md:py-20 " + MAIN_HORIZONTAL_PADDING}>
            <div className="space-y-6 relative">
                <div className="absolute top-5 left-9 w-0 min-h-[95%] border z-[-1] border-primary"></div>
                {
                    expandableSections.map(({ name, content }, index) => (
                        <div>
                            <div onClick={() => setExpandedSection(name)}
                                className="flex items-center gap-4 translate-y-1/2 z-[2] max-w-fit bg-white ml-5 cursor-pointer">
                                {
                                    validatedSections.includes(name) && expandedSection !== name ?
                                        <span className="flex items-center justify-center text-lg font-semibold text-green-500 aspect-square px-1.5 rounded-full border-2 border-green-500">
                                            <i className="fa-solid fa-check"></i>
                                        </span>
                                        :
                                        <span className="flex items-center justify-center text-sm font-semibold text-white aspect-square px-3 rounded-full bg-primary">
                                            {index + 1}
                                        </span>
                                }
                                <h3 className="text-primary text-xl font-semibold">{name}</h3>
                            </div>
                            {
                                expandedSection === name && content(() => {
                                    setValidatedSections([...validatedSections, name]);
                                    if (!(index >= expandableSections.length)) {
                                        setExpandedSection(expandableSections[index + 1].name);
                                    }
                                })
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}



function PhotosSection({ onValidated }) {
    return (
        <div className="w-full shadow border rounded-md bg-white">
            <div className="w-full flex flex-wrap items-center p-5 pb-8 gap-6" >
                <ImageDragDropInput withPreview onImagesChanged={(imgs) => setImages(imgs)} />
                <div className="w-full mt-2">
                    <button type="button" onClick={onValidated} className="px-16 py-3 bg-primary text-white text-lg rounded transition-all hover:bg-primary/90">
                        Continue
                    </button>
                </div>
            </div>
        </div >
    );
}



function LocationAndStyle({ onValidated }) {
    return (
        <TabbedView
            tabsContainerClass="pt-8"
            tabs={[
                {
                    tabName: "Year/Make/Model",
                    content: () => (
                        <div className="w-full flex flex-wrap items-center p-5 pb-8 gap-6">
                            <ImageDragDropInput withPreview onImagesChanged={(imgs) => setImages(imgs)} />
                            {/* <SelectEl label="Make">
                                <option value="">BMW</option>
                                <option value="">Bentley</option>
                            </SelectEl>

                            <SelectEl label="Model">
                                <option value="">2 Series</option>
                                <option value="">3 Series</option>
                            </SelectEl>
                            <SelectEl label="Year">
                                <option value="">2017</option>
                                <option value="">2018</option>
                            </SelectEl>
                            <SelectEl label="Style">
                                <option value="">Style 1</option>
                                <option value="">Style 2</option>
                            </SelectEl>
                            <InputEl label="Zip" type="number" /> */}
                            <div className="w-full mt-2">
                                <button type="button" onClick={onValidated} className="px-16 py-3 bg-primary text-white text-lg rounded transition-all hover:bg-primary/90">
                                    Continue
                                </button>
                            </div>
                        </div>
                    )
                },
                {
                    tabName: "VIN",
                    content: () => (
                        <div className="w-full flex flex-wrap p-8 gap-6">
                            <div className="w-full">
                                <InputEl label="Zip" type="number" />
                            </div>
                            <div className="w-full">
                                <InputEl label="VIN" />
                            </div>
                            <div className="w-full mt-2">
                                <button type="button" onClick={onValidated} className="px-16 py-3 bg-primary text-white text-lg rounded transition-all hover:bg-primary/90">
                                    Continue
                                </button>
                            </div>
                        </div>
                    )
                },
                {
                    tabName: "Licence Plate",
                    content: () => (
                        <div className="w-full flex flex-wrap p-8 gap-6">
                            <div className="w-full">
                                <InputEl label="Zip" type="number" />
                            </div>
                            <InputEl label="License Plate" />
                            <SelectEl label="State">
                                <option value="">Select State</option>
                                <option value="">State 1</option>
                            </SelectEl>
                            <div className="w-full mt-2">
                                <button type="button" onClick={onValidated} className="px-16 py-3 bg-primary text-white text-lg rounded transition-all hover:bg-primary/90">
                                    Continue
                                </button>
                            </div>
                        </div>
                    )
                },
            ]}
        />
    );
}



function InputEl({ label = "", type = "text", placeholder = "" }) {
    return (
        <div className="w-2/5">
            <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-sm font-normal text-gray-800">
                {label}
            </label>
            <input type={type} name={label.toLowerCase().replace(" ", "_")} id={label.toLowerCase().replace(" ", "_")} placeholder={placeholder} className="rounded w-full py-3 text-gray-900 text-base font-medium mt-1" />
        </div>
    );
}




function SelectEl({ label = "", children }) {
    return (
        <div className="w-2/5">
            <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-sm font-normal text-gray-800">
                {label}
            </label>
            <select name={label.toLowerCase().replace(" ", "_")} id={label.toLowerCase().replace(" ", "_")} className="rounded w-full py-3 text-gray-900 text-base font-medium mt-1">
                {children}
            </select>
        </div>
    );
}
