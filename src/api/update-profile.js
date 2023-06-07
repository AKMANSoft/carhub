import axios from "axios";
import { apiConfig } from "../config/api";



export default async function doUpdateProfile({
    name, email, phoneNumber,
    profileImage, countryCode,
    accessToken, bio
}) {
    const data = new FormData();
    data.set("first_name", name.firstName);
    data.set("last_name", name.lastName);
    data.set("email", email);
    data.set("country_code", countryCode);
    data.set("mobile", phoneNumber);
    if (bio !== undefined && bio !== null && bio !== "") {
        data.set("description", bio);
    }
    if (profileImage !== undefined && profileImage !== null) {
        data.set("image", profileImage)
    }
    console.log(accessToken)

    try {
        let response = await axios.post(
            apiConfig.basePath + apiConfig.endpoints.updateProfile,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }
        )
        console.log(response.data)
        return response.data;
    } catch (error) {
        return null;
    }
}
