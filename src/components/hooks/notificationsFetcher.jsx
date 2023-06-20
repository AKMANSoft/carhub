
import axios from "axios"
import useSWR from 'swr'
import { apiConfig } from "../../config/api";


export default function useNotificationsFetcher(accessToken, unreadOnly = false) {
    const { data, error, isLoading } = useSWR(apiConfig.basePath + apiConfig.endpoints.getNotifications,
        async (url) => {
            if (accessToken === undefined || accessToken === null || accessToken === "") return []
            const res = await axios.get(url, {
                headers: {
                    Authorization: "Bearer " + accessToken
                }
            });
            return res.data.success ? res.data.data : [];
        }
    )

    return {
        notifications: unreadOnly ? data?.filter((noti) => noti.is_read === "0") : data, isLoading, error
    }
}


