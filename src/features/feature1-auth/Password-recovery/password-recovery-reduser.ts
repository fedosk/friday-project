import {Dispatch} from "react";
import axios from 'axios';

export const apiServices = axios.create({
    baseURL: `https://neko-back.herokuapp.com/2.0/`,
});
const apiRecoveryPassword = {
 getInstructions(email: string) {
    return apiServices.post(`auth/forgot`, {
        email, from: "test-front-admin <admin@gmail.com>",
        message: `<div>Recovery Link:<a href="http://localhost:3000/#/New-password/$token$/">your-link<a/></div>`
    })
},
 setNewPassword(resetPasswordToken:string,password:string)  {
    return apiServices.post(`auth/set-new-password` ,
        {resetPasswordToken, password  })
}
};

const initialState = {
    email: '',
    isSending: false,
    password: '',
}

type InitialStateType = typeof initialState

export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "PASS-RECOVERY/SET_EMAIL": {
            return {...state, email: action.email}
        }
        case "PASS-RECOVERY/SET_PASSWORD": {
            return {...state, password: action.password}
        }
    }
    return state
}
//actions
export const setEmail = (email: string) => ({
    type: "PASS-RECOVERY/SET_EMAIL",
    email
} as const)
export const setPassword = (password: string) => ({
    type: "PASS-RECOVERY/SET_PASSWORD",
    password
} as const)
// thunks
export const sendInstructions = (email: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        apiRecoveryPassword.getInstructions(email).then()
    }
}
export const setNewPassword =(token:string,password:string) => {
    return (dispatch:Dispatch<ActionsType>) => {
        apiRecoveryPassword.setNewPassword(token,password).then()
    }
}
// types
type SetPassword = ReturnType<typeof setPassword>
type SetEmailType = ReturnType<typeof setEmail>
type ActionsType = any

