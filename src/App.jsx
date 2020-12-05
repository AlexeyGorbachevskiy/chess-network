import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Redirect, Route} from "react-router";
import Profile from "./components/Profile/Profile";
import {Login} from "./components/Login/Login";
import {Register} from "./components/Register/Register";
import Play from "./components/Chess/Play";

export function App(){

        return (

            <div className='container'>
                <Header/>
                <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                <Route path='/profile/:userId?' render={() => <Profile/>}/>
                <Route path='/login' render={() => <Login/>}/>
                <Route path='/register' render={() => <Register/>}/>
                <Route path='/play-chess' render={() => <Play/>}/>
                {/*<Route path='/friends' render={() => <FriendsContainer/>}/>*/}
                {/*<Route path='/messages' render={() => <MessagesContainer/>}/>*/}
                {/*<Route path='/settings' render={() => <SettingsContainer/>}/>*/}
                {/*<Route path='/findFriends' render={() => <FindFriendsContainer/>}/>*/}
                {/*<Route path='/login' render={() => <Register/>}/>*/}
                {/*<Route path='/profile' component={Post}/>*/}
            </div>

        )
}


