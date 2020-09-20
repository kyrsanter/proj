import React, {FC} from "react";
import {Route, Switch} from 'react-router-dom'
import HomePage from "../../pages/home-page";
import Header from "../header/header";
import LoginPage from "../../pages/login-page";

const App: FC = () => {
    return (
        <>
            <Header />
            <Switch>
                <Route exact path='/login/:where' render={() => <LoginPage/>} />
                <Route exact path='/' render={() => <HomePage/>} />
            </Switch>
        </>
    )
};

export default App;