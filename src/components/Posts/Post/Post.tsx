import React from 'react';
import style from './Post.module.css';
import avatar from '../../../images/profile/saimon.jpg';


export type PostPropsType={
        date:string,
        text:string
}

function Post(props:PostPropsType) {

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
                            Semyon Shakhno
                        </div>

                        <div className={style.post_date}>
                            {props.date}
                        </div>
                    </div>

                </div>

                <div className={style.wall_post_text}>
                    {props.text}
                </div>
            </div>
    );
}

export default Post;
// export default compose(
//     withAuthRedirect,
// )(Post)
