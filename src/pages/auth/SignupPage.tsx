import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import ThemeInput from '../../components/ThemeInput';

// type Props = {}

export default function SignupPage() {
    // bg-gradient-to-b from-primary from-75% to-white to-100%
    return (
        <div className="w-full h-auto min-h-screen py-20 px-4 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-primary-image text-white py-14 px-20 rounded-lg min-h-[700px]">
                <div className="mb-20 text-center">
                    <h1 className="uppercase text-6xl font-bold">Carhub</h1>
                    <p className="text-base italic font-light">Your Car Destination</p>
                </div>
                <div className="w-full">
                    <ThemeInput type='text' className='mb-5' placeholder='Full Name' />
                    <ThemeInput type='email' className='mb-5' placeholder='Email' />
                    <ThemeInput type='password' className='mb-5' placeholder='Password' />
                    <ThemeInput type='password' className='mb-5' placeholder='Confirm Password' />
                    <ThemeInput type='number' className='mb-5' placeholder='Phone Number' />
                    <button type="submit" className="btn-light w-full mt-10">Continue</button>
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
                    <a href="/signin" className="border-b transition-all">
                        Already a member? Sign in.
                    </a>
                </div>
            </div>
        </div>
    )
}