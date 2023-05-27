import Slider from "react-slick";
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS";
import React from "react";


export default function CarDetailsPage() {
    const [windowWidth, setWindowWidth] = React.useState(-1);

    React.useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth))
    }, [])

    console.log(windowWidth)

    return (
        <div className={"mx-auto py-10 md:py-20" + MAIN_HORIZONTAL_PADDING}>
            <div className="flex gap-5">
                <div className="w-full xl:w-[70%]">
                    <CarsSliderEl />
                    <CarDetailsSection className="xl:hidden w-full py-5 mt-10" />
                    <div className="mt-10 pb-10 border-b">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-gray-900 uppercase">
                                Features
                            </h2>
                        </div>
                        <div className="mt-5 grid-cols-1 md:grid-cols-2 grid lg:grid-cols-3 gap-2">
                            <li className="list-disc text-base text-gray-800 font-medium"> Massage seats </li>
                            <li className="list-disc text-base text-gray-800 font-medium"> Night vision </li>
                            <li className="list-disc text-base text-gray-800 font-medium"> Parking assist </li>
                            <li className="list-disc text-base text-gray-800 font-medium"> Lane keep assist </li>
                            <li className="list-disc text-base text-gray-800 font-medium"> Heads up display </li>
                            <li className="list-disc text-base text-gray-800 font-medium"> Navigation system </li>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-gray-900 uppercase">
                                Description
                            </h2>
                        </div>
                        <div className="mt-3">
                            <p className="text-base text-gray-700 font-normal">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus at accusantium odit labore, libero perspiciatis, deleniti rerum quaerat sit nostrum repudiandae quas a dolorum dicta soluta! Nulla, debitis distinctio aspernatur, consequatur dicta sed incidunt fugiat unde veniam quos est libero.
                            </p>
                        </div>
                    </div>
                </div>
                {<CarDetailsSection className="hidden xl:block w-[30%] py-5" />}
            </div>
        </div>
    );
}




function CarDetailsSection({ className }) {
    return (
        <div className={className}>
            <div className="md:px-5">
                <h3 className="text-3xl md:text-4xl font-semibold text-gray-900">New Jeep Wrangler</h3>
                <p className="text-xl md:text-2xl text-gray-800 font-semibold mt-1">$500</p>
                <p className="text-sm md:text-base text-gray-700 font-medium mt-1">Zip Code: null</p>
            </div>
            <div className="py-5 md:p-5 mt-3 flex items-center gap-5 flex-wrap">
                <button type='button' className='text-base font-medium bg-gray-200 text-gray-800 px-8 py-2.5 hover:bg-gray-300 rounded-full'>
                    Contact Seller
                </button>
                <button type='button' className='text-base font-medium bg-primary text-white px-8 py-2.5 hover:bg-primary/90 rounded-full'>
                    Make an Offer
                </button>
            </div>
            <div className="mt-8 bg-gray-50 p-3 md:p-5 rounded-md">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-800 uppercase">
                        Details
                    </h2>
                    <span className="block rounded w-full h-0 border-b border-gray-400"></span>
                </div>
                <ul className="mt-5">
                    <li className="text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase">Year</span>
                        <span className="font-medium text-gray-800">2020</span>
                    </li>
                    <li className="text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase">Make</span>
                        <span className="font-medium text-gray-800">Aston Martin</span>
                    </li>
                    <li className="text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase">Model</span>
                        <span className="font-medium text-gray-800">DBS Superleggera</span>
                    </li>
                    <li className="text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase">Condition</span>
                        <span className="font-medium text-gray-800"></span>
                    </li>
                    <li className="text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase">Mileage</span>
                        <span className="font-medium text-gray-800"></span>
                    </li>
                    <li className="text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase">Exterior Color</span>
                        <span className="block w-5 h-5 aspect-square rounded-full bg-gray-900"></span>
                    </li>
                    <li className="text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase">Interior Color</span>
                        <span className="block w-5 h-5 aspect-square rounded-full bg-gray-900"></span>
                    </li>
                    <li className="text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase">Title Status</span>
                        <span className="font-medium text-gray-800"></span>
                    </li>
                    <li className="text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase">Car Fuel Type</span>
                        <span className="font-medium text-gray-800"></span>
                    </li>
                    <li className="text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase">Vehicle Trim</span>
                        <span className="font-medium text-gray-800"></span>
                    </li>
                    <li className="text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase">City</span>
                        <span className="font-medium text-gray-800"></span>
                    </li>
                    <li className="text-base text-gray-600 font-normal py-3 border-b-2 border-white last:border-none flex items-center justify-between">
                        <span className="uppercase">State</span>
                        <span className="font-medium text-gray-800"></span>
                    </li>
                </ul>
            </div>
        </div>
    );
}




function CarsSliderEl({ className }) {
    let settings = {
        arrows: true,
        infinite: true,
        centerPadding: "10px",
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        lazyLoad: "progressive"
    }
    return (
        <Slider className={"bg-gray-50 h-[304px] sm:h-[454px] md:h-[608px] lg:h-[708px] border-2 overflow-hidden md:border-4 border-gray-100 rounded-md " + className} {...settings}
            nextArrow={
                <button type="button">
                    <span className="text-lg text-white bg-gray-900/40 inline-flex items-center justify-center w-auto px-2 aspect-square rounded-full transition-all hover:bg-gray-900/80">
                        <i className="fa-solid fa-arrow-right"></i>
                    </span>
                </button>
            }
            prevArrow={
                <button type="button">
                    <span className="text-lg text-white bg-gray-900/40 inline-flex items-center justify-center w-auto px-2 aspect-square rounded-full transition-all hover:bg-gray-900/80">
                        <i className="fa-solid fa-arrow-left"></i>
                    </span>
                </button>
            }
        >
            <div className="w-full outline-none px-0.5">
                <img src="/images/car1.jpg" alt="" loading="lazy" className="mx-auto object-cover h-[300px] sm:h-[450px] md:h-[600px] lg:h-[700px]" />
            </div>
            <div className="w-full outline-none px-0.5">
                <img src="/images/car2.jpg" alt="" loading="lazy" className="mx-auto object-cover h-[300px] sm:h-[450px] md:h-[600px] lg:h-[700px]" />
            </div>
            <div className="w-full outline-none px-0.5">
                <img src="/images/car4.jpg" alt="" loading="lazy" className="mx-auto object-cover h-[300px] sm:h-[450px] md:h-[600px] lg:h-[700px]" />
            </div>
        </Slider>
    );
}
