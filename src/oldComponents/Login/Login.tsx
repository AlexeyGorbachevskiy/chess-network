import React from 'react';
import style from './Login.module.css'
import {reduxForm} from "redux-form";
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {ThunkDispatch} from "redux-thunk";
import {AuthReducerActionTypes, loginThunkCreator, logoutThunkCreator} from "../../redux/authReducer";
import {Redirect} from "react-router";


const LoginReduxForm: any = reduxForm({
    form: 'login'
})(LoginForm)


function Login(props: any) {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>

    }

    return (
        <div className={style.login_wrapper}>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

export type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}


let mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null | undefined) => void
    logout: () => void
}

let mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, AuthReducerActionTypes>)
    : MapDispatchPropsType => {
    return {
        login: (email, password, rememberMe, captcha) => {
            dispatch(loginThunkCreator(email, password, rememberMe, captcha))
        },
        logout: () => {
            dispatch(logoutThunkCreator())
        },
    }
}


export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>
(mapStateToProps, mapDispatchToProps)(Login)
