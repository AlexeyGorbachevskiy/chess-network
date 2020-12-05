import React from 'react';
import obj from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {HeaderContainerPropsType} from "./HeaderContainer";


function Header(props: HeaderContainerPropsType) {
    return (
        <header className={obj.header}>
            <div className={obj.wrap}>
                <div className={`${obj.logo}`}>
                    <NavLink className={obj.logo_link} to='/profile'>
                        <img className={obj.logo_img} src={process.env.PUBLIC_URL + '/img/oldLogo.png'}/>
                    </NavLink>
                </div>

                <div className={obj.login}>
                        {
                            props.isAuth
                                ?
                                <div className={obj.auth_wrapper}>
                                    <p>{props.userData!.login}</p>
                                    <button className={obj.logout_btn} onClick={props.logout}>Log Out</button>
                                </div>
                                :
                                <NavLink className={obj.login_link} to='/login'>Log In</NavLink>

                        }
                </div>

            </div>
        </header>
    );
}


export default Header;
