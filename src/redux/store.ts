import React from 'react';
// import profileReducer from "./profileReducer";
// import messagesItemReducer from "./messagesItemReducer";
// import friendReducerD from "./friendReducerD";
//
//
// type PostDataArray = {
//     id: number
//     message: string
//     like: number
// }
//
// type ProfilePageType = {
//     postData: Array<PostDataArray>
//     newPostText: string
// }
//
// type FriendsDataArray = {
//     id: number
//     user_name: string
//     img_path: string
// }
//
// type FriendPageType = {
//     friendData: Array<FriendsDataArray>
// }
//
// type DialogsDataArray = {
//     id: number
//     name: string
// }
// type MessagesDataArray = {
//     id: number
//     messageText: string
// }
//
// type MessagesPageType = {
//     dialogsData: Array<DialogsDataArray>
//     messagesData: Array<MessagesDataArray>
//     newMessageBody: string
// }
//
//
// type StateType = {
//     profilePage: ProfilePageType
//     friendPage: FriendPageType
//     messagesPage: MessagesPageType
// }
//
// type DispatchActionType = {
//     type: string
//     newText?: string
//     body?: string
// }
//
// type StoreType = {
//     _state: StateType
//     _callSubscriber: () => void
//     getState: () => any
//     subscribe: (observer: () => void) => void
//     dispatch: (action: DispatchActionType) => void
// }
//
//
// let store: StoreType = {
//     _state: {
//         profilePage: {
//             postData: [
//                 {id: 1, message: 'Hey, how you doing?', like: 5},
//                 {id: 2, message: 'What\'s cooking, good looking?', like: 8},
//             ],
//             newPostText: ''
//         },
//         friendPage: {
//             friendData: [
//                 {id: 1, user_name: 'Jeff Bezos', img_path: 'Bezos.png'},
//                 {id: 2, user_name: 'Elon Musk', img_path: 'Musk.png'},
//                 {id: 3, user_name: 'Jordan Peterson', img_path: 'Peterson.webp'},
//                 {id: 4, user_name: 'Mark Zuckerberg', img_path: 'Zuckerberg.png'},
//                 {id: 5, user_name: 'Michael  Jordan', img_path: 'Jordan.png'}
//             ]
//         },
//         messagesPage: {
//             dialogsData: [
//                 {id: 1, name: 'Jeff Bezos'},
//                 {id: 2, name: 'Elon Musk'},
//                 {id: 3, name: 'Jordan Peterson'},
//
//             ],
//             messagesData: [
//                 {id: 1, messageText: 'I\'m fine. How\'re you?'},
//                 {id: 2, messageText: 'Hellooooooooooooooooooooooooooooooooooooooooo'},
//                 {id: 3, messageText: 'Byeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'},
//
//             ],
//             newMessageBody: '',
//         },
//     },
//     _callSubscriber() {
//     },
//
//     getState() {
//         return this._state
//     },
//     subscribe(observer: () => void) {    // observer
//         this._callSubscriber = observer;                // override
//     },
//
//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.messagesPage = messagesItemReducer(this._state.messagesPage, action);
//         this._state.friendPage = friendReducerD(this._state.friendPage, action);
//         this._callSubscriber();
//     },
// }
//
//
// // export default store;