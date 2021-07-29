import React, {useState} from "react"
import {NavLink, Redirect} from "react-router-dom";
import {useFormik} from "formik";
import {AppRootStateType} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {restorePasswordTC} from "../../redux/reducers/restorePassword-reducer";
import s from "./RestorePassword.module.scss"
import {InputTextMUI} from "../common/inputText/InputTextMUI";
import {Button} from "../common/button/Button";
import {RequestStatusType} from "../../redux/reducers/app-reducer";

type RestorePasswordPropsType = {}

type FormikErrorType = {
    email?: string
}

export const RestorePassword = React.memo(function (props: RestorePasswordPropsType) {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const errorMessage = useSelector<AppRootStateType, string | null>(message => message.restorePasswordReducer.errorMessage)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (values) => {
            const error: FormikErrorType = {}
            if (!values.email) {
                error.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = "Invalid email address"
            }
            return error
        },
        onSubmit: values => {
            dispatch(restorePasswordTC(values.email))
            formik.resetForm()
        }
    })

    if (errorMessage?.slice(0, 8) === 'Recovery') {
        return <Redirect to={'/login'}/>
    }

    if (isLoggedIn) {
        return <Redirect to={"/"}/>
    }

    return (

        <div className={s.forgot}>
            <form onSubmit={formik.handleSubmit}>
                <h1 className={s.title}>It-incubator</h1>

                <h2 className={s.caption}>Forgot your password?</h2>

                <div className={s.inputWrap}>
                    <InputTextMUI
                        type={"email"}
                        autoComplete='off'
                        {...formik.getFieldProps('email')}
                        label={"Email"}
                        helperText={formik.errors.email}
                    />
                </div>
                <p className={s.text}>
                    Enter your email address and we will send you further instructions
                </p>

                <Button
                    type={"submit"}
                    disabled={status === "loading"}
                    className={s.button}>
                    Send Instructions
                </Button>

                <p className={s.password}>Did you remember your password?</p>

                <NavLink to={'/login'} className={s.try}>Try logging in</NavLink>
            </form>
        </div>
    )
})