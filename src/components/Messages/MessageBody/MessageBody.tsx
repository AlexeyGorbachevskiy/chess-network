import React, {useEffect, useRef, useState} from 'react';
import {compose} from 'redux';
import style from './MessageBody.module.css';
import NotYourMessage from "./NotYourMessage/NotYourMessage";
import YourMessage from "./YourMessage/YourMessage";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";


function MessageBody() {
    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current!.scrollIntoView({behavior: "smooth"})
    }
    const yourMessages = [
        {
            messageId: 1,
            text: 'No, you have incorrect information',
            date: 'Sat, 05 Dec 2020 17:04',
        }
    ];

    const [value, setValue] = useState('');
    const [yourMessagesElements, setPosts] = useState(yourMessages);
    useEffect(scrollToBottom, [yourMessagesElements]);


    const msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
                channel: "ChatChannel", room: "Best Room"
            }
        ),
    };

    let [ws, setWS] = useState<any>(null);
    let [messages, setMessages] = useState([]);

    const [isPaused, setPause] = useState(false);
    // function isOpen(ws:any) { return ws.readyState === ws.OPEN }
    useEffect(() => {
        let localWS = new WebSocket('ws://chess-network.herokuapp.com/cable');
        localWS.onopen = () => console.log('ws opened');
        localWS.onclose = () => console.log('ws closed');

        localWS.onmessage = (messageEvent) => {
            console.log(messageEvent)
        }
        // localWS.onclose = onClose(localWS);
        // localWS.onopen = ()=>{
        //     sendMessage()
        // }
        setWS(localWS)
        return () => {
            localWS.close();
        }

    }, [])

    const sendMessage = () => {
        ws.send(JSON.stringify(msg));


        // if (value.trim().length === 0) {
        //     return
        // }
        // const date = new Date().toUTCString().slice(0, -13) + ' ' + new Date().getHours() + ':' + new Date().getMinutes();
        //
        // let newMessages = [
        //     ...yourMessagesElements.map((el) => ({...el})),
        //     {
        //         messageId: yourMessagesElements.length + 1,
        //         text: value,
        //         date
        //     }
        // ];
        // setPosts(newMessages)
        // setValue('')
    }


    return (
        <div className={style.messageBody}>
            <div className={style.main_wrapper}>
                <div className={style.main_header}>
                    <span className={style.main_header__title}>Harik Harlamov</span>
                </div>

                <div className={style.message_body}>

                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    <NotYourMessage/>
                    {
                        yourMessagesElements.map((el,index) => {
                            return (
                                <YourMessage key={index} text={el.text} id={el.messageId} date={el.date}/>
                            )
                        })
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
