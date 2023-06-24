import React, { useEffect, useRef, useState } from "react";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import ImageDragDropInput from "./ImageDragDropInput";
import MainLayout from "./layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronDown, faChevronRight, faDollar, faEdit, faLocationDot, faPencil } from "@fortawesome/free-solid-svg-icons";
import { CarConditionsList } from "../pages/SearchPage";
import { cn } from "../lib/utils";
import { apiConfig } from "../config/api";
import useFiltersFetcher, { sortYears } from "./hooks/filtersFetchers";
import LoaderEl from "./loader";
import { exteriorColorsList, interiorColorsList } from "../data/colors";
import doPostCar from "../api/post-car";
import AlertMessage from "./ThemeAlert";
import SelectEl from "./selectel";
import { handleTranslation } from "../lib/i18n";


const CarPostSections = {
    Photos: "photos",
    Details: "details",
    Colors: "colors",
    Features: "features",
    OtherDetails: "other_details",
    CarLocation: "car_location",
}


const expandableSections = [
    {
        name: "photos",
        content: (onValidated) => <PhotosSection onValidated={onValidated} />
    },
    {
        name: "details",
        // content: (onValidated) => <DetailsSection onValidated={onValidated} />
    },
    {
        name: "colors",
        // content: (onValidated) => <DetailsSection onValidated={onValidated} />
    },
    {
        name: "features",
        // content: (onValidated) => <FeaturesSection onValidated={onValidated} />
    },
    {
        name: "other_details",
        // content: (onValidated) => <OtherDetailsSection onValidated={onValidated} />
    },
    {
        name: "car_location",
        // content: (onValidated) => <CarLocationSection onValidated={onValidated} />
    }
]

