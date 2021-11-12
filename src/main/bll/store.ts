import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "../../features/feature1-auth/auth-reduser";


const rootReducer = combineReducers({
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;