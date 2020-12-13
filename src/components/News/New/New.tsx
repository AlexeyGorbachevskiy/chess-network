import React from 'react';
import style from './New.module.css';
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";


type NewsPropsType = {
    id: number
    title: string
    summary: string
    text: string
    photo: string
}

function New(props: NewsPropsType) {

    return (
        <div className={style.new}>
            <div className={style.new_item_wrapper}>


                <NavLink className={style.new_avatar}
                         to={`/news/${props.id}`}
                         style={{
                             background: `url('${props.photo}') no-repeat center center`,
                             backgroundSize: 'cover'
                         }}>
                    <div className={style.new_avatar_blackout}>

                    </div>
                </NavLink>


                <div className={style.new_description_wrapper}>
                    <NavLink to={`/news/${props.id}`} className={style.new_sub_title}>Events panorama</NavLink>
                    <NavLink className={style.new_title} to={`/news/${1}`}>
                        {props.title}
                    </NavLink>
                    <div className={style.new_brief_description}>
                        {props.summary.slice(0,90)}...
                    </div>

                </div>

            </div>
        </div>
    );
}

export default compose(
    withAuthRedirect,
)(New);
