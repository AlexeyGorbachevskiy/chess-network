import React from 'react';
import obj from './FriendItem.module.css';
import {NavLink} from 'react-router-dom';
import {UsersArrayType} from "../../../redux/friendsReducer";

type PhotosType = {
    small: string
    large: string
}


type FriendItemPropsType = {
    users: UsersArrayType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setFollowingInProgress: (isFollowingInProgress: boolean, userId: number) => void
    isFollowingInProgress: boolean
    followingInProgress: Array<number>
    followThunkCreator:(userId:number)=>void
    unFollowThunkCreator:(userId:number)=>void
}


function FriendItem(props: FriendItemPropsType) {

    const onUnfollow = () => {
        props.unFollowThunkCreator(props.users.id);
    }

    return (
        <div className={obj.friend_item_container}>
            <div className={obj.img_wrapper}>
                <NavLink to='#' className={obj.link}>
                    <img className={obj.ava}
                         src={props.users.photos.small !== null ? process.env.PUBLIC_URL+props.users.photos.small : process.env.PUBLIC_URL+'/img/default.png'}
                         alt='Avatar'/>
                </NavLink>
            </div>
            <div className={obj.info_wrapper}>
                <div className={obj.name}>
                    <NavLink to="#" className={obj.link}>
                        <h2>{props.users.name}</h2>
                    </NavLink>
                </div>
                <p className={obj.to_messages}><NavLink to='#' className={obj.link}>Write message
                </NavLink></p>

            </div>
            <div className={obj.follow_wrapper}>
                {/*<p className={obj.location}>{`${props.users.location.city}, ${props.users.location.country}`}</p>*/}

                {props.users.followed ?
                    <button
                        disabled={props.followingInProgress.some(id => id === props.users.id)}
                        onClick={onUnfollow}
                        className={obj.unfollow_btn}>Unfollow
                    </button>
                    :
                    ''
                }
            </div>
        </div>
    );
}

export default FriendItem;
