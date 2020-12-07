import React from 'react';
import {compose} from 'redux';
import style from './Messages.module.css';
import Message from "./Message/Message";
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";


function Messages() {

    return (
        <section className={style.players}>
            <div className={style.main_wrapper}>
                <div className={style.main_header}>
                    <span className={style.main_header__title}>Your Dialogs</span>
                    <span className={style.main_header__count}>16</span>
                </div>

                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>
                <Message/>

            </div>
        </section>
    );
}


export default compose(
    withAuthRedirect,
)(Messages)
