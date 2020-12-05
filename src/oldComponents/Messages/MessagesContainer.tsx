import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {RootState} from "../../redux/redux-store";
import Messages from "./Messages";
import {DialogsDataArray} from "../../redux/messagesItemReducer";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";


export type MapStatePropsType = {
    dialogElements: Array<DialogsDataArray>
}

let mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        dialogElements: state.messagesPage.dialogsData,
    }
}


let MessagesContainer = compose(
    withAuthRedirect,
    connect<MapStatePropsType, {}, {}, RootState>
    (mapStateToProps, {}),
)(Messages)

// without compose
// let AuthRedirectComponent = WithAuthRedirect(Messages);
// let MessagesContainer = connect<MapStatePropsType, {}, {}, RootState>
// (mapStateToProps, {})(AuthRedirectComponent);


export default MessagesContainer;
