import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {InitialCardPacksStateType} from "../../features/feature2-table/cards-table/cardsTable-reduser";


const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

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
    getCards() {
        return instance.get<any, AxiosResponse<InitialCardPacksStateType>>('/cards/pack?pageCount=1000&page=1&sortPacks=0updated')
    },
    createCardPack(name: string) {
        return instance.post<any, AxiosResponse<any>>('/cards/pack', {cardsPack: {name}})
    },
    deleteCardPack(id: string) {
        return instance.delete<any, AxiosResponse<any>>(`/cards/pack?id=${id}`)
    },
    updateCardPack(id: string) {
        return instance.put<any, AxiosResponse<any>>(`/cards/pack`, {cardsPack: {_id: id, name: "my updated pack", deckCover: ""}})
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
