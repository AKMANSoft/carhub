import { faArrowLeft, faArrowRight, faSliders, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState, useRef } from 'react';
import Slider from "react-slick";


export default function ChatPageCarsSliderPopup({
    images, className
}) {
    const [isOpen, setIsOpen] = useState(false);
    const onPopupClose = () => {
        setIsOpen(false)
    }

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
        <>
            <button type="button" onClick={() => setIsOpen(true)} className="rounded-md overflow-hidden">
                <img
                    src={images?.length > 0 ? images[0].image : ""}
                    width={70}
                    height={50}
                    className='w-[70px] h-[50px] object-cover origin-center'
                    alt="" />
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onPopupClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all">
                                    {/* Popup Content  */}
                                    <div className='bg-white rounded-t-lg'>
                                        <div className='flex items-center justify-between pt-1.5 px-5'>
                                            <span></span>
                                            <button type='button' onClick={() => setIsOpen(false)} className='text-gray-900 text-xl rounded-full py-1 aspect-square bg-transparent'>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </div>
                                        <div>
                                            <Slider ref={sliderRef} className={"bg-gray-50 h-[450px] md:h-[600px] max-h-[600px] items-center lg:h-full border-2 overflow-hidden md:border-4 border-gray-100 rounded-md " + className}
                                                {...settings}
                                                nextArrow={
                                                    <button type="button">
                                                        <span className="text-lg text-white bg-gray-900/40 inline-flex items-center justify-center w-full px-2 aspect-square rounded-full transition-all hover:bg-gray-900/80">
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
                                                    images?.map((img) => (
                                                        <div key={img.id} className="w-full min-h-[600px] max-h-[600px] outline-none px-0.5 relative">
                                                            <img src={img.image} alt="" loading="lazy" className="mx-auto absolute left-0 top-1/2 -translate-y-1/2 object-cover w-full h-auto" />
                                                        </div>
                                                    ))
                                                }
                                            </Slider>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


export function MessageImageViewPopup({
    image, className, trigger
}) {
    const [isOpen, setIsOpen] = useState(false);
    const onPopupClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)} className="rounded-md overflow-hidden">
                {trigger}
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onPopupClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex h-full items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all">
                                    {/* Popup Content  */}
                                    <div className='bg-white rounded-t-lg'>
                                        <div className='flex items-center justify-between pt-1.5 px-5'>
                                            <span></span>
                                            <button type='button' onClick={() => setIsOpen(false)} className='text-gray-900 text-xl rounded-full py-1 aspect-square bg-transparent'>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                        </div>
                                        <div key={image} className="w-full flex items-center bg-gray-200 justify-center min-h-[600px] overflow-hidden max-h-[600px] outline-none px-0.5 relative">
                                            <img
                                                src={image} alt="" loading="lazy"
                                                className="mx-auto object-cover w-full h-auto"
                                                style={{
                                                    backgroundImage: "url(/images/spinner-dark.svg)",
                                                    backgroundSize: "30%",
                                                    backgroundPosition: "center",
                                                    backgroundRepeat: "no-repeat"
                                                }} />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}