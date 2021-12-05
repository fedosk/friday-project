import {instance} from "./api-instance";
import {AxiosResponse} from "axios";
import {InitialCardPacksStateType} from "../../features/feature2-table/cards-table/cardsTable-reduser";


export const cardPacksApi = {
    getCardPacks() {
        return instance.get<any, AxiosResponse<InitialCardPacksStateType>>('/cards/pack?pageCount=1000&page=1&sortPacks=0updated')
    },
    createCardPack(name: string) {
        return instance.post<any, AxiosResponse<any>>('/cards/pack', {cardsPack: {name}})
    },
    deleteCardPack(id: string) {
        return instance.delete<any, AxiosResponse<any>>(`/cards/pack?id=${id}`)
    },
    updateCardPack(id: string) {
        return instance.put<any, AxiosResponse<any>>(`/cards/pack`, {
            cardsPack: {
                _id: id,
                name: "my updated pack",
                deckCover: ""
            }
        })
    },
}