import React from 'react'
import style from './FormsControls.module.css'

export const PostTextarea = ({input, meta, ...props}: any) => {
    const hasError = input.value && meta.error;
    return (
        <>
            <textarea
                className={style.post_textarea + ' ' + (hasError && style.input_error)}
                {...input} {...props}
                value={props.newPostText}

            />
            {hasError && <span>{meta.error}</span>}
        </>
    )
}


export const MessagesTextarea = ({input, meta, ...props}: any) => {
    const hasError = input.value && meta.error;
    return (
        <>
            <textarea
                className={style.messages_textarea + ' ' + (hasError && style.messages_input_error)}
                {...input} {...props}
            />
        </>
    )
}

export const LoginInput = ({input, meta, ...props}: any) => {
    const hasError = meta.touched && meta.error;
    return (
        <>
            <input
                className={style.login_input + ' ' + (hasError && style.input_error)}
                {...input} {...props}
            />
            {hasError && <span className={style.login_error_text}>{meta.error}</span>}
        </>
    )
}

export const ProfileSettingsInput = ({input, meta, ...props}: any) => {
    const hasError = meta.touched && meta.error;
    return (
        <>
            <input
                className={style.login_input + ' ' + (hasError && style.input_error)}
                {...input} {...props}
            />
            {hasError && <span className={style.login_error_text}>{meta.error}</span>}
        </>
    )
}