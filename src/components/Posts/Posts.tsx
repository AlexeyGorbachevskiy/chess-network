import React, {useState} from 'react';
import style from './Posts.module.css';
import Post from "./Post/Post";


function Posts() {
    let posts = [
        {
            id:2,
            date: 'Sat, 05 Dec 2020 20:49',
            text: 'I like playing chess'
        },
        {
            id:1,
            date: 'Sat, 05 Dec 2020 17:04',
            text: 'Hello, how u doing?'
        }
    ]

    const [value, setValue] = useState('');
    const [postElements, setPosts] = useState(posts);

    const deletePost=(id:number)=>{
        let newPosts=postElements.filter((el)=>el.id!==id);
        setPosts(newPosts)
    }

    const addPost = (value: string) => {
        if (value.trim().length === 0) {
            return
        }
        const date = new Date().toUTCString().slice(0, -13) + ' ' + new Date().getHours() + ':' + new Date().getMinutes();

        let newPosts = [{id: postElements.length+1,date, text: value}, ...postElements.map((el) => ({...el}))];
        setPosts(newPosts)
        setValue('')
    }

    return (
        <div className={style.posts}>
            <div className={style.add_post_wrapper}>
                <textarea value={value} onChange={(e) => setValue(e.currentTarget.value)} placeholder={'What\s new?'}
                          className={style.add_post_input}/>
                          <hr/>
            </div>
            <div className={style.post_btn_wrapper}>
                <button onClick={() => addPost(value)} className={style.post_btn}>Post</button>
            </div>


            <div>
                {postElements.map((el, index) => {
                    return (
                        <Post id={el.id} deletePost={deletePost} key={index} date={el.date} text={el.text}/>
                    )
                })}
            </div>


        </div>
    );
}

export default Posts;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
