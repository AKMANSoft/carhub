

const categories = [
    "Sedan",
    "SUV",
    "Truck",
    "Coupe",
    "Convertible",
    "Wagon/Hatchback",
    "Van/Minivian",
    "Others"
]

export default function Header() {
    const isLoggedin = false;
    return (
        <header className="w-full px-10 py-5 shadow-md fixed top-0 left-0 bg-white">
            <div className="flex items-center justify-between">
                <div className='flex items-center gap-10'>
                    <h3 className="text-4xl font-extrabold text-primary">CARHUB</h3>
                    <div className="relative text-gray-500 border border-gray-300 rounded-full overflow-hidden flex">
                        <a className="text-base z-[1] bg-transparent cursor-pointer transition-all duration-300 border-r text-gray-600 px-4 py-2 inline-flex items-center gap-5 hover:bg-gray-100 hover:text-primary">
                            All Categories
                            <i className='fa-solid fa-chevron-down'></i>
                        </a>
                        <input className="ps-5 text-sm min-h-full outline-none text-gray-600 appearance-none bg-transparent"
                            type="search" name="search" placeholder="Search" />
                        <a href='#' className="text-lg min-h-full z-[1] bg-transparent transition-all duration-300 border-l text-gray-600 px-6 py-2 hover:bg-gray-100 hover:text-primary">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </a>
                    </div>
                </div>
                {/* <nav>
                <ul className='flex items-center'>
                    <li>
                        <a href="#" className='text-base font-medium py-2 px-4 transition-all hover:bg-gray-100 hover:text-primary'>Home</a>
                    </li>
                    <li>
                        <a href="#" className='text-base font-medium py-2 px-4 transition-all hover:bg-gray-100 hover:text-primary'>Home</a>
                    </li>
                    <li>
                        <a href="#" className='text-base font-medium py-2 px-4 transition-all hover:bg-gray-100 hover:text-primary'>Home</a>
                    </li>
                </ul>
            </nav> */}
                <div className='flex items-center gap-5'>
                    {
                        isLoggedin &&
                        <div className='flex items-center gap-5'>
                            <button type='button' className='text-2xl text-gray-700 transition-all hover:text-primary hover:scale-110'>
                                <i className="fa-solid fa-message"></i>
                            </button>
                            <button type='button' className='text-2xl text-gray-700 transition-all hover:text-primary hover:scale-110'>
                                <i className="fa-solid fa-bell"></i>
                            </button>
                            <button type='button' className='text-2xl text-gray-700 transition-all hover:text-primary hover:scale-110'>
                                <i className="fa-solid fa-user"></i>
                            </button>
                        </div>
                    }
                    <div>
                        {
                            isLoggedin ?
                                <a href="#" className='text-base font-medium border border-primary text-gray-800 px-8 py-3 hover:bg-primary/95 hover:text-white transition-all rounded-full'>
                                    Post Car
                                    <i className='fa-solid fa-plus ms-5'></i>
                                </a>
                                :
                                <>
                                    <a href="#" className='text-base font-medium bg-primary text-white px-8 py-3 hover:bg-primary/95 rounded-full'>
                                        Sign Up
                                    </a>
                                    <a href="#" className='text-base font-medium text-gray-500 px-3 hover:text-primary py-3 rounded-full'>
                                        Sign In
                                    </a>
                                </>
                        }
                    </div>
                </div>
            </div>
            <div className="flex mt-4 items-center">
                <h3 className="text-lg min-w-max text-gray-900 font-bold ps-1 pr-10 border-r border-gray-500">Find A Car</h3>
                <div className="flex ms-10 gap-x-2 items-center flex-wrap">
                    {
                        categories.map((ctgry) => (
                            <a href="#" className="text-base font-normal text-gray-800 px-4 py-1 rounded-lg transition-all hover:bg-gray-100 hover:text-primary hover:font-medium">
                                {ctgry}
                            </a>
                        ))
                    }
                </div>
            </div>
        </header>
    );
}