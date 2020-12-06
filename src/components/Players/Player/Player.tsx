import React from 'react';
import style from './Player.module.css';
import avatar from "../../../images/profile/vodonaeva.jpg";


function Player() {

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
                        <p className={style.player_fullName}>Alyona Vodonaeva</p>
                        <p className={style.player_location}>Moscow, Russia</p>
                        <p className={style.player_rating}>FIDE: 2000</p>
                    </div>

                </div>
                <div className={style.buttons_wrapper}>
                    <button className={style.button}>Follow</button>
                    <button className={style.button}>Write message</button>
                </div>
            </div>
        </div>
    );
}

export default Player;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
