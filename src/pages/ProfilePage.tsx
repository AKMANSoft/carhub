

export default function ProfilePage() {
    return (
        <div className="max-w-screen-xl mx-auto py-20 px-5 md:px-20">
            <div className="w-full shadow-lg shadow-primary/30 rounded-lg p-20">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <img src="/images/car9.jpg" width={175} height={175}
                            className="w-44 h-auto aspect-square object-cover object-center rounded-full border-4" alt="" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Ali Hussnain</h3>
                            <p className="text-base font-normal text-gray-600">
                                Islamabad | Pakistan
                            </p>
                            <div className="mt-5 inline-flex items-center gap-4">
                                <span className="text-sm font-normal text-white rounded-full px-2 py-0.5 bg-primary">
                                    <i className="fa-solid fa-star text-xs mr-2"></i>
                                    4.9
                                </span>
                                <p className="text-base font-normal text-gray-600">2 Reviews</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <a href="#" className='text-base font-medium bg-primary text-white px-8 py-2.5 hover:bg-primary/95 rounded-full'>
                            Edit Profile
                        </a>
                    </div>
                </div>
                <div className="mt-10">
                    <div className="flex items-center justify-center gap-40">
                        <button type="button" className="text-lg font-semibold text-gray-800 px-5 py-2 border-b-4 border-transparent rounded">Offers</button>
                        <button type="button" className="text-lg font-semibold text-gray-800 px-5 py-2 border-b-4 border-primary rounded">Reviews</button>
                    </div>
                    <div className="py-8 space-y-6">
                        <div className="border-b py-2">
                            <h4 className="text-lg font-medium text-primary">
                                <span className="mr-8">John Doe</span>
                                <span className="text-sm font-normal text-white rounded-full px-2 py-0.5 bg-primary">
                                    <i className="fa-solid fa-star text-xs mr-2"></i>
                                    4.9
                                </span>
                            </h4>
                            <p className="text-sm font-normal text-gray-600 mt-1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aspernatur odio corporis fugit quasi. Quidem amet similique cum accusamus alias id unde, vel nam itaque, soluta dolorum maiores sapiente eos.
                            </p>
                        </div>
                        <div className="border-b py-2">
                            <h4 className="text-lg font-medium text-primary">
                                <span className="mr-8">John Doe</span>
                                <span className="text-sm font-normal text-white rounded-full px-2 py-0.5 bg-primary">
                                    <i className="fa-solid fa-star text-xs mr-2"></i>
                                    4.9
                                </span>
                            </h4>
                            <p className="text-sm font-normal text-gray-600 mt-1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aspernatur odio corporis fugit quasi. Quidem amet similique cum accusamus alias id unde, vel nam itaque, soluta dolorum maiores sapiente eos.
                            </p>
                        </div>
                        <div className="border-b py-2">
                            <h4 className="text-lg font-medium text-primary">
                                <span className="mr-8">John Doe</span>
                                <span className="text-sm font-normal text-white rounded-full px-2 py-0.5 bg-primary">
                                    <i className="fa-solid fa-star text-xs mr-2"></i>
                                    4.9
                                </span>
                            </h4>
                            <p className="text-sm font-normal text-gray-600 mt-1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt aspernatur odio corporis fugit quasi. Quidem amet similique cum accusamus alias id unde, vel nam itaque, soluta dolorum maiores sapiente eos.
                            </p>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}