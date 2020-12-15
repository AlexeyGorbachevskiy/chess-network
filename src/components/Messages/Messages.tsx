import React, {useEffect} from 'react';
import {compose} from 'redux';
import style from './Messages.module.css';
import Message from "./Message/Message";
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {DialogsDataType, getAllDialogsThunkCreator} from "../../redux/messagesReducer";
import {RootState} from "../../redux/redux-store";
import Preloader from "../Common/preloader/Preloader";
import {LoginDataType} from "../../redux/authReducer";


function Messages() {

    const loginData = useSelector<RootState, LoginDataType>(state => state.auth.data);
    const isFetching = useSelector<RootState, boolean>(state => state.messagesPage.isFetching);
    const dialogsData = useSelector<RootState, DialogsDataType[]>(state => state.messagesPage.dialogsData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllDialogsThunkCreator());
    }, [dispatch])

    if (isFetching) {
        return (
            <div className="App"
                 style={{marginTop: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Preloader/>
            </div>
        )
    }

    return (
        <section className={style.players}>
            <div className={style.main_wrapper}>
                <div className={style.main_header}>
                    <span className={style.main_header__title}>Your Dialogs</span>
                    <span className={style.main_header__count}>{dialogsData.length}</span>
                </div>

                {
                    dialogsData.map((el,index)=>{
                        return (
                            <Message loggedUserId={loginData.id} lastMessageUserId={el.last_message_user_id} lastMessageUserPhoto={el.last_message_user_photo} anotherUserId={el.another_user_id} key={index} dialogId={el.id} name={el.another_user_name} surname={el.another_user_surname} photo={el.another_user_photo} text={el.last_message}/>
                        )
                    })
                }

            </div>
        </section>
    );
}


export default compose(
    withAuthRedirect,
)(Messages)
