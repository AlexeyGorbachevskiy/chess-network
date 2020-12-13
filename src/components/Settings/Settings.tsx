import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './Settings.module.css';
import {compose} from "redux";
import {withAuthRedirect} from "../../utilities/hoc/withAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {LoginDataType} from "../../redux/authReducer";
import {editProfileThunkCreator} from "../../redux/profileReducer";


function Settings() {

    const loginData = useSelector<RootState, LoginDataType>(state => state.auth.data);

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [studiedAt, setStudiedAt] = useState('');
    const [chessLevel, setChessLevel] = useState('');
    const [fideRating, setFideRating] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [photo, setPhoto] = useState<any>('');


    const dispatch = useDispatch();

    useEffect(() => {
        setEmail(loginData.email!)
        setFirstName(loginData.name!);
        setLastName(loginData.surname!);
        setBirthday(loginData.birthday!);
        setCity(loginData.current_city!);
        setCountry(loginData.current_country!);
        setStudiedAt(loginData.study_place!);
        setChessLevel(loginData.chess_level!);
        setFideRating(loginData.fide_rating!.toString());
        setAboutMe(loginData.about!);
        setHobbies(loginData.hobbies!);
    }, [loginData])

    const resetPhoto = () => {
        const file: any = document.querySelector('#photo');
        file.value = '';
    }
    const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];
            const base64 = await convertBase64(file)
            setPhoto(base64)
        }

    }

    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error: any) => {
                reject(error)
            }

        })


    }
    const saveData = () => {
        dispatch(editProfileThunkCreator({
            name: firstName,
            surname: lastName,
            photo: photo,
            birthday: birthday,
            current_city: city,
            current_country: country,
            study_place: studiedAt,
            chess_level: chessLevel,
            fide_rating: fideRating,
            about: aboutMe,
            hobbies: hobbies
        }))
    }

    return (
        <section className={style.settings}>
            <div className={style.main_wrapper}>
                <div className={style.main_header}>
                    <span className={style.main_header__title}>Settings</span>
                </div>

                <div className={style.settings_wrapper}>
                    <div className={style.settings_item_wrapper}>
                        <div className={style.field_name_wrapper}>
                            <p className={style.field_name}>Email:</p>
                        </div>
                        <div className={style.input_wrapper}>
                            <input value={email} style={{color: '#939393'}} disabled className={style.input}
                                   type="text"/>
                        </div>
                    </div>

                    <div className={style.settings_item_wrapper}>
                        <div className={style.field_name_wrapper}>
                            <p className={style.field_name}>First name:</p>
                        </div>
                        <div className={style.input_wrapper}>
                            <input value={firstName} onChange={(e) =>
                                setFirstName(e.currentTarget.value)}
                                   className={style.input} type="text"/>
                        </div>
                    </div>

                    <div className={style.settings_item_wrapper}>
                        <div className={style.field_name_wrapper}>
                            <p className={style.field_name}>Last name:</p>
                        </div>
                        <div className={style.input_wrapper}>
                            <input value={lastName} onChange={(e) =>
                                setLastName(e.currentTarget.value)}
                                   className={style.input} type="text"/>
                        </div>
                    </div>


                    <div className={style.settings_item_wrapper}>
                        <div className={style.field_name_wrapper}>
                            <p className={style.field_name}>Birthday:</p>
                        </div>
                        <div className={style.input_wrapper}>
                            <input value={birthday} onChange={(e) =>
                                setBirthday(e.currentTarget.value)}
                                   className={style.input} type="text"/>
                        </div>
                    </div>
                    <div className={style.settings_item_wrapper}>
                        <div className={style.field_name_wrapper}>
                            <p className={style.field_name}>City:</p>
                        </div>
                        <div className={style.input_wrapper}>
                            <input value={city} onChange={(e) =>
                                setCity(e.currentTarget.value)} className={style.input}
                                   type="text"/>
                        </div>
                    </div>
                    <div className={style.settings_item_wrapper}>
                        <div className={style.field_name_wrapper}>
                            <p className={style.field_name}>Country:</p>
                        </div>
                        <div className={style.input_wrapper}>
                            <input value={country} onChange={(e) =>
                                setCountry(e.currentTarget.value)}
                                   className={style.input} type="text"/>
                        </div>
                    </div>
                    <div className={style.settings_item_wrapper}>
                        <div className={style.field_name_wrapper}>
                            <p className={style.field_name}>Studied at:</p>
                        </div>
                        <div className={style.input_wrapper}>
                            <input value={studiedAt} onChange={(e) =>
                                setStudiedAt(e.currentTarget.value)}
                                   className={style.input} type="text"/>
                        </div>
                    </div>
                    <div className={style.settings_item_wrapper}>
                        <div className={style.field_name_wrapper}>
                            <p className={style.field_name}>Chess level:</p>
                        </div>
                        <div className={style.input_wrapper}>
                            <input value={chessLevel} onChange={(e) =>
                                setChessLevel(e.currentTarget.value)}
                                   className={style.input} type="text"/>
                        </div>
                    </div>
                    <div className={style.settings_item_wrapper}>
                        <div className={style.field_name_wrapper}>
                            <p className={style.field_name}>FIDE rating:</p>
                        </div>
                        <div className={style.input_wrapper}>
                            <input value={fideRating} onChange={(e) =>
                                setFideRating(e.currentTarget.value)}
                                   className={style.input} type="text"/>
                        </div>
                    </div>
                    <div className={style.settings_item_wrapper}>
                        <div className={style.field_name_wrapper}>
                            <p className={style.field_name}>About me:</p>
                        </div>
                        <div className={style.input_wrapper}>
                            <input value={aboutMe} onChange={(e) =>
                                setAboutMe(e.currentTarget.value)}
                                   className={style.input} type="text"/>
                        </div>
                    </div>

                    <div className={style.settings_item_wrapper}>
                        <div className={style.field_name_wrapper}>
                            <p className={style.field_name}>Hobbies:</p>
                        </div>
                        <div className={style.input_wrapper}>
                            <input value={hobbies} onChange={(e) =>
                                setHobbies(e.currentTarget.value)}
                                   className={style.input} type="text"/>
                        </div>
                    </div>

                    <div className={style.settings_item_wrapper}>
                        <div className={style.field_name_wrapper}>
                            <p className={style.field_name_photo}>Photo:</p>
                        </div>
                        <div className={style.input_wrapper}>
                            {/*<label htmlFor="photo">Choose file to upload</label>*/}
                            <input
                                className={style.photo_input}
                                accept={'.jpeg, .png, .jpg'}
                                onChange={(e) => {
                                    uploadImage(e)
                                }}
                                id="photo" type="file"
                            />
                            <button className={style.clear_photo} onClick={resetPhoto}>Clear</button>
                        </div>


                    </div>


                    <div className={style.save_btn_wrapper}>
                        <button onClick={saveData} className={style.save_btn}>Save</button>
                    </div>


                </div>

            </div>
        </section>
    );
}

export default compose(
    withAuthRedirect,
)(Settings)
