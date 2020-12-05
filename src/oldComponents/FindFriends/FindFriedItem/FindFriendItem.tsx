import React from 'react';
import obj from './FindFriendItem.module.css';
import {NavLink} from 'react-router-dom';
import { UsersArrayType} from "../../../redux/friendsReducer";


type FriendItemType = {
    users: UsersArrayType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setFollowingInProgress: (isFollowingInProgress: boolean, userId: number) => void
    isFollowingInProgress: boolean
    followingInProgress: Array<number>
    followThunkCreator:(userId:number)=>void
    unFollowThunkCreator:(userId:number)=>void
}


function FindFriendItem(props: FriendItemType) {

    const onFollow = () => {
        props.followThunkCreator(props.users.id);
    }
    const onUnfollow = () => {
        props.unFollowThunkCreator(props.users.id);
    }
    return (
        <div className={obj.friend_item_container}>
            <div className={obj.img_wrapper}>
                <NavLink to={'/profile/' + props.users.id} className={obj.link}>
                    <img className={obj.ava}
                         src={props.users.photos.small ? props.users.photos.small : process.env.PUBLIC_URL + '/img/default.png'}
                         alt='Avatar'/>
                </NavLink>
            </div>
            <div className={obj.info_grid}>
                <div className={obj.info_wrapper}>
                    <div className={obj.name}>
                        <NavLink to={'/profile/' + props.users.id} className={obj.link}>
                            <h2>{`${props.users.name}`}</h2>
                        </NavLink>
                        {/*<p className={obj.age}>&nbsp; {`${props.users.age} years old`}</p>*/}
                    </div>
                    <p className={obj.status}>{props.users.status ? props.users.status : 'What\'s cooking, good looking?'}</p>
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
                        <button
                            disabled={props.followingInProgress.some(id => id === props.users.id)}
                            onClick={onFollow}
                            className={obj.follow_btn}>Follow
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default FindFriendItem;
