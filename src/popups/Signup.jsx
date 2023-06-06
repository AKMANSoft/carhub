import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import ThemeInput, { CountryCodeDropdown } from '../components/ThemeInput';
import React, { Fragment, useEffect, useState } from 'react';
import ThemeTextArea from '../components/ThemeTextArea';
import { siteConfig } from '../config/site';
import { cn } from '../lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import doSignUp from '../api/signup';
import { Dialog, Transition } from '@headlessui/react';
import { useSearchParams } from 'react-router-dom';
import AlertMessage from '../components/alertmessage';
import { useCookies } from 'react-cookie'



export default function SignupPopup() {
    const [cookies, setCookies] = useCookies(["accessToken"]);

    const [searchParams, setSearchParams] = useSearchParams();
    let [isOpen, setIsOpen] = useState(searchParams.get("p") === "signup" ? true : false)

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [currentStep, setCurrentStep] = useState("first");
    const [bio, setBio] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [alertMessage, setAlertMessage] = useState({ visible: false, text: "", success: false });

    const [taskState, setTaskState] = useState("idle");

    const [profileImage, setProfileImage] = useState(null);
    const imageInputRef = React.useRef(null);
    const [inputsStatus, setInputsStatus] = useState({
        name: "idle",
        email: "valid",
        password: "idle",
        confPassword: "idle",
        phoneNumber: "idle",
        bio: "idle",
        city: "idle",
        state: "idle",
        address: "idle",
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

    useEffect(() => {
        console.log(password)
        if (password.length > 0 && confPassword.length > 0) {
            let passwordsValid = password.length > 0 && confPassword.length > 0 && password === confPassword;
            setInputsStatus(
                {
                    ...inputsStatus,
                    password: passwordsValid ? "valid" : "invalid",
                    confPassword: passwordsValid ? "valid" : "invalid",
                }
            )
        }
    }, [password, confPassword])


    const onPopupClose = () => {
        setSearchParams({});
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfPassword("");
        setPhoneNumber("");
        setBio("");
        setState("");
        setCity("");
        setAddress("");
        setCurrentStep("first")
        setIsOpen(false);
    }


    const handleSignUp = async () => {
        setTaskState("processing");
        let response = await doSignUp({
            name: { firstName: firstName, lastName: lastName },
            email: email,
            password: password,
            confPassword: confPassword,
            phoneNumber: phoneNumber,
            profileImage: profileImage,
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

    const onContinue = (step) => {
        switch (step) {
            case "first":
                if (
                    email.match(siteConfig.emailPattern) && password !== "" &&
                    confPassword !== "" && password === confPassword &&
                    firstName !== "" && lastName !== "" && phoneNumber !== ""
                ) {
                    setCurrentStep("second");
                }
                break;
            case "second":
                handleSignUp();
                break;
            default:
                setCurrentStep("first")
                break;
        }
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
                                        {
                                            currentStep === "second" ?
                                                <div className="min-w-full space-y-5">
                                                    <div className='mx-auto w-32 mb-8 relative'>
                                                        {
                                                            profileImage !== null ?
                                                                <img src={window.URL.createObjectURL(profileImage)} className='w-full border-4 border-gray-50/50 h-auto aspect-square mx-auto rounded-full' alt="" />
                                                                :
                                                                <div className='w-full bg-white text-primary h-auto aspect-square mx-auto rounded-full flex items-center justify-center text-5xl'>
                                                                    <FontAwesomeIcon icon={faUser} />
                                                                </div>
                                                        }
                                                        <input type="file" ref={imageInputRef} onChange={(e) => setProfileImage(e.target.files[0])} className='hidden' name="image" />
                                                        <button type='button' onClick={() => imageInputRef?.current?.click()} className='z-[1] text-white absolute top-0 right-2 text-sm rounded-full px-2 block aspect-square bg-primary transition-all'>
                                                            <FontAwesomeIcon icon={profileImage !== null ? faPenToSquare : faPlus} />
                                                        </button>
                                                    </div>
                                                    <ThemeTextArea placeholder="Bio" rows={4}
                                                        className={cn(
                                                            inputsStatus.bio === "invalid" && "border-2 !border-red-500",
                                                        )}
                                                        value={bio} onChange={(val) => setBio(val)} />
                                                    <div className='flex gap-5'>
                                                        <ThemeInput type='text' placeholder='State'
                                                            className={cn(
                                                                inputsStatus.bio === "invalid" && "border-2 !border-red-500",
                                                            )}
                                                            value={state} onChange={(val) => setState(val)} />
                                                        <ThemeInput type='text' placeholder='City'
                                                            className={cn(
                                                                inputsStatus.bio === "invalid" && "border-2 !border-red-500",
                                                            )}
                                                            value={city} onChange={(val) => setCity(val)} />
                                                    </div>
                                                    <ThemeInput type='text' placeholder='Address'
                                                        className={cn(
                                                            inputsStatus.bio === "invalid" && "border-2 !border-red-500",
                                                        )}
                                                        value={address} onChange={(val) => setAddress(val)} />
                                                    <div className='pt-10'>
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
                                                                <button type="button" onClick={() => onContinue("second")} className="btn-light w-full">
                                                                    Continue
                                                                </button>
                                                        }

                                                    </div>
                                                </div>
                                                :
                                                <>
                                                    <div className="w-full">
                                                        <div className='flex gap-5'>
                                                            <ThemeInput
                                                                type='text'
                                                                className={cn(
                                                                    'mb-5',
                                                                    inputsStatus.name === "invalid" && "border-2 !border-red-500",
                                                                    // inputsStatus.name === "valid" && "border-2 !border-green-500",
                                                                )}
                                                                placeholder='First Name'
                                                                value={firstName} onChange={(val) => setFirstName(val)} />
                                                            <ThemeInput
                                                                type='text'
                                                                className={cn(
                                                                    'mb-5',
                                                                    inputsStatus.name === "invalid" && "border-2 !border-red-500",
                                                                    // inputsStatus.name === "valid" && "border-2 !border-green-500",
                                                                )}
                                                                placeholder='Last Name'
                                                                value={lastName} onChange={(val) => setLastName(val)} />
                                                        </div>

                                                        <ThemeInput
                                                            type='email'
                                                            className={cn(
                                                                'mb-5',
                                                                inputsStatus.email === "invalid" && "border-2 !border-red-500",
                                                                // inputsStatus.email === "valid" && "border-2 !border-green-500",
                                                            )}
                                                            placeholder='Email'
                                                            value={email} onChange={(val) => setEmail(val)} />
                                                        <ThemeInput
                                                            type='password'
                                                            className={cn(
                                                                'mb-5',
                                                                inputsStatus.password === "invalid" && "border-2 !border-red-500",
                                                                // inputsStatus.password === "valid" && "border-2 !border-green-500",
                                                            )}
                                                            placeholder='Password'
                                                            value={password} onChange={(val) => setPassword(val)} />
                                                        <ThemeInput
                                                            type='password'
                                                            className={cn(
                                                                'mb-5',
                                                                inputsStatus.confPassword === "invalid" && "border-2 !border-red-500",
                                                                // inputsStatus.confPassword === "valid" && "border-2 !border-green-500",
                                                            )}
                                                            placeholder='Confirm Password'
                                                            value={confPassword} onChange={(val) => setConfPassword(val)} />
                                                        <div className='flex items-center gap-3 mb-5'>
                                                            <CountryCodeDropdown />
                                                            <ThemeInput
                                                                type='number'
                                                                className={cn(
                                                                    inputsStatus.phoneNumber === "invalid" && "border-2 !border-red-500",
                                                                    // inputsStatus.phoneNumber === "valid" && "border-2 !border-green-500",
                                                                )}
                                                                placeholder='Phone Number'
                                                                variant='phone'
                                                                value={phoneNumber} onChange={(val) => setPhoneNumber(val)} />
                                                        </div>
                                                        <button type="button" onClick={() => onContinue("first")} className="btn-light w-full mt-10">Continue</button>
                                                    </div>
                                                    <div className="mt-16 space-y-3 w-full">
                                                        <button type="submit" className="w-full btn-light justify-center flex gap-8 items-center">
                                                            <FaGoogle className="text-2xl" />
                                                            <span>Continue with Google</span>
                                                        </button>
                                                        <button type="submit" className="w-full btn-light justify-center flex gap-8 items-center">
                                                            <FaFacebook className="text-2xl" />
                                                            <span>Continue with Google</span>
                                                        </button>
                                                        <button type="submit" className="w-full btn-light justify-center flex gap-8 items-center">
                                                            <FaApple className="text-2xl" />
                                                            <span>Continue with Google</span>
                                                        </button>
                                                    </div>
                                                    <div className='mt-10 w-full text-center'>
                                                        <a href='?p=signin' className="cursor-pointer border-b transition-all">
                                                            Already a member? Sign in.
                                                        </a>
                                                    </div>
                                                </>
                                        }

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