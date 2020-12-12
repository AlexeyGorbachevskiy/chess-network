import React from 'react';
import style from './Friend.module.css';
import {useDispatch} from "react-redux";
import {unFollowFriendThunkCreator} from "../../../redux/friendsReducer";
import {NavLink} from "react-router-dom";


type FriendPropsType = {
    friendId: number | null
    name: string | null
    surname: string | null
    photo: string | null
    city: string | null
    country: string | null
    online: boolean
}

function Friend(props: FriendPropsType) {

    const dispatch = useDispatch();

    const unfollow = () => {
        dispatch(unFollowFriendThunkCreator(props.friendId!))
    }
    return (
        <div className={style.player}>
            <div className={style.player_item_wrapper}>
                <div className={style.player_info_wrapper}>

                    {
                        props.online ?
                            <NavLink to={`/profile/${props.friendId}`}>
                                <div className={style.player_avatar__online}
                                     style={{
                                         background: `url('${'data:image/png;base64,' + props.photo!}') no-repeat center center`,
                                         backgroundSize: 'cover'
                                     }}
                                />
                            </NavLink> :

                            <NavLink to={`/profile/${props.friendId}`}>
                                <div className={style.player_avatar}
                                     style={{
                                         background: `url('${'data:image/png;base64,' + props.photo!}') no-repeat center center`,
                                         backgroundSize: 'cover'
                                     }}
                                />
                            </NavLink>

                    }
                    <div className={style.blind_label}/>
                    <div className={style.player_info}>
                        <NavLink to={`/profile/${props.friendId}`} className={style.player_fullName}>
                            {props.name + ' ' + props.surname}
                        </NavLink>
                        <p className={style.player_location}>{props.city + ', ' + props.country}</p>
                        <p className={style.write_message_link}>Write message</p>
                    </div>

                </div>
                <div className={style.buttons_wrapper}>
                    <button onClick={unfollow} className={style.button}>Unfollow</button>
                </div>
            </div>
        </div>
    );
}

export default Friend;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
