
// type Props = {}

import CarGridItem from "../components/CarGridItem"
import { categories } from "../components/Header"
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS"

const cars = [
    "/images/car1.jpg",
    "/images/car2.jpg",
    "/images/car3.jpg",
    "/images/car4.jpg",
    "/images/car5.jpg",
    "/images/car6.jpg",
    "/images/car7.jpg",
    "/images/car8.jpg",
    "/images/car9.jpg",
    "/images/car1.jpg",
    "/images/car2.jpg",
    "/images/car3.jpg",
    "/images/car4.jpg",
    "/images/car5.jpg",
    "/images/car6.jpg",
    "/images/car7.jpg",
    "/images/car8.jpg",
    "/images/car9.jpg",
]

export default function SearchPage() {
    return (
        <div className={"py-10" + MAIN_HORIZONTAL_PADDING}>
            <div className="flex items-start gap-0 md:gap-5">
                <div className="min-w-[300px] rounded border px-4 py-5 hidden lg:block">
                    <ul className="border-b pb-5 space-y-2 border-gray-100">
                        {
                            categories.map((ctgry) => (
                                <li key={ctgry}>
                                    <a href="#" className={"text-base text-gray-800 transition-all hover:font-semibold " + (ctgry === "Sedan" ? "font-semibold" : "font-normal")}>
                                        {ctgry}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="py-3">
                        <h4 className="text-lg font-semibold">Filters</h4>
                        <div className="border-b py-6">
                            <h5 className="text-base font-medium">Price Range</h5>
                            <div className="flex items-center gap-3 mt-2">
                                <input type="number" placeholder="Min" className="w-20 outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md" />
                                <p className="text-sm font-normal text-gray-800">to</p>
                                <input type="number" placeholder="Max" className="w-20 outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md" />
                                <button type="submit" className="text-sm font-normal border border-primary rounded-full p-1.5 transition-all bg-transparent hover:bg-primary hover:text-white">
                                    Go
                                </button>
                            </div>
                        </div>
                        <div className="pt-7">
                            <h5 className="text-base font-medium">Condition</h5>
                            <ul className="mt-2 space-y-2">
                                <li className="flex items-center">
                                    <input type="checkbox" className="text-primary border-gray-400 border-2 !ring-transparent rounded" id="condition-new" />
                                    <label htmlFor="condition-new" className="text-base text-gray-800 font-normal ms-4">
                                        New <br />
                                        <span className="text-sm text-gray-600">
                                        </span>
                                    </label>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="text-primary border-gray-400 border-2 !ring-transparent rounded" id="condition-open-box" />
                                    <label htmlFor="condition-open-box" className="text-base text-gray-800 font-normal ms-4">
                                        Open box <br />
                                        <span className="text-sm text-gray-600">
                                        </span>
                                    </label>
                                </li>
                                <li className="flex items-center">
                                    <input type="checkbox" className="text-primary border-gray-400 border-2 !ring-transparent rounded" id="condition-reconditioned" />
                                    <label htmlFor="condition-reconditioned" className="text-base text-gray-800 font-normal ms-4">
                                        Reconditioned <br />
                                        <span className="text-sm text-gray-600">
                                        </span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-full">
                        <h3 className="text-5xl font-bold text-gray-900 py-2">Sedan</h3>
                        <div className="flex items-center justify-between gap-5">
                            <div className="flex items-center flex-wrap gap-5 mt-4 mb-8">
                                <a href="#" className="text-sm text-gray-900 font-normal py-2 px-4 rounded-full border border-gray-200 transition-all hover:bg-gray-100">
                                    Sub Category 1
                                </a>
                                <a href="#" className="text-sm text-gray-900 font-normal py-2 px-4 rounded-full border border-gray-200 transition-all hover:bg-gray-100">
                                    Sub Category 2
                                </a>
                                <a href="#" className="text-sm text-gray-900 font-normal py-2 px-4 rounded-full border border-gray-200 transition-all hover:bg-gray-100">
                                    Sub Category 3
                                </a>
                            </div>
                            <div>
                                <label htmlFor="sortby">Sort by: </label>
                                <select name="sort" id="sortby" className="no-decor">
                                    <option value="">Recent first</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5 md:gap-8">
                        {
                            cars.map((img) => (
                                <CarGridItem key={img} img={img} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}