

import axios from "axios";
import { apiConfig } from "../config/api";



export default async function doSocialSignIn({
    firstName, lastName, email, googleId,
}) {
    const data = new FormData();
    data.set("first_name", firstName);
    data.set("last_name", lastName);
    data.set("email", email);
    data.set("google_id", googleId);
    data.set("device_type", "web");
    data.set("type", "2");

    try {
        let response = await axios.post(
            apiConfig.basePath + apiConfig.endpoints.socialSignin,
            data,
            {
                headers: {
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
