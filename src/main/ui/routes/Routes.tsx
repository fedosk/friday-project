import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Register} from "../../../features/feature1-auth/Register/Register";
import {Profile} from "../../../features/feature1-auth/Profile/Profile";
import {PasswordRecovery} from "../../../features/feature1-auth/Password-recovery/PasswordRecovery";
import {NewPassword} from "../../../features/feature1-auth/New-password/NewPassword";
import {Login} from "../../../features/feature1-auth/Login/Login";
import {Error404} from "../../../features/feature1-auth/Error404/Error404";
import {SuperComponents} from "../common/HW4";


export const PATH = {
    LOGIN: '/Login',
    NEW_PASSWORD: '/New-password',
    PASSWORD_RECOVERY: '/Password-recovery',
    PROFILE: '/Profile',
    REGISTER: '/Register',
    SUPER_COMPONENTS: '/super-components',
}

export function Rout() {
    return (
        <div className={'header'}>
            <Routes>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.REGISTER} element={<Register/>}/>
                <Route path={PATH.SUPER_COMPONENTS} element={<SuperComponents/>}/>
                <Route path={'*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
}