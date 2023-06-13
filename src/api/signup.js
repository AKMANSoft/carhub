import axios from "axios";
import { apiConfig } from "../config/api";



export default async function doSignUp({
    name, email, password,
    phoneNumber, profileImage,
    latitude, longitude
}) {
    console.log(latitude)
    const data = new FormData();
    data.set("first_name", name.firstName);
    data.set("last_name", name.lastName);
    data.set("email", email);
    data.set("password", password);
    data.set("device_type", "web");
    data.set("country_code", "+1");
    data.set("mobile", phoneNumber);
    data.set("latitude", latitude);
    data.set("longitude", longitude);
    if (profileImage !== undefined && profileImage !== null) {
        data.set("image", profileImage)
    }

    try {
        let response = await axios.post(
            apiConfig.basePath + apiConfig.endpoints.signup,
            data,
            {
                headers: {
                    // "Content-Type": "multipart/form-data",
                    Accept: "application/json"
                }
            }
        )
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        return null;
    }
}
