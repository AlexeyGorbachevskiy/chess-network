import React from 'react';
import style from './Profile.module.css';
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";
import {compose} from 'redux';
import avatar from '../../images/profile/saimon.jpg';
import Posts from "../Posts/Posts";


function Profile() {

    return (
        <section className={style.profile}>

            <div className={style.column1_wrapper}>
                <div className={style.avatar_info_wrapper}>
                    <div
                        style={{
                            background: `url('${avatar}') no-repeat center center`,
                            backgroundSize: 'cover'
                        }}
                        className={style.avatar}
                    />

                    <div className={style.write_msg_btn_wrapper}>
                        <button className={style.write_msg_btn}>Write message</button>
                    </div>


                    <div className={style.add_friend_btn_wrapper}>
                        <button className={style.add_friend_btn}>Add friend</button>
                    </div>

                </div>

            </div>

            <div className={style.column2_wrapper}>

                <div className={style.page_info_wrapper}>

                    <div className={style.page_top}>
                        <p className={style.fullName}>Semyon Shakhno</p>
                        <p className={style.isOnline}>Online</p>
                    </div>
                    <div className={style.main_info}>

                        <div className={style.info_row}>
                            <span className={style.info_key}>Birthday:</span>
                            <span className={style.info_prop}> June 16, 1997</span>
                        </div>

                        <div className={style.info_row}>
                            <span className={style.info_key}>Current City:</span>
                            <span className={style.info_prop}> Minsk</span>
                        </div>

                        <div className={style.info_row}>
                            <span className={style.info_key}>Studied at:</span>
                            <span className={style.info_prop}> BSUIR</span>
                        </div>


                        <div className={style.section_title_wrapper}>
                             <span className={style.section_title}>
                            Chess information
                            </span>
                        </div>


                        <div className={style.chess_info_section}>

                            <div className={style.info_row}>
                                <span className={style.info_key}>Level:</span>
                                <span className={style.info_prop}>Grandmaster</span>
                            </div>

                            <div className={style.info_row}>
                                <span className={style.info_key}>FIDE rating:</span>
                                <span className={style.info_prop}>3000</span>
                            </div>

                        </div>



                            <div className={style.section_title_wrapper}>
                             <span className={style.section_title}>
                            Personal information
                            </span>
                            </div>

                        <div className={style.chess_info_section}>
                            <div className={style.info_row}>
                                <span className={style.info_key}>About me:</span>
                                <span className={style.info_prop}>Сhess coach</span>
                            </div>
                            <div className={style.info_row}>
                                <span className={style.info_key}>My hobbies:</span>
                                <span className={style.info_prop}>Сhess, Football, Programming</span>
                            </div>
                        </div>

                    </div>

                </div>

                <Posts/>

            </div>


        </section>
    );
}

export default Profile;
// export default compose(
//     withAuthRedirect,
// )(Post)
