import React from 'react';
import obj from './YourMessage.module.css';
import {MessagesPageType} from "../MessageItem";
import {MessagesDataArray} from "../../../../redux/messagesItemReducer";



type YourMessagePropsType = {
    messagesPage: MessagesPageType
}

function YourMessage(props: YourMessagePropsType) {

    const yourMessageItem = props.messagesPage.messagesData.map((t: MessagesDataArray) => {
        return (
            <div key={t.id} className={obj.message_container}>

                <div className={obj.message_body}>
                    <h4>I'm</h4>

                    <div className={obj.message_wrapper}>
                        <p className={obj.message_text}>{t.messageText}</p>
                    </div>

                    <div className={obj.time_wrapper}>
                        <p className={obj.time}>20:00</p>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <>
            {yourMessageItem}
        </>
    );
}


export default YourMessage;