const defaultCarDetails = {
    images: [],
    details: {
        category: "",
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
    carLocation: {
        city: "",
        state: "",
        country: "",
        latitude: 0,
        longitude: 0,
        zipCode: null,
    },
}

export default function AddEditCarComponent({ editMode = false, authUser, editCarDetails, updateCarDetails, showLoadingBtn = false }) {
    const { trans } = handleTranslation()
    const [expandedSection, setExpandedSection] = React.useState("")
    const [validatedSections, setValidatedSections] = React.useState(
        editMode && editCarDetails ? expandableSections.map((expSec) => expSec.name) : []
    );
    const [alertMessage, setAlertMessage] = useState({ visible: false, text: "", success: false });
    const [taskState, setTaskState] = useState("idle");


    const [carDetails, setCarDetails] = useState(editMode && editCarDetails ? {
        images: editCarDetails.cars_images.map((img) => {
            return {
                id: img.id,
                image: img.image,
                blob: null
            }
        }),
        details: {
            category: editCarDetails.category_id,
            condition: editCarDetails.condition,
            year: editCarDetails.year,
            make: editCarDetails.make,
            model: editCarDetails.model,
            vehicleTrim: editCarDetails.engine_size,
            mileage: editCarDetails.mileage,
            fuelType: editCarDetails.car_fuel_type,
            titleStatus: editCarDetails.title_status
        },
        colors: {
            interior: editCarDetails.color,
            exterior: editCarDetails.exterior_color,
        },
        features: editCarDetails.vehicle_new?.reduce((childrenArray, obj) => {
            return childrenArray.concat(obj.children.map((f) => f.id));
        }, []),
        postDetails: {
            price: editCarDetails.amount,
            description: editCarDetails.description,
            findMeBuyer: editCarDetails.find_me_buyer === "1"
        },
        carLocation: {
            city: editCarDetails.city,
            state: editCarDetails.state,
            country: "",
            latitude: editCarDetails.lat,
            longitude: editCarDetails.lng,
            zipCode: editCarDetails.zip_code,
            address: editCarDetails.car_address
        },
    } : defaultCarDetails);



    const onImagesChange = (images) => {
        setCarDetails({
            ...carDetails,
            images: images,
        });
    }
    const onFeaturesChange = (features) => {
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
        window.scrollTo({
            top: 0
        })
        const response = await doPostCar(carDetails, authUser.accessToken);
        if (response !== null) {
            setAlertMessage({
                success: response.success,
                visible: true,
                text: response.message
            });
            if (response.success === true) {
                setCarDetails(defaultCarDetails);
            }
            setTaskState(response.success ? "completed" : "failed")
        } else {
            setTaskState("failed");
        }
    }

    React.useEffect(() => {
        window.scrollTo({
            top: 0
        })
    }, [expandedSection])


    return (
        <MainLayout>
            <div className={"max-w-screen-xl mx-auto py-10 md:py-20 " + MAIN_HORIZONTAL_PADDING}>
                <div className="mb-12">
                    <h2 className="text-2xl text-gray-900 font-bold inline-flex items-center">
                        <a href="/" className="text-lg text-gray-600">
                            {trans("home")}
                        </a>
                        <FontAwesomeIcon icon={faChevronRight} className="mx-3 text-sm text-gray-500" />
                        <a href="/post-car" className="text-lg text-gray-900">
                            {
                                editMode ?
                                    trans("edit_car_details")
                                    : trans("post_car")
                            }
                        </a>
                    </h2>
                </div>
                <AlertMessage
                    success={alertMessage.success}
                    visible={alertMessage.visible}
                    text={alertMessage.text}
                    onDissmissAlert={() => setAlertMessage({ ...alertMessage, visible: false })} />
                {
                    taskState === "completed" ?
                        <div className="flex items-center justify-center gap-5 h-64">
                            <a href="/" className="rounded bg-gray-200 py-3 px-5 text-base">
                                {trans("go-home")}
                            </a>
                            <a href="/account?active=my-cars" className="btn-primary text-base">
                                {trans("view_your_cars")}
                            </a>
                        </div>
                        :
                        taskState === "processing" ?
                            <LoaderEl className="" />
                            :
                            <div className="space-y-6 relative">
                                <div className="absolute top-6 left-9 w-0 min-h-[calc(100%_-_30px)] border z-[-1] border-primary"></div>
                                <div>
                                    {
                                        expandableSections.map(({ name }, index) => {
                                            if (index === 0 || validatedSections.includes(expandableSections[index - 1].name)) {
                                                return (
                                                    <div>
                                                        <div key={name} role="button"
                                                            onClick={() => setExpandedSection(expandedSection === name ? "" : name)}
                                                            className={cn(
                                                                "flex items-center justify-between translate-y-1/2 z-[2] w-full px-5 cursor-pointer",
                                                                !(expandedSection === name) && "mb-6"
                                                            )}>
                                                            <div className="flex items-center gap-4 bg-white">
                                                                {
                                                                    editMode ?
                                                                        validatedSections.includes(name) && expandedSection !== name ?
                                                                            <span className="flex items-center justify-center text-sm font-semibold text-white aspect-square px-3 rounded-full bg-primary">
                                                                                {index + 1}
                                                                            </span>
                                                                            :
                                                                            <span className="flex items-center justify-center text-lg font-semibold text-primary aspect-square px-1.5 rounded-full border-2 border-primary">
                                                                                <FontAwesomeIcon icon={faPencil} />
                                                                            </span>
                                                                        :
                                                                        validatedSections.includes(name) && expandedSection !== name ?
                                                                            <span className="flex items-center justify-center text-lg font-semibold text-primary aspect-square px-1.5 rounded-full border-2 border-primary">
                                                                                <FontAwesomeIcon icon={faCheck} />
                                                                            </span>
                                                                            :
                                                                            <span className="flex items-center justify-center text-sm font-semibold text-white aspect-square px-3 rounded-full bg-primary">
                                                                                {index + 1}
                                                                            </span>
                                                                }
                                                                <h3 className="text-primary text-xl font-semibold">
                                                                    {trans(name)}
                                                                </h3>
                                                            </div>
                                                            <span className="bg-white p-2 text-base rounded-full">
                                                                <FontAwesomeIcon icon={faChevronDown} className={expandedSection === name ? "transition-all -rotate-180" : ""} />
                                                            </span>
                                                        </div>
                                                        {
                                                            name === CarPostSections.Photos && expandedSection === CarPostSections.Photos &&
                                                            <PhotosSection
                                                                showLoadingBtn={showLoadingBtn}
                                                                editMode={editMode}
                                                                images={carDetails.images}
                                                                setImages={onImagesChange}
                                                                onValidated={(next = true) => {
                                                                    if (carDetails.images.length <= 0) return;
                                                                    if (!validatedSections.includes(CarPostSections.Photos))
                                                                        setValidatedSections([...validatedSections, CarPostSections.Photos]);
                                                                    if (!next) updateCarDetails(carDetails)
                                                                    else setExpandedSection(CarPostSections.Details);
                                                                }} />
                                                        }
                                                        {
                                                            name === CarPostSections.Details && expandedSection === CarPostSections.Details &&
                                                            <DetailsSection
                                                                showLoadingBtn={showLoadingBtn}

                                                                editMode={editMode}
                                                                details={carDetails.details}
                                                                setDetails={onDetailsChange}
                                                                accessToken={authUser.accessToken}
                                                                onValidated={(next = true) => {
                                                                    if (!validatedSections.includes(CarPostSections.Details))
                                                                        setValidatedSections([...validatedSections, CarPostSections.Details]);
                                                                    if (!next) updateCarDetails(carDetails)
                                                                    else setExpandedSection(CarPostSections.Colors)
                                                                }} />
                                                        }
                                                        {
                                                            name === CarPostSections.Colors && expandedSection === CarPostSections.Colors &&
                                                            <ColorsSection
                                                                showLoadingBtn={showLoadingBtn}

                                                                editMode={editMode}
                                                                colors={carDetails.colors}
                                                                setColors={onColorsChange}
                                                                onValidated={(next = true) => {
                                                                    if (!validatedSections.includes(CarPostSections.Colors))
                                                                        setValidatedSections([...validatedSections, CarPostSections.Colors]);
                                                                    if (!next) updateCarDetails(carDetails)
                                                                    else setExpandedSection(CarPostSections.Features)
                                                                }} />
                                                        }
                                                        {
                                                            name === CarPostSections.Features && expandedSection === CarPostSections.Features &&
                                                            <FeaturesSection
                                                                showLoadingBtn={showLoadingBtn}

                                                                editMode={editMode}
                                                                features={carDetails.features}
                                                                setFeatures={onFeaturesChange}
                                                                accessToken={authUser.accessToken}
                                                                onValidated={(next = true) => {
                                                                    if (!validatedSections.includes(CarPostSections.Features))
                                                                        setValidatedSections([...validatedSections, CarPostSections.Features]);
                                                                    if (!next) updateCarDetails(carDetails)
                                                                    else setExpandedSection(CarPostSections.OtherDetails)
                                                                }} />
                                                        }
                                                        {
                                                            name === CarPostSections.OtherDetails && expandedSection === CarPostSections.OtherDetails &&
                                                            <OtherDetailsSection
                                                                showLoadingBtn={showLoadingBtn}

                                                                editMode={editMode}
                                                                postDetails={carDetails.postDetails}
                                                                setPostDetails={onPostDetailsChange}
                                                                onValidated={(next = true) => {
                                                                    if (!validatedSections.includes(CarPostSections.OtherDetails))
                                                                        setValidatedSections([...validatedSections, CarPostSections.OtherDetails]);
                                                                    if (!next) updateCarDetails(carDetails)
                                                                    else setExpandedSection(CarPostSections.CarLocation)
                                                                }} />
                                                        }
                                                        {
                                                            name === CarPostSections.CarLocation && expandedSection === CarPostSections.CarLocation &&
                                                            <CarLocationSection
                                                                showLoadingBtn={showLoadingBtn}
                                                                editMode={editMode}
                                                                carLocation={carDetails.carLocation}
                                                                setCarLocation={onCarLocationChange}
                                                                onValidated={(next = false) => {
                                                                    if (!next) updateCarDetails(carDetails)
                                                                    else handlePostingCar()
                                                                }} />
                                                        }
                                                    </div>
                                                );
                                            }
                                        })
                                    }

                                </div>
                            </div>
                }
            </div>
        </MainLayout>
    );
}



function PhotosSection({ onValidated, setImages, images, editMode, showLoadingBtn }) {
    const { trans } = handleTranslation()
    const [alertMessage, setAlertMessage] = useState({
        visible: false,
        text: trans('imagealert'),
        success: false
    });

    const isValidated = () => {
        return images.length >= 5 && images.length <= 15;
    }

    useEffect(() => {
        if (images.length > 0 && (images.length < 5 || images.length > 15)) {
            setAlertMessage({
                ...alertMessage,
                visible: true,
            })
        } else {
            setAlertMessage({
                ...alertMessage,
                visible: false,
            })
        }
    }, [images])

    return (
        <div className="pt-5 w-full shadow border rounded-md bg-white">
            <div className="w-full flex flex-wrap items-center p-5 pb-8 gap-6" >
                <ImageDragDropInput imagesRemovable={!editMode} images={images} withPreview onImagesChange={setImages} />
                <div className="w-full mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* <button
                            type="button" onClick={onValidated}
                            className="btn-primary disabled:!bg-primary disabled:text-gray-300 disabled:pointer-events-none"
                            disabled={!isValidated()}>
                            {trans('next')}
                        </button> */}

                        <button
                            type="button" onClick={() => onValidated(!editMode)}
                            className="btn-primary disabled:!bg-primary disabled:text-gray-300 disabled:pointer-events-none"
                            disabled={showLoadingBtn || !isValidated()}>
                            {
                                showLoadingBtn ?
                                    <span>
                                        <svg className="animate-spin mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </span>
                                    :
                                    editMode ?
                                        trans("update_details")
                                        : trans('next')
                            }
                        </button>
                    </div>
                    <div>
                        <AlertMessage
                            success={alertMessage.success}
                            visible={alertMessage.visible}
                            text={alertMessage.text}
                            onDissmissAlert={() => {
                                setAlertMessage({
                                    ...alertMessage,
                                    visible: false,
                                })
                            }} />
                    </div>
                </div>
            </div>
        </div >
    );
}



