import React, {ChangeEvent} from 'react';
import style from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/profileReducer";
import ProfileStatus from './ProfileStatus'

type ProfileInfo = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto:(file:any)=>void
}

function ProfileInfo(props: ProfileInfo) {

    return (
        <div className={style.data_wrapper}>
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
                    <h2>
                        {props.profile?.fullName
                            .replace(props.profile?.fullName[0], props.profile?.fullName[0].toUpperCase())}
                    </h2>
                </div>
                <div className={style.data_items}>
                    <div className={style.status}>
                        <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                    </div>
                    <div className={style.job_status}>
                        <p>Job search
                            status: {props.profile?.lookingForAJob ? 'Looking for a job' : 'Indefined'}</p>
                    </div>
                    {
                        props.profile?.lookingForAJob ?
                            <div className={style.job_description}>
                                <p>My professional skills:
                                    {props.profile?.lookingForAJobDescription ?
                                        props.profile.lookingForAJobDescription :
                                        'JS, TS, React, Redux'}
                                </p>
                            </div>
                    : ''
                    }

                    <div className={style.contacts}>
                        <p>My
                            contacts: {props.profile?.contacts.twitter ? props.profile?.contacts.twitter : 'Oops.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ProfileInfo;
