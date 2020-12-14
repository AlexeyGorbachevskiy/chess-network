import axios from "axios";
import {UsersArrayType} from "../redux/friendsReducer";
import {EditProfileType, ProfileType} from "../redux/profileReducer";


const axiosInstance = axios.create(
    {
        baseURL: 'https://chess-network.herokuapp.com/',
        withCredentials: true,
    },
);


type GetUsersResponseType = {
    items: Array<UsersArrayType>
    totalCount: number
    error: string
}
type FollowResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

export const friendsAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return (
            axiosInstance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)

        )
    },
    getPlayers() {
        return (
            axiosInstance.get(`api/profile/all`)
        )
    },
    getPlayer(userId: number | null) {
        return (
            axiosInstance.get(`api/profile/${userId}`)
        )
    },
    getFriends() {
        return (
            axiosInstance.get(`api/profile/friends`)
        )
    },
    getFriendsById(userId: number | null) {
        return (
            axiosInstance.get(`api/profile/friends/${userId}`)
        )
    },
    follow(userId: number) {
        return (
            axiosInstance.post(`api/profile/${userId}/subscribe`)
        )
    },
    unFollow(userId: number) {
        return (
            axiosInstance.post(`api/profile/${userId}/unsubscribe`)
        )
    },
}


type GetProfileResponseType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string | null
        large: string | null
    }

}
export const profileAPI = {
    getProfileInfo(userId: number) {
        return (
            axiosInstance.get(`api/profile/${userId}`)
        )
    },
    getStatus(userId: number) {
        return (
            axiosInstance.get<string>(`profile/status/${userId}`)
        )
    },
    updateStatus(status: string) {
        return (
            axiosInstance.put(`profile/status/`, {status: status})
        )
    },
    savePhoto(file: any) {
        const formData = new FormData();
        formData.append('image', file)
        return (
            axiosInstance.put(`profile/photo/`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        )
    },
    saveProfile(profile: ProfileType) {
        return (
            axiosInstance.put(`profile`, profile)
        )
    },


    getPosts(userId: string | null) {
        return (
            axiosInstance.get(`api/post/all/${userId}`)
        )
    },
    addPost(userId: number | null, postText: string) {
        return (
            axiosInstance.post(`api/post/${userId}/add/`, {text: postText})
        )
    },
    deletePost(postId: number) {
        return (
            axiosInstance.delete(`api/post/${postId}/`)
        )
    },
    editProfile(editedData: EditProfileType){
       return axiosInstance.post(`api/profile/edit/`,editedData)
    }
}


type GetAuthInfoResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: number
    messages: Array<string>
}
export const authAPI = {
    getAuthInfo() {
        return (
            axiosInstance.get(`api/auth/me`)
        )
    },
    login(email: string, password: string) {
        return (
            axiosInstance.post(`api/auth/login`,
                {email: email, password: password})
        )
    },
    logout() {
        return (
            axiosInstance.delete(`api/auth/logout`)
        )
    },
    register(email: string, password: string, name: string, surname: string) {
        return (
            axiosInstance.get(`api/auth/register?email=${email}&password=${password}&name=${name}&surname=${surname}`)
        )
    },

}


export const securityAPI = {
    getCaptchaUrl() {
        return (
            axiosInstance.get<{ url: string }>(`security/get-captcha-url`)
        )
    },
}

export const newsAPI = {

    getNews() {
        return (
            axiosInstance.get(`api/news/all`)
        )
    },
    getFullNew(newId: number) {
        return (
            axiosInstance.get(`api/news/${newId}`)
        )
    },
    getFullNewComments(newId: number) {
        return (
            axiosInstance.get(`api/comments/${newId}`)
        )
    },
    addNewComment(newId: number, text: string) {
        return (
            axiosInstance.post(`api/comments/${newId}/add`, {text})
        )
    },
    deleteComment(newId: number) {
        return (
            axiosInstance.delete(`api/comments/${newId}/delete`)
        )
    },

}


export const messagesAPI = {

    getALlDialogs() {
        return (
            axiosInstance.get(`api/dialogs/all`)
        )
    },


}
