import axios from "axios"
import useSWR from 'swr'
import React from 'react';
import { apiConfig } from "../../config/api";




const carsFetcher = async (url, accessToken, type) => {
    const res = await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken
        }
    });
    return res.data.success ? (type === "BUY" ? res.data.buyerObj : res.data.sellerObj) : [];
}


export default function useCarsFetcher(accessToken, carsUrl = null, type = "BUY") {
    const { data, error, isLoading } = useSWR(
        carsUrl !== null ? carsUrl : `${apiConfig.basePath}${apiConfig.endpoints.getAllCars}?type=${type}&sort=recent_first&page=1`,
        async (url) => await carsFetcher(url, accessToken, type)
    )

    return {
        cars: data?.filter((car) => car.is_sold_out === false),
        error, isLoading
    }
}



// export default function useCarsFetcher(accessToken, carsUrl = null, type = "BUY") {
//     const [isLoading, setIsLoading] = React.useState(true);
//     const [cars, setCars] = React.useState(null);

//     React.useEffect(() => {
//         setIsLoading(true);
//         carsFetcher(
//             carsUrl !== null ? carsUrl : `${apiConfig.basePath}${apiConfig.endpoints.getAllCars}?type=${type}&sort=recent_first&page=1`,
//             accessToken, type
//         ).then((data) => {
//             setCars(data);
//         }).catch((error) => {
//             console.log(error)
//             setCars(null);
//         })
//             .finally(() => {
//                 setIsLoading(false);
//             })
//     }, [carsUrl])

//     return {
//         cars: cars?.filter((car) => car.is_sold_out === false),
//         isLoading
//     }
// }


