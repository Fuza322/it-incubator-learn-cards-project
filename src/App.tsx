import React, {useEffect} from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {initializeAppTC, RequestStatusType} from "./redux/reducers/app-reducer"
import {Header} from "./components/common/header/Header"
import {Profile} from "./components/profile/Profile"
import {Login} from "./components/login/Login"
import {Registration} from "./components/registration/Registration"
import {RestorePassword} from "./components/restorePassword/RestorePassword"
import {UpdatePassword} from "./components/updatePassword/UpdatePassword"
import {PageNotFound} from "./components/pageNotFound/PageNotFound"
import {CheckEmail} from "./components/checkEmail/CheckEmail"
import s from "./App.module.scss"
import {AppRootStateType} from "./redux/store";
import Preloader from "./components/common/preloader/Preloader";

function App() {

    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.appReducer.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    return (
        <section className={s.pagesContainer}>
            <Header/>
            {status === "loading" && <Preloader/>}
            <Switch>
                <Route exact path={"/"} render={() => <Profile/>}/>
                <Route path={"/login"} render={() => <Login/>}/>
                <Route path={"/registration"} render={() => <Registration/>}/>
                <Route path={"/restorePassword"} render={() => <RestorePassword/>}/>
                <Route path={"/updatePassword/:token"} render={() => <UpdatePassword/>}/>
                <Route path={"/404"} render={() => <PageNotFound/>}/>
                <Route exact path={"/checkEmail"} render={() => <CheckEmail/>}/>
                {/*<Redirect from={"*"} to={"/404"}/>*/}
            </Switch>
        </section>
    )
}

export default App