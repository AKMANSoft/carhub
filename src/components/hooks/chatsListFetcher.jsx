import axios from "axios"
import useSWR from 'swr'
import { apiConfig } from "../../config/api";



export default function useChatsList(accessToken, defaultValue = []) {
    const { data, error, isLoading } = useSWR(apiConfig.basePath + apiConfig.endpoints.getChatsList,
        async (url) => {
            if (accessToken === undefined || accessToken === null || accessToken === "") return defaultValue
            const res = await axios.post(
                url,
                {},
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


