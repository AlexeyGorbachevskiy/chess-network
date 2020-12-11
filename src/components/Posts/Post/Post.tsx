import React from 'react';
import style from './Post.module.css';
import avatar from '../../../images/profile/saimon.jpg';
import {LoginDataType} from "../../../redux/authReducer";


export type PostPropsType = {
    id: number,
    date: string,
    text: string,
    deletePost: (id: number) => void
    targetUser: LoginDataType
    playersData: LoginDataType[]
    authorId: number | null
}


function Post(props: PostPropsType) {

    const authorData = props.playersData.find((el) => el.id === props.authorId)

    const deletePost = () => {
        props.deletePost(props.id)
    }

    return (
        <div className={style.post_wrapper}>

            <div className={style.post_header}>
                <div
                    style={{
                        background: `url('${'data:image/png;base64,' + authorData!.photo}') no-repeat center center`,
                        backgroundSize: 'cover'
                    }}
                    className={style.avatar}
                />
                <span className={style.blind_label}/>

                <div className={style.post_title_wrapper}>
                    <div className={style.post_title}>
                        {authorData!.name + ' ' + authorData!.surname}
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
