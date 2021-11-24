import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Error404} from "../../../features/feature1-auth/Error404/Error404";
import { Login } from '../../../features/feature1-auth/Login/Login';
import {SuperComponents} from "../common/HW4";
import {NewPassword} from "../../../features/feature1-auth/Password-recovery/new-password/NewPassword";
import {PasswordRecovery} from "../../../features/feature1-auth/Password-recovery/PasswordRecovery";
import {CheckEmail} from "../../../features/feature1-auth/Password-recovery/check-email/CheckEmail";
import {Profile} from "../../../features/feature1-auth/Profile/Profile";
import {Register} from "../../../features/feature1-auth/Register/Register";


export const PATH = {
    LOGIN: '/Login',
    NEW_PASSWORD: '/New-password/:token',
    PASSWORD_RECOVERY: '/Password-recovery',
    CHECK_EMAIL: '/Check-email',
    PROFILE: '/Profile',
    REGISTER: '/Register',
    SUPER_COMPONENTS: '/super-components',
    ERROR: '/error404',
}


export function Rout() {
    return (
        <div className={'Routes'}>
            <Routes>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.REGISTER} element={<Register/>}/>
                <Route path={PATH.SUPER_COMPONENTS} element={<SuperComponents/>}/>
                <Route path={PATH.ERROR} element={<Error404/>}/>
                <Route path={'*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
}