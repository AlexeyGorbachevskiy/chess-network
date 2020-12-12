import React, {useEffect} from 'react';
import {compose} from 'redux';
import style from './News.module.css';
import New from "./New/New";
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {getNewsThunkCreator, NewsDataType, setNewsDataAC} from "../../redux/newsReducer";
import {RootState} from "../../redux/redux-store";
import Preloader from "../Common/preloader/Preloader";


function News() {
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const newsData = useSelector<RootState, NewsDataType[]>(state => state.newsPage.newsData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNewsThunkCreator())
        return () => {
            dispatch(setNewsDataAC([]))
        }
    }, [dispatch])

    if (!isAuth || !newsData.length) {
        return (
            <div className="App"
                 style={{marginTop: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Preloader/>
            </div>
        )
    }

    return (
        <section className={style.news}>
            <div className={style.main_header}>
                <span className={style.main_header__title}>News</span>
                <span className={style.main_header__count}>{newsData.length}</span>
            </div>
            <div className={style.main_wrapper}>

                {
                    newsData.map((el,index)=>{
                        return <New key={index} id={el.id} title={el.title} summary={el.summary} text={el.text} photo={el.photo}/>
                    })
                }

            </div>
        </section>
    );
}

export default compose(
    withAuthRedirect,
)(News)
