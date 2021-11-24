import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Error404} from "../../../features/feature1-auth/Error404/Error404";
import {Login} from '../../../features/feature1-auth/Login/Login';
import {NewPassword} from "../../../features/feature1-auth/Password-recovery/new-password/NewPassword";
import {PasswordRecovery} from "../../../features/feature1-auth/Password-recovery/PasswordRecovery";
import {CheckEmail} from "../../../features/feature1-auth/Password-recovery/check-email/CheckEmail";
import {Profile} from "../../../features/feature1-auth/Profile/Profile";
import {Register} from "../../../features/feature1-auth/Register/Register";


export const path = {
    login: '/login',
    newPassword: '/new-password/:token',
    passwordRecovery: '/password-recovery',
    checkEmail: '/check-email',
    profile: '/profile',
    register: '/register',
    error: '/error404',
}

export function Rout() {
    return (
        <div className='routes'>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path={path.login} element={<Login/>}/>
                <Route path={path.newPassword} element={<NewPassword/>}/>
                <Route path={path.passwordRecovery} element={<PasswordRecovery/>}/>
                <Route path={path.checkEmail} element={<CheckEmail/>}/>
                <Route path={path.profile} element={<Profile/>}/>
                <Route path={path.register} element={<Register/>}/>
                <Route path={path.error} element={<Error404/>}/>
                <Route path={'*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
}