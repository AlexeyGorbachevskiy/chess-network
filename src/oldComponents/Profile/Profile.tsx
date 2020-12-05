import React from 'react';
import obj from './Profile.module.css';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {WithRouterPropsType} from "./ProfileContainer";
import Preloader from "../Common/Preloader/Preloader";


type ProfilePropsType = { isOwner: boolean, savePhoto:(file:any)=>void } & WithRouterPropsType

function Profile(props: ProfilePropsType) {
    if (!props.profile) {
        return (
            <div className={obj.preloader_wrapper}>
                <Preloader/>
            </div>
        )
    }
    if ((props.profile) && (props.match.params.userId)) {
        if (parseInt(props.match.params.userId) !== props.profile.userId) {
            return (
                <div className={obj.preloader_wrapper}>
                    <Preloader/>
                </div>
            )
        }
    }
    return (
        <div className={obj.content}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
            />
            <MyPostsContainer/>
        </div>
    );
}


export default Profile;