import React from 'react';
import style from './Message.module.css';
import avatar from "../../../images/profile/harik.jpg";
import {NavLink} from "react-router-dom";


function Message() {

    return (
        <NavLink className={style.message} to={`/messageBody/${1}`}>
            <div className={style.message_item_wrapper}>
                <div className={style.message_info_wrapper}>

                    <div className={style.player_avatar}
                        style={{
                        background: `url('${avatar}') no-repeat center center`,
                        backgroundSize: 'cover'
                    }}
                        />

                    <div className={style.message_info}>
                        <p className={style.player_fullName}>Harik Harlamov</p>
                        <p className={style.player_last_message}>Hello, I heard you famous chess player</p>
                    </div>

                </div>
            </div>
        </NavLink>
    );
}

export default Message;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
