export type DialogsDataArray = {
    id: number
    name: string
}
export type MessagesDataArray = {
    id: number
    messageText: string
}

export type InitialStateType = typeof initialState;

let initialState = {
    dialogsData: [
        {id: 1, name: 'Jeff Bezos'},
        {id: 2, name: 'Elon Musk'},
        {id: 3, name: 'Jordan Peterson'},
        {id: 4, name: 'Mark Zuckerberg'},
        {id: 5, name: 'Thomas Yorke'},

    ] as Array<DialogsDataArray>,
    messagesData: [
        {id: 1, messageText: 'I\'m fine. How\'re you?'},
        {id: 2, messageText: 'Hellooooooooooooooooooooooooooooooooooooooooo'},
        {id: 3, messageText: 'Byeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'},

    ] as Array<MessagesDataArray>,
    newMessageBody: '',
}

export type MessagesReducerActionTypes =  SendMessageBodyActionCreatorType

const messagesItemReducer = (state: InitialStateType = initialState, action: MessagesReducerActionTypes): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                // newMessageBody: '',
                messagesData: [...state.messagesData, {id: 4, messageText: body}],
            }
        }
        default:
            return state

    }
}



export type SendMessageBodyActionCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody:string
}

const SEND_MESSAGE = 'SEND-MESSAGE';

export const sendMessageBodyActionCreator = (newMessageBody:string): SendMessageBodyActionCreatorType => ({type: SEND_MESSAGE,newMessageBody});


export default messagesItemReducer;