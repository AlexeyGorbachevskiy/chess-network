import React from 'react';
import style from './FullNewComment.module.css';
import {NavLink} from "react-router-dom";


export type PostPropsType = {
    id: number,
    date: string,
    text: string,
    authorId: number,
    deleteComment: (id: number) => void
    name: string
    surname: string
    photo: string
}


function FullNewComment(props: PostPropsType) {


    const deleteComment = () => {
        props.deleteComment(props.id)
    }

    return (
        <div className={style.post_wrapper}>

            <div className={style.post_header}>
                <NavLink to={`/profile/${props.authorId}`}>
                    <div
                        style={{
                            background: `url('${props.photo}') no-repeat center center`,
                            backgroundSize: 'cover'
                        }}
                        className={style.avatar}
                    />
                </NavLink>
                <span className={style.blind_label}/>

                <div className={style.post_title_wrapper}>
                    <NavLink to={`/profile/${props.authorId}`} className={style.post_title}>
                        <div className={style.post_title}>
                            {props.name + ' ' + props.surname}
                        </div>
                    </NavLink>

                    <div className={style.post_date}>
                        {props.date}
                    </div>
                </div>

            </div>

            <div className={style.wall_post_text}>
                {props.text}
                <p onClick={deleteComment} className={style.delete_btn}>Delete comment</p>
            </div>
        </div>
    );
}

export default FullNewComment;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
