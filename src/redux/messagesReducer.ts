import {RootState} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {messagesAPI} from "../api/api";


type initialStateType = typeof initialState


let initialState = {
    dialogsData: [] as Array<DialogsDataType>,
    isFetching: false,
}

export type ProfileReducerActionTypes =
    | SetAllDialogsDataACType
    | SetPreloaderACType


const messagesReducer = (state: initialStateType = initialState, action: ProfileReducerActionTypes): initialStateType => {

    switch (action.type) {

        case SET_PRELOADER: {
            return {...state, isFetching: action.isFetching}
        }


        case SET_ALL_DIALOGS: {

            return {
                ...state,
                dialogsData: [...action.dialogsData]
            };
        }
        default:
            return state
    }
}


export type DialogsDataType = {
    id: number
    another_user_id: number
    another_user_name: string
    another_user_surname: string
    another_user_photo: string
    last_message: string
    time: string

}

const SET_PRELOADER = 'SET_PRELOADER';
const SET_ALL_DIALOGS = 'ADD-SET_ALL_DIALOGS';

export type SetAllDialogsDataACType = {
    type: typeof SET_ALL_DIALOGS,
    dialogsData: DialogsDataType[]
}

export type SetPreloaderACType = {
    type: typeof SET_PRELOADER
    isFetching: boolean
}

export const setAllDialogsDataAC = (dialogsData: DialogsDataType[]): SetAllDialogsDataACType => (
    {type: SET_ALL_DIALOGS, dialogsData}
);
export const setPreloaderAC = (isFetching: boolean): SetPreloaderACType => ({type: SET_PRELOADER, isFetching});


export const getAllDialogsThunkCreator = ()
    : ThunkAction<void, RootState, unknown, ProfileReducerActionTypes> => {
    return (
        async (dispatch, getState) => {
            dispatch(setPreloaderAC(true));
            try {
                const response = await messagesAPI.getALlDialogs()
                if (response.status === 200) {
                    console.log(response.data)
                    dispatch(setAllDialogsDataAC(response.data))
                    dispatch(setPreloaderAC(false));
                }

            } catch (error) {
                // dispatch error
                dispatch(setPreloaderAC(false));
            }

        }
    )
}


export default messagesReducer;
