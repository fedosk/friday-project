import {Dispatch} from "react";
import {authApi} from "../../../main/dal/auth-api";

const GET_CARDS = 'table/GET_CARDS'

export type CardPackType = {
    "_id": string
    "user_id": string
    "user_name": string
    "private": false
    "name": string
    "path": string
    "grade": number
    "shots": number
    "deckCover": string
    "cardsCount": number
    "type": string,
    "rating": number
    "created": string
    "updated": string
    "more_id": string
    "__v": number
}

export type InitialCardPacksStateType = {
    cardPacks: CardPackType[]
    "page": number
    "pageCount": number
    "cardPacksTotalCount": number
    "minCardsCount": number
    "maxCardsCount": number
    token: string
    tokenDeathTime: number
}

const initialState: InitialCardPacksStateType = {
    cardPacks: [],
    page: 0,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: "",
    tokenDeathTime: 0,
}

export const cardsTableReducer = (state: InitialCardPacksStateType = initialState, action: ActionsType): InitialCardPacksStateType => {
    switch (action.type) {
        case GET_CARDS: {
            return {
                ...state,
                cardPacks: [...action.cardPacksData.cardPacks],
                page: action.cardPacksData.page,
                pageCount: action.cardPacksData.pageCount,
                cardPacksTotalCount: action.cardPacksData.cardPacksTotalCount,
                minCardsCount: action.cardPacksData.minCardsCount,
                maxCardsCount: action.cardPacksData.maxCardsCount,
                token: action.cardPacksData.token,
                tokenDeathTime: action.cardPacksData.tokenDeathTime,
            }
        }
        default:
            return state
    }
}

export const takeCardPacksRequest = (cardPacksData: InitialCardPacksStateType) => ({
    type: GET_CARDS,
    cardPacksData
} as const)

export const getCardPacksTC = () => (dispatch: Dispatch<ActionsType>) => {
    authApi.getCards()
        .then(res => {
            debugger
            dispatch(takeCardPacksRequest(res.data))
        })
        .catch(error => {
                console.log(error)
            }
        )
}

export type ActionsType = ReturnType<typeof takeCardPacksRequest>
