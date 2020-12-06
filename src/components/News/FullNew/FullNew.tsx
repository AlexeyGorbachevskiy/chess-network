import React, {useState} from 'react';
import style from './FullNew.module.css';
import avatar from "../../../images/news/1.jpg";
import {NavLink} from "react-router-dom";
import FullNewComment from "./FullNewComment/FullNewComment";


function FullNew() {

    const article_head = 'Турнир претендентов, проходящий в эти дни в Екатеринбурге, подходит к своему экватору, ' +
        'и уже можно делать некоторые выводы. Вопреки всем обстоятельствам, ' +
        'его не отменили, и есть шансы на то, что скоро мы узнаем победителя, который затем сыграет матч на ' +
        'первенство мира с Магнусом Карлсеном.';

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

    let comments = [
        {
            id: 3,
            date: 'Sat, 05 Dec 2020 17:04',
            text: 'I\'m a new Kasparov !!!',
            author: 'Yuriy Dud'
        },
        {
            id: 2,
            date: 'Sat, 05 Dec 2020 20:49',
            text: 'I like playing chess',
            author: 'Yuriy Dud'
        },
        {
            id: 1,
            date: 'Sat, 05 Dec 2020 17:04',
            text: 'Hello, how u doing?',
            author: 'Yuriy Dud'
        }
    ];

    const [value, setValue] = useState('');
    const [commentsElements, setCommentsElements] = useState(comments);
    const deleteComment=(id:number)=>{
        let newComments=commentsElements.filter((el)=>el.id!==id);
        setCommentsElements(newComments)
    }

    const addComment=()=>{
        if (value.trim().length === 0) {
            return
        }
        const date = new Date().toUTCString().slice(0, -13) + ' ' + new Date().getHours() + ':' + new Date().getMinutes();

        let newComments = [{id: commentsElements.length+1,date, text: value, author:'Yuriy Dud'}, ...commentsElements.map((el) => ({...el}))];
        setCommentsElements(newComments)
        setValue('')
    }


    return (
        <article className={style.fullNew}>
            <div className={style.fullNew_photo}
                 style={{
                     background: `url('${avatar}') no-repeat center center`,
                     backgroundSize: 'cover'
                 }}
            >
                <div className={style.fullNew_photo_blackout}>
                    <NavLink className={style.panorama} to={'/news'}>Events panorama</NavLink>
                    <p className={style.fullNew_title}>Не повторит ли Непомнящий путь Карякина?</p>
                </div>
            </div>

            <div className={style.fullNew_content}>

                <div className={style.fullNew_content_title}>
                    <em>{article_head}</em>
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
                commentsElements.map((el) => {
                    return (
                        <FullNewComment deleteComment={deleteComment} author={el.author} id={el.id} date={el.date} text={el.text}/>
                    )
                })
            }
        </article>
    );
}

export default FullNew;
// export default compose(
//     withAuthRedirect,
// )(FullNewComment)
