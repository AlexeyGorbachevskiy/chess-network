import React from 'react';
import style from './News.module.css';
import New from "./New/New";


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

export default News;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
