import ThemeInput from '../components/ThemeInput';
import React, { Fragment, useEffect, useState } from 'react';
import { siteConfig } from '../config/site';
import { Dialog, Transition } from '@headlessui/react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '../lib/utils';
import doForgotPassword from '../api/forgotpassword';
import AlertMessage from '../components/ThemeAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';




export default function ForgotPasswordPopup() {
    let [isOpen, setIsOpen] = useState()

    const [email, setEmail] = useState("");
    const [alertMessage, setAlertMessage] = useState({ visible: false, text: "", success: false });

    const [taskState, setTaskState] = useState("idle");

    const [inputsStatus, setInputsStatus] = useState({
        email: "valid",
    })


    useEffect(() => {
        if (email.length > 0) {
            setInputsStatus(
                {
                    ...inputsStatus,
                    email: email.match(siteConfig.emailPattern) ? "valid" : "invalid",
                }
            )
        }
    }, [email])


    const onPopupClose = () => {
        setSearchParams({});
        setEmail("");
        setIsOpen(false);
    }


    const handleForgotPassword = async () => {
        setTaskState("processing");
        let response = await doForgotPassword({
            email: email,
        })
        if (response === null) {
            setAlertMessage({
                text: "Got some error while processing your request. Please try again.",
                success: false,
                visible: true,
            })
        } else {
            setAlertMessage({
                text: response.message,
                success: response.success,
                visible: true,
            })
            if (response.success === true) {
                setTaskState("completed");
                setEmail("");

            }
        }
        setTaskState("idle");
    }


    return (
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
                                <div className="max-w-2xl relative w-full flex flex-col justify-between bg-primary-image text-white py-14 px-20 rounded-lg min-h-[700px]">
                                    <button onClick={onPopupClose} type='button' className='text-white absolute top-2 right-2 text-xl rounded-full py-1 px-3 aspect-square bg-transparent hover:bg-gray-50/20'>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                    <div>
                                        <h4 className="text-lg font-medium">Forgot Password?</h4>
                                        <p className='text-sm font-light text-gray-300 mt-2'>
                                            Please provide the email you've signed up with to get a restore password email.
                                        </p>
                                        <div>
                                            <AlertMessage
                                                success={alertMessage.success}
                                                visible={alertMessage.visible} text={alertMessage.text}
                                                onDissmissAlert={() => setAlertMessage({ ...alertMessage, visible: false })} />
                                        </div>
                                        <div className="mt-14 w-full">
                                            <ThemeInput
                                                type='email'
                                                className={cn(
                                                    'mb-5',
                                                    inputsStatus.email === "invalid" && "border-2 !border-red-500",
                                                )}
                                                placeholder='Email'
                                                value={email} onChange={(val) => setEmail(val)} />
                                            {
                                                taskState === "processing" ?
                                                    <button type="button" disabled className="btn-light w-full flex items-center justify-center mt-3">
                                                        <svg className="animate-spin mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        <span>Processing...</span>
                                                    </button>
                                                    :
                                                    <button type="button" onClick={() => handleForgotPassword()} className="btn-light w-full mt-3">
                                                        Continue
                                                    </button>
                                            }
                                        </div>
                                    </div>
                                    <div className='mt-10 w-full text-center'>
                                        <a href='?p=signup' className="cursor-pointer underline transition-all">
                                            Not a member? Create an account.
                                        </a>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}