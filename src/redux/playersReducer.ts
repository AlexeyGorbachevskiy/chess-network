import {ThunkAction} from "redux-thunk";
import {RootState} from "./redux-store";
import {friendsAPI} from "../api/api";
import {LoginDataType} from "./authReducer";

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
    playersData: [] as LoginDataType[],
    playerData: {} as LoginDataType,
    isFetching: false,
}

export type FriendsReducerActionTypes =
    FollowACType
    | UnfollowACType
    | SetUsersACTYPE
    | SetCurrentPageACTYPE
    | SetTotalUsersCountACType
    | SetPreloaderACType
    | SetFollowingInProgressACType
    | SetPlayersACType
    | SetPlayerACType;
const playersReducer = (state: initialStateType = initialState, action: FriendsReducerActionTypes): initialStateType => {

    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                playersData: state.playersData.map((el) => {
                    if (el.id === action.userId) {
                        return {...el, isFollowed: true}
                    }
                    return el
                })
            };
        }
        case UNFOLLOW: {
            return {
                ...state, playersData: state.playersData.map((el) => {
                    if (el.id === action.userId) {
                        return {...el, isFollowed: false}
                    }
                    return el
                })
            };
        }
        // case SET_USERS: {
        //     return {...state, users: action.users}
        // }
        // case SET_CURRENT_PAGE: {
        //     return {...state, currentPage: action.currentPage}
        // }
        // case SET_TOTAL_USERS_COUNT: {
        //     return {...state, totalUsersCount: action.totalUsersCount}
        // }
        // case SET_IS_FOLLOWING_IN_PROGRESS: {
        //     return {
        //         ...state,
        //         followingInProgress: action.isFollowingInProgress ?
        //             [...state.followingInProgress, action.userId]
        //             : state.followingInProgress.filter(id => id !== action.userId)
        //     }
        // }
        //

        case SET_PLAYER: {
            return {...state, playerData: action.playerData}
        }
        case SET_PLAYERS: {
            return {...state, playersData: action.playersData}
        }
        case SET_PRELOADER: {
            return {...state, isFetching: action.isFetching}
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

export type SetPlayersACType = {
    type: typeof SET_PLAYERS
    userId: number | null
    playersData: Array<LoginDataType>
}
export type SetPlayerACType = {
    type: typeof SET_PLAYER
    userId: number | null
    playerData: LoginDataType
}

export type getUsersThunkCreator = {}

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_PRELOADER = 'SET_PRELOADER';
const SET_IS_FOLLOWING_IN_PROGRESS = 'SET_IS_FOLLOWING_IN_PROGRESS';
const SET_PLAYERS = 'SET_PLAYERS';
const SET_PLAYER = 'SET_PLAYER';

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


export const setPlayersDataAC = (userId: number | null, playersData: LoginDataType[]):SetPlayersACType => (
    {type: SET_PLAYERS, userId, playersData});

export const setPlayerDataAC = (userId: number | null, playerData: LoginDataType):SetPlayerACType => (
    {type: SET_PLAYER, userId, playerData});


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
            // dispatch(setFollowingInProgressAC(true, userId));
            const response = await friendsAPI.follow(userId)
            if(response.status===200){
                console.log(response)
                dispatch(followAC(userId));
            }
            // dispatch(setFollowingInProgressAC(false, userId));
        }
    )
}

export const unFollowThunkCreator = (userId: number)
    : ThunkAction<void, RootState, unknown, FriendsReducerActionTypes> => {
    return (
        (dispatch, getState) => {
            // dispatch(setFollowingInProgressAC(true, userId));
            friendsAPI.unFollow(userId).then(response => {
                    if (response.status === 200) {
                        dispatch(unfollowAC(userId));
                    }
                    // dispatch(setFollowingInProgressAC(false, userId));
                })
        }
    )
}


export const getPlayersThunkCreator = (userId: number | null)
    : ThunkAction<void, RootState, unknown, FriendsReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            dispatch(setPreloaderAC(true));
            try {
                const response = await friendsAPI.getPlayers()
                console.log(response)
                dispatch(setPlayersDataAC(userId, response.data))
                dispatch(setPreloaderAC(false));

            } catch (error) {
                dispatch(setPreloaderAC(false));
            }
        }
    )
}

export const getPlayerThunkCreator = (userId: number | null)
    : ThunkAction<void, RootState, unknown, FriendsReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            dispatch(setPreloaderAC(true));
            try {
                const response = await friendsAPI.getPlayer(userId)
                console.log(response)
                dispatch(setPlayerDataAC(userId, response.data))
                dispatch(setPreloaderAC(false));

            } catch (error) {
                dispatch(setPreloaderAC(false));
            }
        }
    )
}



export default playersReducer;
