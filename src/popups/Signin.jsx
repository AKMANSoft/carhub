import ThemeInput from '../components/ThemeInput';
import React, { Fragment, useEffect, useState } from 'react';
import { siteConfig } from '../config/site';
import { cn } from '../lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Transition } from '@headlessui/react';
import { useSearchParams } from 'react-router-dom';
import AlertMessage from '../components/alertmessage';
import doSignIn from '../api/signin';
import { useCookies } from 'react-cookie'
import { faApple, faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';




export default function SigninPopup() {
    const [cookies, setCookies] = useCookies(["accessToken"]);

    const [searchParams, setSearchParams] = useSearchParams();
    let [isOpen, setIsOpen] = useState(searchParams.get("p") === "signin" ? true : false)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState({ visible: false, text: "", success: false });

    const [taskState, setTaskState] = useState("idle");

    const [inputsStatus, setInputsStatus] = useState({
        email: "valid",
        password: "idle",
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
        setPassword("");
        setIsOpen(false);
    }


    const handleSignIn = async () => {
        setTaskState("processing");
        let response = await doSignIn({
            email: email,
            password: password,
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
                setCookies("accessToken", response.data.access_token, {
                    maxAge: 3600 * 24,
                    path: "/"
                })
                setTaskState("completed");
                setTimeout(() => {
                    onPopupClose();
                    window.location.reload();
                }, 500);
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
                                <div className='max-w-2xl relative bg-primary-image rounded-lg py-14'>
                                    <button onClick={onPopupClose} type='button' className='text-white absolute top-2 right-2 text-xl rounded-full py-1 px-3 aspect-square bg-transparent hover:bg-gray-50/20'>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                    <div className="w-full text-white px-5 md:px-20 min-h-[70vh]">
                                        <div className="mb-16 text-center">
                                            <h1 className="uppercase text-6xl font-bold">Carhub</h1>
                                            <p className="text-base italic font-light">Your Car Destination</p>
                                            <AlertMessage
                                                success={alertMessage.success}
                                                visible={alertMessage.visible} text={alertMessage.text}
                                                onDissmissAlert={() => setAlertMessage({ ...alertMessage, visible: false })} />
                                        </div>

                                        <div className="w-full">
                                            <ThemeInput
                                                type='email'
                                                className={cn(
                                                    'mb-5',
                                                    inputsStatus.email === "invalid" && "border-2 !border-red-500",
                                                )}
                                                placeholder='Email'
                                                value={email} onChange={(val) => setEmail(val)} />
                                            <ThemeInput
                                                type='password'
                                                className={cn(
                                                    'mb-5',
                                                    inputsStatus.password === "invalid" && "border-2 !border-red-500",
                                                )}
                                                placeholder='Password'
                                                value={password} onChange={(val) => setPassword(val)} />
                                            <a href="#" className="ms-5 hover:underline transition-all">Forgot Password?</a>
                                            <div className='mt-10'>
                                                {
                                                    taskState === "processing" ?
                                                        <button type="button" disabled className="btn-light w-full flex items-center justify-center">
                                                            <svg className="animate-spin mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span>Processing...</span>
                                                        </button>
                                                        :
                                                        <button type="button" onClick={() => handleSignIn()} className="btn-light w-full">
                                                            Continue
                                                        </button>
                                                }
                                            </div>
                                        </div>
                                        <div className="mt-16 space-y-3 w-full">
                                            <button type="submit" className="w-full btn-light justify-center flex gap-8 items-center">
                                                <FontAwesomeIcon icon={faGoogle} className="text-2xl" />
                                                <span>Continue with Google</span>
                                            </button>
                                            <button type="submit" className="w-full btn-light justify-center flex gap-8 items-center">
                                                <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
                                                <span>Continue with Google</span>
                                            </button>
                                            <button type="submit" className="w-full btn-light justify-center flex gap-8 items-center">
                                                <FontAwesomeIcon icon={faApple} className="text-2xl" />
                                                <span>Continue with Google</span>
                                            </button>
                                        </div>
                                        <div className='mt-10 w-full text-center'>
                                            <a href='?p=signup' className="cursor-pointer underline transition-all">
                                                Not a member? Create an account.
                                            </a>
                                        </div>

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