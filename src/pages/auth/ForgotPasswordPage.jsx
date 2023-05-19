import ThemeInput from '../../components/ThemeInput';

// type Props = {}

export default function ForgotPasswordPage() {
    return (
        <div className="w-full h-auto min-h-screen py-20 px-4 flex items-start justify-center">
            <div className="max-w-2xl w-full bg-primary-image text-white py-14 px-20 rounded-lg min-h-[700px]">
                <h4 className="text-lg font-medium">Forgot Password?</h4>
                <p className='text-sm font-light text-gray-300 mt-2'>
                    Please provide the email you've signed up with to get a restore password email.
                </p>
                <div className="mt-14 w-full">
                    <ThemeInput type='email' className='mb-5' placeholder='Email' />
                    <button type="submit" className="btn-light w-full mt-3">Continue</button>
                </div>
            </div>
        </div>
    )
}