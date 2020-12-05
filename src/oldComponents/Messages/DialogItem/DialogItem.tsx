import React from 'react';
import obj from './DialogItem.module.css';
import {NavLink} from 'react-router-dom';


type DialogPropsType = {
    user_id: number
    user_name: string
}

function DialogItem(props: DialogPropsType) {
    let path = '/messages/' + props.user_id;
    return <div className={obj.dialog_item + ' ' + obj.active}>
        <div className={obj.img_container}>
            <NavLink to={'#'}>
                <img className={obj.friend_img} src={process.env.PUBLIC_URL + '/img/friend_images/Bezos.png'} alt=''/>
            </NavLink>
        </div>
        <div className={obj.name_container}>
            <NavLink className={obj.friend_name} to={'#'}>{props.user_name}</NavLink>
            <NavLink className={obj.text} to={path}>Go to Dialog</NavLink>
        </div>
    </div>
}


export default DialogItem;