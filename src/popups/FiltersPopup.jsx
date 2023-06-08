import { faSliders, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { CarConditionsList, FiltersSectionEl } from '../pages/SearchPage';


export default function FiltersPopup({
    filters, onMaxPriceChange, onMinPriceChange,
    onConditionChange, accessToken, setFilters,
    onClearFilters
}) {
    const [isOpen, setIsOpen] = useState(false);
    const onPopupClose = () => {
        setIsOpen(false)
    }


    const onSeeListingClicked = () => {
        setFilters({ ...filters });
        onPopupClose();
    }

    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)} className="text-base text-gray-900 font-normal py-2 px-5 rounded-full bg-gray-100 transition-all hover:bg-gray-200">
                <FontAwesomeIcon icon={faSliders} className="text-sm mr-3" />
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
                                        <div className='flex items-center justify-between pt-1.5 px-5'>
                                            <button type='button' onClick={() => setIsOpen(false)} className='text-gray-900 text-xl rounded-full py-1 aspect-square bg-transparent'>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </button>
                                            <h4 className="text-xl font-semibold">Filters</h4>
                                            <button onClick={onClearFilters} className='text-base font-normal text-gray-900'>Clear</button>
                                        </div>
                                        <div className="w-full px-4 py-5 pt-10 overflow-y-auto">
                                            <div className="py-3">
                                                <FiltersSectionEl
                                                    accessToken={accessToken}
                                                    filters={filters} onMaxPriceChange={onMaxPriceChange}
                                                    setFilters={setFilters}
                                                    onMinPriceChange={onMinPriceChange}
                                                />
                                                <div className="pt-7">
                                                    <h5 className="text-base font-medium">Condition</h5>
                                                    <ul className="mt-2 space-y-2">
                                                        {
                                                            CarConditionsList.map((condition) => (
                                                                <li key={condition.id} className="flex items-center">
                                                                    <input type="checkbox" checked={filters.condition.id === condition.id}
                                                                        onChange={(e) => onConditionChange(condition)}
                                                                        className="text-primary border-gray-400 border-2 !ring-transparent rounded"
                                                                        id={condition.id} />
                                                                    <label htmlFor={condition.id} className="text-base text-gray-800 font-normal ms-4">
                                                                        {condition.label}
                                                                    </label>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                            <button type='button' onClick={onSeeListingClicked} className='rounded-full bg-primary text-white py-2 px-5 w-full text-base mt-10'>
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