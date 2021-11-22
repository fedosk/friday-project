import axios, { AxiosResponse } from 'axios'

/*https://neko-back.herokuapp.com/2.0*/

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const authApi = {
    loginUser(email: string, password: string) {
        return instance.post<any, AxiosResponse<any>>('auth/login', {email, password, rememberMe: false})
    }
}

export type ResponseType = {
    avatar?: string
    created: Date
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: Date
    verified: boolean;
    _id: string
    error?: string
}