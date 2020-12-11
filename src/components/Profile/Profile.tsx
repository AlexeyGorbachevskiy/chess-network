import React, {useEffect} from 'react';
import {compose} from 'redux';
import style from './Profile.module.css';
import kirill from '../../images/profile/kirill.jpg';
import a1 from '../../images/profile/1.jpg';
import a2 from '../../images/profile/2.jpg';
import a3 from '../../images/profile/3.jpg';
import dud from '../../images/profile/dud.jpg';
import harik from '../../images/profile/harik.jpg';

import Posts from "../Posts/Posts";
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {getAuthInfoThunkCreator, LoginDataType, setAuthUserDataAC} from "../../redux/authReducer";
import Preloader from "../Common/preloader/Preloader";
import {useParams} from "react-router";
import {getPlayersThunkCreator, setPlayersDataAC, setPreloaderAC} from "../../redux/playersReducer";
import {PostsDataType} from "../../redux/profileReducer";


function Profile() {

    const friendsData = useSelector<RootState, any>(state => state.friendsPage.friendsData);
    const loginData = useSelector<RootState, LoginDataType>(state => state.auth.data);
    const isLoading = useSelector<RootState, boolean>(state => state.auth.isLoading);
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const playersData = useSelector<RootState, LoginDataType[]>(state => state.playersPage.playersData);
    const {userId} = useParams();
    const dispatch=useDispatch()
    const targetUser = playersData.find((el) => el.id === +userId)

    useEffect(() => {
        dispatch(getPlayersThunkCreator(userId));
        return ()=>{
            dispatch(setPlayersDataAC(null,[]));
        }
    }, [dispatch,userId])


    if (!isAuth || !targetUser) {
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
                            background: `url('${'data:image/png;base64,' + targetUser.photo}') no-repeat center center`,
                            backgroundSize: 'cover'
                        }}
                        className={style.avatar}
                    />

                    <div className={style.write_msg_btn_wrapper}>
                        <button className={style.write_msg_btn}>Write message</button>
                    </div>


                    <div className={style.add_friend_btn_wrapper}>
                        <button className={style.add_friend_btn}>Follow</button>
                    </div>
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

                            <div className={style.friend_item_wrapper}>
                                <div
                                    style={{
                                        background: `url('${harik}') no-repeat center center`,
                                        backgroundSize: 'cover'
                                    }}
                                    className={style.friend_item_avatar}>
                                </div>

                                <div className={style.friend_item_name}>
                                    Harik
                                </div>
                            </div>

                            <div className={style.friend_item_wrapper}>
                                <div
                                    style={{
                                        background: `url('${a1}') no-repeat center center`,
                                        backgroundSize: 'cover'
                                    }}
                                    className={style.friend_item_avatar}>
                                </div>

                                <div className={style.friend_item_name}>
                                    Alexander
                                </div>
                            </div>

                        </div>


                        <div className={style.block_friends_list_row}>

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

                            <div className={style.friend_item_wrapper}>
                                <div
                                    style={{
                                        background: `url('${a3}') no-repeat center center`,
                                        backgroundSize: 'cover'
                                    }}
                                    className={style.friend_item_avatar}>
                                </div>

                                <div className={style.friend_item_name}>
                                    Dmitriy
                                </div>
                            </div>

                            <div className={style.friend_item_wrapper}>
                                <div
                                    style={{
                                        background: `url('${dud}') no-repeat center center`,
                                        backgroundSize: 'cover'
                                    }}
                                    className={style.friend_item_avatar}>
                                </div>

                                <div className={style.friend_item_name}>
                                    Yuriy
                                </div>
                            </div>

                        </div>


                    </div>
                </div>

            </div>

            <div className={style.column2_wrapper}>

                <div className={style.page_info_wrapper}>

                    <div className={style.page_top}>
                        <p className={style.fullName}>{targetUser.name + ' ' + targetUser.surname}</p>
                        <p className={style.isOnline}>Online</p>
                    </div>
                    <div className={style.main_info}>

                        <div className={style.info_row}>
                            <span className={style.info_key}>Birthday:</span>
                            <span className={style.info_prop}>{' ' + targetUser.birthday}</span>
                        </div>

                        <div className={style.info_row}>
                            <span className={style.info_key}>Current Location:</span>
                            <span
                                className={style.info_prop}>{' ' + targetUser.current_city + ', ' + targetUser.current_country}</span>
                        </div>

                        <div className={style.info_row}>
                            <span className={style.info_key}>Studied at:</span>
                            <span className={style.info_prop}>{' ' + targetUser.study_place}</span>
                        </div>


                        <div className={style.section_title_wrapper}>
                             <span className={style.section_title}>
                            Chess information
                            </span>
                        </div>


                        <div className={style.chess_info_section}>

                            <div className={style.info_row}>
                                <span className={style.info_key}>Level:</span>
                                <span className={style.info_prop}>{targetUser.chess_level}</span>
                            </div>

                            <div className={style.info_row}>
                                <span className={style.info_key}>FIDE rating:</span>
                                <span className={style.info_prop}>{targetUser.fide_rating}</span>
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
                                <span className={style.info_prop}>{targetUser.about}</span>
                            </div>
                            <div className={style.info_row}>
                                <span className={style.info_key}>My hobbies:</span>
                                <span className={style.info_prop}>{targetUser.hobbies}</span>
                            </div>
                        </div>

                    </div>

                </div>

                <Posts playersData={playersData} userId={userId} targetUser={targetUser}/>

            </div>


        </section>
    );
}

export default compose(
    withAuthRedirect,
)(Profile)
