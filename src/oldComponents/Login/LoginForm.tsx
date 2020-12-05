import style from "./Login.module.css";
import React from "react";
import {Field} from "redux-form";
import {LoginInput} from "../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../Utils/Validators/validators";

const maxLength = maxLengthCreator(40)

function LoginForm(props: any) {
    return (
        <form className={style.form} onSubmit={props.handleSubmit}>

            <h1 className={style.form_header}>Log In</h1>

            <div className={style.fields}>
                <div>
                    <Field name={'email'}
                        // className={style.input}
                           placeholder='Email' component={LoginInput}
                           type="text"
                           validate={[required, maxLength]}
                    />
                </div>
                <div>
                    <Field name={'password'}
                        // className={style.input}
                           placeholder='Password' component={LoginInput}
                           type="password"
                           validate={[required, maxLength]}
                    />
                </div>
                <div className={style.remember}>
                    <Field name={'rememberMe'} component={'input'} type="checkbox"/>
                    <> Remember</>
                </div>
                {props.error
                    ?
                    <div className={style.error}>
                        {props.error}
                    </div>
                    : ''
                }
            </div>

            {props.captchaUrl &&
            <div className={style.captcha_wrapper}>
                <img src={props.captchaUrl} alt="Captcha"/>
                <Field name={'captcha'}
                    // className={style.input}
                       placeholder='Type symbols' component={LoginInput}
                       type="text"
                />
            </div>
            }

            <div className={style.login_btn_wrapper}>
                <button className={style.login_btn}>Log In</button>
            </div>
        </form>
    )
}

export default LoginForm;