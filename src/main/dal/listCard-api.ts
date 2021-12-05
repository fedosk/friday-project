import {AxiosResponse} from "axios";
import {instance} from "./api-instance";
import {
    CardsType,
    InitialCardListStateType
} from "../../features/feature2-table/cards-table/list-card/listCard-reduser";


export const listCardApi = {
    getListCard(_id: string) {
        return instance.get<any, AxiosResponse<InitialCardListStateType>>(`/cards/card?cardsPack_id=${_id}&pageCount=1000`)
    },
    createCard(cardsPack_id: string, question: string, grade: number, answer: string) {
        return instance.post<any, AxiosResponse<NewCardType>>('/cards/card', {card: {cardsPack_id, question, grade, answer}})
    },
    deleteCard(id: string) {
        return instance.delete<any, AxiosResponse<DeletedCardType>>(`/cards/card?&id=${id}`)
    },
    updateCard(_id: string, question: string, answerImg: string, answer: string) {
        return instance.put<any, AxiosResponse<UpdatedCardType>>(`/cards/card`, {card: {_id, question, answerImg, answer}})
    }
}

export type NewCardType = {
    newCard: CardsType
    token: string
    tokenDeathTime: number
}

export type DeletedCardType = {
    deletedCard: CardsType
    token: string
    tokenDeathTime: number
}

export type UpdatedCardType = {
    updatedCard: CardsType
    token: string
    tokenDeathTime: number
}

