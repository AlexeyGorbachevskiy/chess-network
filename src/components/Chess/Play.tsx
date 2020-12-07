import React from 'react';
import style from './Play.module.css'
import MainComponent from "./Play/core/scripts";
import {compose} from "redux";
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";


function Play() {

    return (
        <div className={style.play}>
            <MainComponent />
        </div>
    )
}

export default compose(
    withAuthRedirect,
)(Play)
