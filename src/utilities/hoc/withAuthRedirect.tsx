import React from 'react';
import {Redirect} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store";


export const withAuthRedirect = (Component: any) => {

    function RedirectComponent(props: any) {
        const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);

        if (!isAuth) {
            return <Redirect to={'/login'}/>
        }
        return <Component {...props}/>

    }


    return RedirectComponent
}


