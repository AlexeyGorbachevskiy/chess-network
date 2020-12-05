import React from 'react';
import obj from "./Preloader.module.css";


function Preloader() {
    return (
        <>
            <img className={obj.preloader} src={process.env.PUBLIC_URL + '/img/spinner.svg'}/>
        </>
    )
}


export default Preloader;