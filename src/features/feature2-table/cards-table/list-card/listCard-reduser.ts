import {Dispatch} from "react";
import {listCardApi, NewCardType} from "../../../../main/dal/listCard-api";
import {changeFiltering, SortConfigType} from "../cardsTable-reduser";


const GET_CARDS = 'listCard/GET_CARDS'
const SET_NEW_CARD = 'listCard/SET_NEW_CARD'
const REMOVE_CARD = 'listCard/REMOVE_CARD'
const UPDATE_CARD = 'listCard/UPDATE_CARD'
const CHANGE_CARD_SORTING = 'listCard/CHANGE_CARD_SORTING'
const CHANGE_CARD_SORT_CONFIG = 'listCard/CHANGE_CARD_SORT_CONFIG'
const SET_CARD_PACK_ID = 'listCard/SET_CARD_PACK_ID'

export type CardsType = {
    answer: string
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string
    questionVideo: ""
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

export type InitialCardListStateType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardsSortingType = 'question' | 'answer' | 'updated' | 'grade' | null

export type InitialStateType = {
    cardList: InitialCardListStateType
    cardPackId : string
    cardsSortedBy: CardsSortingType
    cardsSortConfig: SortConfigType
}

const initialState: InitialStateType = {
    cardList: {
        cards: [],
        cardsTotalCount: 0,
        maxGrade: 0,
        minGrade: 0,
        packUserId: '',
        page: 0,
        pageCount: 0,
        token: '',
        tokenDeathTime: 0,
    },
    cardPackId : '',
    cardsSortedBy: null,
    cardsSortConfig: 'ascending'
}

export const listCardReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case GET_CARDS: {
            return {
                ...state,
                cardList: {
                    ...state.cardList,
                    cards: [...action.cardListData.cards],
                    cardsTotalCount: action.cardListData.cardsTotalCount,
                    maxGrade: action.cardListData.maxGrade,
                    minGrade: action.cardListData.minGrade,
                    packUserId: action.cardListData.packUserId,
                    page: action.cardListData.page,
                    pageCount: action.cardListData.pageCount,
                    token: action.cardListData.token,
                    tokenDeathTime: action.cardListData.tokenDeathTime,
                }
            }
        }
        case SET_NEW_CARD: {
            return {
                ...state,
                cardList: {
                    ...state.cardList,
                    cards: [action.newCard.newCard, ...state.cardList.cards]
                }
            }
        }
        case REMOVE_CARD: {
            return {
                ...state,
                cardList: {
                    ...state.cardList,
                    cards: [...state.cardList.cards.filter(p => p._id !== action.deletedCardId)]
                }
            }
        }
        case UPDATE_CARD: {
            return {
                ...state,
                cardList: {
                    ...state.cardList, cards: [...state.cardList.cards.map(p => p._id === action.updatedCard._id
                        ? action.updatedCard
                        : p)]
                }
            }
        }
         case CHANGE_CARD_SORTING: {
             return {...state, cardsSortedBy: action.cardsSortedBy}
         }
         case CHANGE_CARD_SORT_CONFIG: {
             return {...state, cardsSortConfig: action.cardsSortConfig}
         }
         case SET_CARD_PACK_ID: {
             return {...state, cardPackId: action.cardPackId}
         }
        default:
            return state
    }
}

export const takeCardListRequest = (cardListData: InitialCardListStateType) => ({type: GET_CARDS, cardListData} as const)
export const setNewCard = (newCard: NewCardType) => ({type: SET_NEW_CARD, newCard} as const)
export const deleteCard = (deletedCardId: string) => ({type: REMOVE_CARD, deletedCardId} as const)
export const updateCard = (updatedCard: any) => ({type: UPDATE_CARD, updatedCard} as const)
export const changeCardSorting = (cardsSortedBy: CardsSortingType) => ({type: CHANGE_CARD_SORTING, cardsSortedBy} as const)
export const changeCardSortConfig = (cardsSortConfig: SortConfigType) => ({type: CHANGE_CARD_SORT_CONFIG, cardsSortConfig} as const)
export const setCardPackId = (cardPackId: string, cardPackName: string) => ({type: SET_CARD_PACK_ID, cardPackId} as const)

export const getCardListTC = (_id: string, cardPackName: string) => (dispatch: Dispatch<ActionsType>) => {
    listCardApi.getListCard(_id)
        .then(res => {
            dispatch(takeCardListRequest(res.data))
            dispatch(setCardPackId(_id, cardPackName))
        })
        .catch(error => {
                console.log(error)
            }
        )
}

export const setNewCardTC = (cardsPack_id: string, question: string, grade: number, answer: string) => (dispatch: Dispatch<ActionsType>) => {
    listCardApi.createCard(cardsPack_id, question, grade, answer)
        .then(res => {
            dispatch(setNewCard(res.data))
        })
        .catch(error => {
                console.log(error)
            }
        )
}

export const deleteCardTC = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    listCardApi.deleteCard(id)
        .then(res => {
            dispatch(deleteCard(res.data.deletedCard._id))
        })
        .catch(error => {
                console.log(error)
            }
        )
}

export const updateCardTC = (_id: string, question: string, answerImg: string, answer: string) => (dispatch: Dispatch<ActionsType>) => {
    listCardApi.updateCard(_id, question, answerImg, answer)
        .then(res => {
            dispatch(updateCard(res.data.updatedCard))
        })
        .catch(error => {
                console.log(error)
            }
        )
}

export type ActionsType = ReturnType<typeof takeCardListRequest>
    | ReturnType<typeof setNewCard>
    | ReturnType<typeof deleteCard>
    | ReturnType<typeof updateCard>
    | ReturnType<typeof changeFiltering>
    | ReturnType<typeof changeCardSorting>
    | ReturnType<typeof changeCardSortConfig>
    | ReturnType<typeof setCardPackId>
