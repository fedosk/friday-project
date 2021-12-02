import {Dispatch} from "react";
import {authApi, ResponseLoginType} from "../../../main/dal/auth-api";

const AUTH_USER = 'login/AUTH_USER'
const SET_STATUS = 'login/SET_STATUS'
const DELETE_USER = 'login/DELETE_USER'
const ERROR_AUTH = 'login/ERROR_AUTH'
const CHANGE_REMEMBER_ME_STUSUS = 'login/CHANGE_REMEMBER_ME_STUSUS'

export const EMPTY_STRING = ''
export const ZERO = 0

export type InitialStateType<T> = {
    userData: T
    authStatus: boolean
}

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
    authStatus: false
}

export const loginReducer = (state: InitialStateType<ResponseLoginType> = initialState, action: ActionsType): InitialStateType<ResponseLoginType> => {
    switch (action.type) {
        case AUTH_USER: {
            return {...state, userData: {...action.userData}, authStatus: true}
        }
        case DELETE_USER: {
            return {
                ...state,
                userData: {
                    ...state.userData,
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
                authStatus: false
            }
        }
        case CHANGE_REMEMBER_ME_STUSUS: {
            return {...state, userData: {...state.userData, rememberMe: action.rememberMeStatus}}
        }
        default:
            return state
    }
}

export const authUserRequest = (userData: ResponseLoginType) => ({type: AUTH_USER, userData} as const)
export const logoutUserRequest = () => ({type: DELETE_USER} as const)
export const errorAuthUser = (error: string | undefined) => ({type: ERROR_AUTH, error} as const)
export const setRememberMeStatus = (rememberMeStatus: boolean) => ({
    type: CHANGE_REMEMBER_ME_STUSUS,
    rememberMeStatus
} as const)

export const loginTC = (email: string, password: string, rememberMeStatus: boolean) => (dispatch: Dispatch<ActionsType>) => {
    authApi.loginUser(email, password, rememberMeStatus)
        .then(res => {
            dispatch(authUserRequest(res.data))
        })
        .catch(error => {
            dispatch(errorAuthUser(error.error))
        })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    authApi.logoutUser()
        .then(res => {
            dispatch(logoutUserRequest())
        })
        .catch(error => {
            console.log(error)
        })
}

export const authUserTC = () => (dispatch: Dispatch<ActionsType>) => {
    authApi.authUser()
        .then(res => {
            dispatch(authUserRequest({...res.data}))
        })
        .catch(error => {
            dispatch(errorAuthUser(error.error))
        })
}

export type ActionsType = ReturnType<typeof authUserRequest>
    | ReturnType<typeof errorAuthUser>
    | ReturnType<typeof setRememberMeStatus>
    | ReturnType<typeof logoutUserRequest>