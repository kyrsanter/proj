import React from "react";
import SignUp from "../components/forms/sign-up/sign-up";
import SignIn from "../components/forms/sign-in/sign-in";
import {useRouteMatch} from 'react-router-dom';
import FormsContainer from "../containers/forms-container";

const LoginPage = () => {
    return (
        <section className="login-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-5">
                        <FormsContainer />
                    </div>
                </div>
            </div>
        </section>
    )
};

export default LoginPage;