import ThemeInput, { CountryCodeDropdown } from '../components/ThemeInput';
import React, { Fragment, useEffect, useState } from 'react';
import ThemeTextArea from '../components/ThemeTextArea';
import { siteConfig } from '../config/site';
import { cn } from '../lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Transition } from '@headlessui/react';
import { useSearchParams } from 'react-router-dom';
import LoaderEl from '../components/loader';
import doUpdateProfile from '../api/update-profile';
import AlertMessage from '../components/ThemeAlert';



export default function EditProfilePopup({ authUser }) {
    const [searchParams, setSearchParams] = useSearchParams();
    let [isOpen, setIsOpen] = useState(searchParams.get("p") === "editprofile" ? true : false)

    const [firstName, setFirstName] = useState(authUser.userProfile?.first_name ?? "");
    const [lastName, setLastName] = useState(authUser.userProfile?.last_name ?? "");
    const [email, setEmail] = useState(authUser.userProfile?.email ?? "");
    const [phoneNumber, setPhoneNumber] = useState(authUser.userProfile?.mobile ?? "");
    const [countryCode, setCountryCode] = useState(authUser.userProfile?.country_code ?? "");
    const [bio, setBio] = useState(authUser.userProfile?.bio ?? "");
    const [alertMessage, setAlertMessage] = useState({ visible: false, text: "", success: false });

    const [taskState, setTaskState] = useState("idle");

    const [profileImage, setProfileImage] = useState({ src: authUser.userProfile?.image, blob: null });
    const imageInputRef = React.useRef(null);
    const [inputsStatus, setInputsStatus] = useState({
        name: "idle",
        email: "valid",
        phoneNumber: "idle",
        bio: "idle",
        countryCode: "idle",
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
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setBio("");
        setCountryCode("");
        setIsOpen(false);
    }


    const handleUpdateProfile = async () => {
        if (!email.match(siteConfig.emailPattern)) {
            return;
        }
        setTaskState("processing");
        let response = await doUpdateProfile({
            accessToken: authUser.accessToken,
            name: { firstName: firstName, lastName: lastName },
            email: email,
            phoneNumber: phoneNumber,
            profileImage: profileImage.blob,
            countryCode: countryCode,
            bio: bio
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
                setTimeout(() => {
                    onPopupClose();
                    window.location.reload();
                },)
            }
        }
        setTaskState("idle");
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
                                    <div className='max-w-2xl relative bg-primary-image rounded-lg py-14'>
                                        <button onClick={onPopupClose} type='button' className='text-white absolute top-2 right-2 text-xl rounded-full py-1 px-3 aspect-square bg-transparent hover:bg-gray-50/20'>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                        {
                                            authUser.userProfile === undefined || authUser.userProfile === null ?
                                                <LoaderEl />
                                                :
                                                <div className="w-full text-white px-5 md:px-20 min-h-[70vh]">
                                                    <div className="mb-16 text-center">
                                                        <h1 className="uppercase text-6xl font-bold">Carhub</h1>
                                                        <p className="text-base italic font-light">Your Car Destination</p>
                                                        <AlertMessage
                                                            success={alertMessage.success}
                                                            visible={alertMessage.visible} text={alertMessage.text}
                                                            onDissmissAlert={() => setAlertMessage({ ...alertMessage, visible: false })} />
                                                    </div>

                                                    <div className="w-full space-y-5">
                                                        <div className='mx-auto w-32 mb-16 relative'>
                                                            {
                                                                <img src={profileImage.src}
                                                                    className='w-full border-4 border-gray-50/50 h-auto aspect-square mx-auto rounded-full' alt="" />
                                                            }
                                                            <input type="file" ref={imageInputRef}
                                                                onChange={(e) => setProfileImage({
                                                                    src: window.URL.createObjectURL(e.target.files[0]),
                                                                    blob: e.target.files[0]
                                                                })}
                                                                className='hidden' name="image" />
                                                            <button type='button' onClick={() => imageInputRef?.current?.click()} className='z-[1] text-white absolute top-0 right-2 text-sm rounded-full px-2 block aspect-square bg-primary transition-all'>
                                                                <FontAwesomeIcon icon={profileImage !== null ? faPenToSquare : faPlus} />
                                                            </button>
                                                        </div>
                                                        <div className='flex gap-5'>
                                                            <ThemeInput
                                                                type='text'
                                                                className={cn(
                                                                    inputsStatus.name === "invalid" && "border-2 !border-red-500",
                                                                    // inputsStatus.name === "valid" && "border-2 !border-green-500",
                                                                )}
                                                                placeholder='First Name'
                                                                value={firstName} onChange={(val) => setFirstName(val)} />
                                                            <ThemeInput
                                                                type='text'
                                                                className={cn(
                                                                    inputsStatus.name === "invalid" && "border-2 !border-red-500",
                                                                    // inputsStatus.name === "valid" && "border-2 !border-green-500",
                                                                )}
                                                                placeholder='Last Name'
                                                                value={lastName} onChange={(val) => setLastName(val)} />
                                                        </div>

                                                        <ThemeInput
                                                            type='email'
                                                            className={cn(
                                                                inputsStatus.email === "invalid" && "border-2 !border-red-500",
                                                                // inputsStatus.email === "valid" && "border-2 !border-green-500",
                                                            )}
                                                            placeholder='Email'
                                                            value={email} onChange={(val) => setEmail(val)} />
                                                        <div className='flex items-center gap-3 mb-5'>
                                                            <CountryCodeDropdown
                                                                value={countryCode}
                                                                onChange={(val) => setCountryCode(val)}
                                                            />
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
                                                        <ThemeTextArea placeholder="Bio" rows={4}
                                                            className={cn(
                                                                inputsStatus.bio === "invalid" && "border-2 !border-red-500",
                                                            )}
                                                            value={bio} onChange={(val) => setBio(val)} />
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
                                                                    <button type="button" onClick={handleUpdateProfile} className="btn-light w-full font-semibold">
                                                                        Update Profile
                                                                    </button>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                        }

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