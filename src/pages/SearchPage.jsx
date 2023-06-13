import { useSearchParams } from "react-router-dom"
import CarGridItem from "../components/CarGridItem"
import { MAIN_HORIZONTAL_PADDING } from "../styles/StaticCSS"
import React, { useEffect, useState } from "react"
import MainLayout from "../components/layout"
import useCarsFetcher from "../components/hooks/useCarsFetcher"
import useAuthUser from "../components/hooks/useAuthUser"
import LoaderEl from "../components/loader"
import { cn } from "../lib/utils"
import { apiConfig } from "../config/api"
import useFiltersFetcher, { sortYears } from "../components/hooks/filtersFetchers"
import { Suspense } from "react"
import useUserLocation from "../components/hooks/useLocation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

const FiltersPopup = React.lazy(() => import("../popups/FiltersPopup"));



export const Sortings = {
    RECENT_FIRST: "recent_first",
    OLDER_FIRST: "old_first",
}

export const CarConditions = {
    ALL: {
        id: "all",
        label: "All"
    },
    NEW: {
        id: "new",
        label: "New"
    },
    OPEN_BOX: {
        id: "open_box",
        label: "Open Box",
    },
    RECONDITIONED: {
        id: "reconditioned",
        label: "Reconditioned"
    }
}

export const CarConditionsList = [
    CarConditions.ALL,
    CarConditions.NEW,
    CarConditions.OPEN_BOX,
    CarConditions.RECONDITIONED,
]


const DEFAULT_FILTERS = {
    category: -1,
    query: "",
    sortby: Sortings.RECENT_FIRST,
    price: {
        min: "",
        max: ""
    },
    condition: CarConditions.ALL,
    year: "",
    make: "",
    model: "",
    page: 1
}


export function joinStrs(...strs) {
    return strs.filter(Boolean).join("");
}


