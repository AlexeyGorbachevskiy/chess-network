import React, {useEffect} from 'react';
import style from './Friends.module.css';
import Friend from "./Friend/Friend";
import {compose} from "redux";
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {getFriendsByIdThunkCreator, getFriendsThunkCreator, setFriendsDataAC} from "../../redux/friendsReducer";
import {RootState} from "../../redux/redux-store";
import {LoginDataType} from "../../redux/authReducer";
import Preloader from "../Common/preloader/Preloader";
import {useParams} from "react-router";


function Friends() {

    const isFetching = useSelector<RootState, boolean>(state => state.friendsPage.isFetching);
    const loggedUserId = useSelector<RootState, number | null>(state => state.auth.data.id);
    const friendsData = useSelector<RootState, LoginDataType[]>(state => state.friendsPage.friendsData);
    const dispatch = useDispatch();
    const {userId} = useParams();
    useEffect(() => {
        if(userId){
            dispatch(getFriendsByIdThunkCreator(userId));
        }
        else{
            dispatch(getFriendsThunkCreator());
        }
        return () => {
            dispatch(setFriendsDataAC([]))
        }
    }, [dispatch])


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
                    <span className={style.main_header__title}>Your Friends</span>
                    <span className={style.main_header__count}>{friendsData.filter((el)=>el.isFollowed).length}</span>
                </div>

                {
                    friendsData.filter((el)=>el.isFollowed).map((el: any, index: number) => {
                        return (
                            <Friend key={index}
                                    friendId={el.id}
                                    name={el.name}
                                    surname={el.surname}
                                    photo={el.photo}
                                    city={el.current_city}
                                    country={el.current_country}
                                    online={el.online}
                                    loggedUserId={loggedUserId}
                            />
                        )
                    })
                }
            </div>
        </section>
    );
}

export default compose(
    withAuthRedirect,
)(Friends)
