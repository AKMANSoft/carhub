import axios from "axios"
import useSWR from 'swr'
import { apiConfig } from "../../config/api";



export default function useMessagesFetcher(accessToken, { userId, carId }, defaultValue = []) {
    const { data, error, isLoading } = useSWR(apiConfig.basePath + apiConfig.endpoints.getChatMessages,
        async (url) => {
            if (accessToken === undefined || accessToken === null || accessToken === "") return defaultValue
            const res = await axios.post(
                url,
                {
                    user_id: userId,
                    car_id: carId
                },
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                        "Content-Type": "multipart/form-data"
                    }
                });
            return res.data.success ? res.data.data : defaultValue;
        }
    )

    return {
        data, isLoading, error
    }
}


