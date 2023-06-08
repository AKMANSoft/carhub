import React from "react";
import { useSearchParams } from "react-router-dom";



export default function useSearchCategory() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [category, setCtgry] = React.useState(searchParams.get("category") ?? "all");

    const setCategory = (ctgry) => {
        setCtgry(ctgry);
        setSearchParams({
            ...searchParams,
            category: ctgry,
        })
    }

    return { category, setCategory }
}