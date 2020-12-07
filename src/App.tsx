import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Redirect, Route} from "react-router";
import Profile from "./components/Profile/Profile";
import {Login} from "./components/Login/Login";
import {Register} from "./components/Register/Register";
import Play from "./components/Chess/Play";
import Players from "./components/Players/Players";
import Friends from "./components/Friends/Friends";
import News from "./components/News/News";
import FullNew from "./components/News/FullNew/FullNew";
import Messages from "./components/Messages/Messages";
import MessageBody from "./components/Messages/MessageBody/MessageBody";
import {useDispatch, useSelector} from "react-redux";
import {getAuthInfoThunkCreator, initializedSuccessAC} from "./redux/authReducer";
import {RootState} from "./redux/redux-store";
import Preloader from "./components/Common/preloader/Preloader";

export function App() {

    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const initialized = useSelector<RootState, boolean>(state => state.app.initialized);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isAuth) {
            dispatch(getAuthInfoThunkCreator())
        }

    }, []);


    if (!initialized) {
        return (
            <div className="App" style={{marginTop:'220px',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Preloader/>
            </div>
        )
    }

    return (
        <div className='container'>
            <Header/>
            <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
            <Route path='/profile/:userId?' render={() => <Profile/>}/>
            <Route path='/login' render={() => <Login/>}/>
            <Route path='/register' render={() => <Register/>}/>
            <Route path='/play-chess' render={() => <Play/>}/>
            <Route path='/players' render={() => <Players/>}/>
            <Route path='/friends' render={() => <Friends/>}/>
            <Route exact path='/news' render={() => <News/>}/>
            <Route path='/news/:id' render={() => <FullNew/>}/>
            <Route exact path='/messages' render={() => <Messages/>}/>
            <Route path='/messageBody/:id' render={() => <MessageBody/>}/>

        </div>

    )
}


