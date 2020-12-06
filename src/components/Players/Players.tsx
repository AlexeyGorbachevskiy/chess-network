import React from 'react';
import style from './Players.module.css';
import Player from "./Player/Player";


function Players() {

    return (
        <section className={style.players}>
            <div className={style.main_wrapper}>
                <div className={style.main_header}>
                    <span className={style.main_header__title}>Players</span>
                    <span className={style.main_header__count}>46</span>
                </div>

                <Player/>
                <Player/>
                <Player/>
                <Player/>
                <Player/>
                <Player/>
                <Player/>
                <Player/>
                <Player/>
                <Player/>
                <Player/>
                <Player/>
                <Player/>
                <Player/>
                <Player/>
                <Player/>

            </div>
        </section>
    );
}

export default Players;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
