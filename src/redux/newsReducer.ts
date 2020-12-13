import {ThunkAction} from "redux-thunk";
import {RootState} from "./redux-store";
import {newsAPI} from "../api/api";

type initialStateType = typeof initialState


export type NewsDataType = {
    id: number
    tag: string
    title: string
    summary: string
    text: string[]
    time: string
    photo: string
}
export type NewCommentDataType = {
    id: number,
    news_id: number,
    author_id: number,
    text: string,
    time: string
    name: string
    surname:string
    photo: string
}
export type SetPreloaderACType = {
    type: typeof SET_PRELOADER
    isFetching: boolean
}
let initialState = {
    newsData: [] as NewsDataType[],
    newData: {} as NewsDataType,
    isFetching: false,
    newCommentData: [] as NewCommentDataType[],
}

export type FriendsReducerActionTypes =
    | SetNewsACType
    | SetPreloaderACType
    | SetFullNewACType
    | SetFullNewCommentACType
    | AddCommentACType
    | DeleteCommentACType;
const newsReducer = (state: initialStateType = initialState, action: FriendsReducerActionTypes): initialStateType => {

    switch (action.type) {

        case SET_NEWS: {
            return {...state, newsData: action.newsData}
        }
        case SET_NEW: {
            return {...state, newData: action.newData}
        }
        case SET_PRELOADER: {
            return {...state, isFetching: action.isFetching}
        }
        case SET_NEW_COMMENTS: {
            return {...state, newCommentData: [...action.newCommentData]}
        }
        case ADD_NEW_COMMENT: {
            return {...state, newCommentData: [action.newCommentData, ...state.newCommentData]}
        }
        case DELETE_NEW_COMMENT: {
            return {...state, newCommentData: [...state.newCommentData.filter((el)=>el.id!==action.newId)]}
        }
        default:
            return state
    }
}


export type SetNewsACType = {
    type: typeof SET_NEWS
    newsData: Array<NewsDataType>
}
export type SetFullNewACType = {
    type: typeof SET_NEW
    newData: NewsDataType
}
export type SetFullNewCommentACType = {
    type: typeof SET_NEW_COMMENTS
    newCommentData: NewCommentDataType[]
}
export type AddCommentACType = {
    type: typeof ADD_NEW_COMMENT
    newCommentData: NewCommentDataType
}
export type DeleteCommentACType = {
    type: typeof DELETE_NEW_COMMENT
    newId: number
}


export type getUsersThunkCreator = {}

const SET_NEWS = 'SET_NEWS';
const SET_NEW = 'SET_NEW';
const SET_PRELOADER = 'SET_PRELOADER';
const SET_NEW_COMMENTS = 'SET_NEW_COMMENTS';
const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT';
const DELETE_NEW_COMMENT = 'DELETE_NEW_COMMENT';


export const setNewsDataAC = (newsData: NewsDataType[]): SetNewsACType => (
    {type: SET_NEWS, newsData});
export const setFullNewDataAC = (newData: NewsDataType): SetFullNewACType => (
    {type: SET_NEW, newData});
export const setFullNewCommentDataAC = (newCommentData: NewCommentDataType[]): SetFullNewCommentACType => (
    {type: SET_NEW_COMMENTS, newCommentData});
export const setPreloaderAC = (isFetching: boolean): SetPreloaderACType => ({type: SET_PRELOADER, isFetching});
export const addNewCommentDataAC = (newCommentData: NewCommentDataType): AddCommentACType => (
    {type: ADD_NEW_COMMENT, newCommentData});
export const deleteCommentAC = (newId: number): DeleteCommentACType => (
    {type: DELETE_NEW_COMMENT, newId});

export const getNewsThunkCreator = ()
    : ThunkAction<void, RootState, unknown, FriendsReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            dispatch(setPreloaderAC(true));
            try {
                const response = await newsAPI.getNews()
                console.log(response)
                dispatch(setNewsDataAC(response.data))
                dispatch(setPreloaderAC(false));

            } catch (error) {
                dispatch(setPreloaderAC(false));
            }
        }
    )
}

export const getFullNewThunkCreator = (newId: number)
    : ThunkAction<void, RootState, unknown, FriendsReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            dispatch(setPreloaderAC(true));
            try {
                const response = await newsAPI.getFullNew(newId)
                console.log(response)
                dispatch(setFullNewDataAC(response.data))
                dispatch(setPreloaderAC(false));

            } catch (error) {
                dispatch(setPreloaderAC(false));
            }
        }
    )
}

export const getFullNewCommentsThunkCreator = (newId: number)
    : ThunkAction<void, RootState, unknown, FriendsReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            dispatch(setPreloaderAC(true));
            try {
                const response = await newsAPI.getFullNewComments(newId)
                dispatch(setFullNewCommentDataAC(response.data))
                dispatch(setPreloaderAC(false));

            } catch (error) {
                dispatch(setPreloaderAC(false));
            }
        }
    )
}

export const addNewCommentThunkCreator = (newId: number, text: string)
    : ThunkAction<void, RootState, unknown, FriendsReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            dispatch(setPreloaderAC(true));
            try {
                const response = await newsAPI.addNewComment(newId, text)
                console.log(response)
                dispatch(addNewCommentDataAC(response.data))
                dispatch(setPreloaderAC(false));

            } catch (error) {
                dispatch(setPreloaderAC(false));
            }
        }
    )
}

export const deleteCommentThunkCreator = (newId: number)
    : ThunkAction<void, RootState, unknown, FriendsReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            dispatch(setPreloaderAC(true));
            try {
                const response = await newsAPI.deleteComment(newId)
                console.log(response)
                dispatch(deleteCommentAC(newId))
                dispatch(setPreloaderAC(false));

            } catch (error) {
                dispatch(setPreloaderAC(false));
            }
        }
    )
}


export default newsReducer;
