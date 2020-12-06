
import {ThunkAction} from "redux-thunk";
import {RootState} from "./redux-store";
import {friendsAPI} from "../api/api";

type initialStateType = typeof initialState


export type PhotosType = {
    small: string
    large: string
}
export type UsersArrayType = {
    id: number
    name: string
    uniqueUrlName: string
    photos: PhotosType
    status: string
    followed: boolean
}

let initialState = {
    users: <UsersArrayType[]>[],
    newPostText: '',
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: <number[]>[],
    isFollowingInProgress: false,
}

export type FriendsReducerActionTypes =
    FollowACType
    | UnfollowACType
    | SetUsersACTYPE
    | SetCurrentPageACTYPE
    | SetTotalUsersCountACType
    | SetPreloaderACType
    | SetFollowingInProgressACType;
const friendsReducer = (state: initialStateType = initialState, action: FriendsReducerActionTypes): initialStateType => {

    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            };
        }
        case UNFOLLOW: {
            return {
                ...state, users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            };
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case SET_PRELOADER: {
            return {...state, isFetching: action.isFetching}
        }
        case SET_IS_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFollowingInProgress ?
                    [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}

export type FollowACType = {
    type: typeof FOLLOW
    userId: number
}
export type UnfollowACType = {
    type: typeof UNFOLLOW
    userId: number
}
export type SetUsersACTYPE = {
    type: typeof SET_USERS
    users: Array<UsersArrayType>
}
export type SetCurrentPageACTYPE = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export type SetTotalUsersCountACType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export type SetPreloaderACType = {
    type: typeof SET_PRELOADER
    isFetching: boolean
}
export type SetFollowingInProgressACType = {
    type: typeof SET_IS_FOLLOWING_IN_PROGRESS
    isFollowingInProgress: boolean
    userId: number
}

export type getUsersThunkCreator = {}

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_PRELOADER = 'SET_PRELOADER';
const SET_IS_FOLLOWING_IN_PROGRESS = 'SET_IS_FOLLOWING_IN_PROGRESS';

export const followAC = (userId: number): FollowACType => ({type: FOLLOW, userId});
export const unfollowAC = (userId: number): UnfollowACType => ({type: UNFOLLOW, userId});
export const setUsersAC = (users: Array<UsersArrayType>): SetUsersACTYPE => ({type: SET_USERS, users});
export const setCurrentPageAC = (currentPage: number): SetCurrentPageACTYPE => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCountAC = (totalUsersCount: number): SetTotalUsersCountACType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
});
export const setPreloaderAC = (isFetching: boolean): SetPreloaderACType => ({type: SET_PRELOADER, isFetching});

export const setFollowingInProgressAC =
    (isFollowingInProgress: boolean,
     userId: number): SetFollowingInProgressACType => ({
        type: SET_IS_FOLLOWING_IN_PROGRESS,
        isFollowingInProgress,
        userId,
    });


export const getUsersThunkCreator = (currentPage: number, pageSize: number)
    : ThunkAction<void, RootState, unknown, FriendsReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            dispatch(setPreloaderAC(true));
            dispatch(setCurrentPageAC(currentPage));
            const data = await friendsAPI.getUsers(currentPage, pageSize)
            dispatch(setPreloaderAC(false));
            dispatch(setUsersAC(data.items));
            dispatch(setTotalUsersCountAC(data.totalCount));
        }
    )
}


export const followThunkCreator = (userId: number)
    : ThunkAction<void, RootState, unknown, FriendsReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            dispatch(setFollowingInProgressAC(true, userId));
            const response = await friendsAPI.follow(userId)
            if (response.data.resultCode == 0) {
                dispatch(followAC(userId));
            }
            dispatch(setFollowingInProgressAC(false, userId));
        }
    )
}

export const unFollowThunkCreator = (userId: number)
    : ThunkAction<void, RootState, unknown, FriendsReducerActionTypes> => {
    return (
        (dispatch, getState) => {
            dispatch(setFollowingInProgressAC(true, userId));
            friendsAPI.unFollow(userId)
                .then(response => {
                    if (response.data.resultCode == 0) {
                        dispatch(unfollowAC(userId));
                    }
                    dispatch(setFollowingInProgressAC(false, userId));
                })
        }
    )
}

export default friendsReducer;
