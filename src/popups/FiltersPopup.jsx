import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

// type Props = {}

export default function FiltersPopup({ category }) {
    const [isOpen, setIsOpen] = useState(false);
    const onPopupClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)} className="text-base text-gray-900 font-normal py-2 px-5 rounded-full bg-gray-100 transition-all hover:bg-gray-200">
                <i class="fa-solid fa-sliders text-sm mr-3"></i>
                Filters
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
                                    {/* Popup Content  */}
                                    <div className='bg-white rounded-t-lg'>
                                        <div className='flex items-center justify-between pt-1.5 px-3'>
                                            <button type='button' onClick={() => popupRef?.current?.close()} className='text-gray-900 text-xl rounded-full py-1 px-3 aspect-square bg-transparent transition-all hover:bg-gray-200'>
                                                <i className='fa-solid fa-xmark'></i>
                                            </button>
                                            <h4 className="text-xl font-semibold">Filters</h4>
                                            <a href="#" className='text-base font-normal text-gray-900'>Clear</a>
                                        </div>
                                        <div className="w-[100vw] min-h-screen px-4 py-5 pt-10 overflow-y-auto">
                                            <div className="py-3">
                                                <div className="border-b py-6">
                                                    <h5 className="text-base font-medium">Price Range</h5>
                                                    <div className="flex items-center gap-3 mt-3">
                                                        <input type="number" placeholder="Min" className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md" />
                                                        <p className="text-sm font-normal text-gray-800">to</p>
                                                        <input type="number" placeholder="Max" className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md" />
                                                    </div>
                                                </div>
                                                <div className="pt-7">
                                                    <h5 className="text-base font-medium">Condition</h5>
                                                    <ul className="mt-2 space-y-2">
                                                        <li className="flex items-center">
                                                            <input type="checkbox" className="text-primary border-gray-400 border-2 !ring-transparent rounded" id="condition-new" />
                                                            <label htmlFor="condition-new" className="text-base text-gray-800 font-normal ms-4">
                                                                New <br />
                                                                <span className="text-sm text-gray-600">
                                                                </span>
                                                            </label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input type="checkbox" className="text-primary border-gray-400 border-2 !ring-transparent rounded" id="condition-open-box" />
                                                            <label htmlFor="condition-open-box" className="text-base text-gray-800 font-normal ms-4">
                                                                Open box <br />
                                                                <span className="text-sm text-gray-600">
                                                                </span>
                                                            </label>
                                                        </li>
                                                        <li className="flex items-center">
                                                            <input type="checkbox" className="text-primary border-gray-400 border-2 !ring-transparent rounded" id="condition-reconditioned" />
                                                            <label htmlFor="condition-reconditioned" className="text-base text-gray-800 font-normal ms-4">
                                                                Reconditioned <br />
                                                                <span className="text-sm text-gray-600">
                                                                </span>
                                                            </label>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <button type='button' className='rounded-full bg-primary text-white py-2 px-5 w-full text-base mt-10'>
                                                See Listing
                                            </button>
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