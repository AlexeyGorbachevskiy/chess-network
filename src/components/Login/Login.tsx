import React, {useState} from 'react';
import style from './Login.module.css'
import {NavLink, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginThunkCreator} from "../../redux/authReducer";
import {RootState} from "../../redux/redux-store";


export function Login() {
    const [email,setEmail]=useState('saimon@mail.ru');
    const [password,setPassword]=useState('awesome');
    const dispatch = useDispatch();

    const login=()=>{
        dispatch(loginThunkCreator(email,password,false, null))
    }

    const isAuth = useSelector<RootState,boolean>(state => state.auth.isAuth);

    if(isAuth){
        return <Redirect to="/profile"/>;
    }

    return (
        <div className={style.login}>
            <div className={style.login_form}>
                <input value={email} onChange={(e)=>setEmail(e.currentTarget.value)} className={style.input} placeholder={'Email'} type="text"/>
                <input type={'password'} value={password} onChange={(e)=>setPassword(e.currentTarget.value)} className={style.input} placeholder={'Password'}/>
                <div className={style.auth_wrapper}>
                    <button onClick={login} className={style.button}>Log in</button>
                    <NavLink className={style.register_link} to='/register'>Are you not registered?</NavLink>
                </div>

            </div>
        </div>
    )
}

