import axios from "axios";
import { apiConfig } from "../config/api";




export default async function doForgotPassword({ email }) {
    try {
        let response = await axios.post(
            apiConfig.basePath + apiConfig.endpoints.forgotPassword,
            {
                email: email,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }
        )
        console.log(response.data)
        return response.data;
    } catch (error) {
        return null;
    }
}