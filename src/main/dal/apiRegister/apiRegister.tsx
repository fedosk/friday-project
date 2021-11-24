import {apiServices} from "../apiServices/apiServices";
import {AxiosResponse} from "axios";

export const registerAPI = {
    registerUser(email: string, password: string) {
        return apiServices.post<AxiosResponse<string>>(`auth/register`, {email, password})
    }
}