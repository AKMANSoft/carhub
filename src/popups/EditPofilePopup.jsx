import ThemeInput from '../components/ThemeInput';
import React, { Fragment, useState } from 'react';
import ThemeTextArea from '../components/ThemeTextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Transition } from '@headlessui/react';


export default function EditPofilePopup() {
    const [isOpen, setIsOpen] = useState(false);
    const imageInputRef = React.useRef(null);

    const onPopupClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <button type='button' onClick={() => setIsOpen(true)} className='text-base font-medium bg-primary text-white px-8 py-2.5 hover:bg-primary/95 rounded-full'>
                Edit Profile
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
                                    <div className='max-w-2xl relative bg-primary-image rounded-lg py-14'>
                                        <button type='button' onClick={onPopupClose} className='text-white absolute top-2 right-2 text-xl rounded-full py-1 px-3 aspect-square bg-transparent hover:bg-gray-50/20'>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                        <div className="w-full text-white px-5 md:px-20 min-h-[70vh] overflow-y-auto">
                                            <div className="mb-16 text-center">
                                                <h1 className="uppercase text-6xl font-bold">Carhub</h1>
                                                <p className="text-base italic font-light">Your Car Destination</p>
                                            </div>
                                            <div className="min-w-full space-y-5">
                                                <div className='mx-auto w-32 mb-8 relative'>
                                                    <img src="/images/car1.jpg" className='w-full border-4 border-gray-50/50 h-auto aspect-square mx-auto rounded-full' alt="" />
                                                    <input type="file" ref={imageInputRef} className='hidden' name="image" />
                                                    <button type='button' onClick={() => imageInputRef?.current?.click()} className='z-[1] text-white absolute top-0 right-2 text-sm rounded-full px-2 block aspect-square bg-primary transition-all hover:bg-gray-200'>
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </button>
                                                </div>
                                                <ThemeInput type='text' placeholder='Name' />
                                                <ThemeTextArea placeholder="Bio" rows={4} />
                                                <div className='flex gap-5'>
                                                    <ThemeInput type='text' placeholder='State' />
                                                    <ThemeInput type='text' placeholder='Country' />
                                                </div>
                                                <div className='pt-10'>
                                                    <button type="submit" className="btn-light w-full">Update Profile</button>
                                                </div>
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