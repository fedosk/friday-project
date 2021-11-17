import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {loginReducer} from "../../features/feature1-auth/login/login-reduser";
import {registerReducer} from "../../features/feature1-auth/register/register-reduser";
import {passwordRecoveryReducer} from "../../features/feature1-auth/password-recovery/password-recovery-reduser";
import {profileReducer} from "../../features/feature1-auth/profile/profile-reduser";



const rootReducer = combineReducers({
    login:loginReducer,
    register: registerReducer,
    passwordRecovery: passwordRecoveryReducer,
    profile: profileReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;