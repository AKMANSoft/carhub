import React, { useEffect, useRef, useState } from "react";
import TabbedView from "../components/TabbedView";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import ImageDragDropInput from "../components/ImageDragDropInput";
import MainLayout from "../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronRight, faDollar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { CarConditionsList } from "./SearchPage";
import { cn } from "../lib/utils";
import { apiConfig } from "../config/api";
import useFiltersFetcher from "../components/hooks/filtersFetchers";
import useAuthUser from "../components/hooks/useAuthUser";
import LoaderEl from "../components/loader";
import { exteriorColorsList, interiorColorsList } from "../data/colors";
import doPostCar from "../api/post-car";
import { AddressInputTypes } from "../components/ThemeInput";


const CarPostSections = {
    Photos: "Photos",
    Details: "Details",
    Colors: "Colors",
    Features: "Features",
    Post: "Post",
    Finish: "Finish",
}


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
        name: "Colors",
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
    const authUser = useAuthUser();
    const [expandedSection, setExpandedSection] = React.useState(expandableSections[0].name)
    const [validatedSections, setValidatedSections] = React.useState([]);
    const [alertMessage, setAlertMessage] = useState({ visible: false, text: "", success: false });
    const [taskState, setTaskState] = useState("idle");


    const [carDetails, setCarDetails] = useState({
        images: [],
        details: {
            category: 0,
            condition: "",
            year: "",
            make: "",
            model: "",
            vehicleTrim: "",
            mileage: "",
            fuelType: "",
            titleStatus: ""
        },
        colors: {
            interior: "",
            exterior: "",
        },
        features: [],
        postDetails: {
            price: "",
            description: "",
            findMeBuyer: false
        },
        carLocation: "",
    });



    const onImagesChange = (images) => {
        setCarDetails({
            ...carDetails,
            images: images,
        });
    }
    const onFeaturesChange = (features) => {
        console.log(features)
        setCarDetails({
            ...carDetails,
            features: features,
        });
    }
    const onPostDetailsChange = (postDetails) => {
        setCarDetails({
            ...carDetails,
            postDetails: postDetails,
        });
    }
    const onDetailsChange = (details) => {
        setCarDetails({
            ...carDetails,
            details: details,
        });
    }
    const onColorsChange = (colors) => {
        setCarDetails({
            ...carDetails,
            colors: colors,
        });
    }
    const onCarLocationChange = (carLocation) => {
        setCarDetails({
            ...carDetails,
            carLocation: carLocation,
        });
    }



    const handlePostingCar = async () => {
        setTaskState("processing");
        const response = await doPostCar(carDetails, authUser.accessToken);
        console.log(response);
    }


    return (
        <MainLayout>
            <div className={"max-w-screen-xl mx-auto py-10 md:py-20 " + MAIN_HORIZONTAL_PADDING}>
                <div className="mb-12">
                    <h2 className="text-2xl text-gray-900 font-bold inline-flex items-center">
                        <a href="/" className="text-lg text-gray-600">Home</a>
                        <FontAwesomeIcon icon={faChevronRight} className="mx-3 text-sm text-gray-500" />
                        <a href="/post-car" className="text-lg text-gray-900">Post Car</a>
                    </h2>
                </div>
                {
                    taskState === "processing" ?
                        <LoaderEl className="" />
                        :
                        <div className="space-y-6 relative">
                            <div className="absolute top-5 left-9 w-0 min-h-[calc(100%_-_30px)] border z-[-1] border-primary"></div>
                            <div>
                                {
                                    expandableSections.map(({ name, content }, index) => {
                                        if (index === 0 || validatedSections.includes(expandableSections[index - 1].name)) {
                                            return (
                                                <div key={name} role="button" onClick={() => setExpandedSection(name)}
                                                    className={cn(
                                                        "flex items-center gap-4 translate-y-1/2 z-[2] max-w-fit bg-white ml-5 cursor-pointer",
                                                        !(expandedSection === name) && "mb-6"
                                                    )}>
                                                    {
                                                        validatedSections.includes(name) && expandedSection !== name ?
                                                            <span className="flex items-center justify-center text-lg font-semibold text-primary aspect-square px-1.5 rounded-full border-2 border-primary">
                                                                <FontAwesomeIcon icon={faCheck} />
                                                            </span>
                                                            :
                                                            <span className="flex items-center justify-center text-sm font-semibold text-white aspect-square px-3 rounded-full bg-primary">
                                                                {index + 1}
                                                            </span>
                                                    }
                                                    <h3 className="text-primary text-xl font-semibold">{name}</h3>
                                                </div>

                                            );
                                        }
                                    })
                                }
                                {
                                    expandedSection === CarPostSections.Photos &&
                                    <PhotosSection
                                        images={carDetails.images}
                                        setImages={onImagesChange}
                                        onValidated={() => {
                                            if (carDetails.images.length <= 0) return;
                                            setValidatedSections([...validatedSections, CarPostSections.Photos]);
                                            setExpandedSection(CarPostSections.Details)
                                        }} />
                                }
                                {
                                    expandedSection === CarPostSections.Details &&
                                    <DetailsSection
                                        details={carDetails.details}
                                        setDetails={onDetailsChange}
                                        accessToken={authUser.accessToken}
                                        onValidated={() => {
                                            setValidatedSections([...validatedSections, CarPostSections.Details]);
                                            setExpandedSection(CarPostSections.Colors)
                                        }} />
                                }
                                {
                                    expandedSection === CarPostSections.Colors &&
                                    <ColorsSection
                                        colors={carDetails.colors}
                                        setColors={onColorsChange}
                                        onValidated={() => {
                                            setValidatedSections([...validatedSections, CarPostSections.Colors]);
                                            setExpandedSection(CarPostSections.Features)
                                        }} />
                                }
                                {
                                    expandedSection === CarPostSections.Features &&
                                    <FeaturesSection
                                        features={carDetails.features}
                                        setFeatures={onFeaturesChange}
                                        accessToken={authUser.accessToken}
                                        onValidated={() => {
                                            setValidatedSections([...validatedSections, CarPostSections.Features]);
                                            setExpandedSection(CarPostSections.Post)
                                        }} />
                                }
                                {
                                    expandedSection === CarPostSections.Post &&
                                    <PostSection
                                        postDetails={carDetails.postDetails}
                                        setPostDetails={onPostDetailsChange}
                                        onValidated={() => {
                                            setValidatedSections([...validatedSections, CarPostSections.Post]);
                                            setExpandedSection(CarPostSections.Finish)
                                        }} />
                                }
                                {
                                    expandedSection === CarPostSections.Finish &&
                                    <FinishSection
                                        carLocation={carDetails.carLocation}
                                        setCarLocation={onCarLocationChange}
                                        onValidated={() => {
                                            handlePostingCar()
                                        }} />
                                }
                            </div>
                        </div>
                }
            </div>
        </MainLayout>
    );
}



