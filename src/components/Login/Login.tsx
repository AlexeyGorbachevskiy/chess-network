import React, {useState} from 'react';
import style from './Login.module.css'
import {NavLink, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LoginDataType, loginThunkCreator} from "../../redux/authReducer";
import {RootState} from "../../redux/redux-store";


export function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const dispatch = useDispatch();

    const login=()=>{
        if(email.trim().length===0 || password.trim().length===0){
            return
        }
        dispatch(loginThunkCreator(email,password))
    }

    const isAuth = useSelector<RootState,boolean>(state => state.auth.isAuth);
    const isLoading = useSelector<RootState,boolean>(state => state.auth.isLoading);
    const loginData = useSelector<RootState, LoginDataType>(state => state.auth.data);

    if(isAuth){
        return <Redirect to={`/profile/${loginData.id}`}/>;
    }

    return (
        <div className={style.login}>
            <div className={style.login_form}>
                <input value={email} onChange={(e)=>setEmail(e.currentTarget.value)} className={style.input} placeholder={'Email'} type="text"/>
                <input type={'password'} value={password} onChange={(e)=>setPassword(e.currentTarget.value)} className={style.input} placeholder={'Password'}/>
                <div className={style.auth_wrapper}>
                    <button style={isLoading ? {opacity:'.20', cursor:'not-allowed'} : {}} onClick={login} className={style.button}>Log in</button>
                    <NavLink className={style.register_link} to='/register'>Are you not registered?</NavLink>
                </div>

            </div>

            {
                isLoading &&
                <img style={{position: 'absolute', zIndex: 1200}} className={style.preloader}
                     src={process.env.PUBLIC_URL + '/img/spinner.svg'} alt={'Preloader svg'}/>
            }
        </div>
    )
}

