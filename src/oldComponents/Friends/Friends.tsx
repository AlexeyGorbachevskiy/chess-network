import React from 'react';
import obj from './Friends.module.css';
import {UsersArrayType} from "../../redux/friendsReducer";
import FriendItem from "./FriendItem/FriendItem";


type FriendsPropsType = {
    users: Array<UsersArrayType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setFollowingInProgress: (isFollowingInProgress: boolean, userId: number) => void
    isFollowingInProgress: boolean
    followingInProgress: Array<number>
    followThunkCreator: (userId: number) => void
    unFollowThunkCreator: (userId: number) => void
}

function Friends(props: FriendsPropsType) {

    return (
        <div className={obj.friends_container}>
            <div className={obj.friends_list}>



                {props.users.filter(u => u.followed).map((t: UsersArrayType) => {
                    return (
                        <FriendItem
                            key={t.id}
                            users={t}
                            follow={props.follow}
                            unfollow={props.unfollow}
                            setFollowingInProgress={props.setFollowingInProgress}
                            isFollowingInProgress={props.isFollowingInProgress}
                            followingInProgress={props.followingInProgress}
                            followThunkCreator={props.followThunkCreator}
                            unFollowThunkCreator={props.unFollowThunkCreator}
                        />
                    )
                })}
            </div>
        </div>
    );
}


export default Friends;
