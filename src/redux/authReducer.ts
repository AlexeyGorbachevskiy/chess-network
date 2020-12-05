import {authAPI, securityAPI} from "../oldAPI/API";
import {RootState} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {stopSubmit} from "redux-form";

type initialStateType = typeof initialState


let initialState = {
    data: {
        email: null as string | null,
        id: null as number | null,
        login: null as string | null,
    },
    isAuth: false,
    captchaUrl: null as string | null,
}

export type AuthReducerActionTypes = SetAuthUserDataACType | GetCaptchaUrlSuccessACType
const authReducer = (state: initialStateType = initialState, action: AuthReducerActionTypes): initialStateType => {

    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                data: {...action.userData!},
                isAuth: action.isAuth,
            }
        }

        case GET_CAPTCHA_URL_SUCCESS: {
            debugger
            return {
                ...state,
                captchaUrl: action.url
            }
        }

        default:
            return state
    }
}


export type UserDataType = {
    email: string | null,
    id: number | null,
    login: string | null,
} | null
type SetAuthUserDataACType = {
    type: typeof SET_AUTH_USER_DATA
    userData: UserDataType
    isAuth: boolean
}
type GetCaptchaUrlSuccessACType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    url: string
}
const SET_AUTH_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


export const setAuthUserDataAC = (userData: UserDataType, isAuth: boolean): SetAuthUserDataACType => ({
    type: SET_AUTH_USER_DATA,
    userData,
    isAuth
});
export const getCaptchaUrlAC = (url: string): GetCaptchaUrlSuccessACType => ({
    type: GET_CAPTCHA_URL_SUCCESS, url
});


export const getAuthInfoThunkCreator = (): ThunkAction<void, RootState, unknown, AuthReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            let response = await authAPI.getAuthInfo();
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(response.data.data, true));
            }
        }
    )
};


//TODO --- AuthReducerActionTypes instead any
export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha:string|undefined|null): ThunkAction<void, RootState, unknown, any> => {
    return (
        async (dispatch, getState) => {
            let response = await authAPI.login(email, password, rememberMe,captcha)

            if (response.data.resultCode === 0) {
                dispatch(getAuthInfoThunkCreator())
            }
            else {
                if (response.data.resultCode === 10) {
                    dispatch(getCaptchaUrlThunkCreator())
                }
                const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                const action = stopSubmit('login', {_error: message});
                dispatch(action);
            }
        }
    )
};

export const logoutThunkCreator = (): ThunkAction<void, RootState, unknown, AuthReducerActionTypes> => {
    return (
        (dispatch, getState) => {
            authAPI.logout()
                .then(response => {
                    if (response.data.resultCode === 0) {
                        dispatch(setAuthUserDataAC(null, false));
                    }
                })
        }
    )
};


export const getCaptchaUrlThunkCreator = (): ThunkAction<void, RootState, unknown, AuthReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            const response = await securityAPI.getCaptchaUrl()
            const captchaUrl = response.data.url;
            dispatch(getCaptchaUrlAC(captchaUrl));
        }
    )
};


export default authReducer;
