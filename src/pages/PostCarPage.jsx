import React from "react";
import TabbedView from "../components/TabbedView";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import ImageDragDropInput from "../components/ImageDragDropInput";
import { BlockPicker, CirclePicker, HuePicker, SketchPicker } from "react-color";
import Popup from "reactjs-popup";



const expandableSections = [
    {
        name: "Photos",
        content: (onValidated) => <PhotosSection onValidated={onValidated} />
    },
    {
        name: "Details",
        content: (onValidated) => <DetailsSection onValidated={onValidated} />
    },
    {
        name: "Features",
        content: (onValidated) => <FeaturesSection onValidated={onValidated} />
    },
    {
        name: "Post",
        content: (onValidated) => <PostSection onValidated={onValidated} />
    },
    {
        name: "Finish",
        content: (onValidated) => <FinishSection onValidated={onValidated} />
    }
]



export default function PostCarPage() {
    const [expandedSection, setExpandedSection] = React.useState(expandableSections[0].name)
    const [validatedSections, setValidatedSections] = React.useState([]);
    return (
        <div className={"max-w-screen-xl mx-auto py-10 md:py-20 " + MAIN_HORIZONTAL_PADDING}>
            <div className="mb-12">
                <h2 className="text-2xl text-gray-900 font-bold inline-flex items-center">
                    <a href="/" className="text-lg text-gray-600">Home</a>
                    <i className="mx-3 text-sm text-gray-500 fa-solid fa-chevron-right"></i>
                    <a href="/post-car" className="text-lg text-gray-900">Post Car</a>
                </h2>
            </div>
            <div className="space-y-6 relative">
                <div className="absolute top-5 left-9 w-0 min-h-[calc(100%_-_30px)] border z-[-1] border-primary"></div>
                {
                    expandableSections.map(({ name, content }, index) => {
                        if (index === 0 || validatedSections.includes(expandableSections[index - 1].name)) {
                            return (
                                <div key={name}>
                                    <div onClick={() => setExpandedSection(name)}
                                        className="flex items-center gap-4 translate-y-1/2 z-[2] max-w-fit bg-white ml-5 cursor-pointer">
                                        {
                                            validatedSections.includes(name) && expandedSection !== name ?
                                                <span className="flex items-center justify-center text-lg font-semibold text-primary aspect-square px-1.5 rounded-full border-2 border-primary">
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
                            );
                        }
                    })
                }
            </div>
        </div>
    );
}



function PhotosSection({ onValidated }) {
    return (
        <div className="pt-5 w-full shadow border rounded-md bg-white">
            <div className="w-full flex flex-wrap items-center p-5 pb-8 gap-6" >
                <ImageDragDropInput withPreview />
                <div className="w-full mt-2">
                    <button type="button" onClick={onValidated} className="btn-primary">
                        Continue
                    </button>
                </div>
            </div>
        </div >
    );
}


function DetailsSection({ onValidated }) {
    return (
        <div className="pt-5 w-full shadow border rounded-md bg-white">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center p-5 pb-8 gap-7" >
                <SelectEl label="Category">
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Truck</option>
                </SelectEl>
                <SelectEl label="Condition">
                    <option>New</option>
                    <option>Excellent</option>
                    <option>Very good</option>
                </SelectEl>
                {/* Year/Model/Make Start */}
                <SelectEl label="Year">
                    <option>2018</option>
                    <option>2019</option>
                    <option>2020</option>
                </SelectEl>
                <SelectEl label="Model">
                    <option>Acura</option>

                </SelectEl>
                <SelectEl label="Make">
                    <option>ILX</option>
                    <option>MDX</option>
                    <option>NSX</option>
                    <option>RDX</option>
                </SelectEl>
                {/* Year/Model/Make End */}
                <InputEl label="Vehicle Trim" />
                <InputEl label="Mileage" />

                <SelectEl label="Car Fuel Type">
                    <option>Acura</option>
                </SelectEl>
                <SelectEl label="Title Status">
                    <option>Clean</option>
                    <option>Rebuilt</option>
                    <option>Salvage</option>
                </SelectEl>
                <ColorPickerEl label="Interior Color" />
                <ColorPickerEl label="Exterior Color" />
                <div className="col-span-1 md:col-span-2 lg:col-span-3 w-full">
                    <button type="button" onClick={onValidated} className="btn-primary">
                        Continue
                    </button>
                </div>
            </div>
        </div >
    );
}



function FeaturesSection({ onValidated }) {
    return (
        <div className="pt-5 w-full shadow border rounded-md bg-white">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 place-items-center p-5 pb-8 gap-7" >
                <CheckBoxEl label="Massage seats" />
                <CheckBoxEl label="Night vision" />
                <CheckBoxEl label="Parking assist" />
                <CheckBoxEl label="Lane keep assist" />
                <CheckBoxEl label="Heads up display" />
                <CheckBoxEl label="Navigation system" />
                <div className="col-span-1 md:col-span-2 w-full">
                    <button type="button" onClick={onValidated} className="btn-primary">
                        Continue
                    </button>
                </div>
            </div>
        </div >
    );
}



function PostSection({ onValidated }) {
    return (
        <div className="pt-5 w-full shadow border rounded-md bg-white">
            <div className="w-full grid grid-cols-3 place-items-center p-5 pb-8 gap-7" >
                <div className="w-full col-span-3">
                    <InputEl type="number" label="Price" icon={"fa-dollar"} />
                </div>
                <div className="w-full col-span-3">
                    <TextAreaEl label="Description" />
                </div>
                <div className="w-full col-span-3">
                    <CheckBoxEl label="Find Me Buyer" />
                </div>
                <div className="col-span-3 w-full">
                    <button type="button" onClick={onValidated} className="btn-primary">
                        Continue
                    </button>
                </div>
            </div>
        </div >
    );
}





function FinishSection({ onValidated, findBuyer = false }) {
    return (
        <div className="pt-5 w-full shadow border rounded-md bg-white">
            <div className="w-full grid grid-cols-3 place-items-center p-5 pb-8 gap-7" >
                <div className="w-full col-span-3">
                    <InputEl type="number" label="Car Location" icon={"fa-location-dot"} />
                </div>
                <div className="col-span-3 w-full">
                    <a href="/find-me-buyer" className="btn-primary">
                        Post
                    </a>
                </div>
            </div>
        </div >
    );
}







function InputEl({ label = "", type = "text", placeholder = "", icon = null }) {
    return (
        <div className="w-full">
            <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-sm font-normal text-gray-800">
                {label}
            </label>
            <span className="relative">
                <input type={type}
                    name={label.toLowerCase().replace(" ", "_")}
                    id={label.toLowerCase().replace(" ", "_")}
                    placeholder={placeholder}
                    className={"rounded w-full py-3 text-gray-900 text-base font-medium mt-1 " + (icon !== null ? "pl-10" : "")} />
                {
                    icon !== null &&
                    <span className="absolute top-1/2 -translate-y-1/2 left-4">
                        <i className={"fa-solid text-gray-800 " + icon}></i>
                    </span>
                }
            </span>
        </div>
    );
}

function TextAreaEl({ label = "", type = "text", placeholder = "" }) {
    return (
        <div className="w-full">
            <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-sm font-normal text-gray-800">
                {label}
            </label>
            <textarea
                name={label.toLowerCase().replace(" ", "_")}
                id={label.toLowerCase().replace(" ", "_")}
                placeholder={placeholder}
                rows={4}
                className="rounded w-full py-3 text-gray-900 text-base font-medium mt-1"></textarea>
        </div>
    );
}


function CheckBoxEl({ label = "" }) {
    return (
        <div className="w-full inline-flex items-center">
            <input type="checkbox"
                name={label.toLowerCase().replace(" ", "_")}
                id={label.toLowerCase().replace(" ", "_")}
                className="rounded p-2.5 text-primary text-base font-medium" />
            <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-base font-medium ml-3 text-gray-800">
                {label}
            </label>
        </div>
    );
}


function ColorPickerEl({ label = "" }) {
    const [pickedColor, setPickedColor] = React.useState("#fff");
    console.log(pickedColor)
    return (
        <div className="w-full">
            <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-sm font-normal text-gray-800">
                {label}
            </label>
            <Popup
                trigger={
                    <div role="button"
                        name={label.toLowerCase().replace(" ", "_")}
                        id={label.toLowerCase().replace(" ", "_")}
                        className="rounded w-full py-6 text-gray-900 text-base font-medium mt-1 border border-gray-600"
                        style={{ background: pickedColor }}
                    />
                }
                position={['top center']}
                contentStyle={{ border: "none", width: "max-content", padding: "20px", background: "#eee" }}
                closeOnDocumentClick
                nested
            >
                <CirclePicker onChangeComplete={(color) => setPickedColor(color.hex)} />
            </Popup>
        </div>
    );
}




function SelectEl({ label = "", children }) {
    return (
        <div className="w-full">
            <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-sm font-normal text-gray-800">
                {label}
            </label>
            <select name={label.toLowerCase().replace(" ", "_")} id={label.toLowerCase().replace(" ", "_")} className="rounded w-full py-3 text-gray-900 text-base font-medium mt-1">
                {children}
            </select>
        </div>
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
                                <button type="button" onClick={onValidated} className="btn-primary">
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
                                <button type="button" onClick={onValidated} className="btn-primary">
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
                                <button type="button" onClick={onValidated} className="pbtn-primary">
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
