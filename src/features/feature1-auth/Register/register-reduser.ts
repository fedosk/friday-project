import axios from "axios";
import {Dispatch} from "redux";


const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/'
})

//api
export const registerAPI = {
    registerUser(email: string, password: string) {
        return instance.post(`auth/register`, {email, password})
    }
}


const initialState = {
    email: '',
    password: ''
}

type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "REGISTER/SET-EMAIL-PASSWORD": {
            return {...state, email: action.email, password: action.password}
        }
        default:
            return state
    }
}

//actions
export const setEmailPasswordRegister = (email: string, password:string) => {
    return {
        type: 'REGISTER/SET-EMAIL-PASSWORD',
        email,
        password
    } as const
}

// thunks
export const sendRegisterDataTC = (email: string, password: string) => {
    return (dispatch: Dispatch) => {
        registerAPI.registerUser(email, password)
            .then((res) => {
                dispatch(setEmailPasswordRegister(email,password))
            })
            .catch((error) => {
                console.log({...error})
            })
    }
}

// types
type SetEmailRegisterType = ReturnType<typeof setEmailPasswordRegister>

type ActionsType = SetEmailRegisterType