import React, {useEffect, useState} from 'react';
import style from './FullNew.module.css';
import {NavLink} from "react-router-dom";
import FullNewComment from "./FullNewComment/FullNewComment";
import {compose} from "redux";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {
    addNewCommentThunkCreator, deleteCommentThunkCreator,
    getFullNewCommentsThunkCreator,
    getFullNewThunkCreator,
    NewCommentDataType,
    NewsDataType,
    setFullNewCommentDataAC,
    setFullNewDataAC
} from "../../../redux/newsReducer";
import Preloader from "../../Common/preloader/Preloader";
import {RootState} from "../../../redux/redux-store";


function FullNew() {
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const newData = useSelector<RootState, NewsDataType>(state => state.newsPage.newData);
    const commentData = useSelector<RootState, NewCommentDataType[]>(state => state.newsPage.newCommentData);
    const {newId} = useParams();
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    useEffect(() => {
        dispatch(getFullNewThunkCreator(+newId))
        dispatch(getFullNewCommentsThunkCreator(+newId))
        return () => {
            dispatch(setFullNewDataAC({} as NewsDataType))
            dispatch(setFullNewCommentDataAC([] as NewCommentDataType[]))
        }
    }, [dispatch,newId])


    if (!isAuth || !newData.id) {
        return (
            <div className="App"
                 style={{marginTop: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Preloader/>
            </div>
        )
    }



    const deleteComment = (id: number) => {
        dispatch(deleteCommentThunkCreator(id))
        // let newComments = commentsElements.filter((el) => el.id !== id);
        // setCommentsElements(newComments)
    }

    const addComment = () => {
        if (value.trim().length === 0) {
            return
        }
        dispatch(addNewCommentThunkCreator(newId,value));
        setValue('');
    }



    return (
        <article className={style.fullNew}>
            <div className={style.fullNew_photo}
                 style={{
                     background: `url('${newData.photo}') no-repeat center center`,
                     backgroundSize: 'cover'
                 }}
            >
                <div className={style.fullNew_photo_blackout}>
                    <NavLink className={style.panorama} to={'/news'}>Events panorama</NavLink>
                    <p className={style.fullNew_title}>{newData.title}</p>
                </div>
            </div>

            <div className={style.fullNew_content}>

                <div className={style.fullNew_content_title}>
                    <em>{newData.summary}</em>
                </div>
                <div className={style.fullNew_content_text}>
                    {
                        newData.text.map((el,index) => {
                            return (
                                <p key={index} className={style.paragraph}>{el}</p>
                            )
                        })
                    }
                </div>
            </div>


            <div className={style.comments}>

                <div className={style.add_comment_wrapper}>
                <textarea placeholder={'Write something...'}
                          className={style.add_comment_input}
                          value={value}
                          onChange={(e) => {
                              setValue(e.currentTarget.value)
                          }}
                />

                    <hr/>
                </div>
                <div className={style.comment_btn_wrapper}>
                    <button onClick={addComment} className={style.comment_btn}>Comment</button>
                </div>
            </div>

            {
                commentData.map((el, index) => {
                    return (
                        <FullNewComment key={index} deleteComment={deleteComment} authorId={el.author_id} id={el.id}
                                        date={el.time} text={el.text} name={el.name} surname={el.surname} photo={el.photo}
                        />
                    )
                })
            }
        </article>
    );
}


export default compose(
    withAuthRedirect,
)(FullNew);
