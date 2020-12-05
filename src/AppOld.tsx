import React from 'react';
import './App.css';
import Nav from './oldComponents/NavBar/Nav';
import FriendsContainer from "./oldComponents/Friends/FriendsContainer";
import {HashRouter, Redirect, Route, withRouter} from 'react-router-dom';
import MessagesContainer from "./oldComponents/Messages/MessagesContainer";
import FindFriendsContainer from "./oldComponents/FindFriends/FindFriendsContainer";
import ProfileContainer from "./oldComponents/Profile/ProfileContainer";
import HeaderContainer from "./oldComponents/Header/HeaderContainer";
import Login from "./oldComponents/Login/Login";
import {connect, Provider} from "react-redux";
import store, {RootState} from "./redux/redux-store";
import {AuthReducerActionTypes} from "./redux/authReducer";
import {ThunkDispatch} from "redux-thunk";
import {compose} from "redux";
import {initializeAppThunkCreator} from "./redux/appReducer";
import Preloader from "./oldComponents/Common/Preloader/Preloader";
import SettingsContainer from "./oldComponents/Settings/SettingsContainer";

class App extends React.Component<MapDispatchPropsType & MapStatePropsType, {}> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (

            <div className='container'>
                <HeaderContainer/>
                <Nav/>
                <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                <Route path='/friends' render={() => <FriendsContainer/>}/>
                <Route path='/messages' render={() => <MessagesContainer/>}/>
                <Route path='/settings' render={() => <SettingsContainer/>}/>
                <Route path='/findFriends' render={() => <FindFriendsContainer/>}/>
                <Route path='/login' render={() => <Login/>}/>
                {/*<Route path='/profile' component={Post}/>*/}
            </div>

        );
    }
}

type MapStatePropsType = {
    initialized: boolean
}

const mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        initialized: state.app.initialized
    }
}


type MapDispatchPropsType = {
    initializeApp: () => void
}


const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, AuthReducerActionTypes>)
    : MapDispatchPropsType => {
    return {
        initializeApp: () => {
            dispatch(initializeAppThunkCreator())
        },
    }
}


let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>(mapStateToProps, mapDispatchToProps)
)(App)


export const Root: React.FC = () => {
    return (
        <HashRouter>
            <React.StrictMode>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
            </React.StrictMode>
        </HashRouter>
    )
}
