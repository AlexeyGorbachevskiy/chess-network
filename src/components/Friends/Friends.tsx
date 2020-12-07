import React from 'react';
import style from './Friends.module.css';
import Friend from "./Friend/Friend";
import {compose} from "redux";
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";


function Friends() {

    return (
        <section className={style.players}>
            <div className={style.main_wrapper}>
                <div className={style.main_header}>
                    <span className={style.main_header__title}>Your Friends</span>
                    <span className={style.main_header__count}>12</span>
                </div>

                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>
                <Friend/>

            </div>
        </section>
    );
}

export default compose(
    withAuthRedirect,
)(Friends)
