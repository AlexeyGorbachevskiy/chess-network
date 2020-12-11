import {RootState} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {stopSubmit} from "redux-form";
import {friendsAPI, profileAPI} from "../api/api";
import {FriendsReducerActionTypes, setPlayersDataAC, setPreloaderAC} from "./playersReducer";


type initialStateType = typeof initialState


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
    postsData: [] as Array<PostsDataType>,
    newPostText: '' as string,
    profile: null as ProfileType | any,
    status: '' as string
}

export type ProfileReducerActionTypes =
    AddPostACType
    | SetUserProfileACType
    | SetStatusACType
    | SavePhotoSuccessACType
    | DeletePostACType
    | SetPostsDataACType


const profileReducer = (state: initialStateType = initialState, action: ProfileReducerActionTypes): initialStateType => {

    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                postsData: [action.newPost, ...state.postsData],
            };

        }
        case DELETE_POST: {

            return {
                ...state,
                postsData: state.postsData.filter(el => el.id !== action.postId),
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
        case SET_POSTS_DATA: {

            return {
                ...state,
                postsData: action.postsData.reverse()
            };

        }
        default:
            return state
    }
}

export type AddPostACType = {
    type: typeof ADD_POST
    newPost: PostsDataType
}

export type DeletePostACType = {
    type: typeof DELETE_POST
    postId: number
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


export type PostsDataType = {
    id: number
    owner_id: number
    author_id: number
    text: string
    time: string
}
export type SetPostsDataACType = {
    type: typeof SET_POSTS_DATA,
    postsData: PostsDataType[]
}

const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const SET_POSTS_DATA = 'SET_POSTS_DATA';
export const addPostActionCreator = (newPost: PostsDataType): AddPostACType => ({type: ADD_POST, newPost});

export const deletePostActionCreator = (postId: number): DeletePostACType => ({type: DELETE_POST, postId});

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


export const setPostsDataAC = (postsData: PostsDataType[]): SetPostsDataACType => (
    {type: SET_POSTS_DATA, postsData}
);

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






export const getPostsThunkCreator = (userId:string|null)
    : ThunkAction<void, RootState, unknown, ProfileReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            try {
                const response = await profileAPI.getPosts(userId)

                if (response.status === 200) {
                    dispatch(setPostsDataAC(response.data))
                }
            } catch (error) {
                // dispatch error
            }

        }
    )
}


export const addPostThunkCreator = (userId: number|null, postText: string)
    : ThunkAction<void, RootState, unknown, ProfileReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            try {
                const response = await profileAPI.addPost(userId, postText)
                console.log(response)
                if (response.status === 200) {
                    dispatch(addPostActionCreator(response.data))
                }
            } catch (error) {
                // dispatch error
            }

        }
    )
}

export const deletePostThunkCreator = (postId: number)
    : ThunkAction<void, RootState, unknown, ProfileReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            try {
                const response = await profileAPI.deletePost(postId)

                console.log(response)

                if (response.status === 200) {
                    dispatch(deletePostActionCreator(postId))
                }
            } catch (error) {
                // dispatch error
            }

        }
    )
}



export default profileReducer;
