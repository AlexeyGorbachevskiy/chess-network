import React from 'react';
import style from './Post.module.css';
import avatar from '../../../images/profile/saimon.jpg';
import {LoginDataType} from "../../../redux/authReducer";


export type PostPropsType = {
    id:number,
    date: string,
    text: string,
    deletePost: (id:number) => void
    loginData:LoginDataType
}


function Post(props: PostPropsType) {

    const deletePost = () => {
        props.deletePost(props.id)
    }

    return (
        <div className={style.post_wrapper}>

            <div className={style.post_header}>
                <div
                    style={{
                        background: `url('${'data:image/png;base64,' + props.loginData.photo!}') no-repeat center center`,
                        backgroundSize: 'cover'
                    }}
                    className={style.avatar}
                />
                <span className={style.blind_label}/>

                <div className={style.post_title_wrapper}>
                    <div className={style.post_title}>
                        {props.loginData.name+' '+props.loginData.surname}
                    </div>

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

export default Post;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
