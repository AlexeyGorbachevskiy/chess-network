import React from 'react';
import style from './Player.module.css';
import {compose} from "redux";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {followThunkCreator, unFollowThunkCreator} from "../../../redux/playersReducer";


type PlayerPropsType = {
    id: number | null
    name: string | null
    surname: string | null
    photo: string | null
    city: string | null
    country: string | null
    fide: number | null
    isFollowed: boolean
    online: boolean
}

function Player(props: PlayerPropsType) {

    const dispatch = useDispatch()
    const follow = () => {
        dispatch(followThunkCreator(props.id!))
    }
    const unfollow = () => {
        dispatch(unFollowThunkCreator(props.id!))
    }


    return (
        <div className={style.player}>
            <div className={style.player_item_wrapper}>
                <div className={style.player_info_wrapper}>


                    {
                        props.online ?
                            <NavLink to={`/profile/${props.id}`}>
                                <div className={style.player_avatar__online}
                                     style={{
                                         background: `url('${props.photo!}') no-repeat center center`,
                                         backgroundSize: 'cover'
                                     }}
                                />
                            </NavLink> :

                            <NavLink to={`/profile/${props.id}`}>
                                <div className={style.player_avatar}
                                     style={{
                                         background: `url('${props.photo!}') no-repeat center center`,
                                         backgroundSize: 'cover'
                                     }}
                                />
                            </NavLink>

                    }
                    <div className={style.blind_label}/>

                    <div className={style.player_info}>
                        <NavLink to={`/profile/${props.id}`}
                                 className={style.player_fullName}>{props.name + ' ' + props.surname}</NavLink>
                        <p className={style.player_location}>{props.city + ' ' + props.country}</p>
                        <p className={style.player_rating}>FIDE: {props.fide}</p>
                    </div>

                </div>
                <div className={style.buttons_wrapper}>
                    <button onClick={props.isFollowed ? unfollow : follow}
                            className={props.isFollowed ? style.unfollow_button : style.button}>
                        {
                            props.isFollowed ?
                                'Unfollow' :
                                'Follow'
                        }
                    </button>
                    <NavLink to={`/messageBody/${props.id}`}>
                        <button className={style.button}>Write message</button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default compose(
    withAuthRedirect,
)(Player)
