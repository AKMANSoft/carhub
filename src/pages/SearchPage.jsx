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
import useFilterLocation from "../components/hooks/useLocation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { handleTranslation } from "../lib/i18n"

const FiltersPopup = React.lazy(() => import("../popups/FiltersPopup"));



export const Sortings = {
    RECENT_FIRST: {
        value: "recent_first",
        label: "Recent First"
    },
    CLOSEST_FIRST: {
        value: "closest_first",
        label: "Closest First"
    },
    PRICE_LOW_TO_HIGH: {
        value: "price_lh",
        label: "Price: Low to High"
    },
    PRICE_HIGH_TO_LOW: {
        value: "price_hl",
        label: "Price: High to Low"
    },
    MODEL_NEWEST: {
        value: "model_newest",
        label: "Model: Newest"
    },
    MODEL_LOWEST: {
        value: "mileage_lowest",
        label: "Model: Lowest"
    },
}

export const SortingsList = [
    Sortings.RECENT_FIRST,
    Sortings.CLOSEST_FIRST,
    Sortings.PRICE_LOW_TO_HIGH,
    Sortings.PRICE_HIGH_TO_LOW,
    Sortings.MODEL_NEWEST,
    Sortings.MODEL_LOWEST,
]


export const CarConditions = {
    ALL: {
        id: "all",
        label: "all"
    },
    NEW: {
        id: "New",
        label: "new"
    },
    EXCELENT: {
        id: "Excelent",
        label: "excelent",
    },
    VERY_GOOD: {
        id: "Very Good",
        label: "very_good",
    },
    GOOD: {
        id: "Good",
        label: "good",
    },
    FAIR: {
        id: "Fair",
        label: "fair"
    },
    FOR_PARTS: {
        id: "For Parts",
        label: "for_parts"
    }
}

export const CarConditionsList = [
    CarConditions.ALL,
    CarConditions.NEW,
    CarConditions.EXCELENT,
    CarConditions.VERY_GOOD,
    CarConditions.GOOD,
    CarConditions.FAIR,
    CarConditions.FOR_PARTS,
]


export const MAX_DISTANCE = 2000;

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
    vehicleTrim: "",
    mileage: "",
    page: 1,
    distance: MAX_DISTANCE,
}


export function joinStrs(...strs) {
    return strs.filter(Boolean).join("");
}