function PhotosSection({ onValidated, setImages, images }) {
    return (
        <div className="pt-5 w-full shadow border rounded-md bg-white">
            <div className="w-full flex flex-wrap items-center p-5 pb-8 gap-6" >
                <ImageDragDropInput images={images} withPreview onImagesChange={setImages} />
                <div className="w-full mt-2">
                    <button
                        type="button" onClick={onValidated}
                        className="btn-primary disabled:!bg-primary disabled:text-gray-300 disabled:pointer-events-none"
                        disabled={images?.length <= 0}>
                        Continue
                    </button>
                </div>
            </div>
        </div >
    );
}



const FuelTypes = [
    "Gas",
    "Diesel",
    "Hybrid",
    "Electric",
    "Flex"
]

function DetailsSection({ onValidated, details, setDetails, accessToken }) {
    const { data: categories } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCategories);
    const { data: years } = useFiltersFetcher(accessToken, apiConfig.endpoints.getYears);
    const { data: makes } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCarMakes + `?year=${details.year}`);
    const { data: models } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCarModels + `?year=${details.year}&make=${details.make}`);
    const { data: vehicleTrims } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCarTrims + `?year=${details.year}&make=${details.make}&model=${details.model}`);

    const isValidated = () => {
        return (details.category !== "" && details.condition !== "" &&
            details.year !== "" && details.make !== "" &&
            details.mdoel !== "" && details.fuelType !== "" &&
            details.titleStatus !== "")
    }

    const validateAndContinue = () => {
        if (isValidated()) onValidated();
    }

    console.log(vehicleTrims)

    return (
        <div className="pt-5 w-full shadow border rounded-md bg-white">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center p-5 pb-8 gap-7" >
                <SelectEl
                    items={categories ? categories.map((ctgry) => ({ value: ctgry.id, label: ctgry.title })) : []}
                    label="Category" value={details.category}
                    onChange={(value) => setDetails({ ...details, category: value })} />
                <SelectEl
                    items={
                        CarConditionsList
                            .filter((condition) => condition.id !== "all")
                            .map((condition) =>
                                ({ value: condition.id, label: condition.label })
                            )}
                    label="Condition" value={details.condition}
                    onChange={(value) => setDetails({ ...details, condition: value })} />
                {/* Year/Model/Make Start */}
                <SelectEl
                    items={years ? years.map((yearObj) => ({ value: yearObj.year, label: yearObj.year })) : []}
                    label="Year" value={details.year}
                    onChange={(value) => setDetails({ ...details, year: value })} />
                <SelectEl
                    items={makes ? makes.map((makeObj) => ({ value: makeObj.make, label: makeObj.make })) : []}
                    label="Make" value={details.make}
                    onChange={(value) => setDetails({ ...details, make: value })} />
                <SelectEl
                    items={models ? models.map((modelObj) => ({ value: modelObj.model, label: modelObj.model })) : []}
                    label="Model" value={details.model}
                    onChange={(value) => setDetails({ ...details, model: value })} />
                {/* Year/Model/Make End */}

                <SelectEl
                    items={vehicleTrims ? vehicleTrims.map((vTrim) => ({ value: vTrim.vehicle_trim, label: vTrim.vehicle_trim })) : []}
                    label="Vehicle Trim" value={details.vehicleTrim}
                    onChange={(value) => setDetails({ ...details, vehicleTrim: value })} />

                <InputEl label="Mileage" type="number"
                    value={details.mileage}
                    onChange={(value) => setDetails({ ...details, mileage: value })} />

                <SelectEl
                    items={FuelTypes.map((fuel) => ({ value: fuel, label: fuel }))}
                    label="Car Fuel Type" value={details.fuelType}
                    onChange={(value) => setDetails({ ...details, fuelType: value })} />
                <SelectEl label="Title Status" value={details.titleStatus}
                    onChange={(value) => setDetails({ ...details, titleStatus: value })}>
                    <option value="clean">Clean</option>
                    <option value="rebuilt">Rebuilt</option>
                    <option value="salvage">Salvage</option>
                </SelectEl>

                <div className="col-span-1 md:col-span-2 lg:col-span-3 w-full">
                    <button
                        type="button"
                        onClick={validateAndContinue}
                        className="btn-primary disabled:!bg-primary disabled:text-gray-300 disabled:pointer-events-none"
                        disabled={!isValidated()}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div >
    );
}




