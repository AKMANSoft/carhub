import { AddressInput } from '../components/ThemeInput';
import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons';
import { getCurrentLatLng, getLocationByLatLng } from '../components/hooks/useCurrentLocation';
import useFilterLocation from '../components/hooks/useLocation';
import { handleTranslation } from '../lib/i18n';




export default function ChooseLocationPopup() {
    const { trans } = handleTranslation()
    let [isOpen, setIsOpen] = useState(false);
    const location = useFilterLocation()


    const onLocationChange = (newLocation) => {
        sessionStorage.setItem("location", JSON.stringify(newLocation));
        location.setLocation(newLocation);
    }


    useEffect(() => {
        try {
            let savedLocation = JSON.parse(sessionStorage.getItem("location"));
            if (savedLocation === null) throw new Error("Location is null");
            location.setLocation(savedLocation);
        } catch (error) {
            getCurrentLatLng(({ lat, lng }) => {
                getLocationByLatLng(lat, lng, onLocationChange)
            })
        }
    }, [])


    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)} className="w-full text-xl font-semibold inline-flex border-none outline-none justify-start items-center text-primary rounded-full px-6 py-2">
                <FontAwesomeIcon icon={faLocationDot} className="border-b border-transparent" />
                <span className="block ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap xl:max-w-[200px] 2xl:max-w-[250px] transition-all hover:underline" style={{ WebkitLineClamp: 1 }}>
                    {
                        location && location !== null ?
                            <>
                                {location.city && location.city !== "" && `${location.city}, `}
                                {location.state && location.state !== "" && `${location.state}`}
                            </>
                            : ""
                    }
                </span>
                {
                    location && location !== null &&
                    <span className='ms-3 xl:ms-1 font-normal min-w-max items-center'>
                        :{location.filterDistance} {trans("miles").toLowerCase()}
                    </span>
                }
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
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
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                                    <div className="max-w-2xl relative w-full flex flex-col justify-between bg-primary-image text-white py-14 px-20 rounded-lg min-h-[300px]">
                                        <button onClick={() => setIsOpen(false)} type='button' className='text-white absolute top-2 right-2 text-xl rounded-full py-1 px-3 aspect-square bg-transparent hover:bg-gray-50/20'>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                        <div>
                                            <h4 className="text-xl font-bold uppercase">
                                                {trans("choose_location")}
                                            </h4>
                                            {/* <p className='text-sm font-light text-gray-300 mt-2'>
                                            Please provide the email you've signed up with to get a restore password email.
                                        </p> */}
                                            <div className="mt-10 w-full">
                                                <AddressInput
                                                    placeholder={trans("enter_location")}
                                                    onChange={(val) => onLocationChange(val)} />
                                                <button type="button" onClick={() => setIsOpen(false)} className="btn-light w-full mt-3">
                                                    {trans("continue")}
                                                </button>
                                            </div>
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