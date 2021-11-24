import {Dispatch} from "react";
import {authApi} from "../../../main/dal/auth-api";

const AUTH_USER = 'login/AUTH_USER'

export type InitialStateType = {}


const initialState: InitialStateType = {}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case AUTH_USER: {
            return {...state}
        }

        default:
            return state
    }
}

export const authUserRequest = (userData: InitialStateType) => ({type: AUTH_USER, userData} as const)


export const loginTC = (email: string, password: string) => (dispatch: Dispatch<ActionsType>) => {

}

export type ActionsType = ReturnType<typeof authUserRequest>
