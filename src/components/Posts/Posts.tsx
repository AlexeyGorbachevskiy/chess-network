import React, {useEffect, useState} from 'react';
import {compose} from 'redux';
import style from './Posts.module.css';
import Post from "./Post/Post";
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";
import {LoginDataType} from "../../redux/authReducer";
import {
    addPostThunkCreator,
    deletePostThunkCreator,
    getPostsThunkCreator,
    PostsDataType
} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store";

type PostsPropsType = {
    loginData: LoginDataType
}

function Posts(props: PostsPropsType) {
    // let posts = [
    //     {
    //         id: 2,
    //         date: 'Sat, 05 Dec 2020 20:49',
    //         text: 'I like playing chess'
    //     },
    //     {
    //         id: 1,
    //         date: 'Sat, 05 Dec 2020 17:04',
    //         text: 'Hello, how u doing?'
    //     }
    // ]

    const [value, setValue] = useState('');

    const deletePost = (id: number) => {
        dispatch(deletePostThunkCreator(id))
    }
    const dispatch = useDispatch();

    const postsData = useSelector<RootState, PostsDataType[]>(state => state.profilePage.postsData);
    const addPost = () => {
        if (value.trim().length === 0) {
            return
        }
        dispatch(addPostThunkCreator('1', value))
        setValue('');
    }


    useEffect(() => {
        dispatch(getPostsThunkCreator())
    }, [])

    return (
        <div className={style.posts}>
            <div className={style.add_post_wrapper}>
                <textarea value={value} onChange={(e) => setValue(e.currentTarget.value)} placeholder={'What\s new?'}
                          className={style.add_post_input}/>
                <hr/>
            </div>
            <div className={style.post_btn_wrapper}>
                <button onClick={() => addPost()} className={style.post_btn}>Post</button>
            </div>


            <div>
                {postsData.map((el, index) => {
                    return (
                        <Post loginData={props.loginData} id={el.id} deletePost={deletePost} key={index} date={el.time}
                              text={el.text}/>
                    )
                })}
            </div>


        </div>
    );
}


export default compose(
    withAuthRedirect,
)(Posts)
