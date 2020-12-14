import React from 'react';
import style from './YourMessage.module.css';
import avatar from "../../../../images/profile/harik.jpg";
import {NavLink} from "react-router-dom";


type YourMessage = {
    loggedUserId: number | null
    receiverPhoto: string
    senderPhoto: string
    userId: number,
    date: string,
    text: string
    name: string
    surname: string
}

function YourMessage(props: YourMessage) {

    return (
        <div className={style.notYourMessage}>
            <div className={style.message_info_wrapper}>

                <NavLink to={`/profile/${props.userId}`}>
                    <div className={style.player_avatar}
                         style={props.userId === props.loggedUserId ? {
                             background: `url('${props.senderPhoto}') no-repeat center center`,
                             backgroundSize: 'cover'
                         } : {
                             background: `url('${props.receiverPhoto}') no-repeat center center`,
                             backgroundSize: 'cover'
                         }}
                    />
                </NavLink>

                <div className={style.message_info}>
                    <div className={style.message_title_wrapper}>
                        <div className={style.player_fullName}>
                            <NavLink to={`/profile/${props.userId}`} className={style.player_fullName}>
                                <span>{props.name + ' ' + props.surname}</span>
                            </NavLink>
                        </div>
                        <div className={style.date}>{props.date}</div>
                    </div>

                    <p className={style.player_message}>{props.text}</p>
                </div>
            </div>
            {/*<div className={style.date}>{props.date}</div>*/}
        </div>
    );
}

export default YourMessage;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
