import {AxiosResponse} from 'axios'
import {instance} from "./api-instance";

export const authApi = {
    loginUser(email: string, password: string, rememberMe: boolean) {
        return instance.post<any, AxiosResponse<ResponseLoginType>>('auth/login', {email, password, rememberMe})
    },
    authUser() {
        return instance.post<any, AxiosResponse<ResponseLoginType>>('auth/me')
    },
    logoutUser() {
        return instance.delete<any, AxiosResponse<ResponseLoginType>>('auth/me')
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
    error?: string
}