export default function SearchPage() {
    const { trans, apiTrans } = handleTranslation()
    const authUser = useAuthUser();
    const location = useFilterLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        ...DEFAULT_FILTERS,
        query: searchParams.get("query") ?? "",
        category: isNaN(parseInt(searchParams.get("category"))) ? -1 : parseInt(searchParams.get("category")),
        distance: location.filterDistance
    });
    const [formattedUrl, setFormattedUrl] = useState(null)
    const { cars, isLoading, error } = useCarsFetcher(authUser.accessToken, formattedUrl);
    const { data: categories } = useFiltersFetcher(authUser.accessToken, apiConfig.endpoints.getCategories, []);

    const onSortingChange = (e) => {
        setFilters({
            ...filters,
            sortby: SortingsList.find((sort) => sort.value === e.target.value) ?? Sortings.RECENT_FIRST
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
    const onFilterDistanceChange = (distance) => {
        location.setFilterDistance(distance);
        setFilters({
            ...filters,
            distance: distance
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
            `?type=BUY&page=${filters.page}`,
            `&sort=${filters.sortby.value}`,
            `&km=${filters.distance}`,
            filters.query !== "" && `&search_term=${filters.query}`,
            filters.price.min !== "" && `&min_price=${filters.price.min}`,
            filters.price.max !== "" && `&max_price=${filters.price.max}`,
            filters.condition.id !== "all" && `&condition=${filters.condition.id}`,
            filters.category !== -1 && `&category_id=${filters.category}`,
            filters.year !== "" && `&year=${filters.year}`,
            filters.make !== "" && `&make=${filters.make}`,
            filters.model !== "" && `&model=${filters.model}`,
            filters.vehicleTrim !== "" && `&engine_size=${filters.vehicleTrim}`,
            filters.mileage !== "" && `&mileage=${filters.mileage}`,
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
                                            {ctgry.id === -1 ? trans("all_categories") : apiTrans(ctgry, "title")}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="py-3">
                            <h4 className="text-lg font-semibold">
                                {trans("filters")}
                            </h4>
                            <FiltersSectionEl
                                accessToken={authUser.accessToken}
                                filters={filters} onMaxPriceChange={onMaxPriceChange}
                                setFilters={setFilters}
                                setFilterDistance={onFilterDistanceChange}
                                onMinPriceChange={onMinPriceChange} />
                            <div className="pt-7">
                                <h5 className="text-base font-medium">
                                    {trans("condition")}
                                </h5>
                                <ul className="mt-2 space-y-2">
                                    {
                                        CarConditionsList.map(condition => (
                                            <li key={condition.id} className="flex items-center">
                                                <input type="checkbox"
                                                    checked={filters.condition.id === condition.id}
                                                    onChange={(e) => onConditionChange(condition)}
                                                    className="text-primary border-gray-400 border-2 !ring-transparent rounded"
                                                    id={condition.id} />
                                                <label htmlFor={condition.id} className="text-base text-gray-800 font-normal ms-4">
                                                    {trans(condition.label)}
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
                                                {trans("search_results_for")} '{filters.query}'
                                            </span>
                                            :
                                            <span className="capitalize">
                                                {
                                                    filters.category === -1 ?
                                                        trans("all_categories")
                                                        :
                                                        apiTrans(categories?.find((ctgry) => ctgry.id === filters.category), "title")}
                                            </span>
                                    }
                                </h3>
                                <div className="hidden lg:block text-base text-gray-900 font-normal">
                                    <label htmlFor="sortby" className="font-medium">{trans("Sort-by")}: </label>
                                    <select name="sort" id="sortby" value={filters.sortby.value} onChange={onSortingChange} className="no-decor">
                                        {
                                            SortingsList.map((sort) => (
                                                <option key={sort.value} value={sort.value}>
                                                    {trans(sort.value)}
                                                </option>
                                            ))
                                        }
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
                                    <label htmlFor="sortby" className="font-medium">{trans("Sort-by")}: </label>
                                    <select name="sort" value={filters.sortby} onChange={onSortingChange} id="sortby" className="no-decor bg-transparent">
                                        {
                                            SortingsList.map((sort) => (
                                                <option key={sort.value} value={sort.value}>
                                                    {trans(sort.value)}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        {
                            isLoading || error ?
                                <LoaderEl containerClassName="w-full h-[400px]" />
                                :
                                cars?.length > 0 ?
                                    <div className="flex flex-col justify-between w-full min-h-[700px]">
                                        <div>
                                            <div className="flex justify-end w-full mb-2">
                                                <button type="button" onClick={onClearAllFilters} className="text-primary outline-none transition-all hover:underline">
                                                    {trans("clear-all-filters")}
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
                                        <Pagination
                                            activePage={filters.page}
                                            setActivePage={(page) => setFilters({
                                                ...filters,
                                                page: page
                                            })} />
                                    </div>

                                    :
                                    <div className="flex flex-col gap-4 items-center justify-center w-full h-96">
                                        <h4 className="text-xl font-medium text-gray-800 text-center">
                                            {trans("no_cars_found")}
                                        </h4>
                                        <button type="button" onClick={onClearAllFilters} className="text-primary outline-none transition-all hover:underline">
                                            {trans("clear-all-filters")}
                                        </button>
                                    </div>
                        }


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



const mileageList = [
    {
        value: "0",
        label: "No miles"
    },
    {
        value: "25000",
        label: "Up to 25,000 miles"
    },
    {
        value: "50000",
        label: "Up to 50,000 miles"
    },
    {
        value: "75000",
        label: "Up to 75,000 miles"
    },
    {
        value: "100000",
        label: "Up to 100,000 miles"
    },
    {
        value: "125000",
        label: "Up to 125,000 miles"
    },
    {
        value: "150000",
        label: "Up to 150,000 miles"
    },
    {
        value: "170000",
        label: "Up to 170,000 miles"
    },
    {
        value: "200000",
        label: "Up to 200,000 miles"
    },
]



export function FiltersSectionEl({
    filters, accessToken, onMinPriceChange,
    onMaxPriceChange, setFilters,
    setFilterDistance
}) {
    const { trans } = handleTranslation();
    const { data: years } = useFiltersFetcher(accessToken, apiConfig.endpoints.getYears, [], sortYears);
    const { data: makes } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCarMakes + `?year=${filters.year}`);
    const { data: models } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCarModels + `?year=${filters.year}&make=${filters.make}`);
    const { data: vehicleTrims } = useFiltersFetcher(accessToken, apiConfig.endpoints.getCarTrims + `?year=${filters.year}&make=${filters.make}&model=${filters.model}`);


    const [selectedYear, setSelectedYear] = useState(filters.year);
    const [selectedMake, setSelectedMake] = useState(filters.make);
    const [selectedModel, setSelectedModel] = useState(filters.model);
    const [selectedVTrim, setSelectedVTrim] = useState(filters.vehicleTrim);
    const [selectedMileage, setSelectedMileage] = useState(filters.mileage);


    useEffect(() => {
        setFilters({
            ...filters,
            year: selectedYear,
            make: selectedMake,
            model: selectedModel,
            mileage: selectedMileage,
            vehicleTrim: selectedVTrim
        })
    }, [selectedYear, selectedMake, selectedModel, selectedVTrim, selectedMileage])



    return (
        <div className="border-b py-6 space-y-4">
            <div>
                <h5 className="text-sm font-semibold text-gray-800">
                    {trans("distance")}
                    <span className="font-normal ms-2">
                        ({filters.distance} {trans("miles")})
                    </span>
                </h5>
                <div className="flex items-center gap-3 mt-2">
                    <input type="range"
                        min={0} max={MAX_DISTANCE}
                        value={filters.distance}
                        step={20}
                        onChange={(e) => setFilterDistance(e.target.value)}
                        className="accent-primary w-full" />
                </div>
            </div>
            <div>
                <h5 className="text-sm font-semibold text-gray-800">
                    {trans("year")}
                </h5>
                <div className="flex items-center gap-3 mt-2">
                    <select value={selectedYear} disabled={!years || years.length <= 0}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md">
                        <option value="">{`${trans("select")} ${trans("year")}`}</option>
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
                <h5 className="text-sm font-semibold text-gray-800">
                    {trans("make")}
                </h5>
                <div className="flex items-center gap-3 mt-2">
                    <select value={selectedMake} disabled={!makes || makes.length <= 0}
                        onChange={(e) => setSelectedMake(e.target.value)}
                        className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md">
                        <option value="">{`${trans("select")} ${trans("make")}`}</option>
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
                <h5 className="text-sm font-semibold text-gray-800">
                    {trans("model")}
                </h5>
                <div className="flex items-center gap-3 mt-2">
                    <select value={selectedModel} disabled={!models || models.length <= 0}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md">
                        <option value="">{`${trans("select")} ${trans("model")}`}</option>
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
                <h5 className="text-sm font-semibold text-gray-800">
                    {trans("vehicle_trim")}
                </h5>
                <div className="flex items-center gap-3 mt-2">
                    <select value={selectedVTrim} disabled={!vehicleTrims || vehicleTrims.length <= 0}
                        onChange={(e) => setSelectedVTrim(e.target.value)}
                        className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md">
                        <option value="">{`${trans("select")} ${trans("vehicle_trim")}`}</option>
                        {
                            vehicleTrims &&
                            vehicleTrims?.map((vTrimObj) => (
                                <option key={vTrimObj.vehicle_trim} value={vTrimObj.vehicle_trim}>{vTrimObj.vehicle_trim}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div>
                <h5 className="text-sm font-semibold text-gray-800">
                    {trans("mileage")}
                </h5>
                <div className="flex items-center gap-3 mt-2">
                    <select value={selectedMileage}
                        onChange={(e) => setSelectedMileage(e.target.value)}
                        className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md">
                        <option value="">{`${trans("select")} ${trans("mileage")}`}</option>
                        {
                            mileageList.map((mileage) => (
                                <option key={mileage.value} value={mileage.value}>{mileage.label}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div>
                <h5 className="text-sm font-semibold text-gray-800">
                    {trans("price_range")}
                </h5>
                <div className="flex items-center gap-3 mt-2">
                    <input type="number" placeholder={trans("min")} value={filters.price.min} onChange={onMinPriceChange} className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md" />
                    <p className="text-sm font-normal text-gray-800">
                        {trans("to")}
                    </p>
                    <input type="number" placeholder={trans("max")} value={filters.price.max} onChange={onMaxPriceChange} className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-600 border border-gray-200 py-1.5 px-3 rounded-md" />
                </div>
            </div>

        </div>
    )
}