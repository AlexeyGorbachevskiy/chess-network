import React, {ChangeEvent} from 'react';
import {WithRouterPropsType} from "../Profile/ProfileContainer";
import style from './Settings.module.css';


type ProfileSettingsPropsType = { isOwner: boolean, savePhoto: (file: any) => void,setEditMode:(editMode:boolean)=>void } & WithRouterPropsType

function ProfileSettings(props: ProfileSettingsPropsType) {


    return (
        <div className={style.profile_settings_area}>
            <h2>Profile Settings</h2>
            <div className={style.profile_settings}>
                <div className={style.ava_wrapper}>
                    <img className={style.ava}
                         src={
                             props.profile?.photos.large
                                 ?
                                 props.profile?.photos.large
                                 : process.env.PUBLIC_URL + '/img/default.png'
                         }
                         alt='Avatar'
                    />
                </div>


                <div className={style.data}>
                    <div className={style.data_header}>
                        <p> Full Name:
                            {props.profile?.fullName}
                        </p>
                    </div>
                    <div className={style.data_items}>
                        <div className={style.job_status}>
                            <p>Job search
                                status: {props.profile?.lookingForAJob ? 'yes' : 'no'}</p>
                        </div>

                        <div className={style.job_description}>
                            <p>My professional skills:
                                {props.profile?.lookingForAJobDescription}
                            </p>
                        </div>
                        <div className={style.aboutMe}>
                            <p>About me:
                                {props.profile?.aboutMe}
                            </p>
                        </div>

                        <div className={style.contacts}>
                            <h4>My contacts:</h4>
                            <p>Facebook:{props.profile?.contacts.facebook}</p>
                            <p>GitHub:{props.profile?.contacts.github}</p>
                            <p>Instagram:{props.profile?.contacts.instagram}</p>
                            <p>MainLink:{props.profile?.contacts.mainLink}</p>
                            <p>Twitter:{props.profile?.contacts.twitter}</p>
                            <p>VK:{props.profile?.contacts.vk}</p>
                            <p>WebSite:{props.profile?.contacts.website}</p>
                            <p>YouTube:{props.profile?.contacts.youtube}</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                props.isOwner &&
                <button className={style.edit_btn}
                        onClick={()=>props.setEditMode(true)}
                >
                    Edit
                </button>
            }

        </div>


    );
}


export default ProfileSettings;