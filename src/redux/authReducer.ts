import {RootState} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {authAPI, securityAPI} from "../api/api";

type initialStateType = typeof initialState


export type LoginDataType = {
    id: number | null,
    name: string | null,
    surname: string | null,
    about: string | null,
    birthday: string | null,
    chess_level: string | null,
    current_city: string | null,
    current_country: string | null,
    email: string | null,
    fide_rating: number | null,
    hobbies: string | null,
    online: boolean,
    photo: string | null,
    study_place: string | null,
}

let initialState = {
    data: {
        id: null as number | null,
        name: null as string | null,
        surname: null as string | null,
        about: null as string | null,
        birthday: null as string | null,
        chess_level: null as string | null,
        current_city: null as string | null,
        current_country: null as string | null,
        email: null as string | null,
        fide_rating: null as number | null,
        hobbies: null as string | null,
        online: false,
        photo: null as string | null,
        study_place: null as string | null,
    },
    isAuth: false,
    initialized:true,
    isLoading: false,
    captchaUrl: null as string | null,
}

export type AuthReducerActionTypes = SetAuthUserDataACType | GetCaptchaUrlSuccessACType | SetLoadingACType | InitializedSuccessACType
const authReducer = (state: initialStateType = initialState, action: AuthReducerActionTypes): initialStateType => {

    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                data: {...action.userData!},
                isAuth: action.isAuth,
            }
        }
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true

            }
        }

        case SET_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
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


type SetAuthUserDataACType = {
    type: typeof SET_AUTH_USER_DATA
    userData: LoginDataType
    isAuth: boolean
}
type GetCaptchaUrlSuccessACType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    url: string
}
export type InitializedSuccessACType = {
    type: typeof INITIALIZED_SUCCESS
}

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
const SET_AUTH_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';
//TODO --- AuthReducerActionTypes instead any
// @ts-ignore
// @ts-ignore
export const setAuthUserDataAC = (userData: LoginDataType, isAuth: boolean): SetAuthUserDataACType => ({
    type: SET_AUTH_USER_DATA,
    userData,
    isAuth
});

export const initializedSuccessAC = (): InitializedSuccessACType => ({
    type: INITIALIZED_SUCCESS
});

export const getAuthInfoThunkCreator = (): ThunkAction<void, RootState, unknown, AuthReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            try{
                let response = await authAPI.getAuthInfo();
                console.log(response)
                if (response.status === 200) {
                    dispatch(setAuthUserDataAC(response.data, true));
                    dispatch(initializedSuccessAC())
                }else{
                    dispatch(initializedSuccessAC())
                }
            }
            catch(error){
                dispatch(initializedSuccessAC())
            }



        }
    )
};

const SET_LOADING = 'SET_LOADING'

export type SetLoadingACType = {
    type: typeof SET_LOADING
    isLoading: boolean
}
export const setLoadingAC = (isLoading: boolean): SetLoadingACType => {
    return {type: 'SET_LOADING', isLoading}
}


export const loginThunkCreator = (email: string, password: string): ThunkAction<void, RootState, unknown, any> => {
    return (
        async (dispatch, getState) => {

            // loader appears
            dispatch(setLoadingAC(true))


            let response = await authAPI.login(email, password)
            if (response.status === 200) {

                console.log(response.data)
                dispatch(setLoadingAC(false))
                dispatch(setAuthUserDataAC(response.data, true))
                // loader appears

            } else {
                //    TODO
                // loader appears
                dispatch(setLoadingAC(false))
            }

            dispatch(initializedSuccessAC())
        }
    )
};

export const registerThunkCreator = (email: string, password: string): ThunkAction<void, RootState, unknown, any> => {
    return (
        async (dispatch, getState) => {

            // loader appears
            dispatch(setLoadingAC(true))


            let response = await authAPI.register(email, password)
            if (response.status === 200) {
                console.log(response.data)
                dispatch(loginThunkCreator(email, password))
                // dispatch(setAuthUserDataAC(response.data, true))
                // loader appears
            } else {
                //    TODO
                // loader appears
                dispatch(setLoadingAC(false))
            }

            dispatch(initializedSuccessAC())
        }
    )
};
export const logoutThunkCreator = (): ThunkAction<void, RootState, unknown, AuthReducerActionTypes> => {
    return (
        (dispatch, getState) => {
            // loader appears
            dispatch(setLoadingAC(true))
            authAPI.logout()
                .then(response => {
                    if (response.status === 200) {
                        dispatch(setAuthUserDataAC({
                            id: null as number | null,
                            name: null as string | null,
                            surname: null as string | null,
                            about: null as string | null,
                            birthday: null as string | null,
                            chess_level: null as string | null,
                            current_city: null as string | null,
                            current_country: null as string | null,
                            email: null as string | null,
                            fide_rating: null as number | null,
                            hobbies: null as string | null,
                            online: false,
                            photo: null as string | null,
                            study_place: null as string | null,
                        }, false));
                    }
                    dispatch(initializedSuccessAC())
                    // loader appears
                    dispatch(setLoadingAC(false))
                })
                .catch(()=>{
                    dispatch(initializedSuccessAC())
                    // loader appears
                    dispatch(setLoadingAC(false))
                })
        }
    )
}

export default authReducer;
