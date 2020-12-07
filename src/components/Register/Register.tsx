import React, {useState} from 'react';
import style from './Register.module.css'
import {NavLink, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginThunkCreator, registerThunkCreator} from "../../redux/authReducer";
import {RootState} from "../../redux/redux-store";


export function Register() {

    const [email,setEmail]=useState('saimon4@mail.ru');
    const [password,setPassword]=useState('saimon4@mail.ru');
    const dispatch = useDispatch();

    const register=()=>{
        dispatch(registerThunkCreator(email,password))
    }

    const isAuth = useSelector<RootState,boolean>(state => state.auth.isAuth);
    const isLoading = useSelector<RootState,boolean>(state => state.auth.isLoading);

    if(isAuth){
        return <Redirect to="/profile"/>;
    }

    return (
        <div className={style.register}>
            <div className={style.register_form}>
                <input value={email} onChange={(e)=>setEmail(e.currentTarget.value)} className={style.input} placeholder={'Email'} type="text"/>
                <input value={password} onChange={(e)=>setPassword(e.currentTarget.value)} type={'password'} className={style.input} placeholder={'Password'} />
                <div className={style.auth_wrapper}>
                    <button style={isLoading ? {opacity:'.20', cursor:'not-allowed'} : {}}  className={style.button} onClick={register} >Register</button>
                    <NavLink className={style.login_link} to='/login'>Do you have an account?</NavLink>
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

