import React, {useState} from 'react';
import style from './Posts.module.css';
import Post from "./Post/Post";
import {log} from "util";


function Posts() {
    let posts = [
        {
            date: 'Sat, 05 Dec 2020 20:49',
            text: 'I like playing chess'
        },
        {
            date: 'Sat, 05 Dec 2020 17:04',
            text: 'Hello, how u doing?'
        }
    ]

    const [value, setValue] = useState('');
    const [postElements, setPosts] = useState(posts)

    const addPost = (value: string) => {
        if (value.trim().length === 0) {
            return
        }
        const date = new Date().toUTCString().slice(0, -13) + ' ' + new Date().getHours() + ':' + new Date().getMinutes();

        let newPosts = [{date, text: value}, ...postElements.map((el) => ({...el}))];
        setPosts(newPosts)
        setValue('')
        console.log(date)
    }

    return (
        <div className={style.posts}>
            <div className={style.add_post_wrapper}>
                <textarea value={value} onChange={(e) => setValue(e.currentTarget.value)} placeholder={'What\s new?'}
                          className={style.add_post_input}/>
            </div>
            <div className={style.post_btn_wrapper}>
                <button onClick={() => addPost(value)} className={style.post_btn}>Post</button>
            </div>

            <div>
                {postElements.map((el, index) => {
                    return (
                        <Post key={index} date={el.date} text={el.text}/>
                    )
                })}
            </div>


        </div>
    );
}

export default Posts;
// export default compose(
//     withAuthRedirect,
// )(Post)
