import {Dispatch} from "react";
import {cardPacksApi} from "../../../main/dal/cardPacks-api";

const GET_CARD_PACKS = 'table/GET_CARDS'
const SET_CARD_PACK = 'table/SET_CARD_PACK'
const REMOVE_CARD_PACK = 'table/REMOVE_CARD_PACK'
const UPDATE_CARD_PACK = 'table/UPDATE_CARD_PACK'
const CHANGE_FILTER = 'table/CHANGE_FILTER'
const CHANGE_SORTING = 'table/CHANGE_SORTING'
const CHANGE_SORT_CONFIG = 'table/CHANGE_SORT_CONFIG'

export type CardPackType = {
    _id: string
    user_id: string
    user_name: string
    private: false
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string,
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}

export type FilteringType = 'my' | 'all'
export type SortingType = 'name' | 'cardsCount' | 'updated' | 'user_name' | null
export type SortConfigType = 'ascending' | 'descending'

export type InitialCardPacksStateType = {
    cardPacks: CardPackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
    filteredBy: FilteringType
    sortedBy: SortingType
    sortConfig: SortConfigType
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
    filteredBy: "all",
    sortedBy: null,
    sortConfig: 'ascending'
}

export const cardsTableReducer = (state: InitialCardPacksStateType = initialState, action: ActionsType): InitialCardPacksStateType => {
    switch (action.type) {
        case GET_CARD_PACKS: {
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
        case SET_CARD_PACK: {
            return {...state, cardPacks: [action.newCardPack, ...state.cardPacks],}
        }
        case REMOVE_CARD_PACK: {
            return {...state, cardPacks: [...state.cardPacks.filter(p => p._id !== action.deletedPackId)]}
        }
        case UPDATE_CARD_PACK: {
            return {
                ...state, cardPacks: [...state.cardPacks.map(p => p._id === action.updatedPack._id
                    ? action.updatedPack
                    : p)]
            }
        }
        case CHANGE_FILTER: {
            return {...state, filteredBy: action.filteredBy}
        }
        case CHANGE_SORTING: {
            return {...state, sortedBy: action.sortedBy}
        }
        case CHANGE_SORT_CONFIG: {
            return {...state, sortConfig: action.sortConfig}
        }
        default:
            return state
    }
}

export const takeCardPacksRequest = (cardPacksData: InitialCardPacksStateType) => ({
    type: GET_CARD_PACKS,
    cardPacksData
} as const)
export const setNewCardPack = (newCardPack: any) => ({type: SET_CARD_PACK, newCardPack} as const)
export const deleteNewCardPack = (deletedPackId: string) => ({type: REMOVE_CARD_PACK, deletedPackId} as const)
export const updateCardPack = (updatedPack: any) => ({type: UPDATE_CARD_PACK, updatedPack} as const)
export const changeFiltering = (filteredBy: FilteringType) => ({type: CHANGE_FILTER, filteredBy} as const)
export const changeSorting = (sortedBy: SortingType) => ({type: CHANGE_SORTING, sortedBy} as const)
export const changeSortConfig = (sortConfig: SortConfigType) => ({type: CHANGE_SORT_CONFIG, sortConfig} as const)

export const getCardPacksTC = () => (dispatch: Dispatch<ActionsType>) => {
    cardPacksApi.getCardPacks()
        .then(res => {
            dispatch(takeCardPacksRequest(res.data))
        })
        .catch(error => {
                console.log(error)
            }
        )
}

export const setNewCardPackTC = (name: string) => (dispatch: Dispatch<ActionsType>) => {
    cardPacksApi.createCardPack(name)
        .then(res => {
            dispatch(setNewCardPack(res.data.newCardsPack))
        })
        .catch(error => {
                console.log(error)
            }
        )
}

export const deleteCardPackTC = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    cardPacksApi.deleteCardPack(id)
        .then(res => {
            dispatch(deleteNewCardPack(res.data.deletedCardsPack._id))
        })
        .catch(error => {
                console.log(error)
            }
        )
}

export const updateCardPackTC = (id: string, name: string) => (dispatch: Dispatch<ActionsType>) => {
    cardPacksApi.updateCardPack(id, name)
        .then(res => {
            dispatch(updateCardPack(res.data.updatedCardsPack))
        })
        .catch(error => {
                console.log(error)
            }
        )
}

export type ActionsType = ReturnType<typeof takeCardPacksRequest>
    | ReturnType<typeof setNewCardPack>
    | ReturnType<typeof deleteNewCardPack>
    | ReturnType<typeof updateCardPack>
    | ReturnType<typeof changeFiltering>
    | ReturnType<typeof changeSorting>
    | ReturnType<typeof changeSortConfig>
