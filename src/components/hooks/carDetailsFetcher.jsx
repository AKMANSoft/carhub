import axios from "axios";
import { apiConfig } from "../../config/api";
import useSWR from 'swr';
import { defaultCarDetail } from "../../data/default-car-data";





export default function useCarDetails({ accessToken, carId }) {
    const { data, error, isLoading } = useSWR(apiConfig.basePath + apiConfig.endpoints.getCarDetails,
        async (url) => {
            if (accessToken === undefined || accessToken === null || accessToken === "") return null
            try {
                const res = await axios.post(url,
                    { car_id: carId },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + accessToken
                        }
                    }
                );
                console.log(res)
                return res.data.success ? res.data.data : null;
            } catch (error) {
                console.log(error)
            }
            return null
        }
    )

    return {
        data, error, isLoading
    }
}


