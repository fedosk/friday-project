import {apiServices} from "../apiServices/apiServices";

export const authApi = {
    authMe() {
        return apiServices.post<ResponseAuthType>('auth/me', {})
    },
}

type ResponseAuthType = {
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
