import React, {useState} from 'react';
import {compose} from 'redux';
import style from './Posts.module.css';
import Post from "./Post/Post";
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";
import {LoginDataType} from "../../redux/authReducer";
import {addPostThunkCreator, deletePostThunkCreator, PostsDataType} from "../../redux/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store";

type PostsPropsType = {
    userId: string | null
    playerData: LoginDataType
    playersData: LoginDataType[]
}

function Posts(props: PostsPropsType) {

    const [value, setValue] = useState('');
    const postsData = useSelector<RootState, PostsDataType[]>(state => state.profilePage.postsData);


    const deletePost = (id: number) => {
        dispatch(deletePostThunkCreator(id))
    }
    const dispatch = useDispatch();


    const addPost = () => {
        if (value.trim().length === 0) {
            return
        }
        dispatch(addPostThunkCreator(props.playerData.id, value))
        setValue('');
    }

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
                        <Post key={index}
                              id={el.id}
                              playerData={props.playerData}
                              deletePost={deletePost}
                              date={el.time}
                              text={el.text}
                              playersData={props.playersData}
                              authorId={el.author_id}
                        />
                    )
                })}
            </div>


        </div>
    );
}


export default compose(
    withAuthRedirect,
)(Posts)
