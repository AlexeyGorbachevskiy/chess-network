import React from 'react';
import obj from './MyPosts.module.css';
import Post from './Post/Post';
import {AddNewPostFormRedux} from "./AddNewPostForm";
import {PostDataArray, ProfileType} from "../../../redux/profileReducer";


export type MyPostsPropsType = {
    postData: Array<PostDataArray>
    newPostText: string
    addPost: (newPostText: string) => void
    removePost: (postId: string) => void
    profile: ProfileType | null
}

const MyPosts = React.memo((props: MyPostsPropsType) => {

    let postElements = props.postData.map((t: PostDataArray) => {
        return <Post postId={t.id} removePost={props.removePost} profile={props.profile} key={t.id} message={t.message} like={t.like}/>
    });


    const onAddPost = (values: any) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={obj.posts}>
            <div className={obj.new_post}>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <AddNewPostFormRedux onSubmit={onAddPost}/>
                {/*<form className={obj.new_post_form}>*/}
                {/*    <h2>New Post</h2>*/}
                {/*    <textarea className={obj.textarea} onChange={onPostChange} value={props.newPostText} ref={textArea}*/}
                {/*              placeholder={'What\'s new...'} rows={4} cols={60} id='new_post_text_area'*/}
                {/*              name='new_post_text_area'/>*/}
                {/*    <button onClick={onAddPost} className={obj.new_post_button}*/}
                {/*            value={'Post'}><i className='fa fa-paper-plane'/> Post*/}
                {/*    </button>*/}
                {/*</form>*/}
            </div>
            {postElements}
        </div>
    );
});


export default MyPosts;
