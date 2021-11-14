import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {loginReducer} from "../../features/feature1-auth/Login/login-reduser";
import {registerReducer} from "../../features/feature1-auth/Register/register-reduser";
import {passwordRecoveryReducer} from "../../features/feature1-auth/Password-recovery/password-recovery-reduser";
import {profileReducer} from "../../features/feature1-auth/Profile/profile-reduser";
import {newPasswordReducer} from "../../features/feature1-auth/New-password/new-password-reduser";


const rootReducer = combineReducers({
    login:loginReducer,
    register: registerReducer,
    passwordRecovery: passwordRecoveryReducer,
    profile: profileReducer,
    newPassword: newPasswordReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;