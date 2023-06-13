import axios from "axios"
import useSWR from 'swr'
import { apiConfig } from "../../config/api";




const carsFetcher = async (url, accessToken) => {
    // if (accessToken === undefined || accessToken === null || accessToken === "") return []
    const res = await axios.get(url, {
        headers: {
            Authorization: "Bearer " + accessToken
        }
    });
    return res.data.success ? res.data.buyerObj : [];
}


export default function useCarsFetcher(accessToken, carsUrl = null) {
    const { data, error, isLoading } = useSWR(
        carsUrl !== null ? carsUrl : `${apiConfig.basePath}${apiConfig.endpoints.getAllCars}?type=BUY&sort=recent_first&page=1`,
        async (url) => await carsFetcher(url, accessToken)
    )

    return {
        cars: data?.filter((car) => car.is_sold_out === false),
        error, isLoading
    }
}


