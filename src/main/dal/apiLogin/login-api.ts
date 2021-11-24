import {apiServices} from "../apiServices/apiServices";

export const loginApi = {
    loginUser(email: string, password: string) {
        return apiServices.post<ResponseLoginType>('auth/login', {email, password, rememberMe: false})
    },
}

export type ResponseLoginType = {
    avatar?: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean;
    _id: string
    error: string | undefined
}
