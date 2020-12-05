import React from 'react';
import {
    addPostActionCreator, PostDataArray, ProfileReducerActionTypes, ProfileType, removePostActionCreator,
} from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootState} from "../../../redux/redux-store";
import {Dispatch} from 'redux';


type MapStatePropsType = {
    postData: Array<PostDataArray>
    newPostText: string
    profile: ProfileType | null
}
type MapDispatchPropsType = {
    addPost: (newPostText:string) => void
    removePost:(postId:string)=>void
}


let mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        postData: state.profilePage.postData,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile
    }
}

let mapDispatchToProps = (dispatch: Dispatch<ProfileReducerActionTypes>): MapDispatchPropsType => {
    return {
        addPost: (newPostText:string) => dispatch(addPostActionCreator(newPostText)),
        removePost:(postId:string)=>dispatch(removePostActionCreator(postId))
    }
}


let MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>
(mapStateToProps, mapDispatchToProps)(MyPosts);


export default MyPostsContainer;
