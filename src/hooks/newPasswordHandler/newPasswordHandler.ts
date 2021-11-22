import {useDispatch} from "react-redux";
import {Dispatch, useState} from "react";
import {SetNewPasswordType} from "../../features/feature1-auth/Password-recovery/password-recovery-reduser";

type ThunkType = (dispatch: Dispatch<any>) => void
type useNewPasswordHandlerType = {
    action: (newPassword: string) => SetNewPasswordType,
    thunk: (token: string, newPassword: string) => ThunkType,
    newPassword: string
    token: string
}
export const useNewPasswordHandler = ({
                                          action,
                                          thunk,
                                          newPassword,
                                          token,
                                      }: useNewPasswordHandlerType) => {
    const [newPasswordError, setNewPasswordError] = useState<string>('');
    const dispatch = useDispatch()

    const onChange = (newPassword: string) => {
        setNewPasswordError('');
        dispatch(action(newPassword));
    }
    const onClick = () => {
        if (!newPassword) {
            setNewPasswordError('Введите пароль')
        } else if (newPassword.length < 4) {
            setNewPasswordError('Пароль не менее 4 символов');
        }
        dispatch(thunk(token, newPassword));
    }
    return {onChange, onClick, newPasswordError}
}