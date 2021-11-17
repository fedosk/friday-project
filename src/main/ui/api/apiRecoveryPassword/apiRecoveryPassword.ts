import {apiServices} from "../api";

export const apiRecoveryPassword = {
    getInstructions(email: string) {
        return apiServices.post(`auth/forgot`, {
            email, from: "Administrator <admin@gmail.com>",
            message: `<div><a href="http://localhost:3000/#/New-password/$token$">Ссылка на востановление пароля<a/></div>`
        })
    },
    sendNewPassword(resetPasswordToken: string, password: string) {
        return apiServices.post(`auth/set-new-password`,
            {resetPasswordToken, password})
    }
};