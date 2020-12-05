import React from 'react';
import obj from './Nav.module.css';
import {NavLink} from 'react-router-dom';

function Nav() {
    return (
        <nav className={obj.nav}>
            <div className={obj.item}><NavLink to='/profile' activeClassName={obj.activeLink} className={obj.link}>Profile</NavLink></div>
            <div className={obj.item}><NavLink to='/friends' activeClassName={obj.activeLink} className={obj.link}>Friends</NavLink></div>
            <div className={obj.item}><NavLink to='/messages' activeClassName={obj.activeLink} className={obj.link}>Messages</NavLink></div>
            <div className={obj.item}><NavLink to='/settings' activeClassName={obj.activeLink} className={obj.link}>Settings</NavLink></div>
            <div className={obj.item}><NavLink to='/findFriends' activeClassName={obj.activeLink} className={obj.link}>Find Friends</NavLink></div>
        </nav>
    );
}


export default Nav;