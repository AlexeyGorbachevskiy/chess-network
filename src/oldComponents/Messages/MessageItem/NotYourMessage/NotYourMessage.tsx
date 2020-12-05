import React from 'react';
import obj from './NotYourMessage.module.css';

function NotYourMessage() {

    const name = 'Boris Berezovskiy';
    const message_text = 'Hey, how you doing?'
    const time = '20:00';
    return (
        <div className={obj.message_container}>
            <div className={obj.img_wrapper}>
                <img className={obj.image} src={process.env.PUBLIC_URL+'/img/avatar.png'} alt='img'/>
            </div>
            <div className={obj.message_body}>
                <h4>{name}</h4>

                <div className={obj.message_wrapper}>
                    <p className={obj.message_text}>{message_text}</p>
                </div>

                <div className={obj.time_wrapper}>
                    <p className={obj.time}>{time}</p>
                </div>

            </div>
        </div>
    );
}


export default NotYourMessage;