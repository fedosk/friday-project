import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../../features/feature1-auth/Login/Login";
import {MainPage} from "../../features/feature2 -main/MainPage/MainPage";
import {NewPassword} from "../../features/feature1-auth/New-password/NewPassword";
import {PasswordRecovery} from "../../features/feature1-auth/Password-recovery/PasswordRecovery";
import {CheckEmail} from "../../features/feature1-auth/check-email/CheckEmail";
import {Profile} from "../../features/feature1-auth/Profile/Profile";
import {Register} from "../../features/feature1-auth/Register/Register";
import {Error404} from "../../features/feature1-auth/Error404/Error404";
import {authMeTC} from "../../features/feature1-auth/Profile/profile-reduser";

export const path = {
    main: '/',
    login: '/login',
    new_password: '/new-password/:token',
    password_recovery: '/password-recovery',
    check_email: '/check-email',
    profile: '/profile',
    register: '/register',
    error: '/error404',
    packs: '/packs'
}


function App() {
    const userId = useSelector((state: AppRootStateType) => state.profile._id)
    const dispatch= useDispatch();
     useEffect(()=> {
        dispatch(authMeTC())
    }, [])
    return (
        <div className="App">
                <Routes>
                    <Route path={path.main} element={<MainPage/>}/>
                    <Route path={path.login} element={<Login/>}/>
                    <Route path={path.new_password} element={<NewPassword/>}/>
                    <Route path={path.password_recovery} element={<PasswordRecovery/>}/>
                    <Route path={path.check_email} element={<CheckEmail/>}/>
                    <Route path={path.profile} element={<Profile/>}/>
                    <Route path={path.register} element={<Register/>}/>
                    <Route path={path.profile} element={<Profile/>}/>
                    <Route path={path.error} element={<Error404/>}/>
                    <Route path={'*'} element={<Error404/>}/>
                </Routes>
        </div>
    );
}

export default App;