const FuelTypes = [
    "Gas",
    "Petrol",
    "Hybrid",
    "Electric",
    "Flexible Fuel"
]

function DetailsSection({ onValidated, details, setDetails, accessToken, editMode, showLoadingBtn }) {
    const { trans, apiTrans } = handleTranslation()
    const [alertMessage, setAlertMessage] = useState({
        visible: false,
        text: "",
        success: false
    });
    const { data: categories } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCategories);
    const { data: years } = useFiltersFetcher(accessToken, apiConfig.endpoints.getYears, [], sortYears);
    const { data: makes } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCarMakes + `?year=${details.year}`);
    const { data: models } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCarModels + `?year=${details.year}&make=${details.make}`);
    const { data: vehicleTrims } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCarTrims + `?year=${details.year}&make=${details.make}&model=${details.model}`);

    const isValidated = () => {
        return (details.year !== "" && details.make !== "" && details.model !== "")
    }

    const validateAndContinue = () => {
        if (isValidated()) onValidated(!editMode);
        else {
            setAlertMessage({
                ...alertMessage,
                visible: true
            })
        }
    }


    return (
        <div className="pt-5 w-full shadow border rounded-md bg-white">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center p-5 pb-8 gap-7" >
                <SelectEl
                    isOptional={true}
                    items={categories ? categories.map((ctgry) => ({ value: ctgry.id, label: apiTrans(ctgry, "title") })) : []}
                    label={trans("category")} value={details.category}
                    onChange={(value) => setDetails({ ...details, category: value })} />
                <SelectEl
                    isOptional={true}
                    items={
                        CarConditionsList
                            .filter((condition) => condition.id !== "all")
                            .map((condition) =>
                                ({ value: condition.id, label: trans(condition.label) })
                            )}
                    label={trans("condition")} value={details.condition}
                    onChange={(value) => setDetails({ ...details, condition: value })} />
                {/* Year/Model/Make Start */}
                <SelectEl
                    items={years ? years.map((year) => ({ value: year, label: year })) : []}
                    label={trans("year")} value={details.year}
                    onChange={(value) => setDetails({ ...details, year: value })} />
                <SelectEl
                    items={makes ? makes.map((makeObj) => ({ value: makeObj.make, label: makeObj.make })) : []}
                    label={trans("make")} value={details.make}
                    onChange={(value) => setDetails({ ...details, make: value })} />
                <SelectEl
                    items={models ? models.map((modelObj) => ({ value: modelObj.model, label: modelObj.model })) : []}
                    label={trans("model")} value={details.model}
                    onChange={(value) => setDetails({ ...details, model: value })} />
                {/* Year/Model/Make End */}

                <SelectEl
                    isOptional={true}
                    items={vehicleTrims ? vehicleTrims.map((vTrim) => ({ value: vTrim.vehicle_trim.trim(), label: vTrim.vehicle_trim })) : []}
                    label={trans("vehicle_trim")} value={details.vehicleTrim}
                    onChange={(value) => setDetails({ ...details, vehicleTrim: value })} />

                <InputEl
                    isOptional={true}
                    label={trans("mileage")} type="number"
                    value={details.mileage}
                    onChange={(value) => setDetails({ ...details, mileage: value })} />

                <SelectEl
                    isOptional={true}
                    items={FuelTypes.map((fuel) => ({ value: fuel, label: trans(fuel.toLowerCase().replace(" ", "_")) }))}
                    label={trans("car-fuel-type")} value={details.fuelType}
                    onChange={(value) => setDetails({ ...details, fuelType: value })} />
                <SelectEl
                    isOptional={true}
                    label={trans("title_status")} value={details.titleStatus}
                    onChange={(value) => setDetails({ ...details, titleStatus: value })}>
                    <option value="Clean">{trans("clean")}</option>
                    <option value="Rebuilt">{trans("rebuilt")}</option>
                    <option value="Salvage">{trans("salvage")}</option>
                </SelectEl>

                <div className="col-span-full flex items-center justify-between w-full">
                    <button
                        type="button"
                        onClick={validateAndContinue}
                        className="btn-primary disabled:!bg-primary disabled:text-gray-300 disabled:pointer-events-none"
                        disabled={showLoadingBtn || !isValidated()}
                    >
                        {
                            showLoadingBtn ?
                                <span>
                                    <svg className="animate-spin mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </span>
                                :
                                editMode ?
                                    trans("update_details")
                                    :
                                    trans("next")
                        }
                    </button>
                    <div>
                        <AlertMessage
                            success={alertMessage.success}
                            visible={alertMessage.visible}
                            text={alertMessage.text}
                            onDissmissAlert={() => {
                                setAlertMessage({
                                    ...alertMessage,
                                    visible: false,
                                })
                            }} />
                    </div>
                </div>
            </div>
        </div >
    );
}




