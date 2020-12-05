import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {RootState} from "../../redux/redux-store";
import Friends from "./Friends";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import {
    followAC,
    followThunkCreator,
    FriendsReducerActionTypes,
    unfollowAC,
    unFollowThunkCreator,
    UsersArrayType
} from "../../redux/friendsReducer";
import {getFollowingInProgress, getIsFollowingInProgress} from "../../redux/usersSelectors";
import {ThunkDispatch} from "redux-thunk";


type MapStatePropsType = {
    users: Array<UsersArrayType>
    isAuth: boolean
    isFollowingInProgress: boolean
    followingInProgress: Array<number>
}

export type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followThunkCreator: (userId: number) => void
    unFollowThunkCreator: (userId: number) => void
}

let mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        users: state.findFriendsPage.users,
        isAuth: state.auth.isAuth,
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
        followThunkCreator: (userId) => {
            dispatch(followThunkCreator(userId))
        },
        unFollowThunkCreator: (userId) => {
            dispatch(unFollowThunkCreator(userId))
        },
    }
}


export default compose(
    withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>(mapStateToProps, mapDispatchToProps),
)(Friends)

//without compose
// let AuthRedirectComponent = withAuthRedirect(Friends);
// let FriendsContainer = connect<MapStatePropsType, {}, {}, RootState>(mapStateToProps, {})(AuthRedirectComponent);
// export default FriendsContainer;
