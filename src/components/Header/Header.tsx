import {NavLink} from "react-router-dom";
import React from "react";
import obj from './Header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {logoutThunkCreator} from "../../redux/authReducer";



export function Header() {
    const isAuth = useSelector<RootState,boolean>(state => state.auth.isAuth);
    const dispatch = useDispatch();
    const logout=()=>{
        dispatch(logoutThunkCreator())
    }
    return (
        <header className={obj.header}>
            <div className={obj.wrap}>
                <div className={`${obj.logo}`}>
                    <NavLink className={obj.logo_link} to='/profile'>
                       <p className={obj.logo_1}>Chess</p> <p className={obj.logo_2}>Network</p>
                    </NavLink>
                </div>


                <div className={obj.links_wrapper}>
                    <NavLink activeClassName={obj.link__active} className={obj.link} to='/profile'>Profile</NavLink>
                    <NavLink activeClassName={obj.link__active} className={obj.link} to='/players'>Players</NavLink>
                    <NavLink activeClassName={obj.link__active} className={obj.link} to='/friends'>Friends</NavLink>
                    <NavLink activeClassName={obj.link__active} className={obj.link} to='/messages'>Messages</NavLink>
                    <NavLink activeClassName={obj.link__active} className={obj.link} to='/news'>News</NavLink>
                    <NavLink activeClassName={obj.link__active} className={obj.link} to='/play-chess'>Play</NavLink>
                        {
                            isAuth
                                ?
                                <NavLink onClick={logout} className={obj.link} to='/login'>Log Out</NavLink>
                                :
                                <NavLink activeClassName={obj.link__active} className={obj.link} to='/login'>Log In</NavLink>

                        }
                </div>



            </div>
        </header>
    );
}
