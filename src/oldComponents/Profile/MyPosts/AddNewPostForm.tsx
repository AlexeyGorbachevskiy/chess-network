import React from 'react';
import style from "./MyPosts.module.css";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../Utils/Validators/validators";
import {PostTextarea} from "../../Common/FormsControls/FormsControls";


const maxLength = maxLengthCreator(10)


export function AddNewPostForm(props: any) {
    return (
        <form onSubmit={props.handleSubmit} className={style.new_post_form}>
            <h2>New Post</h2>
            <Field
                   component={PostTextarea} name='newPostText'
                   placeholder={'What\'s new...'}
                   rows={4} cols={60}
                   validate={[required, maxLength]}
            />
            <button className={style.new_post_button}
                    value={'Post'}><i className='fa fa-paper-plane'/> Post
            </button>
        </form>
    )
}

export const AddNewPostFormRedux = reduxForm({form: 'AddNewPostForm'})(AddNewPostForm)