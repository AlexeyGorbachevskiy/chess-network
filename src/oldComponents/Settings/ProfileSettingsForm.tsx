import React, {ChangeEvent} from 'react';
import {WithRouterPropsType} from "../Profile/ProfileContainer";
import style from './Settings.module.css';
import {ProfileSettingsInput} from "../Common/FormsControls/FormsControls";
import {Field, reduxForm} from "redux-form";


type ProfileSettingsFormPropsType = { isOwner: boolean, savePhoto: (file: any) => void } & WithRouterPropsType

function ProfileSettingsForm(props: any) {

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files!.length) {
            props.savePhoto(e.target.files![0])
        }
    }

    return (
        <div className={style.profile_settings_area}>
            <h2>Profile Settings</h2>
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

                {
                    props.isOwner &&
                    <input
                        className={style.choose_img}
                        type={'file'}
                        onChange={onMainPhotoSelected}
                    />
                }
            </div>
            <form className={style.profile_settings} onSubmit={props.handleSubmit}>

                <div className={style.data}>
                    <div className={style.data_header}>
                        <p> Full Name:
                            {/*{props.profile?.fullName}*/}
                            <Field name={'fullName'}
                                   className={style.input}
                                   placeholder='Full name' component={ProfileSettingsInput}
                                   type="text"
                            />
                        </p>
                    </div>
                    <div className={style.data_items}>
                        <div className={style.job_status}>
                            <p>Job search status:
                                {/*{props.profile?.lookingForAJob ? 'yes' : 'no'}*/}
                                <Field name={'lookingForAJob'}
                                       className={style.input}
                                       placeholder='Job search status' component={ProfileSettingsInput}
                                       type="checkbox"
                                />
                            </p>
                        </div>

                        <div className={style.job_description}>
                            <p>My professional skills:
                                {/*{props.profile?.lookingForAJobDescription}*/}
                                <Field name={'lookingForAJobDescription'}
                                       className={style.input}
                                       placeholder='My professional skills' component={ProfileSettingsInput}
                                       type="text"
                                />
                            </p>
                        </div>
                        <div className={style.aboutMe}>
                            <p>About me:
                                {/*{props.profile?.lookingForAJobDescription}*/}
                                <Field name={'aboutMe'}
                                       className={style.input}
                                       placeholder='about me' component={ProfileSettingsInput}
                                       type="text"
                                />
                            </p>
                        </div>

                        <div className={style.contacts}>
                            <h4>My contacts:</h4>
                            <p>Facebook:
                                {/*{props.profile?.contacts.facebook}*/}
                                <Field name={'contacts.facebook'}
                                       className={style.input}
                                       placeholder='Facebook' component={ProfileSettingsInput}
                                       type="text"
                                />
                            </p>
                            <p>GitHub:
                                {/*{props.profile?.contacts.github}*/}
                                <Field name={'contacts.github'}
                                       className={style.input}
                                       placeholder='Github' component={ProfileSettingsInput}
                                       type="text"
                                />
                            </p>
                            <p>Instagram:
                                {/*{props.profile?.contacts.instagram}*/}
                                <Field name={'contacts.instagram'}
                                       className={style.input}
                                       placeholder='Instagram' component={ProfileSettingsInput}
                                       type="text"
                                />
                            </p>
                            <p>MainLink:
                                {/*{props.profile?.contacts.mainLink}*/}
                                <Field name={'contacts.mainLink'}
                                       className={style.input}
                                       placeholder='MainLink' component={ProfileSettingsInput}
                                       type="text"
                                />
                            </p>
                            <p>Twitter:
                                {/*{props.profile?.contacts.twitter}*/}
                                <Field name={'contacts.twitter'}
                                       className={style.input}
                                       placeholder='Twitter' component={ProfileSettingsInput}
                                       type="text"
                                />
                            </p>
                            <p>VK:
                                {/*{props.profile?.contacts.vk}*/}
                                <Field name={'contacts.vk'}
                                       className={style.input}
                                       placeholder='VK' component={ProfileSettingsInput}
                                       type="text"
                                />
                            </p>
                            <p>WebSite:
                                {/*{props.profile?.contacts.website}*/}
                                <Field name={'contacts.website'}
                                       className={style.input}
                                       placeholder='Website' component={ProfileSettingsInput}
                                       type="text"
                                />
                            </p>
                            <p>YouTube:
                                {/*{props.profile?.contacts.youtube}*/}
                                <Field name={'contacts.youtube'}
                                       className={style.input}
                                       placeholder='Youtube' component={ProfileSettingsInput}
                                       type="text"
                                />
                            </p>
                        </div>
                    </div>
                </div>
                <button className={style.edit_btn}>Save</button>
                {
                    props.error &&
                <div className={style.error}>{props.error}</div>
                }
            </form>

        </div>


    );
}

const ProfileSettingsReduxForm: any = reduxForm({form: 'profileSettings'})(ProfileSettingsForm)

export default ProfileSettingsReduxForm;