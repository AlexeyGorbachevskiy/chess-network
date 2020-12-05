import axios from "axios";
import {UsersArrayType} from "../redux/friendsReducer";
import {ProfileType} from "../redux/profileReducer";


const axiosInstance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        withCredentials: true,
        headers: {'API-KEY': '3de0712e-e19a-4637-bf5e-355c7a8ad46c'}
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
        debugger
        return (
            axiosInstance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)

        )
    },
    follow(userId: number) {
        return (
            axiosInstance.post<FollowResponseType>(`follow/${userId}`)
        )
    },
    unFollow(userId: number) {
        return (
            axiosInstance.delete<FollowResponseType>(`follow/${userId}`)
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
    getProfileInfo(userId: string) {
        return (
            axiosInstance.get<GetProfileResponseType>(`profile/${userId}`)
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
}


type GetAuthInfoResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: number
    messages: Array<string>
}
export const authAPI = {
    getAuthInfo() {
        return (
            axiosInstance.get<GetAuthInfoResponseType>(`auth/me`)
        )
    },
    login(email: string, password: string, rememberMe = false, captcha: string | undefined | null = null) {
        return (
            axiosInstance.post(`auth/login`, {email, password, rememberMe, captcha})
        )
    },
    logout() {
        return (
            axiosInstance.delete(`auth/login`)
        )
    }
}


export const securityAPI = {
    getCaptchaUrl() {
        return (
            axiosInstance.get<{ url: string }>(`security/get-captcha-url`)
        )
    },
}


