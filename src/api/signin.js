import axios from "axios";
import { apiConfig } from "../config/api";



export default async function doSignIn({ email, password }) {
    try {
        let response = await axios.post(
            apiConfig.basePath + apiConfig.endpoints.signin,
            {
                email: email,
                password: password,
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
