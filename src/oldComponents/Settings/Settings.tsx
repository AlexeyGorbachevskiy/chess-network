import React, {useState} from 'react';
import {WithRouterPropsType} from "../Profile/ProfileContainer";
import style from './Settings.module.css';
import ProfileSettings from "./ProfileSettings";
import ProfileSettingsForm from "./ProfileSettingsForm";


type SettingsPropsType =
    { isOwner: boolean, savePhoto: (file: any) => void, saveProfile: (formData: any) => any }
    & WithRouterPropsType

function Settings(props: SettingsPropsType) {

    const [editMode, setEditMode] = useState(false);

    const onSubmit = (formData: any) => {
        props.saveProfile(formData)
            .then(()=>{
                setEditMode(false);
            })



    }
    const profile = props.profile

    return (
        <div className={style.settings_container}>
            {
                editMode
                    ? <ProfileSettingsForm {...props} onSubmit={onSubmit} initialValues={profile}/>
                    : <ProfileSettings {...props} setEditMode={setEditMode}/>
            }

        </div>

    );
}


export default Settings;