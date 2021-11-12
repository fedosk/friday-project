import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Register} from "../../../features/feature1-auth/register/Register";
import {Profile} from "../../../features/feature1-auth/profile/Profile";
import {PasswordRecovery} from "../../../features/feature1-auth/password-recovery/PasswordRecovery";
import {NewPassword} from "../../../features/feature1-auth/new-password/NewPassword";
import {Login} from "../../../features/feature1-auth/login/Login";
import {Error404} from "../../../features/feature1-auth/Error404/Error404";
import {SuperComponents} from "../common/HW4";

export const PATH = {
    LOGIN: '/login',
    NEW_PASSWORD: '/new-password',
    PASSWORD_RECOVERY: '/password-recovery',
    PROFILE: '/profile',
    REGISTER: '/register',
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