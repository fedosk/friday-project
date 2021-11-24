import {Dispatch} from "react";
import {authApi} from "../../../main/dal/apiAuth/auth-api";

export const SET_USER_DATA = 'PROFILE/SET_USER_DATA';
const initialState = {
    avatar: '',
    created: '',
    email: '',
    isAdmin: false,
    name: '',
    publicCardPacksCount: 0,
    rememberMe: false,
    updated: '',
    verified: false,
    _id: '',
    error: '',
}


export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
              ...action.userData
            }
        }

        default:
            return {...state}
    }
}

// Actions
export const setUserData = (userData: InitialStateType) => ({
    type: SET_USER_DATA,
    userData
} as const)
// thunks
export const authMeTC = () => (dispatch: Dispatch<ActionsType>) => {
    debugger
    authApi.authMe()
        .then(res => {
            dispatch(setUserData(res.data))
        })
}
// types
type ActionsType = SetUserDataType
type SetUserDataType = ReturnType<typeof setUserData>
type InitialStateType = {
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
    error: string | undefined
}