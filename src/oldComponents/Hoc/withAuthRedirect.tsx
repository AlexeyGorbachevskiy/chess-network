import React from 'react';
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";


type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<any, any> {
        render() {
            if (!this.props.isAuth) {
                return <Redirect to={'/login'}/>
            }
            return <Component {...this.props}/>
        }
    }

    let ConnectedRedirectComponent = connect<MapStatePropsType, {}, {}, RootState>
    (mapStateToProps, {})(RedirectComponent);


    return ConnectedRedirectComponent
}


