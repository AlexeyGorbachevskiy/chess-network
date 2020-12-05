import React, {Dispatch} from 'react';
import {
    DialogsDataArray, MessagesDataArray,
    MessagesReducerActionTypes,
    sendMessageBodyActionCreator,
} from "../../../redux/messagesItemReducer";
import MessageItem from "./MessageItem";
import {connect} from "react-redux";
import {RootState} from "../../../redux/redux-store";


type MapStatePropsType = {
    messagesPage: {
        dialogsData: Array<DialogsDataArray>
        messagesData: Array<MessagesDataArray>
        newMessageBody: string
    }
}

type MapDispatchPropsType = {
    sendMessageClick: (newMessageBody:string) => void
}

let mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        messagesPage: state.messagesPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch<MessagesReducerActionTypes>): MapDispatchPropsType => {
    return {
        sendMessageClick: (newMessageBody:string) => {
            dispatch(sendMessageBodyActionCreator(newMessageBody));
        },
    }
};
let MessageItemContainer =
    connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>(mapStateToProps, mapDispatchToProps)(MessageItem);


export default MessageItemContainer;
