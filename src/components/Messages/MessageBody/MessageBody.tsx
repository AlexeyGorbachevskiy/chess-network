import React, {useEffect, useRef, useState} from 'react';
import {compose} from 'redux';
import style from './MessageBody.module.css';
import YourMessage from "./YourMessage/YourMessage";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/redux-store";
import {LoginDataType} from "../../../redux/authReducer";
import Preloader from "../../Common/preloader/Preloader";
import {useParams} from "react-router";
import {getProfileInfoByIdThunkCreator, ProfileType} from "../../../redux/profileReducer";
import {getPlayerThunkCreator} from "../../../redux/playersReducer";


function MessageBody() {
    const dispatch = useDispatch()

    const loginData = useSelector<RootState, LoginDataType>(state => state.auth.data);
    const otherUserData = useSelector<RootState, LoginDataType>(state => state.playersPage.playerData);
    const playerIsFetching = useSelector<RootState, boolean>(state => state.playersPage.isFetching);
    const messagesEndRef = useRef<null | HTMLDivElement>(null)
    let [ws, setWS] = useState<any>(null);
    let [messages, setMessages] = useState<MessageType[]>([]);
    const [senderPhoto, setSenderPhoto] = useState('');
    const [receiverPhoto, setReceiverPhoto] = useState('');
    const [value, setValue] = useState('');
    const {userId} = useParams();
    useEffect(() => {
        if(userId){
            dispatch(getPlayerThunkCreator(+userId))
        }

    }, [])
    const scrollToBottom = () => {
        messagesEndRef.current!.scrollIntoView({behavior: "smooth"})
    }
    let [dialogId, setDialogId] = useState<number | null>(null);

    const msgForSubscribe = {
        command: 'subscribe',
        identifier: JSON.stringify({
                channel: "ChatChannel", sender_id: loginData.id, receiver_id: userId
            }
        ),
    };

    const msg = {
        command: 'message',
        identifier: JSON.stringify({
                channel: "ChatChannel", sender_id: loginData.id, receiver_id: userId
            }
        ),
        data: JSON.stringify({action: "speak", sender_id: loginData.id, dialog_id: dialogId, text: value})
    };


    type MessageType = {
        dialog_id: number
        name: string
        surname: string
        text: string
        time: string
        user_id: number
    }


    useEffect(scrollToBottom, [messages]);

    if (ws) {
        ws.onopen = () => {
            ws.send(JSON.stringify(msgForSubscribe))
            console.log('ws opened')

        };
        ws.onclose = () => {
            setWS(null)
            console.log('ws closed')
        };
        ws.onmessage = (messageEvent: any) => {
            let messagesResponse = JSON.parse(messageEvent.data)

            console.log(messagesResponse)
            if (messagesResponse.message && messagesResponse.message.receiver_photo && messagesResponse.message.sender_photo) {
                setReceiverPhoto(messagesResponse.message.receiver_photo)
                setSenderPhoto(messagesResponse.message.sender_photo)
            }

            if (messagesResponse.message && messagesResponse.message.dialog_id) {
                setDialogId(messagesResponse.message.dialog_id)
            }

            if (messagesResponse.message && messagesResponse.message.msg_history) {
                setMessages([...messages, ...messagesResponse.message.msg_history]);
            }
            if (messagesResponse.message && messagesResponse.message.json) {
                setMessages([...messages, messagesResponse.message.json]);
                console.log('Yep')
            }
            console.log(messages)
        }
    }
    useEffect(() => {
        let localWS = new WebSocket('wss://chess-network.herokuapp.com/cable');
        setWS(localWS)
        return () => {
            localWS.close();
            setWS(null)
        }

    }, [])

    const sendMessage = () => {
        console.log(ws)
        console.log(msg)
        if (ws && msg.data.length !== 0 && dialogId && value.trim().length !== 0) {
            ws.send(JSON.stringify(msg));
            setTimeout(() => {
                setValue('');
            }, 0)
        }
    }

    if (!userId) {
        return (
            <div className="App"
                 style={{marginTop: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Preloader/>
            </div>
        )
    }


    return (
        <div className={style.messageBody}>
            <div className={style.main_wrapper}>
                <div className={style.main_header}>
                    <span className={style.main_header__title}>
                        { !playerIsFetching ?
                            otherUserData.name + ' '+ otherUserData.surname
                            :
                            ''
                        }
                    </span>
                </div>

                <div className={style.message_body}>
                    {
                        messages.map((el, index) => {
                            return (
                                <YourMessage key={index} text={el.text}
                                             loggedUserId={loginData.id}
                                             userId={el.user_id} date={el.time}
                                             name={el.name} surname={el.surname}
                                             receiverPhoto={receiverPhoto}
                                             senderPhoto={senderPhoto}
                                />
                            )
                        })
                    }
                    {
                        messages.length === 0 &&
                        <div className="App"
                             style={{
                                 position: 'absolute',
                                 marginTop: '100px',
                                 marginLeft: '120px',
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center'
                             }}>
                            <Preloader/>
                        </div>
                    }
                    <div ref={messagesEndRef}/>
                </div>

                <div className={style.add_post_wrapper}>
                <textarea
                    onChange={(e) => {
                        setValue(e.currentTarget.value)
                    }}
                    value={value}
                    placeholder={'What\s new?'}
                    className={style.add_post_input}/>
                    <hr/>
                </div>
                <div className={style.post_btn_wrapper}>
                    <button onClick={sendMessage} className={style.post_btn}>Send</button>
                </div>
            </div>
        </div>
    );
}


export default compose(
    withAuthRedirect,
)(MessageBody)
