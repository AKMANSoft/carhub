import axios from "axios";
import { apiConfig } from "../config/api";




export default async function doUpdateCar(carDetails, carId, accessToken) {
    const data = new FormData();
    data.set("car_id", carId);
    data.set("year", carDetails.details.year);
    data.set("make", carDetails.details.make);
    data.set("model", carDetails.details.model);
    data.set("category_id", carDetails.details.category);
    data.set("condition", carDetails.details.condition);
    data.set("engine_size", carDetails.details.vehicleTrim);
    data.set("mileage", carDetails.details.mileage);
    data.set("car_fuel_type", carDetails.details.fuelType);
    data.set("title_status", carDetails.details.titleStatus);
    data.set("color", carDetails.colors.interior);
    data.set("exterior_color", carDetails.colors.exterior);
    data.set("features", carDetails.features.join(","));
    data.set("amount", carDetails.postDetails.price);
    data.set("find_me_buyer", carDetails.postDetails.findMeBuyer ? 1 : 0);
    data.set("description", carDetails.postDetails.description);
    data.set("car_address", `${carDetails.carLocation.address}`);
    data.set("city", carDetails.carLocation.city);
    data.set("state", carDetails.carLocation.state);
    data.set("lat", carDetails.carLocation.latitude);
    data.set("lng", carDetails.carLocation.longitude);
    data.set("zip_code", carDetails.carLocation.zipCode);
    carDetails.images.filter((img) => img.blob !== undefined && img.blob !== null).forEach((img) => {
        data.append("file[]", img.blob);
    })


    try {
        const res = await axios.post(
            apiConfig.basePath + apiConfig.endpoints.updateCar,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + accessToken
                }
            }
        )
        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
