import React from 'react';
import {compose} from 'redux';
import style from './Message.module.css';
import {NavLink} from "react-router-dom";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";


type MessagePropsType = {
    dialogId: number
    name: string
    surname: string
    photo: string
    text: string
    anotherUserId: number
}

function Message(props: MessagePropsType) {

    return (
        <NavLink className={style.message} to={`/messageBody/${props.anotherUserId}`}>
            <div className={style.message_item_wrapper}>
                <div className={style.message_info_wrapper}>

                    <div className={style.player_avatar}
                         style={{
                             background: `url('${props.photo}') no-repeat center center`,
                             backgroundSize: 'cover'
                         }}
                    />

                    <div className={style.message_info}>
                        <p className={style.player_fullName}>{props.name+' '+ props.surname}</p>
                        <p className={style.player_last_message}>{props.text}</p>
                    </div>

                </div>
            </div>
        </NavLink>
    );
}


export default compose(
    withAuthRedirect,
)(Message)
