import { apiConfig } from "../config/api";
import $ from "jquery";




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
    data.set("color", carDetails.colors.interior.hex);
    data.set("exterior_color", carDetails.colors.exterior.hex);
    data.set("features", carDetails.features.join(","));
    data.set("amount", carDetails.postDetails.price);
    data.set("find_me_buyer", carDetails.postDetails.findMeBuyer ? "1" : "0");
    data.set("description", carDetails.postDetails.description);
    data.set("car_address", `${carDetails.carLocation.city},${carDetails.carLocation.state},${carDetails.carLocation.country}`);
    data.set("city", carDetails.carLocation.city);
    data.set("state", carDetails.carLocation.state);
    data.set("lat", carDetails.carLocation.latitude);
    data.set("lng", carDetails.carLocation.longitude);
    data.set("zip_code", carDetails.carLocation.zipCode);
    carDetails.images.forEach((img) => {
        data.append("file[]", img.blob);
    })


    try {
        var settings = {
            "url": apiConfig.basePath + apiConfig.endpoints.postCar,
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + accessToken
            },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": data
        };
        const response = await $.ajax(settings).promise()
        const resData = JSON.parse(response);
        // let response = await axios.post(
        //     apiConfig.basePath + apiConfig.endpoints.postCar,
        //     data,
        //     {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //             Accept: "application/json",
        //             "Authorization": "Bearer " + accessToken
        //         },
        //     }
        // )
        return resData;
    } catch (error) {
        console.log(error);
        return null;
    }
}
