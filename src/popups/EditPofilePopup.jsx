import ThemeInput from '../components/ThemeInput';
import BasePopup from './BasePopup';
import React from 'react';
import ThemeTextArea from '../components/ThemeTextArea';
import authBgImage from '../assets/auth_bg_image.svg'

// type Props = {}

export default function EditPofilePopup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const popupRef = React.useRef(null);
    const imageInputRef = React.useRef(null);

    console.log(authBgImage)
    return (
        <BasePopup popupRef={popupRef}>
            {/* Trigger Button  */}
            <button type='button' id='trigger' className='text-base font-medium bg-primary text-white px-8 py-2.5 hover:bg-primary/95 rounded-full'>
                Edit Profile
            </button>
            {/* Popup Content  */}
            <div className='max-w-2xl relative bg-primary-image rounded-lg py-14'>
                <button type='button' onClick={() => popupRef?.current?.close()} className='text-white absolute top-2 right-2 text-xl rounded-full py-1 px-3 aspect-square bg-transparent hover:bg-gray-50/20'>
                    <i className='fa-solid fa-xmark'></i>
                </button>
                <div className="w-full text-white px-5 md:px-20 min-h-[70vh] max-h-[80vh] overflow-y-auto">
                    <div className="mb-16 text-center">
                        <h1 className="uppercase text-6xl font-bold">Carhub</h1>
                        <p className="text-base italic font-light">Your Car Destination</p>
                    </div>
                    <div className="min-w-full space-y-5">
                        <div className='mx-auto w-32 mb-8 relative'>
                            <img src="/images/car1.jpg" className='w-full border-4 border-gray-50/50 h-auto aspect-square mx-auto rounded-full' alt="" />
                            <input type="file" ref={imageInputRef} className='hidden' name="image" />
                            <button type='button' onClick={() => imageInputRef?.current?.click()} className='z-[1] text-gray-700 absolute bottom-0 right-2 text-sm rounded-full px-2 block aspect-square bg-white transition-all hover:bg-gray-200'>
                                <i class="fa-solid fa-pen-to-square"></i>
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
        </BasePopup>
    )
}