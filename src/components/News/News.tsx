import React from 'react';
import {compose} from 'redux';
import style from './News.module.css';
import New from "./New/New";
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";


function News() {

    return (
        <section className={style.news}>
            <div className={style.main_header}>
                <span className={style.main_header__title}>News</span>
                <span className={style.main_header__count}>20</span>
            </div>
            <div  className={style.main_wrapper}>

                <New/>
                <New/>
                <New/>
                <New/>
                <New/>
                <New/>
                <New/>
                <New/>
                <New/>
                <New/>
                <New/>
                <New/>
                <New/>
                <New/>
                <New/>
                <New/>

            </div>
        </section>
    );
}

export default compose(
    withAuthRedirect,
)(News)
