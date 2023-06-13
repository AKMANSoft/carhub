import axios from "axios"
import useSWR from 'swr'
import { apiConfig } from "../../config/api";



export const sortYears = (years = []) => {
    return years.map((yObj) => yObj.year).reverse();
}


export default function useFiltersFetcher(accessToken, fetchUrl, defaultValue = [], sortFunc = null) {
    const { data, error, isLoading } = useSWR(apiConfig.basePath + fetchUrl,
        async (url) => {
            // if (accessToken === undefined || accessToken === null || accessToken === "") return defaultValue
            const res = await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            });
            return res.data.success ? res.data.data : defaultValue;
        }
    )

    return {
        data: (sortFunc !== null && data !== undefined && data !== null ? sortFunc(data) : data), isLoading, error
    }
}


