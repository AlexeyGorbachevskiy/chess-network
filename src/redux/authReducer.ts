import {RootState} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {authAPI, securityAPI} from "../api/api";

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
//TODO --- AuthReducerActionTypes instead any
// @ts-ignore
// @ts-ignore
export const setAuthUserDataAC = (userData: any, isAuth: boolean): SetAuthUserDataACType => ({
        type: SET_AUTH_USER_DATA,
        userData,
        isAuth
    }),
    getCaptchaUrlAC = (url: string): GetCaptchaUrlSuccessACType => ({
        type: GET_CAPTCHA_URL_SUCCESS, url
    }),
    getAuthInfoThunkCreator = (): ThunkAction<void, RootState, unknown, AuthReducerActionTypes> => {
        return (
            async (dispatch, getState) => {
                let response = await authAPI.getAuthInfo();
                console.log(response)
                if (response.status === 200) {
                    dispatch(setAuthUserDataAC(response.data.data, true));
                }
            }
        )
    },
    loginThunkCreator = (email: string, password: string): ThunkAction<void, RootState, unknown, any> => {
        return (
            async (dispatch, getState) => {
                let response = await authAPI.login(email, password)
                console.log(response)
                console.log(response.status)
                if (response.status === 200) {
                    dispatch(getAuthInfoThunkCreator())
                } else {
                    //    TODO

                }
            }
        )
    }, logoutThunkCreator = (): ThunkAction<void, RootState, unknown, AuthReducerActionTypes> => {
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
    },
    getCaptchaUrlThunkCreator = (): ThunkAction<void, RootState, unknown, AuthReducerActionTypes> => {
        return (
            async (dispatch, getState) => {
                const response = await securityAPI.getCaptchaUrl()
                const captchaUrl = response.data.url;
                dispatch(getCaptchaUrlAC(captchaUrl));
            }
        )
    };


// @ts-ignore
export default authReducer;
