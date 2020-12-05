import React from 'react';
import obj from "./MessageItem.module.css";
import {Field} from "redux-form";
import {reduxForm} from "redux-form";
import {MessagesTextarea} from "../../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../Utils/Validators/validators";

const maxLength = maxLengthCreator(10)

export function AddMessageForm(props: any) {

    return (
        <form onSubmit={props.handleSubmit} className={obj.input_container}>
            <Field component={MessagesTextarea}
                   validate={[required, maxLength]}
                   name='newMessageBody'
                   placeholder={'Write a message...'}/>
            <button className={obj.send_btn}> Send</button>
        </form>
    )
}

export const AddMessageFormRedux = reduxForm({form: 'AddMessageForm'})(AddMessageForm)