export default function SearchPage() {
    const authUser = useAuthUser();
    const { location, _ } = useUserLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        ...DEFAULT_FILTERS,
        query: searchParams.get("query") ?? "",
        category: isNaN(parseInt(searchParams.get("category"))) ? -1 : parseInt(searchParams.get("category")),
    });
    const [formattedUrl, setFormattedUrl] = useState(null)
    const { cars, isLoading, error } = useCarsFetcher(authUser.accessToken, formattedUrl);
    const { data: categories } = useFiltersFetcher(authUser.accessToken, apiConfig.endpoints.getCategories, []);

    const onSortingChange = (e) => {
        setFilters({
            ...filters,
            sortby: e.target.value
        })
    }


    const onMinPriceChange = (e) => {
        setFilters({
            ...filters,
            price: {
                min: e.target.value,
                max: filters.price.max
            }
        })
    }
    const onMaxPriceChange = (e) => {
        setFilters({
            ...filters,
            price: {
                max: e.target.value,
                min: filters.price.min
            }
        })
    }

    const onCategoryChange = (ctgry) => {
        setSearchParams({
            query: filters.query,
            category: ctgry
        })
        setFilters({
            ...filters,
            category: ctgry
        })
    }


    const onConditionChange = (condition) => {
        setFilters({
            ...filters,
            condition: condition,
        })
    }


    const onClearAllFilters = () => {
        setSearchParams({});
        setFilters({
            ...DEFAULT_FILTERS,
            query: "",
            category: -1,
        })
    }


    useEffect(() => {
        setFormattedUrl(joinStrs(
            apiConfig.basePath + apiConfig.endpoints.getAllCars,
            `?type=BUY&sort=${filters.sortby}&page=${filters.page}`,
            `&search_term=${filters.query}`,
            `&min_price=${filters.price.min}`,
            `&max_price=${filters.price.max}`,
            `&condition=${filters.condition.label}`,
            filters.category !== -1 && `&category_id=${filters.category}`,
            `&year=${filters.year}`,
            `&make=${filters.make}`,
            `&model=${filters.model}`,
            location !== null && location?.latitude !== undefined && `&latitude=${location.latitude}`,
            location !== null && location?.longitude !== undefined && `&longitude=${location.longitude}`,
        ));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [filters, location])



    return (
        <MainLayout secureRoute={false}>
            <div className={"py-10" + MAIN_HORIZONTAL_PADDING}>
                <div className="flex items-start gap-0 md:gap-5">
                    <div className="min-w-[300px] rounded border px-4 py-5 hidden lg:block">
                        <ul className="border-b pb-5 space-y-2 border-gray-100">
                            {
                                categories &&
                                [{ id: -1, title: "All" }, ...categories].map((ctgry) => (
                                    <li key={ctgry.id}>
                                        <button type="button" onClick={() => onCategoryChange(ctgry.id)} className={cn(
                                            "text-base text-gray-800 transition-all hover:font-semibold",
                                            filters.category === ctgry.id ? "font-semibold" : "font-normal"
                                        )}>
                                            {ctgry.id === -1 ? "All Categories" : ctgry.title}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="py-3">
                            <h4 className="text-lg font-semibold">Filters</h4>
                            <FiltersSectionEl
                                accessToken={authUser.accessToken}
                                filters={filters} onMaxPriceChange={onMaxPriceChange}
                                setFilters={setFilters}
                                onMinPriceChange={onMinPriceChange} />
                            <div className="pt-7">
                                <h5 className="text-base font-medium">Condition</h5>
                                <ul className="mt-2 space-y-2">
                                    {
                                        CarConditionsList.map(condition => (
                                            <li key={condition.id} className="flex items-center">
                                                <input type="checkbox" checked={filters.condition.id === condition.id} onChange={(e) => onConditionChange(condition)} className="text-primary border-gray-400 border-2 !ring-transparent rounded" id={condition.id} />
                                                <label htmlFor={condition.id} className="text-base text-gray-800 font-normal ms-4">
                                                    {condition.label}
                                                </label>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <div className="w-full mb-5">
                            <div className="flex items-center justify-between gap-5">
                                <h3 className="text-5xl lg:text-4xl xl:text-5xl font-bold text-gray-900 py-3">
                                    {
                                        filters.query !== "" ?
                                            <span>
                                                Search results for '{filters.query}'
                                            </span>
                                            :
                                            <span className="capitalize">
                                                {filters.category === -1 ? "All Categories" : categories?.find((ctgry) => ctgry.id === filters.category)?.title}
                                            </span>
                                    }
                                </h3>
                                <div className="hidden lg:block text-base text-gray-900 font-normal">
                                    <label htmlFor="sortby" className="font-medium">Sort by: </label>
                                    <select name="sort" id="sortby" value={filters.sortby} onChange={onSortingChange} className="no-decor">
                                        <option value={Sortings.RECENT_FIRST}>Recent first</option>
                                        <option value={Sortings.OLDER_FIRST}>Older first</option>
                                    </select>
                                </div>
                            </div>
                            {/* <div className="flex items-center flex-wrap gap-5 mt-4 mb-5">
                                <a href="#" className="text-sm text-gray-900 font-normal py-2 px-4 rounded-full border border-gray-200 transition-all hover:bg-gray-100">
                                    Sub Category 1
                                </a>
                                <a href="#" className="text-sm text-gray-900 font-normal py-2 px-4 rounded-full border border-gray-200 transition-all hover:bg-gray-100">
                                    Sub Category 2
                                </a>
                                <a href="#" className="text-sm text-gray-900 font-normal py-2 px-4 rounded-full border border-gray-200 transition-all hover:bg-gray-100">
                                    Sub Category 3
                                </a>
                            </div> */}
                            <div className="flex lg:hidden items-center gap-4 flex-wrap">
                                <Suspense>
                                    <FiltersPopup
                                        filters={filters} onMaxPriceChange={onMaxPriceChange}
                                        onMinPriceChange={onMinPriceChange}
                                        onConditionChange={onConditionChange}
                                        accessToken={authUser.accessToken}
                                        setFilters={setFilters}
                                        onClearFilters={onClearAllFilters} />
                                </Suspense>
                                <div className="text-base text-gray-900 font-normal rounded-full bg-gray-100 transition-all hover:bg-gray-200 pl-5 pr-2">
                                    <label htmlFor="sortby" className="font-medium">Sort by: </label>
                                    <select name="sort" value={filters.sortby} onChange={onSortingChange} id="sortby" className="no-decor bg-transparent">
                                        <option value={Sortings.RECENT_FIRST}>Recent first</option>
                                        <option value={Sortings.OLDER_FIRST}>Older first</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between w-full min-h-[700px]">

                            {
                                isLoading || error ?
                                    <LoaderEl containerClassName="w-full h-[400px]" />
                                    :
                                    cars?.length > 0 ?
                                        <div>
                                            <div className="flex justify-end w-full mb-2">
                                                <button type="button" onClick={onClearAllFilters} className="text-primary outline-none transition-all hover:underline">
                                                    Clear All Filters
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5 md:gap-8">
                                                {
                                                    cars &&
                                                    cars.map((car) => (
                                                        <CarGridItem key={car.id} car={car} />
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        :
                                        <div className="flex flex-col gap-4 items-center justify-center w-full h-96">
                                            <h4 className="text-xl font-medium text-gray-800 text-center">
                                                No cars found. Try changing filters.
                                            </h4>
                                            <button type="button" onClick={onClearAllFilters} className="text-primary outline-none transition-all hover:underline">
                                                Clear All Filters
                                            </button>
                                        </div>
                            }
                            <Pagination
                                activePage={filters.page}
                                setActivePage={(page) => setFilters({
                                    ...filters,
                                    page: page
                                })} />
                        </div>

                    </div>
                </div>
            </div >
        </MainLayout>
    )
}



function Pagination({ activePage, setActivePage }) {
    let visiblePages = [activePage, activePage + 1];
    if (activePage > 1) {
        visiblePages = [activePage - 1, ...visiblePages]
    }
    else {
        visiblePages = [...visiblePages, activePage + 2]
    }

    const onPageChange = (page) => {
        let newPage = page;
        if (newPage <= 0) newPage = 1
        setActivePage(newPage);
    }

    return (
        <div className="w-full py-[10px] px-5 flex items-center justify-center">
            <div className="flex items-center gap-2">
                <button type="button"
                    onClick={() => onPageChange(activePage - 1)}
                    className="outline-none bg-gray-800/20 rounded text-xs font-normal text-gray-800 p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                {
                    visiblePages.map((page) => (
                        <button key={page} type="button"
                            onClick={() => onPageChange(page)}
                            className={cn(
                                "outline-none rounded text-xs font-normal p-2 w-8 h-8 aspect-square",
                                activePage === page ? "bg-primary text-white" : "bg-gray-800/20 text-gray-800"
                            )}>
                            {page}
                        </button>
                    ))
                }
                <button type="button"
                    onClick={() => onPageChange(activePage + 1)}
                    className="outline-none bg-gray-800/20 rounded text-xs font-normal text-gray-800 p-2 w-8 h-8 aspect-square">
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    )
}




export function FiltersSectionEl({
    filters, accessToken, onMinPriceChange,
    onMaxPriceChange, setFilters
}) {
    const { data: years } = useFiltersFetcher(accessToken, apiConfig.endpoints.getYears, [], sortYears);
    const { data: makes } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCarMakes + `?year=${filters.year}`);
    const { data: models } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCarModels + `?year=${filters.year}&make=${filters.make}`);

    const [selectedYear, setSelectedYear] = useState(filters.year);
    const [selectedMake, setSelectedMake] = useState(filters.make);
    const [selectedModel, setSelectedModel] = useState(filters.model);


    useEffect(() => {
        setFilters({
            ...filters,
            year: selectedYear,
            make: selectedMake,
            model: selectedModel,
        })
    }, [selectedYear, selectedMake, selectedModel])


    return (
        <div className="border-b py-6 space-y-4">
            <div>
                <h5 className="text-sm font-semibold text-gray-800">Year</h5>
                <div className="flex items-center gap-3 mt-2">
                    <select value={selectedYear} disabled={!years || years.length <= 0}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md">
                        <option value="">Select Year</option>
                        {
                            years &&
                            years?.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div>
                <h5 className="text-sm font-semibold text-gray-800">Make</h5>
                <div className="flex items-center gap-3 mt-2">
                    <select value={selectedMake} disabled={!makes || makes.length <= 0}
                        onChange={(e) => setSelectedMake(e.target.value)}
                        className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md">
                        <option value="">Select Make</option>
                        {
                            makes &&
                            makes?.map((makeObj) => (
                                <option key={makeObj.make} value={makeObj.make}>{makeObj.make}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div>
                <h5 className="text-sm font-semibold text-gray-800">Model</h5>
                <div className="flex items-center gap-3 mt-2">
                    <select value={selectedModel} disabled={!models || models.length <= 0}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md">
                        <option value="">Select Model</option>
                        {
                            models &&
                            models?.map((modelObj) => (
                                <option key={modelObj.model} value={modelObj.model}>{modelObj.model}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div>
                <h5 className="text-sm font-semibold text-gray-800">Price Range</h5>
                <div className="flex items-center gap-3 mt-2">
                    <input type="number" placeholder="Min" value={filters.price.min} onChange={onMinPriceChange} className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md" />
                    <p className="text-sm font-normal text-gray-800">to</p>
                    <input type="number" placeholder="Max" value={filters.price.max} onChange={onMaxPriceChange} className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md" />
                </div>
            </div>
        </div>
    )
}