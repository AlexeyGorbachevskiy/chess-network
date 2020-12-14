import {applyMiddleware, combineReducers, createStore} from 'redux';
import profileReducer from "./profileReducer";
import friendsReducer from "./friendsReducer";
import authReducer from "./authReducer";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./appReducer";
import playersReducer from "./playersReducer";
import newsReducer from "./newsReducer";
import messagesReducer from "./messagesReducer";


let rootReducer = combineReducers(
    {
        profilePage: profileReducer,
        friendsPage: friendsReducer,
        playersPage: playersReducer,
        findFriendsPage: friendsReducer,
        newsPage: newsReducer,
        messagesPage: messagesReducer,
        auth: authReducer,
        form: formReducer,
        app: appReducer,
    }
);


// Connecting of Redux Dev Tool

// declare global {
//         interface Window {
//                 __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//         }
// }
// const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
// const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
//     applyMiddleware(thunkMiddleware)
// ));
// ------------------------------------------------------------------------------------------------------

export type RootState = ReturnType<typeof rootReducer>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export default store;
