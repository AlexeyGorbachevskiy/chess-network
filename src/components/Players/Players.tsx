import React, {useEffect} from 'react';
import {compose} from 'redux';
import style from './Players.module.css';
import Player from "./Player/Player";
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {getPlayersThunkCreator, setPlayersDataAC} from "../../redux/playersReducer";
import {LoginDataType} from "../../redux/authReducer";
import Preloader from "../Common/preloader/Preloader";


function Players() {
    const dispatch = useDispatch();
    const userId = useSelector<RootState, number | null>(state => state.auth.data.id);
    const playersData = useSelector<RootState, LoginDataType[]>(state => state.playersPage.playersData);
    const isFetching = useSelector<RootState, boolean>(state => state.playersPage.isFetching);
    const loginData = useSelector<RootState, LoginDataType>(state => state.auth.data);
    useEffect(() => {
        dispatch(getPlayersThunkCreator(userId));
        return () => {
            dispatch(setPlayersDataAC(userId, []));
        }
    }, [dispatch,userId])


    if (isFetching) {
        return (
            <div className="App"
                 style={{marginTop: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Preloader/>
            </div>
        )
    }

    return (
        <section className={style.players}>
            <div className={style.main_wrapper}>
                <div className={style.main_header}>
                    <span className={style.main_header__title}>Players</span>
                    <span
                        className={style.main_header__count}>{playersData.length > 0 ? playersData.length - 1 : 0}</span>
                </div>
                {
                    playersData.filter((el) => el.id !== loginData.id).map((el, index) => {
                        return <Player key={index} id={el.id} name={el.name} surname={el.surname} photo={el.photo}
                                       city={el.current_city} country={el.current_country} fide={el.fide_rating}/>
                    })
                }
            </div>
        </section>
    );
}


export default compose(
    withAuthRedirect,
)(Players)