function ColorsSection({ onValidated, colors, setColors, editMode, showLoadingBtn }) {
    const { trans } = handleTranslation()
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
                        {trans("exterior-color")}:
                        <span className="font-normal text-base ms-2">
                            {trans(exteriorColorsList.find((clr) => colors.exterior === clr.hex)?.label ?? "")}
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
                                        {trans(color.label)}
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="py-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-8">
                        {trans("interior-color")}:
                        <span className="font-normal text-base ms-2">
                            {trans(interiorColorsList.find((clr) => colors.interior === clr.hex)?.label ?? "")}
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
                                        {trans(color.label)}
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
                    onClick={() => onValidated(!editMode)}
                    className="btn-primary disabled:!bg-primary disabled:text-gray-300 disabled:pointer-events-none"
                    disabled={showLoadingBtn || !colors || colors.interior === "" || colors.exterior === ""}
                >
                    {
                        showLoadingBtn ?
                            <span>
                                <svg className="animate-spin mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </span>
                            :
                            editMode ?
                                trans("update_details")
                                :
                                trans("next")
                    }
                </button>
            </div>
        </div >
    );
}



function FeaturesSection({ onValidated, accessToken, features = [], setFeatures, editMode, showLoadingBtn }) {
    const { trans, apiTrans } = handleTranslation()
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
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    {apiTrans(featureCtgry, "title")}:
                                </h3>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 place-items-center gap-7" >
                                    {
                                        featureCtgry.children.map((feature) => (
                                            <CheckBoxEl
                                                key={feature.id}
                                                label={apiTrans(feature, "title")}
                                                value={features.includes(feature.id)}
                                                checked={features.includes(feature.id)}
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
                    onClick={() => onValidated(!editMode)}
                    disabled={showLoadingBtn}
                    className="btn-primary disabled:!bg-primary disabled:text-gray-300 disabled:pointer-events-none"
                >
                    {
                        showLoadingBtn ?
                            <span>
                                <svg className="animate-spin mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </span>
                            :
                            editMode ?
                                trans("update_details")
                                :
                                trans("next")
                    }

                </button>
            </div>
        </div >
    );
}



function OtherDetailsSection({ onValidated, postDetails, setPostDetails, editMode, showLoadingBtn }) {
    const { trans } = handleTranslation();

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
                        type="number" label={trans("price")} icon={faDollar}
                        value={postDetails.price}
                        onChange={onPriceChange}
                    />
                </div>
                <div className="w-full col-span-3">
                    <TextAreaEl
                        isOptional={true}
                        label={trans("description")}
                        value={postDetails.description}
                        onChange={onDescriptionChange} />
                </div>
                <div className="w-full col-span-3">
                    <CheckBoxEl label={trans("find_me_buyer")}
                        value={postDetails.findMeBuyer}
                        onChange={onFindMeBuyerChange} />
                </div>
            </div>
            <button
                type="button"
                onClick={() => onValidated(!editMode)}
                className="btn-primary mt-5 disabled:!bg-primary disabled:text-gray-300 disabled:pointer-events-none"
                disabled={showLoadingBtn || !postDetails || postDetails.price === ""}
            >
                {
                    showLoadingBtn ?
                        <span>
                            <svg className="animate-spin mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                        :
                        editMode ?
                            trans("update_details")
                            :
                            trans("next")
                }
            </button>
        </div >
    );
}





function CarLocationSection({ onValidated, carLocation, setCarLocation, editMode, showLoadingBtn }) {
    const { trans } = handleTranslation()
    const isValidated = () => {
        return (
            carLocation && carLocation.latitude !== 0 && carLocation.longitude !== 0 && carLocation.zipCode !== null && carLocation.zipCode !== ""
        )
    }

    return (
        <div className="pt-5 w-full shadow border rounded-md bg-white">
            <div className="w-full grid grid-cols-3 place-items-center p-5 pb-8 gap-7" >
                <div className="w-full col-span-3">
                    <LocationInputEl
                        label={trans("car_location")} icon={faLocationDot}
                        defaultValue={carLocation.address ?? ""} onChange={setCarLocation} />
                </div>
                <div className="w-full col-span-3">
                    <InputEl
                        type="number" label={trans("zip_code")}
                        value={carLocation.zipCode}
                        onChange={(value) => setCarLocation({ ...carLocation, zipCode: value })}
                    />
                </div>
                <div className="col-span-3 w-full">
                    <button
                        type="button"
                        onClick={() => onValidated(!editMode)}
                        className="btn-primary disabled:!bg-primary disabled:text-gray-300 disabled:pointer-events-none"
                        disabled={showLoadingBtn || !isValidated()}
                    >
                        {
                            showLoadingBtn ?
                                <span>
                                    <svg className="animate-spin mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </span>
                                :
                                editMode ?
                                    trans("update_details")
                                    :
                                    trans("post")
                        }
                    </button>
                </div>
            </div>
        </div >
    );
}










const InputEl = React.forwardRef(({ label = "", isOptional = false, type = "text", defaultValue = "", placeholder = "", icon = null, value, onChange = () => { } }, ref) => {
    const { trans } = handleTranslation()

    return (
        <div div className="w-full" >
            <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-sm font-normal text-gray-800">
                {label}
                {
                    isOptional &&
                    <span className="ms-2 text-gray-500">
                        ({trans("optional")})
                    </span>
                }
            </label>
            <span className="relative">
                <input ref={ref} type={type}
                    name={label.toLowerCase().replace(" ", "_")}
                    id={label.toLowerCase().replace(" ", "_")}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={(e) => onChange !== null && onChange(e.target.value)}
                    placeholder={placeholder}
                    className={"rounded w-full py-3 text-gray-900 text-base font-medium mt-1 " + (icon !== null ? "pl-10" : "")} />
                {
                    icon !== null &&
                    <span className="absolute top-1/2 -translate-y-1/2 left-4">
                        <FontAwesomeIcon icon={icon} className={"fa-solid text-gray-800"} />
                    </span>
                }
            </span>
        </div >

    )
})




export function LocationInputEl({
    onChange, className, label, defaultValue
}) {
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    // const [text, setText] = useState(value);
    const options = {
        // componentRestrictions: { country: "ng" },
        fields: ["address_components", "geometry", "name"],
        // types: addressType === AddressInputTypes.DEFAULT ? [] : [addressType]
        types: ["address"]
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
            let countryName = '';
            let postalCode = '';
            for (let component of place.address_components) {
                if (cityName === '' && component.types.includes('locality')) {
                    cityName = component.long_name;
                }
                if (component.types.includes('administrative_area_level_1')) {
                    stateName = component.long_name;
                }
                if (component.types.includes('country')) {
                    countryName = component.long_name;
                }
                if (component.types.includes('postal_code')) {
                    postalCode = component.long_name;
                }
            }
            onChange({
                city: cityName,
                state: stateName,
                country: countryName,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
                zipCode: postalCode
            })
        });
    }, []);
    return (
        <InputEl
            ref={inputRef} type="text"
            className={className}
            label={label}
            icon={faLocationDot}
            defaultValue={defaultValue}
            onChange={null} />
    );
}




function TextAreaEl({ label = "", isOptional = false, placeholder = "", onChange, value }) {
    const { trans } = handleTranslation()
    return (
        <div className="w-full">
            <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-sm font-normal text-gray-800">
                {label}
                {
                    isOptional &&
                    <span className="ms-2 text-gray-500">
                        ({trans("optional")})
                    </span>
                }
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


function CheckBoxEl({ label = "", onChange, value, checked }) {
    return (
        <div className="w-full inline-flex items-center">
            <input type="checkbox"
                name={label.toLowerCase().replace(" ", "_")}
                id={label.toLowerCase().replace(" ", "_")}
                value={value}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="rounded p-2.5 text-primary text-base font-medium" />
            <label htmlFor={label.toLowerCase().replace(" ", "_")} className="text-base font-medium ml-3 text-gray-800">
                {label}
            </label>
        </div>
    );
}


