import axios, {AxiosResponse} from "axios";
import {Dispatch} from "redux";


//api
const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0'
})

export const registerAPI = {
    registerUser(email: string, password: string) {
        return instance.post<AxiosResponse<string>>(`auth/register`, {email, password})
    }
}

const initialState = {
    email: '',                       //не уверен что email и password здесь нужны
    password: '',
    isSignUp: false,
    error: '',
    infoError: ''
}

type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTER/SET-EMAIL-PASSWORD': {
            return {...state, email: action.email, password: action.password}
        }
        case 'REGISTER/SET-ISSIGNUP': {
            return {...state, isSignUp: action.isSignUp}
        }
        case 'REGISTER/SET-ERROR': {
            return {...state, error: action.error, infoError: action.infoError}
        }
        default:
            return state
    }
}

//actions
export const setEmailPasswordRegister = (email: string, password: string) => {
    return {
        type: 'REGISTER/SET-EMAIL-PASSWORD',
        email,
        password
    } as const
}

export const setSingUp = (isSignUp: boolean) => {
    return {
        type: 'REGISTER/SET-ISSIGNUP',
        isSignUp
    } as const

}

export const setError = (error: string, infoError: string) => {
    return {
        type: 'REGISTER/SET-ERROR',
        error,
        infoError
    } as const
}

// thunks
export const sendRegisterDataTC = (email: string, password: string) => {
    return (dispatch: Dispatch) => {
        registerAPI.registerUser(email, password)
            .then((res) => {
                console.log({...res})
                dispatch(setEmailPasswordRegister(email, password))
                dispatch(setSingUp(true))
            })
            .catch((e) => {
                console.log({...e})
                const emailPasswordError = e.response.data.error
                const infoSMSError = e.response.data.passwordRegExp
                dispatch(setError(emailPasswordError, infoSMSError ))
                console.log(emailPasswordError)
                console.log(infoSMSError)
            })
    }
}

// types
type SetEmailRegisterType = ReturnType<typeof setEmailPasswordRegister>
type SetSingUpType = ReturnType<typeof setSingUp>
type SetErrorType = ReturnType<typeof setError>


type ActionsType = SetEmailRegisterType | SetSingUpType | SetErrorType