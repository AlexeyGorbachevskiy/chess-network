import {profileAPI} from "../oldAPI/API";
import {RootState} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {stopSubmit} from "redux-form";
import {v1} from "uuid";


type initialStateType = typeof initialState


export type PostDataArray = {
    id: string
    message: string
    like: number
}
export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

let initialState = {
    postData: [
        {id: v1(), message: 'Hey, how you doing?', like: 5},
        {id: v1(), message: 'What\'s cooking, good looking?', like: 8},
    ] as Array<PostDataArray>,
    newPostText: '' as string,
    profile: null as ProfileType | any,
    status: '' as string
}

export type ProfileReducerActionTypes =
    AddPostACType
    | SetUserProfileACType
    | SetStatusACType
    | SavePhotoSuccessACType
    | RemovePostACType


const profileReducer = (state: initialStateType = initialState, action: ProfileReducerActionTypes): initialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let postDataPushItem = {
                id: v1(),
                message: action.newPostText,
                like: 9,
            }
            return {
                ...state,
                postData: [postDataPushItem, ...state.postData],
                newPostText: '',
            };

        }
        case REMOVE_POST: {

            return {
                ...state,
                postData: state.postData.filter(el => el.id !== action.postId),
            };

        }
        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            };
        }

        case SET_STATUS: {
            return {
                ...state, status: action.status
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state
    }
}

export type AddPostACType = {
    type: typeof ADD_POST
    newPostText: string
}

export type RemovePostACType = {
    type: typeof REMOVE_POST
    postId: string
}

export type SetUserProfileACType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export type SetStatusACType = {
    type: typeof SET_STATUS,
    status: string
}

export type SavePhotoSuccessACType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

const ADD_POST = 'ADD-POST';
const REMOVE_POST = 'REMOVE-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
export const addPostActionCreator = (newPostText: string): AddPostACType => ({type: ADD_POST, newPostText});

export const removePostActionCreator = (postId: string): RemovePostACType => ({type: REMOVE_POST, postId});

export const setUserProfileAC = (profile: any): SetUserProfileACType => ({type: SET_USER_PROFILE, profile});

export const getProfileInfoThunkCreator = (userId: string)
    : ThunkAction<void, RootState, unknown, ProfileReducerActionTypes> => {
    return (
        (dispatch, getState) => {
            profileAPI.getProfileInfo(userId)
                .then(response => {
                    dispatch(setUserProfileAC(response.data));
                })
        }
    )
}

export const setStatusAC = (status: string): SetStatusACType => ({type: SET_STATUS, status});

export const savePhotoSuccessAC = (photos: PhotosType): SavePhotoSuccessACType => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getStatusThunkCreator = (userId: number)
    : ThunkAction<void, RootState, unknown, ProfileReducerActionTypes> => {
    return (
        (dispatch, getState) => {
            profileAPI.getStatus(userId)
                .then(response => {
                    dispatch(setStatusAC(response.data))
                })
        }
    )
}
export const updateStatusThunkCreator = (status: string)
    : ThunkAction<void, RootState, unknown, ProfileReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            try {
                const response = await profileAPI.updateStatus(status)
                if (response.data.resultCode === 0) {
                    dispatch(setStatusAC(status))
                }
            } catch (error) {
                // dispatch error
            }

        }
    )
}


export const savePhotoThunkCreator = (file: any)
    : ThunkAction<void, RootState, unknown, ProfileReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            let response = await profileAPI.savePhoto(file)

            if (response.data.resultCode === 0) {
                dispatch(savePhotoSuccessAC(response.data.data.photos))
            }

        }
    )
}

export const saveProfileThunkCreator = (formData: ProfileType)
    : ThunkAction<void, RootState, unknown, ProfileReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            const userId = getState().auth.data.id;
            let response = await profileAPI.saveProfile(formData)

            if (response.data.resultCode === 0) {
                userId && dispatch(getProfileInfoThunkCreator(userId.toString()))
            } else {
                const action = stopSubmit('profileSettings', {_error: response.data.messages[0]});
                dispatch<any>(action)
                return Promise.reject(response.data.messages[0])
            }
        }
    )
}

export default profileReducer;
