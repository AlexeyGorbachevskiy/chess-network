import React from 'react';
import style from './Register.module.css'
import {NavLink} from "react-router-dom";


export function Register() {

    return (
        <div className={style.register}>
            <div className={style.register_form}>
                <input className={style.input} placeholder={'Email'} type="text"/>
                <input type={'password'} className={style.input} placeholder={'Password'} type="text"/>
                <div className={style.auth_wrapper}>
                    <button className={style.button}>Register</button>
                    <NavLink className={style.login_link} to='/login'>Do you have an account?</NavLink>
                </div>

            </div>
        </div>
    )
}

