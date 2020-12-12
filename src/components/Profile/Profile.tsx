import React, {useEffect} from 'react';
import {compose} from 'redux';
import style from './Profile.module.css';
import kirill from '../../images/profile/kirill.jpg';
import a2 from '../../images/profile/2.jpg';
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {LoginDataType} from "../../redux/authReducer";
import Preloader from "../Common/preloader/Preloader";
import {useParams} from "react-router";
import {
    getPlayersThunkCreator,
    getPlayerThunkCreator,
    setPlayerDataAC,
    setPlayersDataAC
} from "../../redux/playersReducer";
import {getPostsThunkCreator} from "../../redux/profileReducer";
import Posts from "../Posts/Posts";
import {getFriendsThunkCreator, setFriendsDataAC} from "../../redux/friendsReducer";
import {NavLink} from "react-router-dom";


function Profile() {

    const loginData = useSelector<RootState, LoginDataType>(state => state.auth.data);
    const friendsData = useSelector<RootState, any>(state => state.friendsPage.friendsData);
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const playerData = useSelector<RootState, LoginDataType>(state => state.playersPage.playerData);
    const playersData = useSelector<RootState, LoginDataType[]>(state => state.playersPage.playersData);
    const {userId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlayerThunkCreator(userId));
        dispatch(getPlayersThunkCreator(userId));
        dispatch(getPostsThunkCreator(userId))
        dispatch(getFriendsThunkCreator(userId));

        return () => {
            dispatch(setPlayerDataAC(null, {} as LoginDataType));
            dispatch(setPlayersDataAC(null, [] as LoginDataType[]));
            dispatch(setFriendsDataAC([]))
        }
    }, [dispatch, userId])


    if (!isAuth || !playerData.id || !playersData.length) {
        return (
            <div className="App"
                 style={{marginTop: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Preloader/>
            </div>
        )
    }


    return (
        <section className={style.profile}>

            <div className={style.column1_wrapper}>
                <div className={style.avatar_info_wrapper}>
                    <div
                        style={{
                            background: `url('${'data:image/png;base64,' + playerData.photo}') no-repeat center center`,
                            backgroundSize: 'contain'
                        }}
                        className={style.avatar}
                    />

                    {
                        loginData.id!==+userId ?
                            <>
                                <div className={style.write_msg_btn_wrapper}>
                                    <button className={style.write_msg_btn}>Write message</button>
                                </div>
                                <div className={style.add_friend_btn_wrapper}>
                                    <button className={style.add_friend_btn}>Follow</button>
                                </div>
                            </>
                            :
                            <div className={style.add_friend_btn_wrapper}>
                                <NavLink to={'/settings'}>
                                    <button className={style.add_friend_btn}>Edit Profile</button>
                                </NavLink>
                            </div>

                    }


                </div>

                <div className={style.friend_block}>
                    <div className={style.block_title}>
                        <div className={style.block_title_name}>
                            Friends
                        </div>
                        <div className={style.block_friends_count}>
                            {friendsData.length}
                        </div>
                    </div>

                    <div className={style.block_friends_list}>


                        <div className={style.block_friends_list_row}>
                            {
                                friendsData[0] &&
                                <div className={style.friend_item_wrapper}>
                                    <div
                                        style={{
                                            background: `url('${kirill}') no-repeat center center`,
                                            backgroundSize: 'cover'
                                        }}
                                        className={style.friend_item_avatar}>
                                    </div>

                                    <div className={style.friend_item_name}>
                                        Kirill
                                    </div>
                                </div>
                            }
                            {
                                friendsData[1] &&
                                <div className={style.friend_item_wrapper}>
                                    <div
                                        style={{
                                            background: `url('${kirill}') no-repeat center center`,
                                            backgroundSize: 'cover'
                                        }}
                                        className={style.friend_item_avatar}>
                                    </div>

                                    <div className={style.friend_item_name}>
                                        Kirill
                                    </div>
                                </div>
                            }
                            {
                                friendsData[2] &&
                                <div className={style.friend_item_wrapper}>
                                    <div
                                        style={{
                                            background: `url('${kirill}') no-repeat center center`,
                                            backgroundSize: 'cover'
                                        }}
                                        className={style.friend_item_avatar}>
                                    </div>

                                    <div className={style.friend_item_name}>
                                        Kirill
                                    </div>
                                </div>
                            }
                        </div>


                        <div className={style.block_friends_list_row}>

                            {
                                friendsData[3] &&
                                <div className={style.friend_item_wrapper}>
                                    <div
                                        style={{
                                            background: `url('${a2}') no-repeat center center`,
                                            backgroundSize: 'cover'
                                        }}
                                        className={style.friend_item_avatar}>
                                    </div>

                                    <div className={style.friend_item_name}>
                                        Vera
                                    </div>
                                </div>
                            }
                            {
                                friendsData[4] &&
                                <div className={style.friend_item_wrapper}>
                                    <div
                                        style={{
                                            background: `url('${a2}') no-repeat center center`,
                                            backgroundSize: 'cover'
                                        }}
                                        className={style.friend_item_avatar}>
                                    </div>

                                    <div className={style.friend_item_name}>
                                        Vera
                                    </div>
                                </div>
                            }

                            {
                                friendsData[5] &&
                                <div className={style.friend_item_wrapper}>
                                    <div
                                        style={{
                                            background: `url('${a2}') no-repeat center center`,
                                            backgroundSize: 'cover'
                                        }}
                                        className={style.friend_item_avatar}>
                                    </div>

                                    <div className={style.friend_item_name}>
                                        Vera
                                    </div>
                                </div>
                            }


                        </div>


                    </div>
                </div>

            </div>

            <div className={style.column2_wrapper}>

                <div className={style.page_info_wrapper}>

                    <div className={style.page_top}>
                        <p className={style.fullName}>{playerData.name + ' ' + playerData.surname}</p>
                        {
                            playerData.online && <p className={style.isOnline}>Online</p>
                        }
                    </div>
                    <div className={style.main_info}>

                        <div className={style.info_row}>
                            <span className={style.info_key}>Birthday:</span>
                            <span className={style.info_prop}>{' ' + playerData.birthday}</span>
                        </div>

                        <div className={style.info_row}>
                            <span className={style.info_key}>Current Location:</span>
                            <span
                                className={style.info_prop}>{' ' + playerData.current_city + ', ' + playerData.current_country}</span>
                        </div>

                        <div className={style.info_row}>
                            <span className={style.info_key}>Studied at:</span>
                            <span className={style.info_prop}>{' ' + playerData.study_place}</span>
                        </div>


                        <div className={style.section_title_wrapper}>
                             <span className={style.section_title}>
                            Chess information
                            </span>
                        </div>


                        <div className={style.chess_info_section}>

                            <div className={style.info_row}>
                                <span className={style.info_key}>Level:</span>
                                <span className={style.info_prop}>{playerData.chess_level}</span>
                            </div>

                            <div className={style.info_row}>
                                <span className={style.info_key}>FIDE rating:</span>
                                <span className={style.info_prop}>{playerData.fide_rating}</span>
                            </div>

                        </div>


                        <div className={style.section_title_wrapper}>
                             <span className={style.section_title}>
                            Personal information
                            </span>
                        </div>

                        <div className={style.chess_info_section}>
                            <div className={style.info_row}>
                                <span className={style.info_key}>About me:</span>
                                <span className={style.info_prop}>{playerData.about}</span>
                            </div>
                            <div className={style.info_row}>
                                <span className={style.info_key}>My hobbies:</span>
                                <span className={style.info_prop}>{playerData.hobbies}</span>
                            </div>
                            <div className={style.info_row}>
                                <span className={style.info_key}>Email:</span>
                                <span className={style.info_prop}>{playerData.email}</span>
                            </div>
                        </div>

                    </div>

                </div>

                <Posts playersData={playersData} playerData={playerData} userId={userId}/>

            </div>


        </section>
    );
}

export default compose(
    withAuthRedirect,
)(Profile)
