import ThemeInput, { AddressInput, CountryCodeDropdown } from '../components/ThemeInput';
import React, { Fragment, useEffect, useState } from 'react';
import ThemeTextArea from '../components/ThemeTextArea';
import { siteConfig } from '../config/site';
import { cn } from '../lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import doSignUp from '../api/signup';
import { Dialog, Transition } from '@headlessui/react';
import { useSearchParams } from 'react-router-dom';
import AlertMessage from '../components/ThemeAlert';
import { useCookies } from 'react-cookie'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import doSocialSignIn from '../api/socialSignIn';
import { handleTranslation } from '../lib/i18n';
import { CheckBoxEl } from '../components/AddEditCarComponent';



export default function SignupPopup() {
    const { trans } = handleTranslation()
    const [cookies, setCookies] = useCookies(["accessToken"]);

    const [searchParams, setSearchParams] = useSearchParams();
    let [isOpen, setIsOpen] = useState(searchParams.get("p") === "signup" ? true : false)

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tosConfirmed, setTosConfirmed] = useState(false);
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [currentStep, setCurrentStep] = useState("first");
    const [bio, setBio] = useState("");
    const [address, setAddress] = useState({
        city: "",
        state: "",
        streetAddress: "",
        latitude: 0,
        longitude: 0
    });
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


    const onAddressChange = (addressVal) => {
        setAddress({
            streetAddress: addressVal.name,
            latitude: addressVal.latitude,
            longitude: addressVal.longitude,
            city: addressVal.city,
            state: addressVal.state
        });
    }


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
        setAddress({
            city: "",
            state: "",
            streetAddress: "",
            latitude: 0,
            longitude: 0
        });
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
            latitude: address.latitude,
            longitude: address.longitude,
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
                    && tosConfirmed
                ) {
                    setCurrentStep("second");
                }
                break;
            case "second":
                if (address.lat !== 0 && address.lng !== 0) handleSignUp();
                break;
            default:
                setCurrentStep("first")
                break;
        }
    }


    const signInWithGoogle = useGoogleLogin({
        flow: "implicit",
        onSuccess: async (googleRes) => {
            try {
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${googleRes.access_token}` },
                }).then((res) => res.data);
                const response = await doSocialSignIn({
                    email: userInfo.email,
                    firstName: userInfo.given_name,
                    lastName: userInfo.family_name,
                    googleId: userInfo.sub
                })
                if (response === null) {
                    throw new Error();
                }
                else {
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

            } catch (error) {
                setAlertMessage({
                    text: "Got some error while processing your request. Please try again.",
                    success: false,
                    visible: true,
                })
            }
        },
        onError: (error) => {
            setAlertMessage({
                text: "Got some error while processing your request. Please try again.",
                success: false,
                visible: true,
            })
        }
    })

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
                                            <div className='flex items-center justify-center'>
                                                <img src="/images/logo.png" height={150} className="h-40 rounded-2xl" alt="" />
                                            </div>
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
                                                    <ThemeTextArea placeholder={trans("bio")} rows={4}
                                                        className={cn(
                                                            inputsStatus.bio === "invalid" && "border-2 !border-red-500",
                                                        )}
                                                        value={bio} onChange={(val) => setBio(val)} />
                                                    <AddressInput placeholder={trans("address")}
                                                        className={cn(
                                                            inputsStatus.address === "invalid" && "border-2 !border-red-500",
                                                        )}
                                                        value={address.streetAddress} onChange={onAddressChange} />

                                                    <div className='flex gap-5'>
                                                        <ThemeInput type='text' readOnly placeholder={trans("city")}
                                                            className={cn(
                                                                inputsStatus.city === "invalid" && "border-2 !border-red-500",
                                                            )}
                                                            value={address.city}
                                                            onChange={(val) => setAddress({ ...address, state: val })} />
                                                        <ThemeInput type='text' readOnly placeholder={trans("state")}
                                                            className={cn(
                                                                inputsStatus.state === "invalid" && "border-2 !border-red-500",
                                                            )}
                                                            value={address.state}
                                                            onChange={(val) => setAddress({ ...address, state: val })} />
                                                    </div>

                                                    <div className='pt-10'>
                                                        {
                                                            taskState === "processing" ?
                                                                <button type="button" disabled className="btn-light w-full flex items-center justify-center">
                                                                    <svg className="animate-spin mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                    </svg>
                                                                    <span>{trans("processing...")}</span>
                                                                </button>
                                                                :
                                                                <button type="button" onClick={() => onContinue("second")} className="btn-light w-full">
                                                                    {trans("continue")}
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
                                                                placeholder={trans("first_name")}
                                                                value={firstName} onChange={(val) => setFirstName(val)} />
                                                            <ThemeInput
                                                                type='text'
                                                                className={cn(
                                                                    'mb-5',
                                                                    inputsStatus.name === "invalid" && "border-2 !border-red-500",
                                                                    // inputsStatus.name === "valid" && "border-2 !border-green-500",
                                                                )}
                                                                placeholder={trans("last_name")}
                                                                value={lastName} onChange={(val) => setLastName(val)} />
                                                        </div>

                                                        <ThemeInput
                                                            type='email'
                                                            className={cn(
                                                                'mb-5',
                                                                inputsStatus.email === "invalid" && "border-2 !border-red-500",
                                                                // inputsStatus.email === "valid" && "border-2 !border-green-500",
                                                            )}
                                                            placeholder={trans("email")}
                                                            value={email} onChange={(val) => setEmail(val)} />
                                                        <ThemeInput
                                                            type='password'
                                                            className={cn(
                                                                'mb-5',
                                                                inputsStatus.password === "invalid" && "border-2 !border-red-500",
                                                                // inputsStatus.password === "valid" && "border-2 !border-green-500",
                                                            )}
                                                            placeholder={trans("password")}
                                                            value={password} onChange={(val) => setPassword(val)} />
                                                        <ThemeInput
                                                            type='password'
                                                            className={cn(
                                                                'mb-5',
                                                                inputsStatus.confPassword === "invalid" && "border-2 !border-red-500",
                                                                // inputsStatus.confPassword === "valid" && "border-2 !border-green-500",
                                                            )}
                                                            placeholder={trans("confirm_password")}
                                                            value={confPassword} onChange={(val) => setConfPassword(val)} />
                                                        <div className='flex items-center gap-3 mb-5 relative overflow-hidden rounded-full'>
                                                            <span className='absolute left-0 top-1/2 -translate-y-1/2 z-[1] border-r border-r-gray-400 bg-transparent text-white py-2 px-5 pr-3'>
                                                                +1
                                                            </span>
                                                            <ThemeInput
                                                                type='number'
                                                                className="ps-16"
                                                                placeholder={trans("cell")}
                                                                variant='phone'
                                                                value={phoneNumber} onChange={(val) => setPhoneNumber(val)} />
                                                        </div>
                                                        <div className='flex items-center gap-3 py-3 relative'>
                                                            <CheckBoxEl
                                                                id={"signup_confirmation"}
                                                                checked={tosConfirmed}
                                                                onChange={(value) => setTosConfirmed(value)}
                                                                label={
                                                                    <p className='text-white'>
                                                                        {trans("signup_checkbox")}
                                                                        <a href={siteConfig.links.termsOfServices} className='px-2 inline underline'>
                                                                            {trans("tos").toLowerCase()}.
                                                                        </a>
                                                                    </p>
                                                                } />

                                                        </div>
                                                        <button type="button" onClick={() => onContinue("first")} className="btn-light w-full mt-10">
                                                            {trans("continue")}
                                                        </button>
                                                    </div>
                                                    <div className="mt-16 space-y-3 w-full">
                                                        <button type="button" onClick={signInWithGoogle} className="w-full btn-light justify-center flex gap-8 items-center">
                                                            <FontAwesomeIcon icon={faGoogle} className="text-2xl" />
                                                            <span>{trans("continue_with_google")}</span>
                                                        </button>
                                                    </div>
                                                    <div className='mt-10 w-full text-center'>
                                                        <a href='?p=signin' className="cursor-pointer border-b transition-all">
                                                            {trans("already_member")}
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