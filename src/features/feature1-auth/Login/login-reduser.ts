import {Dispatch} from "react";
import {authApi} from "../../../main/dal/auth-api";


const AUTH_USER = 'login/AUTH_USER'
const SET_STATUS = 'login/SET_STATUS'

export const IDLE = 'idle'
export const LOADING = 'loading'
export const SUCCEEDED = 'succeeded'
export const FAILED = 'failed'

export const EMPTY_STRING = ''
export const ZERO = 0

export type InitialStateType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    _id: string
    error: string
    status: RequestStatusType
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
    avatar: EMPTY_STRING,
    created: EMPTY_STRING,
    email: EMPTY_STRING,
    isAdmin: false,
    name: EMPTY_STRING,
    publicCardPacksCount: ZERO,
    rememberMe: false,
    updated: EMPTY_STRING,
    verified: false,
    _id: EMPTY_STRING,
    error: EMPTY_STRING,
    status: IDLE,
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case AUTH_USER: {
            return {...state}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        default:
            return state
    }
}

export const authUserRequest = (userData: InitialStateType) => ({type: AUTH_USER, userData} as const)
export const setStatusAuthUser = (status: RequestStatusType) => ({type: SET_STATUS, status} as const)

export const loginTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {
    authApi.loginUser(email, password)
        .then(res => {
            if (!res.data.error) {
                dispatch(authUserRequest(res.data))
                dispatch(setStatusAuthUser('succeeded'))
            }
        })
        .catch(error => {
            dispatch(setStatusAuthUser('failed'))
            console.log(error)
        })
}

export type ActionsType = ReturnType<typeof authUserRequest>
    | ReturnType<typeof setStatusAuthUser>