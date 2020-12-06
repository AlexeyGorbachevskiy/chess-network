import React from 'react';
import style from './FullNewComment.module.css';
import avatar from '../../../../images/profile/dud.jpg';


export type PostPropsType = {
    id:number,
    date: string,
    text: string,
    author:string,
    deleteComment: (id:number) => void
}


function FullNewComment(props: PostPropsType) {

    const deleteComment = () => {
        props.deleteComment(props.id)
    }

    return (
        <div className={style.post_wrapper}>

            <div className={style.post_header}>
                <div
                    style={{
                        background: `url('${avatar}') no-repeat center center`,
                        backgroundSize: 'cover'
                    }}
                    className={style.avatar}
                />
                <span className={style.blind_label}/>

                <div className={style.post_title_wrapper}>
                    <div className={style.post_title}>
                        {props.author}
                    </div>

                    <div className={style.post_date}>
                        {props.date}
                    </div>
                </div>

            </div>

            <div className={style.wall_post_text}>
                {props.text}
                <p onClick={deleteComment}  className={style.delete_btn}>Delete comment</p>
            </div>
        </div>
    );
}

export default FullNewComment;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
