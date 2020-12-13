import React, {useState} from 'react';
import style from './Register.module.css'
import {NavLink, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LoginDataType, loginThunkCreator, registerThunkCreator} from "../../redux/authReducer";
import {RootState} from "../../redux/redux-store";


export function Register() {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [surname,setSurname]=useState('');
    const dispatch = useDispatch();

    const register=()=>{
        if(email.trim().length!==0 && password.trim().length!==0 && name.trim().length!==0 && surname.trim().length!==0 ){
            dispatch(registerThunkCreator(email,password, name, surname))
        }

    }

    const isAuth = useSelector<RootState,boolean>(state => state.auth.isAuth);
    const isLoading = useSelector<RootState,boolean>(state => state.auth.isLoading);
    const loginData = useSelector<RootState, LoginDataType>(state => state.auth.data);

    if(isAuth){
        return <Redirect to={`/profile/${loginData.id}`}/>;
    }

    return (
        <div className={style.register}>
            <div className={style.register_form}>
                <input value={email} onChange={(e)=>setEmail(e.currentTarget.value)} className={style.input} placeholder={'Email'} type="text"/>
                <input value={password} onChange={(e)=>setPassword(e.currentTarget.value)} type={'password'} className={style.input} placeholder={'Password'} />
                <input value={name} onChange={(e)=>setName(e.currentTarget.value)} type={'text'} className={style.input} placeholder={'Name'} />
                <input value={surname} onChange={(e)=>setSurname(e.currentTarget.value)} type={'text'} className={style.input} placeholder={'Surname'} />
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

