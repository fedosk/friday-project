import {Dispatch} from "react";
import {authApi, ResponseLoginType} from "../../../main/dal/auth-api";

const AUTH_USER = 'login/AUTH_USER'
const SET_STATUS = 'login/SET_STATUS'
const ERROR_AUTH = 'login/ERROR_AUTH'

export const IDLE = 'idle'
export const LOADING = 'loading'
export const SUCCEEDED = 'succeeded'
export const FAILED = 'failed'

export const EMPTY_STRING = ''
export const ZERO = 0

export type InitialStateType<T> = {
    userData: T
    status: RequestStatusType
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType<ResponseLoginType> = {
    userData: {
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
    },
    status: IDLE,
}

export const loginReducer = (state: InitialStateType<ResponseLoginType> = initialState, action: ActionsType): InitialStateType<ResponseLoginType> => {
    switch (action.type) {
        case AUTH_USER: {
            return {...state, userData: {...action.userData}}
        }
        case SET_STATUS: {
            return {...state, status: action.status}
        }
        case ERROR_AUTH: {
            return {...state, userData: {...state.userData, error: action.error}}
        }
        default:
            return state
    }
}

export const authUserRequest = (userData: ResponseLoginType) => ({type: AUTH_USER, userData} as const)
export const setStatusAuthUser = (status: RequestStatusType) => ({type: SET_STATUS, status} as const)
export const errorAuthUser = (error: string | undefined) => ({type: ERROR_AUTH, error} as const)

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
            dispatch(errorAuthUser(error.error))
            console.log(error)
        })
}

export type ActionsType = ReturnType<typeof authUserRequest>
    | ReturnType<typeof setStatusAuthUser>
    | ReturnType<typeof errorAuthUser>