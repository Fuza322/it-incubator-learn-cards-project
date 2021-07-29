import React, {useState} from "react"
import {Redirect, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {AppRootStateType} from "../../redux/store"
import {updatePasswordTC} from "../../redux/reducers/updatePassword-reducer";
import {InputTextMUI} from "../common/inputText/InputTextMUI";
import InputAdornment from "@material-ui/core/InputAdornment";
import {IconButton} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Button} from "../common/button/Button";
import s from "./UpdatePassword.module.scss"
import { useFormik } from "formik";

type UpdatePasswordPropsType = {}

export const UpdatePassword = React.memo(function (props: UpdatePasswordPropsType) {
    // const {token} = useParams<Record<string, string | undefined>>();
    const {token} = useParams<any>();
    const dispatch = useDispatch()

    const isSuccess = useSelector<AppRootStateType, boolean>(state => state.updatePasswordReducer.isSuccess)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    console.log(`token: ` + token)
    type FormikErrorType = {
        newPassword?: string
    }
    const formik = useFormik({
        initialValues: {
            newPassword: "",
        },
        validate: (values) => {
            const error: FormikErrorType = {}
            if (!values.newPassword) {
                error.newPassword = 'Required';
            } else if (values.newPassword.length < 8) {
                error.newPassword = 'Must be at least 8 characters';
            }
            return error
        },
        onSubmit: values => {
            debugger
            dispatch(updatePasswordTC(values.newPassword, token))
            formik.resetForm()
        }
    })

    if (isSuccess) {
        return <Redirect to={'/login'} />
    }

    if (isLoggedIn) {
        return <Redirect to={"/"}/>
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (
        <div className={s.create}>
            <form onSubmit={formik.handleSubmit}>
                <h1 className={s.title}>It-incubator</h1>

                <h2 className={s.caption}>Create new password</h2>

                <div className={s.inputWrap}>

                    <InputTextMUI
                        type={showPassword ? 'text' : 'password'}
                        {...formik.getFieldProps('newPassword')}
                        label={"Password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>)
                        }}
                    />
                    {formik.touched.newPassword && formik.errors.newPassword &&
                    <div style={{color: 'red'}}>{formik.errors.newPassword}</div>}
                </div>
                <p className={s.text}>
                    Create new password and we will send you further instructions to email
                </p>

                <Button
                    type={'submit'}
                    className={s.button}>
                    Create new password</Button>
            </form>
        </div>
    )
})