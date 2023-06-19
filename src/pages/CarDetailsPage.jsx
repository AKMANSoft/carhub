import Slider from "react-slick";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import React from "react";
import MainLayout from "../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import useCarDetails from "../components/hooks/carDetailsFetcher";
import useAuthUser from "../components/hooks/useAuthUser";
import { defaultCarDetail } from "../data/default-car-data";
import { useRef } from "react";
import { useState } from "react";
import { cn, formatPrice } from "../lib/utils";


export default function CarDetailsPage() {
    // const authUser = useAuthUser();
    const { carId } = useParams();
    console.log(carId)
    const { data: carDetails } = useCarDetails("", carId);

    const carFeatures = carDetails ? carDetails.vehicle_list.filter((fCtgry) => {
        const selFeatures = fCtgry.children.filter((f) => f.is_selected)
        return selFeatures.length > 0
    }) : []

    return (
        <MainLayout secureRoute={false}>
            {
                carDetails && carDetails !== null &&
                <div className={"mx-auto py-10 md:py-20" + MAIN_HORIZONTAL_PADDING}>
                    <div className="flex gap-5">
                        <div className="w-full xl:w-[70%]">
                            <CarsSliderEl images={carDetails.cars_images} />
                            <CarDetailsSection carDetails={carDetails} className="xl:hidden w-full py-5 mt-10" />
                            <div className="mt-10 pb-10 border-b">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-extrabold text-gray-900 uppercase">
                                        Features
                                    </h2>
                                </div>
                                {
                                    carFeatures.length > 0 ?
                                        <div className="divide-y">
                                            {
                                                carFeatures.map((featureCtgry) => (
                                                    <div key={featureCtgry.id} className="py-5">
                                                        <h4 className="text-lg font-semibold">
                                                            {featureCtgry.title}
                                                        </h4>
                                                        <div className="mt-2 grid-cols-1 md:grid-cols-2 grid lg:grid-cols-3 gap-2">
                                                            {
                                                                featureCtgry.children.filter((f) => f.is_selected).map((feature) => (
                                                                    <li key={feature.id} className="list-disc text-base text-gray-800 font-medium">
                                                                        {feature.title}
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
                                            <p>No special features.</p>
                                        </div>
                                }
                            </div>
                            <div className="mt-10">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-extrabold text-gray-900 uppercase">
                                        Description
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
                        {<CarDetailsSection carDetails={carDetails} className="hidden xl:block w-[30%] py-5" />}
                    </div>
                </div>
            }
        </MainLayout>
    );
}




function CarDetailsSection({ className, carDetails }) {
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
                    Zip Code: {carDetails.zip_code}
                </p>
            </div>
            <div className="py-5 md:p-5 mt-3 flex items-center gap-5 flex-wrap">
                <button type='button' className='text-base font-medium bg-gray-200 text-gray-800 px-8 py-2.5 hover:bg-gray-300 rounded-full'>
                    Contact Seller
                </button>
            </div>
            <div className="mt-8 bg-gray-50 p-3 md:p-5 rounded-md">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-extrabold text-gray-800 uppercase">
                        Details
                    </h2>
                    <span className="block rounded w-full h-0 border-b border-gray-400"></span>
                </div>
                <ul className="mt-5">
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">Year</span>
                        <span className="font-medium">
                            {carDetails.year ?? 'not specified'}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">Make</span>
                        <span className="font-medium">
                            {carDetails.make ?? 'not specified'}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">Model</span>
                        <span className="font-medium">
                            {carDetails.model ?? 'not specified'}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">Condition</span>
                        <span className="font-medium">
                            {carDetails.condition ?? 'not specified'}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">Mileage</span>
                        <span className="font-medium">
                            {carDetails.mileage ?? 'not specified'}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">Exterior Color</span>
                        <span className="block w-5 h-5 aspect-square rounded-full"
                            style={{ background: carDetails.exterior_color }} />
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">Interior Color</span>
                        <span className="block w-5 h-5 aspect-square rounded-full"
                            style={{ background: carDetails.color }} />                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">Title Status</span>
                        <span className="font-medium">
                            {carDetails.title_status ?? 'not specified'}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">Car Fuel Type</span>
                        <span className="font-medium">
                            {carDetails.car_fuel_type ?? 'not specified'}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">Vehicle Trim</span>
                        <span className="font-medium">
                            {carDetails.engine_size ?? 'not specified'}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">City</span>
                        <span className="font-medium">
                            {carDetails.city ?? 'not specified'}
                        </span>
                    </li>
                    <li className="gap-x-5 gap-y-2 flex-wrap text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase min-w-max">State</span>
                        <span className="font-medium">
                            {carDetails.state ?? 'not specified'}
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
                            <img src={img.image} alt="" loading="lazy" className="mx-auto object-cover h-[300px] sm:h-[450px] md:h-[600px] lg:h-[700px]" />
                        </div>
                    ))
                }
                {/* 
            <div className="w-full outline-none px-0.5">
                <img src="/images/car2.jpg" alt="" loading="lazy" className="mx-auto object-cover h-[300px] sm:h-[450px] md:h-[600px] lg:h-[700px]" />
            </div>
            <div className="w-full outline-none px-0.5">
                <img src="/images/car4.jpg" alt="" loading="lazy" className="mx-auto object-cover h-[300px] sm:h-[450px] md:h-[600px] lg:h-[700px]" />
            </div> */}
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
