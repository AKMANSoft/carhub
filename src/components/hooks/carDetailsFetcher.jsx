import axios from "axios";
import { apiConfig } from "../../config/api";
import useSWR from 'swr';
import $ from "jquery";





export default function useCarDetails(accessToken, carId) {
    const { data, error, isLoading } = useSWR(apiConfig.basePath + apiConfig.endpoints.getCarDetails,
        async (url) => {
            try {
                const formData = new FormData();
                formData.set("car_id", carId);
                var settings = {
                    "url": "https://pro.gocarhub.app/api/car-details",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": "Bearer " + accessToken
                    },
                    "processData": false,
                    "mimeType": "multipart/form-data",
                    "contentType": false,
                    "data": formData
                };
                const response = await $.ajax(settings).promise()
                const data = JSON.parse(response);
                return data.success ? data.data : null;
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


