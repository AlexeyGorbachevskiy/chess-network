import {createSelector} from "reselect";


const getUsers = (state: any) => {
    return state.findFriendsPage.users
}

export const getUsersSelector = createSelector(getUsers, (users: any) => {
    return users
})


export const getPageSize = (state: any) => {
    return state.findFriendsPage.pageSize
}

export const getTotalUsersCount = (state: any) => {
    return state.findFriendsPage.totalUsersCount
}

export const getCurrentPage = (state: any) => {
    return state.findFriendsPage.currentPage
}

export const getIsFetching = (state: any) => {
    return state.findFriendsPage.isFetching
}

export const getIsFollowingInProgress = (state: any) => {
    return state.findFriendsPage.isFollowingInProgress
}

export const getFollowingInProgress = (state: any) => {
    return state.findFriendsPage.followingInProgress
}


