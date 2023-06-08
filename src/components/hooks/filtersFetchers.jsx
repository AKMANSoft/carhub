import axios from "axios"
import useSWR from 'swr'
import { apiConfig } from "../../config/api";


export default function useFiltersFetcher(accessToken, fetchUrl, defaultValue = []) {
    const { data, error, isLoading } = useSWR(apiConfig.basePath + fetchUrl,
        async (url) => {
            const res = await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            });
            return res.data.success ? res.data.data : defaultValue;
        }
    )

    return {
        data, error, isLoading
    }
}


