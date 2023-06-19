import axios from "axios"
import useSWR from 'swr'
import { apiConfig } from "../../config/api";



export default function useCarSearchUsers(accessToken, carId, defaultValue = []) {
    const { data, error, isLoading } = useSWR(apiConfig.basePath + apiConfig.endpoints.getCarSearchUsers + `?car_id=${carId}`,
        async (url) => {
            if (accessToken === undefined || accessToken === null || accessToken === "") return defaultValue
            const res = await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            });
            return res.data.success ? res.data.data : defaultValue;
        }
    )

    return {
        data, isLoading, error
    }
}


