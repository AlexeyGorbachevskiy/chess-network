import React from 'react';
import {compose} from 'redux';
import style from './Post.module.css';
import {LoginDataType} from "../../../redux/authReducer";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";
import {NavLink} from "react-router-dom";


export type PostPropsType = {
    id: number,
    date: string,
    text: string,
    deletePost: (id: number) => void
    playerData: LoginDataType
    playersData: LoginDataType[]
    authorId: number | null
}


function Post(props: PostPropsType) {
    const authorData = props.playersData.find((el) => el.id === props.authorId);

    const deletePost = () => {
        props.deletePost(props.id)
    }

    return (
        <div className={style.post_wrapper}>

            <div className={style.post_header}>

                <NavLink to={`/profile/${props.authorId}`}>
                    <div
                        style={{
                            background: `url('${authorData!.photo}') no-repeat center center`,
                            backgroundSize: 'cover'
                        }}
                        className={authorData!.online ? style.avatar__online : style.avatar}
                    />
                </NavLink>
                <div className={style.blind_label}/>

                <div className={style.post_title_wrapper}>
                    <NavLink to={`/profile/${props.authorId}`} className={style.post_title}>
                        <div className={style.post_title}>
                            {authorData!.name + ' ' + authorData!.surname}
                        </div>
                    </NavLink>

                    <div className={style.post_date}>
                        {props.date}
                    </div>
                </div>

            </div>

            <div className={style.wall_post_text}>
                {props.text}
                <p onClick={deletePost} className={style.delete_btn}>Delete post</p>
            </div>
        </div>
    );
}


export default compose(
    withAuthRedirect,
)(Post)
