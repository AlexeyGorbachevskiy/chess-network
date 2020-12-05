import React from 'react';
import obj from './Messages.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItemContainer from "./MessageItem/MessageItemContainer";
import {DialogsDataArray} from "../../redux/messagesItemReducer";
import {MapStatePropsType} from "./MessagesContainer";




function Messages(props: MapStatePropsType) {

    return (
        <div className={obj.messages_container}>
            <div className={obj.dialogs_items}>
                {props.dialogElements.map((t: DialogsDataArray) => {
                    return <DialogItem key={t.id} user_name={t.name} user_id={t.id}/>
                })}
            </div>
            <div className={obj.messages_items}>
                <MessageItemContainer/>
            </div>
        </div>
    );
}


export default Messages;
