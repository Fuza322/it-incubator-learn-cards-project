import React, {useState} from "react"
import {InputTextMUI} from "../common/inputText/InputTextMUI"
import {Button} from "../common/button/Button"
import s from "./Personal.module.scss"
import {ProfileAvatarBtn} from "../common/profileAvatarBtn/ProfileAvatarBtn";

type PersonalInfoPropsType = {}


export const PersonalInfo = React.memo((props: PersonalInfoPropsType) => {

    return (
        <div className={s.personalInfo}>
            <h2 className={s.caption}>Personal Information</h2>
            <ProfileAvatarBtn/>

            <div className={s.inputBox}>
                <div className={s.inputWrap}>
                    <InputTextMUI
                        type={"text"}
                        label={"Nickname"}
                        autoComplete="off"
                    />

                </div>
                <div className={s.inputWrap}>
                    <InputTextMUI
                        type={"text"}
                        label={"Email"}
                        autoComplete="off"
                    />

                </div>
            </div>
            <div className={s.btns}>
                <Button className={s.button}>
                    Cancel
                </Button>
                <Button className={s.button}>
                    Save
                </Button>
            </div>
        </div>
    )
})