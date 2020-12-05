import React from 'react';
import obj from './Post.module.css';
import {ProfileType} from "../../../../redux/profileReducer";

type PostPropsType = {
    message: string
    like: number
    profile: ProfileType | null
    removePost: (postId: string) => void
    postId: string
}

function Post(props: PostPropsType) {

    const onRemovePost = (postId: string) => {
        props.removePost(postId);
    }


    return (

        <div className={obj.old_posts}>

            <div className={obj.img_wrapper}>
                <img className={obj.ava} src={
                    props.profile?.photos.small ?
                        props.profile?.photos.small :
                        process.env.PUBLIC_URL + '/img/default.png'} alt='Avatar'
                />
            </div>

            <div className={obj.old_post_item}>
                <div className={obj.old_post_form}>
                    <div className={obj.user_name}><h4>Alexey Gorbachevskiy</h4></div>
                    <textarea value={props.message} readOnly className={obj.textarea}
                              rows={4} cols={60} id='new_post_text_area' name='new_post_text_area'/>
                    <div className={obj.buttons_wrapper}>
                        {/*<div className={obj.like}><p>Like: {props.like}</p></div>*/}

                        <div className={obj.extra_wrapper}>
                            {/*<button className={obj.change_button}*/}
                            {/*        value={'Edit'}><i className='fa fa-edit'/> Edit*/}
                            {/*</button>*/}
                            <button
                                onClick={()=>onRemovePost(props.postId)}
                                className={obj.remove_button}
                                value={'Remove'}><i className='fa fa-trash'/> Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Post;
