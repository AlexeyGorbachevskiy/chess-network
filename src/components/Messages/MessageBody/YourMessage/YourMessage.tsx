import React from 'react';
import style from './YourMessage.module.css';
import avatar from "../../../../images/profile/saimon.jpg";



type YourMessage={
    id:number,
    date?:string,
    text:string
}

function YourMessage(props:YourMessage) {

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
                    <p className={style.player_fullName}>Semyon Shakhno</p>
                    <p className={style.player_message}>{props.text}</p>
                </div>

            </div>
        </div>
    );
}

export default YourMessage;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
