import React from 'react';
import style from './Friend.module.css';
import avatar from "../../../images/profile/kirill.jpg";


function Friend() {

    return (
        <div className={style.player}>
            <div className={style.player_item_wrapper}>
                <div className={style.player_info_wrapper}>

                    <div className={style.player_avatar}
                        style={{
                        background: `url('${avatar}') no-repeat center center`,
                        backgroundSize: 'cover'
                    }}
                        />

                    <div className={style.player_info}>
                        <p className={style.player_fullName}>Kirill Shakhno</p>
                        <p className={style.player_location}>Moscow, Russia</p>
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
