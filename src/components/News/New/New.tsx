import React from 'react';
import style from './New.module.css';
import avatar from "../../../images/news/1.jpg";
import {NavLink} from "react-router-dom";


function New() {

    return (
        <div className={style.new}>
            <div className={style.new_item_wrapper}>


                <NavLink className={style.new_avatar}
                         to={`/news/${1}`}
                     style={{
                         background: `url('${avatar}') no-repeat center center`,
                         backgroundSize: 'cover'
                     }}>
                    <div className={style.new_avatar_blackout}>

                    </div>
                </NavLink>


                <div className={style.new_description_wrapper}>
                    <NavLink to={`/news/${1}`} className={style.new_sub_title}>Events panorama</NavLink>
                    <NavLink className={style.new_title} to={`/news/${1}`}>Не повторит ли Непомнящий путь Карякина?</NavLink>
                    <div className={style.new_brief_description}>
                        Турнир претендентов, проходящий в эти дни в Екатеринбурге, подходит к своему экватору, и уже...
                    </div>

                </div>

            </div>
        </div>
    );
}

export default New;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
