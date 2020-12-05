import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {RootState} from "../../redux/redux-store";
import {
    getProfileInfoThunkCreator, getStatusThunkCreator, ProfileReducerActionTypes,
    ProfileType, savePhotoThunkCreator, saveProfileThunkCreator, updateStatusThunkCreator,
} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router";
import {ThunkDispatch} from "redux-thunk";
import {withAuthRedirect} from "../Hoc/withAuthRedirect";
import Settings from "./Settings";


export type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType;
export type PathParamsType = { userId?: string | undefined }
export type WithRouterPropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType;

class SettingsContainer extends React.Component<WithRouterPropsType, {}> {

    refreshSettings() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            if (this.props.authorizedUserId) {
                userId = this.props.authorizedUserId.toString();

            }

        }
        this.props.getProfileInfo(userId!);
        this.props.getStatus(parseInt(userId!));
    }

    componentDidMount() {
        this.refreshSettings()
    }

    componentDidUpdate(prevProps: Readonly<WithRouterPropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({...this.state, status: this.props.status})
        }

        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshSettings()
        }

    }


    render() {
        return (
            <Settings {...this.props} savePhoto={this.props.savePhoto} isOwner={!this.props.match.params.userId}
                      saveProfile={this.props.saveProfile}/>
        );
    }
}

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    getProfileInfo: (userId: string) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (formData: any) => any
}

const mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.data.id,
        isAuth: state.auth.isAuth,
    }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, unknown, ProfileReducerActionTypes>)
    : MapDispatchPropsType => {
    return {
        getProfileInfo: (userId) => dispatch(getProfileInfoThunkCreator(userId)),
        getStatus: (userId: number) => dispatch(getStatusThunkCreator(userId)),
        updateStatus: (status: string) => dispatch(updateStatusThunkCreator(status)),
        savePhoto: (file: any) => dispatch(savePhotoThunkCreator(file)),
        saveProfile: (formData: any) => dispatch(saveProfileThunkCreator(formData))
    }
}

export default compose(
    withAuthRedirect,
    withRouter,
    connect<MapStatePropsType, MapDispatchPropsType, {}, RootState>
    (mapStateToProps, mapDispatchToProps)
)(SettingsContainer)
