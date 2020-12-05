import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {RootState} from "../../redux/redux-store";
import {
    followAC, followThunkCreator,
    FriendsReducerActionTypes, getUsersThunkCreator,
    setCurrentPageAC, setFollowingInProgressAC,
    unfollowAC, unFollowThunkCreator,
    UsersArrayType
} from "../../redux/friendsReducer";
import FindFriends from "./FindFriends";
import {ThunkDispatch} from "redux-thunk";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getIsFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector
} from "../../redux/usersSelectors";


export type MapStatePropsType = {
    users: Array<UsersArrayType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    isFollowingInProgress: boolean
    followingInProgress: Array<number>
}

export type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    setFollowingInProgress: (isFollowingInProgress: boolean, userId: number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    followThunkCreator: (userId: number) => void
    unFollowThunkCreator: (userId: number) => void
}

let mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getIsFollowingInProgress(state),
        followingInProgress: getFollowingInProgress(state),
    }
}
let mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, FriendsReducerActionTypes>)
    : MapDispatchPropsType => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setFollowingInProgress: (isFollowingInProgress, userId) => {
            dispatch(setFollowingInProgressAC(isFollowingInProgress, userId))
        },
        getUsersThunkCreator: (currentPage: number, pageSize: number) => {
            dispatch(getUsersThunkCreator(currentPage, pageSize))
        },
        followThunkCreator: (userId) => {
            dispatch(followThunkCreator(userId))
        },
        unFollowThunkCreator: (userId) => {
            dispatch(unFollowThunkCreator(userId))
        },
    }
}


export type FindFriendsAPIContainerPropsType = MapStatePropsType & MapDispatchPropsType;

class FindFriendsAPIContainer extends React.Component<FindFriendsAPIContainerPropsType, RootState> {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    }


    render() {

        return (
            <FindFriends
                users={this.props.users}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                isFetching={this.props.isFetching}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                setFollowingInProgress={this.props.setFollowingInProgress}
                isFollowingInProgress={this.props.isFollowingInProgress}
                followingInProgress={this.props.followingInProgress}
                followThunkCreator={this.props.followThunkCreator}
                unFollowThunkCreator={this.props.unFollowThunkCreator}
            />
        );
    }
}


export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>
    (mapStateToProps, mapDispatchToProps)
)(FindFriendsAPIContainer)


// without compose
// let AuthRedirectComponent = withAuthRedirect(FindFriendsAPIContainer);
// let FindFriendsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>
// (mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
// export default FindFriendsContainer;
