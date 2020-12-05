import {createStore, combineReducers, applyMiddleware,compose} from 'redux';
import profileReducer from "./profileReducer";
import messagesItemReducer from "./messagesItemReducer";
import friendsReducer from "./friendsReducer";
import authReducer from "./authReducer";
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./appReducer";


let rootReducer = combineReducers(
    {
        profilePage: profileReducer,
        messagesPage: messagesItemReducer,
        // friendsPage: friendsReducer,
        findFriendsPage: friendsReducer,
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