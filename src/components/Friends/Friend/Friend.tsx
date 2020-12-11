import React from 'react';
import style from './Friend.module.css';
import avatar from "../../../images/profile/kirill.jpg";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/redux-store";
import {LoginDataType} from "../../../redux/authReducer";



type FriendPropsType={
    name:string | null
    surname:string|null
    photo:string | null
    city:string | null
    country:string | null
}

function Friend(props:FriendPropsType) {


    return (
        <div className={style.player}>
            <div className={style.player_item_wrapper}>
                <div className={style.player_info_wrapper}>

                    <div className={style.player_avatar}
                        style={{
                        background: `url('${'data:image/png;base64,' + props.photo}') no-repeat center center`,
                        backgroundSize: 'cover'
                    }}
                        />

                    <div className={style.player_info}>
                        <p className={style.player_fullName}>{props.name+' '+ props.surname}</p>
                        <p className={style.player_location}>{props.city + ', '+ props.country}</p>
                        <p className={style.write_message_link}>Write message</p>
                    </div>

                </div>
                <div className={style.buttons_wrapper}>
                    <button className={style.button}>Unfollow</button>
                </div>
            </div>
        </div>
    );
}

export default Friend;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
