import {useDispatch} from "react-redux";
import {Dispatch, useState} from "react";
import {SetEmailType} from "../../features/feature1-auth/Password-recovery/password-recovery-reduser";


type ThunkType = (dispatch: Dispatch<any>) => void
type usePasswordRecoveryHandlerType = {
    action: (email: string) => SetEmailType,
    thunk: (email: string) => ThunkType,
    email: string
}
export const usePasswordRecoveryHandler = ({
                                               action,
                                               thunk,
                                               email,
                                           }: usePasswordRecoveryHandlerType) => {
    const [emailError, setEmailError] = useState<string>('');
    const dispatch = useDispatch()

    const onChange = (email: string) => {
        setEmailError('');
        dispatch(action(email));
    }
    const onClick = () => {
        if (!email) {
            setEmailError('Введите адрес')
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setEmailError('Неправильный адрес');
        }
        dispatch(thunk(email));
    }
    return {onChange, onClick, emailError}
}