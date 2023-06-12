import axios from "axios";
import { apiConfig } from "../config/api";




export default async function doPostCar(carDetails, accessToken) {
    const data = new FormData();
    data.set("year", carDetails.details.year);
    data.set("make", carDetails.details.make);
    data.set("model", carDetails.details.model);
    data.set("category_id", carDetails.details.category);
    data.set("condition", carDetails.details.condition);
    data.set("engine_size", carDetails.details.vehicleTrim);
    data.set("mileage", carDetails.details.mileage);
    data.set("car_fuel_type", carDetails.details.fuelType);
    data.set("title_status", carDetails.details.titleStatus);
    data.set("title_status", carDetails.details.titleStatus);
    data.set("color", carDetails.colors.interior);
    data.set("exterior_color", carDetails.colors.exterior);
    data.set("features", carDetails.features.join(","));
    data.set("amount", carDetails.postDetails.price);
    data.set("find_me_buyer", carDetails.postDetails.findMeBuyer ? 1 : 0);
    data.set("description", carDetails.postDetails.description);
    data.set("car_address", `${carDetails.carrLocation.city},${carDetails.carrLocation.state},${carDetails.carrLocation.country}`);
    data.set("city", carDetails.carrLocation.city);
    data.set("state", carDetails.carrLocation.state);
    data.set("lat", carDetails.carrLocation.latitude);
    data.set("lng", carDetails.carrLocation.longitude);
    data.set("file[]", carDetails.images.map((img) => img.blob));


    try {
        let response = await axios.post(
            apiConfig.basePath + apiConfig.endpoints.postCar,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    "Authorization": "Bearer " + accessToken
                },
            }
        )
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}