import React from 'react';
import style from './NotYourMessage.module.css';
import avatar from "../../../../images/profile/harik.jpg";


function NotYourMessage() {

    return (
        <div className={style.notYourMessage}>
            <div className={style.message_info_wrapper}>

                <div className={style.player_avatar}
                     style={{
                         background: `url('${avatar}') no-repeat center center`,
                         backgroundSize: 'cover'
                     }}
                />

                <div className={style.message_info}>
                    <p className={style.player_fullName}>Harik Harlamov</p>
                    <p className={style.player_message}>Hello, I heard you famous chess player</p>
                </div>

            </div>
        </div>
    );
}

export default NotYourMessage;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
