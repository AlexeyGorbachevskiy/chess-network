import React, {ChangeEvent} from 'react';
import obj from './MessageItem.module.css';
import YourMessage from './YourMessage/YourMessage';
import NotYourMessage from './NotYourMessage/NotYourMessage';
import {DialogsDataArray, MessagesDataArray} from "../../../redux/messagesItemReducer";
import {AddMessageFormRedux} from "./AddMessageForm";

export type MessagesPageType = {
    dialogsData: Array<DialogsDataArray>
    messagesData: Array<MessagesDataArray>
    newMessageBody: string
}

type MessageItemPropsType = {
    messagesPage: MessagesPageType
    sendMessageClick: (newMessageBody: string) => void
}

function MessageItem(props: MessageItemPropsType) {


    let addNewMessage = (values: any) => {
        props.sendMessageClick(values.newMessageBody);
    }
    return (
        <div className={obj.message_side_container}>
            <div className={obj.message_item}>
                <NotYourMessage/>
                <YourMessage messagesPage={props.messagesPage}/>
            </div>

            <AddMessageFormRedux onSubmit={addNewMessage}/>

        </div>
    )
}


export default MessageItem;
