import React, {useEffect, useState} from 'react';
import style from './FullNew.module.css';
import {NavLink} from "react-router-dom";
import FullNewComment from "./FullNewComment/FullNewComment";
import {compose} from "redux";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {
    addNewCommentThunkCreator,
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

    if (!isAuth || !newData) {
        return (
            <div className="App"
                 style={{marginTop: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Preloader/>
            </div>
        )
    }

    const fullNewText = [
        'Первое, что мне бросилось в глаза, – это хорошая дебютная подготовка некоторых участников. ' +
        'Непомнящий, Каруана, Гири уже блеснули любопытными новинками, и наверняка они еще выложили «не все свои патроны». ' +
        'Старт турнира ярче всех удался Яну Непомнящему – его атакующий стиль игры сочетается с разумным риском. ' +
        'Лично меня очень впечатлило то, как он буквально на ровном месте белым цветом обыграл двух китайцев – Ван Хао и Дин Лижэня' +
        '. Русская и испанская партии в исполнении гроссмейстеров топ-уровня часто завершаются вничью…',

        'Очевидно, что на данный момент Непомнящий – один из главных фаворитов турнира претендентов, и в связи с этим мне бы хотелось порассуждать о его шансах в матче с Карлсеном за шахматную корону. ' +
        'Все знают, какой у Непомнящего сложный характер, но это нисколько ему не мешает сейчас «быть первым среди равных».',

        'Все идет к тому, что Ян Непомнящий выиграет турнир претендентов точно так же, как это раньше сделал Сергей Карякин. ' +
        'Легко провести параллели между этими двумя шахматистами. Они – ровесники и добились большого прогресса примерно ' +
        'в одно и то же время, часто играют за сборную России. Но, в отличие от Карякина, у Непомнящего более активный и энергозатратный ' +
        'стиль игры. Ян любит и умеет подкручивать практически любую позицию, быстро считает варианты и хорошо ориентируется в ' +
        'тактических нюансах – именно эти качества, на мой взгляд, позволят Непомнящему достойно противостоять Магнусу Карлсену.',
        'Я ожидаю, что в чемпионскую гонку скоро по-настоящему включатся Фабиано Каруана и Максим Вашье-Лаграв. В свете того, что сейчас отменены практически все крупные спортивные мероприятия, к турниру претендентов в Екатеринбурге приковано еще больше внимания любителей спорта. Так, например, 21 марта эфир вечерней программы «Все на Матч!» на канале «Матч ТВ» целиком был посвящен шахматам. Сергей Карякин, выступая в студии федерального спортивного канала, в качестве главного эксперта, подтвердил, ' +
        'что у Непомнящего – хорошие шансы выиграть турнир претендентов…'
    ];


    const deleteComment = (id: number) => {
        // let newComments = commentsElements.filter((el) => el.id !== id);
        // setCommentsElements(newComments)
    }

    const addComment = () => {
        if (value.trim().length === 0) {
            return
        }
        dispatch(addNewCommentThunkCreator(newId,value))
    }


    return (
        <article className={style.fullNew}>
            <div className={style.fullNew_photo}
                 style={{
                     background: `url('${'data:image/png;base64,' + newData.photo}') no-repeat center center`,
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
                        fullNewText.map((el) => {
                            return (
                                <p className={style.paragraph}>{el}</p>
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
                        <FullNewComment key={index} deleteComment={deleteComment} author={el.author_id} id={el.id}
                                        date={el.time} text={el.text}/>
                    )
                })
            }
        </article>
    );
}


export default compose(
    withAuthRedirect,
)(FullNew);
