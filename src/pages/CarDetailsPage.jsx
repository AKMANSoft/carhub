import Slider from "react-slick";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import React from "react";
import MainLayout from "../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import useCarDetails from "../components/hooks/carDetailsFetcher";
import useAuthUser from "../components/hooks/useAuthUser";
import { useRef } from "react";
import { useState } from "react";
import { cn, formatPrice } from "../lib/utils";
import { handleTranslation } from "../lib/i18n";



export default function CarDetailsPage() {
    const { trans, apiTrans } = handleTranslation()
    const authUser = useAuthUser();
    const { carId } = useParams();
    const { data: carDetails } = useCarDetails(authUser.accessToken, carId);

    const carFeatures = carDetails ? carDetails.vehicle_list.filter((fCtgry) => {
        const selFeatures = fCtgry.children.filter((f) => f.is_selected)
        return selFeatures.length > 0
    }) : []


    console.log(carDetails)


    return (
        <MainLayout>
            {
                carDetails && carDetails !== null &&
                <div className={"mx-auto py-10 md:py-20" + MAIN_HORIZONTAL_PADDING}>
                    <div className="flex gap-5">
                        <div className="w-full xl:w-[70%]">
                            <CarsSliderEl images={carDetails.cars_images} />
                            <CarDetailsSection carDetails={carDetails} userProfile={authUser.userProfile} className="xl:hidden w-full py-5 mt-10" />
                            <div className="mt-10 pb-10 border-b">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-extrabold text-gray-900 uppercase">
                                        {trans("features")}
                                    </h2>
                                </div>
                                {
                                    carFeatures.length > 0 ?
                                        <div className="divide-y">
                                            {
                                                carFeatures.map((featureCtgry) => (
                                                    <div key={featureCtgry.id} className="py-5">
                                                        <h4 className="text-lg font-semibold">
                                                            {apiTrans(featureCtgry, "title")}
                                                        </h4>
                                                        <div className="mt-2 grid-cols-1 md:grid-cols-2 grid lg:grid-cols-3 gap-2">
                                                            {
                                                                featureCtgry.children.filter((f) => f.is_selected).map((feature) => (
                                                                    <li key={feature.id} className="list-disc text-base text-gray-800 font-medium">
                                                                        {apiTrans(feature, "title")}
                                                                    </li>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        :
                                        <div className="flex items-center justify-center h-32 w-full">
                                            <p>{trans("no_special_features")}</p>
                                        </div>
                                }
                            </div>
                            <div className="mt-10">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-extrabold text-gray-900 uppercase">
                                        {trans("description")}
                                    </h2>
                                </div>
                                <div className="mt-3">
                                    <p className="text-base text-gray-700 font-normal">
                                        {
                                            carDetails.description === null || carDetails.description === "" ?
                                                "No description provided."
                                                : carDetails.description
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                        <CarDetailsSection
                            carDetails={carDetails} userProfile={authUser.userProfile}
                            className="hidden xl:block w-[30%] py-5" />
                    </div>
                </div>
            }
        </MainLayout>
    );
}




function CarDetailsSection({ className, carDetails, userProfile }) {
    const { trans } = handleTranslation()

    console.log(carDetails);
    return (
        <div className={className}>
            <div className="md:px-5">
                <h3 className="text-3xl md:text-4xl font-semibold text-gray-900">
                    {carDetails.make} {carDetails.model}
                </h3>
                <p className="text-xl md:text-2xl text-gray-800 font-semibold mt-1">
                    ${formatPrice(carDetails.amount)}
                </p>
                <p className="text-sm md:text-base text-gray-700 font-medium mt-1">
                    {trans("zip_code")}: {carDetails.zip_code}
                </p>
            </div>
            <div className="py-5 md:p-5 mt-3 flex items-center gap-5 flex-wrap">
                {
                    userProfile !== null && (userProfile?.id === carDetails.user_id) ?
                        <>
                            {/* <button type='button' className='btn-primary text-base font-medium rounded-full'>
                                Edit Car Info
                            </button> */}
                        </>
                        :
                        <>
                            <button type='button' className='text-base font-medium bg-gray-200 text-gray-800 px-8 py-2.5 hover:bg-gray-300 rounded-full'>
                                {trans("contact_seller")}
                            </button>
                            <button type='button' className='text-base font-medium bg-gray-200 text-gray-800 px-8 py-2.5 hover:bg-gray-300 rounded-full'>
                                {trans("contact_seller")}
                            </button>
                        </>
                }
            </div>
            <div className="mt-8 bg-gray-50 p-3 md:p-5 rounded-md">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-extrabold text-gray-800 uppercase">
                        {trans('details')}
                    </h2>
                    <span className="block rounded w-full h-0 border-b border-gray-400"></span>
                </div>
                <ul className="mt-5">
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">{trans("year")}</span>
                        <span className="font-medium">
                            {carDetails.year ?? ''}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">{trans("make")}</span>
                        <span className="font-medium">
                            {carDetails.make ?? ''}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">{trans("model")}</span>
                        <span className="font-medium">
                            {carDetails.model ?? ''}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">{trans("condition")}</span>
                        <span className="font-medium">
                            {trans(carDetails.condition?.toLowerCase() ?? '')}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">{trans("mileage")}</span>
                        <span className="font-medium">
                            {carDetails.mileage ?? ''}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">{trans("exterior_color")}</span>
                        <span className="block w-5 h-5 aspect-square rounded-full"
                            style={{ background: carDetails.exterior_color }} />
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">{trans("interior_color")}</span>
                        <span className="block w-5 h-5 aspect-square rounded-full"
                            style={{ background: carDetails.color }} />
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">{trans("title_status")}</span>
                        <span className="font-medium">
                            {trans(carDetails.title_status?.toLowerCase() ?? '')}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">{trans("car-fuel-type")}</span>
                        <span className="font-medium">
                            {trans(carDetails.car_fuel_type?.toLowerCase()?.replace(" ", "_") ?? '')}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">
                            {trans("vehicle_trim")}
                        </span>
                        <span className="font-medium">
                            {carDetails.engine_size ?? ''}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">
                            {trans("city")}
                        </span>
                        <span className="font-medium">
                            {carDetails.city ?? ''}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">
                            {trans("state")}
                        </span>
                        <span className="font-medium">
                            {carDetails.state ?? ''}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}




function CarsSliderEl({ className, images }) {
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    let settings = {
        arrows: true,
        infinite: true,
        centerPadding: "10px",
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        lazyLoad: "progressive",
        beforeChange: (oldIndex, newIndex) => {
            setCurrentIndex(newIndex);
        }
    }

    return (
        <div>
            <Slider ref={sliderRef} className={"bg-gray-50 h-[304px] sm:h-[454px] md:h-[608px] lg:h-[708px] border-2 overflow-hidden md:border-4 border-gray-100 rounded-md " + className} {...settings}
                nextArrow={
                    <button type="button">
                        <span className="text-lg text-white bg-gray-900/40 inline-flex items-center justify-center w-auto px-2 aspect-square rounded-full transition-all hover:bg-gray-900/80">
                            <FontAwesomeIcon icon={faArrowRight} />
                        </span>
                    </button>
                }
                prevArrow={
                    <button type="button">
                        <span className="text-lg text-white bg-gray-900/40 inline-flex items-center justify-center w-auto px-2 aspect-square rounded-full transition-all hover:bg-gray-900/80">
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </span>
                    </button>
                }
            >
                {
                    images.map((img) => (
                        <div key={img.id} className="w-full outline-none px-0.5">
                            <img src={img.image} alt="" loading="lazy" className="mx-auto object-contain h-[300px] sm:h-[450px] md:h-[600px] lg:h-[700px]" />
                        </div>
                    ))
                }
            </Slider>
            <div className="flex justify-center mt-4 md:mt-0">
                <div className="flex items-center gap-5 p-2 max-w-full overflow-x-auto no-scrollbar">
                    {
                        images.map((img, index) => (
                            <button type="button" key={img.id}
                                className={cn(
                                    "outline-none rounded overflow-hidden outline-2 outline-transparent min-w-max",
                                    currentIndex === index && "outline-primary"
                                )}
                                onClick={() => sliderRef?.current?.slickGoTo(index)}>
                                <img src={img.image} alt="" loading="lazy" className="object-cover h-16 w-16 aspect-square " />
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