function ColorsSection({ onValidated, colors, setColors }) {

    const onExteriorColorChange = (color) => {
        setColors({
            interior: colors.interior,
            exterior: color.hex
        })
    }
    const onInteriorColorChange = (color) => {
        setColors({
            interior: color.hex,
            exterior: colors.exterior
        })
    }


    return (
        <div className="w-full shadow border rounded-md bg-white p-5 pb-8">
            <div className="divide-y">
                <div className="py-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-8">
                        Exterior Color:
                        <span className="font-normal text-base ms-2">
                            {exteriorColorsList.find((clr) => colors.exterior === clr.hex)?.label ?? ""}
                        </span>
                    </h3>
                    <div className="w-full grid grid-cols-5 items-start gap-7" >
                        {
                            exteriorColorsList.map((color) => (
                                <div key={color.hex} className="flex flex-col items-center justify-center gap-x-4 gap-y-7">
                                    <button type="button" className={cn(
                                        "block w-14 h-auto rounded-full overflow-hidden aspect-square transition-all ring-4 cursor-pointer",
                                        colors.exterior === color.hex ? "ring-primary" : "ring-transparent hover:ring-primary"
                                    )}
                                        onFocus={() => onExteriorColorChange(color)}
                                        onClick={() => onExteriorColorChange(color)}
                                        style={{ background: color.hex }} >
                                    </button>
                                    <span className="block text-sm font-semibold text-gray-800 text-center">
                                        {color.label}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="py-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-8">
                        Interior Color:
                        <span className="font-normal text-base ms-2">
                            {interiorColorsList.find((clr) => colors.interior === clr.hex)?.label ?? ""}
                        </span>
                    </h3>
                    <div className="w-full grid grid-cols-5 items-start gap-7" >
                        {
                            interiorColorsList.map((color) => (
                                <div key={color.hex} className="flex flex-col items-center justify-center gap-x-4 gap-y-7">
                                    <button type="button" className={cn(
                                        "block w-14 h-auto rounded-full overflow-hidden aspect-square transition-all ring-4 cursor-pointer",
                                        colors.interior === color.hex ? "ring-primary" : "ring-transparent hover:ring-primary"
                                    )}
                                        onFocus={() => onInteriorColorChange(color)}
                                        onClick={() => onInteriorColorChange(color)}
                                        style={{ background: color.hex }} >
                                    </button>
                                    <span className="block text-sm font-semibold text-gray-800 text-center">
                                        {color.label}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="w-full mt-5">
                <button
                    type="button"
                    onClick={onValidated}
                    className="btn-primary disabled:!bg-primary disabled:text-gray-300 disabled:pointer-events-none"
                    disabled={!colors || colors.interior === "" || colors.exterior === ""}
                >
                    Continue
                </button>
            </div>
        </div >
    );
}



function FeaturesSection({ onValidated, accessToken, features = [], setFeatures }) {
    const { data: featuresCategories, isLoading, error } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCarFeatures);

    const onFeaturesChange = (feature, value) => {
        if (features.includes(feature.id) && value === false) {
            setFeatures(features.filter((f) => f.id !== feature.id))
        }
        else {
            setFeatures([...features, feature.id])
        }
    }

    return (
        <div className="w-full shadow border rounded-md bg-white p-5 pb-8">
            <div className="divide-y">
                {
                    isLoading || error ?
                        <LoaderEl containerClassName="w-full " />
                        :
                        featuresCategories &&
                        featuresCategories.map((featureCtgry) => (
                            <div key={featureCtgry.id} className="py-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{featureCtgry.title}:</h3>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 place-items-center gap-7" >
                                    {
                                        featureCtgry.children.map((feature) => (
                                            <CheckBoxEl
                                                key={feature.id}
                                                label={feature.title}
                                                value={features.includes(feature.id)}
                                                onChange={(val) => onFeaturesChange(feature, val)} />
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                }
            </div>
            <div className="w-full mt-5">
                <button
                    type="button"
                    onClick={onValidated}
                    className="btn-primary disabled:!bg-primary disabled:text-gray-300 disabled:pointer-events-none"
                >
                    Continue
                </button>
            </div>
        </div >
    );
}



function PostSection({ onValidated, postDetails, setPostDetails }) {

    const onPriceChange = (price) => {
        setPostDetails({
            ...postDetails,
            price: price,
        })
    }
    const onDescriptionChange = (desc) => {
        setPostDetails({
            ...postDetails,
            description: desc,
        })
    }
    const onFindMeBuyerChange = (value) => {
        setPostDetails({
            ...postDetails,
            findMeBuyer: value,
        })
    }

    return (
        <div className=" w-full shadow border rounded-md bg-white p-5 pb-8">
            <div className="w-full grid grid-cols-3 place-items-center pt-5  gap-7" >
                <div className="w-full col-span-3">
                    <InputEl
                        type="number" label="Price" icon={faDollar}
                        value={postDetails.price}
                        onChange={onPriceChange}
                    />
                </div>
                <div className="w-full col-span-3">
                    <TextAreaEl label="Description"
                        value={postDetails.description}
                        onChange={onDescriptionChange} />
                </div>
                <div className="w-full col-span-3">
                    <CheckBoxEl label="Find Me Buyer"
                        value={postDetails.findMeBuyer}
                        onChange={onFindMeBuyerChange} />
                </div>
            </div>
            <button
                type="button"
                onClick={onValidated}
                className="btn-primary disabled:!bg-primary disabled:text-gray-300 disabled:pointer-events-none"
                disabled={!postDetails || postDetails.price === ""}
            >
                Continue
            </button>
        </div >
    );
}





function FinishSection({ onValidated, carLocation, setCarLocation }) {

    return (
        <div className="pt-5 w-full shadow border rounded-md bg-white">
            <div className="w-full grid grid-cols-3 place-items-center p-5 pb-8 gap-7" >
                <div className="w-full col-span-3">
                    <LocationInputEl
                        label="Car Location" icon={faLocationDot}
                        value={carLocation} onChange={setCarLocation} />
                </div>
                <div className="col-span-3 w-full">
                    <button
                        type="button"
                        onClick={onValidated}
                        className="btn-primary disabled:!bg-primary disabled:text-gray-300 disabled:pointer-events-none"
                        disabled={!carLocation || carLocation === ""}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div >
    );
}










const InputEl = React.forwardRef(({ label = "", type = "text", placeholder = "", icon = null, value, onChange }, ref) => (
    <div className="w-full">
        <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-sm font-normal text-gray-800">
            {label}
        </label>
        <span className="relative">
            <input ref={ref} type={type}
                name={label.toLowerCase().replace(" ", "_")}
                id={label.toLowerCase().replace(" ", "_")}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={"rounded w-full py-3 text-gray-900 text-base font-medium mt-1 " + (icon !== null ? "pl-10" : "")} />
            {
                icon !== null &&
                <span className="absolute top-1/2 -translate-y-1/2 left-4">
                    <FontAwesomeIcon icon={icon} className={"fa-solid text-gray-800"} />
                </span>
            }
        </span>
    </div>
))




export function LocationInputEl({
    onChange, className, label
}) {
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    // const [text, setText] = useState(value);
    const options = {
        // componentRestrictions: { country: "ng" },
        fields: ["address_components", "geometry", "name"],
        // types: addressType === AddressInputTypes.DEFAULT ? [] : [addressType]
        // types: ["establishment"]
    };
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current?.getPlace();

            let cityName = '';
            let stateName = '';
            for (let component of place.address_components) {
                if (cityName === '' && component.types.includes('locality')) {
                    cityName = component.long_name;
                }
                if (component.types.includes('administrative_area_level_1')) {
                    stateName = component.long_name;
                }
            }

            onChange({
                city: cityName,
                state: stateName,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
            })
        });
    }, []);
    return (
        <InputEl
            ref={inputRef} type="text"
            className={className}
            label={label}
            icon={faLocationDot}
            value={null}
            onChange={null} />
    );
}




function TextAreaEl({ label = "", placeholder = "", onChange, value }) {
    return (
        <div className="w-full">
            <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-sm font-normal text-gray-800">
                {label}
            </label>
            <textarea
                name={label.toLowerCase().replace(" ", "_")}
                id={label.toLowerCase().replace(" ", "_")}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={4}
                className="rounded w-full py-3 text-gray-900 text-base font-medium mt-1"></textarea>
        </div>
    );
}


function CheckBoxEl({ label = "", onChange, value }) {
    return (
        <div className="w-full inline-flex items-center">
            <input type="checkbox"
                name={label.toLowerCase().replace(" ", "_")}
                id={label.toLowerCase().replace(" ", "_")}
                value={value}
                onChange={(e) => onChange(e.target.checked)}
                className="rounded p-2.5 text-primary text-base font-medium" />
            <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-base font-medium ml-3 text-gray-800">
                {label}
            </label>
        </div>
    );
}


function SelectEl({ label = "", children, items = null, value, onChange }) {
    return (
        <div className="w-full">
            <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-sm font-normal text-gray-800">
                {label}
            </label>
            <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded w-full py-3 text-gray-900 text-base font-medium mt-1">
                <option value="">Select {label}</option>
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


