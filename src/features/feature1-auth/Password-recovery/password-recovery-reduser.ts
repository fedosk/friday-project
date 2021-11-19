import {Dispatch} from "react";
import {apiRecoveryPassword} from "../../../main/ui/api/apiRecoveryPassword/apiRecoveryPassword";

const initialState = {
    email: '',
    isSending: false,
    newPassword: '',
}
type InitialStateType = typeof initialState

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "PASS-RECOVERY/SET_EMAIL": {
            return {...state, email: action.email}
        }
        case "PASS-RECOVERY/SET_NEW_PASSWORD": {
            return {...state, newPassword: action.newPassword}
        }
        case "PASS-RECOVERY/SET_IS_SENDING": {
            return {...state, isSending: action.isSending}
        }
    }
    return state
}
//actions
export const setEmail = (email: string) => ({
    type: "PASS-RECOVERY/SET_EMAIL",
    email
} as const)
export const setNewPassword = (newPassword: string) => ({
    type: "PASS-RECOVERY/SET_NEW_PASSWORD",
    newPassword
} as const)
export const setSending = (isSending: boolean) => ({
    type: "PASS-RECOVERY/SET_IS_SENDING",
    isSending,
} as const)
// thunks
export const sendInstructions = (email: string) => {
    return (dispatch: Dispatch<SetSendingType>) => {
        apiRecoveryPassword.getInstructions(email).then()
        dispatch(setSending(true))
    }
}
export const sendNewPassword = (token: string, password: string) => {
    return (dispatch: Dispatch<SetSendingType>) => {
        apiRecoveryPassword.sendNewPassword(token, password).then();
        dispatch(setSending(true));
    }
}
// types
export type SetSendingType = ReturnType<typeof setSending>
export type SetNewPasswordType = ReturnType<typeof setNewPassword>
export type SetEmailType = ReturnType<typeof setEmail>
type ActionsType =
    SetSendingType |
    SetNewPasswordType |
    SetEmailType


