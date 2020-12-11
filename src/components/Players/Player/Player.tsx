import React from 'react';
import style from './Player.module.css';
import {compose} from "redux";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {followThunkCreator} from "../../../redux/playersReducer";


type PlayerPropsType = {
    id: number | null
    name: string | null
    surname: string | null
    photo: string | null
    city: string | null
    country: string | null
    fide: number | null
}

function Player(props: PlayerPropsType) {


    const dispatch = useDispatch()
    const follow = () => {
        dispatch(followThunkCreator(props.id!))
    }

    return (
        <div className={style.player}>
            <div className={style.player_item_wrapper}>
                <div className={style.player_info_wrapper}>

                    <NavLink to={`/profile/${props.id}`}>
                        <div className={style.player_avatar}
                             style={{
                                 background: `url('${'data:image/png;base64,' + props.photo!}') no-repeat center center`,
                                 backgroundSize: 'cover'
                             }}
                        />
                    </NavLink>

                    <div className={style.player_info}>
                        <NavLink to={`/profile/${props.id}`}
                                 className={style.player_fullName}>{props.name + ' ' + props.surname}</NavLink>
                        <p className={style.player_location}>{props.city + ' ' + props.country}</p>
                        <p className={style.player_rating}>FIDE: {props.fide}</p>
                    </div>

                </div>
                <div className={style.buttons_wrapper}>
                    <button onClick={follow} className={true ? style.button : style.unfollow_button}>Follow</button>
                    <button className={style.button}>Write message</button>
                </div>
            </div>
        </div>
    );
}

export default compose(
    withAuthRedirect,
)(Player)
