import axios, {AxiosResponse} from 'axios'
import {InitialCardPacksStateType} from "../../features/feature2-table/cards-table/cardsTable-reduser";


const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0', /*https://neko-back.herokuapp.com/2.0*/
    withCredentials: true,
})

export const authApi = {
    loginUser(email: string, password: string) {
        return instance.post<any, AxiosResponse<ResponseLoginType>>('auth/login', {email, password, rememberMe: false})
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
